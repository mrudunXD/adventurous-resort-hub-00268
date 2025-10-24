import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../locales/en/translation.json';
import hiTranslation from '../locales/hi/translation.json';
import teTranslation from '../locales/te/translation.json';
import knTranslation from '../locales/kn/translation.json';
import taTranslation from '../locales/ta/translation.json';
import mrTranslation from '../locales/mr/translation.json';
import guTranslation from '../locales/gu/translation.json';
import bnTranslation from '../locales/bn/translation.json';
import paTranslation from '../locales/pa/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      hi: { translation: hiTranslation },
      te: { translation: teTranslation },
      kn: { translation: knTranslation },
      ta: { translation: taTranslation },
      mr: { translation: mrTranslation },
      gu: { translation: guTranslation },
      bn: { translation: bnTranslation },
      pa: { translation: paTranslation },
    },
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
