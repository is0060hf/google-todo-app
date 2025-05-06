'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper, Alert } from '@mui/material';
import { ErrorOutline as ErrorIcon } from '@mui/icons-material';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * アプリケーション全体のエラーをキャッチするエラーバウンダリコンポーネント
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // エラー発生時に状態を更新
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // エラー情報をログ出力
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      errorInfo
    });

    // ここで外部エラー監視サービス（例：Sentry）にエラーを送信することも可能
  }

  handleReset = (): void => {
    // エラー状態をリセットし、アプリを再マウント
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // カスタムのフォールバックUIを表示
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // デフォルトのエラー表示
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            p: 3
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              maxWidth: 600,
              width: '100%',
              textAlign: 'center'
            }}
          >
            <ErrorIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              エラーが発生しました
            </Typography>
            <Alert severity="error" sx={{ my: 2, textAlign: 'left' }}>
              {this.state.error?.message || 'アプリケーションでエラーが発生しました。'}
            </Alert>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleReset}
              sx={{ mt: 2 }}
            >
              リセット
            </Button>
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <Box sx={{ mt: 3, textAlign: 'left' }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  エラー詳細（開発環境のみ表示）:
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    p: 2,
                    backgroundColor: '#f5f5f5',
                    borderRadius: 1,
                    overflow: 'auto',
                    fontSize: '0.8rem'
                  }}
                >
                  {this.state.error?.stack}
                </Box>
              </Box>
            )}
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 