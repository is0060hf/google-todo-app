import { test, expect } from '@playwright/test';
import { mockGoogleLogin, setupAuthSession } from '../utils/auth-utils';

test.describe('ダッシュボード', () => {
  // 各テスト前に認証状態を設定
  test.beforeEach(async ({ page }) => {
    await setupAuthSession(page);
    await page.goto('/dashboard');
  });
  
  test('ダッシュボード画面が正しく表示されること', async ({ page }) => {
    // ダッシュボードタイトルが表示されていることを確認
    await expect(page.locator('h4:has-text("ダッシュボード")')).toBeVisible();
    
    // 期間セレクターが表示されていることを確認
    await expect(page.locator('button:has-text("日次")')).toBeVisible();
    await expect(page.locator('button:has-text("週次")')).toBeVisible();
    await expect(page.locator('button:has-text("月次")')).toBeVisible();
    await expect(page.locator('button:has-text("年次")')).toBeVisible();
    
    // グラフコンポーネントが表示されていることを確認
    await expect(page.locator('h6:has-text("完了タスク数")')).toBeVisible();
    await expect(page.locator('h6:has-text("タスク完了率")')).toBeVisible();
    await expect(page.locator('h6:has-text("作成 vs 完了")')).toBeVisible();
    await expect(page.locator('h6:has-text("タスク分布")')).toBeVisible();
  });
  
  test('期間切替が正しく動作すること', async ({ page }) => {
    // 初期状態（日次）を確認
    await expect(page.locator('button:has-text("日次").Mui-selected')).toBeVisible();
    
    // 週次に切り替え
    await page.click('button:has-text("週次")');
    await expect(page.locator('button:has-text("週次").Mui-selected')).toBeVisible();
    
    // 月次に切り替え
    await page.click('button:has-text("月次")');
    await expect(page.locator('button:has-text("月次").Mui-selected')).toBeVisible();
    
    // 年次に切り替え
    await page.click('button:has-text("年次")');
    await expect(page.locator('button:has-text("年次").Mui-selected')).toBeVisible();
    
    // 再度日次に切り替え
    await page.click('button:has-text("日次")');
    await expect(page.locator('button:has-text("日次").Mui-selected')).toBeVisible();
  });
  
  test('データなし状態が適切に処理されること', async ({ page }) => {
    // モックAPIでデータなし状態を設定
    await page.route('/api/stats/daily**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ dailyStats: [] }),
      });
    });
    
    // ページをリロード
    await page.reload();
    
    // データなしメッセージが表示されることを確認
    await expect(page.locator('text="データがありません"')).toBeVisible();
  });
  
  test('優先度とタグの分布データが表示されること', async ({ page }) => {
    // 分布グラフが表示されていることを確認
    await expect(page.locator('h6:has-text("タスク分布")')).toBeVisible();
    
    // 優先度タブを確認
    const priorityTab = page.locator('button:has-text("優先度")');
    await expect(priorityTab).toBeVisible();
    
    // タグタブを確認
    const tagTab = page.locator('button:has-text("タグ")');
    await expect(tagTab).toBeVisible();
    
    // タグタブに切り替え
    await tagTab.click();
    await expect(tagTab).toHaveClass(/Mui-selected/);
    
    // 優先度タブに戻す
    await priorityTab.click();
    await expect(priorityTab).toHaveClass(/Mui-selected/);
  });
  
  test('日付ナビゲーションが正しく動作すること', async ({ page }) => {
    // 前日ボタンをクリック
    await page.click('button[aria-label="前日"]');
    
    // 次の日ボタンをクリック
    await page.click('button[aria-label="翌日"]');
    
    // 今日ボタンをクリック
    await page.click('button[aria-label="今日"]');
    
    // 週次表示に切り替え
    await page.click('button:has-text("週次")');
    
    // 前週ボタンをクリック
    await page.click('button[aria-label="前週"]');
    
    // 次週ボタンをクリック
    await page.click('button[aria-label="翌週"]');
    
    // 今週ボタンをクリック
    await page.click('button[aria-label="今週"]');
  });
}); 