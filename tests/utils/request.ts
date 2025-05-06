import { NextRequest, NextResponse } from 'next/server';

/**
 * テスト用のNextRequestインスタンスを作成する
 */
export function createMockRequest(
  method: string = 'GET',
  url: string = 'http://localhost:3000',
  body?: any,
  headers: Record<string, string> = {}
): NextRequest {
  const requestInit: any = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };

  if (body) {
    requestInit.body = JSON.stringify(body);
  }

  return new NextRequest(url, requestInit);
}

/**
 * パラメータオブジェクトを作成する
 */
export function createParams<T extends Record<string, string>>(params: T) {
  return { params };
} 