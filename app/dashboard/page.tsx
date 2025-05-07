'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Alert,
  CircularProgress,
  useMediaQuery,
  Theme,
  useTheme
} from '@mui/material';
import { CompletedTasksChart } from '../components/dashboard/CompletedTasksChart';
import { CompletionRateChart } from '../components/dashboard/CompletionRateChart';
import { CreatedVsCompletedChart } from '../components/dashboard/CreatedVsCompletedChart';
import { ActivityHeatmapChart } from '../components/dashboard/ActivityHeatmapChart';
import { DistributionPieChart } from '../components/dashboard/DistributionPieChart';
import { PeriodSelector, PeriodType } from '../components/dashboard/PeriodSelector';
import DashboardSkeletonLoader from '../components/dashboard/DashboardSkeletonLoader';
import { useStatsData } from '../lib/hooks/useStatsData';
import { useTranslation } from 'react-i18next';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation('common');
  
  const [period, setPeriod] = useState<PeriodType>('monthly');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  const { 
    data, 
    loading, 
    error, 
    priorityDistribution, 
    tagDistribution 
  } = useStatsData(period, currentDate);
  
  // ローディング中のスケルトン表示
  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <DashboardSkeletonLoader compact={isSmallScreen} />
      </Container>
    );
  }
  
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
    <Container maxWidth="lg" sx={{ mt: 4, pb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        ダッシュボード
      </Typography>
      
      <PeriodSelector
        period={period}
        currentDate={currentDate}
        onPeriodChange={setPeriod}
        onDateChange={setCurrentDate}
      />
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mt: 3 }}>
        {/* 完了タスク数グラフ */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: { xs: 2, md: 3 },
            height: '100%', 
            minHeight: { xs: '300px', md: '400px' },
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <CompletedTasksChart
            data={data}
            period={period}
            loading={loading}
            error={error ? error : null}
          />
        </Paper>
        
        {/* 完了率グラフ */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: { xs: 2, md: 3 },
            height: '100%', 
            minHeight: { xs: '300px', md: '400px' },
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <CompletionRateChart
            data={data}
            period={period}
            loading={loading}
            error={error ? error : null}
          />
        </Paper>
        
        {/* 作成/完了比較グラフ */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: { xs: 2, md: 3 },
            height: '100%', 
            minHeight: { xs: '300px', md: '400px' },
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <CreatedVsCompletedChart
            data={data}
            period={period}
            loading={loading}
            error={error ? error : null}
          />
        </Paper>
        
        {/* 分布円グラフ */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: { xs: 2, md: 3 },
            height: '100%', 
            minHeight: { xs: '300px', md: '400px' },
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <DistributionPieChart
            priorityDistribution={priorityDistribution}
            tagDistribution={tagDistribution}
            loading={loading}
            error={error ? error : null}
          />
        </Paper>
      </Box>
      
      {/* アクティビティヒートマップ - 常に横幅いっぱい */}
      <Paper 
        elevation={2} 
        sx={{ 
          p: { xs: 2, md: 3 },
          minHeight: { xs: '250px', md: '300px' },
          mt: 3
        }}
      >
        <ActivityHeatmapChart
          data={data}
          period={period}
          currentDate={currentDate}
          loading={loading}
          error={error ? error : null}
          compact={isSmallScreen} // モバイル表示では省スペースモード
        />
      </Paper>
    </Container>
  );
} 