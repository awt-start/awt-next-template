// app/i18n/request-config.ts
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { i18nConfig, Locale } from "./config";
import { getStorageKey, STORAGE_KEYS } from "@/lib/storage";

// 类型守卫：检查字符串是否为有效的 Locale
function isValidLocale(locale: string): locale is Locale {
  return i18nConfig.locales.includes(locale as Locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const cookieStore = await cookies();
  // console.log('cookieStore', cookieStore);

  const cookieLocale = cookieStore.get(i18nConfig.cookie.name)?.value;
  // 1. 优先从 Cookie 获取语言
  let locale: Locale;

  if (cookieLocale && isValidLocale(cookieLocale)) {
    locale = cookieLocale;
  }
  // 2. 其次从请求头中的 Accept-Language 或 URL 路径获取
  else if (
    requestLocale &&
    typeof requestLocale === "string" &&
    isValidLocale(requestLocale)
  ) {
    locale = requestLocale;
  }
  // 3. 最后回退到默认语言
  else {
    locale = i18nConfig.defaultLocale;
  }

  try {
    // 动态导入对应语言的翻译文件
    const messagesModule = await import(`../locales/${locale}/index.json`);
    return {
      locale,
      messages: messagesModule.default,
    };
  } catch (error) {
    console.warn(
      `Locale messages not found for "${locale}", falling back to ${i18nConfig.defaultLocale}`,
      error
    );

    // 加载默认语言的翻译
    const fallbackModule = await import(
      `../locales/${i18nConfig.defaultLocale}/index.json`
    );
    return {
      locale: i18nConfig.defaultLocale,
      messages: fallbackModule.default,
    };
  }
});
