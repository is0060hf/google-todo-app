import { mockAuthenticatedUserWithToken } from '../../../../../../utils/auth';
import { tasksApiLogic } from '../../../../../../utils/api-test-utils';

// メソッドモック
global.fetch = jest.fn();

describe('GET /api/tasklists/[tasklistId]/tasks/[taskId]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('認証済みユーザーはタスク詳細を取得できる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // モックタスクデータ
    const mockTask = {
      id: 'task-123',
      title: 'Buy groceries',
      status: 'needsAction',
      notes: 'Milk, eggs, bread',
      due: '2023-07-20T10:00:00.000Z',
      updated: '2023-07-15T10:00:00.000Z',
      selfLink: 'https://www.googleapis.com/tasks/v1/lists/tasklist-123/tasks/task-123'
    };
    
    // fetchのモック
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockTask)
    });
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.getTask('tasklist-123', 'task-123', 'mock-access-token');
    
    // fetchの呼び出しを検証
    expect(global.fetch).toHaveBeenCalledWith(
      'https://tasks.googleapis.com/tasks/v1/lists/tasklist-123/tasks/task-123',
      expect.objectContaining({
        headers: {
          'Authorization': 'Bearer mock-access-token',
          'Content-Type': 'application/json'
        }
      })
    );
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.task).toEqual(mockTask);
  });

  test('存在しないタスクIDの場合は404エラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // fetchのモック - 404エラー
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.getTask('tasklist-123', 'non-existent-id', 'mock-access-token');
    
    // レスポンスの検証
    expect(result.status).toBe(404);
    expect(result.error).toBe('Task not found');
  });

  test('タスクリストIDが指定されていない場合は400エラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // APIロジックを直接呼び出し - 空のタスクリストID
    const result = await tasksApiLogic.getTask('', 'task-123', 'mock-access-token');
    
    // fetchが呼ばれていないことを検証
    expect(global.fetch).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Task list ID is required');
  });

  test('タスクIDが指定されていない場合は400エラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // APIロジックを直接呼び出し - 空のタスクID
    const result = await tasksApiLogic.getTask('tasklist-123', '', 'mock-access-token');
    
    // fetchが呼ばれていないことを検証
    expect(global.fetch).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Task ID is required');
  });

  test('アクセストークンがない場合は401エラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークンなし）
    mockAuthenticatedUserWithToken('user-123', '');
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.getTask('tasklist-123', 'task-123', '');
    
    // fetchが呼ばれていないことを検証
    expect(global.fetch).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(401);
    expect(result.error).toBe('Missing access token');
  });

  test('ネットワークエラーが適切にハンドリングされる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // fetchのモック - ネットワークエラー
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.getTask('tasklist-123', 'task-123', 'mock-access-token');
    
    // レスポンスの検証
    expect(result.status).toBe(500);
    expect(result.error).toBe('Network error');
  });
}); 