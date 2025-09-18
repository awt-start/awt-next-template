/**
 * 主题提供者组件
 * 负责在应用启动时初始化主题，防止主题闪烁
 */

"use client";

import { useEffect } from "react";
import { initializeTheme } from "@/lib/theme";

export interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * 主题提供者组件
 * 应该在应用的根组件中使用，确保主题在首次渲染时正确应用
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    // 初始化主题
    initializeTheme();
  }, []);

  return <>{children}</>;
}
