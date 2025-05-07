'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Paper, 
  Button, 
  Alert, 
  Stack, 
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

/**
 * コントラスト比計算ユーティリティ
 */
interface RGBColor {
  r: number;
  g: number;
  b: number;
}

// 16進カラーコードをRGBオブジェクトに変換
const hexToRgb = (hex: string): RGBColor | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// RGBカラーを相対輝度に変換
const getLuminance = (rgb: RGBColor): number => {
  const a = [rgb.r, rgb.g, rgb.b].map(v => {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

// 2色間のコントラスト比を計算
const getContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 1;
  
  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);
  
  const lightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (lightest + 0.05) / (darkest + 0.05);
};

// WCAG 2.1のコントラスト比基準に基づく評価
const evaluateContrast = (ratio: number): {
  aa_small: boolean;
  aa_large: boolean;
  aaa_small: boolean;
  aaa_large: boolean;
} => {
  return {
    aa_small: ratio >= 4.5,   // AA レベル (通常テキスト)
    aa_large: ratio >= 3,     // AA レベル (18pt以上または14pt太字以上)
    aaa_small: ratio >= 7,    // AAA レベル (通常テキスト)
    aaa_large: ratio >= 4.5,  // AAA レベル (18pt以上または14pt太字以上)
  };
};

// テーマの主要カラー定義
const themeColors = [
  { name: 'プライマリー', color: '#4285F4' }, // Google Blue
  { name: '高優先度', color: '#E53935' },     // 赤系
  { name: '中優先度', color: '#FFC107' },     // 黄系
  { name: '低優先度', color: '#43A047' },     // 緑系
  { name: '背景色 (ライト)', color: '#FFFFFF' },
  { name: '背景色 (グレー)', color: '#F5F5F5' },
  { name: 'テキスト (プライマリー)', color: '#212121' },
  { name: 'テキスト (セカンダリー)', color: '#757575' },
];

/**
 * コントラスト比チェックコンポーネント
 * WCAG 2.1 AA準拠のコントラスト要件を満たしているか確認するためのツール
 */
export function ContrastChecker() {
  const [foreground, setForeground] = useState('#212121'); // デフォルト前景色
  const [background, setBackground] = useState('#FFFFFF'); // デフォルト背景色
  const [contrastRatio, setContrastRatio] = useState(21);
  const [evaluation, setEvaluation] = useState({
    aa_small: true,
    aa_large: true,
    aaa_small: true,
    aaa_large: true,
  });
  
  // コントラスト比の計算と評価
  useEffect(() => {
    const ratio = getContrastRatio(foreground, background);
    setContrastRatio(ratio);
    setEvaluation(evaluateContrast(ratio));
  }, [foreground, background]);
  
  // サンプルテキストのサイズ
  const textSizes = [
    { name: '小 (12px)', size: 12, important: false },
    { name: '通常 (16px)', size: 16, important: true },
    { name: '中 (18px)', size: 18, important: true },
    { name: '大 (24px)', size: 24, important: false },
  ];
  
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>コントラスト比チェッカー (WCAG 2.1準拠)</Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        WCAG 2.1 AAレベル準拠のコントラスト比要件：
        通常テキストは4.5:1以上、大きいテキスト（18pt以上または14pt太字以上）は3:1以上
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
          <TextField 
            label="前景色 (テキスト)" 
            value={foreground} 
            onChange={(e) => setForeground(e.target.value)}
            sx={{ width: { xs: '100%', sm: '50%' } }}
            InputProps={{
              startAdornment: (
                <Box 
                  sx={{ 
                    width: 24, 
                    height: 24, 
                    bgcolor: foreground, 
                    borderRadius: 1, 
                    mr: 1,
                    border: '1px solid #ccc'
                  }} 
                />
              ),
            }}
          />
          
          <TextField 
            label="背景色" 
            value={background} 
            onChange={(e) => setBackground(e.target.value)}
            sx={{ width: { xs: '100%', sm: '50%' } }}
            InputProps={{
              startAdornment: (
                <Box 
                  sx={{ 
                    width: 24, 
                    height: 24, 
                    bgcolor: background, 
                    borderRadius: 1, 
                    mr: 1,
                    border: '1px solid #ccc'
                  }} 
                />
              ),
            }}
          />
        </Stack>
        
        <Box 
          sx={{ 
            p: 3, 
            bgcolor: background, 
            color: foreground, 
            borderRadius: 1, 
            border: '1px solid #ccc',
            minHeight: 100,
            mb: 2,
          }}
        >
          {textSizes.map((textSize, index) => (
            <Typography 
              key={index} 
              sx={{ 
                fontSize: textSize.size, 
                fontWeight: textSize.name.includes('太字') ? 'bold' : 'normal',
                mb: 1,
              }}
            >
              サンプルテキスト ({textSize.name})
            </Typography>
          ))}
        </Box>
        
        <Stack 
          direction="row" 
          alignItems="center" 
          spacing={1}
          sx={{
            mb: 2,
            p: 2,
            borderRadius: 1,
            bgcolor: evaluation.aa_small ? 'success.50' : 'error.50',
            border: 1,
            borderColor: evaluation.aa_small ? 'success.light' : 'error.light',
          }}
        >
          {evaluation.aa_small ? (
            <CheckCircleIcon color="success" />
          ) : (
            <ErrorIcon color="error" />
          )}
          <Typography variant="h6">
            コントラスト比: {contrastRatio.toFixed(2)}:1
          </Typography>
          
          <Chip 
            label="AA 通常テキスト" 
            color={evaluation.aa_small ? "success" : "error"} 
            variant="outlined"
            size="small"
          />
          
          <Chip 
            label="AA 大テキスト" 
            color={evaluation.aa_large ? "success" : "error"} 
            variant="outlined"
            size="small"
          />
          
          <Chip 
            label="AAA 通常テキスト" 
            color={evaluation.aaa_small ? "success" : "error"} 
            variant="outlined"
            size="small"
          />
          
          <Chip 
            label="AAA 大テキスト" 
            color={evaluation.aaa_large ? "success" : "error"} 
            variant="outlined"
            size="small"
          />
        </Stack>
        
        {!evaluation.aa_small && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            このコントラスト比はWCAG 2.1 AAレベルの要件（4.5:1以上）を満たしていません。通常サイズのテキストには使用しないでください。
          </Alert>
        )}
        
        {!evaluation.aa_large && (
          <Alert severity="error" sx={{ mb: 2 }}>
            このコントラスト比はWCAG 2.1 AAレベルの要件（大きいテキストで3:1以上）を満たしていません。どのようなサイズのテキストにも使用しないでください。
          </Alert>
        )}
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      <Typography variant="h6" gutterBottom>テーマカラーチェック</Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        アプリケーションで使用される主要なカラーのコントラスト比を確認します。
      </Typography>
      
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table size="small" aria-label="テーマカラーのコントラスト比">
          <TableHead>
            <TableRow>
              <TableCell>カラー</TableCell>
              <TableCell>HEX</TableCell>
              <TableCell>白背景との比</TableCell>
              <TableCell>黒テキストとの比</TableCell>
              <TableCell>AA 通常</TableCell>
              <TableCell>AA 大</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {themeColors.map((color) => {
              const whiteContrast = getContrastRatio(color.color, '#FFFFFF');
              const blackContrast = getContrastRatio(color.color, '#000000');
              const whiteEval = evaluateContrast(whiteContrast);
              const blackEval = evaluateContrast(blackContrast);
              
              return (
                <TableRow key={color.name}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        sx={{ 
                          width: 20, 
                          height: 20, 
                          bgcolor: color.color, 
                          borderRadius: 1, 
                          mr: 1,
                          border: '1px solid #ccc'
                        }} 
                      />
                      {color.name}
                    </Box>
                  </TableCell>
                  <TableCell>{color.color}</TableCell>
                  <TableCell>{whiteContrast.toFixed(2)}:1</TableCell>
                  <TableCell>{blackContrast.toFixed(2)}:1</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box component="span" sx={{ mr: 1, color: whiteEval.aa_small ? 'success.main' : 'error.main' }}>
                        ● 白背景
                      </Box>
                      <Box component="span" sx={{ color: blackEval.aa_small ? 'success.main' : 'error.main' }}>
                        ● 黒テキスト
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box component="span" sx={{ mr: 1, color: whiteEval.aa_large ? 'success.main' : 'error.main' }}>
                        ● 白背景
                      </Box>
                      <Box component="span" sx={{ color: blackEval.aa_large ? 'success.main' : 'error.main' }}>
                        ● 黒テキスト
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Typography variant="body2" color="text.secondary">
        注意: このチェッカーはWCAG 2.1 AAレベルのコントラスト要件を確認するためのものです。実際のアプリケーションでは、視認性をさらに高めるために、可能な限り高いコントラスト比を維持するよう努めてください。
      </Typography>
    </Paper>
  );
}

export default ContrastChecker; 