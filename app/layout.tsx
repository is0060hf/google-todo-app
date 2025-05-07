import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './components/layout/Header';
import './globals.css';
import ThemeProviderWrapper from './components/ThemeProviderWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Google TODO連携アプリ',
  description: 'Google Tasksと連携してタスク管理を強化するアプリ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <ThemeProviderWrapper>
          <Header />
          <main style={{ marginTop: '64px', minHeight: 'calc(100vh - 64px)', padding: '24px' }}>
            {children}
          </main>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
} 