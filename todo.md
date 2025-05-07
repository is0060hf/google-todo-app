# Google TODO連携アプリケーション 開発タスク一覧

## 1. プロジェクト初期設定
- [x] Next.jsプロジェクトの作成（v14以上）
- [x] 必要なパッケージのインストール（Material UI、Prisma、next-auth、React Query、Zustand）
- [x] プロジェクト構成の整備
- [x] 環境変数の設定（.env.local）
- [x] Google Cloud Platform設定（OAuth同意画面、認証情報）
- [x] Google Tasks APIの有効化と権限設定

## 2. データベース設計・実装
- [x] Neonアカウント作成とデータベース設定
- [x] Prismaスキーマの定義（User、TaskCustomData、Tag、Priority、統計モデル）
- [x] マイグレーション実行と初期データ投入
- [x] Prismaクライアント設定

## 3. 認証機能実装
- [x] next-auth設定（Google Provider）
- [x] サーバーサイドセッション管理
- [x] ログイン/ログアウトフロー
- [x] 権限管理（API認証）
- [x] 利用規約・プライバシーポリシー同意画面

## 4. バックエンドAPI実装
- [x] APIルート構造設計
- [x] Google Tasks API連携エンドポイント
  - [x] タスクリスト管理（取得/作成/更新/削除）
  - [x] タスク管理（取得/作成/更新/削除/移動/完了状態変更）
- [x] 独自データ管理エンドポイント
  - [x] タスク独自データ（優先度、タグ）
  - [x] タグCRUD操作
- [x] ダッシュボード統計データエンドポイント
- [x] ユーザー管理エンドポイント

## 5. フロントエンド基盤実装
- [x] アプリケーションレイアウト設計
- [x] レスポンシブデザイン対応
- [x] 状態管理設定（Zustand）
- [x] APIキャッシュ設定（React Query）
- [x] 共通UIコンポーネント開発

## 6. タスクリスト/タスク管理UI実装
- [x] タスクリストサイドバーコンポーネント
- [x] タスク一覧表示（DataGrid）
  - [x] ソート機能
  - [x] フィルタリング機能
- [x] タスク詳細表示・編集モーダル
- [x] タスク作成・編集フォーム
- [x] タスク削除機能
- [x] タスク完了状態切替機能
- [x] タスク移動機能
- [x] サブタスク管理

## 7. 独自機能（優先度・タグ付け）実装
- [x] 優先度選択コンポーネント
- [x] タグ選択・管理コンポーネント
- [x] 独自データ連携処理（Google Tasks APIデータとの統合）

## 8. ダッシュボード機能実装
- [x] 統計データ収集・計算ロジック
- [x] 各種グラフコンポーネント
  - [x] 完了数推移グラフ
  - [x] 完了率推移グラフ
  - [x] 作成vs完了グラフ
  - [x] アクティビティヒートマップ
  - [x] 分布円グラフ
- [x] 期間切替機能（日次/週次/月次/年次）

## 9. セキュリティ対策
- [x] CSP設定
- [x] CSRF対策
- [x] 認証トークン安全管理
- [x] エラーハンドリング

## 10. パフォーマンス最適化
- [x] キャッシュ戦略実装
- [x] リクエスト最適化（etag活用）
- [x] ローディング表示
- [x] スケルトン表示

