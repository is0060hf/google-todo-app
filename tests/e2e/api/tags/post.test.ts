import { NextRequest } from 'next/server';
import { POST } from '@/app/api/tags/route';
import { mockAuthenticatedUser, mockUnauthenticatedUser } from '../../../utils/auth';
import { prisma } from '@/app/lib/prisma';
import { createMockRequest } from '../../../utils/request';

// インポートをモック
jest.mock('next-auth');
jest.mock('@/app/lib/prisma');

describe('POST /api/tags', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('認証済みユーザーは新しいタグを作成できる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // リクエストの作成
    const request = createMockRequest('POST', 'http://localhost:3000/api/tags', {
      name: 'Work'
    });
    
    // Prismaのモックの設定
    (prisma.tag.findFirst as jest.Mock).mockResolvedValue(null); // 同名タグが存在しない
    (prisma.tag.create as jest.Mock).mockResolvedValue({
      id: 'new-tag-id',
      name: 'Work',
      userId: 'user-123'
    });
    
    // APIエンドポイントを呼び出し
    const response = await POST(request);
    const data = await response.json();
    
    // Prismaの呼び出しを検証
    expect(prisma.tag.findFirst).toHaveBeenCalledWith({
      where: {
        name: 'Work',
        userId: 'user-123'
      }
    });
    
    expect(prisma.tag.create).toHaveBeenCalledWith({
      data: {
        name: 'Work',
        userId: 'user-123'
      }
    });
    
    // レスポンスの検証
    expect(response.status).toBe(201);
    expect(data.tag).toEqual({
      id: 'new-tag-id',
      name: 'Work',
      userId: 'user-123'
    });
  });

  test('タグ名が空の場合はエラーが返される', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // リクエストの作成
    const request = createMockRequest('POST', 'http://localhost:3000/api/tags', {
      name: ''
    });
    
    // APIエンドポイントを呼び出し
    const response = await POST(request);
    const data = await response.json();
    
    // レスポンスの検証
    expect(response.status).toBe(400);
    expect(data.error).toBe('Tag name is required');
    
    // Prismaは呼ばれていないことを確認
    expect(prisma.tag.create).not.toHaveBeenCalled();
  });

  test('タグ名がない場合はエラーが返される', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // リクエストの作成
    const request = createMockRequest('POST', 'http://localhost:3000/api/tags', {});
    
    // APIエンドポイントを呼び出し
    const response = await POST(request);
    const data = await response.json();
    
    // レスポンスの検証
    expect(response.status).toBe(400);
    expect(data.error).toBe('Tag name is required');
  });

  test('同じ名前のタグが既に存在する場合はエラーが返される', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // リクエストの作成
    const request = createMockRequest('POST', 'http://localhost:3000/api/tags', {
      name: 'Work'
    });
    
    // Prismaのモックの設定
    (prisma.tag.findFirst as jest.Mock).mockResolvedValue({
      id: 'existing-tag-id',
      name: 'Work',
      userId: 'user-123'
    });
    
    // APIエンドポイントを呼び出し
    const response = await POST(request);
    const data = await response.json();
    
    // レスポンスの検証
    expect(response.status).toBe(409);
    expect(data.error).toBe('Tag with this name already exists');
    
    // タグの作成が呼ばれていないことを確認
    expect(prisma.tag.create).not.toHaveBeenCalled();
  });

  test('未認証ユーザーはエラーが返される', async () => {
    // 未認証ユーザーをモック
    mockUnauthenticatedUser();
    
    // リクエストの作成
    const request = createMockRequest('POST', 'http://localhost:3000/api/tags', {
      name: 'Work'
    });
    
    // APIエンドポイントを呼び出し
    const response = await POST(request);
    const data = await response.json();
    
    // レスポンスの検証
    expect(response.status).toBe(401);
    expect(data.error).toBe('Unauthorized');
  });

  test('データベースエラーが適切にハンドリングされる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // リクエストの作成
    const request = createMockRequest('POST', 'http://localhost:3000/api/tags', {
      name: 'Work'
    });
    
    // Prismaのモックの設定
    (prisma.tag.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.tag.create as jest.Mock).mockRejectedValue(new Error('Database error'));
    
    // APIエンドポイントを呼び出し
    const response = await POST(request);
    const data = await response.json();
    
    // レスポンスの検証
    expect(response.status).toBe(500);
    expect(data.error).toBe('Database error');
  });
}); 