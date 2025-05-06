import { mockAuthenticatedUser } from '../../../../utils/auth';
import { prisma } from '@/app/lib/prisma';
import { tagsApiLogic } from '../../../../utils/api-test-utils';

// Prismaのモック
jest.mock('@/app/lib/prisma', () => ({
  prisma: {
    tag: {
      findFirst: jest.fn(),
      update: jest.fn()
    }
  }
}));

describe('PATCH /api/tags/[tagId]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('認証済みユーザーは自分のタグを更新できる', async () => {
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
    
    // 更新後のタグのモックデータ
    const updatedTag = {
      ...existingTag,
      name: 'Work Projects',
      updatedAt: new Date()
    };
    
    // PrismaのfindFirstをモック（既存タグの確認）
    (prisma.tag.findFirst as jest.Mock).mockResolvedValueOnce(existingTag);
    
    // 同名タグのチェック - 存在しない場合
    (prisma.tag.findFirst as jest.Mock).mockResolvedValueOnce(null);
    
    // Prismaのupdateをモック
    (prisma.tag.update as jest.Mock).mockResolvedValueOnce(updatedTag);
    
    // APIロジックを直接呼び出し
    const result = await tagsApiLogic.updateTag('user-123', 'tag-123', 'Work Projects');
    
    // Prismaの呼び出しを検証
    expect(prisma.tag.findFirst).toHaveBeenCalledWith({
      where: {
        id: 'tag-123',
        userId: 'user-123'
      }
    });
    
    expect(prisma.tag.findFirst).toHaveBeenCalledWith({
      where: {
        name: 'Work Projects',
        userId: 'user-123',
        id: { not: 'tag-123' }
      }
    });
    
    expect(prisma.tag.update).toHaveBeenCalledWith({
      where: { id: 'tag-123' },
      data: { name: 'Work Projects' }
    });
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.tag).toEqual(updatedTag);
  });

  test('存在しないタグIDの場合は404エラーになる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // PrismaのfindFirstをモック - タグが見つからない場合
    (prisma.tag.findFirst as jest.Mock).mockResolvedValueOnce(null);
    
    // APIロジックを直接呼び出し
    const result = await tagsApiLogic.updateTag('user-123', 'non-existent-tag', 'New Name');
    
    // Prismaの呼び出しを検証
    expect(prisma.tag.findFirst).toHaveBeenCalledWith({
      where: {
        id: 'non-existent-tag',
        userId: 'user-123'
      }
    });
    
    // updateが呼ばれていないことを検証
    expect(prisma.tag.update).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(404);
    expect(result.error).toBe('Tag not found');
  });

  test('同名のタグが既に存在する場合は409エラーになる', async () => {
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
    
    // 同名の別タグが存在する場合のモックデータ
    const duplicateTag = {
      id: 'tag-456',
      name: 'Home',
      userId: 'user-123',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // PrismaのfindFirstをモック（既存タグの確認）
    (prisma.tag.findFirst as jest.Mock).mockResolvedValueOnce(existingTag);
    
    // 同名タグのチェック - 存在する場合
    (prisma.tag.findFirst as jest.Mock).mockResolvedValueOnce(duplicateTag);
    
    // APIロジックを直接呼び出し
    const result = await tagsApiLogic.updateTag('user-123', 'tag-123', 'Home');
    
    // updateが呼ばれていないことを検証
    expect(prisma.tag.update).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(409);
    expect(result.error).toBe('Another tag with this name already exists');
  });

  test('タグIDが指定されていない場合は400エラーになる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // APIロジックを直接呼び出し - 空のタグID
    const result = await tagsApiLogic.updateTag('user-123', '', 'New Name');
    
    // Prismaが呼ばれていないことを検証
    expect(prisma.tag.findFirst).not.toHaveBeenCalled();
    expect(prisma.tag.update).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Tag ID is required');
  });

  test('タグ名が指定されていない場合は400エラーになる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // APIロジックを直接呼び出し - 空のタグ名
    const result = await tagsApiLogic.updateTag('user-123', 'tag-123', '');
    
    // Prismaが呼ばれていないことを検証
    expect(prisma.tag.findFirst).not.toHaveBeenCalled();
    expect(prisma.tag.update).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Tag name is required');
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
    
    // PrismaのfindFirstをモック（既存タグの確認）
    (prisma.tag.findFirst as jest.Mock).mockResolvedValueOnce(existingTag);
    
    // 同名タグのチェック - 存在しない場合
    (prisma.tag.findFirst as jest.Mock).mockResolvedValueOnce(null);
    
    // Prismaのupdateをモック - エラーをスロー
    (prisma.tag.update as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
    
    // APIロジックを直接呼び出し
    const result = await tagsApiLogic.updateTag('user-123', 'tag-123', 'New Name');
    
    // レスポンスの検証
    expect(result.status).toBe(500);
    expect(result.error).toBe('Failed to update tag');
  });
}); 