## 11. テスト実装
- [ ] 単体テスト（コンポーネント、API）
- [ ] 結合テスト
- [x] E2Eテスト
  - [x] バックエンドE2Eテスト
    - [x] テスト環境構築
      - [x] Jest、SupertestなどのE2Eテストフレームワーク設定
      - [x] テスト用データベース設定
      - [x] Google Tasks APIモックサーバー構築
      - [x] テストユーザー作成とセッション管理
      - [x] Next.js APIルートテスト用環境設定
    - [x] テスト実装の改善
      - [x] APIロジックの分離とテスト容易化
      - [x] ビジネスロジックの分離とモック
      - [x] PrismaのDBクエリのモック実装
      - [x] タグ作成APIのテスト実装改善
      - [x] タスクリスト詳細取得APIのテスト実装改善
      - [x] タスクリスト作成APIのテスト実装改善
      - [x] 全APIエンドポイントのテスト実装（残り）
        - [x] タグ管理テスト（残り）
          - [x] GET /api/tags/[tagId] - タグ詳細取得
          - [x] PATCH /api/tags/[tagId] - タグ更新
          - [x] DELETE /api/tags/[tagId] - タグ削除
        - [x] ユーザー管理テスト（残り）
          - [x] PATCH /api/user - ユーザー情報更新
          - [x] POST /api/user/subscription - サブスクリプションプラン更新
          - [x] DELETE /api/user/delete - アカウント削除
        - [x] タスク独自データテスト
          - [x] GET /api/tasks/custom/[taskId] - タスク独自データ取得
          - [x] PATCH /api/tasks/custom/[taskId] - タスク独自データ更新
          - [x] DELETE /api/tasks/custom/[taskId] - タスク独自データ削除
        - [x] 優先度管理テスト
          - [x] GET /api/priorities - 優先度一覧取得
        - [x] 統計データ管理テスト
          - [x] GET /api/stats/daily - 日次統計データ取得
          - [x] GET /api/stats/weekly - 週次統計データ取得
          - [x] GET /api/stats/monthly - 月次統計データ取得
          - [x] GET /api/stats/yearly - 年次統計データ取得
          - [x] POST /api/stats/update - 統計データ更新
    - [x] 認証関連テスト
      - [x] Googleログインフロー
      - [x] セッション管理
      - [x] 権限チェック
      - [x] 利用規約同意プロセス
    - [x] タスクリスト管理テスト
      - [x] タスクリスト一覧取得テスト（正常系/異常系）
      - [x] タスクリスト作成テスト（正常系/異常系）
      - [x] タスクリスト取得テスト（正常系/異常系）
      - [x] タスクリスト更新テスト（正常系/異常系）
      - [x] タスクリスト削除テスト（正常系/異常系）
    - [x] タスク管理テスト
      - [x] タスク一覧取得テスト（正常系/異常系）
      - [x] タスク作成テスト（正常系/異常系）
      - [x] タスク取得テスト（正常系/異常系）
      - [x] タスク更新テスト（正常系/異常系）
      - [x] タスク削除テスト（正常系/異常系）
      - [x] タスク完了状態切替テスト（正常系/異常系）
      - [x] タスク移動テスト（正常系/異常系）
    - [x] タグ管理テスト
      - [x] タグ一覧取得テスト（正常系/異常系）
      - [x] タグ作成テスト（正常系/異常系）
      - [x] タグ取得テスト（正常系/異常系）
      - [x] タグ更新テスト（正常系/異常系）
      - [x] タグ削除テスト（正常系/異常系）
    - [x] 優先度管理テスト
      - [x] 優先度一覧取得テスト（正常系/異常系）
    - [x] タスク独自データテスト
      - [x] タスク独自データ取得テスト（正常系/異常系）
      - [x] タスク独自データ更新テスト（正常系/異常系）
      - [x] タスク独自データ削除テスト（正常系/異常系）
      - [x] 統計データ管理テスト
        - [x] 日次統計データ取得テスト（正常系/異常系）
        - [x] 週次統計データ取得テスト（正常系/異常系）
        - [x] 月次統計データ取得テスト（正常系/異常系）
        - [x] 年次統計データ取得テスト（正常系/異常系）
        - [x] 統計データ更新テスト（正常系/異常系）
      - [x] ユーザー管理テスト
        - [x] ユーザー情報取得テスト（正常系/異常系）
        - [x] ユーザー情報更新テスト（正常系/異常系）
        - [x] 利用規約同意状態更新テスト（正常系/異常系）
        - [x] サブスクリプションプラン更新テスト（正常系/異常系）
        - [x] アカウント削除テスト（正常系/異常系）
      - [ ] テストカバレッジ測定と改善
        - [x] カバレッジレポート生成
        - [ ] 90%以上のカバレッジ達成のためのテスト追加
          - [ ] auth.tsの認証関連関数のテスト強化
            - [ ] mockAuthenticatedUser関数の分岐カバレッジ向上
            - [ ] mockUnauthenticatedUser関数のテスト拡充
            - [ ] mockMissingAccessToken関数のエッジケーステスト
            - [ ] ユーザーロール別の認証テスト
          - [ ] api-test-utils.tsの未カバー部分のテスト追加
            - [ ] エラーハンドリングパスのテスト強化
            - [ ] トランザクション処理のエッジケーステスト
            - [ ] タスク移動APIのパラメータバリエーションテスト
            - [ ] 統計データAPI内の日付処理エッジケーステスト
          - [ ] 境界値テストの追加
            - [ ] データ入力の最大長テスト
            - [ ] 数値パラメータの上限/下限テスト
            - [ ] 日付範囲の境界値テスト
          - [ ] レアケースのテスト追加
            - [ ] データベース接続エラー時の動作検証
            - [ ] APIレート制限到達時の動作検証
            - [ ] トークン期限切れ時の動作検証
      - [x] エラーケースのテスト
        - [x] ネットワークエラーハンドリングテスト
        - [x] 入力バリデーションテスト
        - [x] 権限エラーテスト
      - [x] 負荷テスト
        - [x] APIエンドポイントの同時多数リクエスト処理テスト
        - [x] データベースの大量データ処理テスト
      - [x] セキュリティテスト
        - [x] 認証バイパステスト
        - [x] APIエンドポイントの不正アクセステスト
        - [x] CSRF保護テスト
  - [x] フロントエンドE2Eテスト
    - [x] テスト環境構築
      - [x] Playwright/Cypressのセットアップ
      - [x] テスト用ユーザーアカウント設定
      - [x] モック認証サービス構築
      - [x] スクリーンショット・動画キャプチャ設定
    - [x] 認証フローテスト
      - [x] ログイン・ログアウトテスト
      - [x] 未認証時のリダイレクトテスト
      - [x] 認証状態の永続化テスト
    - [x] ダッシュボードテスト
      - [x] 統計グラフ表示テスト
      - [x] 期間切替機能テスト
      - [x] データなし状態の表示テスト
      - [x] 優先度・タグ分布表示テスト
    - [x] タスク管理テスト
      - [x] タスクリスト選択テスト
      - [x] タスク一覧表示テスト
      - [x] タスク作成テスト
      - [x] タスク編集テスト
      - [x] タスク削除テスト（確認ダイアログ含む）
      - [x] タスク完了状態切替テスト
      - [x] タスク移動テスト
      - [x] サブタスク管理テスト
    - [x] フィルタリングテスト
      - [x] 優先度フィルターテスト
      - [x] タグフィルターテスト
      - [x] ステータスフィルターテスト
      - [x] 期限フィルターテスト
      - [x] フィルターリセットテスト
      - [x] フィルタリング結果の確認テスト
    - [x] レスポンシブ対応テスト
      - [x] 異なる画面サイズでの表示テスト
      - [x] モバイル表示時のサイドバー切替テスト
      - [x] タッチ操作テスト
    - [x] 多言語対応テスト
      - [x] 言語切替テスト
      - [x] UI要素の翻訳確認テスト
    - [x] エラー処理テスト
      - [x] ネットワークエラー表示テスト
      - [x] ロード状態表示テスト
      - [x] 入力バリデーションテスト
    - [x] パフォーマンステスト
      - [x] ページロード時間測定
      - [x] データグリッド表示パフォーマンス

