import { mockAuthenticatedUser } from '../../../../../utils/auth';
import { prisma } from '@/app/lib/prisma';
import { taskCustomDataApiLogic } from '../../../../../utils/api-test-utils';

// Prismaのモック
jest.mock('@/app/lib/prisma', () => ({
  prisma: {
    taskCustomData: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    $transaction: jest.fn((callback) => callback(prisma))
  }
}));

describe('PATCH /api/tasks/custom/[taskId]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('認証済みユーザーは既存のタスク独自データを更新できる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // 既存のタスク独自データのモック
    const existingCustomData = {
      id: 'custom-data-123',
      taskId: 'task-123',
      userId: 'user-123',
      priorityId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // 更新後のタスク独自データのモック
    const updatedCustomData = {
      ...existingCustomData,
      priorityId: 2,
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
    (prisma.taskCustomData.findFirst as jest.Mock)
      .mockResolvedValueOnce(existingCustomData) // 最初の呼び出しで既存データを返す
      .mockResolvedValueOnce(updatedCustomData); // トランザクション内の最後の呼び出しでは更新後のデータを返す
    
    // Prismaのupdateをモック
    (prisma.taskCustomData.update as jest.Mock)
      .mockResolvedValueOnce(existingCustomData) // 更新1回目の結果
      .mockResolvedValueOnce(existingCustomData) // タグクリア時の結果
      .mockResolvedValueOnce(updatedCustomData); // タグ追加時の結果
    
    // $transactionをモック
    (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      return await callback(prisma);
    });
    
    // 更新データ
    const updateData = {
      priorityId: 2,
      tags: ['tag-123']
    };
    
    // APIロジックを直接呼び出し
    const result = await taskCustomDataApiLogic.updateTaskCustomData(
      'user-123',
      'task-123',
      updateData
    );
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.customData).toEqual(updatedCustomData);
  });

  test('認証済みユーザーは新規のタスク独自データを作成できる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // 新規作成するタスク独自データのモック
    const newCustomData = {
      id: 'custom-data-123',
      taskId: 'task-123',
      userId: 'user-123',
      priorityId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // 作成後のタスク独自データのモック（タグとプライオリティを含む）
    const createdCustomData = {
      ...newCustomData,
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
    
    // PrismaのfindFirstをモック - 既存データなし
    (prisma.taskCustomData.findFirst as jest.Mock)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(createdCustomData);
    
    // Prismaのcreateをモック
    (prisma.taskCustomData.create as jest.Mock).mockResolvedValueOnce(newCustomData);
    
    // Prismaのupdateをモック
    (prisma.taskCustomData.update as jest.Mock)
      .mockResolvedValueOnce(newCustomData) // タグクリア時の結果
      .mockResolvedValueOnce(createdCustomData); // タグ追加時の結果
    
    // 更新データ
    const updateData = {
      priorityId: 2,
      tags: ['tag-123']
    };
    
    // APIロジックを直接呼び出し
    const result = await taskCustomDataApiLogic.updateTaskCustomData(
      'user-123',
      'task-123',
      updateData
    );
    
    // レスポンスの検証
    expect(result.status).toBe(200);
    expect(result.customData).toEqual(createdCustomData);
  });

  test('タスクIDが指定されていない場合は400エラーになる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // 更新データ
    const updateData = {
      priorityId: 2,
      tags: ['tag-123']
    };
    
    // APIロジックを直接呼び出し - 空のタスクID
    const result = await taskCustomDataApiLogic.updateTaskCustomData(
      'user-123',
      '',
      updateData
    );
    
    // トランザクションが呼ばれていないことを検証
    expect(prisma.$transaction).not.toHaveBeenCalled();
    
    // レスポンスの検証
    expect(result.status).toBe(400);
    expect(result.error).toBe('Task ID is required');
  });

  test('存在しないタグIDが指定された場合は404エラーになる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // 既存のタスク独自データのモック
    const existingCustomData = {
      id: 'custom-data-123',
      taskId: 'task-123',
      userId: 'user-123',
      priorityId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // PrismaのfindFirstをモック
    (prisma.taskCustomData.findFirst as jest.Mock).mockResolvedValueOnce(existingCustomData);
    
    // $transactionをモック - エラーをスロー
    (prisma.$transaction as jest.Mock).mockImplementation(() => {
      const error = new Error('Foreign key constraint failed on the field: `tag_id`');
      error.code = 'P2025';
      throw error;
    });
    
    // 更新データ - 存在しないタグID
    const updateData = {
      tags: ['non-existent-tag-id']
    };
    
    // APIロジックを直接呼び出し
    const result = await taskCustomDataApiLogic.updateTaskCustomData(
      'user-123',
      'task-123',
      updateData
    );
    
    // レスポンスの検証
    expect(result.status).toBe(404);
    expect(result.error).toBe('One or more tags do not exist');
  });

  test('データベースエラーの場合は500エラーになる', async () => {
    // 認証済みユーザーをモック
    mockAuthenticatedUser('user-123');
    
    // カスタムデータの取得のモック（既存データあり）
    const existingCustomData = {
      id: 'custom-123',
      taskId: 'task-123',
      userId: 'user-123',
      priorityId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: []
    };
    
    // PrismaのfindFirstをモック
    (prisma.taskCustomData.findFirst as jest.Mock).mockResolvedValueOnce(existingCustomData);
    
    // Prismaの$transactionをモック - エラーをスロー
    (prisma.$transaction as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
    
    // APIロジックを直接呼び出し
    const result = await taskCustomDataApiLogic.updateTaskCustomData(
      'user-123',
      'task-123',
      { priorityId: 2 }
    );
    
    // レスポンスの検証
    expect(result.status).toBe(500);
    expect(result.error).toBe('Database error');
  });
}); 