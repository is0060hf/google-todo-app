import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';

// ユーザーアカウント削除API
export async function DELETE(request: Request) {
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

    // ユーザー情報を取得
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // トランザクションでユーザー関連データを削除
    await prisma.$transaction(async (tx) => {
      // タグを削除
      await tx.tag.deleteMany({
        where: { userId }
      });

      // タスクカスタムデータを削除
      await tx.taskCustomData.deleteMany({
        where: { userId }
      });

      // 統計データを削除
      await tx.dailyStats.deleteMany({
        where: { userId }
      });
      
      await tx.weeklyStats.deleteMany({
        where: { userId }
      });
      
      await tx.monthlyStats.deleteMany({
        where: { userId }
      });
      
      await tx.yearlyStats.deleteMany({
        where: { userId }
      });

      // セッションを削除
      await tx.session.deleteMany({
        where: { userId }
      });

      // アカウント情報を削除
      await tx.account.deleteMany({
        where: { userId }
      });

      // ユーザーを削除
      await tx.user.delete({
        where: { id: userId }
      });
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'User account deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting user account:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to delete user account' },
      { status: 500 }
    );
  }
} 