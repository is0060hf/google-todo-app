'use client';

import React from 'react';
import { 
  Box, 
  Skeleton, 
  Paper, 
  useTheme, 
  useMediaQuery
} from '@mui/material';

interface TaskSkeletonLoaderProps {
  rows?: number;
  dense?: boolean;
}

/**
 * タスク一覧画面用のスケルトン表示コンポーネント
 * デスクトップでは表形式、モバイルではカード形式のスケルトンを表示
 */
export default function TaskSkeletonLoader({ 
  rows = 8, 
  dense = false 
}: TaskSkeletonLoaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const height = dense ? 40 : 60;
  
  // モバイル用のカードスケルトン
  if (isMobile) {
    return (
      <Box sx={{ width: '100%', mt: 2 }}>
        {Array.from(new Array(rows)).map((_, index) => (
          <Paper
            key={index}
            sx={{
              p: 2,
              mb: 2,
              width: '100%',
              borderLeft: '4px solid',
              borderColor: 'grey.300'
            }}
            elevation={1}
          >
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <Skeleton variant="circular" width={24} height={24} sx={{ mr: 2 }} />
                <Skeleton variant="text" width="60%" height={28} />
              </Box>
              <Skeleton variant="text" width="90%" height={20} />
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Skeleton variant="text" width="40%" />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Skeleton variant="rounded" width={80} height={30} />
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    );
  }
  
  // デスクトップ用のテーブルスケルトン
  return (
    <Box sx={{ width: '100%', height: 'calc(100vh - 180px)', position: 'relative' }}>
      {/* ヘッダー行 */}
      <Box sx={{ display: 'flex', borderBottom: 1, borderColor: 'divider', p: 1 }}>
        <Skeleton variant="rectangular" width={50} height={40} sx={{ mr: 1 }} />
        <Skeleton variant="rectangular" width="30%" height={40} sx={{ mr: 1 }} />
        <Skeleton variant="rectangular" width="15%" height={40} sx={{ mr: 1 }} />
        <Skeleton variant="rectangular" width="15%" height={40} sx={{ mr: 1 }} />
        <Skeleton variant="rectangular" width="15%" height={40} sx={{ mr: 1 }} />
        <Skeleton variant="rectangular" width="10%" height={40} />
      </Box>

      {/* データ行 */}
      {Array.from(new Array(rows)).map((_, index) => (
        <Box 
          key={index} 
          sx={{ 
            display: 'flex', 
            borderBottom: 1, 
            borderColor: 'divider',
            p: 1,
            '&:nth-of-type(odd)': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <Skeleton variant="rectangular" width={24} height={height} sx={{ mr: 1, borderRadius: 1 }} />
          <Skeleton variant="rectangular" width="30%" height={height} sx={{ mr: 1, borderRadius: 1 }} />
          <Skeleton variant="rectangular" width="15%" height={height} sx={{ mr: 1, borderRadius: 1 }} />
          <Skeleton variant="rectangular" width="15%" height={height} sx={{ mr: 1, borderRadius: 1 }} />
          <Skeleton variant="rectangular" width="15%" height={height} sx={{ mr: 1, borderRadius: 1 }} />
          <Skeleton variant="rectangular" width="10%" height={height} sx={{ borderRadius: 1 }} />
        </Box>
      ))}
      
      {/* ツールバー風のスケルトン */}
      <Box sx={{ position: 'absolute', top: 0, right: 0, p: 1, display: 'flex', gap: 1 }}>
        <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: 1 }} />
      </Box>
    </Box>
  );
} 