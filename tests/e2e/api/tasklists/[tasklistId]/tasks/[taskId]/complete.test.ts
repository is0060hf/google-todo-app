import { mockAuthenticatedUserWithToken } from '../../../../../../utils/auth';
import { tasksApiLogic } from '../../../../../../utils/api-test-utils';

// メソッドモック
global.fetch = jest.fn();

describe('POST /api/tasklists/[tasklistId]/tasks/[taskId]/complete', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('認証済みユーザーはタスクを完了状態に変更できる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // 完了日時を固定
    const completedDate = new Date().toISOString();
    
    // 更新されるタスクのモックレスポンス
    const mockTask = {
      id: 'task-123',
      title: 'Buy groceries',
      status: 'completed',
      completed: completedDate,
      updated: completedDate,
      selfLink: 'https://www.googleapis.com/tasks/v1/lists/tasklist-123/tasks/task-123'
    };
    
    // fetchのモック
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockTask)
    });
    
    // 完了状態に変更するデータ
    const updateData = {
      status: 'completed' as const,
      completed: completedDate
    };
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.updateTask('tasklist-123', 'task-123', updateData, 'mock-access-token');
    
    // fetchの呼び出しを検証
    expect(global.fetch).toHaveBeenCalledWith(
      'https://tasks.googleapis.com/tasks/v1/lists/tasklist-123/tasks/task-123',
      expect.objectContaining({
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer mock-access-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })
    );
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.task).toEqual(mockTask);
    expect(result.task.status).toBe('completed');
    expect(result.task.completed).toBe(completedDate);
  });

  test('認証済みユーザーはタスクを未完了状態に変更できる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // 更新されるタスクのモックレスポンス
    const mockTask = {
      id: 'task-123',
      title: 'Buy groceries',
      status: 'needsAction',
      completed: null,
      updated: new Date().toISOString(),
      selfLink: 'https://www.googleapis.com/tasks/v1/lists/tasklist-123/tasks/task-123'
    };
    
    // fetchのモック
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockTask)
    });
    
    // 未完了状態に変更するデータ
    const updateData = {
      status: 'needsAction' as const,
      completed: null
    };
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.updateTask('tasklist-123', 'task-123', updateData, 'mock-access-token');
    
    // fetchの呼び出しを検証
    expect(global.fetch).toHaveBeenCalledWith(
      'https://tasks.googleapis.com/tasks/v1/lists/tasklist-123/tasks/task-123',
      expect.objectContaining({
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer mock-access-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })
    );
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.task).toEqual(mockTask);
    expect(result.task.status).toBe('needsAction');
    expect(result.task.completed).toBe(null);
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
    
    // 完了状態に変更するデータ
    const updateData = {
      status: 'completed' as const,
      completed: new Date().toISOString()
    };
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.updateTask('tasklist-123', 'non-existent-id', updateData, 'mock-access-token');
    
    // レスポンスの検証
    expect(result.status).toBe(404);
    expect(result.error).toBe('Task not found');
  });

  test('タスクリストIDが指定されていない場合は400エラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // 完了状態に変更するデータ
    const updateData = {
      status: 'completed' as const,
      completed: new Date().toISOString()
    };
    
    // APIロジックを直接呼び出し - 空のタスクリストID
    const result = await tasksApiLogic.updateTask('', 'task-123', updateData, 'mock-access-token');
    
    // fetchが呼ばれていないことを検証
    expect(global.fetch).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Task list ID is required');
  });

  test('タスクIDが指定されていない場合は400エラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // 完了状態に変更するデータ
    const updateData = {
      status: 'completed' as const,
      completed: new Date().toISOString()
    };
    
    // APIロジックを直接呼び出し - 空のタスクID
    const result = await tasksApiLogic.updateTask('tasklist-123', '', updateData, 'mock-access-token');
    
    // fetchが呼ばれていないことを検証
    expect(global.fetch).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Task ID is required');
  });

  test('アクセストークンがない場合は401エラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークンなし）
    mockAuthenticatedUserWithToken('user-123', '');
    
    // 完了状態に変更するデータ
    const updateData = {
      status: 'completed' as const,
      completed: new Date().toISOString()
    };
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.updateTask('tasklist-123', 'task-123', updateData, '');
    
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
    
    // 完了状態に変更するデータ
    const updateData = {
      status: 'completed' as const,
      completed: new Date().toISOString()
    };
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.updateTask('tasklist-123', 'task-123', updateData, 'mock-access-token');
    
    // レスポンスの検証
    expect(result.status).toBe(500);
    expect(result.error).toBe('Network error');
  });
}); 