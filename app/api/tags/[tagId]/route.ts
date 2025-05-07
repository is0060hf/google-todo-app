import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { authorizeApiRequest } from '@/app/lib/auth';

// 特定のタグを取得するAPI
export async function GET(
  request: NextRequest,
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

    // 認証・認可チェック - タグリソースへのアクセス権限を確認
    const authResult = await authorizeApiRequest(request, {
      resourceCheck: {
        type: 'tag',
        id: tagId
      }
    });
    
    if (authResult.error) {
      return authResult.response;
    }

    const { session } = authResult;

    // ユーザーのタグを取得
    const tag = await prisma.tag.findUnique({
      where: { id: tagId }
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
  request: NextRequest,
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

    // 認証・認可チェック - タグリソースへのアクセス権限を確認
    const authResult = await authorizeApiRequest(request, {
      resourceCheck: {
        type: 'tag',
        id: tagId
      }
    });
    
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
  request: NextRequest,
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

    // 認証・認可チェック - タグリソースへのアクセス権限を確認
    const authResult = await authorizeApiRequest(request, {
      resourceCheck: {
        type: 'tag',
        id: tagId
      }
    });
    
    if (authResult.error) {
      return authResult.response;
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