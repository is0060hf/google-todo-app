import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';
import { startOfDay, startOfWeek, startOfMonth, startOfYear, format, getWeek, getMonth, getYear } from 'date-fns';

/**
 * 統計データの一括生成・更新を行うAPI
 * Vercel Cron Jobから定期的に呼び出される
 * 
 * @requires Authorization - このAPIはシステム内部のみからアクセス可能
 */
export async function POST(request: Request) {
  try {
    // APIキー認証 (Vercel Cron Jobからの呼び出し用)
    const authHeader = request.headers.get('Authorization');
    const apiKey = process.env.STATS_BATCH_API_KEY;
    
    // APIキーがない、または一致しない場合は拒否
    if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
      console.warn('Unauthorized batch stats API access attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // リクエストボディからデータを取得
    const body = await request.json();
    const { userId } = body;
    
    // ユーザーIDがない場合は全ユーザーの統計を更新
    if (!userId) {
      // 全ユーザーの統計データを更新（定期バッチ処理）
      const userIds = await getAllUserIds();
      console.log(`Batch updating stats for ${userIds.length} users`);
      
      const results = await Promise.allSettled(
        userIds.map(async (id) => {
          return await updateUserStats(id);
        })
      );
      
      const succeeded = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;
      
      return NextResponse.json({
        success: true,
        message: `Updated stats for ${succeeded} users, failed for ${failed} users`
      });
    }
    
    // 特定ユーザーの統計データのみ更新
    const result = await updateUserStats(userId);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to update user stats' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: `Updated stats for user ${userId}`
    });
  } catch (error: any) {
    console.error('Error in batch stats update:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to update stats' },
      { status: 500 }
    );
  }
}

/**
 * 全ユーザーのIDを取得する関数
 */
async function getAllUserIds(): Promise<string[]> {
  const users = await prisma.user.findMany({
    select: { id: true }
  });
  
  return users.map(user => user.id);
}

/**
 * 特定ユーザーの統計データを更新する関数
 */
