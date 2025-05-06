import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';

// 優先度一覧を取得するAPI
export async function GET() {
  try {
    // セッションからユーザー情報を取得
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 優先度の一覧を取得（レベルの降順）
    const priorities = await prisma.priority.findMany({
      orderBy: { level: 'desc' }
    });
    
    return NextResponse.json({ priorities });
  } catch (error: any) {
    console.error('Error fetching priorities:', error);
    
    // エラーレスポンス
    return NextResponse.json(
      { error: error.message || 'Failed to fetch priorities' },
      { status: 500 }
    );
  }
} 