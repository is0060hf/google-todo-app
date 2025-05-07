'use client';

import { useEffect, useState } from 'react';
import { useQuery, QueryClient, UseQueryResult } from '@tanstack/react-query';
import { getETag, saveETag } from '../etag-utils';

interface UseOptimizedDataFetchingOptions<T> {
  queryKey: string[];
  fetchFn: () => Promise<T>;
  etagKey?: string;
  staleTime?: number;
  gcTime?: number;
  onSuccessCallback?: (data: T) => void;
  enabled?: boolean;
  initialData?: T | (() => T);
}

// カスタムフックの戻り値の型
export type OptimizedQueryResult<T> = Omit<UseQueryResult<T, Error>, 'data'> & {
  data: T | undefined;
  cachedData?: T;
};

/**
 * ETagを利用してAPI呼び出しを最適化するカスタムフック
 * localStorage + React Query のキャッシュを使用してデータフェッチを最適化
 */
export function useOptimizedDataFetching<T>({
  queryKey,
  fetchFn,
  etagKey,
  staleTime = 1000 * 60 * 5, // デフォルトは5分
  gcTime = 1000 * 60 * 30,   // デフォルトは30分
  onSuccessCallback,
  enabled = true,
  initialData,
}: UseOptimizedDataFetchingOptions<T>): OptimizedQueryResult<T> {
  const [localData, setLocalData] = useState<T | undefined>(undefined);
  
  // ローカルストレージからキャッシュデータを読み込む
  useEffect(() => {
    if (etagKey && typeof window !== 'undefined') {
      try {
        const cachedData = localStorage.getItem(`data_${etagKey}`);
        if (cachedData) {
          const data = JSON.parse(cachedData) as T;
          setLocalData(data);
        }
      } catch (error) {
        console.error('Failed to load cached data:', error);
      }
    }
  }, [etagKey]);

  // 最適化されたフェッチ関数
  const optimizedFetchFn = async (): Promise<T> => {
    if (!etagKey) {
      // etagKeyが指定されていない場合は通常のフェッチ
      return fetchFn();
    }

    try {
      // ETagを取得してリクエストヘッダーを設定
      const currentETag = getETag(etagKey);
      const controller = new AbortController();
      const signal = controller.signal;
      
      const fetchOptions: RequestInit = {
        method: 'GET',
        headers: {
          ...(currentETag ? { 'If-None-Match': currentETag } : {}),
          'Content-Type': 'application/json',
        },
        signal,
      };

      // リクエストを実行
      const response = await fetch(fetchFn.toString(), fetchOptions);
      
      // 304 Not Modified の場合はキャッシュを使用
      if (response.status === 304) {
        console.log(`Using cached data for ${etagKey}`);
        
        // ローカルストレージからキャッシュデータを取得
        const cachedData = localStorage.getItem(`data_${etagKey}`);
        if (cachedData) {
          return JSON.parse(cachedData) as T;
        }
        
        // キャッシュが見つからない場合は普通にフェッチ
        controller.abort();
        return fetchFn();
      }
      
      // 新しいETagを保存
      const newETag = response.headers.get('etag');
      if (newETag) {
        saveETag(etagKey, newETag);
      }
      
      // データを取得
      const data = await response.json();
      
      // キャッシュを更新
      localStorage.setItem(`data_${etagKey}`, JSON.stringify(data));
      
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      
      // エラー時にローカルキャッシュがあれば使用
      if (etagKey && typeof window !== 'undefined') {
        const cachedData = localStorage.getItem(`data_${etagKey}`);
        if (cachedData) {
          console.log(`Using cached data on error for ${etagKey}`);
          return JSON.parse(cachedData) as T;
        }
      }
      
      // それでも失敗したら例外を投げる
      throw error;
    }
  };

  // React Queryを使用したデータフェッチ
  const queryResult = useQuery<T, Error>({
    queryKey,
    queryFn: optimizedFetchFn,
    staleTime,
    gcTime,
    enabled,
    ...(initialData ? { initialData } : {}),
  });

  // 成功時の処理
  useEffect(() => {
    if (queryResult.data && !queryResult.isLoading && !queryResult.isError) {
      // キャッシュを更新
      if (etagKey && typeof window !== 'undefined') {
        localStorage.setItem(`data_${etagKey}`, JSON.stringify(queryResult.data));
      }
      
      // コールバックを実行
      onSuccessCallback?.(queryResult.data);
    }
  }, [queryResult.data, queryResult.isLoading, queryResult.isError, etagKey, onSuccessCallback]);

  // キャッシュデータまたはクエリ結果を返す
  return {
    ...queryResult,
    // クエリ結果とローカルキャッシュの両方からデータを取得
    data: queryResult.data ?? localData ?? (initialData as T | undefined),
    // ローカルキャッシュがあればローディング状態を調整
    isLoading: queryResult.isLoading && !localData && !initialData,
    // キャッシュデータも公開
    cachedData: localData,
  } as OptimizedQueryResult<T>;
} 