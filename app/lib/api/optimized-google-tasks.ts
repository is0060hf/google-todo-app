/**
 * Google Tasks APIとの連携を行う最適化されたユーティリティ関数
 * - 指数バックオフによるリトライ
 * - ETagによるリクエスト最適化
 * - レート制限対応
 */

import { GoogleTask, GoogleTaskList } from '../../types';

const API_BASE_URL = 'https://tasks.googleapis.com/tasks/v1';
const API_KEY = process.env.GOOGLE_API_KEY;

/**
 * 待機時間を計算する関数
 * @param retryCount 現在のリトライ回数
 * @param initialDelay 初期待機時間（ミリ秒）
 * @param maxDelay 最大待機時間（ミリ秒）
 * @returns 待機時間（ミリ秒）
 */
function calculateBackoff(
  retryCount: number,
  initialDelay: number = 1000, // 1秒
  maxDelay: number = 64000, // 64秒
): number {
  // 指数バックオフの計算: 初期値 * 2^(retry)
  const delay = initialDelay * Math.pow(2, retryCount);
  
  // ランダム要素を追加してサーバー負荷を分散（ジッター）
  const jitter = Math.random() * 0.1 * delay; // 最大10%のランダム変動
  
  // 最大待機時間を超えないようにする
  return Math.min(delay + jitter, maxDelay);
}

/**
 * Google Tasks API呼び出しの最適化関数
 * @param endpoint APIエンドポイント
 * @param accessToken アクセストークン
 * @param options フェッチオプション
 * @param retryOptions リトライオプション
 * @returns APIレスポンス
 */
