import { mockAuthenticatedUser, mockUnauthenticatedUser } from '../../../../utils/auth';
import { prisma } from '@/app/lib/prisma';
import { userApiLogic } from '../../../../utils/api-test-utils';

// インポートをモック
jest.mock('next-auth');
jest.mock('@/app/lib/prisma');

describe('POST /api/user/terms', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('認証済みユーザーは利用規約への同意状態を更新できる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // 更新されたユーザーデータをモック
    const mockUpdatedUser = {
      id: 'user-123',
      agreedToTerms: true,
      updatedAt: new Date('2023-01-02')
    };
    
    // Prismaのモックを設定
    (prisma.user.update as jest.Mock).mockResolvedValue(mockUpdatedUser);
    
    // APIロジックを直接呼び出し
    const result = await userApiLogic.updateTermsAgreement('user-123', true);
    
    // Prismaの呼び出しを検証
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user-123' },
      data: { agreedToTerms: true },
      select: {
        id: true,
        agreedToTerms: true,
        updatedAt: true
      }
    });
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.success).toBe(true);
    expect(result.agreedToTerms).toBe(true);
    expect(result.updatedAt).toBe(mockUpdatedUser.updatedAt);
  });

  test('データベースエラーが適切にハンドリングされる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // Prismaのモックを設定（エラーを投げる）
    (prisma.user.update as jest.Mock).mockRejectedValue(new Error('Database error'));
    
    // APIロジックを直接呼び出し
    const result = await userApiLogic.updateTermsAgreement('user-123', true);
    
    // レスポンスの検証
    expect(result.status).toBe(500);
    expect(result.error).toBe('Database error');
  });
}); 