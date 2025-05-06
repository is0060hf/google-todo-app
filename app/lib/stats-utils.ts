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
    // 1. このユーザーのすべてのタスクを取得
    // 実際にはGoogle Tasks APIからタスクを取得する必要があります
    // ここでは実装の概要だけ示します
    
    // 2. 期間ごとにタスクをグループ化
    // 日次、週次、月次、年次のデータを集計
    
    // 3. 統計データをDB内の対応するレコードに一括更新
    
    // 実装例：日次データの更新
    // const tasksGroupedByDay = groupTasksByDay(tasks);
    // for (const [date, tasksForDay] of Object.entries(tasksGroupedByDay)) {
    //   const completedCount = tasksForDay.filter(task => task.status === 'completed').length;
    //   const createdCount = tasksForDay.length;
    //   
    //   await prisma.dailyStats.upsert({
    //     where: { 
    //       userId_date: {
    //         userId,
    //         date: new Date(date)
    //       }
    //     },
    //     update: {
    //       completedCount,
    //       createdCount,
    //       completionRate: calculateCompletionRate(completedCount, createdCount)
    //     },
    //     create: {
    //       userId,
    //       date: new Date(date),
    //       completedCount,
    //       createdCount,
    //       completionRate: calculateCompletionRate(completedCount, createdCount)
    //     }
    //   });
    // }
    
    // 同様に週次、月次、年次のデータも更新
    
    return { success: true };
  } catch (error) {
    console.error('Error recalculating all stats:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '統計データの再計算に失敗しました' 
    };
  }
} 