## 12. デプロイ・CI/CD
- [ ] Vercelデプロイ設定
- [ ] 環境変数設定
- [ ] CI/CD構築（GitHub Actions）
- [ ] エラー監視設定

## 13. 運用準備
- [ ] ドキュメント作成
- [ ] プライバシーポリシー・利用規約作成
- [ ] サポート体制構築 

## 14. タスクリスト/タスク管理UI実装の修正
- [x] タスク削除機能の完全実装
  - [x] TaskDataGrid.tsxのhandleDeleteTask関数にAPIの呼び出しを実装
  - [x] 削除前の確認ダイアログの追加
  - [x] 削除後のUI更新処理の実装
- [x] タスク移動機能の実装
  - [x] タスクの表示順序変更機能（ドラッグ&ドロップまたはボタン）
  - [x] タスク移動APIとの連携実装
  - [x] API呼び出しにエラーハンドリングの追加
- [x] 優先度とタグ表示の実装
  - [x] TaskDataGrid.tsxでの優先度とタグのデータ取得
  - [x] カスタムデータと連携したレンダリング処理
  - [x] フィルタリング機能との連携
- [x] サブタスク管理機能の実装
  - [x] サブタスクのUI表示（階層構造）
  - [x] サブタスク作成・編集・削除機能
  - [x] 親子関係の管理
  - [x] 5階層までのネスト制限の実装 

