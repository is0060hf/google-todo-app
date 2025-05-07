'use client';

import { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Container, 
  Alert 
} from '@mui/material';
import { ErrorOutline as ErrorIcon } from '@mui/icons-material';
import * as Sentry from '@sentry/nextjs';
import { useRouter } from 'next/navigation';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    // Sentryにエラーを送信
    Sentry.captureException(error);
    
    // エラーをコンソールに出力（開発環境のみ）
    if (process.env.NODE_ENV === 'development') {
      console.error('Global Error:', error);
    }
  }, [error]);

  const handleReportIssue = () => {
    Sentry.showReportDialog({
      eventId: Sentry.lastEventId(),
      title: 'エラーが発生しました',
      subtitle: '開発チームに問題を報告し、改善にご協力ください',
      subtitle2: '必要に応じて問題の詳細を記入してください',
      labelName: 'お名前',
      labelEmail: 'メールアドレス',
      labelComments: '詳細',
      labelClose: '閉じる',
      labelSubmit: '送信',
      successMessage: 'フィードバックをありがとうございます！',
      errorFormEntry: '全ての必須フィールドに入力してください',
      errorGeneric: '送信中にエラーが発生しました。もう一度お試しください'
    });
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          py: 5
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 5,
            width: '100%',
            textAlign: 'center',
            borderRadius: 2
          }}
        >
          <ErrorIcon color="error" sx={{ fontSize: 72, mb: 3 }} />
          <Typography variant="h4" gutterBottom>
            エラーが発生しました
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            申し訳ありませんが、アプリケーションで問題が発生しました。
          </Typography>
          
          <Alert severity="error" sx={{ my: 3, textAlign: 'left' }}>
            {error.message || 'アプリケーションエラーが発生しました。'}
            {error.digest && <Box component="span" sx={{ display: 'block', mt: 1, fontSize: '0.8rem' }}>
              エラーコード: {error.digest}
            </Box>}
          </Alert>
          
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => reset()}
              size="large"
            >
              再試行
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => router.push('/')}
              size="large"
            >
              ホームに戻る
            </Button>
            <Button
              variant="text"
              color="info"
              onClick={handleReportIssue}
              size="large"
            >
              問題を報告
            </Button>
          </Box>
          
          {process.env.NODE_ENV === 'development' && (
            <Box sx={{ mt: 5, textAlign: 'left' }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                詳細情報（開発環境のみ表示）:
              </Typography>
              <Box
                component="pre"
                sx={{
                  p: 2,
                  backgroundColor: 'grey.100',
                  borderRadius: 1,
                  overflow: 'auto',
                  fontSize: '0.8rem',
                  maxHeight: '200px'
                }}
              >
                {error.stack}
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
} 