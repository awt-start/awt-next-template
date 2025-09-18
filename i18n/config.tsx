// app/i18n/config.ts

import SvgIcon from "@/components/icon/icon";
import { Language } from "@/lib/constants";
import { getStorageKey, STORAGE_KEYS } from "@/lib/storage";

export const supportedLocales = [Language.ZH, Language.EN] as const;
export type Locale = (typeof supportedLocales)[number];

export const i18nConfig = {
  locales: supportedLocales,
  defaultLocale: Language.ZH,

  localeLabels: {
    [Language.ZH]: "中文",
    [Language.EN]: "English",
  } as const,

  localeIcons: {
    [Language.ZH]: <SvgIcon icon="ion:language-sharp" />,
    [Language.EN]: <SvgIcon icon="material-symbols:language-us" />,
  } as const,

  // Cookie 配置 - 用于基于 cookie 的语言切换
  cookie: {
    name: `lang`,
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  },
} as const;

/**
 * 检测语言（通用函数，服务端/客户端均可使用）
 * 支持：'zh', 'en', 'zh-CN', 'en-US', 'zh-tw' 等变体
 */
export function detectLocale(locale?: string | null): Locale {
  if (!locale) return i18nConfig.defaultLocale;

  // 标准化语言标签：移除 - 和 _，转小写
  const normalized = locale.toLowerCase().replace(/[-_]/g, "");

  for (const lang of i18nConfig.locales) {
    const normalizedLang = lang.toLowerCase();
    if (
      normalized === normalizedLang || // 完全匹配：zh == zh
      normalized.includes(normalizedLang) || // 包含：zhcn 包含 zh
      normalizedLang.includes(normalized) // 反向包含：zh 包含在 zh-cn 中
    ) {
      return lang;
    }
  }

  return i18nConfig.defaultLocale;
}