export async function fetchTasksApiWithRetry(
  endpoint: string,
  accessToken: string,
  options: RequestInit = {},
  retryOptions: {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
    retryableStatusCodes?: number[];
  } = {}
) {
  const {
    maxRetries = 3,
    initialDelay = 1000, // 1秒
    maxDelay = 64000, // 64秒
    retryableStatusCodes = [408, 429, 500, 502, 503, 504],
  } = retryOptions;

  // APIキーとアクセストークンの両方を使用
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  url.searchParams.append('key', API_KEY || '');

  let retryCount = 0;
  
  while (true) {
    try {
      const response = await fetch(url.toString(), {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      // キャッシュヒット（304 Not Modified）の場合は正常レスポンスとして扱う
      if (response.status === 304) {
        return { status: 304, notModified: true };
      }

      // レスポンスが正常でない場合
      if (!response.ok) {
        // 429 (Too Many Requests) の場合、Retry-Afterヘッダーを確認
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          const retryAfterSeconds = retryAfter ? parseInt(retryAfter, 10) : 0;
          
          // リトライ回数が上限に達していなければリトライ
          if (retryCount < maxRetries) {
            const delay = retryAfterSeconds > 0
              ? retryAfterSeconds * 1000
              : calculateBackoff(retryCount, initialDelay, maxDelay);
            
            console.warn(`Rate limit exceeded. Retrying after ${delay}ms. (Attempt ${retryCount + 1}/${maxRetries})`);
            
            // 待機してリトライ
            await new Promise(resolve => setTimeout(resolve, delay));
            retryCount++;
            continue;
          }
        }
        
        // リトライ可能なステータスコードの場合
        if (retryableStatusCodes.includes(response.status) && retryCount < maxRetries) {
          const delay = calculateBackoff(retryCount, initialDelay, maxDelay);
          console.warn(`API request failed with status ${response.status}. Retrying after ${delay}ms. (Attempt ${retryCount + 1}/${maxRetries})`);
          
          // 待機してリトライ
          await new Promise(resolve => setTimeout(resolve, delay));
          retryCount++;
          continue;
        }
        
        // エラーレスポンスの詳細を取得
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(`Google Tasks API Error: ${errorData.message || response.statusText} (${response.status})`);
      }
      
      // 正常レスポンスの処理
      return response.json();
    } catch (error: any) {
      // ネットワークエラーなどの場合
      if (retryCount < maxRetries && !error.message.includes('Google Tasks API Error')) {
        const delay = calculateBackoff(retryCount, initialDelay, maxDelay);
        console.warn(`API request failed: ${error.message}. Retrying after ${delay}ms. (Attempt ${retryCount + 1}/${maxRetries})`);
        
        // 待機してリトライ
        await new Promise(resolve => setTimeout(resolve, delay));
        retryCount++;
        continue;
      }
      
      // 再試行回数を超えた場合またはAPIエラーの場合はエラーを投げる
      throw error;
    }
  }
}

/**
 * タスクリスト一覧を取得（最適化版）
 * @param accessToken アクセストークン
 * @param etag 既存のETag
 * @returns タスクリスト一覧とETag
 */
export async function getTaskListsOptimized(
  accessToken: string,
  etag?: string
): Promise<{ data: GoogleTaskList[]; etag?: string; notModified?: boolean }> {
  const options: RequestInit = {};
  
  // ETagを利用した条件付きリクエスト
  if (etag) {
    options.headers = {
      'If-None-Match': etag,
    };
  }
  
  try {
    const response = await fetchTasksApiWithRetry('/users/@me/lists', accessToken, options);
    
    // キャッシュヒット（304 Not Modified）
    if (response.notModified) {
      return { data: [], notModified: true };
    }
    
    // 新しいETagを取得
    const newEtag = response.etag;
    
    return {
      data: response.items || [],
      etag: newEtag,
    };
  } catch (error) {
    console.error('Failed to fetch task lists:', error);
    throw error;
  }
}

/**
 * 特定のタスクリストのタスク一覧を取得（最適化版）
 * @param taskListId タスクリストID
 * @param accessToken アクセストークン
 * @param etag 既存のETag
 * @param showCompleted 完了タスクを表示するかどうか
 * @param maxResults 一度に取得する最大タスク数 (デフォルト: 100)
 * @param pageToken 次ページのトークン (ページング用)
 * @returns タスク一覧とETag、次ページのトークン
 */
export async function getTasksOptimized(
  taskListId: string,
  accessToken: string,
  etag?: string,
  showCompleted: boolean = true,
  maxResults: number = 100,
  pageToken?: string
): Promise<{ 
  data: GoogleTask[]; 
  etag?: string; 
  notModified?: boolean;
  nextPageToken?: string;
}> {
  // クエリパラメータの構築
  const queryParams = new URLSearchParams();
  if (!showCompleted) {
    queryParams.append('showCompleted', 'false');
  }
  
  // 最大取得数の設定（APIの制限範囲内で）
  maxResults = Math.max(1, Math.min(maxResults, 100)); // 1-100の範囲に制限
  queryParams.append('maxResults', maxResults.toString());
  
  // ページングトークンがあれば追加
  if (pageToken) {
    queryParams.append('pageToken', pageToken);
  }
  
  const queryString = queryParams.toString();
  let endpoint = `/lists/${taskListId}/tasks`;
  if (queryString) {
    endpoint += `?${queryString}`;
  }
  
  const options: RequestInit = {};
  
  // ETagを利用した条件付きリクエスト
  if (etag) {
    options.headers = {
      'If-None-Match': etag,
    };
  }
  
  try {
    const response = await fetchTasksApiWithRetry(endpoint, accessToken, options);
    
    // キャッシュヒット（304 Not Modified）
    if (response.notModified) {
      return { data: [], notModified: true };
    }
    
    // 新しいETagを取得
    const newEtag = response.etag;
    // 次ページのトークンを取得
    const nextPageToken = response.nextPageToken;
    
    return {
      data: response.items || [],
      etag: newEtag,
      nextPageToken: nextPageToken,
    };
  } catch (error) {
    console.error(`Failed to fetch tasks for list ${taskListId}:`, error);
    throw error;
  }
}

/**
 * 新しいタスクを作成（最適化版）
 * @param taskListId タスクリストID
 * @param task タスクデータ
 * @param accessToken アクセストークン
 * @returns 作成されたタスク
 */
export async function createTaskOptimized(
  taskListId: string,
  task: Partial<GoogleTask>,
  accessToken: string
): Promise<GoogleTask> {
  try {
    const response = await fetchTasksApiWithRetry(
      `/lists/${taskListId}/tasks`,
      accessToken,
      {
        method: 'POST',
        body: JSON.stringify(task),
      }
    );
    
    return response;
  } catch (error) {
    console.error(`Failed to create task in list ${taskListId}:`, error);
    throw error;
  }
}

/**
 * タスクを更新（最適化版）
 * @param taskListId タスクリストID
 * @param taskId タスクID
 * @param task 更新データ
 * @param accessToken アクセストークン
 * @param etag 既存のETag
 * @returns 更新されたタスク
 */
export async function updateTaskOptimized(
  taskListId: string,
  taskId: string,
  task: Partial<GoogleTask>,
  accessToken: string,
  etag?: string
): Promise<GoogleTask> {
  const options: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify(task),
  };
  
  // ETagを利用した条件付きリクエスト（競合検出）
  if (etag) {
    options.headers = {
      'If-Match': etag,
    };
  }
  
  try {
    const response = await fetchTasksApiWithRetry(
      `/lists/${taskListId}/tasks/${taskId}`,
      accessToken,
      options
    );
    
    return response;
  } catch (error) {
    console.error(`Failed to update task ${taskId} in list ${taskListId}:`, error);
    throw error;
  }
}

/**
 * タスクの順序を変更（最適化版）
 * @param taskListId タスクリストID
 * @param taskId タスクID
 * @param params 移動パラメータ
 * @param accessToken アクセストークン
 * @returns 更新されたタスク
 */
export async function moveTaskOptimized(
  taskListId: string,
  taskId: string,
  params: {
    parent?: string;
    previous?: string;
  },
  accessToken: string
): Promise<GoogleTask> {
  let endpoint = `/lists/${taskListId}/tasks/${taskId}/move`;
  
  // クエリパラメータを追加
  const queryParams = new URLSearchParams();
  if (params.parent) {
    queryParams.append('parent', params.parent);
  }
  if (params.previous) {
    queryParams.append('previous', params.previous);
  }
  
  const queryString = queryParams.toString();
  if (queryString) {
    endpoint += `?${queryString}`;
  }
  
  try {
    const response = await fetchTasksApiWithRetry(
      endpoint,
      accessToken,
      {
        method: 'POST',
      }
    );
    
    return response;
  } catch (error) {
    console.error(`Failed to move task ${taskId} in list ${taskListId}:`, error);
    throw error;
  }
} 