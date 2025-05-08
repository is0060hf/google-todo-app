'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Container, 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Divider, 
  Chip,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import { signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import OptimizedAvatar from '../components/ui/OptimizedAvatar';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

/**
 * ユーザープロフィール画面
 * ユーザー情報表示と管理機能を提供
 */
export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { t } = useTranslation('common');
  const theme = useTheme();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // 日付フォーマット関数
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'yyyy年MM月dd日', { locale: ja });
    } catch (error) {
      return dateString;
    }
  };
  
  // ログアウト処理
  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: '/auth/signin' });
  };
  
  // ローディング中
  if (status === 'loading') {
    return (
      <Container maxWidth="md" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }
  
  // 未認証
  if (!session) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="warning">
          {t('profile.needLogin', 'プロフィールを表示するにはログインが必要です')}
        </Alert>
      </Container>
    );
  }
  
  // createdAtプロパティはsession.userに存在しない可能性があるため、未定義の場合は現在日付を表示
  const createdDate = '未定義'; // セッションデータにない場合のフォールバック
  
  return (
    <Container maxWidth="md" sx={{ mt: 4, pb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('profile.title', 'マイアカウント')}
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
        {/* プロフィール情報カード */}
        <Box sx={{ flex: { md: 2 }, width: '100%' }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <OptimizedAvatar
                src={session.user.image || ''}
                alt={session.user.name || t('common.user')}
                sx={{ width: 80, height: 80 }}
                width={80}
                height={80}
              />
              <Box sx={{ ml: 3 }}>
                <Typography variant="h5" gutterBottom>
                  {session.user.name || t('common.unknownUser')}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {session.user.email}
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {t('profile.accountCreated', 'アカウント作成日')}
              </Typography>
              <Typography variant="body1">
                {createdDate}
              </Typography>
            </Box>
            
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {t('profile.googleAccount', 'Google連携')}
              </Typography>
              <Chip 
                label={t('profile.connected', '接続済み')} 
                color="success" 
                size="small" 
              />
            </Box>
          </Paper>
        </Box>
        
        {/* サブスクリプション情報カード */}
        <Box sx={{ flex: { md: 1 }, width: '100%' }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('profile.currentPlan', '現在のプラン')}
              </Typography>
              
              <Box sx={{ 
                bgcolor: 'primary.main', 
                color: 'primary.contrastText',
                p: 2,
                borderRadius: 1,
                mt: 2,
                mb: 3
              }}>
                <Typography variant="h5" align="center">
                  {session.user.subscriptionPlan === 'PREMIUM' 
                    ? t('profile.premiumPlan', 'プレミアム')
                    : t('profile.freePlan', '無料プラン')
                  }
                </Typography>
              </Box>
              
              {session.user.subscriptionPlan === 'FREE' && (
                <Button 
                  variant="outlined" 
                  color="primary" 
                  fullWidth
                  disabled
                  sx={{ mb: 2 }}
                >
                  {t('profile.upgradeToPremium', 'プレミアムにアップグレード')}
                </Button>
              )}
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {session.user.subscriptionPlan === 'PREMIUM'
                  ? t('profile.premiumDescription', 'すべての機能にアクセスできます')
                  : t('profile.freeDescription', '基本機能をご利用いただけます')
                }
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
      
      {/* アカウント管理セクション */}
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          {t('profile.accountManagement', 'アカウント管理')}
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut 
              ? t('common.loggingOut', 'ログアウト中...') 
              : t('common.logout', 'ログアウト')
            }
          </Button>
        </Box>
      </Paper>
    </Container>
  );
} 