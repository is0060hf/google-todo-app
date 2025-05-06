import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';

// 年次統計データを取得するAPI
export async function GET(request: Request) {
  try {
    // クエリパラメータを取得
    const { searchParams } = new URL(request.url);
    const startYear = searchParams.get('startYear');
    const endYear = searchParams.get('endYear');
    
    if (!startYear || !endYear) {
      return NextResponse.json(
        { error: 'Start year and end year are required' },
        { status: 400 }
      );
    }

    // 年の形式検証
    const yearPattern = /^\d{4}$/;
    if (!yearPattern.test(startYear) || !yearPattern.test(endYear)) {
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

    // 年次統計データを取得
    const yearlyStats = await prisma.yearlyStats.findMany({
      where: {
        userId,
        year: {
          gte: parseInt(startYear, 10),
          lte: parseInt(endYear, 10)
        }
      },
      orderBy: {
        year: 'asc'
      }
    });
    
    return NextResponse.json({ yearlyStats });
  } catch (error: any) {
    console.error('Error fetching yearly stats:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to fetch yearly stats' },
      { status: 500 }
    );
  }
} 