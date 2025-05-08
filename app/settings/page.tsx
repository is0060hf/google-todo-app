'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  Container,
  Typography,
  Paper,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Button,
  Alert,
  CircularProgress,
  Divider,
  useTheme,
  Switch
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DarkMode, LightMode, SettingsBrightness } from '@mui/icons-material';

/**
 * 設定画面コンポーネント
 * テーマ設定、表示密度設定、デフォルトビュー設定などのユーザー設定を管理
 */
export default function SettingsPage() {
  const { data: session, status } = useSession();
  const { t } = useTranslation('common');
  const theme = useTheme();
  
  // 設定状態
  const [themeMode, setThemeMode] = useState('system');
  const [density, setDensity] = useState('standard');
  const [defaultView, setDefaultView] = useState('list');
  const [savedMessage, setSavedMessage] = useState(false);
  
  // 初期値の読み込み
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('appSettings');
      if (savedSettings) {
        try {
          const settings = JSON.parse(savedSettings);
          setThemeMode(settings.themeMode || 'system');
          setDensity(settings.density || 'standard');
          setDefaultView(settings.defaultView || 'list');
        } catch (e) {
          console.error('設定の読み込みに失敗しました', e);
        }
      }
    }
  }, []);
  
  // 設定保存
  const saveSettings = () => {
    if (typeof window !== 'undefined') {
      const settings = {
        themeMode,
        density,
        defaultView
      };
      localStorage.setItem('appSettings', JSON.stringify(settings));
      setSavedMessage(true);
      
      // 設定適用のための特別な処理（実際の実装では、この部分はグローバルステートと連携）
      // 例: UI密度設定をアプリケーション全体に適用する処理など
      
      // 数秒後に保存メッセージを非表示
      setTimeout(() => {
        setSavedMessage(false);
      }, 3000);
    }
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
          {t('settings.needLogin', '設定を変更するにはログインが必要です')}
        </Alert>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md" sx={{ mt: 4, pb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('settings.title', '設定')}
      </Typography>
      
      {savedMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {t('settings.saved', '設定を保存しました')}
        </Alert>
      )}
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('settings.appearance', '表示設定')}
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <FormControl component="fieldset" sx={{ my: 2 }}>
            <FormLabel component="legend">{t('settings.theme', 'テーマ')}</FormLabel>
            <RadioGroup
              value={themeMode}
              onChange={(e) => setThemeMode(e.target.value)}
              row
            >
              <FormControlLabel 
                value="light" 
                control={<Radio />} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LightMode sx={{ mr: 1 }} />
                    {t('settings.light', 'ライト')}
                  </Box>
                }
              />
              <FormControlLabel 
                value="dark" 
                control={<Radio />} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <DarkMode sx={{ mr: 1 }} />
                    {t('settings.dark', 'ダーク')}
                  </Box>
                }
              />
              <FormControlLabel 
                value="system" 
                control={<Radio />} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SettingsBrightness sx={{ mr: 1 }} />
                    {t('settings.system', 'システム設定に合わせる')}
                  </Box>
                }
              />
            </RadioGroup>
          </FormControl>
        </Box>
        
        <Divider />
        
        <Box sx={{ my: 3 }}>
          <FormControl component="fieldset" sx={{ my: 2 }}>
            <FormLabel component="legend">{t('settings.density', '表示密度')}</FormLabel>
            <RadioGroup
              value={density}
              onChange={(e) => setDensity(e.target.value)}
              row
            >
              <FormControlLabel 
                value="standard" 
                control={<Radio />} 
                label={t('settings.standard', '標準')}
              />
              <FormControlLabel 
                value="compact" 
                control={<Radio />} 
                label={t('settings.compact', 'コンパクト')}
              />
            </RadioGroup>
          </FormControl>
        </Box>
        
        <Divider />
        
        <Box sx={{ my: 3 }}>
          <FormControl component="fieldset" sx={{ my: 2 }}>
            <FormLabel component="legend">{t('settings.defaultView', 'デフォルト表示')}</FormLabel>
            <RadioGroup
              value={defaultView}
              onChange={(e) => setDefaultView(e.target.value)}
              row
            >
              <FormControlLabel 
                value="list" 
                control={<Radio />} 
                label={t('settings.list', 'リスト')}
              />
              <FormControlLabel 
                value="card" 
                control={<Radio />} 
                label={t('settings.card', 'カード')}
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={saveSettings}
          size="large"
        >
          {t('settings.save', '設定を保存')}
        </Button>
      </Box>
    </Container>
  );
} 