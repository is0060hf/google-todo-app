'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Container, Typography, Paper, Alert } from '@mui/material';

/**
 * モック認証ページ
 * このページはテスト環境でのみ利用され、E2Eテスト用にモックの認証を行います
 */
export default function MockSignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('test@example.com');
  const [name, setName] = useState('Test User');
  const [error, setError] = useState('');
  
  // 開発環境またはテスト環境でのみ表示
  const isTestEnvironment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
  
  const handleMockLogin = async () => {
    try {
      // テスト環境用のモックログインAPI
      const response = await fetch('/api/auth/mock-signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });
      
      if (!response.ok) {
        throw new Error('Authentication failed');
      }
      
      // ログイン成功後にダッシュボードにリダイレクト
      router.push('/dashboard');
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error('Mock login error:', err);
    }
  };
  
  if (!isTestEnvironment) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Alert severity="error">
          This page is only available in test or development environment.
        </Alert>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="h4" component="h1" align="center">
            Mock Sign In
          </Typography>
          
          <Typography variant="subtitle1" color="text.secondary" align="center">
            This page is only for E2E testing purposes
          </Typography>
          
          {error && <Alert severity="error">{error}</Alert>}
          
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="mock-email-input"
          />
          
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-testid="mock-name-input"
          />
          
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleMockLogin}
            data-testid="mock-login-button"
          >
            Sign In (Mock)
          </Button>
        </Box>
      </Paper>
    </Container>
  );
} 