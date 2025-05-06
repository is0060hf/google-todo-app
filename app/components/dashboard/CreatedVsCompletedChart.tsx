'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Box, Typography, Paper, Skeleton } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import { PeriodType } from './PeriodSelector';
import { StatData } from '../../lib/hooks/useStatsData';

interface CreatedVsCompletedChartProps {
  data: StatData[];
  period: PeriodType;
  loading?: boolean;
  error?: string | null;
}

/**
 * タスクの作成数と完了数を比較するグラフコンポーネント
 * 日次・週次はグループ化された棒グラフ、月次・年次は折れ線グラフで表示
 */
export function CreatedVsCompletedChart({
  data,
  period,
  loading = false,
  error = null,
}: CreatedVsCompletedChartProps) {
  // データ整形
  const formattedData = data.map((item) => {
    let dateLabel = '';
    if (item.date) {
      const date = typeof item.date === 'string' ? parseISO(item.date) : new Date(item.date);
      
      switch (period) {
        case 'daily':
          dateLabel = format(date, 'M/d', { locale: ja });
          break;
        case 'weekly':
          dateLabel = `W${format(date, 'w')}`;
          break;
        case 'monthly':
          dateLabel = format(date, 'M月', { locale: ja });
          break;
        case 'yearly':
          dateLabel = format(date, 'yyyy年', { locale: ja });
          break;
      }
    }
    
    return {
      ...item,
      dateLabel,
    };
  });
  
  // 日次・週次は棒グラフ、月次・年次は折れ線グラフ
  const isBarChart = period === 'daily' || period === 'weekly';
  
  // ローディング表示
  if (loading) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>タスク作成数 vs 完了数</Typography>
        <Skeleton variant="rectangular" height={300} />
      </Paper>
    );
  }
  
  // エラー表示
  if (error) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>タスク作成数 vs 完了数</Typography>
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }
  
  // データなし
  if (data.length === 0) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>タスク作成数 vs 完了数</Typography>
        <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography>データがありません</Typography>
        </Box>
      </Paper>
    );
  }
  
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>タスク作成数 vs 完了数</Typography>
      <ResponsiveContainer width="100%" height={300}>
        {isBarChart ? (
          <BarChart
            data={formattedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dateLabel" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`${value} 件`, '']}
              labelFormatter={(label) => `日付: ${label}`}
            />
            <Legend />
            <Bar dataKey="createdCount" name="作成タスク" fill="#8884d8" />
            <Bar dataKey="completedCount" name="完了タスク" fill="#82ca9d" />
          </BarChart>
        ) : (
          <LineChart
            data={formattedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dateLabel" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => {
                const label = name === 'createdCount' ? '作成タスク' : '完了タスク';
                return [`${value} 件`, label];
              }}
              labelFormatter={(label) => `期間: ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="createdCount" 
              name="作成タスク" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
            />
            <Line 
              type="monotone" 
              dataKey="completedCount" 
              name="完了タスク" 
              stroke="#82ca9d" 
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </Paper>
  );
}

export default CreatedVsCompletedChart; 