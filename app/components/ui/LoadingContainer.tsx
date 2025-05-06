'use client';

import React, { ReactNode } from 'react';
import { Box, CircularProgress, Typography, Alert, Button } from '@mui/material';

interface LoadingContainerProps {
  isLoading: boolean;
  error: Error | null | string;
  children: ReactNode;
  loadingMessage?: string;
  onRetry?: () => void;
  minHeight?: string | number;
}

/**
 * データ読み込み中の表示とエラー表示を統一するコンテナコンポーネント
 */
export default function LoadingContainer({
  isLoading,
  error,
  children,
  loadingMessage = 'データを読み込んでいます...',
  onRetry,
  minHeight = '300px'
}: LoadingContainerProps) {
  // データロード中の表示
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight,
          width: '100%'
        }}
      >
        <CircularProgress size={40} thickness={4} />
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          {loadingMessage}
        </Typography>
      </Box>
    );
  }

  // エラー発生時の表示
  if (error) {
    const errorMessage = typeof error === 'string' ? error : error.message || 'エラーが発生しました';
    
    return (
      <Box sx={{ width: '100%', minHeight }}>
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          action={
            onRetry && (
              <Button color="inherit" size="small" onClick={onRetry}>
                再試行
              </Button>
            )
          }
        >
          {errorMessage}
        </Alert>
      </Box>
    );
  }

  // 正常時は子コンポーネントを表示
  return <>{children}</>;
} 