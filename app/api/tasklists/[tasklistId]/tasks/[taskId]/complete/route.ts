import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import * as googleTasksApi from '@/app/lib/api/google-tasks';

// タスクを完了状態に変更するAPI
export async function POST(
  request: Request,
  { params }: { params: { tasklistId: string; taskId: string } }
) {
  try {
    const { tasklistId, taskId } = params;
    
    // セッションからユーザー情報を取得
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // セッションからアクセストークンを取得
    // @ts-ignore - next-authの型定義と実際の挙動の差異
    const accessToken = session.accessToken;
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Missing access token. Please sign in again.' }, 
        { status: 401 }
      );
    }

    // Google Tasks APIでタスクを完了状態に変更
    const completedTask = await googleTasksApi.completeTask(
      tasklistId,
      taskId,
      accessToken
    );
    
    return NextResponse.json({ task: completedTask });
  } catch (error: any) {
    console.error('Error completing task:', error);
    
    // エラーレスポンス
    return NextResponse.json(
      { error: error.message || 'Failed to complete task' },
      { status: 500 }
    );
  }
} 