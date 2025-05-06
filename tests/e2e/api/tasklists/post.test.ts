import { mockAuthenticatedUserWithToken } from '../../../utils/auth';
import { tasklistsApiLogic } from '../../../utils/api-test-utils';

// メソッドモック
global.fetch = jest.fn();

describe('POST /api/tasklists', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('認証済みユーザーは新しいタスクリストを作成できる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // 作成されるタスクリストのモックレスポンス
    const mockTaskList = {
      id: 'new-tasklist-123',
      title: 'Shopping List',
      updated: '2023-07-15T10:00:00.000Z',
      selfLink: 'https://www.googleapis.com/tasks/v1/users/@me/lists/new-tasklist-123'
    };
    
    // fetchのモック
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockTaskList)
    });
    
    // APIロジックを直接呼び出し
    const result = await tasklistsApiLogic.createTaskList('Shopping List', 'mock-access-token');
    
    // fetchの呼び出しを検証
    expect(global.fetch).toHaveBeenCalledWith(
      'https://tasks.googleapis.com/tasks/v1/users/@me/lists',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Authorization': 'Bearer mock-access-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: 'Shopping List' })
      })
    );
    
    // レスポンスの検証
    expect(result.status).toBe(201);
    expect(result.taskList).toEqual(mockTaskList);
  });

  test('空のタイトルはバリデーションエラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // APIロジックを直接呼び出し - 空文字
    const result = await tasklistsApiLogic.createTaskList('', 'mock-access-token');
    
    // fetchが呼ばれていないことを検証
    expect(global.fetch).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Title is required');
  });

  test('アクセストークンがない場合は401エラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークンなし）
    mockAuthenticatedUserWithToken('user-123', '');
    
    // APIロジックを直接呼び出し
    const result = await tasklistsApiLogic.createTaskList('Shopping List', '');
    
    // fetchが呼ばれていないことを検証
    expect(global.fetch).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(401);
    expect(result.error).toBe('Missing access token');
  });

  test('GoogleのAPIエラーが適切にハンドリングされる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // fetchのモック - APIエラー
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    });
    
    // APIロジックを直接呼び出し
    const result = await tasklistsApiLogic.createTaskList('Shopping List', 'mock-access-token');
    
    // レスポンスの検証
    expect(result.status).toBe(500);
    expect(result.error).toBe('Failed to create task list: Internal Server Error');
  });

  test('ネットワークエラーが適切にハンドリングされる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // fetchのモック - ネットワークエラー
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    
    // APIロジックを直接呼び出し
    const result = await tasklistsApiLogic.createTaskList('Shopping List', 'mock-access-token');
    
    // レスポンスの検証
    expect(result.status).toBe(500);
    expect(result.error).toBe('Network error');
  });
}); 