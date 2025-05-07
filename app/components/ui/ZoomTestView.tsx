'use client';

import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Stack, FormControlLabel, Switch } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

interface ZoomTestViewProps {
  children: React.ReactNode;
  title?: string;
}

/**
 * 拡大表示テスト用のコンポーネント
 * WCAG 2.1 AAレベル準拠の拡大表示（最大200%）テストを行うためのビューア
 */
export function ZoomTestView({ children, title = 'UI拡大表示テスト (WCAG 2.1 AA準拠確認)' }: ZoomTestViewProps) {
  const [scale, setScale] = useState(100);
  const [isActive, setIsActive] = useState(false);
  
  // 拡大率を変更
  const handleScaleChange = (newScale: number) => {
    if (newScale >= 100 && newScale <= 200) {
      setScale(newScale);
    }
  };
  
  if (!isActive) {
    return (
      <Paper sx={{ p: 2, mb: 2 }}>
        <FormControlLabel
          control={
            <Switch 
              checked={isActive} 
              onChange={() => setIsActive(true)}
              inputProps={{ 'aria-label': '拡大表示テストを有効にする' }}
            />
          }
          label="拡大表示テストを有効にする (WCAG 2.1 AA準拠確認)"
        />
      </Paper>
    );
  }
  
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          WCAG 2.1 AAレベル準拠の確認: 200%までの拡大表示でもコンテンツが利用可能であること
        </Typography>
        
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => handleScaleChange(scale - 10)}
            startIcon={<ZoomOutIcon />}
            aria-label="表示を縮小"
            disabled={scale <= 100}
          >
            縮小
          </Button>
          
          <Typography variant="body1">{scale}%</Typography>
          
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => handleScaleChange(scale + 10)}
            startIcon={<ZoomInIcon />}
            aria-label="表示を拡大"
            disabled={scale >= 200}
          >
            拡大
          </Button>
          
          <Button 
            variant="outlined" 
            color="secondary" 
            size="small" 
            onClick={() => setScale(200)}
            aria-label="200%に拡大（最大）"
            disabled={scale === 200}
          >
            200%（最大）
          </Button>
          
          <Button 
            variant="outlined" 
            color="secondary" 
            size="small" 
            onClick={() => setScale(100)}
            aria-label="100%に戻す（標準）"
            disabled={scale === 100}
          >
            100%（標準）
          </Button>
          
          <FormControlLabel
            control={
              <Switch 
                checked={isActive} 
                onChange={() => setIsActive(false)}
                inputProps={{ 'aria-label': '拡大表示テストを無効にする' }}
              />
            }
            label="テストを終了"
          />
        </Stack>
      </Box>
      
      <Box 
        sx={{ 
          border: '1px solid #ccc', 
          borderRadius: 1,
          height: '400px',
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            transform: `scale(${scale / 100})`,
            transformOrigin: 'top left',
            width: `${10000 / scale}%`, // スケールに応じて幅を調整
            p: 2,
          }}
        >
          {children}
        </Box>
      </Box>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        注意: 実際のブラウザの拡大機能とは挙動が異なる場合があります。実際のテストでは、ブラウザの拡大機能（Ctrl++）も併用してください。
      </Typography>
    </Paper>
  );
}

export default ZoomTestView; 