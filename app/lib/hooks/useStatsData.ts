'use client';

import { useState, useEffect } from 'react';
import { startOfDay, endOfDay, format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { PeriodType } from '../../components/dashboard/PeriodSelector';

export interface StatData {
  date: string;
  completedCount: number;
  createdCount: number;
  completionRate: number;
}

export interface TaskDistribution {
  name: string;
  value: number;
}

interface StatsResponse {
  dailyStats?: StatData[];
  weeklyStats?: StatData[];
  monthlyStats?: StatData[];
  yearlyStats?: StatData[];
}

interface DistributionResponse {
  priorityDistribution: TaskDistribution[];
  tagDistribution: TaskDistribution[];
}

/**
 * 統計データを取得するカスタムフック
 * React QueryとSWRを使用してキャッシュと再検証を最適化
 */
export function useStatsData(period: PeriodType, currentDate: Date) {
  // 検索パラメータと期間の計算
  const { startDateStr, endDateStr, url, queryKey } = getQueryParams(period, currentDate);
  
  // React Queryを使用してデータを取得
  const { 
    data: statsData, 
    isLoading: statsLoading, 
    error: statsError 
  } = useQuery({
    queryKey: ['stats', ...queryKey],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('統計データの取得に失敗しました');
      }
      return response.json() as Promise<StatsResponse>;
    },
    staleTime: 5 * 60 * 1000, // 5分間キャッシュを新鮮に保つ
    gcTime: 30 * 60 * 1000, // 30分間キャッシュを保持
    retry: 2, // 2回までリトライ
  });
  
  // 分布データを取得
  const { 
    data: distributionData, 
    isLoading: distributionLoading, 
    error: distributionError 
  } = useQuery({
    queryKey: ['distribution'],
    queryFn: async () => {
      const response = await fetch('/api/stats/distribution?limit=20');
      if (!response.ok) {
        throw new Error('分布データの取得に失敗しました');
      }
      return response.json() as Promise<DistributionResponse>;
    },
    // ユーザーがタスクを追加/更新した後に再取得するため、staleTimeは短く設定
    staleTime: 2 * 60 * 1000, // 2分間キャッシュを新鮮に保つ
    gcTime: 30 * 60 * 1000, // 30分間キャッシュを保持
    retry: 2, // 2回までリトライ
  });
  
  // 期間に応じたデータを抽出
  const data = (() => {
    if (!statsData) return [];
    
    switch (period) {
      case 'daily':
        return statsData.dailyStats || [];
      case 'weekly':
        return statsData.weeklyStats || [];
      case 'monthly':
        return statsData.monthlyStats || [];
      case 'yearly':
        return statsData.yearlyStats || [];
      default:
        return [];
    }
  })();
  
  // エラー状態を統合
  const error = statsError || distributionError
    ? (statsError || distributionError)?.toString() || '不明なエラーが発生しました'
    : null;
  
  // ローディング状態を統合
  const loading = statsLoading || distributionLoading;
  
  return { 
    data, 
    loading, 
    error, 
    priorityDistribution: distributionData?.priorityDistribution || [], 
    tagDistribution: distributionData?.tagDistribution || [] 
  };
}

/**
 * 期間タイプに応じてAPIエンドポイントと日付範囲を計算する関数
 */
function getQueryParams(period: PeriodType, currentDate: Date) {
  let startDateStr = '';
  let endDateStr = '';
  let url = '';
  let queryKey: string[] = [period];
  
  switch (period) {
    case 'daily': {
      const start = startOfDay(currentDate);
      const end = endOfDay(currentDate);
      startDateStr = format(start, 'yyyy-MM-dd');
      endDateStr = format(end, 'yyyy-MM-dd');
      url = `/api/stats/daily?startDate=${startDateStr}&endDate=${endDateStr}`;
      queryKey.push(startDateStr);
      break;
    }
    case 'weekly': {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });
      const year = format(start, 'yyyy');
      const week = String(Math.ceil(parseInt(format(start, 'w')) / 7));
      url = `/api/stats/weekly?year=${year}&week=${week}`;
      queryKey.push(year, week);
      break;
    }
    case 'monthly': {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      const year = format(start, 'yyyy');
      const month = format(start, 'M');
      url = `/api/stats/monthly?year=${year}&month=${month}`;
      queryKey.push(year, month);
      break;
    }
    case 'yearly': {
      const start = startOfYear(currentDate);
      const end = endOfYear(currentDate);
      const year = format(start, 'yyyy');
      url = `/api/stats/yearly?year=${year}`;
      queryKey.push(year);
      break;
    }
  }
  
  return { startDateStr, endDateStr, url, queryKey };
} 