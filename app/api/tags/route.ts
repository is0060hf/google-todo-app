import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { authorizeApiRequest } from '@/app/lib/auth';

// タグ一覧を取得するAPI
export async function GET(request: NextRequest) {
  try {
    // 認証・認可チェック
    const authResult = await authorizeApiRequest(request);
    if (authResult.error) {
      return authResult.response;
    }

    const { session } = authResult;
    const userId = session.user.id;

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
export async function POST(request: NextRequest) {
  try {
    // 認証・認可チェック
    const authResult = await authorizeApiRequest(request);
    if (authResult.error) {
      return authResult.response;
    }

    const { session } = authResult;
    const userId = session.user.id;

    // リクエストボディを取得
    const body = await request.json();
    const { name } = body;
    
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Tag name is required' },
        { status: 400 }
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