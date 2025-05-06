import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { updateStatsData, StatsAction } from '@/app/lib/stats-utils';

/**
 * 統計データ更新API - POSTリクエストで統計データを更新
 * 
 * リクエストボディ:
 * {
 *   action: 'created' | 'completed',
 *   date?: string // 任意、指定がない場合は現在日時を使用
 * }
 */
export async function POST(request: Request) {
  try {
    // セッションからユーザー情報を取得
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // @ts-ignore - next-authの型定義と実際の挙動の差異
    const userId = session.user.id;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID not found in session' }, 
        { status: 401 }
      );
    }
    
    // リクエストボディからデータを取得
    const body = await request.json();
    const { action, date } = body;
    
    // バリデーション
    if (!action || (action !== 'created' && action !== 'completed')) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "created" or "completed"' },
        { status: 400 }
      );
    }
    
    // 日付の設定（指定がなければ現在日時を使用）
    const targetDate = date ? new Date(date) : new Date();
    
    // 日付のバリデーション
    if (isNaN(targetDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }
    
    // 統計データを更新
    const result = await updateStatsData(userId, targetDate, action as StatsAction);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to update stats data' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error updating stats:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to update stats' },
      { status: 500 }
    );
  }
} 