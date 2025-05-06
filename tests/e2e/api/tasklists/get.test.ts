import { getServerSession } from 'next-auth';
import { mockAuthenticatedUser, mockUnauthenticatedUser, mockMissingAccessToken } from '../../../utils/auth';
import { mockGoogleTasksApi, mockTaskLists } from '../../../mocks/googleTasksApi';
import { tasklistsApiLogic } from '../../../utils/api-test-utils';

// インポートをモック
jest.mock('next-auth');

describe('GET /api/tasklists', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGoogleTasksApi();
  });

  test('認証済みユーザーはタスクリスト一覧を取得できる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser();
    
    // APIロジックを直接呼び出し
    const result = await tasklistsApiLogic.getTaskLists('mock-access-token');
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.taskLists).toEqual(mockTaskLists);
  });

  test('Google Tasks APIがエラーを返す場合は適切にハンドリングされる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser();
    
    // Google Tasks APIがエラーを投げるようにモック
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      throw new Error('API error');
    });
    
    // APIロジックを直接呼び出し
    const result = await tasklistsApiLogic.getTaskLists('mock-access-token');
    
    // レスポンスの検証
    expect(result.status).toBe(500);
    expect(result.error).toBe('API error');
  });
}); 