'use client';

import React from 'react';
import { Box, Container, Typography, Link, Divider, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

/**
 * フッターコンポーネント
 * アプリケーションの全ページ下部に表示される共通フッター要素
 * - 著作権表示
 * - プライバシーポリシーへのリンク
 * - 利用規約へのリンク
 */
export default function Footer() {
  const theme = useTheme();
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'light' 
          ? theme.palette.grey[100] 
          : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ mb: 3 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mb: { xs: 2, sm: 0 } }}
          >
            © {currentYear} Google TODO連携アプリ
          </Typography>
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              gap: { xs: 1, sm: 2 },
            }}
          >
            <Link
              href="/privacy-policy"
              color="text.secondary"
              underline="hover"
              variant="body2"
              aria-label={t('footer.privacyPolicy')}
            >
              {t('footer.privacyPolicy', 'プライバシーポリシー')}
            </Link>
            
            <Link
              href="/terms-of-service"
              color="text.secondary"
              underline="hover"
              variant="body2"
              aria-label={t('footer.termsOfService')}
            >
              {t('footer.termsOfService', '利用規約')}
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 