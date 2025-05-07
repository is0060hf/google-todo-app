import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';

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
 * ユーザー向けエラーメッセージをエラーコードから取得する
 * @param code エラーコード
 * @returns ユーザーフレンドリーなエラーメッセージ
 */
export function getUserFriendlyErrorMessage(code: ErrorCodeType | string): string {
  switch (code) {
    // 認証・認可エラー
    case ErrorCode.UNAUTHORIZED:
      return 'ログインが必要です。再度ログインしてください。';
    case ErrorCode.FORBIDDEN:
      return 'この操作を行う権限がありません。';
    case ErrorCode.INVALID_TOKEN:
      return '認証情報が無効です。再度ログインしてください。';
    case ErrorCode.SESSION_EXPIRED:
      return 'セッションの有効期限が切れました。再度ログインしてください。';
    
    // 入力検証エラー
    case ErrorCode.VALIDATION_ERROR:
      return '入力内容に誤りがあります。入力内容を確認してください。';
    case ErrorCode.INVALID_REQUEST:
      return 'リクエストの形式が正しくありません。';
    
    // リソースエラー
    case ErrorCode.NOT_FOUND:
      return '指定されたリソースが見つかりませんでした。';
    case ErrorCode.ALREADY_EXISTS:
      return '同じ名前または属性のリソースがすでに存在します。';
    case ErrorCode.CONFLICT:
      return 'リソースの競合が発生しました。最新の情報で再度お試しください。';
    
    // 外部APIエラー
    case ErrorCode.GOOGLE_API_ERROR:
      return 'Google APIとの通信中にエラーが発生しました。しばらく経ってから再度お試しください。';
    case ErrorCode.QUOTA_EXCEEDED:
      return 'APIの利用制限に達しました。しばらく経ってから再度お試しください。';
    case ErrorCode.API_UNAVAILABLE:
      return '外部サービスが一時的に利用できません。しばらく経ってから再度お試しください。';
    
    // データベースエラー
    case ErrorCode.DATABASE_ERROR:
      return 'データベース操作中にエラーが発生しました。管理者にお問い合わせください。';
    case ErrorCode.TRANSACTION_ERROR:
      return 'データの処理中にエラーが発生しました。再度お試しください。';
    
    // その他のエラー
    case ErrorCode.INTERNAL_ERROR:
    case ErrorCode.UNKNOWN_ERROR:
    default:
      return '予期しないエラーが発生しました。しばらく経ってから再度お試しください。';
  }
}

/**
 * エラーの重大度を判断する
 * @param status HTTPステータスコード 
 * @returns Sentryのログレベル
 */
function getSeverityFromStatus(status: number): 'fatal' | 'error' | 'warning' | 'info' {
  if (status >= 500) return 'error';
  if (status >= 400) return 'warning';
  return 'info';
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
  
  // Sentryにエラーを記録
  Sentry.withScope((scope) => {
    scope.setLevel(getSeverityFromStatus(apiError.status));
    
    // エラーの詳細情報をSentryに追加
    if (apiError.code) {
      scope.setTag('error.code', apiError.code);
    }
    scope.setTag('error.status', apiError.status.toString());
    
    if (apiError.details) {
      scope.setExtras({
        details: apiError.details
      });
    }
    
    // JavaScriptのErrorオブジェクトがある場合はそれをキャプチャ
    if (error instanceof Error) {
      Sentry.captureException(error);
    } else {
      // それ以外の場合はメッセージをキャプチャ
      Sentry.captureMessage(apiError.message, getSeverityFromStatus(apiError.status));
    }
  });
  
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
  
  // ユーザーフレンドリーなエラーメッセージを追加
  const userMessage = apiError.code ? getUserFriendlyErrorMessage(apiError.code) : apiError.message;
  
  return NextResponse.json(
    { 
      error: apiError.message, 
      userMessage,
      code: apiError.code, 
      details: apiError.details 
    },
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
      // Sentryにエラーを送信
      Sentry.captureException(error);
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