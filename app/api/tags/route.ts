import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';

// タグ一覧を取得するAPI
export async function GET() {
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

    // ユーザーのタグを取得
    const tags = await prisma.tag.findMany({
      where: { userId },
      orderBy: { name: 'asc' }
    });
    
    return NextResponse.json({ tags });
  } catch (error: any) {
    console.error('Error fetching tags:', error);
    
    // エラーレスポンス
    return NextResponse.json(
      { error: error.message || 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}

// 新しいタグを作成するAPI
export async function POST(request: Request) {
  try {
    // リクエストボディを取得
    const body = await request.json();
    const { name } = body;
    
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Tag name is required' },
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

    // 同名タグの存在確認
    const existingTag = await prisma.tag.findFirst({
      where: {
        name: name.trim(),
        userId
      }
    });

    if (existingTag) {
      return NextResponse.json(
        { error: 'Tag with this name already exists' },
        { status: 409 }
      );
    }

    // 新しいタグを作成
    const newTag = await prisma.tag.create({
      data: {
        name: name.trim(),
        userId
      }
    });
    
    return NextResponse.json({ tag: newTag }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating tag:', error);
    
    // エラーレスポンス
    return NextResponse.json(
      { error: error.message || 'Failed to create tag' },
      { status: 500 }
    );
  }
} 