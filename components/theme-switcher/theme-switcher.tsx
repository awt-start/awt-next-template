/**
 * 主题切换组件
 * 提供现代简约的主题切换界面，支持亮色、暗色和跟随系统三种模式
 */

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/use-theme";
import { Button } from "@/components/ui/button";
import SvgIcon from "@/components/icon/icon";
import { cn } from "@/lib/utils";
import type { ThemeMode } from "@/lib/theme";

// 主题图标映射
const THEME_ICONS = {
  light: "lucide:sun",
  dark: "lucide:moon",
  system: "lucide:monitor",
} as const;

// 主题颜色映射
const THEME_COLORS = {
  light: "text-yellow-500",
  dark: "text-blue-400",
  system: "text-gray-500",
} as const;

export interface ThemeSwitcherProps {
  /** 显示模式：按钮 | 下拉菜单 */
  variant?: "button" | "dropdown";
  /** 按钮尺寸 */
  size?: "sm" | "default" | "lg";
  /** 是否显示文本标签 */
  showLabel?: boolean;
  /** 自定义类名 */
  className?: string;
}

/**
 * 主题切换组件
 */
export function ThemeSwitcher({
  variant = "button",
  size = "default",
  showLabel = false,
  className,
}: ThemeSwitcherProps) {
  const t = useTranslations("theme");
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  const toggleTheme = () => {
    // 简单切换：light -> dark -> system -> light
    const nextTheme: ThemeMode =
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(nextTheme);
  };

  // 按钮模式：简单切换
  if (variant === "button") {
    return (
      <Button
        variant="ghost"
        size={size === "default" ? "icon" : size}
        onClick={toggleTheme}
        className={cn(
          "relative transition-all duration-300 hover:scale-105",
          className,
        )}
        aria-label={t("toggleTooltip")}
        title={t("toggleTooltip")}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ scale: 0.8, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotate: 90 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
              duration: 0.2,
            }}
            className="flex items-center gap-2"
          >
            <SvgIcon
              icon={THEME_ICONS[theme]}
              width={20}
              height={20}
              className={cn(
                "transition-colors duration-200",
                THEME_COLORS[theme],
              )}
              animate="hover-scale"
            />
            {showLabel && (
              <span className="text-sm font-medium">{t(theme)}</span>
            )}
          </motion.div>
        </AnimatePresence>
      </Button>
    );
  }

  // 下拉菜单模式：显示所有选项
  return (
    <div className={cn("relative", className)}>
      <Button
        variant="ghost"
        size={size === "default" ? "icon" : size}
        onClick={() => setIsOpen(!isOpen)}
        className="relative transition-all duration-300 hover:scale-105"
        aria-label={t("switch")}
        title={t("switch")}
      >
        <div className="flex items-center gap-2">
          <SvgIcon
            icon={THEME_ICONS[theme]}
            width={20}
            height={20}
            className={cn(
              "transition-colors duration-200",
              THEME_COLORS[theme],
            )}
            animate="hover-scale"
          />
          {showLabel && <span className="text-sm font-medium">{t(theme)}</span>}
          <SvgIcon
            icon="lucide:chevron-down"
            width={16}
            height={16}
            className={cn(
              "transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* 遮罩层 */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* 下拉菜单 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                duration: 0.15,
              }}
              className="absolute right-0 mt-2 w-48 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg border border-border z-20 py-1"
            >
              {(["light", "dark", "system"] as const).map((themeOption) => {
                const isSelected = theme === themeOption;
                const isActive =
                  resolvedTheme ===
                  (themeOption === "system" ? resolvedTheme : themeOption);

                return (
                  <button
                    key={themeOption}
                    type="button"
                    onClick={() => handleThemeChange(themeOption)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-all duration-150",
                      "hover:bg-accent hover:text-accent-foreground",
                      "focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none",
                      isSelected && "bg-accent/50 text-accent-foreground",
                    )}
                  >
                    <div className="relative">
                      <SvgIcon
                        icon={THEME_ICONS[themeOption]}
                        width={18}
                        height={18}
                        className={cn(
                          "transition-colors duration-200",
                          isSelected
                            ? THEME_COLORS[themeOption]
                            : "text-muted-foreground",
                        )}
                      />
                      {isActive && themeOption !== "system" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"
                        />
                      )}
                    </div>

                    <span className="flex-1 font-medium">{t(themeOption)}</span>

                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      >
                        <SvgIcon
                          icon="lucide:check"
                          width={16}
                          height={16}
                          className="text-primary"
                        />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
