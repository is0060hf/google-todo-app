import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SideNav from './components/layout/SideNav';
import './globals.css';
import ThemeProviderWrapper from './components/ThemeProviderWrapper';
import FeedbackNotificationsWrapper from './components/ui/FeedbackNotificationsWrapper';
import { Box } from '@mui/material';

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
          <Box sx={{ display: 'flex' }}>
            <SideNav />
            <Box
              component="main"
              sx={{
                marginTop: '64px',
                minHeight: 'calc(100vh - 64px - 100px)',
                padding: '24px',
                width: '100%',
                marginLeft: { xs: 0, md: '280px' }
              }}
            >
              {children}
            </Box>
          </Box>
          <Footer />
          <FeedbackNotificationsWrapper />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
} 