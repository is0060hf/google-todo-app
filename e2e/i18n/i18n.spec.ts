import { test, expect } from '@playwright/test';
import { setupAuthSession } from '../utils/auth-utils';

test.describe('多言語対応', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuthSession(page);
  });
  
  test('言語切替が正しく動作すること', async ({ page }) => {
    await page.goto('/dashboard');
    
    // 初期状態では日本語になっていることを確認
    await expect(page.locator('button[aria-label="Japanese"]')).toHaveClass(/Mui-selected/);
    await expect(page.locator('h4:has-text("ダッシュボード")')).toBeVisible();
    
    // 英語に切り替え
    await page.click('button[aria-label="English"]');
    
    // 英語に切り替わったことを確認
    await expect(page.locator('button[aria-label="English"]')).toHaveClass(/Mui-selected/);
    await expect(page.locator('h4:has-text("Dashboard")')).toBeVisible();
    
    // タスク管理画面に移動
    await page.click('text=Task Management');
    await page.waitForURL('/tasks');
    
    // 英語表示になっていることを確認
    await expect(page.locator('text=Task Management')).toBeVisible();
    await expect(page.locator('text=Task Lists')).toBeVisible();
    await expect(page.locator('button:has-text("Add Task")')).toBeVisible();
    
    // 日本語に戻す
    await page.click('button[aria-label="Japanese"]');
    
    // 日本語表示に戻ったことを確認
    await expect(page.locator('text=タスク管理')).toBeVisible();
    await expect(page.locator('text=タスクリスト')).toBeVisible();
    await expect(page.locator('button:has-text("タスクを追加")')).toBeVisible();
  });
  
  test('フィルタリング機能のテキストが翻訳されること', async ({ page }) => {
    await page.goto('/tasks');
    
    // フィルターパネルを開く
    await page.click('button[aria-label="フィルターを開く"]');
    
    // 日本語表示を確認
    await expect(page.locator('text=フィルター')).toBeVisible();
    await expect(page.locator('text=優先度')).toBeVisible();
    await expect(page.locator('text=タグ')).toBeVisible();
    await expect(page.locator('text=状態')).toBeVisible();
    await expect(page.locator('text=期限')).toBeVisible();
    
    // 英語に切り替え
    await page.click('button[aria-label="English"]');
    
    // 英語表示に切り替わったことを確認
    await expect(page.locator('text=Filter')).toBeVisible();
    await expect(page.locator('text=Priority')).toBeVisible();
    await expect(page.locator('text=Tags')).toBeVisible();
    await expect(page.locator('text=Status')).toBeVisible();
    await expect(page.locator('text=Due Date')).toBeVisible();
  });
  
  test('タスク詳細モーダルのテキストが翻訳されること', async ({ page }) => {
    // APIモックを設定
    await page.route('/api/tasklists/*/tasks', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          tasks: [
            { 
              id: 'task1', 
              title: 'サンプルタスク', 
              status: 'needsAction',
              due: new Date().toISOString(),
              parent: null,
              position: '1',
              customData: {
                priority: { id: 3, name: '高', level: 3 },
                tags: [{ id: 'tag1', name: '仕事' }]
              }
            }
          ]
        }),
      });
    });
    
    await page.goto('/tasks');
    
    // タスク行をダブルクリックして詳細モーダルを開く
    await page.dblclick('div[role="row"]:has-text("サンプルタスク")');
    
    // 日本語表示を確認
    await expect(page.locator('text=タスクを編集')).toBeVisible();
    await expect(page.locator('text=タイトル')).toBeVisible();
    await expect(page.locator('text=優先度')).toBeVisible();
    await expect(page.locator('text=保存')).toBeVisible();
    await expect(page.locator('text=キャンセル')).toBeVisible();
    
    // モーダルを閉じる
    await page.click('button:has-text("キャンセル")');
    
    // 英語に切り替え
    await page.click('button[aria-label="English"]');
    
    // 再度タスク行をダブルクリック
    await page.dblclick('div[role="row"]:has-text("サンプルタスク")');
    
    // 英語表示に切り替わったことを確認
    await expect(page.locator('text=Edit Task')).toBeVisible();
    await expect(page.locator('text=Title')).toBeVisible();
    await expect(page.locator('text=Priority')).toBeVisible();
    await expect(page.locator('text=Save')).toBeVisible();
    await expect(page.locator('text=Cancel')).toBeVisible();
  });
  
  test('言語設定が永続化されること', async ({ page }) => {
    await page.goto('/dashboard');
    
    // 英語に切り替え
    await page.click('button[aria-label="English"]');
    
    // 英語表示になったことを確認
    await expect(page.locator('h4:has-text("Dashboard")')).toBeVisible();
    
    // ページをリロード
    await page.reload();
    
    // 言語設定が保持されていることを確認（英語のまま）
    await expect(page.locator('h4:has-text("Dashboard")')).toBeVisible();
    await expect(page.locator('button[aria-label="English"]')).toHaveClass(/Mui-selected/);
    
    // 別のページに移動
    await page.click('text=Task Management');
    
    // 英語表示が継続していることを確認
    await expect(page.locator('text=Task Management')).toBeVisible();
    
    // 日本語に戻す
    await page.click('button[aria-label="Japanese"]');
    
    // 日本語表示に戻ったことを確認
    await expect(page.locator('text=タスク管理')).toBeVisible();
  });
  
  test('ダッシュボードのグラフラベルが翻訳されること', async ({ page }) => {
    await page.goto('/dashboard');
    
    // 日本語表示を確認
    await expect(page.locator('text=完了タスク数')).toBeVisible();
    await expect(page.locator('text=タスク完了率')).toBeVisible();
    await expect(page.locator('text=作成 vs 完了')).toBeVisible();
    await expect(page.locator('text=タスク分布')).toBeVisible();
    
    // 英語に切り替え
    await page.click('button[aria-label="English"]');
    
    // 英語表示に切り替わったことを確認
    await expect(page.locator('text=Completed Tasks')).toBeVisible();
    await expect(page.locator('text=Task Completion Rate')).toBeVisible();
    await expect(page.locator('text=Created vs Completed')).toBeVisible();
    await expect(page.locator('text=Task Distribution')).toBeVisible();
  });
}); 