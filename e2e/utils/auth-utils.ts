import { Page } from '@playwright/test';
import { loadTestData } from './test-utils';

/**
 * テスト用の認証ユーティリティ関数
 */

/**
 * モックGoogleログイン処理を行う
 * APIを直接呼び出してセッションを設定
 */
export async function mockGoogleLogin(page: Page, email: string = 'test@example.com', name: string = 'Test User') {
  const userData = loadTestData().user || { 
    email, 
    name, 
    image: 'https://example.com/avatar.png', 
    id: 'user_123456' 
  };
  
  try {
    // 既存のセッションをクリア
    await clearAuthSession(page);
    
    console.log('Attempting mock login with user data:', userData);
    
    // APIを直接呼び出してモックセッションを設定
    const response = await page.request.post('/api/auth/mock-signin', {
      data: { 
        email: userData.email, 
        name: userData.name, 
        image: userData.image,
        id: userData.id
      }
    });
    
    if (!response.ok()) {
      const errorText = await response.text();
      throw new Error(`Failed to mock login: ${response.status()} ${response.statusText()}, Response: ${errorText}`);
    }
    
    // セッションのリロードを促すために、新しいページを読み込む
    await page.goto('/');
    
    // CSRFトークンを設定
    await setupCsrfToken(page);
    
    // セッションAPIを呼び出してセッション状態を確認
    const sessionResponse = await page.request.get('/api/auth/session');
    const sessionData = await sessionResponse.json();
    
    console.log('Session after login:', sessionData);
    
    if (!sessionData.user) {
      throw new Error('Failed to establish session: No user data in session response');
    }
    
    // ダッシュボードページに移動して認証状態をテスト
    await page.goto('/dashboard');
    
    // ページ内容を確認
    const content = await page.content();
    console.log('Dashboard page title present:', content.includes('Google TODO連携アプリ'));
  } catch (error) {
    console.error('Mock login failed:', error);
    throw error;
  }
}

/**
 * ログアウト処理を行う
 */
export async function logout(page: Page) {
  try {
    // ヘッダーのユーザーアイコン（アバター）をクリック
    await page.click('header .MuiAvatar-root');
    // ログアウトメニューをクリック
    await page.click('text=ログアウト');
    // ログイン画面への遷移を待機
    await page.waitForURL('**/auth/signin');
    
    // ログアウト後のセッション状態を確認
    const isSignInPageVisible = await page.isVisible('text=サインイン');
    if (!isSignInPageVisible) {
      throw new Error('Failed to logout: Sign in page not visible');
    }
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
}

/**
 * 認証状態のセッションを設定する
 * APIを直接呼び出してセッションを設定
 */
export async function setupAuthSession(page: Page, role: 'user' | 'admin' = 'user') {
  const userData = loadTestData().user || { 
    email: 'test@example.com', 
    name: 'Test User', 
    image: 'https://example.com/avatar.png', 
    id: 'user_123456' 
  };
  
  try {
    // 権限に応じたユーザーデータを設定
    const userDataWithRole = {
      ...userData,
      role: role
    };
    
    // APIを直接呼び出してモックセッションを設定
    const response = await page.request.post('/api/auth/mock-signin', {
      data: userDataWithRole
    });
    
    if (!response.ok()) {
      throw new Error(`Failed to set up auth session: ${response.statusText()}`);
    }
    
    // CSRFトークンを取得
    await setupCsrfToken(page);
  } catch (error) {
    console.error('Auth session setup failed:', error);
    throw error;
  }
}

/**
 * CSRFトークンを設定する
 */
export async function setupCsrfToken(page: Page) {
  try {
    // CSRF APIからトークンを取得
    const csrfResponse = await page.request.get('/api/auth/csrf');
    const csrfData = await csrfResponse.json();
    
    if (csrfData.csrfToken) {
      // CSRFトークンを保存（必要に応じてリクエストに含める）
      try {
        await page.evaluate((token) => {
          try {
            window.localStorage.setItem('csrfToken', token);
          } catch (e) {
            console.warn('Failed to set csrfToken in localStorage:', e);
            // エラーが発生しても処理を続行
          }
        }, csrfData.csrfToken);
      } catch (storageError) {
        console.warn('Failed to access localStorage for CSRF token:', storageError);
        // ストレージアクセスエラーを無視して処理を継続
      }
    }
  } catch (error) {
    console.error('Failed to setup CSRF token:', error);
    // エラーを無視して処理を継続
  }
}

/**
 * 認証Cookieを確認する
 */
export async function verifyAuthCookies(page: Page) {
  const cookies = await page.context().cookies();
  const sessionCookie = cookies.find(cookie => 
    cookie.name === 'next-auth.session-token' || 
    cookie.name === '__Secure-next-auth.session-token'
  );
  
  if (!sessionCookie) {
    throw new Error('Authentication failed: Session cookie not found');
  }
}

/**
 * 認証状態をクリアする
 */
export async function clearAuthSession(page: Page) {
  try {
    // Cookieをクリア
    await page.context().clearCookies();
    
    // LocalStorageもクリア
    try {
      await page.evaluate(() => {
        try {
          window.localStorage.clear();
          window.sessionStorage.clear();
        } catch (e) {
          console.warn('Failed to clear localStorage/sessionStorage:', e);
          // エラーが発生しても処理を続行
        }
      });
    } catch (storageError) {
      console.warn('Failed to access storage:', storageError);
      // ストレージアクセスエラーを無視して処理を継続
    }
  } catch (error) {
    console.error('Failed to clear auth session:', error);
    // エラーをスローせず、警告のみを出力
    console.warn('Continuing test despite auth session clear error');
  }
}

/**
 * アクセス制限をテストする
 * 指定されたページが保護されていることを確認
 */
export async function testProtectedRoute(page: Page, route: string) {
  // 認証状態をクリア
  await clearAuthSession(page);
  
  // 保護されたルートにアクセス
  await page.goto(route);
  
  // ログインページにリダイレクトされることを確認
  const url = page.url();
  if (!url.includes('/auth/signin')) {
    throw new Error(`Protected route test failed: ${route} did not redirect to login page`);
  }
}

/**
 * CSRFトークンを取得する
 */
export async function getCsrfToken(page: Page): Promise<string | null> {
  try {
    // CSRF APIからトークンを取得
    const csrfResponse = await page.request.get('/api/auth/csrf');
    const csrfData = await csrfResponse.json();
    return csrfData.csrfToken || null;
  } catch (error) {
    console.error('Failed to get CSRF token:', error);
    return null;
  }
} 