'use client';

import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { getETag, saveETag, getETagFromHeaders } from '../etag-utils';

/**
 * APIリクエストを最適化する基本関数
 * このヘルパー関数はETagを使用してAPIリクエストを最適化します
 */
export async function fetchWithETag<T>(
  url: string, 
  options: RequestInit = {}, 
  etagKey?: string
): Promise<T> {
  // etagを使用する場合はヘッダーにIf-None-Matchを追加
  if (etagKey) {
    const currentETag = getETag(etagKey);
    if (currentETag) {
      options.headers = {
        ...options.headers,
        'If-None-Match': currentETag
      };
    }
  }

  // デフォルトヘッダーを設定
  options.headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  const response = await fetch(url, options);
  
  // 304 Not Modified の場合は例外を投げる
  if (response.status === 304) {
    throw new Error('NOT_MODIFIED');
  }
  
  // ETagを保存
  if (etagKey) {
    const etag = response.headers.get('etag');
    if (etag) {
      saveETag(etagKey, etag);
    }
  }
  
  // エラーレスポンスの確認
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'APIリクエストに失敗しました' }));
    throw new Error(error.message || 'APIリクエストに失敗しました');
  }
  
  return response.json();
}

/**
 * 最適化されたAPIクエリフック
 */
export function useOptimizedQuery<TData = unknown, TError = Error>(
  queryKey: any[],
  url: string,
  options: {
    etagKey?: string;
    requestOptions?: RequestInit;
    queryOptions?: Omit<UseQueryOptions<TData, TError, TData, any[]>, 'queryKey' | 'queryFn'>;
  } = {}
): UseQueryResult<TData, TError> {
  const { etagKey, requestOptions, queryOptions } = options;

  return useQuery<TData, TError>({
    queryKey,
    queryFn: async () => {
      try {
        return await fetchWithETag<TData>(url, requestOptions || {}, etagKey);
      } catch (error) {
        if ((error as Error).message === 'NOT_MODIFIED') {
          // 304の場合はキャッシュを使用（React Queryの仕組みで自動的にキャッシュから取得される）
          console.log('Using cached data for', url);
          throw new Error('NOT_MODIFIED');
        }
        throw error;
      }
    },
    ...queryOptions,
    // デフォルト設定
    staleTime: queryOptions?.staleTime || 1000 * 60, // 1分
    gcTime: queryOptions?.gcTime || 1000 * 60 * 5, // 5分
    refetchOnWindowFocus: queryOptions?.refetchOnWindowFocus !== undefined 
      ? queryOptions.refetchOnWindowFocus 
      : false,
  });
}

/**
 * Google Tasks APIのアクセスに最適化されたフック
 */
export function useGoogleTasksQuery<TData = unknown, TError = Error>(
  queryKey: any[],
  url: string,
  accessToken: string | undefined,
  options: {
    etagKey?: string;
    queryOptions?: Omit<UseQueryOptions<TData, TError, TData, any[]>, 'queryKey' | 'queryFn'>;
  } = {}
): UseQueryResult<TData, TError> {
  const { etagKey, queryOptions } = options;
  
  // アクセストークンがない場合はクエリを無効化
  const enabled = !!accessToken && (queryOptions?.enabled !== false);
  
  return useOptimizedQuery<TData, TError>(
    queryKey,
    url,
    {
      etagKey,
      requestOptions: {
        headers: {
          Authorization: `Bearer ${accessToken || ''}`,
        }
      },
      queryOptions: {
        ...queryOptions,
        enabled,
      }
    }
  );
} 