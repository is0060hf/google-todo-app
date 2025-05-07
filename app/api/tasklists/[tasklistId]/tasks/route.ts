import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';
import * as googleTasksApi from '@/app/lib/api/google-tasks';
import * as optimizedApi from '@/app/lib/api/optimized-google-tasks';

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

    // URLからクエリパラメータを取得
    const url = new URL(request.url);
    const showCompleted = url.searchParams.get('showCompleted') !== 'false';
    const maxResults = url.searchParams.get('maxResults') 
      ? parseInt(url.searchParams.get('maxResults') || '100', 10)
      : 100;
    const pageToken = url.searchParams.get('pageToken') || undefined;

    // リクエストヘッダーからIf-None-Matchを取得
    const ifNoneMatch = request.headers.get('If-None-Match');

    // 最適化されたGoogle Tasks APIからタスク一覧を取得
    const result = await optimizedApi.getTasksOptimized(
      tasklistId, 
      accessToken, 
      ifNoneMatch || undefined,
      showCompleted,
      maxResults,
      pageToken
    );
    
    // 304 Not Modified の場合
    if (result.notModified) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          'ETag': ifNoneMatch || '',
        },
      });
    }
    
    // 正常レスポンス
    const response = NextResponse.json({ 
      tasks: result.data,
      nextPageToken: result.nextPageToken 
    });
    
    // ETagをレスポンスヘッダーに設定
    if (result.etag) {
      response.headers.set('ETag', result.etag);
      response.headers.set('Cache-Control', 'private, max-age=0, must-revalidate');
    }
    
    return response;
  } catch (error: any) {
    console.error('Error fetching tasks:', error);
    
    // エラーメッセージの最適化
    let errorMessage = error.message || 'Failed to fetch tasks';
    let statusCode = 500;
    
    // エラー種別に基づいた適切なメッセージを提供
    if (error.message.includes('Rate limit exceeded')) {
      errorMessage = 'Google Tasks APIの呼び出し回数制限に達しました。時間をおいて再試行してください。';
      statusCode = 429;
    } else if (error.message.includes('Network Error') || error.message.includes('Failed to fetch')) {
      errorMessage = 'ネットワーク接続に問題があります。インターネット接続を確認してください。';
      statusCode = 503;
    } else if (error.message.includes('404')) {
      errorMessage = '指定されたタスクリストが見つかりません。';
      statusCode = 404;
    } else if (error.message.includes('401') || error.message.includes('403')) {
      errorMessage = '認証エラーが発生しました。再ログインしてください。';
      statusCode = 401;
    }
    
    // エラーレスポンス
    return NextResponse.json(
      { error: errorMessage, code: statusCode },
      { status: statusCode }
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

    // 最適化されたAPIで新しいタスクを作成
    const newTask = await optimizedApi.createTaskOptimized(
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