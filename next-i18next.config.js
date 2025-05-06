/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    localeDetection: true
  },
  fallbackLng: {
    default: ['ja'],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development'
}; 