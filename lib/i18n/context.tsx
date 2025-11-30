'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import en from '@/locales/en/common.json';
import ru from '@/locales/ru/common.json';

type Locale = 'en' | 'ru';
type Translations = typeof en;

const translations: Record<Locale, Translations> = {
  en,
  ru,
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  const value = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
