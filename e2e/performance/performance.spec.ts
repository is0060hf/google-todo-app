import { test, expect } from '@playwright/test';
import { setupAuthSession } from '../utils/auth-utils';

test.describe('パフォーマンス', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuthSession(page);
  });
  
  test('ダッシュボードページの読み込み時間が3秒以内であること', async ({ page }) => {
    // パフォーマンスマークのクリア
    await page.evaluate(() => {
      window.performance.clearMarks();
      window.performance.clearMeasures();
    });
    
    // パフォーマンス計測開始マークを設定
    await page.evaluate(() => {
      window.performance.mark('start-loading');
    });
    
    // ダッシュボードページに遷移
    await page.goto('/dashboard');
    
    // すべてのコンテンツが読み込まれたことを確認
    await page.waitForSelector('h6:has-text("完了タスク数")');
    await page.waitForSelector('h6:has-text("タスク完了率")');
    await page.waitForSelector('h6:has-text("作成 vs 完了")');
    await page.waitForSelector('h6:has-text("タスク分布")');
    
    // パフォーマンス計測終了マークを設定
    await page.evaluate(() => {
      window.performance.mark('end-loading');
      window.performance.measure('page-load', 'start-loading', 'end-loading');
    });
    
    // 計測結果を取得
    const loadTime = await page.evaluate(() => {
      const measure = window.performance.getEntriesByName('page-load')[0];
      return measure.duration;
    });
    
    console.log(`ダッシュボードページ読み込み時間: ${loadTime.toFixed(2)}ms`);
    
    // 読み込み時間が3秒（3000ms）以内であることを確認
    expect(loadTime).toBeLessThan(3000);
  });
  
  test('タスク一覧ページの読み込み時間が3秒以内であること', async ({ page }) => {
    // パフォーマンスマークのクリア
    await page.evaluate(() => {
      window.performance.clearMarks();
      window.performance.clearMeasures();
    });
    
    // パフォーマンス計測開始マークを設定
    await page.evaluate(() => {
      window.performance.mark('start-loading');
    });
    
    // タスク管理ページに遷移
    await page.goto('/tasks');
    
    // すべてのコンテンツが読み込まれたことを確認
    await page.waitForSelector('div[role="grid"]');
    await page.waitForSelector('text=タスクリスト');
    
    // パフォーマンス計測終了マークを設定
    await page.evaluate(() => {
      window.performance.mark('end-loading');
      window.performance.measure('page-load', 'start-loading', 'end-loading');
    });
    
    // 計測結果を取得
    const loadTime = await page.evaluate(() => {
      const measure = window.performance.getEntriesByName('page-load')[0];
      return measure.duration;
    });
    
    console.log(`タスク一覧ページ読み込み時間: ${loadTime.toFixed(2)}ms`);
    
    // 読み込み時間が3秒（3000ms）以内であることを確認
    expect(loadTime).toBeLessThan(3000);
  });
  
  test('大量データでもDataGridが高速に表示されること', async ({ page }) => {
    // 大量のタスクデータを返すモックを設定
    await page.route('/api/tasklists/*/tasks', async (route) => {
      const tasks = [];
      // 100件のタスクデータを生成
      for (let i = 0; i < 100; i++) {
        tasks.push({
          id: `task${i}`,
          title: `テストタスク ${i}`,
          status: i % 5 === 0 ? 'completed' : 'needsAction',
          due: i % 3 === 0 ? new Date().toISOString() : null,
          parent: null,
          position: `${i}`,
          customData: {
            priority: { id: (i % 3) + 1, name: ['低', '中', '高'][i % 3], level: (i % 3) + 1 },
            tags: [{ id: `tag${i % 4}`, name: `タグ${i % 4}` }]
          }
        });
      }
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ tasks }),
      });
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
    
    // パフォーマンスマークのクリア
    await page.evaluate(() => {
      window.performance.clearMarks();
      window.performance.clearMeasures();
    });
    
    // タスク管理ページに遷移
    await page.goto('/tasks');
    
    // タスクリストを選択
    await page.click('text=テストリスト');
    
    // パフォーマンス計測開始マークを設定
    await page.evaluate(() => {
      window.performance.mark('start-grid-render');
    });
    
    // DataGridの表示完了を待機
    await page.waitForSelector('div[role="row"]:has-text("テストタスク 99")');
    
    // パフォーマンス計測終了マークを設定
    await page.evaluate(() => {
      window.performance.mark('end-grid-render');
      window.performance.measure('grid-render', 'start-grid-render', 'end-grid-render');
    });
    
    // 計測結果を取得
    const renderTime = await page.evaluate(() => {
      const measure = window.performance.getEntriesByName('grid-render')[0];
      return measure.duration;
    });
    
    console.log(`DataGridレンダリング時間（100件）: ${renderTime.toFixed(2)}ms`);
    
    // DataGridのレンダリング時間が1秒（1000ms）以内であることを確認
    expect(renderTime).toBeLessThan(1000);
    
    // スクロールが機能することを確認
    await page.evaluate(() => {
      const grid = document.querySelector('div[role="grid"]');
      if (grid) grid.scrollTop = 1000;
    });
    
    // スクロール後に別のタスク行が表示されることを確認
    await page.waitForSelector('div[role="row"]:has-text("テストタスク 50")');
  });
  
  test('フィルタリング操作のパフォーマンス', async ({ page }) => {
    // 大量のタスクデータを返すモックを設定
    await page.route('/api/tasklists/*/tasks', async (route) => {
      const tasks = [];
      // 100件のタスクデータを生成
      for (let i = 0; i < 100; i++) {
        tasks.push({
          id: `task${i}`,
          title: `テストタスク ${i}`,
          status: i % 5 === 0 ? 'completed' : 'needsAction',
          due: i % 3 === 0 ? new Date().toISOString() : null,
          parent: null,
          position: `${i}`,
          customData: {
            priority: { id: (i % 3) + 1, name: ['低', '中', '高'][i % 3], level: (i % 3) + 1 },
            tags: [{ id: `tag${i % 4}`, name: `タグ${i % 4}` }]
          }
        });
      }
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ tasks }),
      });
    });
    
    // 必要なAPIモックを設定
    await setupApiMocks(page);
    
    // タスク管理ページに移動
    await page.goto('/tasks');
    
    // タスクリストを選択
    await page.click('text=テストリスト');
    
    // DataGridの表示完了を待機
    await page.waitForSelector('div[role="row"]:has-text("テストタスク 99")');
    
    // フィルターパネルを開く
    await page.click('button[aria-label="フィルターを開く"]');
    
    // パフォーマンス計測開始マークを設定
    await page.evaluate(() => {
      window.performance.clearMarks();
      window.performance.clearMeasures();
      window.performance.mark('start-filter');
    });
    
    // 優先度でフィルタリング
    await page.click('div[role="button"]:has-text("優先度")');
    await page.click('li:has-text("高")');
    await page.keyboard.press('Escape');
    
    // フィルタリング完了を待機（表示件数が変わるはず）
    await page.waitForFunction(() => {
      const rows = document.querySelectorAll('div[role="row"]');
      return rows.length < 100 && rows.length > 1; // ヘッダー行を除いて100件未満
    });
    
    // パフォーマンス計測終了マークを設定
    await page.evaluate(() => {
      window.performance.mark('end-filter');
      window.performance.measure('filter-operation', 'start-filter', 'end-filter');
    });
    
    // 計測結果を取得
    const filterTime = await page.evaluate(() => {
      const measure = window.performance.getEntriesByName('filter-operation')[0];
      return measure.duration;
    });
    
    console.log(`フィルタリング操作の実行時間: ${filterTime.toFixed(2)}ms`);
    
    // フィルタリング操作が500ms以内であることを確認
    expect(filterTime).toBeLessThan(500);
  });
});

// APIモックを設定する補助関数
async function setupApiMocks(page) {
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
  
  // 優先度のモックを設定
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
  
  // タグのモックを設定
  await page.route('/api/tags', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        tags: [
          { id: 'tag0', name: 'タグ0' },
          { id: 'tag1', name: 'タグ1' },
          { id: 'tag2', name: 'タグ2' },
          { id: 'tag3', name: 'タグ3' }
        ]
      }),
    });
  });
} 