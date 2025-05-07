'use client';

import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { getETag, saveETag } from '../etag-utils';
import { fetchWithRetry } from '../retry-utils';

/**
 * ローカルストレージからデータを取得する
 * @param key ストレージキー
 * @returns 保存されたデータ
 */
export function getLocalData<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const data = localStorage.getItem(`cache_${key}`);
    if (!data) return null;
    
    const { value, expiry } = JSON.parse(data);
    
    // 有効期限をチェック
    if (expiry && expiry < Date.now()) {
      localStorage.removeItem(`cache_${key}`);
      return null;
    }
    
    return value as T;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
}

/**
 * ローカルストレージにデータを保存する
 * @param key ストレージキー
 * @param data 保存するデータ
 * @param ttl 有効期限（ミリ秒）、デフォルトは1日
 */
export function saveLocalData<T>(key: string, data: T, ttl: number = 1000 * 60 * 60 * 24): void {
  if (typeof window === 'undefined') return;
  
  try {
    const item = {
      value: data,
      expiry: ttl > 0 ? Date.now() + ttl : null,
    };
    
    localStorage.setItem(`cache_${key}`, JSON.stringify(item));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
}

/**
 * 拡張されたAPIクエリフック
 * - 指数バックオフによるリトライ
 * - ETagによるリクエスト最適化
 * - ローカルストレージによるオフラインサポート
 * - 最適化されたポーリング間隔
 */
export function useEnhancedQuery<TData = unknown, TError = Error>(
  queryKey: readonly unknown[],
  url: string,
  options: {
    etagKey?: string;
    localStorageKey?: string;
    requestOptions?: RequestInit;
    retryOptions?: {
      maxRetries?: number;
      initialDelay?: number;
      maxDelay?: number;
      retryableStatusCodes?: number[];
    };
    refetchInterval?: number | false; // ポーリング間隔（ミリ秒）
    localStorageTtl?: number; // ローカルストレージの有効期限（ミリ秒）
    queryOptions?: Omit<UseQueryOptions<TData, TError, TData, readonly unknown[]>, 'queryKey' | 'queryFn'>;
  } = {}
): UseQueryResult<TData, TError> {
  const {
    etagKey,
    localStorageKey,
    requestOptions = {},
    retryOptions = {},
    refetchInterval = false, // デフォルトではポーリングなし
    localStorageTtl = 1000 * 60 * 60 * 24, // デフォルトは1日
    queryOptions = {},
  } = options;

  // 最小ポーリング間隔は5分（300000ミリ秒）
  const safeRefetchInterval = refetchInterval && typeof refetchInterval === 'number'
    ? Math.max(refetchInterval, 300000)
    : refetchInterval;

  return useQuery<TData, TError>({
    queryKey,
    queryFn: async () => {
      // リクエストのヘッダーを準備
      let headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...requestOptions.headers,
      };

      // ETagを使用する場合はIf-None-Matchヘッダーを追加
      if (etagKey) {
        const currentETag = getETag(etagKey);
        if (currentETag) {
          headers = {
            ...headers,
            'If-None-Match': currentETag,
          };
        }
      }

      // 最終的なリクエストオプションを作成
      const finalRequestOptions: RequestInit = {
        ...requestOptions,
        headers,
      };

      try {
        // 指数バックオフでリトライを行いながらフェッチ
        const response = await fetchWithRetry(
          url,
          finalRequestOptions,
          {
            ...retryOptions,
            onRetry: (retryCount, error, delay) => {
              console.warn(`Retrying request to ${url} after ${delay}ms (attempt ${retryCount + 1}). Error: ${error.message}`);
            },
          }
        );

        // 304 Not Modified の場合
        if (response.status === 304) {
          console.log('Using cached data for', url);
          throw new Error('NOT_MODIFIED');
        }

        // ETagを保存
        if (etagKey) {
          const etag = response.headers.get('etag');
          if (etag) {
            saveETag(etagKey, etag);
          }
        }

        // レスポンスをJSONとしてパース
        const data = await response.json();

        // ローカルストレージにデータを保存（オフラインサポート用）
        if (localStorageKey) {
          saveLocalData(localStorageKey, data, localStorageTtl);
        }

        return data as TData;
      } catch (error: any) {
        if (error.message === 'NOT_MODIFIED') {
          throw error; // React Queryがキャッシュからデータを提供
        }

        // オフライン時やネットワークエラーの場合、ローカルストレージから取得
        if (
          localStorageKey &&
          (error.message.includes('fetch failed') || 
           error.message.includes('network') || 
           error.message.includes('offline'))
        ) {
          const localData = getLocalData<TData>(localStorageKey);
          if (localData) {
            console.log('Using localStorage data for', url);
            return localData;
          }
        }

        throw error;
      }
    },
    ...queryOptions,
    // デフォルト設定
    staleTime: queryOptions?.staleTime || 1000 * 60 * 5, // 5分（キャッシュの有効期間）
    gcTime: queryOptions?.gcTime || 1000 * 60 * 30, // 30分（キャッシュの保持期間）
    refetchInterval: safeRefetchInterval,
    refetchOnWindowFocus: queryOptions?.refetchOnWindowFocus !== undefined
      ? queryOptions.refetchOnWindowFocus
      : false,
    // オフラインサポート
    refetchOnReconnect: true,
  });
}

/**
 * Google Tasks APIのアクセスに最適化されたフック
 */
export function useEnhancedGoogleTasksQuery<TData = unknown, TError = Error>(
  queryKey: readonly unknown[],
  url: string,
  accessToken: string | undefined,
  options: {
    etagKey?: string;
    localStorageKey?: string;
    retryOptions?: {
      maxRetries?: number;
      initialDelay?: number;
      maxDelay?: number;
      retryableStatusCodes?: number[];
    };
    refetchInterval?: number | false;
    localStorageTtl?: number;
    queryOptions?: Omit<UseQueryOptions<TData, TError, TData, readonly unknown[]>, 'queryKey' | 'queryFn'>;
  } = {}
): UseQueryResult<TData, TError> {
  const {
    etagKey,
    localStorageKey,
    retryOptions,
    refetchInterval,
    localStorageTtl,
    queryOptions,
  } = options;

  // アクセストークンがない場合はクエリを無効化
  const enabled = !!accessToken && (queryOptions?.enabled !== false);

  return useEnhancedQuery<TData, TError>(
    queryKey,
    url,
    {
      etagKey,
      localStorageKey,
      requestOptions: {
        headers: {
          Authorization: `Bearer ${accessToken || ''}`,
        },
      },
      retryOptions,
      refetchInterval,
      localStorageTtl,
      queryOptions: {
        ...queryOptions,
        enabled,
      },
    }
  );
} 