import { Page, expect } from '@playwright/test';

/**
 * パフォーマンステスト用ユーティリティ
 */
export async function measurePageLoadTime(page: Page, url: string): Promise<number> {
  // パフォーマンスタイミングをクリア
  await page.evaluate(() => {
    window.performance.clearResourceTimings();
  });
  
  // ページへのナビゲーション開始時刻を記録
  const startTime = Date.now();
  
  // ページにナビゲーション
  await page.goto(url);
  
  // ページが完全に読み込まれるまで待機
  await page.waitForLoadState('networkidle');
  
  // ナビゲーション終了時刻を記録
  const endTime = Date.now();
  
  // ナビゲーション時間を計算（ミリ秒）
  const navigationTime = endTime - startTime;
  
  // ブラウザから詳細なパフォーマンスメトリクスを取得
  const perfMetrics = await page.evaluate(() => {
    const timing = window.performance.timing || {};
    const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      return {
        // Navigation Timing API 2
        fetchStart: navigation.fetchStart,
        domContentLoadedEventEnd: navigation.domContentLoadedEventEnd,
        loadEventEnd: navigation.loadEventEnd,
        duration: navigation.duration,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        load: navigation.loadEventEnd - navigation.fetchStart
      };
    } else if (timing.fetchStart) {
      // Navigation Timing API 1 (legacy)
      return {
        fetchStart: timing.fetchStart,
        domContentLoadedEventEnd: timing.domContentLoadedEventEnd,
        loadEventEnd: timing.loadEventEnd,
        duration: timing.loadEventEnd - timing.navigationStart,
        domContentLoaded: timing.domContentLoadedEventEnd - timing.fetchStart,
        load: timing.loadEventEnd - timing.fetchStart
      };
    }
    
    // どちらのAPIも使用できない場合
    return null;
  });
  
  // ログにパフォーマンス情報を出力
  console.log(`Navigation to ${url} took ${navigationTime}ms`);
  if (perfMetrics) {
    console.log(`DOMContentLoaded: ${perfMetrics.domContentLoaded}ms`);
    console.log(`Load: ${perfMetrics.load}ms`);
  }
  
  return navigationTime;
}

/**
 * 仕様で定義された基準に対するパフォーマンステスト
 * NFR-PERF-001: 主要画面の初回表示は3秒以内を目指す
 */
export async function testPerformanceThreshold(page: Page, url: string): Promise<boolean> {
  const loadTime = await measurePageLoadTime(page, url);
  
  // 3秒（3000ミリ秒）を基準とする
  const threshold = 3000;
  
  // しきい値を満たしているかをチェック
  const isPassing = loadTime <= threshold;
  
  // 結果を返す
  return isPassing;
}

/**
 * CSP設定検証テスト
 */
export async function validateCSP(page: Page): Promise<{valid: boolean, issues: string[]}> {
  // ContentSecurityPolicyの取得
  const cspHeaders = await page.evaluate(() => {
    return {
      csp: document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.getAttribute('content'),
      headers: Object.fromEntries(
        performance.getEntriesByType('resource')
          .filter(entry => entry.name === document.location.href)
          .map(entry => ([entry.name, (entry as any).responseHeaders || '']))
      )
    };
  });
  
  const issues = [];
  
  // CSPが設定されているか確認
  if (!cspHeaders.csp && Object.keys(cspHeaders.headers).length === 0) {
    issues.push('Content-Security-Policy is not set');
  }
  
  // 基本的なCSPディレクティブが含まれているか確認
  const cspValue = cspHeaders.csp || '';
  const requiredDirectives = [
    'default-src',
    'script-src',
    'style-src',
    'img-src',
    'connect-src'
  ];
  
  for (const directive of requiredDirectives) {
    if (!cspValue.includes(directive)) {
      issues.push(`Missing required CSP directive: ${directive}`);
    }
  }
  
  // unsafe-inline, unsafe-eval の使用を確認
  if (cspValue.includes('unsafe-inline') || cspValue.includes('unsafe-eval')) {
    issues.push('CSP uses unsafe-inline or unsafe-eval which may be a security risk');
  }
  
  return {
    valid: issues.length === 0,
    issues
  };
}

/**
 * アクセシビリティテスト
 * WCAGレベルAA準拠の基本的なチェック
 */
export async function runAccessibilityChecks(page: Page): Promise<{passed: boolean, violations: any[]}> {
  // axe-coreをページに注入して実行
  await page.addScriptTag({
    url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.0/axe.min.js'
  });
  
  // アクセシビリティ検証を実行
  const accessibilityResults = await page.evaluate(() => {
    return new Promise(resolve => {
      // @ts-ignore
      axe.run(document, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa'] // WCAG 2.0 レベルAとAAのチェック
        }
      }, (err, results) => {
        if (err) resolve({ error: err.message });
        resolve(results);
      });
    });
  });
  
  // エラーがあった場合
  if ('error' in accessibilityResults) {
    console.error('Accessibility check error:', accessibilityResults.error);
    return {
      passed: false,
      violations: [{ error: accessibilityResults.error }]
    };
  }
  
  return {
    passed: accessibilityResults.violations.length === 0,
    violations: accessibilityResults.violations
  };
}

/**
 * ページのレスポンシブ性をテスト
 */
export async function testResponsiveDesign(page: Page, url: string): Promise<{passed: boolean, issues: string[]}> {
  const viewports = [
    { width: 1280, height: 800, name: 'desktop' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 375, height: 667, name: 'mobile' }
  ];
  
  const issues = [];
  
  for (const viewport of viewports) {
    // ビューポートサイズを設定
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height
    });
    
    // ページをロード
    await page.goto(url);
    await page.waitForLoadState('networkidle');
    
    // 水平スクロールバーの有無をチェック
    const hasHorizontalScrollbar = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    if (hasHorizontalScrollbar) {
      issues.push(`${viewport.name} viewport (${viewport.width}x${viewport.height}) has horizontal scrollbar`);
    }
    
    // タッチターゲットのサイズをチェック（モバイルビューポートのみ）
    if (viewport.name === 'mobile') {
      const smallTouchTargets = await page.evaluate(() => {
        const interactiveElements = Array.from(document.querySelectorAll('button, a, [role="button"], input, select, textarea'));
        const smallElements = interactiveElements.filter(el => {
          const rect = el.getBoundingClientRect();
          // タッチターゲットは44x44ピクセル以上が推奨
          return (rect.width < 44 || rect.height < 44);
        });
        return smallElements.length;
      });
      
      if (smallTouchTargets > 0) {
        issues.push(`${viewport.name} viewport has ${smallTouchTargets} interactive elements smaller than 44x44px`);
      }
    }
  }
  
  return {
    passed: issues.length === 0,
    issues
  };
} 