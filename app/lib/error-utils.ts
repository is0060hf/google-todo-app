import { NextResponse } from 'next/server';

/**
 * API エラー情報インターフェース
 */
export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: any;
}

/**
 * 標準化されたAPIエラーレスポンスを生成する関数
 * @param error エラー情報
 * @returns NextResponse オブジェクト
 */
export function createErrorResponse(error: ApiError | Error | string): NextResponse {
  let apiError: ApiError;
  
  if (typeof error === 'string') {
    apiError = {
      status: 500,
      message: error
    };
  } else if (error instanceof Error) {
    apiError = {
      status: 500,
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    };
  } else {
    apiError = error;
  }
  
  // ステータスコードのデフォルト値を設定
  if (!apiError.status) {
    apiError.status = 500;
  }
  
  // エラーログ出力（開発環境では詳細も出力）
  if (process.env.NODE_ENV === 'development') {
    console.error(`API Error (${apiError.status}):`, apiError);
  } else {
    // 本番環境では機密情報を含まない形でログ出力
    console.error(`API Error (${apiError.status}): ${apiError.message} ${apiError.code || ''}`);
  }
  
  // クライアントに返すレスポンスから、details（スタックトレースなど）を削除
  if (process.env.NODE_ENV !== 'development') {
    delete apiError.details;
  }
  
  return NextResponse.json(
    { error: apiError.message, code: apiError.code, details: apiError.details },
    { status: apiError.status }
  );
}

/**
 * 予期しないエラーをキャッチしてレスポンスを生成するユーティリティ
 * @param fn API ハンドラ関数
 * @returns ラップされたAPI ハンドラ関数
 */
export function withErrorHandling(fn: Function) {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error('Unhandled API error:', error);
      return createErrorResponse(error as Error);
    }
  };
}

/**
 * エラーコード定数
 * さまざまなエラータイプのコードを定義
 */
export const ErrorCode = {
  // 認証・認可エラー
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INVALID_TOKEN: 'INVALID_TOKEN',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  
  // 入力検証エラー
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_REQUEST: 'INVALID_REQUEST',
  
  // リソースエラー
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  CONFLICT: 'CONFLICT',
  
  // 外部APIエラー
  GOOGLE_API_ERROR: 'GOOGLE_API_ERROR',
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
  API_UNAVAILABLE: 'API_UNAVAILABLE',
  
  // データベースエラー
  DATABASE_ERROR: 'DATABASE_ERROR',
  TRANSACTION_ERROR: 'TRANSACTION_ERROR',
  
  // その他のエラー
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

// エラーコードの型（TypeScriptの型システムのため）
export type ErrorCodeType = typeof ErrorCode[keyof typeof ErrorCode]; 