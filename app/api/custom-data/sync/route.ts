import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../api/auth/[...nextauth]/route';
import { syncTasksCustomData } from '../../../lib/sync-tasks-custom-data';

/**
 * Google Tasksデータとカスタムデータの同期を行うAPI
 * @returns 同期結果
 */
export async function POST() {
  try {
    // 認証情報の取得
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // カスタムデータの同期処理
    const syncResult = await syncTasksCustomData();
    
    if (!syncResult.success) {
      return NextResponse.json(
        { error: syncResult.error || '同期に失敗しました' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: '同期が完了しました',
      deletedCount: syncResult.deletedCount,
    });
  } catch (error: any) {
    console.error('Data sync error:', error);
    
    return NextResponse.json(
      { error: error.message || '同期処理中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 