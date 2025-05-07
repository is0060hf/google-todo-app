import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/lib/prisma";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/tasks",
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30日
  },
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 // 30日
      }
    },
    callbackUrl: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    },
    csrfToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Host-' : ''}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  callbacks: {
    async session({ session, user }) {
      // セッションにユーザー情報を追加
      if (session.user) {
        // @ts-ignore - ユーザーIDの追加
        session.user.id = user.id;
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
        });
        if (dbUser) {
          // @ts-ignore - googleIdの追加
          session.user.googleId = dbUser.googleId;
          // @ts-ignore - subscriptionPlanの追加
          session.user.subscriptionPlan = dbUser.subscriptionPlan;
        }

        // アクセストークンをセッションに追加
        const account = await prisma.account.findFirst({
          where: {
            userId: user.id,
            provider: 'google',
          },
          orderBy: {
            expires_at: 'desc',
          },
        });

        if (account) {
          // アクセストークンが期限切れの場合はリフレッシュ
          const isExpired = account.expires_at && account.expires_at < Math.floor(Date.now() / 1000);
          
          if (isExpired && account.refresh_token) {
            try {
              const response = await fetch('https://oauth2.googleapis.com/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                  client_id: process.env.GOOGLE_CLIENT_ID as string,
                  client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
                  grant_type: 'refresh_token',
                  refresh_token: account.refresh_token,
                }),
              });

              const tokens = await response.json();
              
              if (tokens.access_token) {
                // トークン情報を更新
                await prisma.account.update({
                  where: { id: account.id },
                  data: {
                    access_token: tokens.access_token,
                    expires_at: Math.floor(Date.now() / 1000) + (tokens.expires_in || 3599),
                    token_type: tokens.token_type,
                  },
                });
                
                // @ts-ignore - アクセストークンをセッションに追加
                session.accessToken = tokens.access_token;
              }
            } catch (error) {
              console.error('トークンリフレッシュエラー:', error);
            }
          } else {
            // 期限内の場合は既存のトークンを使用
            // @ts-ignore - アクセストークンをセッションに追加
            session.accessToken = account.access_token;
          }
        }
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile?.email) {
        // ユーザーが既に存在するか確認
        const user = await prisma.user.findFirst({
          where: { email: profile.email },
        });

        if (!user) {
          // 新規ユーザーの作成
          await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name || "ユーザー",
              // @ts-ignore - GoogleプロファイルのsubをgoogleIdとして使用
              googleId: profile.sub || "",
              // @ts-ignore - GoogleプロファイルのpictureをavatarUrlとして使用
              avatarUrl: profile.picture || null,
              subscriptionPlan: "FREE",
            },
          });
        }
        return true;
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      // リダイレクト処理
      // 注意: ここでprofileを使おうとしていましたが、
      // redirectコールバックではprofileにアクセスできません
      
      // リダイレクト先の決定
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 