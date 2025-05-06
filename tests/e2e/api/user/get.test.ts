import { mockAuthenticatedUser, mockUnauthenticatedUser } from '../../../utils/auth';
import { prisma } from '@/app/lib/prisma';
import { userApiLogic } from '../../../utils/api-test-utils';

// インポートをモック
jest.mock('next-auth');
jest.mock('@/app/lib/prisma');

describe('GET /api/user', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('認証済みユーザーは自分の情報を取得できる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // ユーザーデータをモック
    const mockUser = {
      id: 'user-123',
      name: 'Test User',
      email: 'test@example.com',
      avatarUrl: 'https://example.com/avatar.jpg',
      agreedToTerms: true,
      subscriptionPlan: 'FREE',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-02')
    };
    
    // Prismaのモックを設定
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    
    // APIロジックを直接呼び出し
    const result = await userApiLogic.getUserInfo('user-123');
    
    // Prismaの呼び出しを検証
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 'user-123' },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        agreedToTerms: true,
        subscriptionPlan: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.user).toEqual(mockUser);
  });

  test('ユーザーが見つからない場合はエラーが返される', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // Prismaのモックを設定（ユーザーが見つからない）
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    
    // APIロジックを直接呼び出し
    const result = await userApiLogic.getUserInfo('user-123');
    
    // レスポンスの検証
    expect(result.status).toBe(404);
    expect(result.error).toBe('User not found');
  });

  test('データベースエラーが適切にハンドリングされる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // Prismaのモックを設定（エラーを投げる）
    (prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'));
    
    // APIロジックを直接呼び出し
    const result = await userApiLogic.getUserInfo('user-123');
    
    // レスポンスの検証
    expect(result.status).toBe(500);
    expect(result.error).toBe('Database error');
  });
}); 