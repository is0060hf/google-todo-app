import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';

/**
 * タスクの優先度とタグの分布データを取得するAPI
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

    // 優先度の分布を取得
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

    // タグの分布を取得
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
    `;

    // タグが設定されていないタスクの数を取得（オプション）
    const taggedTasksCount = await prisma.$queryRaw`
      SELECT COUNT(DISTINCT tcd.id) as count
      FROM "TaskCustomData" tcd
      JOIN "_TaskCustomDataToTag" tcdt ON tcd.id = tcdt."A"
      WHERE tcd."userId" = ${userId}
    `;
    
    const totalTasksCount = await prisma.taskCustomData.count({
      where: { userId }
    });
    
    const untaggedCount = totalTasksCount - (taggedTasksCount[0]?.count || 0);
    
    // タグ分布データを整形
    const formattedTagDistribution = [
      ...Array.isArray(tagDistribution) ? tagDistribution : [],
      untaggedCount > 0 ? { name: 'タグなし', value: untaggedCount } : null
    ].filter(Boolean);

    return NextResponse.json({
      priorityDistribution: formattedPriorityDistribution,
      tagDistribution: formattedTagDistribution
    });
  } catch (error: any) {
    console.error('Error fetching distribution data:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to fetch distribution data' },
      { status: 500 }
    );
  }
} 