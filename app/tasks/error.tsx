'use client';

import { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Alert 
} from '@mui/material';
import { TaskAlt } from '@mui/icons-material';
import * as Sentry from '@sentry/nextjs';
import { useRouter } from 'next/navigation';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function TasksError({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    // Sentryにエラーを送信し、タグを付ける
    Sentry.withScope((scope) => {
      scope.setTag('section', 'tasks');
      Sentry.captureException(error);
    });
    
    // エラーをコンソールに出力（開発環境のみ）
    if (process.env.NODE_ENV === 'development') {
      console.error('Tasks Error:', error);
    }
  }, [error]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        p: 3
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
          borderRadius: 2
        }}
      >
        <TaskAlt color="error" sx={{ fontSize: 56, mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          タスク画面でエラーが発生しました
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          タスクデータの取得または処理中に問題が発生しました。
        </Typography>
        
        <Alert severity="error" sx={{ my: 2, textAlign: 'left' }}>
          {error.message || 'タスク関連のエラーが発生しました。'}
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
            onClick={() => router.push('/dashboard')}
          >
            ダッシュボードへ
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