'use server';

import { prisma } from './prisma';
import { getTaskLists, getTasks } from './api/google-tasks';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Session } from 'next-auth';

interface ExtendedSession extends Session {
  accessToken?: string;
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

/**
 * Google Tasks APIのデータと独自データを同期するための関数
 * 
 * 1. Google Tasks APIから全タスクを取得
 * 2. データベース内のカスタムデータを取得
 * 3. Google Tasks APIに存在しないタスクのカスタムデータを削除
 */
export async function syncTasksCustomData() {
  try {
    // 認証情報の取得
    const session = await getServerSession(authOptions) as ExtendedSession | null;
    if (!session?.user?.id || !session.accessToken) {
      throw new Error('ユーザーが認証されていないか、アクセストークンがありません');
    }

    const userId = session.user.id;
    const accessToken = session.accessToken;

    // プロセスの開始ログ
    console.log(`[${new Date().toISOString()}] ユーザー ${userId} のタスク同期を開始`);

    // Googleタスクリストの取得
    const taskLists = await getTaskLists(accessToken);
    
    // 全タスクIDを格納するセット
    const validTaskIds = new Set<string>();
    
    // 各タスクリストに対して処理
    for (const taskList of taskLists) {
      // タスクリストに含まれるタスクを取得
      const tasks = await getTasks(taskList.id, accessToken);
      
      // 有効なタスクIDをセットに追加
      tasks.forEach(task => {
        if (task && task.id) {
          validTaskIds.add(task.id);
        }
      });
    }
    
    // データベース内のカスタムデータを取得
    const customData = await prisma.taskCustomData.findMany({
      where: { userId },
    });
    
    // 削除対象のカスタムデータを特定
    const idsToDelete = customData
      .filter(data => !validTaskIds.has(data.googleTaskId))
      .map(data => data.id);
    
    if (idsToDelete.length > 0) {
      // 無効なカスタムデータの削除
      await prisma.taskCustomData.deleteMany({
        where: { id: { in: idsToDelete } },
      });
      
      console.log(`[${new Date().toISOString()}] ${idsToDelete.length} 件の無効なカスタムデータを削除しました`);
    } else {
      console.log(`[${new Date().toISOString()}] 削除対象の無効なカスタムデータはありませんでした`);
    }
    
    // プロセスの完了ログ
    console.log(`[${new Date().toISOString()}] ユーザー ${userId} のタスク同期が完了しました`);
    
    return {
      success: true,
      deletedCount: idsToDelete.length,
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] タスク同期中にエラーが発生しました:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '不明なエラー',
    };
  }
}

/**
 * 新しいタスクが作成された時にカスタムデータを初期化する関数
 */
export async function initTaskCustomData(googleTaskId: string, userId: string) {
  try {
    // 既存のカスタムデータがあるか確認
    const existingData = await prisma.taskCustomData.findUnique({
      where: { googleTaskId },
    });
    
    if (existingData) {
      console.log(`[${new Date().toISOString()}] タスク ${googleTaskId} のカスタムデータは既に存在します`);
      return existingData;
    }
    
    // 新しいカスタムデータを作成
    const newCustomData = await prisma.taskCustomData.create({
      data: {
        googleTaskId,
        userId,
      },
    });
    
    console.log(`[${new Date().toISOString()}] タスク ${googleTaskId} の新しいカスタムデータを作成しました`);
    return newCustomData;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] カスタムデータの初期化中にエラーが発生しました:`, error);
    throw error;
  }
} 