'use server';

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

/**
 * CSRFトークンを検証するミドルウェア
 * すべての状態変更リクエスト（POST/PUT/DELETE/PATCH）で使用すべき
 */
export async function validateCsrfToken(request: NextRequest) {
  // GETリクエストはCSRF検証を免除
  if (request.method === 'GET') {
    return null;
  }

  // セッションがあるか確認
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: '認証が必要です。' },
      { status: 401 }
    );
  }

  try {
    // ヘッダーからCSRFトークンを取得
    const csrfTokenFromHeader = request.headers.get('x-csrf-token');
    
    // Cookieからnext-authのCSRFトークンを取得
    const cookieStore = cookies();
    const cookieName = process.env.NODE_ENV === 'production' 
      ? '__Host-next-auth.csrf-token' 
      : 'next-auth.csrf-token';
    
    const csrfCookie = cookieStore.get(cookieName);
    
    if (!csrfCookie || !csrfCookie.value) {
      console.error('CSRFトークンCookieが見つかりません');
      return NextResponse.json(
        { error: 'CSRFトークンが見つかりません。' },
        { status: 403 }
      );
    }
    
    // CSRFトークンの値を抽出（形式は通常 "token|hash"）
    const [csrfTokenFromCookie] = csrfCookie.value.split('|');
    
    // トークンを比較
    if (!csrfTokenFromHeader || csrfTokenFromHeader !== csrfTokenFromCookie) {
      console.error('CSRFトークンが一致しません');
      return NextResponse.json(
        { error: 'セキュリティトークンが無効です。' },
        { status: 403 }
      );
    }
    
    // 検証成功
    return null;
  } catch (error) {
    console.error('CSRF検証中にエラーが発生しました:', error);
    return NextResponse.json(
      { error: 'セキュリティチェックに失敗しました。' },
      { status: 500 }
    );
  }
}

/**
 * API処理を行う前にCSRF検証を行うラッパー関数
 * @param handler 実際のAPI処理を行うハンドラ関数
 * @returns 検証後のAPIレスポンス
 */
export function withCsrfProtection(handler: (request: NextRequest) => Promise<Response>) {
  return async function csrfProtectedHandler(request: NextRequest) {
    // CSRF検証
    const csrfError = await validateCsrfToken(request);
    if (csrfError) {
      return csrfError;
    }
    
    // 検証成功したら実際のハンドラを実行
    return handler(request);
  };
} 