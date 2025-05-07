'use client';

/**
 * 指数バックオフを使用したリトライ機能を提供するユーティリティ
 * Googleの推奨に従い、初回失敗時は1秒待機し、その後2倍ずつ待機時間を増やす（最大64秒）
 */

/**
 * 待機時間を計算する関数
 * @param retryCount 現在のリトライ回数
 * @param initialDelay 初期待機時間（ミリ秒）
 * @param maxDelay 最大待機時間（ミリ秒）
 * @returns 待機時間（ミリ秒）
 */
export function calculateBackoff(
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
 * 指定された関数を指数バックオフを用いて再試行する
 * @param fn 実行する関数
 * @param options リトライオプション
 * @returns 関数の実行結果
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
    retryableStatusCodes?: number[];
    onRetry?: (retryCount: number, error: Error, delay: number) => void;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000, // 1秒
    maxDelay = 64000, // 64秒
    retryableStatusCodes = [408, 429, 500, 502, 503, 504], // リトライ対象のステータスコード
    onRetry = () => {}, // リトライ時のコールバック
  } = options;

  let retryCount = 0;
  
  while (true) {
    try {
      return await fn();
    } catch (error: any) {
      // 最大リトライ回数に達した場合はエラーをスロー
      if (retryCount >= maxRetries) {
        throw error;
      }
      
      // HTTPエラーの場合、ステータスコードを確認
      const statusCode = error.status || (error.response?.status);
      
      // リトライ可能なエラーか確認
      const isRetryable = statusCode && retryableStatusCodes.includes(statusCode);
      
      // リトライ不可能なエラーの場合はそのままスロー
      if (!isRetryable) {
        throw error;
      }
      
      // Retry-Afterヘッダーがある場合はその値を優先
      const retryAfter = error.response?.headers?.get('retry-after');
      let delay = retryAfter
        ? (isNaN(Number(retryAfter)) ? 0 : Number(retryAfter) * 1000) // 秒単位を変換
        : calculateBackoff(retryCount, initialDelay, maxDelay);
      
      // コールバック関数を実行
      onRetry(retryCount, error, delay);
      
      // 待機
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // リトライカウントを増やす
      retryCount++;
    }
  }
}

/**
 * fetchリクエストを指数バックオフを用いて再試行する
 * @param url リクエストURL
 * @param options fetchオプション
 * @param retryOptions リトライオプション
 * @returns fetchレスポンス
 */
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retryOptions: {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
    retryableStatusCodes?: number[];
    onRetry?: (retryCount: number, error: Error, delay: number) => void;
  } = {}
): Promise<Response> {
  return withRetry(
    async () => {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        // エラーオブジェクトにステータスコードを含める
        const error: any = new Error(`Request failed with status ${response.status}`);
        error.status = response.status;
        error.response = response;
        throw error;
      }
      
      return response;
    },
    retryOptions
  );
} 