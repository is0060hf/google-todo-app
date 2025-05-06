import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';

// 利用規約同意状態更新API
export async function POST(request: Request) {
  try {
    // リクエストボディを取得
    const body = await request.json();
    const { agreed } = body;
    
    // 同意状態の検証
    if (typeof agreed !== 'boolean') {
      return NextResponse.json(
        { error: 'Agreed parameter must be a boolean' },
        { status: 400 }
      );
    }

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

    // ユーザーの同意状態を更新
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { agreedToTerms: agreed },
      select: {
        id: true,
        agreedToTerms: true,
        updatedAt: true
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      agreedToTerms: updatedUser.agreedToTerms,
      updatedAt: updatedUser.updatedAt
    });
  } catch (error: any) {
    console.error('Error updating agreement to terms:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to update agreement to terms' },
      { status: 500 }
    );
  }
} 