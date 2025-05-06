import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import * as googleTasksApi from '@/app/lib/api/google-tasks';

// 特定のタスクを取得するAPI
export async function GET(
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

    // Google Tasks APIから特定のタスクを取得
    // この関数は直接APIには実装されていないため、タスク一覧から該当IDのタスクを抽出する形で実装
    const tasks = await googleTasksApi.getTasks(tasklistId, accessToken);
    const task = tasks.find(task => task.id === taskId);
    
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    return NextResponse.json({ task });
  } catch (error: any) {
    console.error('Error fetching task:', error);
    
    // エラーレスポンス
    return NextResponse.json(
      { error: error.message || 'Failed to fetch task' },
      { status: 500 }
    );
  }
}

// タスクを更新するAPI
export async function PATCH(
  request: Request,
  { params }: { params: { tasklistId: string; taskId: string } }
) {
  try {
    const { tasklistId, taskId } = params;
    
    // リクエストボディを取得
    const body = await request.json();
    const { title, notes, due, status, parent } = body;
    
    // タイトルが空文字列の場合はエラー
    if (title === '') {
      return NextResponse.json(
        { error: 'Title cannot be empty' },
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

    // 更新データを構築（undefinedのフィールドは除外）
    const updateData: Record<string, any> = {};
    if (title !== undefined) updateData.title = title;
    if (notes !== undefined) updateData.notes = notes;
    if (due !== undefined) updateData.due = due;
    if (status !== undefined) updateData.status = status;
    if (parent !== undefined) updateData.parent = parent;

    // Google Tasks APIでタスクを更新
    const updatedTask = await googleTasksApi.updateTask(
      tasklistId,
      taskId,
      updateData,
      accessToken
    );
    
    return NextResponse.json({ task: updatedTask });
  } catch (error: any) {
    console.error('Error updating task:', error);
    
    // エラーレスポンス
    return NextResponse.json(
      { error: error.message || 'Failed to update task' },
      { status: 500 }
    );
  }
}

// タスクを削除するAPI
export async function DELETE(
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

    // Google Tasks APIでタスクを削除
    await googleTasksApi.deleteTask(tasklistId, taskId, accessToken);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting task:', error);
    
    // エラーレスポンス
    return NextResponse.json(
      { error: error.message || 'Failed to delete task' },
      { status: 500 }
    );
  }
} 