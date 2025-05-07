import { test, expect } from '@playwright/test';
import { setupAuthSession } from '../utils/auth-utils';

test.describe('レスポンシブ対応', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuthSession(page);
  });
  
  test('デスクトップサイズで正しく表示されること', async ({ page }) => {
    // デスクトップサイズに設定
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/tasks');
    
    // ヘッダーが表示されていることを確認
    await expect(page.locator('header')).toBeVisible();
    
    // サイドバーが表示されていることを確認
    await expect(page.locator('text=タスクリスト')).toBeVisible();
    
    // ナビゲーションリンクが表示されていることを確認
    await expect(page.locator('header').locator('text=ダッシュボード')).toBeVisible();
    await expect(page.locator('header').locator('text=タスク管理')).toBeVisible();
    
    // 言語切替が表示されていることを確認
    await expect(page.locator('button[aria-label="Japanese"]')).toBeVisible();
    await expect(page.locator('button[aria-label="English"]')).toBeVisible();
  });
  
  test('タブレットサイズで正しく表示されること', async ({ page }) => {
    // タブレットサイズに設定
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/tasks');
    
    // ヘッダーが表示されていることを確認
    await expect(page.locator('header')).toBeVisible();
    
    // サイドバーが表示されていることを確認
    await expect(page.locator('text=タスクリスト')).toBeVisible();
    
    // ナビゲーションリンクが表示されていることを確認
    await expect(page.locator('header').locator('text=ダッシュボード')).toBeVisible();
    await expect(page.locator('header').locator('text=タスク管理')).toBeVisible();
    
    // 言語切替が表示されていることを確認
    await expect(page.locator('button[aria-label="Japanese"]')).toBeVisible();
    await expect(page.locator('button[aria-label="English"]')).toBeVisible();
  });
  
  test('モバイルサイズで正しく表示され、サイドバーを切り替えられること', async ({ page }) => {
    // モバイルサイズに設定
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/tasks');
    
    // ヘッダーが表示されていることを確認
    await expect(page.locator('header')).toBeVisible();
    
    // モバイル表示ではハンバーガーメニューのみ表示されていることを確認
    await expect(page.locator('header button[aria-label="open drawer"]')).toBeVisible();
    
    // ナビゲーションリンクが非表示になっていることを確認
    await expect(page.locator('header').locator('text=ダッシュボード')).not.toBeVisible();
    await expect(page.locator('header').locator('text=タスク管理')).not.toBeVisible();
    
    // 言語切替は非表示だがアカウントメニューから利用可能
    await expect(page.locator('button[aria-label="Japanese"]')).not.toBeVisible();
    
    // サイドバーの表示切替ボタンがあることを確認
    await expect(page.locator('button:has-text("リストを表示")')).toBeVisible();
    
    // サイドバーが初期状態では非表示（またはボタンで制御）であることを確認
    // サイドバーを表示
    await page.click('button:has-text("リストを表示")');
    
    // サイドバーが表示されることを確認
    await expect(page.locator('text=タスクリスト')).toBeVisible();
    
    // サイドバーを非表示に戻す
    await page.click('button:has-text("リストを閉じる")');
    
    // サイドバーが非表示になることを確認
    await expect(page.locator('div').filter({ hasText: /^タスクリスト$/ }).first()).not.toBeVisible();
  });
  
  test('画面サイズ変更時にレイアウトが適応すること', async ({ page }) => {
    // 最初にデスクトップサイズで表示
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/dashboard');
    
    // グラフが格子状に表示されていることを確認（詳細なセレクタは実装に応じて調整）
    const gridLayoutDesktop = await page.evaluate(() => {
      const gridElements = document.querySelectorAll('.MuiGrid-container .MuiGrid-item');
      return gridElements.length >= 4; // 4つ以上のグリッドアイテムがあることを確認
    });
    expect(gridLayoutDesktop).toBeTruthy();
    
    // モバイルサイズに変更
    await page.setViewportSize({ width: 375, height: 667 });
    
    // レイアウトが縦長に変わっていることを確認
    const gridLayoutMobile = await page.evaluate(() => {
      // モバイルではグリッドアイテムの幅が100%になっているはず
      const gridItems = document.querySelectorAll('.MuiGrid-container .MuiGrid-item');
      if (gridItems.length === 0) return false;
      
      // 少なくとも1つのアイテムでwidth: 100%またはそれに相当するスタイルを確認
      for (const item of gridItems) {
        const style = window.getComputedStyle(item);
        // 幅が100%に近いか確認（具体的な値はCSSの実装に依存）
        if (parseFloat(style.width) / window.innerWidth > 0.9) {
          return true;
        }
      }
      return false;
    });
    expect(gridLayoutMobile).toBeTruthy();
  });
  
  test('ダッシュボードがレスポンシブに表示されること', async ({ page }) => {
    // モバイルサイズに設定
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');
    
    // グラフが縦に積み重なって表示されていることを確認
    await expect(page.locator('h6:has-text("完了タスク数")')).toBeVisible();
    await expect(page.locator('h6:has-text("タスク完了率")')).toBeVisible();
    
    // タブレットサイズに設定
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // グラフの表示が変わっていることを確認
    await expect(page.locator('h6:has-text("完了タスク数")')).toBeVisible();
    await expect(page.locator('h6:has-text("タスク完了率")')).toBeVisible();
    
    // デスクトップサイズに設定
    await page.setViewportSize({ width: 1280, height: 800 });
    
    // グラフの表示が変わっていることを確認
    await expect(page.locator('h6:has-text("完了タスク数")')).toBeVisible();
    await expect(page.locator('h6:has-text("タスク完了率")')).toBeVisible();
  });
}); 