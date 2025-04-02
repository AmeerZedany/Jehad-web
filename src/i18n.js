import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en.json';
import translationAR from './locales/ar.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      ar: { translation: translationAR }
    },
    fallbackLng: 'ar', // 👈 تأكد من هذا السطر
    lng: 'ar',          // 👈 اضف هذا السطر لجعل العربية اللغة الافتراضية
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
