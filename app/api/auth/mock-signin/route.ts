import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

/**
 * テスト用のモックログインAPI
 * このAPIはテスト環境でのみ利用可能で、実際の認証なしでログイン状態をシミュレートします
 */
export async function POST(request: Request) {
  // 開発環境またはテスト環境でのみ動作可能にする
  if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
    return NextResponse.json(
      { error: 'This endpoint is only available in test or development environment' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { email, name, image, id } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // テスト用のモックセッションデータを作成
    const mockSession = {
      user: {
        id: id || 'test-user-id',
        name,
        email,
        image: image || 'https://example.com/avatar.png',
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    // セッションID生成 (next-authと同じ形式に近づける)
    const sessionToken = randomBytes(32).toString('hex');

    // レスポンスオブジェクトを作成
    const response = NextResponse.json({ 
      success: true,
      user: mockSession.user
    });
    
    // セキュアCookieの設定
    // next-authと同じCookie名を使用
    const cookieName = (process.env.NODE_ENV as string) === 'production' 
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token';
      
    response.cookies.set({
      name: cookieName,
      value: sessionToken,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24, // 24時間
      path: '/',
    });
    
    // セッションデータを格納するCookie
    response.cookies.set({
      name: 'next-auth.session-data',
      value: Buffer.from(JSON.stringify(mockSession)).toString('base64'),
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24, // 24時間
      path: '/',
    });
    
    // CallbackURL Cookie設定
    response.cookies.set({
      name: 'next-auth.callback-url',
      value: '/dashboard',
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60, // 1時間
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Mock signin error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
} 