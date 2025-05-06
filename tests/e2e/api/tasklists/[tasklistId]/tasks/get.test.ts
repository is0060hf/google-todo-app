import { mockAuthenticatedUserWithToken } from '../../../../../utils/auth';
import { tasksApiLogic } from '../../../../../utils/api-test-utils';

// メソッドモック
global.fetch = jest.fn();

describe('GET /api/tasklists/[tasklistId]/tasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('認証済みユーザーはタスク一覧を取得できる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // モックタスクデータ
    const mockTasks = [
      {
        id: 'task-1',
        title: 'Task 1',
        status: 'needsAction',
        updated: '2023-07-15T10:00:00.000Z',
        selfLink: 'https://www.googleapis.com/tasks/v1/lists/tasklist-123/tasks/task-1'
      },
      {
        id: 'task-2',
        title: 'Task 2',
        status: 'completed',
        completed: '2023-07-14T10:00:00.000Z',
        updated: '2023-07-14T10:00:00.000Z',
        selfLink: 'https://www.googleapis.com/tasks/v1/lists/tasklist-123/tasks/task-2'
      }
    ];
    
    // fetchのモック
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ items: mockTasks })
    });
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.getTasks('tasklist-123', 'mock-access-token');
    
    // fetchの呼び出しを検証
    expect(global.fetch).toHaveBeenCalledWith(
      'https://tasks.googleapis.com/tasks/v1/lists/tasklist-123/tasks',
      expect.objectContaining({
        headers: {
          'Authorization': 'Bearer mock-access-token',
          'Content-Type': 'application/json'
        }
      })
    );
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.tasks).toEqual(mockTasks);
    expect(result.tasks.length).toBe(2);
  });

  test('パラメータで完了済みタスクを除外できる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // モックタスクデータ（完了済みは含まない）
    const mockTasks = [
      {
        id: 'task-1',
        title: 'Task 1',
        status: 'needsAction',
        updated: '2023-07-15T10:00:00.000Z',
        selfLink: 'https://www.googleapis.com/tasks/v1/lists/tasklist-123/tasks/task-1'
      }
    ];
    
    // fetchのモック
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ items: mockTasks })
    });
    
    // APIロジックを直接呼び出し - showCompletedをfalseに設定
    const result = await tasksApiLogic.getTasks('tasklist-123', 'mock-access-token', false);
    
    // fetchの呼び出しを検証 - showCompleted=falseパラメータあり
    expect(global.fetch).toHaveBeenCalledWith(
      'https://tasks.googleapis.com/tasks/v1/lists/tasklist-123/tasks?showCompleted=false',
      expect.objectContaining({
        headers: {
          'Authorization': 'Bearer mock-access-token',
          'Content-Type': 'application/json'
        }
      })
    );
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.tasks).toEqual(mockTasks);
    expect(result.tasks.length).toBe(1);
  });

  test('タスクが存在しない場合は空配列が返される', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // fetchのモック
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ items: [] })
    });
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.getTasks('tasklist-123', 'mock-access-token');
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.tasks).toEqual([]);
    expect(result.tasks.length).toBe(0);
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
    const result = await tasksApiLogic.getTasks('non-existent-id', 'mock-access-token');
    
    // レスポンスの検証
    expect(result.status).toBe(404);
    expect(result.error).toBe('Task list not found');
  });

  test('タスクリストIDが指定されていない場合は400エラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークン付き）
    mockAuthenticatedUserWithToken('user-123', 'mock-access-token');
    
    // APIロジックを直接呼び出し - 空のID
    const result = await tasksApiLogic.getTasks('', 'mock-access-token');
    
    // fetchが呼ばれていないことを検証
    expect(global.fetch).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Task list ID is required');
  });

  test('アクセストークンがない場合は401エラーになる', async () => {
    // 認証済みユーザーをモック（アクセストークンなし）
    mockAuthenticatedUserWithToken('user-123', '');
    
    // APIロジックを直接呼び出し
    const result = await tasksApiLogic.getTasks('tasklist-123', '');
    
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
    const result = await tasksApiLogic.getTasks('tasklist-123', 'mock-access-token');
    
    // レスポンスの検証
    expect(result.status).toBe(500);
    expect(result.error).toBe('Network error');
  });
}); 