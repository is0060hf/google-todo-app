'use client';

import { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Alert,
  Grid
} from '@mui/material';
import { Dashboard as DashboardIcon } from '@mui/icons-material';
import * as Sentry from '@sentry/nextjs';
import { useRouter } from 'next/navigation';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    // Sentryにエラーを送信し、タグを付ける
    Sentry.withScope((scope) => {
      scope.setTag('section', 'dashboard');
      Sentry.captureException(error);
    });
    
    // エラーをコンソールに出力（開発環境のみ）
    if (process.env.NODE_ENV === 'development') {
      console.error('Dashboard Error:', error);
    }
  }, [error]);

  return (
    <Box 
      sx={{ 
        display: 'flex',
        minHeight: '70vh',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: 2,
          maxWidth: '600px',
          width: '100%'
        }}
      >
        <DashboardIcon color="error" sx={{ fontSize: 56, mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          ダッシュボードでエラーが発生しました
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          統計データの取得または表示中に問題が発生しました。
        </Typography>
        
        <Alert severity="error" sx={{ my: 2, textAlign: 'left' }}>
          {error.message || '統計データに関連するエラーが発生しました。'}
        </Alert>
        
        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => reset()}
          >
            再試行
          </Button>
          <Button
            variant="outlined"
            onClick={() => router.push('/tasks')}
          >
            タスク一覧へ
          </Button>
        </Box>
        
        {process.env.NODE_ENV === 'development' && (
          <Box sx={{ mt: 3, textAlign: 'left' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              エラー詳細（開発環境のみ表示）:
            </Typography>
            <Box
              component="pre"
              sx={{
                p: 2,
                backgroundColor: 'grey.100',
                borderRadius: 1,
                overflow: 'auto',
                fontSize: '0.8rem',
                maxHeight: '150px'
              }}
            >
              {error.stack}
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
} 