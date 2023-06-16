import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import viTranslation from './locales/vi.json';
import jpTranslation from './locales/jp.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      vi: {
        translation: viTranslation
      },
      jp: {
        translation: jpTranslation
      }
    },
    lng: 'vi', // Default language
    fallbackLng: 'vi', // Fallback language
    interpolation: {
      escapeValue: false // Allows using HTML tags in translations
    }
});

export default i18n;