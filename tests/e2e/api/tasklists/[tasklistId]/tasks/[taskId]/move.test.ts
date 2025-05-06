import { mockAuthenticatedUserWithToken } from '../../../../../../utils/auth';
import { tasksApiLogic } from '../../../../../../utils/api-test-utils';

// メソッドモック
global.fetch = jest.fn();

describe('POST /api/tasklists/[tasklistId]/tasks/[taskId]/move', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('認証済みユーザーはタスクを他のタスクの後に移動できる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // 移動後のタスクのモックレスポンス
    const mockTask = {
      id: 'task-123',
      title: 'Buy groceries',
      status: 'needsAction',
      position: '00000000000002',
      updated: new Date().toISOString(),
      selfLink: 'https://www.googleapis.com/tasks/v1/lists/tasklist-123/tasks/task-123'
    };
    
    // fetchのモック
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockTask)
    });
    
    // 移動パラメータ - 別のタスクの後に配置
    const moveParams = {
      previous: 'previous-task-123'
    };
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.moveTask('tasklist-123', 'task-123', moveParams, 'mock-access-token');
    
    // fetchの呼び出しを検証
    expect(global.fetch).toHaveBeenCalledWith(
      'https://tasks.googleapis.com/tasks/v1/lists/tasklist-123/tasks/task-123/move?previous=previous-task-123',
      expect.objectContaining({
        method: 'POST',
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

  test('認証済みユーザーはタスクをサブタスクに移動できる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // 移動後のタスクのモックレスポンス
    const mockTask = {
      id: 'task-123',
      title: 'Buy groceries',
      status: 'needsAction',
      position: '00000000000002',
      parent: 'parent-task-123',
      updated: new Date().toISOString(),
      selfLink: 'https://www.googleapis.com/tasks/v1/lists/tasklist-123/tasks/task-123'
    };
    
    // fetchのモック
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockTask)
    });
    
    // 移動パラメータ - 親タスクの子タスクとして配置
    const moveParams = {
      parent: 'parent-task-123'
    };
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.moveTask('tasklist-123', 'task-123', moveParams, 'mock-access-token');
    
    // fetchの呼び出しを検証
    expect(global.fetch).toHaveBeenCalledWith(
      'https://tasks.googleapis.com/tasks/v1/lists/tasklist-123/tasks/task-123/move?parent=parent-task-123',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Authorization': 'Bearer mock-access-token',
          'Content-Type': 'application/json'
        }
      })
    );
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.task).toEqual(mockTask);
    expect(result.task.parent).toBe('parent-task-123');
  });

  test('両方のパラメータを指定してタスクを移動できる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // 移動後のタスクのモックレスポンス
    const mockTask = {
      id: 'task-123',
      title: 'Buy groceries',
      status: 'needsAction',
      position: '00000000000003',
      parent: 'parent-task-123',
      updated: new Date().toISOString(),
      selfLink: 'https://www.googleapis.com/tasks/v1/lists/tasklist-123/tasks/task-123'
    };
    
    // fetchのモック
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockTask)
    });
    
    // 移動パラメータ - 親タスクの子タスクとして、かつ特定のタスクの後に配置
    const moveParams = {
      parent: 'parent-task-123',
      previous: 'previous-task-456'
    };
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.moveTask('tasklist-123', 'task-123', moveParams, 'mock-access-token');
    
    // fetchの呼び出しを検証 - パラメータの順序は関係ない
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/https:\/\/tasks.googleapis.com\/tasks\/v1\/lists\/tasklist-123\/tasks\/task-123\/move\?(parent=parent-task-123&previous=previous-task-456|previous=previous-task-456&parent=parent-task-123)/),
      expect.objectContaining({
        method: 'POST',
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
    
    // 移動パラメータ
    const moveParams = {
      previous: 'previous-task-123'
    };
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.moveTask('tasklist-123', 'non-existent-id', moveParams, 'mock-access-token');
    
    // レスポンスの検証
    expect(result.status).toBe(404);
    expect(result.error).toBe('Task not found');
  });

  test('タスクリストIDが指定されていない場合は400エラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // 移動パラメータ
    const moveParams = {
      previous: 'previous-task-123'
    };
    
    // APIロジックを直接呼び出し - 空のタスクリストID
    const result = await tasksApiLogic.moveTask('', 'task-123', moveParams, 'mock-access-token');
    
    // fetchが呼ばれていないことを検証
    expect(global.fetch).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Task list ID is required');
  });

  test('タスクIDが指定されていない場合は400エラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // 移動パラメータ
    const moveParams = {
      previous: 'previous-task-123'
    };
    
    // APIロジックを直接呼び出し - 空のタスクID
    const result = await tasksApiLogic.moveTask('tasklist-123', '', moveParams, 'mock-access-token');
    
    // fetchが呼ばれていないことを検証
    expect(global.fetch).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Task ID is required');
  });

  test('アクセストークンがない場合は401エラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークンなし）
    mockAuthenticatedUserWithToken('user-123', '');
    
    // 移動パラメータ
    const moveParams = {
      previous: 'previous-task-123'
    };
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.moveTask('tasklist-123', 'task-123', moveParams, '');
    
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
    
    // 移動パラメータ
    const moveParams = {
      previous: 'previous-task-123'
    };
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.moveTask('tasklist-123', 'task-123', moveParams, 'mock-access-token');
    
    // レスポンスの検証
    expect(result.status).toBe(500);
    expect(result.error).toBe('Network error');
  });
}); 