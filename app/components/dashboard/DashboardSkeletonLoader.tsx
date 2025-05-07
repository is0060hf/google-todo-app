'use client';

import React from 'react';
import { Box, Paper, Skeleton, Typography } from '@mui/material';

interface DashboardSkeletonLoaderProps {
  compact?: boolean;
}

/**
 * ダッシュボード用のスケルトン表示コンポーネント
 * ダッシュボードに表示されるすべてのグラフやウィジェットのローディング状態を表現
 */
export default function DashboardSkeletonLoader({ compact = false }: DashboardSkeletonLoaderProps) {
  const height = compact ? 200 : 300;
  
  return (
    <Box>
      {/* 期間選択タブのスケルトン */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <Skeleton variant="rectangular" width={120} height={40} sx={{ mr: 1, borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={120} height={40} sx={{ mr: 1, borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={120} height={40} sx={{ mr: 1, borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 1 }} />
        </Box>
      </Box>
      
      {/* グラフのグリッドレイアウト */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
        {/* 完了タスク数グラフのスケルトン */}
        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '280px' }}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              完了タスク数
            </Typography>
            <Skeleton variant="rectangular" height={height} />
          </Paper>
        </Box>
        
        {/* タスク完了率グラフのスケルトン */}
        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '280px' }}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              タスク完了率
            </Typography>
            <Skeleton variant="rectangular" height={height} />
          </Paper>
        </Box>
        
        {/* 作成vs完了グラフのスケルトン */}
        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '280px' }}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              作成 vs 完了
            </Typography>
            <Skeleton variant="rectangular" height={height} />
          </Paper>
        </Box>
        
        {/* アクティビティヒートマップのスケルトン */}
        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '280px' }}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              アクティビティ
            </Typography>
            <Skeleton variant="rectangular" height={height} />
          </Paper>
        </Box>
      </Box>
      
      {/* 分布円グラフのスケルトン */}
      <Box sx={{ mb: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              タスク分布
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Skeleton variant="rectangular" width={80} height={30} sx={{ mr: 1, borderRadius: 1 }} />
              <Skeleton variant="rectangular" width={80} height={30} sx={{ borderRadius: 1 }} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: '280px' }}>
              <Skeleton variant="rectangular" height={compact ? 200 : 250} />
            </Box>
            <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: '280px' }}>
              <Skeleton variant="rectangular" height={compact ? 200 : 250} />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
} 