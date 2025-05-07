import { test, expect } from '@playwright/test';
import { setupAuthSession } from '../utils/auth-utils';

test.describe('エラーハンドリング', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuthSession(page);
  });
  
  test('ネットワークエラー時にエラーメッセージが表示されること', async ({ page }) => {
    // APIリクエストを失敗させるモックを設定
    await page.route('/api/tasklists', async (route) => {
      await route.abort('failed');
    });
    
    // タスク管理ページに移動
    await page.goto('/tasks');
    
    // エラーメッセージが表示されることを確認
    await expect(page.locator('text="エラーが発生しました"')).toBeVisible();
    
    // 再試行ボタンが表示されていることを確認
    await expect(page.locator('button:has-text("再試行")')).toBeVisible();
  });
  
  test('APIエラー時にエラーメッセージが表示されること', async ({ page }) => {
    // APIエラーレスポンスを返すモックを設定
    await page.route('/api/tasklists', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });
    
    // タスク管理ページに移動
    await page.goto('/tasks');
    
    // エラーメッセージが表示されることを確認
    await expect(page.locator('text="エラーが発生しました"')).toBeVisible();
  });
  
  test('ロード中はローディングインディケーターが表示されること', async ({ page }) => {
    // APIレスポンスを遅延させるモックを設定
    await page.route('/api/tasklists', async (route) => {
      // 2秒遅延させる
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          taskLists: [{ id: 'list1', title: 'テストリスト' }]
        }),
      });
    });
    
    // タスク管理ページに移動
    await page.goto('/tasks');
    
    // ローディングインディケーターが表示されることを確認
    await expect(page.locator('.MuiCircularProgress-root')).toBeVisible();
    
    // レスポンスが返ってきたらローディングが消えることを確認
    await expect(page.locator('.MuiCircularProgress-root')).not.toBeVisible({ timeout: 5000 });
    
    // データが表示されることを確認
    await expect(page.locator('text=テストリスト')).toBeVisible();
  });
  
  test('スケルトンローディングが表示されること', async ({ page }) => {
    // APIレスポンスを遅延させるモックを設定
    await page.route('/api/tasklists/*/tasks', async (route) => {
      // 2秒遅延させる
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          tasks: [
            { 
              id: 'task1', 
              title: 'テストタスク', 
              status: 'needsAction',
              due: null,
              parent: null,
              position: '1'
            }
          ]
        }),
      });
    });
    
    // すぐにタスクリストを返すモックを設定
    await page.route('/api/tasklists', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          taskLists: [{ id: 'list1', title: 'テストリスト' }]
        }),
      });
    });
    
    // タスク管理ページに移動
    await page.goto('/tasks');
    
    // タスクリストを選択
    await page.click('text=テストリスト');
    
    // スケルトンローディングが表示されることを確認
    await expect(page.locator('.MuiSkeleton-root')).toBeVisible();
    
    // レスポンスが返ってきたらスケルトンが消えることを確認
    await expect(page.locator('.MuiSkeleton-root')).not.toBeVisible({ timeout: 5000 });
    
    // データが表示されることを確認
    await expect(page.locator('text=テストタスク')).toBeVisible();
  });
  
  test('入力バリデーションエラーが表示されること', async ({ page }) => {
    // タスク保存時にバリデーションエラーを返すモックを設定
    await page.route('**/api/tasklists/*/tasks', (route) => {
      if (route.request().method() === 'POST') {
        route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({
            error: 'Validation Error',
            details: { title: 'タイトルは必須です' }
          }),
        });
      } else {
        route.continue();
      }
    });
    
    // タスクリストのモックを設定
    await page.route('/api/tasklists', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          taskLists: [{ id: 'list1', title: 'テストリスト' }]
        }),
      });
    });
    
    // タスク管理ページに移動
    await page.goto('/tasks');
    
    // タスクリストを選択
    await page.click('text=テストリスト');
    
    // タスク追加ボタンをクリック
    await page.click('button:has-text("タスクを追加")');
    
    // フォームモーダルが表示されることを確認
    await expect(page.locator('text=新規タスク')).toBeVisible();
    
    // タイトルを空にしたまま保存
    await page.click('button:has-text("保存")');
    
    // バリデーションエラーが表示されることを確認
    await expect(page.locator('text="タイトルは必須です"')).toBeVisible();
  });
  
  test('再試行機能が正しく動作すること', async ({ page }) => {
    // 1回目は失敗、2回目は成功するAPIモックを設定
    let callCount = 0;
    await page.route('/api/tasklists', async (route) => {
      callCount++;
      if (callCount === 1) {
        await route.abort('failed');
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            taskLists: [{ id: 'list1', title: 'テストリスト' }]
          }),
        });
      }
    });
    
    // タスク管理ページに移動
    await page.goto('/tasks');
    
    // エラーメッセージが表示されることを確認
    await expect(page.locator('text="エラーが発生しました"')).toBeVisible();
    
    // 再試行ボタンが表示されていることを確認
    await expect(page.locator('button:has-text("再試行")')).toBeVisible();
    
    // 再試行ボタンをクリック
    await page.click('button:has-text("再試行")');
    
    // 正常に読み込みが完了し、データが表示されることを確認
    await expect(page.locator('text=テストリスト')).toBeVisible();
  });
}); 