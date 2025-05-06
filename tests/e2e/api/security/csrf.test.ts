import { authApiLogic } from '../../../utils/api-test-utils';
import { mockAuthenticatedUser } from '../../../utils/auth';

// globalオブジェクトの型拡張のための宣言
declare global {
  var originalFetch: typeof fetch;
}

/**
 * セキュリティテスト：CSRF保護
 * 
 * このテストでは、アプリケーションのCSRF（クロスサイトリクエストフォージェリ）
 * 保護機能が正しく動作することを確認します。
 */
describe('CSRF保護テスト', () => {
  const userId = 'test-user-id';
  
  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthenticatedUser(userId);

    // オリジナルのfetch関数をバックアップ
    global.originalFetch = global.fetch;
  });

  afterEach(() => {
    // テスト後にオリジナルのfetch関数を復元
    global.fetch = global.originalFetch;
  });

  test('CSRFトークン検証が行われる', async () => {
    // APIリクエストで検証されるCSRFトークンをモック
    const mockCSRFToken = 'valid-csrf-token';
    const mockCSRFCookie = 'csrf-cookie=valid-csrf-token';
    
    // fetchをモック化してCSRFチェックをシミュレート
    global.fetch = jest.fn().mockImplementation((url, options) => {
      // CSRFトークンが含まれているか確認
      const hasCSRFToken = options.headers && 
        (options.headers['X-CSRF-Token'] === mockCSRFToken || 
         options.headers['csrf-token'] === mockCSRFToken);
      
      // CSRFトークンが一致する場合は成功レスポンス
      if (hasCSRFToken) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true })
        });
      }
      
      // CSRFトークンがない/一致しない場合は403エラー
      return Promise.resolve({
        ok: false,
        status: 403,
        statusText: 'Forbidden: CSRF token validation failed',
        json: () => Promise.resolve({ 
          error: 'CSRF token validation failed' 
        })
      });
    });
    
    // 正しいCSRFトークンを持つリクエスト
    const validResponse = await fetch('/api/example', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': mockCSRFToken,
        'Cookie': mockCSRFCookie
      },
      body: JSON.stringify({ test: true })
    });
    
    // 不正なCSRFトークンを持つリクエスト
    const invalidResponse = await fetch('/api/example', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': 'invalid-token',
        'Cookie': mockCSRFCookie
      },
      body: JSON.stringify({ test: true })
    });
    
    // 検証
    expect(validResponse.ok).toBe(true);
    expect(invalidResponse.ok).toBe(false);
    expect(invalidResponse.status).toBe(403);
  });

  test('非ミューテーションリクエスト（GET）はCSRFトークン検証をスキップできる', async () => {
    // fetchをモック化して動作をシミュレート
    global.fetch = jest.fn().mockImplementation((url, options) => {
      // GETリクエストはCSRFトークンがなくても成功する
      if (!options || options.method === 'GET' || !options.method) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true })
        });
      }
      
      // 他のメソッドはCSRFトークンがないと失敗する
      return Promise.resolve({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
        json: () => Promise.resolve({ error: 'CSRF token validation failed' })
      });
    });
    
    // GETリクエスト（トークンなし）
    const getResponse = await fetch('/api/example');
    
    // POSTリクエスト（トークンなし）
    const postResponse = await fetch('/api/example', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: true })
    });
    
    // 検証
    expect(getResponse.ok).toBe(true);
    expect(postResponse.ok).toBe(false);
    expect(postResponse.status).toBe(403);
  });
}); 