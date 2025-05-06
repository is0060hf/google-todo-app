import { mockAuthenticatedUserWithToken } from '../../../../../../utils/auth';
import { tasksApiLogic } from '../../../../../../utils/api-test-utils';

// メソッドモック
global.fetch = jest.fn();

describe('PATCH /api/tasklists/[tasklistId]/tasks/[taskId]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('認証済みユーザーはタスクを更新できる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // 更新されるタスクのモックレスポンス
    const mockTask = {
      id: 'task-123',
      title: 'Updated Task Title',
      status: 'needsAction',
      notes: 'Updated notes for the task',
      due: '2023-07-25T10:00:00.000Z',
      updated: '2023-07-16T10:00:00.000Z',
      selfLink: 'https://www.googleapis.com/tasks/v1/lists/tasklist-123/tasks/task-123'
    };
    
    // 更新データ
    const updateData = {
      title: 'Updated Task Title',
      notes: 'Updated notes for the task',
      due: '2023-07-25T10:00:00.000Z'
    };
    
    // fetchのモック
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockTask)
    });
    
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
  });

  test('タスクステータスを完了に更新できる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // 更新の日時を固定
    const completedDate = '2023-07-16T10:00:00.000Z';
    
    // 更新されるタスクのモックレスポンス
    const mockTask = {
      id: 'task-123',
      title: 'Task Title',
      status: 'completed',
      completed: completedDate,
      updated: completedDate,
      selfLink: 'https://www.googleapis.com/tasks/v1/lists/tasklist-123/tasks/task-123'
    };
    
    // 更新データ - 完了状態に変更
    const updateData = {
      status: 'completed' as const,
      completed: completedDate
    };
    
    // fetchのモック
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockTask)
    });
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.updateTask('tasklist-123', 'task-123', updateData, 'mock-access-token');
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.task).toEqual(mockTask);
    expect(result.task.status).toBe('completed');
    expect(result.task.completed).toBe(completedDate);
  });

  test('タスクステータスを未完了に戻せる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // 更新されるタスクのモックレスポンス
    const mockTask = {
      id: 'task-123',
      title: 'Task Title',
      status: 'needsAction',
      completed: null,
      updated: '2023-07-16T10:00:00.000Z',
      selfLink: 'https://www.googleapis.com/tasks/v1/lists/tasklist-123/tasks/task-123'
    };
    
    // 更新データ - 未完了状態に戻す
    const updateData = {
      status: 'needsAction' as const,
      completed: null
    };
    
    // fetchのモック
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockTask)
    });
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.updateTask('tasklist-123', 'task-123', updateData, 'mock-access-token');
    
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
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.updateTask('tasklist-123', 'non-existent-id', { title: 'Updated Title' }, 'mock-access-token');
    
    // レスポンスの検証
    expect(result.status).toBe(404);
    expect(result.error).toBe('Task not found');
  });

  test('タスクリストIDが指定されていない場合は400エラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // APIロジックを直接呼び出し - 空のタスクリストID
    const result = await tasksApiLogic.updateTask('', 'task-123', { title: 'Updated Title' }, 'mock-access-token');
    
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
    const result = await tasksApiLogic.updateTask('tasklist-123', '', { title: 'Updated Title' }, 'mock-access-token');
    
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
    const result = await tasksApiLogic.updateTask('tasklist-123', 'task-123', { title: 'Updated Title' }, '');
    
    // fetchが呼ばれていないことを検証
    expect(global.fetch).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(401);
    expect(result.error).toBe('Missing access token');
  });

  test('空のタイトルでの更新は400エラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // APIロジックを直接呼び出し - 空のタイトル
    const result = await tasksApiLogic.updateTask('tasklist-123', 'task-123', { title: '' }, 'mock-access-token');
    
    // fetchが呼ばれていないことを検証
    expect(global.fetch).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Task title cannot be empty');
  });

  test('ネットワークエラーが適切にハンドリングされる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // fetchのモック - ネットワークエラー
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.updateTask('tasklist-123', 'task-123', { title: 'Updated Title' }, 'mock-access-token');
    
    // レスポンスの検証
    expect(result.status).toBe(500);
    expect(result.error).toBe('Network error');
  });
}); 