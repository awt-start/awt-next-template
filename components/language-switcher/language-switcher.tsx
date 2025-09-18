/**
 * 语言切换组件 - 极简现代风格
 * 具备毛玻璃效果、精致动画和现代化设计
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useLanguageSwitch } from "@/lib/i18n";
import { i18nConfig, type Locale } from "@/i18n/config";

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const { currentLocale, switchLanguage } = useLanguageSwitch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (locale: Locale) => {
    console.log("Switching to locale:", locale);
    switchLanguage(locale, true);
    setIsOpen(false);
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ESC键关闭下拉菜单
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 触发按钮 - 现代毛玻璃效果 */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 px-4 py-2.5 rounded-2xl backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 shadow-lg hover:shadow-xl hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400/50"
        aria-label={t("switch")}
        aria-expanded={isOpen}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* 背景光晕效果 */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-purple-500/10 group-hover:via-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-700" />

        {/* 图标 */}
        <motion.span
          className="relative text-xl"
          animate={{ rotate: isOpen ? 360 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {i18nConfig.localeIcons[currentLocale]}
        </motion.span>

        {/* 语言标签 */}
        <span className="relative text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
          {i18nConfig.localeLabels[currentLocale]}
        </span>

        {/* 箭头图标 */}
        <motion.svg
          className="relative w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.button>

      {/* 下拉菜单 - 现代毛玻璃效果 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 背景遮罩层 */}
            <motion.div
              className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* 下拉菜单容器 */}
            <motion.div
              className="absolute right-0 mt-4 w-64 backdrop-blur-xl bg-white/80 dark:bg-black/80 rounded-3xl shadow-2xl border border-white/30 dark:border-white/10 overflow-hidden z-40"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 0.8,
              }}
            >
              {/* 渐变装饰线 */}
              <div className="h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

              {/* 菜单标题 */}
              <div className="px-6 py-4 border-b border-white/10">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t("switch") || "选择语言"}
                </p>
              </div>

              {/* 语言选项 */}
              <div className="py-2">
                {i18nConfig.locales.map((locale, index) => (
                  <motion.button
                    key={locale}
                    type="button"
                    onClick={() => handleLanguageChange(locale)}
                    className={`group relative w-full flex items-center justify-between px-6 py-3 text-left transition-all duration-300 ${
                      locale === currentLocale
                        ? "bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 text-purple-700 dark:text-purple-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/5"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                    aria-current={
                      locale === currentLocale ? "location" : undefined
                    }
                  >
                    {/* 激活状态的背景光晕 */}
                    {locale === currentLocale && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5 rounded-lg"
                        layoutId="activeLanguage"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}

                    <div className="relative flex items-center gap-4">
                      <motion.span
                        className="text-xl"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        {i18nConfig.localeIcons[locale]}
                      </motion.span>
                      <span className="font-medium text-sm">
                        {i18nConfig.localeLabels[locale]}
                      </span>
                    </div>

                    {/* 选中状态指示器 */}
                    {locale === currentLocale && (
                      <motion.div
                        className="relative flex items-center text-purple-600 dark:text-purple-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-current" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* 底部装饰 */}
              <div className="h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
