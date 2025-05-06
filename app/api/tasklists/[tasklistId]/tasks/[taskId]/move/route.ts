import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import * as googleTasksApi from '@/app/lib/api/google-tasks';

// タスクの順序を変更するAPI
export async function POST(
  request: Request,
  { params }: { params: { tasklistId: string; taskId: string } }
) {
  try {
    const { tasklistId, taskId } = params;
    
    // リクエストボディを取得
    const body = await request.json();
    const { parent, previous } = body;
    
    // 移動パラメータが指定されていない場合はエラー
    if (!parent && !previous) {
      return NextResponse.json(
        { error: 'Either parent or previous parameter is required' },
        { status: 400 }
      );
    }

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

    // 移動パラメータを構築
    const moveParams: {
      parent?: string;
      previous?: string;
    } = {};
    
    if (parent) moveParams.parent = parent;
    if (previous) moveParams.previous = previous;

    // Google Tasks APIでタスクの位置を変更
    const movedTask = await googleTasksApi.moveTask(
      tasklistId,
      taskId,
      moveParams,
      accessToken
    );
    
    return NextResponse.json({ task: movedTask });
  } catch (error: any) {
    console.error('Error moving task:', error);
    
    // エラーレスポンス
    return NextResponse.json(
      { error: error.message || 'Failed to move task' },
      { status: 500 }
    );
  }
} 