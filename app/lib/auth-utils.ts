'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

/**
 * 現在のCSRFトークンを取得する
 * すべての状態変更リクエスト（POST/PUT/DELETE/PATCH）で使用する必要がある
 */
export function useCSRFToken() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const { status } = useSession();

  useEffect(() => {
    // ユーザーが認証されている場合のみCSRFトークンを取得
    if (status === 'authenticated') {
      fetchCSRFToken().then(setCsrfToken);
    }
  }, [status]);

  return csrfToken;
}

/**
 * CSRFトークンを取得する非同期関数
 * fetch APIを使用して/api/auth/csrf エンドポイントからトークンを取得
 */
export async function fetchCSRFToken(): Promise<string> {
  try {
    const response = await fetch('/api/auth/csrf');
    const data = await response.json();
    return data.csrfToken;
  } catch (error) {
    console.error('CSRFトークン取得エラー:', error);
    throw new Error('CSRFトークンの取得に失敗しました');
  }
}

/**
 * APIリクエスト用のセキュアなfetch関数
 * CSRFトークンを自動的にヘッダーに追加
 */
export async function secureFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  // デフォルトではGET以外のリクエストにCSRFトークンを追加
  const needsCSRF = options.method && options.method !== 'GET';
  
  if (needsCSRF) {
    try {
      const csrfToken = await fetchCSRFToken();
      
      // ヘッダーにCSRFトークンを追加
      options.headers = {
        ...options.headers,
        'x-csrf-token': csrfToken,
      };
    } catch (error) {
      console.error('CSRF保護エラー:', error);
    }
  }
  
  // リクエスト実行
  return fetch(url, options);
}

/**
 * APIリクエストフックを作成
 * @param defaultOptions デフォルトのリクエストオプション
 */
export function useSecureAPI(defaultOptions: RequestInit = {}) {
  const csrfToken = useCSRFToken();
  
  return {
    fetch: async (url: string, options: RequestInit = {}): Promise<Response> => {
      const mergedOptions = { ...defaultOptions, ...options };
      
      // GETリクエスト以外の場合はCSRFトークンを追加
      if (mergedOptions.method && mergedOptions.method !== 'GET' && csrfToken) {
        mergedOptions.headers = {
          ...mergedOptions.headers,
          'x-csrf-token': csrfToken,
        };
      }
      
      return fetch(url, mergedOptions);
    }
  };
} 