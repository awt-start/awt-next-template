/**
 * 主题切换 Hook
 * 提供主题状态管理和切换功能
 */

"use client";

import { useEffect, useState, useCallback } from "react";
import {
  type ThemeMode,
  getCurrentTheme,
  setTheme as setThemeInternal,
  getResolvedTheme,
  initializeTheme,
  watchSystemTheme,
} from "@/lib/theme";

export interface UseThemeReturn {
  /** 当前主题偏好 (light | dark | system) */
  theme: ThemeMode;
  /** 解析后的实际主题 (light | dark) */
  resolvedTheme: "light" | "dark";
  /** 设置主题 */
  setTheme: (theme: ThemeMode) => void;
  /** 切换主题 (light <-> dark) */
  toggleTheme: () => void;
  /** 是否为暗色主题 */
  isDark: boolean;
  /** 是否为亮色主题 */
  isLight: boolean;
  /** 是否跟随系统 */
  isSystem: boolean;
}

/**
 * 主题切换 Hook
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { theme, isDark, toggleTheme, setTheme } = useTheme();
 *
 *   return (
 *     <button onClick={toggleTheme}>
 *       {isDark ? '🌙' : '☀️'} {theme}
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<ThemeMode>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // 初始化主题
  useEffect(() => {
    const initialTheme = initializeTheme();
    setThemeState(initialTheme);
    setResolvedTheme(getResolvedTheme(initialTheme));
  }, []);

  // 监听系统主题变化（仅在 system 模式下生效）
  useEffect(() => {
    if (theme !== "system") return;

    const cleanup = watchSystemTheme((systemTheme) => {
      setResolvedTheme(systemTheme);
      // 重新应用主题到 DOM
      if (typeof document !== "undefined") {
        const root = document.documentElement;
        if (systemTheme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    });

    return cleanup;
  }, [theme]);

  // 设置主题
  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeInternal(newTheme);
    setThemeState(newTheme);
    setResolvedTheme(getResolvedTheme(newTheme));
  }, []);

  // 切换主题 (仅在 light/dark 间切换，不包含 system)
  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }, [resolvedTheme, setTheme]);

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    isDark: resolvedTheme === "dark",
    isLight: resolvedTheme === "light",
    isSystem: theme === "system",
  };
}
