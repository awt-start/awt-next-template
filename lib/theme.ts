/**
 * 主题管理工具函数
 * 提供主题切换、存储和检测功能
 * 支持 light、dark、system 三种模式
 */

import { isClient } from "./utils";

export type ThemeMode = "light" | "dark" | "system";

// =============================
// 📦 主题常量
// =============================

export const THEME_CONFIG = {
  STORAGE_KEY: "theme-preference",
  DEFAULT_THEME: "system" as ThemeMode,
  THEMES: ["light", "dark", "system"] as const,
  CLASS_NAMES: {
    DARK: "dark",
    LIGHT: "",
  },
} as const;

// =============================
// 🔍 主题检测函数
// =============================

/**
 * 获取系统偏好的主题
 */
export function getSystemTheme(): "light" | "dark" {
  if (!isClient) return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * 获取当前应用的主题（解析 system 模式）
 */
export function getResolvedTheme(theme: ThemeMode): "light" | "dark" {
  if (theme === "system") {
    return getSystemTheme();
  }
  return theme;
}

// =============================
// 💾 主题存储函数
// =============================

/**
 * 从 localStorage 获取保存的主题偏好
 */
export function getStoredTheme(): ThemeMode | null {
  if (!isClient) return null;

  try {
    const stored = localStorage.getItem(THEME_CONFIG.STORAGE_KEY);
    if (stored && THEME_CONFIG.THEMES.includes(stored as ThemeMode)) {
      return stored as ThemeMode;
    }
  } catch (error) {
    console.warn("Failed to get stored theme:", error);
  }

  return null;
}

/**
 * 保存主题偏好到 localStorage
 */
export function setStoredTheme(theme: ThemeMode): void {
  if (!isClient) return;

  try {
    localStorage.setItem(THEME_CONFIG.STORAGE_KEY, theme);
  } catch (error) {
    console.warn("Failed to store theme:", error);
  }
}

// =============================
// 🎨 主题应用函数
// =============================

/**
 * 应用主题到 DOM（添加/移除 dark 类名）
 */
export function applyTheme(theme: ThemeMode): void {
  if (!isClient) return;

  const resolvedTheme = getResolvedTheme(theme);
  const root = document.documentElement;

  if (resolvedTheme === "dark") {
    root.classList.add(THEME_CONFIG.CLASS_NAMES.DARK);
  } else {
    root.classList.remove(THEME_CONFIG.CLASS_NAMES.DARK);
  }
}

/**
 * 获取当前主题偏好（优先级：存储 > 系统 > 默认）
 */
export function getCurrentTheme(): ThemeMode {
  const stored = getStoredTheme();
  if (stored) return stored;

  return THEME_CONFIG.DEFAULT_THEME;
}

/**
 * 设置主题（保存并应用）
 */
export function setTheme(theme: ThemeMode): void {
  setStoredTheme(theme);
  applyTheme(theme);
}

// =============================
// 🎯 初始化函数
// =============================

/**
 * 初始化主题（在应用启动时调用）
 */
export function initializeTheme(): ThemeMode {
  const theme = getCurrentTheme();
  applyTheme(theme);
  return theme;
}

// =============================
// 🔄 主题切换辅助函数
// =============================

/**
 * 获取下一个主题（循环切换）
 */
export function getNextTheme(currentTheme: ThemeMode): ThemeMode {
  const themes = THEME_CONFIG.THEMES;
  const currentIndex = themes.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themes.length;
  return themes[nextIndex];
}

/**
 * 监听系统主题变化
 */
export function watchSystemTheme(
  callback: (theme: "light" | "dark") => void,
): () => void {
  if (!isClient) return () => {};

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches ? "dark" : "light");
  };

  mediaQuery.addEventListener("change", handler);

  // 返回清理函数
  return () => {
    mediaQuery.removeEventListener("change", handler);
  };
}
