'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { i18nConfig, type Locale } from '@/i18n/config';

// ============================
// 类型定义与辅助工具
// ============================

/**
 * 检查给定字符串是否为合法的 Locale
 */
function isValidLocale(locale: string): locale is Locale {
  return i18nConfig.locales.includes(locale as Locale);
}

/**
 * 安全获取当前 Locale（带类型保护）
 */
export function useCurrentLocale(): Locale {
  const locale = useLocale();
  if (!isValidLocale(locale)) {
    console.warn(`Invalid locale detected: ${locale}, falling back to ${i18nConfig.defaultLocale}`);
    return i18nConfig.defaultLocale;
  }
  return locale;
}

// ============================
// Cookie 工具（可复用）
// ============================

/**
   * 设置语言 Cookie - 使用统一的 cookie 配置
   */
  export function setLocaleCookie(locale: Locale): void {
    if (typeof window === 'undefined') {
      return;
    }
    
    const { cookie } = i18nConfig;
    const cookieString = [
      `${cookie.name}=${encodeURIComponent(locale)}`,
      `path=${cookie.path}`,
      `max-age=${cookie.maxAge}`,
      `SameSite=${cookie.sameSite}`,
      cookie.secure ? 'secure' : '',
    ].filter(Boolean).join('; ');
    
    document.cookie = cookieString;
  }

/**
 * 获取语言 Cookie - 客户端专用
 */
export function getLocaleFromCookie(): Locale | null {
  // 检查是否在客户端
  if (typeof window === 'undefined') {
    return null;
  }
  
  const { cookie } = i18nConfig;
  const match = document.cookie.match(new RegExp(`(?:^|; )${cookie.name}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : null;
  return value && isValidLocale(value) ? value : null;
}

/**
   * 删除语言 Cookie
   */
  export function removeLocaleCookie(): void {
    if (typeof window === 'undefined') {
      return;
    }
    
    const { cookie } = i18nConfig;
    document.cookie = `${cookie.name}=; path=${cookie.path}; max-age=0`;
  }

// ============================
// 语言切换 Hook（增强版：支持无跳转切换）
// ============================

/**
 * 语言切换 Hook - Cookie 模式专用
 * @returns 包含当前语言、切换方法、可用语言列表等信息的对象
 */
export function useLanguageSwitch() {
  const router = useRouter();
  const currentLocale = useCurrentLocale();

  /**
   * 切换语言（基于 cookie 模式）
   * @param locale 目标语言
   * @param reload 是否刷新页面以应用新语言（默认 true）
   */
  const switchLanguage = (locale: Locale, reload: boolean = true): void => {
    if (locale === currentLocale) return;

    // 设置 cookie
    setLocaleCookie(locale);

    if (reload) {
      // 刷新页面，服务端会根据新的 cookie 重新渲染
      router.refresh();
    }
  };

  /**
   * 重置为默认语言
   */
  const resetToDefault = (reload: boolean = true): void => {
    removeLocaleCookie();
    if (reload) {
      router.refresh();
    }
  };

  return {
    currentLocale,
    switchLanguage,
    resetToDefault,
    locales: i18nConfig.locales,
    localeLabels: i18nConfig.localeLabels,
    localeIcons: i18nConfig.localeIcons,
    // 工具方法
    getLocaleFromCookie,
    setLocaleCookie,
    removeLocaleCookie,
  };
}

// ============================
// 语言标签与图标（带缓存）
// ============================

const labelCache = new Map<Locale, string>();
const iconCache = new Map<Locale, string>();

/**
 * 获取语言标签（带缓存）
 */
export function getLocaleLabel(locale: Locale): string {
  if (!labelCache.has(locale)) {
    const label = i18nConfig.localeLabels[locale];
    if (!label) {
      console.warn(`No label defined for locale: ${locale}`);
    }
    labelCache.set(locale, label || locale.toUpperCase());
  }
  return labelCache.get(locale)!;
}

/**
 * 获取语言图标（带缓存）
 */
export function getLocaleIcon(locale: Locale): string {
  if (!iconCache.has(locale)) {
    const icon = i18nConfig.localeIcons[locale];
    if (!icon) {
      console.warn(`No icon defined for locale: ${locale}`);
    }
    // @ts-ignore
    iconCache.set(locale, icon || locale);
  }
  return iconCache.get(locale)!;
}

// ============================
// 浏览器语言检测（客户端）
// ============================

/**
 * 检测浏览器首选语言，返回最匹配的 Locale
 * 支持：zh-CN → zh, en-US → en, pt-BR → pt 等
 */
export function detectBrowserLanguage(): Locale {
  if (typeof window === 'undefined') return i18nConfig.defaultLocale;

  const browserLanguages = navigator.languages.map(lang => lang.toLowerCase().replace('-', '_'));
  browserLanguages.unshift(navigator.language.toLowerCase().replace('-', '_')); // 添加主语言

  for (const lang of browserLanguages) {
    for (const locale of i18nConfig.locales) {
      const normalizedLocale = locale.toLowerCase().replace('-', '_');
      if (lang === normalizedLocale) {
        return locale;
      }
      // 尝试前缀匹配：zh_CN → zh, en_US → en
      const prefix = lang.split('_')[0];
      if (normalizedLocale.startsWith(prefix)) {
        return locale;
      }
    }
  }

  return i18nConfig.defaultLocale;
}