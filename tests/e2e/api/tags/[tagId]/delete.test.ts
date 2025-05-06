import { mockAuthenticatedUser } from '../../../../utils/auth';
import { prisma } from '@/app/lib/prisma';
import { tagsApiLogic } from '../../../../utils/api-test-utils';

// Prismaのモック
jest.mock('@/app/lib/prisma', () => ({
  prisma: {
    tag: {
      findFirst: jest.fn(),
      delete: jest.fn()
    }
  }
}));

describe('DELETE /api/tags/[tagId]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('認証済みユーザーは自分のタグを削除できる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // 既存タグのモックデータ
    const existingTag = {
      id: 'tag-123',
      name: 'Work',
      userId: 'user-123',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // PrismaのfindFirstをモック（既存タグの確認）
    (prisma.tag.findFirst as jest.Mock).mockResolvedValueOnce(existingTag);
    
    // Prismaのdeleteをモック
    (prisma.tag.delete as jest.Mock).mockResolvedValueOnce(existingTag);
    
    // APIロジックを直接呼び出し
    const result = await tagsApiLogic.deleteTag('user-123', 'tag-123');
    
    // Prismaの呼び出しを検証
    expect(prisma.tag.findFirst).toHaveBeenCalledWith({
      where: {
        id: 'tag-123',
        userId: 'user-123'
      }
    });
    
    expect(prisma.tag.delete).toHaveBeenCalledWith({
      where: { id: 'tag-123' }
    });
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.success).toBe(true);
  });

  test('存在しないタグIDの場合は404エラーになる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // PrismaのfindFirstをモック - タグが見つからない場合
    (prisma.tag.findFirst as jest.Mock).mockResolvedValueOnce(null);
    
    // APIロジックを直接呼び出し
    const result = await tagsApiLogic.deleteTag('user-123', 'non-existent-tag');
    
    // Prismaの呼び出しを検証
    expect(prisma.tag.findFirst).toHaveBeenCalledWith({
      where: {
        id: 'non-existent-tag',
        userId: 'user-123'
      }
    });
    
    // deleteが呼ばれていないことを検証
    expect(prisma.tag.delete).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(404);
    expect(result.error).toBe('Tag not found');
  });

  test('タグIDが指定されていない場合は400エラーになる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // APIロジックを直接呼び出し - 空のタグID
    const result = await tagsApiLogic.deleteTag('user-123', '');
    
    // Prismaが呼ばれていないことを検証
    expect(prisma.tag.findFirst).not.toHaveBeenCalled();
    expect(prisma.tag.delete).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Tag ID is required');
  });

  test('データベースエラーの場合は500エラーになる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // 既存タグのモックデータ
    const existingTag = {
      id: 'tag-123',
      name: 'Work',
      userId: 'user-123',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // PrismaのfindFirstをモック
    (prisma.tag.findFirst as jest.Mock).mockResolvedValueOnce(existingTag);
    
    // Prismaのdeleteをモック - エラーをスロー
    (prisma.tag.delete as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
    
    // APIロジックを直接呼び出し
    const result = await tagsApiLogic.deleteTag('user-123', 'tag-123');
    
    // レスポンスの検証
    expect(result.status).toBe(500);
    expect(result.error).toBe('Database error');
  });
}); 