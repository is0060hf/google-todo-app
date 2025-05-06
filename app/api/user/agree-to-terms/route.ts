import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';

export async function POST() {
  try {
    // ユーザーのセッションを取得
    const session = await getServerSession(authOptions);
    
    // 認証されていない場合は401エラー
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // ユーザーの利用規約同意フラグを更新
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { agreedToTerms: true },
    });
    
    // 成功レスポンス
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating terms agreement:', error);
    
    // エラーレスポンス
    return NextResponse.json(
      { error: 'Failed to update terms agreement' },
      { status: 500 }
    );
  }
} 