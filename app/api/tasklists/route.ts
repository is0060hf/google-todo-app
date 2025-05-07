import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from '../../../lib/prisma';
import * as googleTasksApi from '../../../lib/api/google-tasks';
import * as optimizedApi from '../../../lib/api/optimized-google-tasks';
import { withCsrfProtection } from '../../../lib/csrf-protection';
import { NextRequest } from 'next/server';

// タスクリスト一覧取得API
export async function GET(request: Request) {
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

    // リクエストヘッダーからIf-None-Matchを取得
    const ifNoneMatch = request.headers.get('If-None-Match');

    // 最適化されたGoogle Tasks APIからタスクリスト一覧を取得
    const result = await optimizedApi.getTaskListsOptimized(accessToken, ifNoneMatch || undefined);
    
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
    const response = NextResponse.json({ taskLists: result.data });
    
    // ETagをレスポンスヘッダーに設定
    if (result.etag) {
      response.headers.set('ETag', result.etag);
      response.headers.set('Cache-Control', 'private, max-age=0, must-revalidate');
    }
    
    return response;
  } catch (error: any) {
    console.error('Error fetching task lists:', error);
    
    // エラーレスポンス
    return NextResponse.json(
      { error: error.message || 'Failed to fetch task lists' },
      { status: 500 }
    );
  }
}

// 新しいタスクリストを作成するAPI（CSRF保護付き）
async function handlePostRequest(request: NextRequest) {
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

    // Google Tasks APIで新しいタスクリストを作成（リトライ機能付き）
    const newTaskList = await optimizedApi.createTaskOptimized(
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

// CSRF保護付きのPOSTエンドポイント
export const POST = withCsrfProtection(handlePostRequest); 