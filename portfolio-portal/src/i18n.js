import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from './translations/en.json';
import msTranslations from './translations/ms.json';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslations },
            ms: { translation: msTranslations },
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;