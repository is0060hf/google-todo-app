import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';

// キャッシュ有効時間（秒）
const CACHE_MAX_AGE = 3600; // 1時間

/**
 * タスクの優先度とタグの分布データを取得するAPI
 * HTTPキャッシュを使用してパフォーマンスを最適化
 */
export async function GET(request: Request) {
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

    // クエリパラメータの取得
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 10; // デフォルトは10件

    // データ量制限（最大50件）
    const actualLimit = Math.min(limit, 50);

    // 優先度の分布を取得
    // インデックスを活用するクエリに最適化
    const priorityDistribution = await prisma.$queryRaw`
      SELECT 
        p.name as name, 
        COUNT(*) as value 
      FROM 
        "TaskCustomData" tcd
      LEFT JOIN 
        "Priority" p ON tcd."priorityId" = p.id
      WHERE 
        tcd."userId" = ${userId}
      GROUP BY 
        p.name, p.level
      ORDER BY 
        p.level DESC NULLS LAST
      LIMIT ${actualLimit}
    `;

    // 優先度が設定されていないタスクの数を取得
    const unsetPriorityCount = await prisma.taskCustomData.count({
      where: {
        userId,
        priorityId: null
      }
    });

    // 優先度分布データを整形
    const formattedPriorityDistribution = [
      ...Array.isArray(priorityDistribution) ? priorityDistribution : [],
      { name: '未設定', value: unsetPriorityCount }
    ].filter(item => item.value > 0);

    // タグの分布を取得（最もよく使われているタグを上位N件）
    const tagDistribution = await prisma.$queryRaw`
      SELECT 
        t.name as name, 
        COUNT(DISTINCT tcd.id) as value 
      FROM 
        "Tag" t
      JOIN 
        "_TaskCustomDataToTag" tcdt ON t.id = tcdt."B"
      JOIN 
        "TaskCustomData" tcd ON tcd.id = tcdt."A"
      WHERE 
        t."userId" = ${userId}
      GROUP BY 
        t.name
      ORDER BY 
        value DESC
      LIMIT ${actualLimit}
    `;

    // タグが設定されていないタスクの数をより効率的に取得
    // サブクエリを使用して一度のクエリで計算
    const untaggedCountResult = await prisma.$queryRaw`
      SELECT 
        (SELECT COUNT(*) FROM "TaskCustomData" WHERE "userId" = ${userId}) 
        - 
        (SELECT COUNT(DISTINCT tcd.id) 
         FROM "TaskCustomData" tcd
         JOIN "_TaskCustomDataToTag" tcdt ON tcd.id = tcdt."A"
         WHERE tcd."userId" = ${userId}) 
        AS untagged_count
    `;
    
    const untaggedCount = untaggedCountResult[0]?.untagged_count || 0;
    
    // タグ分布データを整形
    const formattedTagDistribution = [
      ...Array.isArray(tagDistribution) ? tagDistribution : [],
      untaggedCount > 0 ? { name: 'タグなし', value: untaggedCount } : null
    ].filter(Boolean);

    // レスポンスにキャッシュヘッダーを設定
    const response = NextResponse.json({
      priorityDistribution: formattedPriorityDistribution,
      tagDistribution: formattedTagDistribution
    });
    
    // HTTPキャッシュヘッダーを設定（次の更新までキャッシュ可能）
    response.headers.set('Cache-Control', `max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_MAX_AGE * 2}, stale-while-revalidate=${CACHE_MAX_AGE * 24}`);
    
    return response;
  } catch (error: any) {
    console.error('Error fetching distribution data:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to fetch distribution data' },
      { status: 500 }
    );
  }
} 