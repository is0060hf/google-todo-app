import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * テスト用のセッション情報取得API
 * next-authのセッションAPIと同様の動作をするが、テスト環境で使用できるように拡張
 */
export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    
    // 本番用のセッショントークン名
    const prodSessionToken = cookieStore.get('__Secure-next-auth.session-token');
    // 開発用のセッショントークン名
    const devSessionToken = cookieStore.get('next-auth.session-token');
    // セッションデータ用のCookie
    const sessionDataCookie = cookieStore.get('next-auth.session-data');
    
    // セッションが存在しない場合は空を返す
    if (!prodSessionToken && !devSessionToken && !sessionDataCookie) {
      return NextResponse.json({});
    }
    
    // モックセッションデータがある場合はそれを返す
    if (sessionDataCookie) {
      try {
        const sessionData = JSON.parse(Buffer.from(sessionDataCookie.value, 'base64').toString());
        return NextResponse.json(sessionData);
      } catch (e) {
        console.error('Failed to parse session data:', e);
      }
    }
    
    // next-authのセッションデータが存在する場合はそれをそのまま返す
    // 実際のnext-authの実装ではこの部分はもっと複雑ですが、
    // テスト用に簡略化しています
    
    if (prodSessionToken || devSessionToken) {
      // 通常はここでセッションストアからセッション情報を取得する
      // テスト環境では最低限のセッション情報を返す
      return NextResponse.json({
        user: {
          name: 'Test User',
          email: 'test@example.com',
        },
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });
    }
    
    // それ以外の場合は空のオブジェクトを返す
    return NextResponse.json({});
  } catch (error) {
    console.error('Session API error:', error);
    return NextResponse.json({}, { status: 500 });
  }
} 