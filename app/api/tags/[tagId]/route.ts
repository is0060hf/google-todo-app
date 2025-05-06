import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';

// 特定のタグを取得するAPI
export async function GET(
  request: Request,
  { params }: { params: { tagId: string } }
) {
  try {
    const { tagId } = params;
    
    if (!tagId) {
      return NextResponse.json(
        { error: 'Tag ID is required' },
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

    // ユーザーのタグを取得
    const tag = await prisma.tag.findFirst({
      where: {
        id: tagId,
        userId // 自分のタグのみアクセス可能
      }
    });
    
    if (!tag) {
      return NextResponse.json({ error: 'Tag not found' }, { status: 404 });
    }
    
    return NextResponse.json({ tag });
  } catch (error: any) {
    console.error('Error fetching tag:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to fetch tag' },
      { status: 500 }
    );
  }
}

// タグを更新するAPI
export async function PATCH(
  request: Request,
  { params }: { params: { tagId: string } }
) {
  try {
    const { tagId } = params;
    
    if (!tagId) {
      return NextResponse.json(
        { error: 'Tag ID is required' },
        { status: 400 }
      );
    }

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

    // タグの存在確認
    const existingTag = await prisma.tag.findFirst({
      where: {
        id: tagId,
        userId
      }
    });

    if (!existingTag) {
      return NextResponse.json({ error: 'Tag not found' }, { status: 404 });
    }

    // 同名タグの存在確認（更新対象以外）
    const duplicateTag = await prisma.tag.findFirst({
      where: {
        name: name.trim(),
        userId,
        id: { not: tagId }
      }
    });

    if (duplicateTag) {
      return NextResponse.json(
        { error: 'Another tag with this name already exists' },
        { status: 409 }
      );
    }

    // タグを更新
    const updatedTag = await prisma.tag.update({
      where: { id: tagId },
      data: { name: name.trim() }
    });
    
    return NextResponse.json({ tag: updatedTag });
  } catch (error: any) {
    console.error('Error updating tag:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to update tag' },
      { status: 500 }
    );
  }
}

// タグを削除するAPI
export async function DELETE(
  request: Request,
  { params }: { params: { tagId: string } }
) {
  try {
    const { tagId } = params;
    
    if (!tagId) {
      return NextResponse.json(
        { error: 'Tag ID is required' },
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

    // タグの存在確認
    const existingTag = await prisma.tag.findFirst({
      where: {
        id: tagId,
        userId
      }
    });

    if (!existingTag) {
      return NextResponse.json({ error: 'Tag not found' }, { status: 404 });
    }

    // タグを削除
    await prisma.tag.delete({
      where: { id: tagId }
    });
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting tag:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to delete tag' },
      { status: 500 }
    );
  }
} 