import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { AuthProvider } from './context/auth'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    fallbackLng: 'vi',
    detection: {
      order: ['localStorage', 'htmlTag', 'cookie'],
      caches: ['localStorage'],
    },
    backend: {
      loadPath: '/languages/{{lng}}/translation.json'
    },
    react: { useSuspense: false },
  });


ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
