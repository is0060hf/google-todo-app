import { NextResponse } from 'next/server';

/**
 * Google APIキーが設定されているかを確認するAPI
 * 
 * @note セキュリティのため、実際のAPIキーの値は表示しません
 * @returns APIキーの設定状況を返す
 */
export async function GET() {
  const apiKey = process.env.GOOGLE_API_KEY;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  
  // セキュリティのため、キーの存在確認のみを行う
  return NextResponse.json({
    googleApiKey: apiKey ? 'APIキーが設定されています' : 'APIキーが設定されていません',
    googleClientId: clientId ? 'クライアントIDが設定されています' : 'クライアントIDが設定されていません',
    googleClientSecret: clientSecret ? 'クライアントシークレットが設定されています' : 'クライアントシークレットが設定されていません',
  });
} 