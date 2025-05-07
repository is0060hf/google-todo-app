import { test, expect } from '@playwright/test';
import { setupAuthSession } from '../utils/auth-utils';

test.describe('フィルタリング機能', () => {
  // 各テスト前に認証状態を設定
  test.beforeEach(async ({ page }) => {
    await setupAuthSession(page);
    await page.goto('/tasks');
    
    // APIモックを設定
    await setupFilterApiMocks(page);
    
    // フィルターパネルを開く
    await page.click('button[aria-label="フィルターを開く"]');
  });
  
  test('フィルターバーが正しく表示されること', async ({ page }) => {
    // フィルターバーが表示されていることを確認
    await expect(page.locator('text=フィルター')).toBeVisible();
    
    // 優先度フィルターが表示されていることを確認
    await expect(page.locator('div').filter({ hasText: /^優先度$/ }).first()).toBeVisible();
    
    // タグフィルターが表示されていることを確認
    await expect(page.locator('div').filter({ hasText: /^タグ$/ }).first()).toBeVisible();
    
    // ステータスフィルターが表示されていることを確認
    await expect(page.locator('div').filter({ hasText: /^状態$/ }).first()).toBeVisible();
    
    // 期限フィルターが表示されていることを確認
    await expect(page.locator('div').filter({ hasText: /^期限$/ }).first()).toBeVisible();
  });
  
  test('優先度でフィルタリングできること', async ({ page }) => {
    // 優先度フィルターを開く
    await page.click('div[role="button"]:has-text("優先度")');
    
    // 高優先度を選択
    await page.click('li:has-text("高")');
    
    // リストを閉じる
    await page.keyboard.press('Escape');
    
    // フィルターチップが表示されることを確認
    await expect(page.locator('div').filter({ hasText: /^優先度: 1個選択$/ }).first()).toBeVisible();
    
    // フィルタリング結果を確認
    await expect(page.locator('div[role="grid"]')).toContainText('会議資料作成');
    await expect(page.locator('div[role="grid"]')).not.toContainText('買い物');
    
    // フィルターをリセット
    await page.click('text=リセット');
    
    // フィルターチップが消えることを確認
    await expect(page.locator('div').filter({ hasText: /^優先度: 1個選択$/ }).first()).not.toBeVisible();
  });
  
  test('タグでフィルタリングできること', async ({ page }) => {
    // タグフィルターのオートコンプリート入力フィールドをクリック
    await page.click('.MuiAutocomplete-root:has-text("タグ") .MuiInputBase-root');
    
    // タグを選択
    await page.click('li:has-text("仕事")');
    
    // フィルターチップが表示されることを確認
    await expect(page.locator('div').filter({ hasText: /^タグ: 1個選択$/ }).first()).toBeVisible();
    
    // フィルタリング結果を確認
    await expect(page.locator('div[role="grid"]')).toContainText('会議資料作成');
    await expect(page.locator('div[role="grid"]')).not.toContainText('買い物');
    
    // 別のタグも追加
    await page.click('.MuiAutocomplete-root:has-text("タグ") .MuiInputBase-root');
    await page.click('li:has-text("個人")');
    
    // フィルターチップが更新されることを確認
    await expect(page.locator('div').filter({ hasText: /^タグ: 2個選択$/ }).first()).toBeVisible();
    
    // フィルタリング結果を確認
    await expect(page.locator('div[role="grid"]')).toContainText('会議資料作成');
    await expect(page.locator('div[role="grid"]')).toContainText('買い物');
    
    // タグフィルターをクリア
    await page.click('div[role="button"]:has-text("タグ: 2個選択")');
    
    // フィルターチップが消えることを確認
    await expect(page.locator('div').filter({ hasText: /^タグ: 2個選択$/ }).first()).not.toBeVisible();
  });
  
  test('ステータスでフィルタリングできること', async ({ page }) => {
    // ステータスフィルターを開く
    await page.click('div[role="button"]:has-text("状態")');
    
    // 完了を選択
    await page.click('li:has-text("完了")');
    
    // フィルターチップが表示されることを確認
    await expect(page.locator('div').filter({ hasText: /^状態: 完了$/ }).first()).toBeVisible();
    
    // フィルタリング結果を確認
    await expect(page.locator('div[role="grid"]')).toContainText('完了タスク');
    await expect(page.locator('div[role="grid"]')).not.toContainText('会議資料作成');
    
    // ステータスフィルターを変更
    await page.click('div[role="button"]:has-text("状態")');
    await page.click('li:has-text("未完了")');
    
    // フィルターチップが更新されることを確認
    await expect(page.locator('div').filter({ hasText: /^状態: 未完了$/ }).first()).toBeVisible();
    
    // フィルタリング結果を確認
    await expect(page.locator('div[role="grid"]')).not.toContainText('完了タスク');
    await expect(page.locator('div[role="grid"]')).toContainText('会議資料作成');
    
    // ステータスフィルターをリセット
    await page.click('div[role="button"]:has-text("状態: 未完了")');
  });
  
  test('期限でフィルタリングできること', async ({ page }) => {
    // 期限フィルターを開く
    await page.click('div[role="button"]:has-text("期限")');
    
    // 今日を選択
    await page.click('li:has-text("今日")');
    
    // フィルターチップが表示されることを確認
    await expect(page.locator('div').filter({ hasText: /^期限: 今日$/ }).first()).toBeVisible();
    
    // フィルタリング結果を確認
    await expect(page.locator('div[role="grid"]')).toContainText('会議資料作成');
    
    // 期限フィルターを変更
    await page.click('div[role="button"]:has-text("期限")');
    await page.click('li:has-text("明日")');
    
    // フィルターチップが更新されることを確認
    await expect(page.locator('div').filter({ hasText: /^期限: 明日$/ }).first()).toBeVisible();
    
    // 期限フィルターを変更
    await page.click('div[role="button"]:has-text("期限")');
    await page.click('li:has-text("すべて")');
    
    // フィルターチップが消えることを確認
    await expect(page.locator('div').filter({ hasText: /^期限: 明日$/ }).first()).not.toBeVisible();
  });
  
  test('複合フィルタリングができること', async ({ page }) => {
    // 優先度フィルターを設定
    await page.click('div[role="button"]:has-text("優先度")');
    await page.click('li:has-text("高")');
    await page.keyboard.press('Escape');
    
    // ステータスフィルターを設定
    await page.click('div[role="button"]:has-text("状態")');
    await page.click('li:has-text("未完了")');
    
    // 両方のフィルターチップが表示されることを確認
    await expect(page.locator('div').filter({ hasText: /^優先度: 1個選択$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^状態: 未完了$/ }).first()).toBeVisible();
    
    // フィルタリング結果を確認 - 両方の条件を満たすもののみ表示
    await expect(page.locator('div[role="grid"]')).toContainText('会議資料作成');
    await expect(page.locator('div[role="grid"]')).not.toContainText('買い物');
    await expect(page.locator('div[role="grid"]')).not.toContainText('完了タスク');
    
    // リセットボタンでフィルターをすべてクリア
    await page.click('text=リセット');
    
    // フィルターチップがすべて消えることを確認
    await expect(page.locator('div').filter({ hasText: /^優先度: 1個選択$/ }).first()).not.toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^状態: 未完了$/ }).first()).not.toBeVisible();
    
    // すべてのタスクが表示されることを確認
    await expect(page.locator('div[role="grid"]')).toContainText('会議資料作成');
    await expect(page.locator('div[role="grid"]')).toContainText('買い物');
    await expect(page.locator('div[role="grid"]')).toContainText('完了タスク');
  });
});

