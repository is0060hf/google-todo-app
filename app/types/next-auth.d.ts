import "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

/**
 * NextAuth型定義拡張
 */
declare module "next-auth" {
  /**
   * ユーザーオブジェクトの拡張
   */
  interface User extends DefaultUser {
    id: string;
    googleId: string;
    subscriptionPlan: string;
    agreedToTerms: boolean;
    avatarUrl?: string | null;
  }

  /**
   * セッションオブジェクトの拡張
   */
  interface Session extends DefaultSession {
    // 標準のユーザー型をオーバーライド
    user: {
      id: string;
      googleId: string;
      email: string;
      name?: string | null;
      image?: string | null;
      subscriptionPlan: string;
      agreedToTerms: boolean;
    };
    
    // セッションに追加するカスタムプロパティ
    accessToken: string;
    expires: string;
  }
}

/**
 * JWT型定義拡張
 */
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    googleId: string;
    email: string;
    name?: string | null;
    picture?: string | null;
    sub: string;
    accessToken: string;
    subscriptionPlan: string;
    agreedToTerms: boolean;
    exp: number;
    iat: number;
  }
} 