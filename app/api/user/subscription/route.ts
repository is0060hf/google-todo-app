import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';

// サブスクリプションプラン更新API
export async function POST(request: Request) {
  try {
    // リクエストボディを取得
    const body = await request.json();
    const { plan } = body;
    
    // プラン情報の検証
    if (!plan || typeof plan !== 'string') {
      return NextResponse.json(
        { error: 'Plan is required' },
        { status: 400 }
      );
    }

    // プランの種類をチェック
    if (plan !== 'FREE' && plan !== 'PREMIUM') {
      return NextResponse.json(
        { error: 'Invalid plan type. Must be FREE or PREMIUM' },
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

    // ユーザー情報を取得
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        subscriptionPlan: true
      }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 既に同じプランの場合は更新しない
    if (user.subscriptionPlan === plan) {
      return NextResponse.json({
        success: true,
        message: `User is already on ${plan} plan`,
        subscriptionPlan: plan,
        changed: false
      });
    }

    // ユーザーのサブスクリプションプランを更新
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { subscriptionPlan: plan },
      select: {
        id: true,
        subscriptionPlan: true,
        updatedAt: true
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: `Successfully upgraded to ${plan} plan`,
      subscriptionPlan: updatedUser.subscriptionPlan,
      updatedAt: updatedUser.updatedAt,
      changed: true
    });
  } catch (error: any) {
    console.error('Error updating subscription plan:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to update subscription plan' },
      { status: 500 }
    );
  }
} 