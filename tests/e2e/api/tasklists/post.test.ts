import { NextRequest } from 'next/server';
import { POST } from '@/app/api/tasklists/route';
import { mockAuthenticatedUser, mockUnauthenticatedUser, mockMissingAccessToken } from '../../../utils/auth';
import { mockGoogleTasksApi } from '../../../mocks/googleTasksApi';
import { createMockRequest } from '../../../utils/request';

// インポートをモック
jest.mock('next-auth');
jest.mock('@/app/lib/prisma');

describe('POST /api/tasklists', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGoogleTasksApi();
  });

  test('認証済みユーザーは新しいタスクリストを作成できる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser();
    
    // リクエストの作成
    const request = createMockRequest('POST', 'http://localhost:3000/api/tasklists', {
      title: 'New Task List'
    });
    
    // APIエンドポイントを呼び出し
    const response = await POST(request);
    const data = await response.json();
    
    // レスポンスの検証
    expect(response.status).toBe(201);
    expect(data.taskList.title).toBe('New Task List');
    expect(data.taskList.id).toBeDefined();
  });

  test('タイトルが空の場合はエラーが返される', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser();
    
    // リクエストの作成
    const request = createMockRequest('POST', 'http://localhost:3000/api/tasklists', {
      title: ''
    });
    
    // APIエンドポイントを呼び出し
    const response = await POST(request);
    const data = await response.json();
    
    // レスポンスの検証
    expect(response.status).toBe(400);
    expect(data.error).toBe('Title is required');
  });

  test('タイトルがない場合はエラーが返される', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser();
    
    // リクエストの作成
    const request = createMockRequest('POST', 'http://localhost:3000/api/tasklists', {});
    
    // APIエンドポイントを呼び出し
    const response = await POST(request);
    const data = await response.json();
    
    // レスポンスの検証
    expect(response.status).toBe(400);
    expect(data.error).toBe('Title is required');
  });

  test('未認証ユーザーはエラーが返される', async () => {
    // 未認証ユーザーをモック
    mockUnauthenticatedUser();
    
    // リクエストの作成
    const request = createMockRequest('POST', 'http://localhost:3000/api/tasklists', {
      title: 'New Task List'
    });
    
    // APIエンドポイントを呼び出し
    const response = await POST(request);
    const data = await response.json();
    
    // レスポンスの検証
    expect(response.status).toBe(401);
    expect(data.error).toBe('Unauthorized');
  });

  test('アクセストークンがない場合はエラーが返される', async () => {
    // アクセストークンがないユーザーをモック
    mockMissingAccessToken();
    
    // リクエストの作成
    const request = createMockRequest('POST', 'http://localhost:3000/api/tasklists', {
      title: 'New Task List'
    });
    
    // APIエンドポイントを呼び出し
    const response = await POST(request);
    const data = await response.json();
    
    // レスポンスの検証
    expect(response.status).toBe(401);
    expect(data.error).toBe('Missing access token. Please sign in again.');
  });

  test('Google Tasks APIがエラーを返す場合は適切にハンドリングされる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser();
    
    // リクエストの作成
    const request = createMockRequest('POST', 'http://localhost:3000/api/tasklists', {
      title: 'New Task List'
    });
    
    // Google Tasks APIがエラーを投げるようにモック
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      throw new Error('API error');
    });
    
    // APIエンドポイントを呼び出し
    const response = await POST(request);
    const data = await response.json();
    
    // レスポンスの検証
    expect(response.status).toBe(500);
    expect(data.error).toBe('API error');
  });
}); 