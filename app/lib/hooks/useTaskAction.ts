'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

/**
 * タスク操作時に統計データも更新するカスタムフック
 */
export function useTaskAction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  /**
   * タスク作成時の処理
   * @param taskListId タスクリストID
   * @param taskData タスクデータ
   */
  const createTask = async (taskListId: string, taskData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      // 1. タスク作成APIを呼び出し
      const createResponse = await fetch(`/api/tasklists/${taskListId}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      
      if (!createResponse.ok) {
        const errorData = await createResponse.json();
        throw new Error(errorData.error || 'タスクの作成に失敗しました');
      }
      
      const newTask = await createResponse.json();
      
      // 2. 統計データ更新APIを呼び出し
      const statsResponse = await fetch('/api/stats/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'created',
          date: new Date().toISOString(),
        }),
      });
      
      if (!statsResponse.ok) {
        console.warn('統計データの更新に失敗しましたが、タスクは作成されました');
      }
      
      // 3. React Queryのキャッシュを更新
      queryClient.invalidateQueries({ queryKey: ['tasks', taskListId] });
      
      return newTask;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '不明なエラーが発生しました';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * タスク完了時の処理
   * @param taskListId タスクリストID
   * @param taskId タスクID
   * @param completed 完了状態
   */
  const completeTask = async (taskListId: string, taskId: string, completed: boolean) => {
    setLoading(true);
    setError(null);
    
    try {
      // 1. タスク完了状態更新APIを呼び出し
      const endpoint = completed
        ? `/api/tasklists/${taskListId}/tasks/${taskId}/complete`
        : `/api/tasklists/${taskListId}/tasks/${taskId}/uncomplete`;
      
      const completeResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!completeResponse.ok) {
        const errorData = await completeResponse.json();
        throw new Error(errorData.error || 'タスクの完了状態更新に失敗しました');
      }
      
      const updatedTask = await completeResponse.json();
      
      // タスクが完了状態になった場合のみ統計データを更新
      if (completed) {
        // 2. 統計データ更新APIを呼び出し
        const statsResponse = await fetch('/api/stats/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'completed',
            date: new Date().toISOString(),
          }),
        });
        
        if (!statsResponse.ok) {
          console.warn('統計データの更新に失敗しましたが、タスクは更新されました');
        }
      }
      
      // 3. React Queryのキャッシュを更新
      queryClient.invalidateQueries({ queryKey: ['tasks', taskListId] });
      queryClient.invalidateQueries({ queryKey: ['task', taskListId, taskId] });
      
      return updatedTask;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '不明なエラーが発生しました';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createTask,
    completeTask,
    loading,
    error,
  };
} 