// APIモックを設定する関数
async function setupFilterApiMocks(page) {
  // タスクリスト取得APIのモック
  await page.route('/api/tasklists', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        taskLists: [
          { id: 'list1', title: '仕事' },
          { id: 'list2', title: '個人' }
        ]
      }),
    });
  });
  
  // タスク取得APIのモック
  await page.route('/api/tasklists/*/tasks', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        tasks: [
          { 
            id: 'task1', 
            title: '会議資料作成', 
            status: 'needsAction',
            due: new Date().toISOString(),
            parent: null,
            position: '1',
            customData: {
              priority: { id: 3, name: '高', level: 3 },
              tags: [{ id: 'tag1', name: '仕事' }]
            }
          },
          { 
            id: 'task2', 
            title: '買い物', 
            status: 'needsAction',
            due: new Date().toISOString(),
            parent: null,
            position: '2',
            customData: {
              priority: { id: 2, name: '中', level: 2 },
              tags: [{ id: 'tag2', name: '個人' }]
            }
          },
          { 
            id: 'task3', 
            title: '完了タスク', 
            status: 'completed',
            completed: new Date().toISOString(),
            due: null,
            parent: null,
            position: '3',
            customData: {
              priority: { id: 1, name: '低', level: 1 },
              tags: []
            }
          }
        ]
      }),
    });
  });
  
  // 優先度取得APIのモック
  await page.route('/api/priorities', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        priorities: [
          { id: 3, name: '高', level: 3 },
          { id: 2, name: '中', level: 2 },
          { id: 1, name: '低', level: 1 }
        ]
      }),
    });
  });
  
  // タグ取得APIのモック
  await page.route('/api/tags', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        tags: [
          { id: 'tag1', name: '仕事' },
          { id: 'tag2', name: '個人' },
          { id: 'tag3', name: '買い物' },
          { id: 'tag4', name: '家事' }
        ]
      }),
    });
  });
} 