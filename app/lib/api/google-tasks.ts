/**
 * Google Tasks APIとの連携を行うユーティリティ関数
 */

import { GoogleTask, GoogleTaskList, AppTask, AppTaskList } from '../../types';

const API_BASE_URL = 'https://tasks.googleapis.com/tasks/v1';
const API_KEY = process.env.GOOGLE_API_KEY;

/**
 * Google Tasks API呼び出しの共通関数
 * @param endpoint APIエンドポイント
 * @param accessToken アクセストークン
 * @param options フェッチオプション
 * @returns APIレスポンス
 */
export async function fetchTasksApi(
  endpoint: string,
  accessToken: string,
  options: RequestInit = {}
) {
  // APIキーとアクセストークンの両方を使用
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  url.searchParams.append('key', API_KEY || '');

  const response = await fetch(url.toString(), {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(`Google Tasks API Error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * タスクリスト一覧を取得
 * @param accessToken アクセストークン
 * @returns タスクリスト一覧
 */
export async function getTaskLists(accessToken: string): Promise<GoogleTaskList[]> {
  const data = await fetchTasksApi('/users/@me/lists', accessToken);
  return data.items || [];
}

/**
 * 特定のタスクリストのタスク一覧を取得
 * @param taskListId タスクリストID
 * @param accessToken アクセストークン
 * @returns タスク一覧
 */
export async function getTasks(
  taskListId: string,
  accessToken: string
): Promise<GoogleTask[]> {
  const data = await fetchTasksApi(`/lists/${taskListId}/tasks`, accessToken);
  return data.items || [];
}

/**
 * タスクを作成
 * @param taskListId タスクリストID
 * @param task タスクデータ
 * @param accessToken アクセストークン
 * @returns 作成されたタスク
 */
export async function createTask(
  taskListId: string,
  task: Partial<GoogleTask>,
  accessToken: string
): Promise<GoogleTask> {
  return fetchTasksApi(`/lists/${taskListId}/tasks`, accessToken, {
    method: 'POST',
    body: JSON.stringify(task),
  });
}

/**
 * タスクを更新
 * @param taskListId タスクリストID
 * @param taskId タスクID
 * @param task 更新データ
 * @param accessToken アクセストークン
 * @returns 更新されたタスク
 */
export async function updateTask(
  taskListId: string,
  taskId: string,
  task: Partial<GoogleTask>,
  accessToken: string
): Promise<GoogleTask> {
  return fetchTasksApi(`/lists/${taskListId}/tasks/${taskId}`, accessToken, {
    method: 'PATCH',
    body: JSON.stringify(task),
  });
}

/**
 * タスクを削除
 * @param taskListId タスクリストID
 * @param taskId タスクID
 * @param accessToken アクセストークン
 */
export async function deleteTask(
  taskListId: string,
  taskId: string,
  accessToken: string
): Promise<void> {
  await fetchTasksApi(`/lists/${taskListId}/tasks/${taskId}`, accessToken, {
    method: 'DELETE',
  });
}

/**
 * タスクを完了状態に設定
 * @param taskListId タスクリストID
 * @param taskId タスクID
 * @param accessToken アクセストークン
 * @returns 更新されたタスク
 */
export async function completeTask(
  taskListId: string,
  taskId: string,
  accessToken: string
): Promise<GoogleTask> {
  const now = new Date().toISOString();
  return updateTask(
    taskListId,
    taskId,
    {
      status: 'completed',
      completed: now,
    },
    accessToken
  );
}

/**
 * タスクを未完了状態に設定
 * @param taskListId タスクリストID
 * @param taskId タスクID
 * @param accessToken アクセストークン
 * @returns 更新されたタスク
 */
export async function uncompleteTask(
  taskListId: string,
  taskId: string,
  accessToken: string
): Promise<GoogleTask> {
  return updateTask(
    taskListId,
    taskId,
    {
      status: 'needsAction',
      completed: null,
    },
    accessToken
  );
} 