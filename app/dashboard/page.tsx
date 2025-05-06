'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import PeriodSelector, { PeriodType } from '../components/dashboard/PeriodSelector';
import CompletedTasksChart from '../components/dashboard/CompletedTasksChart';
import CompletionRateChart from '../components/dashboard/CompletionRateChart';
import CreatedVsCompletedChart from '../components/dashboard/CreatedVsCompletedChart';
import ActivityHeatmapChart from '../components/dashboard/ActivityHeatmapChart';
import DistributionPieChart from '../components/dashboard/DistributionPieChart';
import { useStatsData } from '../lib/hooks/useStatsData';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [period, setPeriod] = useState<PeriodType>('monthly');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  const { 
    data, 
    loading, 
    error, 
    priorityDistribution,
    tagDistribution
  } = useStatsData(period, currentDate);
  
  // 認証中・未認証の場合
  if (status === 'loading') {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  if (status === 'unauthenticated' || !session) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="warning">
          ダッシュボードを表示するにはログインが必要です。
        </Alert>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        ダッシュボード
      </Typography>
      
      <PeriodSelector
        period={period}
        currentDate={currentDate}
        onPeriodChange={setPeriod}
        onDateChange={setCurrentDate}
      />
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* 統計グラフ */}
        <Box sx={{ width: { xs: '100%', md: 'calc(50% - 1.5rem)' } }}>
          <CompletedTasksChart
            data={data}
            period={period}
            loading={loading}
            error={error ? error : null}
          />
        </Box>
        
        <Box sx={{ width: { xs: '100%', md: 'calc(50% - 1.5rem)' } }}>
          <CompletionRateChart
            data={data}
            period={period}
            loading={loading}
            error={error ? error : null}
          />
        </Box>
        
        <Box sx={{ width: { xs: '100%', md: 'calc(50% - 1.5rem)' } }}>
          <CreatedVsCompletedChart
            data={data}
            period={period}
            loading={loading}
            error={error ? error : null}
          />
        </Box>
        
        <Box sx={{ width: { xs: '100%', md: 'calc(50% - 1.5rem)' } }}>
          <DistributionPieChart
            priorityDistribution={priorityDistribution}
            tagDistribution={tagDistribution}
            loading={loading}
            error={error ? error : null}
          />
        </Box>
        
        <Box sx={{ width: '100%' }}>
          <ActivityHeatmapChart
            data={data}
            period={period}
            currentDate={currentDate}
            loading={loading}
            error={error ? error : null}
          />
        </Box>
      </Box>
    </Container>
  );
} 