## 15. 要修正・未実装タスク
- [x] CSP設定の実装
  - [x] next.config.jsでのContent-Security-Policy設定（仕様書4.8.1参照）
  - [x] その他のセキュリティヘッダー設定（X-Content-Type-Options, X-Frame-Options など）
- [x] 統計データの実際のデータ使用
  - [x] DistributionPieChartでのモックデータをAPIデータに置き換え（優先度・タグ分布）
- [x] タグと優先度のフィルタリング実装強化
  - [x] DataGridでのタグでのフィルタリング機能の完全実装
  - [x] 優先度フィルターの完全実装
- [x] レスポンシブデザイン改善
  - [x] モバイル画面でのダッシュボードレイアウト調整
  - [x] タスク一覧画面のモバイル対応強化
- [ ] エラー監視設定
  - [ ] Sentryなどの外部エラー監視サービスの導入検討
- [x] 国際化対応
  - [x] プレースホルダだけでなくi18nライブラリを使用した国際化対応

## 16. フロントエンドE2Eテスト環境整備と実行
- [x] 依存関係の修正
  - [x] package.jsonへのNext.js関連パッケージ追加（next, react, react-dom）
  - [x] Material UI関連パッケージ追加（@mui/material, @mui/icons-material, @mui/x-data-grid）
  - [x] Babelプリセット追加（@babel/core, @babel/preset-env, @babel/preset-react, @babel/preset-typescript）
  - [x] 開発・ビルドスクリプト追加（build, start, lint, test:e2e）
- [x] playwright.config.ts設定修正
  - [x] webServer設定の有効化とタイムアウト設定
  - [x] ブラウザプロジェクト設定の最適化
  - [x] スクリーンショット・ビデオキャプチャ設定
- [x] 認証テスト強化
  - [x] モック認証機能（auth-utils.ts）とNext Auth連携の整合性確認
  - [x] API認証のモック方法の改善
  - [x] CSRF保護機能のテスト強化
- [x] APIモック強化
  - [x] Google Tasks API応答とアプリケーションモデルの整合性確保
  - [x] etag対応とキャッシュ検証テスト
  - [x] エラーハンドリングと再試行機能のテスト拡充
- [x] 非機能要件テスト強化
  - [x] パフォーマンステスト基準の明確化（NFR-PERF-001: 3秒以内のロード）
  - [x] CSP設定検証テスト
  - [x] アクセシビリティテスト（WCAG レベルAA準拠）
- [ ] テストデータとテストケースの拡充
  - [x] エッジケース（大量データ、極端な入力値）のテスト
  - [ ] 複数ユーザーのマルチセッションテスト
  - [ ] オフライン・低帯域幅環境のテスト
