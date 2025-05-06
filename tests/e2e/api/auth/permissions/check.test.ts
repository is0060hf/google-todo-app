import { authApiLogic } from '../../../../utils/api-test-utils';

describe('権限チェック', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('タスク操作権限を持つユーザーはタスクにアクセスできる', async () => {
    // 有効なセッションデータ（タスク操作権限あり）
    const sessionData = {
      user: {
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com'
      },
      accessToken: 'valid-access-token' // タスク操作の権限を含む
    };
    
    // 権限チェック
    const result = await authApiLogic.verifyPermissions(sessionData, 'tasks');
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.success).toBe(true);
  });

  test('管理者ユーザーは管理者権限を持つ', async () => {
    // 管理者ユーザーのセッションデータ
    const sessionData = {
      user: {
        id: 'admin-user-id', // 管理者ID
        name: 'Admin User',
        email: 'admin@example.com'
      },
      accessToken: 'valid-access-token'
    };
    
    // 管理者権限チェック
    const result = await authApiLogic.verifyPermissions(sessionData, 'admin');
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.success).toBe(true);
  });

  test('一般ユーザーは管理者権限を持たない', async () => {
    // 一般ユーザーのセッションデータ
    const sessionData = {
      user: {
        id: 'user-123', // 管理者IDでない
        name: 'Test User',
        email: 'test@example.com'
      },
      accessToken: 'valid-access-token'
    };
    
    // 管理者権限チェック
    const result = await authApiLogic.verifyPermissions(sessionData, 'admin');
    
    // レスポンスの検証
    expect(result.status).toBe(403);
    expect(result.error).toBe('Forbidden: insufficient permissions');
  });

  test('自分のリソースにはアクセスできる', async () => {
    // ユーザーのセッションデータ
    const sessionData = {
      user: {
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com'
      },
      accessToken: 'valid-access-token'
    };
    
    // リソース所有者チェック（自分のリソース）
    const result = await authApiLogic.verifyPermissions(sessionData, 'resource:tag-123:user-123');
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.success).toBe(true);
  });

  test('他のユーザーのリソースにはアクセスできない', async () => {
    // ユーザーのセッションデータ
    const sessionData = {
      user: {
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com'
      },
      accessToken: 'valid-access-token'
    };
    
    // リソース所有者チェック（他人のリソース）
    const result = await authApiLogic.verifyPermissions(sessionData, 'resource:tag-456:other-user-id');
    
    // レスポンスの検証
    expect(result.status).toBe(403);
    expect(result.error).toBe('Forbidden: resource belongs to another user');
  });

  test('セッションがない場合は認証エラーになる', async () => {
    // セッションなし
    const sessionData = null;
    
    // 権限チェック
    const result = await authApiLogic.verifyPermissions(sessionData, 'tasks');
    
    // レスポンスの検証
    expect(result.status).toBe(401);
    expect(result.error).toBe('Authentication required');
  });

  test('ユーザーIDがない場合は認証エラーになる', async () => {
    // ユーザーIDのないセッションデータ
    const sessionData = {
      user: {
        // IDがない
        name: 'Test User',
        email: 'test@example.com'
      },
      accessToken: 'valid-access-token'
    };
    
    // 権限チェック
    const result = await authApiLogic.verifyPermissions(sessionData, 'tasks');
    
    // レスポンスの検証
    expect(result.status).toBe(401);
    expect(result.error).toBe('User ID not found in session');
  });

  test('アクセストークンがない場合は認証エラーになる', async () => {
    // アクセストークンのないセッションデータ
    const sessionData = {
      user: {
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com'
      }
      // アクセストークンがない
    };
    
    // 権限チェック
    const result = await authApiLogic.verifyPermissions(sessionData, 'tasks');
    
    // レスポンスの検証
    expect(result.status).toBe(401);
    expect(result.error).toBe('Access token not found');
  });
}); 