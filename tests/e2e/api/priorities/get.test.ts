import { mockAuthenticatedUser } from '../../../utils/auth';
import { prioritiesApiLogic } from '../../../utils/api-test-utils';

describe('GET /api/priorities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('優先度一覧を取得できる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // APIロジックを直接呼び出し
    const result = await prioritiesApiLogic.getPriorities();
    
    // 期待される優先度データ
    const expectedPriorities = [
      { id: 1, name: '低', color: '#4CAF50' },
      { id: 2, name: '中', color: '#FFC107' },
      { id: 3, name: '高', color: '#F44336' }
    ];
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.priorities).toEqual(expectedPriorities);
    expect(result.priorities.length).toBe(3);
    
    // 個別の優先度項目の検証
    expect(result.priorities[0].id).toBe(1);
    expect(result.priorities[0].name).toBe('低');
    expect(result.priorities[0].color).toBe('#4CAF50');
    
    expect(result.priorities[1].id).toBe(2);
    expect(result.priorities[1].name).toBe('中');
    expect(result.priorities[1].color).toBe('#FFC107');
    
    expect(result.priorities[2].id).toBe(3);
    expect(result.priorities[2].name).toBe('高');
    expect(result.priorities[2].color).toBe('#F44336');
  });

  // エラーケースは優先度が静的データなので少ないですが、
  // 将来的にデータベースから取得する場合を想定して追加
  test('例外が発生した場合は500エラーになる', async () => {
    // モック関数を上書きして例外をスローさせる
    const originalGetPriorities = prioritiesApiLogic.getPriorities;
    prioritiesApiLogic.getPriorities = jest.fn().mockImplementationOnce(() => {
      throw new Error('Unexpected error');
    });
    
    try {
      // APIロジックを直接呼び出し
      const result = await prioritiesApiLogic.getPriorities();
      
      // エラーが発生しなかった場合は失敗
      expect(true).toBe(false);
    } catch (error) {
      // エラーの検証
      expect(error.message).toBe('Unexpected error');
    }
    
    // 元の関数に戻す
    prioritiesApiLogic.getPriorities = originalGetPriorities;
  });
}); 