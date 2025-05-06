import { authApiLogic } from '../../../../utils/api-test-utils';
import { getServerSession } from 'next-auth';
import { mockAuthenticatedUser, mockUnauthenticatedUser, mockMissingAccessToken } from '../../../../utils/auth';

// getServerSessionのモック
jest.mock('next-auth');

describe('セッション管理', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('有効なセッションは検証に合格する', async () => {
    // 有効なセッションデータ
    const validSession = {
      user: {
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com'
      },
      accessToken: 'valid-access-token',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 1日後
    };
    
    // セッション検証
    const result = await authApiLogic.verifySession(validSession);
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.success).toBe(true);
    expect(result.session).toEqual(validSession);
  });

  test('ユーザーIDのないセッションは無効', async () => {
    // ユーザーIDのないセッションデータ
    const invalidSession = {
      user: {
        // IDがない
        name: 'Test User',
        email: 'test@example.com'
      },
      accessToken: 'valid-access-token',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
    
    // セッション検証
    const result = await authApiLogic.verifySession(invalidSession);
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Invalid session: user ID is missing');
  });

  test('アクセストークンのないセッションは無効', async () => {
    // アクセストークンのないセッションデータ
    const invalidSession = {
      user: {
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com'
      },
      // アクセストークンがない
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
    
    // セッション検証
    const result = await authApiLogic.verifySession(invalidSession);
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Invalid session: access token is missing');
  });

  test('セッションデータがない場合はエラー', async () => {
    // セッションデータなし
    const noSession = null;
    
    // セッション検証
    const result = await authApiLogic.verifySession(noSession);
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('No session data provided');
  });

  test('認証モックユーティリティの動作確認', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('test-user-id');
    
    // getServerSessionの呼び出し
    const session = await getServerSession();
    
    // セッションデータの検証
    expect(session).toBeDefined();
    expect(session.user.id).toBe('test-user-id');
    expect(session.accessToken).toBe('mock-access-token');
    
    // 未認証状態をモック
    mockUnauthenticatedUser();
    
    // getServerSessionの呼び出し
    const noSession = await getServerSession();
    
    // セッションデータの検証
    expect(noSession).toBeNull();
    
    // アクセストークンが欠落した状態をモック
    mockMissingAccessToken();
    
    // getServerSessionの呼び出し
    const sessionWithoutToken = await getServerSession();
    
    // セッションデータの検証
    expect(sessionWithoutToken).toBeDefined();
    expect(sessionWithoutToken.user.id).toBe('test-user-id');
    expect(sessionWithoutToken.accessToken).toBeUndefined();
  });
}); 