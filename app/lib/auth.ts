'use server';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Session } from 'next-auth';
import { prisma } from './prisma';

type SessionWithProps = Session & {
  user: {
    id: string;
    googleId: string;
    email: string;
    name?: string | null;
    subscriptionPlan: string;
    agreedToTerms: boolean;
  };
  accessToken: string;
};

/**
 * セッションを取得し、認証済みかどうかを確認する
 * @returns セッション情報または認証エラーレスポンス
 */
export async function getAuthSession() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return { 
      error: true, 
      response: NextResponse.json(
        { error: '認証が必要です' }, 
        { status: 401 }
      ) 
    };
  }
  
  // セッションを拡張された型として扱う
  const sessionWithProps = session as SessionWithProps;
  return { session: sessionWithProps, error: false };
}

/**
 * アクセストークンがセッションに存在するか確認する
 * @param session 認証セッション
 * @returns アクセストークンまたはエラーレスポンス
 */
export async function validateAccessToken(session: SessionWithProps) {
  if (!session.accessToken) {
    return { 
      error: true, 
      response: NextResponse.json(
        { error: 'アクセストークンが見つかりません。再度ログインしてください。' }, 
        { status: 401 }
      ) 
    };
  }
  
  return { accessToken: session.accessToken, error: false };
}

/**
 * リソースへのアクセス権限を確認する
 * @param userId ユーザーID
 * @param resourceType リソースの種類 (tag, task, tasklist など)
 * @param resourceId リソースID
 * @returns 権限があるかどうかとエラーレスポンス
 */
export async function checkResourcePermission(
  userId: string,
  resourceType: 'tag' | 'taskCustomData',
  resourceId: string
) {
  try {
    let hasPermission = false;
    
    // リソースタイプに応じた所有権チェック
    if (resourceType === 'tag') {
      const tag = await prisma.tag.findUnique({
        where: { id: resourceId },
      });
      
      hasPermission = tag?.userId === userId;
    } 
    else if (resourceType === 'taskCustomData') {
      const customData = await prisma.taskCustomData.findUnique({
        where: { id: resourceId },
      });
      
      hasPermission = customData?.userId === userId;
    }
    
    if (!hasPermission) {
      return { 
        error: true, 
        response: NextResponse.json(
          { error: 'このリソースへのアクセス権限がありません' }, 
          { status: 403 }
        ) 
      };
    }
    
    return { error: false };
  } catch (error) {
    console.error('リソース権限チェックエラー:', error);
    return { 
      error: true, 
      response: NextResponse.json(
        { error: 'リソース権限の確認中にエラーが発生しました' }, 
        { status: 500 }
      ) 
    };
  }
}

/**
 * サブスクリプションプランに基づいて機能へのアクセス可否を判定する
 * @param session 認証セッション
 * @param requiredPlan 必要なプラン ("FREE" | "PREMIUM")
 * @returns アクセス可否とエラーレスポンス
 */
export async function checkSubscriptionAccess(
  session: SessionWithProps,
  requiredPlan: "FREE" | "PREMIUM"
) {
  // サブスクリプションプランの確認
  const userPlan = session.user.subscriptionPlan || "FREE";
  
  // プランに応じたアクセス制御
  // 現状はPREMIUMプランが必要な機能の場合のみチェック
  if (requiredPlan === "PREMIUM" && userPlan !== "PREMIUM") {
    return {
      error: true,
      response: NextResponse.json(
        { 
          error: 'この機能にはプレミアムプランへのアップグレードが必要です',
          requiredPlan: "PREMIUM" 
        },
        { status: 403 }
      )
    };
  }
  
  return { error: false };
}

/**
 * 利用規約への同意状態を確認する
 * @param session 認証セッション
 * @returns 同意状態とエラーレスポンス
 */
export async function checkTermsAgreement(session: SessionWithProps) {
  if (!session.user.agreedToTerms) {
    return {
      error: true,
      response: NextResponse.json(
        { error: '利用規約への同意が必要です' },
        { status: 403 }
      )
    };
  }
  
  return { error: false };
}

/**
 * APIリクエストに対する認証と認可を行う統合ハンドラー
 * @param request APIリクエスト
 * @param options オプション設定
 * @returns 認証・認可情報またはエラーレスポンス
 */
export async function authorizeApiRequest(
  request: NextRequest,
  options?: {
    checkTerms?: boolean;
    requiredPlan?: "FREE" | "PREMIUM";
    resourceCheck?: {
      type: 'tag' | 'taskCustomData';
      id: string;
    };
  }
) {
  // セッション情報の取得
  const sessionResult = await getAuthSession();
  if (sessionResult.error) {
    return { error: true, response: sessionResult.response };
  }
  
  const { session } = sessionResult;
  
  // アクセストークンの検証
  const tokenResult = await validateAccessToken(session);
  if (tokenResult.error) {
    return { error: true, response: tokenResult.response };
  }
  
  // 利用規約同意の確認（必要な場合）
  if (options?.checkTerms) {
    const termsResult = await checkTermsAgreement(session);
    if (termsResult.error) {
      return { error: true, response: termsResult.response };
    }
  }
  
  // サブスクリプションプランのチェック（必要な場合）
  if (options?.requiredPlan) {
    const subscriptionResult = await checkSubscriptionAccess(session, options.requiredPlan);
    if (subscriptionResult.error) {
      return { error: true, response: subscriptionResult.response };
    }
  }
  
  // リソースアクセス権限のチェック（必要な場合）
  if (options?.resourceCheck) {
    const permissionResult = await checkResourcePermission(
      session.user.id,
      options.resourceCheck.type,
      options.resourceCheck.id
    );
    if (permissionResult.error) {
      return { error: true, response: permissionResult.response };
    }
  }
  
  // すべての認証・認可チェックに通過
  return { 
    authorized: true, 
    session, 
    accessToken: tokenResult.accessToken,
    error: false
  };
} 