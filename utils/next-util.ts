/**
 * Next.js 高频工具函数集合
 * ES6 模块风格，TypeScript 类型安全，SSR 安全，Tree-shaking 友好
 *
 * 推荐用法：
 * import { cn, useDebounce, isClient, formatCurrency } from '@/lib/utils';
 *
 * @author hsc
 */

// =============================
// 🎨 Tailwind 类名合并器（推荐标准）
// =============================

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并多个类名，自动处理 Tailwind 冲突
 * @param inputs - 支持字符串、对象、数组、undefined/null
 * @returns 合并后的类名字符串
 *
 * 示例：
 * cn("text-red-500", { "font-bold": isActive }, ["ml-2", "p-1"], undefined, "")
 * // → "text-red-500 font-bold ml-2 p-1"
 */
function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// =============================
// ⏱️ 防抖 Hook（客户端专用）
// =============================

import { useState, useEffect } from "react";

/**
 * 自定义防抖 Hook
 * @param value - 要防抖的值
 * @param delay - 延迟时间（毫秒）
 * @returns 防抖后的值
 *
 * 示例：
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearch = useDebounce(searchTerm, 500);
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// =============================
// 🌐 客户端检测（通用）
// =============================

/**
 * 判断当前是否运行在浏览器环境（客户端）
 * 用于 SSR 安全判断，避免在服务端访问 window/document
 */
const isClient = typeof window !== "undefined";

// =============================
// 💰 货币格式化（支持国际化）
// =============================

/**
 * 格式化数字为货币字符串
 * @param amount - 数值（如 1234.56）
 * @param options - 可选配置（locale, currency）
 * @returns 格式化后的货币字符串
 *
 * 示例：
 * formatCurrency(1234.56)           // "¥1,234.56" (zh-CN)
 * formatCurrency(1234.56, { locale: 'en-US', currency: 'USD' }) // "$1,234.56"
 */
function formatCurrency(
  amount: number,
  options: {
    locale?: string;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {}
): string {
  const {
    locale = "zh-CN",
    currency = "CNY",
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}

// =============================
// 📅 简单日期格式化（ISO 8601 → 友好格式）
// =============================

/**
 * 将 ISO 8601 字符串或 Date 对象格式化为“X小时前”等友好格式
 * @param date - Date 对象或 ISO 字符串
 * @returns 如 “刚刚”、“3分钟前”、“昨天”
 *
 * 注意：此为轻量版本，如需更复杂本地化，建议使用 date-fns
 */
function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const target = new Date(date);
  if (isNaN(target.getTime())) return "无效日期";

  const diffMs = now.getTime() - target.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "刚刚";
  if (diffMin < 60) return `${diffMin}分钟前`;
  if (diffHour < 24) return `${diffHour}小时前`;
  if (diffDay === 1) return "昨天";
  if (diffDay < 7) return `${diffDay}天前`;
  return target.toLocaleDateString("zh-CN");
}

// =============================
// 🔍 URL 参数解析（查询字符串）
// =============================

/**
 * 解析 URL 查询参数为对象
 * @param search - 如 "?name=alice&age=25"
 * @returns 查询参数对象
 *
 * 示例：
 * parseSearchParams("?page=2&sort=desc") → { page: "2", sort: "desc" }
 */
function parseSearchParams(search: string): Record<string, string> {
  if (!search || !search.startsWith("?")) return {};
  const params = new URLSearchParams(search.substring(1));
  const obj: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    obj[key] = value;
  }
  return obj;
}

/**
 * 生成查询字符串（对象 → URLSearchParams）
 * @param params - 键值对对象
 * @returns 如 "page=2&sort=desc"
 */
function buildSearchParams(
  params: Record<string, string | number | boolean | null | undefined>
): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value != null) {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
}

// =============================
// 🖼️ 图片 URL 处理（适配 Next.js Image）
// =============================

/**
 * 生成带尺寸的图片 URL（适用于 Next.js Image 组件）
 * 自动添加默认占位图、质量、格式
 * @param src - 图片原始路径（相对或绝对）
 * @param width - 宽度
 * @param height - 高度
 * @param quality - 质量（1-100）
 * @returns 完整的 image URL
 *
 * 示例：
 * imageUrl('/avatars/user.jpg', 300, 300, 80)
 * // → '/_next/image?url=%2Favatars%2Fuser.jpg&w=300&q=80'
 */
function imageUrl(
  src: string,
  width: number,
  height: number,
  quality: number = 80
): string {
  // 如果是外部域名，不走 Next.js 优化
  if (src.startsWith("http")) {
    return `${src}?w=${width}&h=${height}&q=${quality}`;
  }

  // Next.js 内部路径
  return `/__next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

// =============================
// 🚫 空值检查工具
// =============================

/**
 * 检查值是否为空（null、undefined、''、[]、{}）
 */
function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === "object" && Object.keys(value).length === 0) return true;
  return false;
}

/**
 * 检查值是否非空（与 isEmpty 相反）
 */
function isNotEmpty(value: any): boolean {
  return !isEmpty(value);
}


function genUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}


// =============================
// 📦 导出统一入口（推荐按需导入）
// =============================

export {
  genUUID,
  cn,
  useDebounce,
  isClient,
  formatCurrency,
  formatRelativeTime,
  parseSearchParams,
  buildSearchParams,
  imageUrl,
  isEmpty,
  isNotEmpty,
};
