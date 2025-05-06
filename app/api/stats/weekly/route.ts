import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';

// 週次統計データを取得するAPI
export async function GET(request: Request) {
  try {
    // クエリパラメータを取得
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    
    if (!year) {
      return NextResponse.json(
        { error: 'Year is required' },
        { status: 400 }
      );
    }

    // 年の形式検証
    const yearPattern = /^\d{4}$/;
    if (!yearPattern.test(year)) {
      return NextResponse.json(
        { error: 'Invalid year format. Use YYYY' },
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

    // 週次統計データを取得
    const weeklyStats = await prisma.weeklyStats.findMany({
      where: {
        userId,
        year: parseInt(year, 10)
      },
      orderBy: {
        weekOfYear: 'asc'
      }
    });
    
    return NextResponse.json({ weeklyStats });
  } catch (error: any) {
    console.error('Error fetching weekly stats:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to fetch weekly stats' },
      { status: 500 }
    );
  }
} 