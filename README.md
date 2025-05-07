## エラー監視サービス（Sentry）の設定

プロジェクトにはSentryのエラー監視機能が導入されています。設定するには以下の環境変数を`.env.local`に追加してください：

```
# Sentryの設定 (https://sentry.io/)
NEXT_PUBLIC_SENTRY_DSN="https://xxxxx@xxxx.ingest.sentry.io/xxxxx"
SENTRY_AUTH_TOKEN="sntrys_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
SENTRY_ORG="your-org-name"
SENTRY_PROJECT="google-todo-app"
```

本番環境では必ずSentryプロジェクトを作成し、適切なDSNとトークンを設定してください。エラー監視がない場合、本番環境でのデバッグが困難になります。 