'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Inter } from 'next/font/google';
import { Providers } from '../providers';

const inter = Inter({ subsets: ['latin'] });

// Material UIのテーマ
const theme = createTheme({
  palette: {
    primary: {
      main: '#4285F4', // Google Blueベース（仕様書に合わせて変更）
    },
    secondary: {
      main: '#f50057',
    },
    // 優先度表示用のカスタムカラー
    error: {
      main: '#E53935', // 高優先度（仕様書に合わせて変更）
    },
    warning: {
      main: '#FFC107', // 中優先度（仕様書に合わせて変更）
    },
    success: {
      main: '#43A047', // 低優先度（仕様書に合わせて変更）
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  // アクセシビリティ向上のための設定
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // フォーカス時の視覚的なインジケータを強化
          '&:focus-visible': {
            outline: '2px solid #4285F4',
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // フォーカス時の視覚的なインジケータを強化
          '& .MuiOutlinedInput-root:focus-visible': {
            outline: '2px solid #4285F4',
            outlineOffset: '2px',
          },
        },
      },
    },
  },
});

export default function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Providers>
  );
} 