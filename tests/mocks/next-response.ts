import { NextResponse } from 'next/server';

// NextResponseをモックするためのヘルパー関数
export const createMockNextResponse = () => {
  const headers = new Map<string, string>();
  
  const mockResponse = {
    status: 200,
    statusText: 'OK',
    headers: {
      append: jest.fn((key: string, value: string) => headers.set(key, value)),
      delete: jest.fn((key: string) => headers.delete(key)),
      get: jest.fn((key: string) => headers.get(key) || null),
      has: jest.fn((key: string) => headers.has(key)),
      set: jest.fn((key: string, value: string) => headers.set(key, value)),
      forEach: jest.fn((callback: (value: string, key: string) => void) => headers.forEach((value, key) => callback(value, key))),
      keys: jest.fn(() => Array.from(headers.keys())),
      values: jest.fn(() => Array.from(headers.values())),
      entries: jest.fn(() => Array.from(headers.entries())),
    },
    body: null,
    bodyUsed: false,
    json: jest.fn().mockImplementation(async () => ({})),
    text: jest.fn().mockImplementation(async () => ''),
    cookies: {
      get: jest.fn().mockReturnValue(null),
      getAll: jest.fn().mockReturnValue([]),
      set: jest.fn(),
      delete: jest.fn(),
      has: jest.fn().mockReturnValue(false),
    },
    clone: jest.fn().mockImplementation(() => mockResponse),
  };
  
  return mockResponse;
};

// NextResponse.jsonメソッドをモック化
export const mockNextResponseJson = (data: any, init?: ResponseInit): NextResponse => {
  const mockResponse = createMockNextResponse() as unknown as NextResponse;
  
  // データとステータスコードを設定
  (mockResponse as any)._data = data;
  if (init?.status) {
    (mockResponse as any).status = init.status;
  }
  
  // jsonメソッドをオーバーライド
  (mockResponse as any).json = jest.fn().mockImplementation(async () => data);
  
  return mockResponse;
};

// NextResponse.redirectメソッドをモック化
export const mockNextResponseRedirect = (url: string, init?: ResponseInit): NextResponse => {
  const mockResponse = createMockNextResponse() as unknown as NextResponse;
  
  // リダイレクト情報を設定
  (mockResponse as any).url = url;
  (mockResponse as any).redirected = true;
  if (init?.status) {
    (mockResponse as any).status = init.status;
  } else {
    (mockResponse as any).status = 302; // デフォルトのリダイレクトステータス
  }
  
  return mockResponse;
}; 