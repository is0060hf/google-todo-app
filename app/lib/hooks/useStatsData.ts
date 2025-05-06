'use client';

import { useState, useEffect } from 'react';
import { startOfDay, endOfDay, format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
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
 */
export function useStatsData(period: PeriodType, currentDate: Date) {
  const [data, setData] = useState<StatData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [priorityDistribution, setPriorityDistribution] = useState<TaskDistribution[]>([]);
  const [tagDistribution, setTagDistribution] = useState<TaskDistribution[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let url = '';
        let startDateStr = '';
        let endDateStr = '';
        
        // 期間タイプに応じてAPIエンドポイントと日付範囲を設定
        switch (period) {
          case 'daily': {
            const start = startOfDay(currentDate);
            const end = endOfDay(currentDate);
            startDateStr = format(start, 'yyyy-MM-dd');
            endDateStr = format(end, 'yyyy-MM-dd');
            url = `/api/stats/daily?startDate=${startDateStr}&endDate=${endDateStr}`;
            break;
          }
          case 'weekly': {
            const start = startOfWeek(currentDate, { weekStartsOn: 1 });
            const end = endOfWeek(currentDate, { weekStartsOn: 1 });
            startDateStr = format(start, 'yyyy-MM-dd');
            endDateStr = format(end, 'yyyy-MM-dd');
            url = `/api/stats/weekly?year=${format(start, 'yyyy')}&week=${Math.ceil(parseInt(format(start, 'w')) / 7)}`;
            break;
          }
          case 'monthly': {
            const start = startOfMonth(currentDate);
            const end = endOfMonth(currentDate);
            const year = format(start, 'yyyy');
            const month = format(start, 'M');
            url = `/api/stats/monthly?year=${year}&month=${month}`;
            break;
          }
          case 'yearly': {
            const start = startOfYear(currentDate);
            const end = endOfYear(currentDate);
            const year = format(start, 'yyyy');
            url = `/api/stats/yearly?year=${year}`;
            break;
          }
        }
        
        // APIからデータ取得
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('統計データの取得に失敗しました');
        }
        
        const responseData: StatsResponse = await response.json();
        
        // 期間タイプに応じたデータを設定
        switch (period) {
          case 'daily':
            setData(responseData.dailyStats || []);
            break;
          case 'weekly':
            setData(responseData.weeklyStats || []);
            break;
          case 'monthly':
            setData(responseData.monthlyStats || []);
            break;
          case 'yearly':
            setData(responseData.yearlyStats || []);
            break;
        }
        
        // 優先度とタグの分布データを取得
        const distributionResponse = await fetch('/api/stats/distribution');
        if (!distributionResponse.ok) {
          throw new Error('分布データの取得に失敗しました');
        }
        
        const distributionData: DistributionResponse = await distributionResponse.json();
        setPriorityDistribution(distributionData.priorityDistribution || []);
        setTagDistribution(distributionData.tagDistribution || []);
        
      } catch (err) {
        console.error('Error fetching stats data:', err);
        setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [period, currentDate]);
  
  return { data, loading, error, priorityDistribution, tagDistribution };
} 