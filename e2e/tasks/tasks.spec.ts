import { test, expect } from '@playwright/test';
import { setupAuthSession } from '../utils/auth-utils';

test.describe('タスク管理', () => {
  // 各テスト前に認証状態を設定
  test.beforeEach(async ({ page }) => {
    await setupAuthSession(page);
    await page.goto('/tasks');
    
    // APIモックを設定
    await setupTaskApiMocks(page);
  });
  
  test('タスク一覧ページが正しく表示されること', async ({ page }) => {
    // タスク管理画面のタイトルが表示されていることを確認
    await expect(page.locator('text=タスク管理')).toBeVisible();
    
    // サイドバーが表示されていることを確認
    await expect(page.locator('text=タスクリスト')).toBeVisible();
    
    // データグリッドが表示されていることを確認
    await expect(page.locator('div[role="grid"]')).toBeVisible();
    
    // 「タスクを追加」ボタンが表示されていることを確認
    await expect(page.locator('button:has-text("タスクを追加")')).toBeVisible();
  });
  
  test('タスクリストを選択できること', async ({ page }) => {
    // タスクリストをクリック
    await page.click('text=仕事');
    
    // 選択状態になっていることを確認
    await expect(page.locator('li:has-text("仕事")').locator('..').nth(0)).toHaveClass(/Mui-selected/);
    
    // 別のタスクリストをクリック
    await page.click('text=個人');
    
    // 選択状態が切り替わっていることを確認
    await expect(page.locator('li:has-text("個人")').locator('..').nth(0)).toHaveClass(/Mui-selected/);
  });
  
  test('タスクを作成できること', async ({ page }) => {
    // タスク追加ボタンをクリック
    await page.click('button:has-text("タスクを追加")');
    
    // タスク作成モーダルが表示されることを確認
    await expect(page.locator('text=新規タスク')).toBeVisible();
    
    // タスク情報を入力
    await page.fill('[data-testid="task-title-input"]', 'テストタスク');
    await page.fill('[data-testid="task-notes-input"]', 'テスト説明文');
    
    // 期限を設定
    await page.click('[data-testid="task-due-date-input"]');
    await page.click('button.MuiPickersDay-root:not(.MuiPickersDay-hiddenDaySpacingFiller)');
    
    // 優先度を選択
    await page.click('[data-testid="priority-select"]');
    await page.click('li:has-text("高")');
    
    // タグを選択
    await page.click('[data-testid="tag-select"]');
    await page.click('li:has-text("仕事")');
    
    // 保存ボタンをクリック
    await page.click('button:has-text("保存")');
    
    // モーダルが閉じることを確認
    await expect(page.locator('text=新規タスク')).not.toBeVisible();
    
    // タスク一覧に追加されたタスクが表示されることを確認
    await expect(page.locator('div[role="grid"]')).toContainText('テストタスク');
  });
  
  test('タスクを編集できること', async ({ page }) => {
    // タスク行をダブルクリックして編集モーダルを開く
    await page.dblclick('div[role="row"]:has-text("買い物")');
    
    // 編集モーダルが表示されることを確認
    await expect(page.locator('text=タスクを編集')).toBeVisible();
    
    // タイトルを変更
    await page.fill('[data-testid="task-title-input"]', '買い物リスト更新');
    
    // 保存ボタンをクリック
    await page.click('button:has-text("保存")');
    
    // モーダルが閉じることを確認
    await expect(page.locator('text=タスクを編集')).not.toBeVisible();
    
    // 更新されたタイトルが表示されることを確認
    await expect(page.locator('div[role="grid"]')).toContainText('買い物リスト更新');
  });
  
  test('タスクを削除できること', async ({ page }) => {
    // 削除ボタンをクリック
    await page.click('button[aria-label="削除"]:first-of-type');
    
    // 確認ダイアログが表示されることを確認
    await expect(page.locator('text=このタスクを削除してもよろしいですか？')).toBeVisible();
    
    // 確認ボタンをクリック
    await page.click('button:has-text("確認")');
    
    // ダイアログが閉じることを確認
    await expect(page.locator('text=このタスクを削除してもよろしいですか？')).not.toBeVisible();
  });
  
  test('タスクの完了状態を切り替えられること', async ({ page }) => {
    // 未完了タスクのチェックボックスをクリック
    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    await firstCheckbox.check();
    
    // 完了状態になっていることを確認
    await expect(firstCheckbox).toBeChecked();
    
    // 再度クリックして未完了状態に戻す
    await firstCheckbox.uncheck();
    
    // 未完了状態になっていることを確認
    await expect(firstCheckbox).not.toBeChecked();
  });
  
  test('サブタスクを管理できること', async ({ page }) => {
    // サブタスクのあるタスク行を展開
    await page.click('button.MuiDataGrid-iconButtonContainer:first-of-type');
    
    // サブタスクが表示されていることを確認
    await expect(page.locator('div.MuiDataGrid-row--detailPanel')).toBeVisible();
    
    // サブタスクの追加ボタンをクリック
    await page.click('button:has-text("サブタスクを追加")');
    
    // サブタスク作成モーダルが表示されることを確認
    await expect(page.locator('text=新規サブタスク')).toBeVisible();
    
    // サブタスク情報を入力
    await page.fill('[data-testid="task-title-input"]', 'テストサブタスク');
    
    // 保存ボタンをクリック
    await page.click('button:has-text("保存")');
    
    // サブタスクが追加されていることを確認
    await expect(page.locator('div.MuiDataGrid-row--detailPanel')).toContainText('テストサブタスク');
  });
});

// APIモックを設定する関数
async function setupTaskApiMocks(page) {
  // タスクリスト取得APIのモック
  await page.route('/api/tasklists', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        taskLists: [
          { id: 'list1', title: '仕事' },
          { id: 'list2', title: '個人' },
          { id: 'list3', title: '買い物' }
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
            title: 'サブタスク付きタスク', 
            status: 'needsAction',
            due: null,
            parent: null,
            position: '3',
            customData: {
              priority: { id: 1, name: '低', level: 1 },
              tags: []
            }
          },
          { 
            id: 'subtask1', 
            title: 'サブタスク1', 
            status: 'needsAction',
            due: null,
            parent: 'task3',
            position: '3.1',
            customData: null
          }
        ]
      }),
    });
  });
  
  // タスク作成/更新/削除APIのモック
  await page.route('/api/tasklists/*/tasks*', async (route) => {
    if (route.request().method() === 'POST' || route.request().method() === 'PATCH' || route.request().method() === 'DELETE') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    } else {
      await route.continue();
    }
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