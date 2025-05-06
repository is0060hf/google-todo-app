import { NextRequest, NextResponse } from 'next/server';
import { mock } from 'jest-mock-extended';
import { mockNextResponseJson } from '../mocks/next-response';

// Next.jsのヘッダーやリクエストスコープをモックするための定義
const createMockHeaders = () => {
  const headers = new Map<string, string>();
  return {
    append: jest.fn((key, value) => headers.set(key, value)),
    delete: jest.fn((key) => headers.delete(key)),
    get: jest.fn((key) => headers.get(key) || null),
    has: jest.fn((key) => headers.has(key)),
    set: jest.fn((key, value) => headers.set(key, value)),
    forEach: jest.fn((callback) => headers.forEach((value, key) => callback(value, key))),
    keys: jest.fn(() => Array.from(headers.keys())),
    values: jest.fn(() => Array.from(headers.values())),
    entries: jest.fn(() => Array.from(headers.entries())),
  };
};

/**
 * Next.jsのAPIルートハンドラをテスト環境でモックするためのヘルパー関数
 * `headers`や`cookies`などのリクエストスコープの問題を解決します
 * 
 * @param handler テスト対象のAPIハンドラ関数（GET, POST, PUT, DELETEなど）
 * @param request モックリクエストオブジェクト
 * @param params URLパラメータオブジェクト（Optional）
 * @returns APIハンドラからのレスポンス
 */
export async function mockApiHandler(
  handler: (req: NextRequest, params?: any) => Promise<NextResponse>,
  request: NextRequest,
  params?: { params: Record<string, string> }
): Promise<NextResponse> {
  try {
    // リクエストスコープを模倣するためのモック処理
    // Next.jsのグローバルオブジェクトを保存しておく
    const originalHeaders = globalThis.Headers;
    const originalRequest = globalThis.Request;
    const originalResponse = globalThis.Response;
    const originalNextResponse = NextResponse;

    // Next.jsのリクエストスコープオブジェクトをモック
    // @ts-ignore - ここでは型エラーを無視する
    globalThis.Headers = jest.fn().mockImplementation(() => createMockHeaders());
    // @ts-ignore - ここでは型エラーを無視する
    globalThis.Request = jest.fn().mockImplementation(() => request);
    
    // Responseをモック
    // @ts-ignore - ここでは型エラーを無視する
    globalThis.Response = jest.fn().mockImplementation((body: any, init?: ResponseInit) => {
      return {
        body,
        status: init?.status || 200,
        headers: createMockHeaders(),
        json: async () => typeof body === 'string' ? JSON.parse(body) : body,
      };
    });
    
    // NextResponseのstaticメソッドをモック
    // @ts-ignore - ここでは型エラーを無視する
    NextResponse.json = jest.fn().mockImplementation((data: any, init?: ResponseInit) => {
      return mockNextResponseJson(data, init);
    });

    try {
      // モックされた環境でハンドラを実行
      const response = await handler(request, params);
      return response;
    } finally {
      // オリジナルのグローバルオブジェクトを復元
      globalThis.Headers = originalHeaders;
      globalThis.Request = originalRequest;
      globalThis.Response = originalResponse;
      // @ts-ignore - ここでは型エラーを無視する
      NextResponse.json = originalNextResponse.json;
    }
  } catch (error) {
    console.error('Error executing API handler:', error);
    return mockNextResponseJson(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * Next.jsのサーバーセッションを含むAPIハンドラテスト用ヘルパー
 * getServerSessionのモックが事前に設定されていることを前提としています
 */
export async function mockApiHandlerWithSession(
  handler: (req: NextRequest, params?: any) => Promise<NextResponse>,
  request: NextRequest,
  params?: { params: Record<string, string> }
): Promise<NextResponse> {
  // tests/setup.ts または tests/utils/auth.ts で
  // getServerSession のモックが既に設定されていることを前提としています
  return mockApiHandler(handler, request, params);
} 