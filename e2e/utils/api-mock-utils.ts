import { Page } from '@playwright/test';
import { loadTestData } from './test-utils';

/**
 * Google Tasks API応答とアプリケーションモデルの整合性を確保したAPIモックを設定
 */
export async function setupGoogleTasksApiMocks(page: Page) {
  const testData = loadTestData();
  
  // Google Tasks APIの応答フォーマットに変換
  const googleTaskLists = testData.taskLists.map(list => ({
    kind: 'tasks#taskList',
    id: list.id,
    etag: list.etag,
    title: list.title,
    updated: list.updated,
    selfLink: `https://www.googleapis.com/tasks/v1/users/@me/lists/${list.id}`
  }));
  
  const googleTasks = testData.tasks.map(task => ({
    kind: 'tasks#task',
    id: task.id,
    etag: task.etag,
    title: task.title,
    updated: task.updated,
    selfLink: `https://www.googleapis.com/tasks/v1/lists/${task.taskListId}/tasks/${task.id}`,
    position: task.position,
    notes: task.notes,
    status: task.status,
    due: task.due,
    completed: task.completed,
    deleted: false,
    hidden: false,
    parent: task.parent || undefined,
    links: []
  }));
  
  // Google Tasks API (tasklists.list) をモック
  await page.route('**/googleapis.com/tasks/v1/users/@me/lists', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        kind: 'tasks#taskLists',
        etag: '"etag_tasklists"',
        items: googleTaskLists
      }),
    });
  });
  
  // Google Tasks API (tasks.list) をモック
  await page.route('**/googleapis.com/tasks/v1/lists/*/tasks', async (route) => {
    const url = route.request().url();
    const listId = url.match(/lists\/([^\/]+)\/tasks/)?.[1];
    const filteredTasks = googleTasks.filter(task => task.selfLink.includes(`lists/${listId}/`));
    
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        kind: 'tasks#tasks',
        etag: '"etag_tasks"',
        items: filteredTasks
      }),
    });
  });
  
  // APIリクエストにetagが含まれている場合の処理をモック
  await page.route('**/api/tasklists*', async (route) => {
    const request = route.request();
    const headers = request.headers();
    const isEtagRequest = headers['if-none-match'] !== undefined;
    
    // 変更なしを示すetagの値（実際のアプリケーションコードと整合させる必要あり）
    const currentEtags = {
      'list1': '"etag_list1"',
      'list2': '"etag_list2"',
      'list3': '"etag_list3"'
    };
    
    // urlからリストIDを抽出
    const url = request.url();
    const listIdMatch = url.match(/\/api\/tasklists\/([^\/]+)/);
    const listId = listIdMatch ? listIdMatch[1] : null;
    
    if (isEtagRequest && listId && headers['if-none-match'] === currentEtags[listId]) {
      // etagが一致する場合は304を返す
      await route.fulfill({
        status: 304,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Not Modified' }),
      });
    } else {
      // 通常のリクエスト処理を継続
      await route.continue();
    }
  });
}

/**
 * エラーハンドリングと再試行機能のテスト用モック
 */
export async function setupErrorHandlingMocks(page: Page) {
  // 再試行が必要なAPIエラーをシミュレート
  let retryCount = 0;
  await page.route('**/api/tasklists/retry-test/tasks', async (route) => {
    retryCount++;
    if (retryCount <= 2) {
      // 最初の2回は失敗（429 Too Many Requests - レート制限）
      await route.fulfill({
        status: 429,
        contentType: 'application/json',
        headers: {
          'Retry-After': '1',
        },
        body: JSON.stringify({
          error: 'Rate limit exceeded',
          retryAfter: 1
        }),
      });
    } else {
      // 3回目以降は成功
      const testData = loadTestData();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ tasks: testData.tasks }),
      });
    }
  });
  
  // タイムアウトをシミュレート
  await page.route('**/api/tasklists/timeout-test/**', async (route) => {
    // 応答を10秒遅延させる
    await new Promise(resolve => setTimeout(resolve, 10000));
    await route.fulfill({
      status: 408,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Request Timeout' }),
    });
  });
  
  // 認証エラーをシミュレート
  await page.route('**/api/tasklists/auth-error/**', async (route) => {
    await route.fulfill({
      status: 401,
      contentType: 'application/json',
      body: JSON.stringify({ 
        error: 'Unauthorized',
        message: 'Invalid authentication credentials'
      }),
    });
  });
  
  // Google API Quotaエラーをシミュレート
  await page.route('**/api/tasklists/quota-error/**', async (route) => {
    await route.fulfill({
      status: 429,
      contentType: 'application/json',
      body: JSON.stringify({ 
        error: {
          code: 429,
          message: "Quota exceeded for quota metric 'Queries' and limit 'Queries per minute per user' of service 'tasks.googleapis.com'",
          status: "RESOURCE_EXHAUSTED"
        }
      }),
    });
  });
}

/**
 * etag対応とキャッシュ検証テスト用関数
 */
export async function testEtagCaching(page: Page) {
  // リクエスト履歴追跡用の配列
  const requests = [];
  
  // リクエストをインターセプトして記録
  await page.route('**/api/tasklists/**', async (route) => {
    const request = route.request();
    requests.push({
      url: request.url(),
      method: request.method(),
      headers: request.headers()
    });
    await route.continue();
  });
  
  // リソースを複数回取得してetagベースのキャッシュが機能しているか確認
  await page.goto('/tasks');
  await page.reload();
  
  // 最初のリクエスト以降、If-None-Matchヘッダーが設定されているか確認
  const etagRequests = requests.filter(req => 
    req.url.includes('/api/tasklists') && 
    req.headers['if-none-match'] !== undefined
  );
  
  return {
    hasEtagRequests: etagRequests.length > 0,
    requests: requests,
    etagRequests: etagRequests
  };
}

/**
 * API応答のモックデータをカスタマイズ
 */
export async function setMockApiResponse(page: Page, path: string, responseData: any, statusCode: number = 200) {
  await page.route(path, async (route) => {
    await route.fulfill({
      status: statusCode,
      contentType: 'application/json',
      body: JSON.stringify(responseData),
    });
  });
} 