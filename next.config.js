// This file sets up Sentry in your Next.js app.
// Ensure you add required environment variables for Sentry in your production environment.

/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' https://apis.google.com https://accounts.google.com https://*.sentry.io https://*.vercel-insights.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https://lh3.googleusercontent.com https://*.sentry.io;
              connect-src 'self' https://tasks.googleapis.com https://www.googleapis.com https://api.vercel.com https://*.sentry.io https://*.vercel-insights.com;
              frame-src https://accounts.google.com;
              font-src 'self';
              object-src 'none';
              base-uri 'self';
              form-action 'self';
            `.replace(/\s{2,}/g, ' ').trim()
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
            value: 'camera=(), microphone=(), geolocation=()'
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