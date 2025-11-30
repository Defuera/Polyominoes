'use client';

import { useI18n } from '@/lib/i18n/context';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex gap-2 bg-white rounded-lg shadow-md p-1">
      <button
        onClick={() => setLocale('en')}
        className={`
          px-4 py-2 rounded-md font-semibold transition-all duration-200
          ${locale === 'en' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}
        `}
      >
        EN
      </button>
      <button
        onClick={() => setLocale('ru')}
        className={`
          px-4 py-2 rounded-md font-semibold transition-all duration-200
          ${locale === 'ru' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}
        `}
      >
        RU
      </button>
    </div>
  );
}
