'use server';

import crypto from 'crypto';

// 環境変数から暗号化キーを取得（必ず32バイト長のキーが必要）
const ENCRYPTION_KEY = process.env.TOKEN_ENCRYPTION_KEY || generateFallbackKey();
const ALGORITHM = 'aes-256-gcm';

/**
 * フォールバック用の暗号化キーを生成（開発環境・テスト環境用）
 * 注意: 本番環境では必ず環境変数に適切な暗号化キーを設定すること
 */
function generateFallbackKey(): string {
  if (process.env.NODE_ENV === 'production') {
    console.error('警告: 本番環境で暗号化キーが設定されていません。これはセキュリティリスクです。');
  }
  // 開発環境用の一時的なキー
  return crypto.randomBytes(32).toString('hex').slice(0, 32);
}

/**
 * トークンを暗号化する
 * @param text 暗号化するテキスト（トークン）
 * @returns 暗号化されたテキスト、初期化ベクトル、認証タグを含むオブジェクト
 */
export function encryptToken(text: string): { encryptedData: string; iv: string; authTag: string } {
  try {
    // ランダムな初期化ベクトルを生成（AES-GCMでは12バイトが推奨）
    const iv = crypto.randomBytes(12);
    
    // 暗号化器を作成
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
    
    // テキストを暗号化
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // 認証タグを取得（AES-GCMの重要な部分、改ざん検出に使用）
    const authTag = cipher.getAuthTag().toString('hex');
    
    return {
      encryptedData: encrypted,
      iv: iv.toString('hex'),
      authTag: authTag
    };
  } catch (error) {
    console.error('トークン暗号化エラー:', error);
    throw new Error('トークンの暗号化に失敗しました');
  }
}

/**
 * 暗号化されたトークンを復号する
 * @param encryptedData 暗号化されたデータ
 * @param iv 初期化ベクトル（16進数文字列）
 * @param authTag 認証タグ（16進数文字列）
 * @returns 復号されたトークン
 */
export function decryptToken(encryptedData: string, iv: string, authTag: string): string {
  try {
    // 復号器を作成
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      Buffer.from(ENCRYPTION_KEY),
      Buffer.from(iv, 'hex')
    );
    
    // 認証タグを設定
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    
    // データを復号
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('トークン復号エラー:', error);
    throw new Error('トークンの復号に失敗しました');
  }
}

/**
 * リフレッシュトークンを安全に保存するための形式に変換
 */
export function secureToken(token: string): {
  token: string;
  iv: string;
  authTag: string;
} {
  const { encryptedData, iv, authTag } = encryptToken(token);
  return {
    token: encryptedData,
    iv,
    authTag
  };
}

/**
 * 安全に保存された形式からリフレッシュトークンを復元
 */
export function restoreToken(securedToken: { token: string; iv: string; authTag: string }): string {
  return decryptToken(securedToken.token, securedToken.iv, securedToken.authTag);
} 