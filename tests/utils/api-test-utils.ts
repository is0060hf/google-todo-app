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