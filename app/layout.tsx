import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NextAuthProvider } from './providers';
import Header from './components/layout/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Google TODO連携アプリ',
  description: 'Google Tasksと連携してタスク管理を強化するアプリ',
};

// Material UIのテーマ
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <main style={{ marginTop: '64px', minHeight: 'calc(100vh - 64px)', padding: '24px' }}>
              {children}
            </main>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
} 