import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, TranslationKey } from '@/locales/translations';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      // URL prefix takes precedence so that direct links (e.g. pasted in a new tab)
      // always open in the correct language, regardless of a previously saved choice.
      const path = window.location.pathname;
      if (path.startsWith('/en/') || path === '/en') return 'en';
      if (path.startsWith('/pt/') || path === '/pt') return 'pt';

      // For non-prefixed URLs (default PT routes like '/blog/...'), respect saved choice
      // only if the path is the root or clearly language-agnostic.
      const saved = localStorage.getItem('exp3-language');
      if (saved === 'pt' || saved === 'en') return saved;

      // Browser language fallback
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('pt')) return 'pt';
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('exp3-language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: TranslationKey): string => {
    const keys = key.split('.') as string[];
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation missing for key: ${key}`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
