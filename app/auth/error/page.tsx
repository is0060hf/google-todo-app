'use client';

import { useSearchParams } from 'next/navigation';
import { Container, Typography, Paper, Button, Box, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams?.get('error');

  // エラーメッセージの対応表
  const errorMessages: Record<string, string> = {
    default: '認証中にエラーが発生しました',
    configuration: '認証サーバーの設定に問題があります',
    accessdenied: 'アクセスが拒否されました',
    verification: 'メール検証に失敗しました',
    signin: 'サインインに失敗しました',
    callback: 'コールバック処理中にエラーが発生しました',
    oauthsignin: 'OAuthプロバイダでの認証開始に失敗しました',
    oauthcallback: 'OAuthコールバック中にエラーが発生しました',
    sessionrequired: 'このページにアクセスするにはログインが必要です',
  };

  // エラーメッセージを取得
  const errorMessage = error ? (errorMessages[error] || errorMessages.default) : errorMessages.default;

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          認証エラー
        </Typography>

        <Alert severity="error" sx={{ my: 3 }}>
          {errorMessage}
        </Alert>

        <Typography variant="body1" paragraph>
          ログイン中に問題が発生しました。以下の対処法をお試しください:
        </Typography>

        <Box component="ul" sx={{ pl: 3 }}>
          <Typography component="li" variant="body1" paragraph>
            ブラウザのCookieとキャッシュをクリアしてから再度お試しください
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            別のブラウザでアクセスしてみてください
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            問題が解決しない場合は、サポートにお問い合わせください
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/auth/signin')}
          >
            ログイン画面に戻る
          </Button>
        </Box>
      </Paper>
    </Container>
  );
} 