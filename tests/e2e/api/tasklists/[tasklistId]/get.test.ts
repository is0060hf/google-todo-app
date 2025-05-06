import { GET } from '@/app/api/tasklists/[tasklistId]/route';
import { mockAuthenticatedUser, mockUnauthenticatedUser, mockMissingAccessToken } from '../../../../utils/auth';
import { mockGoogleTasksApi, mockTaskLists } from '../../../../mocks/googleTasksApi';
import { createParams } from '../../../../utils/request';

// インポートをモック
jest.mock('next-auth');
jest.mock('@/app/lib/prisma');

describe('GET /api/tasklists/[tasklistId]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGoogleTasksApi();
  });

  test('認証済みユーザーは特定のタスクリストを取得できる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser();
    
    // パラメータの作成
    const params = createParams({ tasklistId: 'tasklistid1' });
    
    // APIエンドポイントを呼び出し
    const response = await GET({} as Request, params);
    const data = await response.json();
    
    // レスポンスの検証
    expect(response.status).toBe(200);
    expect(data.taskList).toEqual(mockTaskLists[0]);
    expect(data.taskList.id).toBe('tasklistid1');
    expect(data.taskList.title).toBe('Test Task List 1');
  });

  test('存在しないタスクリストIDの場合はエラーが返される', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser();
    
    // パラメータの作成
    const params = createParams({ tasklistId: 'non-existent-id' });
    
    // Google Tasks APIがエラーを投げるようにモック
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      throw new Error('Task list not found');
    });
    
    // APIエンドポイントを呼び出し
    const response = await GET({} as Request, params);
    const data = await response.json();
    
    // レスポンスの検証
    expect(response.status).toBe(500);
    expect(data.error).toBe('Task list not found');
  });

  test('タスクリストIDがない場合はエラーが返される', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser();
    
    // パラメータの作成（空のタスクリストID）
    const params = createParams({ tasklistId: '' });
    
    // APIエンドポイントを呼び出し
    const response = await GET({} as Request, params);
    const data = await response.json();
    
    // レスポンスの検証
    expect(response.status).toBe(400);
    expect(data.error).toBe('Task list ID is required');
  });

  test('未認証ユーザーはエラーが返される', async () => {
    // 未認証ユーザーをモック
    mockUnauthenticatedUser();
    
    // パラメータの作成
    const params = createParams({ tasklistId: 'tasklistid1' });
    
    // APIエンドポイントを呼び出し
    const response = await GET({} as Request, params);
    const data = await response.json();
    
    // レスポンスの検証
    expect(response.status).toBe(401);
    expect(data.error).toBe('Unauthorized');
  });

  test('アクセストークンがない場合はエラーが返される', async () => {
    // アクセストークンがないユーザーをモック
    mockMissingAccessToken();
    
    // パラメータの作成
    const params = createParams({ tasklistId: 'tasklistid1' });
    
    // APIエンドポイントを呼び出し
    const response = await GET({} as Request, params);
    const data = await response.json();
    
    // レスポンスの検証
    expect(response.status).toBe(401);
    expect(data.error).toBe('Missing access token. Please sign in again.');
  });
}); 