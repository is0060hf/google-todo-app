'use client';

import { 
  Box, 
  Typography, 
  Button, 
  Paper,
  Container
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function NotFound() {
  const router = useRouter();
  
  useEffect(() => {
    // 404エラーをSentryに記録
    Sentry.withScope((scope) => {
      scope.setLevel('info');
      scope.setTag('errorType', 'not_found');
      scope.setTag('url', typeof window !== 'undefined' ? window.location.href : '');
      Sentry.captureMessage('404 Page Not Found', 'info');
    });
  }, []);

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
          <SearchIcon color="primary" sx={{ fontSize: 72, mb: 3, opacity: 0.7 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            404
          </Typography>
          <Typography variant="h5" gutterBottom>
            ページが見つかりません
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: '500px', mx: 'auto', mb: 4 }}>
            お探しのページは存在しないか、移動または削除された可能性があります。
          </Typography>
          
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/')}
              size="large"
            >
              ホームに戻る
            </Button>
            <Button
              variant="outlined"
              onClick={() => router.back()}
              size="large"
            >
              前のページに戻る
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
} 