'use client';

import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

interface LoadingProps {
  message?: string;
  size?: number;
  fullPage?: boolean;
}

/**
 * ローディング表示コンポーネント
 */
export function Loading({ 
  message = 'ローディング中...', 
  size = 40, 
  fullPage = false 
}: LoadingProps) {
  const content = (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center"
      sx={{ p: 2 }}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography 
          variant="body1" 
          sx={{ mt: 2, color: 'text.secondary' }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );

  if (fullPage) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          zIndex: 9999,
        }}
      >
        {content}
      </Box>
    );
  }

  return content;
}

/**
 * スケルトンローディングコンポーネントをエクスポート
 * ここにはSkeletonコンポーネントを実装することが可能
 */

export default Loading; 