import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';

// タスクの独自データを取得
export async function GET(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params;
    
    if (!taskId) {
      return NextResponse.json(
        { error: 'Task ID is required' },
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

    // タスクの独自データを取得
    const taskCustomData = await prisma.taskCustomData.findFirst({
      where: {
        googleTaskId: taskId,
        userId
      },
      include: {
        priority: true,
        tags: true
      }
    });
    
    if (!taskCustomData) {
      return NextResponse.json(
        { error: 'Custom data not found for this task' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ customData: taskCustomData });
  } catch (error: any) {
    console.error('Error fetching task custom data:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to fetch task custom data' },
      { status: 500 }
    );
  }
}

// タスクの独自データを新規作成または更新
export async function PUT(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params;
    
    if (!taskId) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      );
    }

    // リクエストボディを取得
    const body = await request.json();
    const { priorityId, tagIds } = body;
    
    // 優先度IDを数値に変換
    const priorityIdNumber = priorityId ? parseInt(priorityId, 10) : null;
    
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

    // 優先度の存在チェック（指定されている場合）
    if (priorityIdNumber) {
      const priority = await prisma.priority.findUnique({
        where: { id: priorityIdNumber }
      });
      
      if (!priority) {
        return NextResponse.json(
          { error: 'Invalid priority ID' },
          { status: 400 }
        );
      }
    }

    // タグの存在チェック（指定されている場合）
    if (tagIds && Array.isArray(tagIds) && tagIds.length > 0) {
      const userTags = await prisma.tag.findMany({
        where: {
          id: { in: tagIds },
          userId
        }
      });
      
      if (userTags.length !== tagIds.length) {
        return NextResponse.json(
          { error: 'One or more tag IDs are invalid or do not belong to the user' },
          { status: 400 }
        );
      }
    }

    // タスクの独自データを取得または作成
    const existingCustomData = await prisma.taskCustomData.findFirst({
      where: {
        googleTaskId: taskId,
        userId
      }
    });

    let taskCustomData;
    
    if (existingCustomData) {
      // 既存データを更新
      taskCustomData = await prisma.taskCustomData.update({
        where: { id: existingCustomData.id },
        data: {
          priorityId: priorityIdNumber,
          tags: tagIds ? {
            set: tagIds.map(id => ({ id }))
          } : undefined
        },
        include: {
          priority: true,
          tags: true
        }
      });
    } else {
      // 新規データを作成
      taskCustomData = await prisma.taskCustomData.create({
        data: {
          googleTaskId: taskId,
          userId,
          priorityId: priorityIdNumber,
          tags: tagIds && tagIds.length > 0 ? {
            connect: tagIds.map(id => ({ id }))
          } : undefined
        },
        include: {
          priority: true,
          tags: true
        }
      });
    }
    
    return NextResponse.json({ customData: taskCustomData });
  } catch (error: any) {
    console.error('Error updating task custom data:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to update task custom data' },
      { status: 500 }
    );
  }
}

// タスクの独自データを削除
export async function DELETE(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params;
    
    if (!taskId) {
      return NextResponse.json(
        { error: 'Task ID is required' },
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

    // タスクの独自データを検索
    const customData = await prisma.taskCustomData.findFirst({
      where: {
        googleTaskId: taskId,
        userId
      }
    });
    
    if (!customData) {
      return NextResponse.json(
        { error: 'Custom data not found for this task' },
        { status: 404 }
      );
    }

    // 独自データを削除
    await prisma.taskCustomData.delete({
      where: { id: customData.id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting task custom data:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to delete task custom data' },
      { status: 500 }
    );
  }
} 