- [ ] CI/CD統合
  - [ ] GitHub Actionsでのフロントエンドテスト自動化
  - [ ] テスト結果レポートとアラート設定
  - [ ] モバイルデバイスエミュレーションテスト強化

## 17. テスト品質向上と保守性改善
- [ ] テストコード保守性向上
  - [ ] Page Objectパターンによるテストコードのリファクタリング
  - [ ] テストユーティリティ関数の共通化と統合
  - [ ] テストシナリオのドキュメント化とトレーサビリティ向上
- [ ] カバレッジ測定と改善
  - [ ] フロントエンドE2Eテストのカバレッジ目標設定
  - [ ] ユーザーフロー網羅率の測定と改善
  - [ ] 仕様書要件とテスト項目のトレーサビリティマトリクス作成
- [ ] テスト安定性向上
  - [ ] フレーキーテスト（不安定なテスト）の特定と安定化
  - [ ] タイミング依存テストの堅牢性向上
  - [ ] 環境依存性の最小化 

## 18. 'use client'ディレクティブの追加
- [x] app/layout.tsxに'use client'ディレクティブを追加する
  - 理由: ThemeProviderとcreateThemeをインポートしており、クライアントコンポーネントとして指定する必要がある
- [x] app/src/app/layout.tsxに'use client'ディレクティブを追加する（存在する場合）
  - 理由: レイアウトコンポーネントでクライアントサイド機能を使用する可能性がある
- [x] app/src/app/page.tsxに'use client'ディレクティブを追加する
  - 理由: useQueryなどのクライアントサイドのフックを使用している可能性がある

### 既に'use client'ディレクティブが設定されているコンポーネント（参考）
1. UIコンポーネント:
- app/components/ui/SkeletonList.tsx
- app/components/ui/ConfirmDialog.tsx
- app/components/ui/LoadingContainer.tsx
- app/components/ui/Alert.tsx
- app/components/ui/TextField.tsx
- app/components/ui/Loading.tsx
- app/components/ui/Button.tsx
- app/components/ui/Modal.tsx
- app/components/ui/Select.tsx
- app/components/ui/LanguageSwitcher.tsx

2. タスク関連コンポーネント:
- app/components/tasks/TaskListSidebar.tsx
- app/components/tasks/TaskModal.tsx
- app/components/tasks/TaskDataGrid.tsx
- app/components/tasks/TaskFilterBar.tsx
- app/tasks/page.tsx

3. ダッシュボード関連コンポーネント:
- app/components/dashboard/CompletedTasksChart.tsx
- app/components/dashboard/PeriodSelector.tsx
- app/components/dashboard/CreatedVsCompletedChart.tsx
- app/components/dashboard/CompletionRateChart.tsx
- app/components/dashboard/ActivityHeatmapChart.tsx
- app/components/dashboard/DistributionPieChart.tsx
- app/dashboard/page.tsx

4. カスタムコンポーネント:
- app/components/custom/PrioritySelector.tsx
- app/components/custom/TagSelector.tsx
- app/components/custom/CustomDataManager.tsx

5. その他:
- app/components/layout/Header.tsx
- app/components/error/ErrorBoundary.tsx
- app/auth/mock-signin/page.tsx
- app/auth/signin/page.tsx
- app/auth/error/page.tsx
- app/terms-agreement/page.tsx
- app/providers.tsx

### E2Eテスト修正に関するタスク
- [ ] 'use client'ディレクティブを追加した後にE2Eテストを実行して検証
  - [x] 'metadata'のエクスポートとの競合を解決するために、ThemeProviderWrapperを別コンポーネントとして実装
  - [x] auth-utils.tsのlocalStorage操作部分をエラー耐性のあるように修正
  - [x] Playwrightの設定でstorage-accessパーミッションを追加
- [ ] 必要に応じて追加のコンポーネントにも'use client'ディレクティブを追加
- [ ] 追加したディレクティブによる影響がないか確認（サーバーサイドレンダリングの最適化など） 