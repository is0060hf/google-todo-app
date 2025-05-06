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