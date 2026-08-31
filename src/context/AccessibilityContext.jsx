import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUPPORTED_LANGUAGES, getTranslation } from '../services/i18n';

const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('univo_language') || 'en');
  const [isHighContrast, setIsHighContrast] = useState(() => localStorage.getItem('univo_high_contrast') === 'true');
  const [isReducedMotion, setIsReducedMotion] = useState(() => localStorage.getItem('univo_reduced_motion') === 'true');
  const [fontSizeScale, setFontSizeScale] = useState(() => localStorage.getItem('univo_font_scale') || 'normal');

  useEffect(() => {
    localStorage.setItem('univo_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('univo_high_contrast', isHighContrast.toString());
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  useEffect(() => {
    localStorage.setItem('univo_reduced_motion', isReducedMotion.toString());
    if (isReducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }, [isReducedMotion]);

  const toggleHighContrast = () => setIsHighContrast((prev) => !prev);
  const toggleReducedMotion = () => setIsReducedMotion((prev) => !prev);

  // Helper translation function
  const t = (key) => getTranslation(language, key);

  return (
    <AccessibilityContext.Provider
      value={{
        language,
        setLanguage,
        languages: SUPPORTED_LANGUAGES,
        isHighContrast,
        toggleHighContrast,
        isReducedMotion,
        toggleReducedMotion,
        fontSizeScale,
        setFontSizeScale,
        t
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => useContext(AccessibilityContext);
