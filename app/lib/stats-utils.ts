'use client';

import { prisma } from './prisma';
import {
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear,
  format,
  getWeek,
  getMonth,
  getYear
} from 'date-fns';

export type StatsAction = 'created' | 'completed';

/**
 * タスクの作成または完了時に統計データを更新する関数
 * @param userId ユーザーID
 * @param date 日付
 * @param action 'created'または'completed'
 */
export async function updateStatsData(
  userId: string,
  date: Date,
  action: StatsAction
) {
  try {
    // 日付の正規化（時間部分を切り捨て）
    const normalizedDate = startOfDay(date);
    const year = getYear(normalizedDate);
    const month = getMonth(normalizedDate) + 1; // getMonthは0始まりなので+1
    const weekOfYear = getWeek(normalizedDate, { weekStartsOn: 1 });
    
    // トランザクションで統計データを更新
    await prisma.$transaction(async (tx) => {
      // 1. 日次統計の更新
      const dailyStats = await tx.dailyStats.findFirst({
        where: {
          userId,
          date: normalizedDate
        }
      });
      
      if (dailyStats) {
        await tx.dailyStats.update({
          where: { id: dailyStats.id },
          data: {
            completedCount: action === 'completed' 
              ? dailyStats.completedCount + 1 
              : dailyStats.completedCount,
            createdCount: action === 'created' 
              ? dailyStats.createdCount + 1 
              : dailyStats.createdCount,
            completionRate: calculateCompletionRate(
              action === 'completed' ? dailyStats.completedCount + 1 : dailyStats.completedCount,
              action === 'created' ? dailyStats.createdCount + 1 : dailyStats.createdCount
            )
          }
        });
      } else {
        await tx.dailyStats.create({
          data: {
            userId,
            date: normalizedDate,
            completedCount: action === 'completed' ? 1 : 0,
            createdCount: action === 'created' ? 1 : 0,
            completionRate: action === 'completed' ? 1 : 0
          }
        });
      }
      
      // 2. 週次統計の更新
      const weeklyStats = await tx.weeklyStats.findFirst({
        where: {
          userId,
          year,
          weekOfYear
        }
      });
      
      if (weeklyStats) {
        await tx.weeklyStats.update({
          where: { id: weeklyStats.id },
          data: {
            completedCount: action === 'completed' 
              ? weeklyStats.completedCount + 1 
              : weeklyStats.completedCount,
            createdCount: action === 'created' 
              ? weeklyStats.createdCount + 1 
              : weeklyStats.createdCount,
            completionRate: calculateCompletionRate(
              action === 'completed' ? weeklyStats.completedCount + 1 : weeklyStats.completedCount,
              action === 'created' ? weeklyStats.createdCount + 1 : weeklyStats.createdCount
            )
          }
        });
      } else {
        await tx.weeklyStats.create({
          data: {
            userId,
            year,
            weekOfYear,
            completedCount: action === 'completed' ? 1 : 0,
            createdCount: action === 'created' ? 1 : 0,
            completionRate: action === 'completed' ? 1 : 0
          }
        });
      }
      
      // 3. 月次統計の更新
      const monthlyStats = await tx.monthlyStats.findFirst({
        where: {
          userId,
          year,
          month
        }
      });
      
      if (monthlyStats) {
        await tx.monthlyStats.update({
          where: { id: monthlyStats.id },
          data: {
            completedCount: action === 'completed' 
              ? monthlyStats.completedCount + 1 
              : monthlyStats.completedCount,
            createdCount: action === 'created' 
              ? monthlyStats.createdCount + 1 
              : monthlyStats.createdCount,
            completionRate: calculateCompletionRate(
              action === 'completed' ? monthlyStats.completedCount + 1 : monthlyStats.completedCount,
              action === 'created' ? monthlyStats.createdCount + 1 : monthlyStats.createdCount
            )
          }
        });
      } else {
        await tx.monthlyStats.create({
          data: {
            userId,
            year,
            month,
            completedCount: action === 'completed' ? 1 : 0,
            createdCount: action === 'created' ? 1 : 0,
            completionRate: action === 'completed' ? 1 : 0
          }
        });
      }
      
      // 4. 年次統計の更新
      const yearlyStats = await tx.yearlyStats.findFirst({
        where: {
          userId,
          year
        }
      });
      
      if (yearlyStats) {
        await tx.yearlyStats.update({
          where: { id: yearlyStats.id },
          data: {
            completedCount: action === 'completed' 
              ? yearlyStats.completedCount + 1 
              : yearlyStats.completedCount,
            createdCount: action === 'created' 
              ? yearlyStats.createdCount + 1 
              : yearlyStats.createdCount,
            completionRate: calculateCompletionRate(
              action === 'completed' ? yearlyStats.completedCount + 1 : yearlyStats.completedCount,
              action === 'created' ? yearlyStats.createdCount + 1 : yearlyStats.createdCount
            )
          }
        });
      } else {
        await tx.yearlyStats.create({
          data: {
            userId,
            year,
            completedCount: action === 'completed' ? 1 : 0,
            createdCount: action === 'created' ? 1 : 0,
            completionRate: action === 'completed' ? 1 : 0
          }
        });
      }
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating stats data:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '統計データの更新に失敗しました' 
    };
  }
}

/**
 * 完了率を計算する関数
 * @param completedCount 完了タスク数
 * @param createdCount 作成タスク数
 * @returns 完了率（0-1の値）、作成タスクがない場合はnull
 */
function calculateCompletionRate(completedCount: number, createdCount: number): number | null {
  if (createdCount === 0) return null;
  return completedCount / createdCount;
}

/**
 * ユーザーの統計データを一括で集計・更新する関数
 * バッチ処理や初回データ生成時などに使用
 * @param userId ユーザーID
 */
export async function recalculateAllStats(userId: string) {
  try {
    // Google Tasks APIからタスクを取得する関数
    const { tasksGroupedByDay, tasksGroupedByWeek, tasksGroupedByMonth, tasksGroupedByYear } = 
      await fetchAndGroupTasks(userId);
    
    // トランザクションを使わず、通常のクエリとして実行
    // 1. 日次データの処理
    for (const [dateStr, tasks] of Object.entries(tasksGroupedByDay)) {
      const date = new Date(dateStr);
      const completedCount = tasks.filter(task => task.status === 'completed').length;
      const createdCount = tasks.length;
      
      const existingStats = await prisma.dailyStats.findFirst({
        where: {
          userId,
          date
        }
      });
      
      if (existingStats) {
        await prisma.dailyStats.update({
          where: { id: existingStats.id },
          data: {
            completedCount,
            createdCount,
            completionRate: calculateCompletionRate(completedCount, createdCount)
          }
        });
      } else {
        await prisma.dailyStats.create({
          data: {
            userId,
            date,
            completedCount,
            createdCount,
            completionRate: calculateCompletionRate(completedCount, createdCount)
          }
        });
      }
    }
    
    // 2. 週次データの処理
    for (const [yearWeekKey, tasks] of Object.entries(tasksGroupedByWeek)) {
      const [year, weekOfYear] = yearWeekKey.split('-').map(Number);
      const completedCount = tasks.filter(task => task.status === 'completed').length;
      const createdCount = tasks.length;
      
      const existingStats = await prisma.weeklyStats.findFirst({
        where: {
          userId,
          year,
          weekOfYear
        }
      });
      
      if (existingStats) {
        await prisma.weeklyStats.update({
          where: { id: existingStats.id },
          data: {
            completedCount,
            createdCount,
            completionRate: calculateCompletionRate(completedCount, createdCount)
          }
        });
      } else {
        await prisma.weeklyStats.create({
          data: {
            userId,
            year,
            weekOfYear,
            completedCount,
            createdCount,
            completionRate: calculateCompletionRate(completedCount, createdCount)
          }
        });
      }
    }
    
    // 3. 月次データの処理
    for (const [yearMonthKey, tasks] of Object.entries(tasksGroupedByMonth)) {
      const [year, month] = yearMonthKey.split('-').map(Number);
      const completedCount = tasks.filter(task => task.status === 'completed').length;
      const createdCount = tasks.length;
      
      const existingStats = await prisma.monthlyStats.findFirst({
        where: {
          userId,
          year,
          month
        }
      });
      
      if (existingStats) {
        await prisma.monthlyStats.update({
          where: { id: existingStats.id },
          data: {
            completedCount,
            createdCount,
            completionRate: calculateCompletionRate(completedCount, createdCount)
          }
        });
      } else {
        await prisma.monthlyStats.create({
          data: {
            userId,
            year,
            month,
            completedCount,
            createdCount,
            completionRate: calculateCompletionRate(completedCount, createdCount)
          }
        });
      }
    }
    
    // 4. 年次データの処理
    for (const [yearKey, tasks] of Object.entries(tasksGroupedByYear)) {
      const year = Number(yearKey);
      const completedCount = tasks.filter(task => task.status === 'completed').length;
      const createdCount = tasks.length;
      
      const existingStats = await prisma.yearlyStats.findFirst({
        where: {
          userId,
          year
        }
      });
      
      if (existingStats) {
        await prisma.yearlyStats.update({
          where: { id: existingStats.id },
          data: {
            completedCount,
            createdCount,
            completionRate: calculateCompletionRate(completedCount, createdCount)
          }
        });
      } else {
        await prisma.yearlyStats.create({
          data: {
            userId,
            year,
            completedCount,
            createdCount,
            completionRate: calculateCompletionRate(completedCount, createdCount)
          }
        });
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error recalculating all stats:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '統計データの再計算に失敗しました' 
    };
  }
}

/**
 * ユーザーのタスクを取得し、日/週/月/年ごとにグループ化する関数
 * @param userId ユーザーID
 */
async function fetchAndGroupTasks(userId: string) {
  // 各タスクリストのIDを取得
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
    throw new Error('アクセストークンが見つかりません');
  }
  
  const access_token = user.accounts[0].access_token;
  
  // Google Tasks APIからタスクリスト一覧を取得
  const taskListsResponse = await fetch('https://tasks.googleapis.com/tasks/v1/users/@me/lists', {
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!taskListsResponse.ok) {
    throw new Error('タスクリストの取得に失敗しました');
  }
  
  const taskLists = await taskListsResponse.json();
  
  // すべてのタスクリストからタスクを取得
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
  
  // タスクを日付ごとにグループ化
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
  
  return {
    tasksGroupedByDay,
    tasksGroupedByWeek,
    tasksGroupedByMonth,
    tasksGroupedByYear
  };
} 