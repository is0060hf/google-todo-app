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
import { 
  Box, 
  Typography, 
  Paper, 
  Skeleton, 
  Button, 
  Stack,
  useTheme
} from '@mui/material';
import { 
  EventNote as EventNoteIcon,
  ArrowForward as ArrowForwardIcon, 
  Info as InfoIcon 
} from '@mui/icons-material';
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import { PeriodType } from './PeriodSelector';
import { StatData } from '../../lib/hooks/useStatsData';
import { useTranslation } from 'next-i18next';

interface CompletedTasksChartProps {
  data: StatData[];
  period: PeriodType;
  loading?: boolean;
  error?: string | null;
}

/**
 * 完了タスク数推移を表示するグラフコンポーネント
 * 日次・週次は棒グラフ、月次・年次は折れ線グラフで表示
 */
export function CompletedTasksChart({
  data,
  period,
  loading = false,
  error = null,
}: CompletedTasksChartProps) {
  const theme = useTheme();
  const { t } = useTranslation('common');
  
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
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          {t('dashboard.completedTasks')}
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Skeleton variant="rectangular" width="100%" height={300} />
        </Box>
      </Box>
    );
  }
  
  // エラー表示
  if (error) {
    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          {t('dashboard.completedTasks')}
        </Typography>
        <Box 
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: 3
          }}
        >
          <InfoIcon color="error" sx={{ fontSize: 48, mb: 2 }} />
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {t('dashboard.errorTryLater')}
          </Typography>
        </Box>
      </Box>
    );
  }
  
  // データなし
  if (data.length === 0) {
    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          {t('dashboard.completedTasks')}
        </Typography>
        <Box 
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: 3
          }}
        >
          <EventNoteIcon 
            sx={{ 
              fontSize: 64, 
              mb: 2, 
              color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)' 
            }} 
          />
          <Typography variant="h6" align="center" gutterBottom>
            {t('dashboard.noData')}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2, maxWidth: 400 }}>
            {t('dashboard.completedTasksHint')}
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<ArrowForwardIcon />}
            href="/tasks"
            size="small"
          >
            {t('dashboard.goToTasks')}
          </Button>
        </Box>
      </Box>
    );
  }
  
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        {t('dashboard.completedTasks')}
      </Typography>
      <Box sx={{ flexGrow: 1, minHeight: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          {isBarChart ? (
            <BarChart
              data={formattedData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dateLabel" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} ${t('dashboard.taskCount')}`, t('dashboard.completedTasks')]}
                labelFormatter={(label) => `${t('dashboard.date')}: ${label}`}
              />
              <Legend />
              <Bar dataKey="completedCount" name={t('dashboard.completedTasks')} fill="#8884d8" />
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
                formatter={(value) => [`${value} ${t('dashboard.taskCount')}`, t('dashboard.completedTasks')]}
                labelFormatter={(label) => `${t('dashboard.period')}: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="completedCount" 
                name={t('dashboard.completedTasks')} 
                stroke="#8884d8" 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

export default CompletedTasksChart; 