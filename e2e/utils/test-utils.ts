import { Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

/**
 * テスト用フィクスチャデータを読み込む
 */
export function loadTestData() {
  const fixtureFilePath = path.join(__dirname, '../fixtures/test-data.json');
  try {
    const fixtureData = JSON.parse(fs.readFileSync(fixtureFilePath, 'utf8'));
    return fixtureData;
  } catch (error) {
    console.error('フィクスチャデータの読み込みに失敗しました:', error);
    return {};
  }
}

/**
 * APIモックを設定する
 */
export async function setupApiMocks(page: Page) {
  const testData = loadTestData();

  // タスクリスト取得APIをモック
  await page.route('/api/tasklists', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ taskLists: testData.taskLists }),
    });
  });

  // タスク取得APIをモック
  await page.route('/api/tasklists/*/tasks', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ tasks: testData.tasks }),
    });
  });

  // 特定のタスク取得APIをモック
  await page.route('/api/tasklists/*/tasks/*', async (route) => {
    const url = route.request().url();
    const taskId = url.split('/').pop();
    const task = testData.tasks.find(t => t.id === taskId);

    if (route.request().method() === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ task }),
      });
    } else {
      // POST, PATCH, DELETE
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    }
  });

  // タグ取得APIをモック
  await page.route('/api/tags', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ tags: testData.tags }),
    });
  });

  // 優先度取得APIをモック
  await page.route('/api/priorities', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ priorities: testData.priorities }),
    });
  });

  // 統計データ取得APIをモック
  await page.route('/api/stats/**', async (route) => {
    const url = route.request().url();
    let statsData;

    if (url.includes('daily')) {
      statsData = testData.stats.daily;
    } else if (url.includes('weekly')) {
      statsData = testData.stats.weekly;
    } else if (url.includes('monthly')) {
      statsData = testData.stats.monthly;
    } else if (url.includes('yearly')) {
      statsData = testData.stats.yearly;
    } else if (url.includes('distribution')) {
      if (url.includes('priority')) {
        statsData = testData.stats.priorityDistribution;
      } else if (url.includes('tag')) {
        statsData = testData.stats.tagDistribution;
      }
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: statsData }),
    });
  });
}

/**
 * ネットワークエラーをシミュレートする
 */
export async function simulateNetworkError(page: Page, url: string) {
  await page.route(url, async (route) => {
    await route.abort('failed');
  });
}

/**
 * APIエラーをシミュレートする
 */
export async function simulateApiError(page: Page, url: string, statusCode: number = 500) {
  await page.route(url, async (route) => {
    await route.fulfill({
      status: statusCode,
      contentType: 'application/json',
      body: JSON.stringify({ 
        error: 'APIエラーが発生しました',
        statusCode
      }),
    });
  });
}

/**
 * 低速ネットワークをシミュレートする
 */
export async function simulateSlowNetwork(page: Page, url: string, delay: number = 3000) {
  await page.route(url, async (route) => {
    await new Promise(resolve => setTimeout(resolve, delay));
    await route.continue();
  });
}

/**
 * 画面サイズを設定する
 */
export async function setScreenSize(page: Page, size: 'desktop' | 'tablet' | 'mobile') {
  const sizes = {
    desktop: { width: 1280, height: 800 },
    tablet: { width: 768, height: 1024 },
    mobile: { width: 375, height: 667 }
  };
  
  await page.setViewportSize(sizes[size]);
} 