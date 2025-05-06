'use client';

import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

/**
 * GETリクエストを行うための汎用的なフック
 */
export function useApiGet<TData>(
  endpoint: string,
  queryKey: string[],
  options?: Omit<UseQueryOptions<TData, Error, TData>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData, Error>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(`/api/${endpoint}`);
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
 */
export function useTasks(taskListId: string) {
  return useApiGet(`tasklists/${taskListId}/tasks`, ['tasks', taskListId], {
    enabled: !!taskListId,
  });
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