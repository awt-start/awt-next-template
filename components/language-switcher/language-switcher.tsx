/**
 * 语言切换组件
 */

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLanguageSwitch } from '@/utils/i18n';
import { i18nConfig, type Locale } from '@/i18n/config';

export function LanguageSwitcher() {
  const t = useTranslations('language');
  const { currentLocale, switchLanguage } = useLanguageSwitch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (locale: Locale) => {
    console.log('Switching to locale:', locale);
    switchLanguage(locale, true); // 使用 cookie 模式，刷新页面以应用新语言
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={t('switch')}
      >
        <span className="text-lg">
          {i18nConfig.localeIcons[currentLocale]}
        </span>
        <span className="text-sm font-medium">
          {i18nConfig.localeLabels[currentLocale]}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            {i18nConfig.locales.map((locale) => (
              <button
                key={locale}
                type="button"
                onClick={() => handleLanguageChange(locale)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  locale === currentLocale
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-lg">
                  {i18nConfig.localeIcons[locale]}
                </span>
                <span className="text-sm font-medium">
                  {i18nConfig.localeLabels[locale]}
                </span>
                {locale === currentLocale && (
                  <svg
                    className="w-4 h-4 ml-auto text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

