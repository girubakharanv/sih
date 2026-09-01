import React, { createContext, useContext, useState, useCallback } from 'react';
import { getTranslation, SUPPORTED_LANGUAGES } from '../services/i18n';

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('univo_language') || 'en';
  });

  const setLanguage = useCallback((langCode) => {
    setLanguageState(langCode);
    localStorage.setItem('univo_language', langCode);
  }, []);

  const t = useCallback((key) => {
    return getTranslation(language, key);
  }, [language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, LANGUAGES: SUPPORTED_LANGUAGES }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useTranslation = () => useContext(I18nContext);
