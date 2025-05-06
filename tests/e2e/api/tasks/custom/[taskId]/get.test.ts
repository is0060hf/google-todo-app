import { mockAuthenticatedUser } from '../../../../../utils/auth';
import { prisma } from '@/app/lib/prisma';
import { taskCustomDataApiLogic } from '../../../../../utils/api-test-utils';

// Prismaのモック
jest.mock('@/app/lib/prisma', () => ({
  prisma: {
    taskCustomData: {
      findFirst: jest.fn()
    }
  }
}));

describe('GET /api/tasks/custom/[taskId]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('認証済みユーザーはタスク独自データを取得できる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // 取得するタスク独自データのモックデータ
    const mockCustomData = {
      id: 'custom-data-123',
      taskId: 'task-123',
      userId: 'user-123',
      priorityId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [
        {
          id: 'tag-123',
          name: 'Work',
          userId: 'user-123',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      priority: {
        id: 2,
        name: '中',
        color: '#FFC107'
      }
    };
    
    // PrismaのfindFirstをモック
    (prisma.taskCustomData.findFirst as jest.Mock).mockResolvedValueOnce(mockCustomData);
    
    // APIロジックを直接呼び出し
    const result = await taskCustomDataApiLogic.getTaskCustomData('user-123', 'task-123');
    
    // Prismaの呼び出しを検証
    expect(prisma.taskCustomData.findFirst).toHaveBeenCalledWith({
      where: {
        taskId: 'task-123',
        userId: 'user-123'
      },
      include: {
        tags: true,
        priority: true
      }
    });
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.customData).toEqual(mockCustomData);
    expect(result.customData.taskId).toBe('task-123');
    expect(result.customData.userId).toBe('user-123');
    expect(result.customData.priority.name).toBe('中');
    expect(result.customData.tags.length).toBe(1);
    expect(result.customData.tags[0].name).toBe('Work');
  });

  test('タスク独自データが存在しない場合は空データを返す', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // PrismaのfindFirstをモック - データが見つからない場合
    (prisma.taskCustomData.findFirst as jest.Mock).mockResolvedValueOnce(null);
    
    // APIロジックを直接呼び出し
    const result = await taskCustomDataApiLogic.getTaskCustomData('user-123', 'task-123');
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.customData).toEqual({
      taskId: 'task-123',
      userId: 'user-123',
      tags: [],
      priority: null
    });
  });

  test('タスクIDが指定されていない場合は400エラーになる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // APIロジックを直接呼び出し - 空のタスクID
    const result = await taskCustomDataApiLogic.getTaskCustomData('user-123', '');
    
    // Prismaが呼ばれていないことを検証
    expect(prisma.taskCustomData.findFirst).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Task ID is required');
  });

  test('データベースエラーの場合は500エラーになる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // PrismaのfindFirstをモック - エラーをスロー
    (prisma.taskCustomData.findFirst as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
    
    // APIロジックを直接呼び出し
    const result = await taskCustomDataApiLogic.getTaskCustomData('user-123', 'task-123');
    
    // レスポンスの検証
    expect(result.status).toBe(500);
    expect(result.error).toBe('Failed to fetch task custom data');
  });
}); 