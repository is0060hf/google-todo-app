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
  },

  /**
   * タグ作成のロジック
   */
  async createTag(userId: string, name: string) {
    try {
      // タグ名の検証
      if (!name || name.trim() === '') {
        return { error: 'Tag name is required', status: 400 };
      }
      
      // 同じ名前のタグが既に存在するか確認
      const existingTag = await prisma.tag.findFirst({
        where: { 
          userId,
          name: { equals: name, mode: 'insensitive' }
        }
      });
      
      if (existingTag) {
        return { error: 'Tag with this name already exists', status: 409 };
      }
      
      // 新しいタグを作成
      const newTag = await prisma.tag.create({
        data: {
          name,
          userId
        }
      });
      
      return { tag: newTag, status: 201 };
    } catch (error: any) {
      return { error: error.message || 'Failed to create tag', status: 500 };
    }
  },

  /**
   * タグ詳細取得のロジック
   */
  async getTag(userId: string, tagId: string) {
    try {
      if (!tagId) {
        return { error: 'Tag ID is required', status: 400 };
      }

      // ユーザーのタグを取得
      const tag = await prisma.tag.findFirst({
        where: {
          id: tagId,
          userId // 自分のタグのみアクセス可能
        }
      });
      
      if (!tag) {
        return { error: 'Tag not found', status: 404 };
      }
      
      return { tag, status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to fetch tag', status: 500 };
    }
  },

  /**
   * タグ更新のロジック
   */
  async updateTag(userId: string, tagId: string, name: string) {
    try {
      if (!tagId) {
        return { error: 'Tag ID is required', status: 400 };
      }

      if (!name || typeof name !== 'string' || name.trim() === '') {
        return { error: 'Tag name is required', status: 400 };
      }

      // タグの存在確認
      const existingTag = await prisma.tag.findFirst({
        where: {
          id: tagId,
          userId
        }
      });

      if (!existingTag) {
        return { error: 'Tag not found', status: 404 };
      }

      // 同名タグの存在確認（更新対象以外）
      const duplicateTag = await prisma.tag.findFirst({
        where: {
          name: name.trim(),
          userId,
          id: { not: tagId }
        }
      });

      if (duplicateTag) {
        return { 
          error: 'Another tag with this name already exists', 
          status: 409 
        };
      }

      // タグを更新
      const updatedTag = await prisma.tag.update({
        where: { id: tagId },
        data: { name: name.trim() }
      });
      
      return { tag: updatedTag, status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to update tag', status: 500 };
    }
  },

  /**
   * タグ削除のロジック
   */
  async deleteTag(userId: string, tagId: string) {
    try {
      if (!tagId) {
        return { error: 'Tag ID is required', status: 400 };
      }

      // タグの存在確認
      const existingTag = await prisma.tag.findFirst({
        where: {
          id: tagId,
          userId
        }
      });

      if (!existingTag) {
        return { error: 'Tag not found', status: 404 };
      }

      // タグを削除
      await prisma.tag.delete({
        where: { id: tagId }
      });
      
      return { success: true, status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to delete tag', status: 500 };
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
  },

  /**
   * タスクリスト詳細取得のロジック
   */
  async getTaskList(taskListId: string, accessToken: string) {
    try {
      if (!taskListId) {
        return { error: 'Task list ID is required', status: 400 };
      }

      if (!accessToken) {
        return { error: 'Missing access token', status: 401 };
      }

      const response = await fetch(`https://tasks.googleapis.com/tasks/v1/users/@me/lists/${taskListId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        // GoogleのAPIエラーハンドリング
        if (response.status === 404) {
          return { error: 'Task list not found', status: 404 };
        }
        throw new Error(`Failed to fetch task list: ${response.statusText}`);
      }
      
      const taskList = await response.json();
      return { taskList, status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to fetch task list', status: 500 };
    }
  },

  /**
   * タスクリスト作成のロジック
   */
  async createTaskList(title: string, accessToken: string) {
    try {
      if (!title || title.trim() === '') {
        return { error: 'Title is required', status: 400 };
      }

      if (!accessToken) {
        return { error: 'Missing access token', status: 401 };
      }

      const response = await fetch('https://tasks.googleapis.com/tasks/v1/users/@me/lists', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title.trim() })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to create task list: ${response.statusText}`);
      }
      
      const taskList = await response.json();
      return { taskList, status: 201 };
    } catch (error: any) {
      return { error: error.message || 'Failed to create task list', status: 500 };
    }
  },

  /**
   * タスクリスト更新のロジック
   */
  async updateTaskList(taskListId: string, title: string, accessToken: string) {
    try {
      if (!taskListId) {
        return { error: 'Task list ID is required', status: 400 };
      }

      if (!title || title.trim() === '') {
        return { error: 'Title is required', status: 400 };
      }

      if (!accessToken) {
        return { error: 'Missing access token', status: 401 };
      }

      const response = await fetch(`https://tasks.googleapis.com/tasks/v1/users/@me/lists/${taskListId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title.trim() })
      });
      
      if (!response.ok) {
        // GoogleのAPIエラーハンドリング
        if (response.status === 404) {
          return { error: 'Task list not found', status: 404 };
        }
        throw new Error(`Failed to update task list: ${response.statusText}`);
      }
      
      const taskList = await response.json();
      return { taskList, status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to update task list', status: 500 };
    }
  },

  /**
   * タスクリスト削除のロジック
   */
  async deleteTaskList(taskListId: string, accessToken: string) {
    try {
      if (!taskListId) {
        return { error: 'Task list ID is required', status: 400 };
      }

      if (!accessToken) {
        return { error: 'Missing access token', status: 401 };
      }

      const response = await fetch(`https://tasks.googleapis.com/tasks/v1/users/@me/lists/${taskListId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        // GoogleのAPIエラーハンドリング
        if (response.status === 404) {
          return { error: 'Task list not found', status: 404 };
        }
        throw new Error(`Failed to delete task list: ${response.statusText}`);
      }
      
      return { success: true, status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to delete task list', status: 500 };
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

// タスク関連のAPIロジック
export const tasksApiLogic = {
  /**
   * タスク一覧取得のロジック
   */
  async getTasks(taskListId: string, accessToken: string, showCompleted = true) {
    try {
      if (!taskListId) {
        return { error: 'Task list ID is required', status: 400 };
      }

      if (!accessToken) {
        return { error: 'Missing access token', status: 401 };
      }

      let url = `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks`;
      
      // 完了済みタスクの表示/非表示を制御するパラメータを追加
      if (!showCompleted) {
        url += '?showCompleted=false';
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        // GoogleのAPIエラーハンドリング
        if (response.status === 404) {
          return { error: 'Task list not found', status: 404 };
        }
        throw new Error(`Failed to fetch tasks: ${response.statusText}`);
      }
      
      const data = await response.json();
      return { tasks: data.items || [], status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to fetch tasks', status: 500 };
    }
  },

  /**
   * タスク作成のロジック
   */
  async createTask(taskListId: string, taskData: { title: string, notes?: string, due?: string }, accessToken: string) {
    try {
      if (!taskListId) {
        return { error: 'Task list ID is required', status: 400 };
      }

      if (!taskData.title || taskData.title.trim() === '') {
        return { error: 'Task title is required', status: 400 };
      }

      if (!accessToken) {
        return { error: 'Missing access token', status: 401 };
      }

      const response = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: taskData.title.trim(),
          notes: taskData.notes,
          due: taskData.due
        })
      });
      
      if (!response.ok) {
        // GoogleのAPIエラーハンドリング
        if (response.status === 404) {
          return { error: 'Task list not found', status: 404 };
        }
        throw new Error(`Failed to create task: ${response.statusText}`);
      }
      
      const task = await response.json();
      return { task, status: 201 };
    } catch (error: any) {
      return { error: error.message || 'Failed to create task', status: 500 };
    }
  },

  /**
   * タスク詳細取得のロジック
   */
  async getTask(taskListId: string, taskId: string, accessToken: string) {
    try {
      if (!taskListId) {
        return { error: 'Task list ID is required', status: 400 };
      }

      if (!taskId) {
        return { error: 'Task ID is required', status: 400 };
      }

      if (!accessToken) {
        return { error: 'Missing access token', status: 401 };
      }

      const response = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        // GoogleのAPIエラーハンドリング
        if (response.status === 404) {
          return { error: 'Task not found', status: 404 };
        }
        throw new Error(`Failed to fetch task: ${response.statusText}`);
      }
      
      const task = await response.json();
      return { task, status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to fetch task', status: 500 };
    }
  },

  /**
   * タスク更新のロジック
   */
  async updateTask(
    taskListId: string, 
    taskId: string, 
    taskData: { title?: string, notes?: string, due?: string, status?: 'needsAction' | 'completed', completed?: string | null }, 
    accessToken: string
  ) {
    try {
      if (!taskListId) {
        return { error: 'Task list ID is required', status: 400 };
      }

      if (!taskId) {
        return { error: 'Task ID is required', status: 400 };
      }

      if (!accessToken) {
        return { error: 'Missing access token', status: 401 };
      }

      // タスクデータの検証
      if (taskData.title !== undefined && taskData.title.trim() === '') {
        return { error: 'Task title cannot be empty', status: 400 };
      }

      const response = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });
      
      if (!response.ok) {
        // GoogleのAPIエラーハンドリング
        if (response.status === 404) {
          return { error: 'Task not found', status: 404 };
        }
        throw new Error(`Failed to update task: ${response.statusText}`);
      }
      
      const task = await response.json();
      return { task, status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to update task', status: 500 };
    }
  },

  /**
   * タスク削除のロジック
   */
  async deleteTask(taskListId: string, taskId: string, accessToken: string) {
    try {
      if (!taskListId) {
        return { error: 'Task list ID is required', status: 400 };
      }

      if (!taskId) {
        return { error: 'Task ID is required', status: 400 };
      }

      if (!accessToken) {
        return { error: 'Missing access token', status: 401 };
      }

      const response = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        // GoogleのAPIエラーハンドリング
        if (response.status === 404) {
          return { error: 'Task not found', status: 404 };
        }
        throw new Error(`Failed to delete task: ${response.statusText}`);
      }
      
      return { success: true, status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to delete task', status: 500 };
    }
  },

  /**
   * タスク移動のロジック
   */
  async moveTask(taskListId: string, taskId: string, params: { parent?: string, previous?: string }, accessToken: string) {
    try {
      if (!taskListId) {
        return { error: 'Task list ID is required', status: 400 };
      }

      if (!taskId) {
        return { error: 'Task ID is required', status: 400 };
      }

      if (!accessToken) {
        return { error: 'Missing access token', status: 401 };
      }

      // URLパラメータの構築
      let endpoint = `/lists/${taskListId}/tasks/${taskId}/move`;
      const queryParams = new URLSearchParams();
      
      if (params.parent) {
        queryParams.append('parent', params.parent);
      }
      
      if (params.previous) {
        queryParams.append('previous', params.previous);
      }
      
      // クエリパラメータが存在する場合、URLに追加
      const queryString = queryParams.toString();
      if (queryString) {
        endpoint += `?${queryString}`;
      }

      const response = await fetch(`https://tasks.googleapis.com/tasks/v1${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        // GoogleのAPIエラーハンドリング
        if (response.status === 404) {
          return { error: 'Task not found', status: 404 };
        }
        throw new Error(`Failed to move task: ${response.statusText}`);
      }
      
      const task = await response.json();
      return { task, status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to move task', status: 500 };
    }
  }
};

// 優先度関連のAPIロジック
export const prioritiesApiLogic = {
  /**
   * 優先度一覧取得のロジック
   */
  async getPriorities() {
    try {
      const priorities = [
        { id: 1, name: '低', color: '#4CAF50' },
        { id: 2, name: '中', color: '#FFC107' },
        { id: 3, name: '高', color: '#F44336' }
      ];
      
      return { priorities, status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to fetch priorities', status: 500 };
    }
  }
};

// タスク独自データ関連のAPIロジック
export const taskCustomDataApiLogic = {
  /**
   * タスク独自データ取得のロジック
   */
  async getTaskCustomData(userId: string, taskId: string) {
    try {
      if (!taskId) {
        return { error: 'Task ID is required', status: 400 };
      }

      // タスク独自データを取得
      const customData = await prisma.taskCustomData.findFirst({
        where: {
          taskId,
          userId
        },
        include: {
          tags: true,
          priority: true
        }
      });
      
      // データが存在しない場合は空のデータを返す
      if (!customData) {
        return { 
          customData: { 
            taskId, 
            userId, 
            tags: [], 
            priority: null 
          }, 
          status: 200 
        };
      }
      
      return { customData, status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to fetch task custom data', status: 500 };
    }
  },

  /**
   * タスク独自データ更新のロジック
   */
  async updateTaskCustomData(
    userId: string, 
    taskId: string, 
    data: { 
      tags?: string[], // タグIDの配列
      priorityId?: number | null 
    }
  ) {
    try {
      if (!taskId) {
        return { error: 'Task ID is required', status: 400 };
      }

      // 既存のカスタムデータを検索
      let customData = await prisma.taskCustomData.findFirst({
        where: {
          taskId,
          userId
        }
      });

      // トランザクションで更新
      const updatedCustomData = await prisma.$transaction(async (tx) => {
        // 既存データがない場合は新規作成
        if (!customData) {
          customData = await tx.taskCustomData.create({
            data: {
              taskId,
              userId,
              priorityId: data.priorityId || null
            }
          });
        } else {
          // 既存のデータを更新
          customData = await tx.taskCustomData.update({
            where: { id: customData.id },
            data: {
              priorityId: data.priorityId !== undefined ? data.priorityId : customData.priorityId
            }
          });
        }

        // タグが指定されている場合、関連を更新
        if (data.tags !== undefined) {
          // 既存のタグ関連をすべて削除
          await tx.taskCustomData.update({
            where: { id: customData.id },
            data: {
              tags: {
                set: [] // 関連をクリア
              }
            }
          });

          // 新しいタグ関連を作成
          if (data.tags.length > 0) {
            await tx.taskCustomData.update({
              where: { id: customData.id },
              data: {
                tags: {
                  connect: data.tags.map(tagId => ({ id: tagId }))
                }
              }
            });
          }
        }

        // 更新後のデータを取得して返す
        return tx.taskCustomData.findFirst({
          where: { id: customData.id },
          include: {
            tags: true,
            priority: true
          }
        });
      });

      return { customData: updatedCustomData, status: 200 };
    } catch (error: any) {
      // 存在しないタグIDなどの関連エラー
      if (error.code === 'P2025') {
        return { error: 'One or more tags do not exist', status: 404 };
      }
      return { error: error.message || 'Failed to update task custom data', status: 500 };
    }
  },

  /**
   * タスク独自データ削除のロジック
   */
  async deleteTaskCustomData(userId: string, taskId: string) {
    try {
      if (!taskId) {
        return { error: 'Task ID is required', status: 400 };
      }

      // タスク独自データの存在確認
      const customData = await prisma.taskCustomData.findFirst({
        where: {
          taskId,
          userId
        }
      });

      if (!customData) {
        return { error: 'Task custom data not found', status: 404 };
      }

      // データを削除
      await prisma.taskCustomData.delete({
        where: { id: customData.id }
      });
      
      return { success: true, status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to delete task custom data', status: 500 };
    }
  }
};

// 統計データ関連のAPIロジック
export const statsApiLogic = {
  /**
   * 日次統計データ取得のロジック
   */
  async getDailyStats(userId: string, date: string) {
    try {
      if (!date) {
        return { error: 'Date is required', status: 400 };
      }

      // 日付の形式チェック（YYYY-MM-DD）
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return { error: 'Date format should be YYYY-MM-DD', status: 400 };
      }

      // 統計データを取得
      const stats = await prisma.dailyStats.findFirst({
        where: {
          userId,
          date: new Date(date)
        }
      });
      
      // データが存在しない場合は空のデータを返す
      if (!stats) {
        return { 
          stats: { 
            date, 
            tasksCreated: 0, 
            tasksCompleted: 0,
            totalTasks: 0,
            completionRate: 0
          }, 
          status: 200 
        };
      }
      
      return { stats, status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to fetch daily stats', status: 500 };
    }
  },

  /**
   * 週次統計データ取得のロジック
   */
  async getWeeklyStats(userId: string, weekStart: string) {
    try {
      if (!weekStart) {
        return { error: 'Week start date is required', status: 400 };
      }

      // 日付の形式チェック（YYYY-MM-DD）
      if (!/^\d{4}-\d{2}-\d{2}$/.test(weekStart)) {
        return { error: 'Date format should be YYYY-MM-DD', status: 400 };
      }

      // 統計データを取得
      const stats = await prisma.weeklyStats.findFirst({
        where: {
          userId,
          weekStart: new Date(weekStart)
        }
      });
      
      // データが存在しない場合は空のデータを返す
      if (!stats) {
        return { 
          stats: { 
            weekStart, 
            tasksCreated: 0, 
            tasksCompleted: 0,
            totalTasks: 0,
            completionRate: 0
          }, 
          status: 200 
        };
      }
      
      return { stats, status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to fetch weekly stats', status: 500 };
    }
  },

  /**
   * 月次統計データ取得のロジック
   */
  async getMonthlyStats(userId: string, yearMonth: string) {
    try {
      if (!yearMonth) {
        return { error: 'Year and month are required', status: 400 };
      }

      // 形式チェック（YYYY-MM）
      if (!/^\d{4}-\d{2}$/.test(yearMonth)) {
        return { error: 'Format should be YYYY-MM', status: 400 };
      }

      // 統計データを取得
      const stats = await prisma.monthlyStats.findFirst({
        where: {
          userId,
          yearMonth
        }
      });
      
      // データが存在しない場合は空のデータを返す
      if (!stats) {
        return { 
          stats: { 
            yearMonth, 
            tasksCreated: 0, 
            tasksCompleted: 0,
            totalTasks: 0,
            completionRate: 0
          }, 
          status: 200 
        };
      }
      
      return { stats, status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to fetch monthly stats', status: 500 };
    }
  },

  /**
   * 年次統計データ取得のロジック
   */
  async getYearlyStats(userId: string, year: string) {
    try {
      if (!year) {
        return { error: 'Year is required', status: 400 };
      }

      // 形式チェック（YYYY）
      if (!/^\d{4}$/.test(year)) {
        return { error: 'Format should be YYYY', status: 400 };
      }

      // 統計データを取得
      const stats = await prisma.yearlyStats.findFirst({
        where: {
          userId,
          year: parseInt(year, 10)
        }
      });
      
      // データが存在しない場合は空のデータを返す
      if (!stats) {
        return { 
          stats: { 
            year: parseInt(year, 10), 
            tasksCreated: 0, 
            tasksCompleted: 0,
            totalTasks: 0,
            completionRate: 0
          }, 
          status: 200 
        };
      }
      
      return { stats, status: 200 };
    } catch (error: any) {
      return { error: error.message || 'Failed to fetch yearly stats', status: 500 };
    }
  },

  /**
   * 統計データ更新のロジック
   */
  async updateStats(userId: string) {
    try {
      // 実際のアプリケーションでは、ここでGoogle TasksのAPIから
      // 最新のタスクデータを取得し、統計情報を計算して更新する

      // このテスト用のモックでは、更新成功を返す
      return { 
        success: true,
        message: 'Stats updated successfully',
        status: 200 
      };
    } catch (error: any) {
      return { error: error.message || 'Failed to update stats', status: 500 };
    }
  }
}; 