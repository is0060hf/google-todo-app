'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper, Alert } from '@mui/material';
import { ErrorOutline as ErrorIcon } from '@mui/icons-material';
import * as Sentry from '@sentry/nextjs';

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
 * Sentryと統合してエラー監視を行います
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

    // Sentryにエラーを送信
    Sentry.withScope((scope) => {
      // エラー情報を付加
      scope.setExtras({
        componentStack: errorInfo.componentStack,
        ...this.extractErrorContext()
      });
      
      // エラーの種類に応じてタグを設定
      if (error.name) {
        scope.setTag('error.type', error.name);
      }
      
      // エラーの重大度を設定
      scope.setLevel(Sentry.Severity.Error);
      
      // エラーを送信
      Sentry.captureException(error);
    });
  }

  // エラーの文脈情報を抽出するヘルパーメソッド
  extractErrorContext(): Record<string, any> {
    try {
      // 現在のURL
      const context: Record<string, any> = {
        url: window.location.href,
        userAgent: navigator.userAgent
      };
      
      // ブラウザの言語設定
      if (navigator.language) {
        context.language = navigator.language;
      }
      
      // 画面サイズ
      context.screenSize = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      
      return context;
    } catch (e) {
      console.error('Error while extracting context:', e);
      return {};
    }
  }

  handleReset = (): void => {
    // エラー状態をリセットし、アプリを再マウント
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleReportIssue = (): void => {
    // Sentryのユーザーフィードバックを収集（オプション）
    if (this.state.error) {
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
    }
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
            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleReset}
              >
                リセット
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.handleReportIssue}
              >
                問題を報告
              </Button>
            </Box>
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