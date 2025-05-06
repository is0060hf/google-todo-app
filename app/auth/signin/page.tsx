'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Box, Container, Typography, Paper, Button, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard';

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      
      // GoogleでサインインしAPI権限も取得
      const result = await signIn('google', {
        callbackUrl,
        redirect: true,
      });
      
      // signInがfalseを返した場合（通常はリダイレクトするのでここには来ない）
      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError('ログイン中にエラーが発生しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: '100%' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Google TODO連携アプリ
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Googleアカウントでログインして、タスク管理を始めましょう
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<GoogleIcon />}
            onClick={handleSignIn}
            disabled={loading}
            sx={{ 
              py: 1.5, 
              px: 4, 
              borderRadius: 2,
              backgroundColor: '#4285F4', 
              '&:hover': { backgroundColor: '#3367D6' } 
            }}
          >
            {loading ? 'ログイン中...' : 'Googleでログイン'}
          </Button>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            ログインすることで、タスクの管理やGoogle Tasksとの連携機能が利用できます。
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            また、ログイン後に利用規約とプライバシーポリシーへの同意が必要です。
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
} 