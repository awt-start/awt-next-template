/**
 * 通用存储 Util
 * @author hsc
 */

import { ENV_KEYS, getEnv } from "./env";

// 👇 使用 as const 保证键值为字面量类型，支持类型推断
export const STORAGE_KEYS = {
  LANG: "lang", // 👈 改为语义化大写常量，避免歧义
} as const;

// 👇 类型定义：所有合法的 storage key
export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/**
 * 获取带前缀的存储键名
 * @param key - 存储键名，必须是 STORAGE_KEYS 中定义的键
 * @returns 带环境前缀的完整键名
 */
export const getStorageKey = (key: StorageKey): string => {
  const prefix = getEnv(ENV_KEYS.NEXT_STORE_PREFIX);
  // @ts-ignore
  return prefix + key;
};
