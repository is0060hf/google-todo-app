'use client';

import React from 'react';
import {
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

interface CompletionRateChartProps {
  data: StatData[];
  period: PeriodType;
  loading?: boolean;
  error?: string | null;
}

/**
 * タスク完了率推移を表示する折れ線グラフコンポーネント
 */
export function CompletionRateChart({
  data,
  period,
  loading = false,
  error = null,
}: CompletionRateChartProps) {
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
    
    // 完了率をパーセンテージに変換
    const completionRatePercent = item.completionRate ? Math.round(item.completionRate * 100) : 0;
    
    return {
      ...item,
      dateLabel,
      completionRatePercent,
    };
  });
  
  // ローディング表示
  if (loading) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>タスク完了率推移</Typography>
        <Skeleton variant="rectangular" height={300} />
      </Paper>
    );
  }
  
  // エラー表示
  if (error) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>タスク完了率推移</Typography>
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }
  
  // データなし
  if (data.length === 0) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>タスク完了率推移</Typography>
        <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography>データがありません</Typography>
        </Box>
      </Paper>
    );
  }
  
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>タスク完了率推移</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={formattedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateLabel" />
          <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
          <Tooltip 
            formatter={(value) => [`${value}%`, '完了率']}
            labelFormatter={(label) => `期間: ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="completionRatePercent"
            name="完了率"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default CompletionRateChart; 