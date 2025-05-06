import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';
import * as googleTasksApi from '@/app/lib/api/google-tasks';

// タスクリスト一覧取得API
export async function GET() {
  try {
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

    // Google Tasks APIからタスクリスト一覧を取得
    const taskLists = await googleTasksApi.getTaskLists(accessToken);
    
    return NextResponse.json({ taskLists });
  } catch (error: any) {
    console.error('Error fetching task lists:', error);
    
    // エラーレスポンス
    return NextResponse.json(
      { error: error.message || 'Failed to fetch task lists' },
      { status: 500 }
    );
  }
}

// 新しいタスクリストを作成するAPI
export async function POST(request: Request) {
  try {
    // リクエストボディを取得
    const body = await request.json();
    const { title } = body;
    
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

    // Google Tasks APIで新しいタスクリストを作成
    const newTaskList = await googleTasksApi.createTaskList(
      { title },
      accessToken
    );
    
    return NextResponse.json({ taskList: newTaskList }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating task list:', error);
    
    // エラーレスポンス
    return NextResponse.json(
      { error: error.message || 'Failed to create task list' },
      { status: 500 }
    );
  }
} 