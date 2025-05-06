'use client';

import { useState } from 'react';
import { Box, Container, Typography, Paper, Checkbox, FormControlLabel, Button, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function TermsAgreementPage() {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, update } = useSession();

  if (!session?.user) {
    return (
      <Container maxWidth="md" sx={{ pt: 4 }}>
        <Alert severity="error">ログインが必要です</Alert>
      </Container>
    );
  }

  const handleAgree = async () => {
    if (!agreed) {
      setError('続行するには利用規約とプライバシーポリシーに同意してください');
      return;
    }

    setLoading(true);
    try {
      // 利用規約同意情報をサーバーに保存
      const response = await fetch('/api/user/agree-to-terms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('処理に失敗しました');
      }

      // セッションを更新
      await update({ agreedToTerms: true });

      // ダッシュボードにリダイレクト
      router.push('/dashboard');
    } catch (err) {
      console.error('Error:', err);
      setError('エラーが発生しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          利用規約・プライバシーポリシー
        </Typography>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            利用規約
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, maxHeight: 200, overflow: 'auto', mb: 3 }}>
            <Typography variant="body2">
              本サービス「Google TODO連携アプリ」（以下「本サービス」）の利用にあたり、以下の利用規約に同意いただく必要があります。
              
              <br /><br />
              <strong>1. サービスの概要</strong>
              <br />
              本サービスは、Google Tasks APIと連携し、ユーザーのタスク管理を強化・可視化するWebアプリケーションです。
              
              <br /><br />
              <strong>2. 利用条件</strong>
              <br />
              本サービスの利用には、Googleアカウントでの認証が必要です。また、Google Tasks APIへのアクセス権限を当サービスに付与する必要があります。
              
              <br /><br />
              <strong>3. ユーザーの責任</strong>
              <br />
              ユーザーは、自己のアカウント情報の管理について責任を負うものとします。
              
              <br /><br />
              <strong>4. サービスの変更・中断・終了</strong>
              <br />
              当サービスは、予告なくサービスの内容の変更、中断、終了を行う場合があります。
              
              <br /><br />
              <strong>5. 免責事項</strong>
              <br />
              当サービスは、Google Tasks APIとの連携に依存しているため、APIの仕様変更や障害により、正常に動作しなくなる可能性があります。
            </Typography>
          </Paper>

          <Typography variant="h5" component="h2" gutterBottom>
            プライバシーポリシー
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, maxHeight: 200, overflow: 'auto', mb: 3 }}>
            <Typography variant="body2">
              <strong>1. 取得する情報</strong>
              <br />
              本サービスでは、以下の情報を取得します：
              <br />
              ・Googleアカウント情報（名前、メールアドレス、プロフィール画像）
              <br />
              ・Google Tasks データ（タスクリスト、タスク内容）
              <br />
              ・サービス利用情報（アクセスログ、利用状況など）
              
              <br /><br />
              <strong>2. 情報の利用目的</strong>
              <br />
              取得した情報は、以下の目的で利用します：
              <br />
              ・サービスの提供・維持・改善
              <br />
              ・ユーザーへのサポート提供
              <br />
              ・新機能や更新情報のお知らせ
              
              <br /><br />
              <strong>3. 第三者への情報提供</strong>
              <br />
              法令に基づく場合を除き、ユーザーの同意なく第三者に情報を提供することはありません。
              
              <br /><br />
              <strong>4. データの保管</strong>
              <br />
              取得したデータは、安全に管理されたデータベースに保存されます。アカウント削除時には、合理的な期間内にすべてのデータが削除されます。
              
              <br /><br />
              <strong>5. お問い合わせ</strong>
              <br />
              プライバシーポリシーに関するお問い合わせは、サポートページからご連絡ください。
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ mb: 4 }}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={agreed} 
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  if (e.target.checked) setError('');
                }}
              />
            }
            label="上記の利用規約とプライバシーポリシーに同意します"
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleAgree}
            disabled={!agreed || loading}
          >
            {loading ? '処理中...' : '同意して続行'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
} 