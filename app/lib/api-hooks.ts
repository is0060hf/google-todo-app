'use client';

import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

/**
 * GETリクエストを行うための汎用的なフック
 */
export function useApiGet<TData>(
  endpoint: string,
  queryKey: string[],
  options?: Omit<UseQueryOptions<TData, Error, TData>, 'queryKey' | 'queryFn'> & {
    queryParams?: Record<string, string | number | boolean | undefined>
  }
) {
  const queryParams = options?.queryParams || {};
  
  return useQuery<TData, Error>({
    queryKey: [...queryKey, ...Object.values(queryParams)],
    queryFn: async () => {
      // クエリパラメータの構築
      const url = new URL(`/api/${endpoint}`, window.location.origin);
      
      // クエリパラメータを追加
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
      
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        let errorMessage = 'APIリクエストに失敗しました';
        
        // サーバーから返されたエラーメッセージを使用
        if (errorData.error) {
          errorMessage = errorData.error;
        }
        
        // HTTPステータスコードに基づいた適切なメッセージ
        if (!errorData.error) {
          switch (response.status) {
            case 401:
              errorMessage = '認証が必要です。再ログインしてください。';
              break;
            case 403:
              errorMessage = 'このリソースにアクセスする権限がありません。';
              break;
            case 404:
              errorMessage = '要求されたリソースが見つかりませんでした。';
              break;
            case 429:
              errorMessage = 'APIリクエスト数の上限に達しました。しばらく待ってから再試行してください。';
              break;
            case 500:
              errorMessage = 'サーバーでエラーが発生しました。';
              break;
            case 503:
              errorMessage = 'サービスが一時的に利用できません。';
              break;
          }
        }
        
        throw new Error(errorMessage);
      }
      
      return response.json();
    },
    ...options,
  });
}

/**
 * POSTリクエストを行うための汎用的なフック
 */
export function useApiPost<TData, TVariables>(
  endpoint: string,
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables) => {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(variables),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'APIリクエストに失敗しました');
      }

      return response.json();
    },
    ...options,
  });
}

/**
 * PATCHリクエストを行うための汎用的なフック
 */
export function useApiPatch<TData, TVariables>(
  endpoint: string,
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables) => {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(variables),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'APIリクエストに失敗しました');
      }

      return response.json();
    },
    ...options,
  });
}

/**
 * DELETEリクエストを行うための汎用的なフック
 */
export function useApiDelete<TData, TVariables>(
  endpoint: string,
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables) => {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(variables),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'APIリクエストに失敗しました');
      }

      return response.json();
    },
    ...options,
  });
}

/**
 * タスクリスト一覧を取得するフック
 */
export function useTaskLists() {
  return useApiGet('tasklists', ['tasklists']);
}

/**
 * タスク一覧を取得するフック
 * ページング対応版 - maxResultsパラメータで一度に取得する件数を制限し、
 * nextPageTokenを使用して次のページのデータを取得します
 */
export function useTasks(
  taskListId: string, 
  params?: {
    showCompleted?: boolean;
    maxResults?: number;
    pageToken?: string;
  }
) {
  const { showCompleted = true, maxResults = 100, pageToken } = params || {};
  
  return useApiGet(
    `tasklists/${taskListId}/tasks`, 
    ['tasks', taskListId], 
    {
      enabled: !!taskListId,
      queryParams: {
        showCompleted,
        maxResults,
        pageToken,
      }
    }
  );
}

/**
 * タグ一覧を取得するフック
 */
export function useTags() {
  return useApiGet('tags', ['tags']);
}

/**
 * 優先度一覧を取得するフック
 */
export function usePriorities() {
  return useApiGet('priorities', ['priorities']);
}

/**
 * タスクのカスタムデータを取得するフック
 */
export function useTaskCustomData(taskId: string) {
  return useApiGet(`tasks/custom/${taskId}`, ['taskCustomData', taskId], {
    enabled: !!taskId,
  });
} 