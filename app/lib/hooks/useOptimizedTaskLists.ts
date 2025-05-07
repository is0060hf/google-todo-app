'use client';

import { useOptimizedDataFetching } from './useOptimizedDataFetching';
import { useSession } from 'next-auth/react';
import { GoogleTaskList } from '../../types';

/**
 * タスクリスト一覧を最適化して取得するカスタムフック
 * - ETagによるキャッシュ
 * - ローカルストレージキャッシング
 * - React Queryキャッシング
 */
export function useOptimizedTaskLists() {
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  
  return useOptimizedDataFetching<{ items: GoogleTaskList[] }>({
    queryKey: ['tasklists'],
    fetchFn: async () => {
      const response = await fetch('/api/tasklists');
      if (!response.ok) {
        throw new Error('Failed to fetch task lists');
      }
      return response.json();
    },
    etagKey: 'tasklists',
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5分間はキャッシュを新鮮と見なす
    gcTime: 1000 * 60 * 30, // 30分間はキャッシュを保持
  });
} 