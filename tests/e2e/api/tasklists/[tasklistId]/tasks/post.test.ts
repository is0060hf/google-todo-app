import { mockAuthenticatedUserWithToken } from '../../../../../utils/auth';
import { tasksApiLogic } from '../../../../../utils/api-test-utils';

// メソッドモック
global.fetch = jest.fn();

describe('POST /api/tasklists/[tasklistId]/tasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('認証済みユーザーは新しいタスクを作成できる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // 作成されるタスクのモックレスポンス
    const mockTask = {
      id: 'new-task-123',
      title: 'Buy groceries',
      status: 'needsAction',
      notes: 'Milk, eggs, bread',
      due: '2023-07-20T10:00:00.000Z',
      updated: '2023-07-15T10:00:00.000Z',
      selfLink: 'https://www.googleapis.com/tasks/v1/lists/tasklist-123/tasks/new-task-123'
    };
    
    // fetchのモック
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockTask)
    });
    
    // タスクデータ
    const taskData = {
      title: 'Buy groceries',
      notes: 'Milk, eggs, bread',
      due: '2023-07-20T10:00:00.000Z'
    };
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.createTask('tasklist-123', taskData, 'mock-access-token');
    
    // fetchの呼び出しを検証
    expect(global.fetch).toHaveBeenCalledWith(
      'https://tasks.googleapis.com/tasks/v1/lists/tasklist-123/tasks',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Authorization': 'Bearer mock-access-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      })
    );
    
    // レスポンスの検証
    expect(result.status).toBe(201);
    expect(result.task).toEqual(mockTask);
  });

  test('タイトルのみのタスクを作成できる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // 作成されるタスクのモックレスポンス
    const mockTask = {
      id: 'new-task-123',
      title: 'Simple task',
      status: 'needsAction',
      updated: '2023-07-15T10:00:00.000Z',
      selfLink: 'https://www.googleapis.com/tasks/v1/lists/tasklist-123/tasks/new-task-123'
    };
    
    // fetchのモック
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockTask)
    });
    
    // タスクデータ（タイトルのみ）
    const taskData = {
      title: 'Simple task'
    };
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.createTask('tasklist-123', taskData, 'mock-access-token');
    
    // レスポンスの検証
    expect(result.status).toBe(201);
    expect(result.task).toEqual(mockTask);
  });

  test('存在しないタスクリストIDの場合は404エラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // fetchのモック - 404エラー
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.createTask('non-existent-id', { title: 'Test Task' }, 'mock-access-token');
    
    // レスポンスの検証
    expect(result.status).toBe(404);
    expect(result.error).toBe('Task list not found');
  });

  test('タスクリストIDが指定されていない場合は400エラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // APIロジックを直接呼び出し - 空のID
    const result = await tasksApiLogic.createTask('', { title: 'Test Task' }, 'mock-access-token');
    
    // fetchが呼ばれていないことを検証
    expect(global.fetch).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Task list ID is required');
  });

  test('タイトルが空の場合は400エラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // APIロジックを直接呼び出し - 空のタイトル
    const result = await tasksApiLogic.createTask('tasklist-123', { title: '' }, 'mock-access-token');
    
    // fetchが呼ばれていないことを検証
    expect(global.fetch).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Task title is required');
  });

  test('アクセストークンがない場合は401エラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークンなし）
    mockAuthenticatedUserWithToken('user-123', '');
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.createTask('tasklist-123', { title: 'Test Task' }, '');
    
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
    const result = await tasksApiLogic.createTask('tasklist-123', { title: 'Test Task' }, 'mock-access-token');
    
    // レスポンスの検証
    expect(result.status).toBe(500);
    expect(result.error).toBe('Network error');
  });
}); 