import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';
import * as googleTasksApi from '@/app/lib/api/google-tasks';

// タスク一覧取得API
export async function GET(
  request: Request,
  { params }: { params: { tasklistId: string } }
) {
  try {
    const { tasklistId } = params;
    
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

    // Google Tasks APIからタスク一覧を取得
    const tasks = await googleTasksApi.getTasks(tasklistId, accessToken);
    
    return NextResponse.json({ tasks });
  } catch (error: any) {
    console.error('Error fetching tasks:', error);
    
    // エラーレスポンス
    return NextResponse.json(
      { error: error.message || 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// 新しいタスクを作成するAPI
export async function POST(
  request: Request,
  { params }: { params: { tasklistId: string } }
) {
  try {
    const { tasklistId } = params;
    
    // リクエストボディを取得
    const body = await request.json();
    const { title, notes, due, status, parent } = body;
    
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
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

    // タスクデータを構築
    const taskData = {
      title,
      notes,
      due,
      status,
      parent
    };

    // Google Tasks APIで新しいタスクを作成
    const newTask = await googleTasksApi.createTask(
      tasklistId,
      taskData,
      accessToken
    );
    
    return NextResponse.json({ task: newTask }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating task:', error);
    
    // エラーレスポンス
    return NextResponse.json(
      { error: error.message || 'Failed to create task' },
      { status: 500 }
    );
  }
} 