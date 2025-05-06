import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { mockNextResponseJson } from '../mocks/next-response';
import { getServerSession } from 'next-auth';

/**
 * API内部のロジックを直接テストするためのヘルパー関数
 * Next.jsのAPIルートハンドラをスキップして、内部のロジックを直接テストします
 */

// タグ関連のAPIロジック
export const tagsApiLogic = {
  /**
   * タグ一覧取得のロジック
   */
  async getTags(userId: string) {
    try {
      const tags = await prisma.tag.findMany({
        where: { userId },
        orderBy: { name: 'asc' }
      });
      
      return { tags, status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to fetch tags', status: 500 };
    }
  }
};

// タスクリスト関連のAPIロジック
export const tasklistsApiLogic = {
  /**
   * タスクリスト一覧取得のロジック
   */
  async getTaskLists(accessToken: string) {
    try {
      const response = await fetch('https://tasks.googleapis.com/tasks/v1/users/@me/lists', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch task lists: ${response.statusText}`);
      }
      
      const data = await response.json();
      return { taskLists: data.items || [], status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to fetch task lists', status: 500 };
    }
  }
};

// ユーザー関連のAPIロジック
export const userApiLogic = {
  /**
   * ユーザー情報取得のロジック
   */
  async getUserInfo(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
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
      
      if (!user) {
        return { error: 'User not found', status: 404 };
      }
      
      return { user, status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to fetch user info', status: 500 };
    }
  },
  
  /**
   * 利用規約同意状態更新のロジック
   */
  async updateTermsAgreement(userId: string, agreed: boolean) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { agreedToTerms: agreed },
        select: {
          id: true,
          agreedToTerms: true,
          updatedAt: true
        }
      });
      
      return { 
        success: true, 
        agreedToTerms: updatedUser.agreedToTerms, 
        updatedAt: updatedUser.updatedAt,
        status: 200 
      };
    } catch (error: any) {
      return { error: error.message || 'Failed to update agreement to terms', status: 500 };
    }
  }
}; 