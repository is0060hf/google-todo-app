import { mockAuthenticatedUser } from '../../../utils/auth';
import { prisma } from '@/app/lib/prisma';
import { tagsApiLogic } from '../../../utils/api-test-utils';

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
    
    // Prismaのモックの設定
    const mockTag = { 
      id: 'tag-new', 
      name: 'Shopping', 
      userId: 'user-123',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // 既存タグがないことをモック
    (prisma.tag.findFirst as jest.Mock).mockResolvedValue(null);
    // タグ作成をモック
    (prisma.tag.create as jest.Mock).mockResolvedValue(mockTag);
    
    // APIロジックを直接呼び出し
    const result = await tagsApiLogic.createTag('user-123', 'Shopping');
    
    // Prismaの呼び出しを検証
    expect(prisma.tag.findFirst).toHaveBeenCalledWith({
      where: { 
        userId: 'user-123',
        name: { equals: 'Shopping', mode: 'insensitive' }
      }
    });
    
    expect(prisma.tag.create).toHaveBeenCalledWith({
      data: {
        name: 'Shopping',
        userId: 'user-123'
      }
    });
    
    // レスポンスの検証
    expect(result.status).toBe(201);
    expect(result.tag).toEqual(mockTag);
  });

  test('空のタグ名はバリデーションエラーになる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // APIロジックを直接呼び出し - 空文字
    const result = await tagsApiLogic.createTag('user-123', '');
    
    // Prismaが呼ばれていないことを検証
    expect(prisma.tag.findFirst).not.toHaveBeenCalled();
    expect(prisma.tag.create).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Tag name is required');
  });

  test('同じ名前のタグが既に存在する場合は409エラーになる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // 既存タグが存在することをモック
    const existingTag = { 
      id: 'tag-existing', 
      name: 'Work', 
      userId: 'user-123',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    (prisma.tag.findFirst as jest.Mock).mockResolvedValue(existingTag);
    
    // APIロジックを直接呼び出し
    const result = await tagsApiLogic.createTag('user-123', 'Work');
    
    // Prismaの呼び出しを検証
    expect(prisma.tag.findFirst).toHaveBeenCalledWith({
      where: { 
        userId: 'user-123',
        name: { equals: 'Work', mode: 'insensitive' }
      }
    });
    
    // タグ作成が呼ばれていないことを検証
    expect(prisma.tag.create).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(409);
    expect(result.error).toBe('Tag with this name already exists');
  });

  test('データベースエラーが適切にハンドリングされる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // 既存タグがないことをモック
    (prisma.tag.findFirst as jest.Mock).mockResolvedValue(null);
    // データベースエラーをモック
    (prisma.tag.create as jest.Mock).mockRejectedValue(new Error('Database error'));
    
    // APIロジックを直接呼び出し
    const result = await tagsApiLogic.createTag('user-123', 'Travel');
    
    // レスポンスの検証
    expect(result.status).toBe(500);
    expect(result.error).toBe('Database error');
  });
}); 