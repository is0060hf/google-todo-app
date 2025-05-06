import { mockAuthenticatedUser } from '../../../../../utils/auth';
import { prisma } from '@/app/lib/prisma';
import { taskCustomDataApiLogic } from '../../../../../utils/api-test-utils';

// Prismaのモック
jest.mock('@/app/lib/prisma', () => ({
  prisma: {
    taskCustomData: {
      findFirst: jest.fn(),
      delete: jest.fn()
    }
  }
}));

describe('DELETE /api/tasks/custom/[taskId]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('認証済みユーザーはタスク独自データを削除できる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // 既存のタスク独自データのモック
    const existingCustomData = {
      id: 'custom-data-123',
      taskId: 'task-123',
      userId: 'user-123',
      priorityId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // PrismaのfindFirstをモック
    (prisma.taskCustomData.findFirst as jest.Mock).mockResolvedValueOnce(existingCustomData);
    
    // Prismaのdeleteをモック
    (prisma.taskCustomData.delete as jest.Mock).mockResolvedValueOnce(existingCustomData);
    
    // APIロジックを直接呼び出し
    const result = await taskCustomDataApiLogic.deleteTaskCustomData('user-123', 'task-123');
    
    // Prismaの呼び出しを検証
    expect(prisma.taskCustomData.findFirst).toHaveBeenCalledWith({
      where: {
        taskId: 'task-123',
        userId: 'user-123'
      }
    });
    
    expect(prisma.taskCustomData.delete).toHaveBeenCalledWith({
      where: { id: 'custom-data-123' }
    });
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.success).toBe(true);
  });

  test('存在しないタスク独自データの場合は404エラーになる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // PrismaのfindFirstをモック - データが見つからない場合
    (prisma.taskCustomData.findFirst as jest.Mock).mockResolvedValueOnce(null);
    
    // APIロジックを直接呼び出し
    const result = await taskCustomDataApiLogic.deleteTaskCustomData('user-123', 'non-existent-task');
    
    // Prismaの呼び出しを検証
    expect(prisma.taskCustomData.findFirst).toHaveBeenCalledWith({
      where: {
        taskId: 'non-existent-task',
        userId: 'user-123'
      }
    });
    
    // deleteが呼ばれていないことを検証
    expect(prisma.taskCustomData.delete).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(404);
    expect(result.error).toBe('Task custom data not found');
  });

  test('タスクIDが指定されていない場合は400エラーになる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // APIロジックを直接呼び出し - 空のタスクID
    const result = await taskCustomDataApiLogic.deleteTaskCustomData('user-123', '');
    
    // Prismaが呼ばれていないことを検証
    expect(prisma.taskCustomData.findFirst).not.toHaveBeenCalled();
    expect(prisma.taskCustomData.delete).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Task ID is required');
  });

  test('データベースエラーの場合は500エラーになる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // 既存データのモック
    const existingCustomData = {
      id: 'custom-123',
      taskId: 'task-123',
      userId: 'user-123',
      priorityId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // PrismaのfindFirstをモック
    (prisma.taskCustomData.findFirst as jest.Mock).mockResolvedValueOnce(existingCustomData);
    
    // Prismaのdeleteをモック - エラーをスロー
    (prisma.taskCustomData.delete as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
    
    // APIロジックを直接呼び出し
    const result = await taskCustomDataApiLogic.deleteTaskCustomData('user-123', 'task-123');
    
    // レスポンスの検証
    expect(result.status).toBe(500);
    expect(result.error).toBe('Database error');
  });
}); 