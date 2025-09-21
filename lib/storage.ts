/**
 * 通用存储 Util
 * @author hsc
 */

import { ENV_KEYS, getEnv } from "./env";

// 👇 使用 as const 保证键值为字面量类型，支持类型推断
export const STORAGE_KEYS = {
  LANG: "lang", // 👈 改为语义化大写常量，避免歧义
  ACCESS_TOKEN: "access_token", // 访问令牌
  REFRESH_TOKEN: "refresh_token", // 刷新令牌
  USER_INFO: "user_info", // 用户信息
  PERMISSIONS: "permissions", // 用户权限
  ROLES: "roles", // 用户角色
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

/**
 * 安全的存储操作工具函数
 */
export const storage = {
  /**
   * 设置存储项
   */
  setItem: (key: StorageKey, value: any): void => {
    if (typeof window === 'undefined') return;
    try {
      const storageKey = getStorageKey(key);
      const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(storageKey, serializedValue);
    } catch (error) {
      console.error('Storage setItem error:', error);
    }
  },

  /**
   * 获取存储项
   */
  getItem: <T = string>(key: StorageKey, defaultValue?: T): T | null => {
    if (typeof window === 'undefined') return defaultValue || null;
    try {
      const storageKey = getStorageKey(key);
      const item = localStorage.getItem(storageKey);
      if (item === null) return defaultValue || null;
      
      // 尝试解析 JSON，如果失败则返回原始字符串
      try {
        return JSON.parse(item);
      } catch {
        return item as unknown as T;
      }
    } catch (error) {
      console.error('Storage getItem error:', error);
      return defaultValue || null;
    }
  },

  /**
   * 删除存储项
   */
  removeItem: (key: StorageKey): void => {
    if (typeof window === 'undefined') return;
    try {
      const storageKey = getStorageKey(key);
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error('Storage removeItem error:', error);
    }
  },

  /**
   * 清空所有应用相关的存储项
   */
  clear: (): void => {
    if (typeof window === 'undefined') return;
    try {
      const prefix = getEnv(ENV_KEYS.NEXT_STORE_PREFIX);
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  },
};