async function updateUserStats(userId: string) {
  try {
    // 1. このユーザーのタスクデータを取得
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        accounts: {
          where: { provider: 'google' },
          select: { access_token: true }
        }
      }
    });
    
    if (!user?.accounts[0]?.access_token) {
      return { 
        success: false, 
        error: 'アクセストークンが見つかりません' 
      };
    }
    
    const access_token = user.accounts[0].access_token;
    
    // 2. Google Tasks APIからタスクリスト一覧を取得
    const taskListsResponse = await fetch('https://tasks.googleapis.com/tasks/v1/users/@me/lists', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!taskListsResponse.ok) {
      return { 
        success: false, 
        error: 'タスクリストの取得に失敗しました' 
      };
    }
    
    const taskLists = await taskListsResponse.json();
    
    // 3. すべてのタスクリストからタスクを取得
    let allTasks = [];
    for (const list of taskLists.items || []) {
      const tasksResponse = await fetch(
        `https://tasks.googleapis.com/tasks/v1/lists/${list.id}/tasks?showCompleted=true&showHidden=true&maxResults=100`,
        {
          headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (tasksResponse.ok) {
        const tasksData = await tasksResponse.json();
        if (tasksData.items) {
          allTasks = [...allTasks, ...tasksData.items];
        }
      }
    }
    
    // 4. タスクを日付ごとにグループ化
    const tasksGroupedByDay = {};
    const tasksGroupedByWeek = {};
    const tasksGroupedByMonth = {};
    const tasksGroupedByYear = {};
    
    allTasks.forEach(task => {
      if (task.deleted) return; // 削除済みタスクはスキップ
      
      // タスクの作成日を取得（updatedがない場合は現在日付を使用）
      const taskDate = task.updated ? new Date(task.updated) : new Date();
      
      // 日付情報を抽出
      const normalizedDate = startOfDay(taskDate);
      const year = getYear(normalizedDate);
      const month = getMonth(normalizedDate) + 1; // getMonthは0始まりなので+1
      const weekOfYear = getWeek(normalizedDate, { weekStartsOn: 1 });
      
      // 日次データ用のキー（YYYY-MM-DD形式）
      const dayKey = format(normalizedDate, 'yyyy-MM-dd');
      if (!tasksGroupedByDay[dayKey]) tasksGroupedByDay[dayKey] = [];
      tasksGroupedByDay[dayKey].push(task);
      
      // 週次データ用のキー（YYYY-WW形式）
      const weekKey = `${year}-${weekOfYear}`;
      if (!tasksGroupedByWeek[weekKey]) tasksGroupedByWeek[weekKey] = [];
      tasksGroupedByWeek[weekKey].push(task);
      
      // 月次データ用のキー（YYYY-MM形式）
      const monthKey = `${year}-${month}`;
      if (!tasksGroupedByMonth[monthKey]) tasksGroupedByMonth[monthKey] = [];
      tasksGroupedByMonth[monthKey].push(task);
      
      // 年次データ用のキー（YYYY形式）
      const yearKey = `${year}`;
      if (!tasksGroupedByYear[yearKey]) tasksGroupedByYear[yearKey] = [];
      tasksGroupedByYear[yearKey].push(task);
    });
    
    // 5. 統計データを計算して更新
    
    // 日次データの処理
    for (const [dateStr, tasks] of Object.entries(tasksGroupedByDay)) {
      const date = new Date(dateStr);
      const completedCount = tasks.filter(task => task.status === 'completed').length;
      const createdCount = tasks.length;
      const completionRate = createdCount > 0 ? completedCount / createdCount : null;
      
      await prisma.dailyStats.upsert({
        where: {
          userId_date: {
            userId,
            date
          }
        },
        update: {
          completedCount,
          createdCount,
          completionRate
        },
        create: {
          userId,
          date,
          completedCount,
          createdCount,
          completionRate
        }
      });
    }
    
    // 週次データの処理
    for (const [yearWeekKey, tasks] of Object.entries(tasksGroupedByWeek)) {
      const [year, weekOfYear] = yearWeekKey.split('-').map(Number);
      const completedCount = tasks.filter(task => task.status === 'completed').length;
      const createdCount = tasks.length;
      const completionRate = createdCount > 0 ? completedCount / createdCount : null;
      
      await prisma.weeklyStats.upsert({
        where: {
          userId_year_weekOfYear: {
            userId,
            year,
            weekOfYear
          }
        },
        update: {
          completedCount,
          createdCount,
          completionRate
        },
        create: {
          userId,
          year,
          weekOfYear,
          completedCount,
          createdCount,
          completionRate
        }
      });
    }
    
    // 月次データの処理
    for (const [yearMonthKey, tasks] of Object.entries(tasksGroupedByMonth)) {
      const [year, month] = yearMonthKey.split('-').map(Number);
      const completedCount = tasks.filter(task => task.status === 'completed').length;
      const createdCount = tasks.length;
      const completionRate = createdCount > 0 ? completedCount / createdCount : null;
      
      await prisma.monthlyStats.upsert({
        where: {
          userId_year_month: {
            userId,
            year,
            month
          }
        },
        update: {
          completedCount,
          createdCount,
          completionRate
        },
        create: {
          userId,
          year,
          month,
          completedCount,
          createdCount,
          completionRate
        }
      });
    }
    
    // 年次データの処理
    for (const [yearKey, tasks] of Object.entries(tasksGroupedByYear)) {
      const year = Number(yearKey);
      const completedCount = tasks.filter(task => task.status === 'completed').length;
      const createdCount = tasks.length;
      const completionRate = createdCount > 0 ? completedCount / createdCount : null;
      
      await prisma.yearlyStats.upsert({
        where: {
          userId_year: {
            userId,
            year
          }
        },
        update: {
          completedCount,
          createdCount,
          completionRate
        },
        create: {
          userId,
          year,
          completedCount,
          createdCount,
          completionRate
        }
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error updating stats for user:', userId, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '統計データの更新に失敗しました' 
    };
  }
} 