import { mockAuthenticatedUser, mockUnauthenticatedUser } from '../../../utils/auth';
import { prisma } from '@/app/lib/prisma';
import { tagsApiLogic } from '../../../utils/api-test-utils';

// インポートをモック
jest.mock('next-auth');
jest.mock('@/app/lib/prisma');

describe('GET /api/tags', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('認証済みユーザーはタグ一覧を取得できる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // Prismaのモックの設定
    const mockTags = [
      { id: 'tag1', name: 'Work', userId: 'user-123' },
      { id: 'tag2', name: 'Personal', userId: 'user-123' }
    ];
    
    (prisma.tag.findMany as jest.Mock).mockResolvedValue(mockTags);
    
    // APIロジックを直接呼び出し
    const result = await tagsApiLogic.getTags('user-123');
    
    // Prismaの呼び出しを検証
    expect(prisma.tag.findMany).toHaveBeenCalledWith({
      where: { userId: 'user-123' },
      orderBy: { name: 'asc' }
    });
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.tags).toEqual(mockTags);
  });

  test('タグが存在しない場合は空配列が返される', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // Prismaのモックの設定
    (prisma.tag.findMany as jest.Mock).mockResolvedValue([]);
    
    // APIロジックを直接呼び出し
    const result = await tagsApiLogic.getTags('user-123');
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.tags).toEqual([]);
  });

  test('データベースエラーが適切にハンドリングされる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // Prismaのモックの設定
    (prisma.tag.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));
    
    // APIロジックを直接呼び出し
    const result = await tagsApiLogic.getTags('user-123');
    
    // レスポンスの検証
    expect(result.status).toBe(500);
    expect(result.error).toBe('Database error');
  });
}); 