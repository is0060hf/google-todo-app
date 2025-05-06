import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// 認証をチェックせずにアクセスできるパス
const publicPaths = [
  '/auth/signin',
  '/auth/error',
  '/api/auth',
  '/terms-agreement',
  '/_next',
  '/favicon.ico',
];

export async function middleware(request: NextRequest) {
  // パスの確認
  const path = request.nextUrl.pathname;
  
  // 公開パスはスキップ
  if (publicPaths.some(publicPath => path.startsWith(publicPath))) {
    return NextResponse.next();
  }

  // JWT(セッショントークン)の取得
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 認証されていない場合はサインインページにリダイレクト
  if (!token) {
    const url = new URL('/auth/signin', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // ユーザーが利用規約に同意しているかどうかを確認
  // 注意: middlewareからデータベースに直接アクセスできないため、
  // トークンに追加情報が含まれていると仮定しています。
  // より良い方法は、アプリケーションレベルでこのチェックを行うことです。
  
  // 例として、トークンに `agreedToTerms` が含まれていない場合は
  // 利用規約同意ページにリダイレクト
  if (path !== '/terms-agreement' && token.agreedToTerms !== true) {
    return NextResponse.redirect(new URL('/terms-agreement', request.url));
  }

  return NextResponse.next();
}

// アプリのすべてのルートに対してミドルウェアを適用
export const config = {
  matcher: [
    // 認証ルートは除外
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}; 