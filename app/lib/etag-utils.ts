'use client';

/**
 * オブジェクトからETagを生成する関数
 * @param data データオブジェクト
 * @returns ETag文字列
 */
export async function generateETag(data: any): Promise<string> {
  if (!data) return '';
  
  // Web Crypto API を使用してMD5相当のハッシュを生成
  const jsonString = JSON.stringify(data);
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(jsonString);
  
  // SHA-256を使用（ブラウザではMD5が利用できないため）
  const hashBuffer = await crypto.subtle.digest('SHA-256', encodedData);
  
  // ArrayBufferを16進数文字列に変換
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

/**
 * ETagを比較して変更があるか確認する関数
 * @param oldETag 古いETag
 * @param newETag 新しいETag
 * @returns 変更があるかどうか
 */
export function hasChanged(oldETag: string, newETag: string): boolean {
  if (!oldETag || !newETag) return true;
  return oldETag !== newETag;
}

/**
 * ETagをローカルストレージに保存する関数
 * @param key キー
 * @param etag ETag
 */
export function saveETag(key: string, etag: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`etag_${key}`, etag);
}

/**
 * ローカルストレージからETagを取得する関数
 * @param key キー
 * @returns 保存されていたETag
 */
export function getETag(key: string): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(`etag_${key}`) || '';
}

/**
 * ETagを使用してAPIリクエストを最適化するフック用オプション
 */
export interface ETagOptions {
  key: string;
  enabled?: boolean;
  onNotModified?: () => void;
}

/**
 * レスポンスヘッダーからETagを取得する関数
 * @param headers レスポンスヘッダー
 * @returns ETag
 */
export function getETagFromHeaders(headers: Headers): string {
  return headers.get('etag') || '';
}

/**
 * ETagを使用したAPIリクエストのヘッダーを追加する関数
 * @param key リソースキー
 * @returns ヘッダーオブジェクト
 */
export function getRequestHeadersWithETag(key: string): Record<string, string> {
  const currentETag = getETag(key);
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (currentETag) {
    headers['If-None-Match'] = currentETag;
  }
  
  return headers;
} 