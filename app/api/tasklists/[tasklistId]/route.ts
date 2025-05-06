import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import * as googleTasksApi from '@/app/lib/api/google-tasks';

// 特定のタスクリスト情報を取得
export async function GET(
  request: Request,
  { params }: { params: { tasklistId: string } }
) {
  try {
    const { tasklistId } = params;
    
    if (!tasklistId) {
      return NextResponse.json(
        { error: 'Task list ID is required' },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // @ts-ignore - next-authの型定義と実際の挙動の差異
    const accessToken = session.accessToken;
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Missing access token. Please sign in again.' }, 
        { status: 401 }
      );
    }

    const taskList = await googleTasksApi.getTaskList(tasklistId, accessToken);
    
    return NextResponse.json({ taskList });
  } catch (error: any) {
    console.error('Error fetching task list:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to fetch task list' },
      { status: 500 }
    );
  }
}

// タスクリスト情報を更新
export async function PATCH(
  request: Request,
  { params }: { params: { tasklistId: string } }
) {
  try {
    const { tasklistId } = params;
    
    if (!tasklistId) {
      return NextResponse.json(
        { error: 'Task list ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title } = body;
    
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // @ts-ignore - next-authの型定義と実際の挙動の差異
    const accessToken = session.accessToken;
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Missing access token. Please sign in again.' }, 
        { status: 401 }
      );
    }

    const updatedTaskList = await googleTasksApi.updateTaskList(
      tasklistId,
      { title },
      accessToken
    );
    
    return NextResponse.json({ taskList: updatedTaskList });
  } catch (error: any) {
    console.error('Error updating task list:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to update task list' },
      { status: 500 }
    );
  }
}

// タスクリストを削除
export async function DELETE(
  request: Request,
  { params }: { params: { tasklistId: string } }
) {
  try {
    const { tasklistId } = params;
    
    if (!tasklistId) {
      return NextResponse.json(
        { error: 'Task list ID is required' },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // @ts-ignore - next-authの型定義と実際の挙動の差異
    const accessToken = session.accessToken;
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Missing access token. Please sign in again.' }, 
        { status: 401 }
      );
    }

    await googleTasksApi.deleteTaskList(tasklistId, accessToken);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting task list:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to delete task list' },
      { status: 500 }
    );
  }
} 