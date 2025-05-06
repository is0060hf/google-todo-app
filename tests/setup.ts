// テスト環境のセットアップ
import { PrismaClient } from '@prisma/client';
import { jest } from '@jest/globals';

// ESMモジュールのモック
jest.mock('@auth/prisma-adapter', () => ({
  PrismaAdapter: jest.fn().mockImplementation(() => ({
    // PrismaAdapterのモック実装
  }))
}));

// Prismaのモックを準備
jest.mock('@/app/lib/prisma', () => {
  const mockPrismaClient = {
    user: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
    tag: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
    taskCustomData: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
    priority: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
    dailyStats: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      deleteMany: jest.fn(),
    },
    weeklyStats: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      deleteMany: jest.fn(),
    },
    monthlyStats: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      deleteMany: jest.fn(),
    },
    yearlyStats: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      deleteMany: jest.fn(),
    },
    session: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      deleteMany: jest.fn(),
    },
    account: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      deleteMany: jest.fn(),
    },
    $transaction: jest.fn().mockImplementation(callback => callback(mockPrismaClient)),
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  };

  return {
    prisma: mockPrismaClient
  };
});

// next-authのモック
jest.mock('next-auth/jwt', () => ({
  getToken: jest.fn(),
}));

jest.mock('next-auth', () => ({
  getServerSession: jest.fn().mockImplementation(() => ({
    user: {
      id: 'test-user-id',
      name: 'Test User',
      email: 'test@example.com',
    },
    accessToken: 'mock-access-token'
  })),
}));

// auth関連モジュールのモック
jest.mock('@/app/api/auth/[...nextauth]/route', () => ({
  GET: jest.fn(),
  POST: jest.fn(),
  auth: {
    handlers: {
      GET: jest.fn(),
      POST: jest.fn(),
    },
  }
}));

// 各テスト前の共通処理
beforeEach(() => {
  jest.clearAllMocks();
});

// 全テスト完了後の処理
afterAll(async () => {
  // 必要であればここでクリーンアップ処理を行う
}); 