'use client';

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function NextAuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // キャッシュ時間の最適化
        staleTime: 5 * 60 * 1000, // 5分間はキャッシュを新鮮と見なす
        gcTime: 30 * 60 * 1000, // 30分間はキャッシュを保持
        
        // リトライ設定
        retry: (failureCount, error: any) => {
          // ユーザー認証エラー（401）やリソース不在（404）等の場合はリトライしない
          if (error.status === 401 || error.status === 403 || error.status === 404) {
            return false;
          }
          
          // 304 (Not Modified) はエラーではなくキャッシュヒットを示すため、リトライしない
          if (error.message === 'NOT_MODIFIED') {
            return false;
          }
          
          // その他のエラーは最大2回までリトライ
          return failureCount < 2;
        },
        retryDelay: (attemptIndex) => {
          // 指数バックオフでリトライ間隔を延ばす
          // 1秒 → 2秒 → 4秒...
          return Math.min(1000 * Math.pow(2, attemptIndex), 30000);
        },
        
        // UI関連の設定
        refetchOnWindowFocus: false, // ウィンドウフォーカス時の自動再取得を無効化
        refetchOnReconnect: true, // ネットワーク再接続時は再取得
      },
      mutations: {
        // ミューテーションのリトライ設定
        retry: (failureCount, error: any) => {
          // 認証エラーや不正リクエストはリトライしない
          if (error.status === 400 || error.status === 401 || error.status === 403 || error.status === 404) {
            return false;
          }
          
          // その他のエラーは最大1回までリトライ
          return failureCount < 1;
        },
        retryDelay: (attemptIndex) => {
          // 1秒後に1回だけリトライ
          return 1000;
        },
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <ReactQueryProvider>
        {children}
      </ReactQueryProvider>
    </NextAuthProvider>
  );
} 