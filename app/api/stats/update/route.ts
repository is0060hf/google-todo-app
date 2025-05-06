import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';

// 統計データ更新API
export async function POST(request: Request) {
  try {
    // リクエストボディを取得
    const body = await request.json();
    const { date, action } = body;
    
    if (!date || !action) {
      return NextResponse.json(
        { error: 'Date and action are required' },
        { status: 400 }
      );
    }

    // アクションの検証
    if (action !== 'created' && action !== 'completed') {
      return NextResponse.json(
        { error: 'Action must be either "created" or "completed"' },
        { status: 400 }
      );
    }

    // 日付形式の検証
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(date)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    // セッションからユーザー情報を取得
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // @ts-ignore - next-authの型定義と実際の挙動の差異
    const userId = session.user.id;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID not found in session' }, 
        { status: 401 }
      );
    }

    const taskDate = new Date(date);
    const year = taskDate.getFullYear();
    const month = taskDate.getMonth() + 1; // 0-indexed -> 1-indexed
    
    // 週番号の計算
    const getWeekNumber = (d: Date): number => {
      // 1月1日を基準とした週の番号を取得（1-53）
      const firstDayOfYear = new Date(d.getFullYear(), 0, 1);
      const pastDaysOfYear = (d.getTime() - firstDayOfYear.getTime()) / 86400000;
      return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };
    
    const weekOfYear = getWeekNumber(taskDate);

    // トランザクションで統計データを更新
    await prisma.$transaction(async (tx) => {
      // 1. 日次統計の更新
      const dailyStats = await tx.dailyStats.findUnique({
        where: {
          userId_date: {
            userId,
            date: taskDate
          }
        }
      });

      if (dailyStats) {
        // 既存の統計データを更新
        await tx.dailyStats.update({
          where: { id: dailyStats.id },
          data: {
            completedCount: action === 'completed' 
              ? dailyStats.completedCount + 1 
              : dailyStats.completedCount,
            createdCount: action === 'created' 
              ? dailyStats.createdCount + 1 
              : dailyStats.createdCount,
            completionRate: action === 'completed' && dailyStats.createdCount > 0
              ? (dailyStats.completedCount + 1) / dailyStats.createdCount
              : dailyStats.completionRate
          }
        });
      } else {
        // 新規の統計データを作成
        await tx.dailyStats.create({
          data: {
            userId,
            date: taskDate,
            completedCount: action === 'completed' ? 1 : 0,
            createdCount: action === 'created' ? 1 : 0,
            completionRate: action === 'completed' ? 1 : 0
          }
        });
      }

      // 2. 週次統計の更新
      const weeklyStats = await tx.weeklyStats.findUnique({
        where: {
          userId_year_weekOfYear: {
            userId,
            year,
            weekOfYear
          }
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
            completionRate: action === 'completed' && weeklyStats.createdCount > 0
              ? (weeklyStats.completedCount + 1) / weeklyStats.createdCount
              : weeklyStats.completionRate
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
      const monthlyStats = await tx.monthlyStats.findUnique({
        where: {
          userId_year_month: {
            userId,
            year,
            month
          }
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
            completionRate: action === 'completed' && monthlyStats.createdCount > 0
              ? (monthlyStats.completedCount + 1) / monthlyStats.createdCount
              : monthlyStats.completionRate
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
      const yearlyStats = await tx.yearlyStats.findUnique({
        where: {
          userId_year: {
            userId,
            year
          }
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
            completionRate: action === 'completed' && yearlyStats.createdCount > 0
              ? (yearlyStats.completedCount + 1) / yearlyStats.createdCount
              : yearlyStats.completionRate
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

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error updating stats:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to update stats' },
      { status: 500 }
    );
  }
} 