// This file sets up Sentry in your Next.js app.
// Ensure you add required environment variables for Sentry in your production environment.

/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  // パフォーマンス最適化のための設定
  poweredByHeader: false, // 'X-Powered-By'ヘッダーを無効化
  reactStrictMode: true,
  compress: true, // HTTP圧縮を有効化
  
  // 画像最適化設定
  images: {
    domains: ['lh3.googleusercontent.com'], // Google avatarのドメインを許可
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // コード分割の最適化
  experimental: {
    optimizeCss: true, // CSSの最適化
    scrollRestoration: true, // スクロール位置の復元
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' https://apis.google.com https://accounts.google.com https://*.sentry.io https://*.vercel-insights.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https://lh3.googleusercontent.com https://*.sentry.io;
              connect-src 'self' https://tasks.googleapis.com https://www.googleapis.com https://api.vercel.com https://*.sentry.io https://*.vercel-insights.com;
              frame-src https://accounts.google.com;
              font-src 'self';
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              report-uri https://sentry.io/api/XXXX/security/?sentry_key=XXXX;
              report-to default;
            `.replace(/\s{2,}/g, ' ').trim()
          },
          {
            key: 'Report-To',
            value: JSON.stringify({
              group: 'default',
              max_age: 31536000,
              endpoints: [{ url: 'https://sentry.io/api/XXXX/security/?sentry_key=XXXX' }]
            })
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=31536000'
          }
        ]
      }
    ]
  },
  // For your own deployment set this to true:
  transpilePackages: [], // Add packages that need transpilation
};

// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, configFile, stripPrefix, urlPrefix, include, ignore

  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  
  // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
  // and need `project:releases` and `org:read` scopes
  authToken: process.env.SENTRY_AUTH_TOKEN,
  
  silent: true, // Suppresses all logs
  
  // Enable uploading source maps to Sentry in production
  // This helps with debugging issues in production
  // Set to false for development to speed up builds
  dryRun: process.env.NODE_ENV !== 'production',
};

module.exports = process.env.NEXT_PUBLIC_SENTRY_DSN
  ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
  : nextConfig; 