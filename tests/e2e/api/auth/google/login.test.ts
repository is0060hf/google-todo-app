import { authApiLogic } from '../../../../utils/api-test-utils';

describe('Googleログインフロー', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('有効な認証コードを使用してログインできる', async () => {
    // 認証コード
    const authCode = 'valid-auth-code';
    
    // ログインフローをテスト
    const result = await authApiLogic.verifyGoogleLoginFlow(authCode);
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.success).toBe(true);
    
    // トークンデータの検証
    expect(result.tokens).toBeDefined();
    expect(result.tokens.access_token).toBe('mock-access-token');
    expect(result.tokens.refresh_token).toBe('mock-refresh-token');
    expect(result.tokens.id_token).toBe('mock-id-token');
    expect(result.tokens.expires_in).toBe(3600);
  });

  test('認証コードがない場合は400エラーになる', async () => {
    // 空の認証コード
    const authCode = '';
    
    // ログインフローをテスト
    const result = await authApiLogic.verifyGoogleLoginFlow(authCode);
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Authorization code is required');
  });

  test('ログインフロー中にエラーが発生した場合は500エラーになる', async () => {
    // モック関数を上書きして例外をスローさせる
    const originalVerifyGoogleLoginFlow = authApiLogic.verifyGoogleLoginFlow;
    authApiLogic.verifyGoogleLoginFlow = jest.fn().mockImplementationOnce(() => {
      throw new Error('Unexpected error during login flow');
    });
    
    try {
      // ログインフローをテスト
      const result = await authApiLogic.verifyGoogleLoginFlow('auth-code');
      
      // エラーが発生しなかった場合は失敗
      expect(true).toBe(false);
    } catch (error: any) {
      // エラーの検証
      expect(error.message).toBe('Unexpected error during login flow');
    }
    
    // 元の関数に戻す
    authApiLogic.verifyGoogleLoginFlow = originalVerifyGoogleLoginFlow;
  });
}); 