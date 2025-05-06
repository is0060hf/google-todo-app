'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

// 言語リソースを動的にインポートする設定
i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../../../public/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    lng: 'ja', // デフォルト言語
    fallbackLng: 'ja',
    supportedLngs: ['ja', 'en'],
    defaultNS: 'common',
    fallbackNS: 'common',
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18next; 