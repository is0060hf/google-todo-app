# API呼び出し最適化

このディレクトリには、Google Tasks APIとの連携を最適化するための機能が含まれています。

## 最適化の主な機能

1. **指数バックオフを用いたリトライロジック**
   - 一時的なエラー（429, 500, 502, 503, 504など）に対する自動リトライ
   - Googleの推奨に従った指数バックオフ（1秒→2秒→4秒→...）
   - 最大64秒までの待機時間
   - Retry-Afterヘッダーの尊重

2. **ETagによる不要なデータ取得の最小化**
   - If-None-Match/ETagヘッダーを使用した条件付きリクエスト
   - 304 Not Modifiedレスポンスのハンドリング
   - ローカルストレージを活用したETag永続化

3. **ローカルストレージによるデータの永続化**
   - オフライン対応のためのデータキャッシュ
   - 有効期限（TTL）設定によるキャッシュ管理

4. **ポーリング間隔の最適化**
   - 最小5分間隔の設定によるAPI負荷軽減
   - バックグラウンド同期の効率化

## 実装ファイル

- `optimized-google-tasks.ts`: サーバーサイドで使用する最適化されたAPI関数
- `retry-utils.ts`: 指数バックオフを実装したリトライユーティリティ
- `hooks/useEnhancedQuery.ts`: クライアントサイドで使用する最適化されたReact Queryフック
- `etag-utils.ts`: ETag管理のためのユーティリティ関数

## 使用方法

### サーバーサイド（APIルート）

```typescript
// APIルート内での使用例
import * as optimizedApi from '../lib/api/optimized-google-tasks';

export async function GET(request: Request) {
  // ETagを活用した条件付きリクエスト
  const ifNoneMatch = request.headers.get('If-None-Match');
  const result = await optimizedApi.getTaskListsOptimized(accessToken, ifNoneMatch);
  
  // 304 Not Modified の処理
  if (result.notModified) {
    return new NextResponse(null, { status: 304 });
  }
  
  // 正常レスポンスとETagの設定
  const response = NextResponse.json({ data: result.data });
  if (result.etag) {
    response.headers.set('ETag', result.etag);
  }
  
  return response;
}
```

### クライアントサイド（React Component）

```typescript
// Reactコンポーネント内での使用例
import { useEnhancedGoogleTasksQuery } from '../lib/hooks/useEnhancedQuery';
import { useSession } from 'next-auth/react';

function TaskList() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  
  const { data, isLoading, error } = useEnhancedGoogleTasksQuery(
    ['tasklists'],
    'https://tasks.googleapis.com/tasks/v1/users/@me/lists',
    accessToken,
    {
      etagKey: 'tasklists',
      localStorageKey: 'tasklists_data',
      refetchInterval: 10 * 60 * 1000, // 10分ごとに再取得（5分未満は自動的に5分に調整）
      retryOptions: {
        maxRetries: 3,
        retryableStatusCodes: [408, 429, 500, 502, 503, 504],
      }
    }
  );
  
  // 以下、通常のReact Queryと同様の使用方法
}
```

## 設定パラメータ

- **staleTime**: データが「新鮮」と見なされる時間（デフォルト: 5分）
- **gcTime**: キャッシュデータが保持される時間（デフォルト: 30分）
- **maxRetries**: 最大リトライ回数（デフォルト: 3）
- **initialDelay**: 初回リトライ待機時間（デフォルト: 1秒）
- **maxDelay**: 最大リトライ待機時間（デフォルト: 64秒）
- **refetchInterval**: データ再取得間隔（最小: 5分）
- **localStorageTtl**: ローカルストレージキャッシュの有効期限（デフォルト: 1日） 