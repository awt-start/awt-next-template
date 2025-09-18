/**
 * 顶部导航栏组件 - 惊艳的浮动导航设计
 * 具有毛玻璃效果、流畅动画和精致细节
 */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeSwitcher } from "@/components/theme-switcher/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher/language-switcher";
import SvgIcon from "@/components/icon/icon";
import { Button } from "@/components/ui/button";
import { cn, isClient } from "@/lib/utils";
import icon from "@/public/images/favicon.ico";
import { ENV_KEYS, getEnv, publicEnv } from "@/lib/env";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { key: "home", href: "#", icon: "lucide:home" },
    { key: "features", href: "#features", icon: "lucide:sparkles" },
    { key: "about", href: "#about", icon: "lucide:info" },
    { key: "contact", href: "#contact", icon: "lucide:mail" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl",
        "transition-all duration-500 ease-out",
        className,
      )}
    >
      <nav
        className={cn(
          "relative flex items-center justify-between px-6 py-4 rounded-2xl",
          "backdrop-blur-xl bg-background/80 border border-border/50",
          "shadow-lg shadow-black/5 dark:shadow-black/20",
          "transition-all duration-500 ease-out",
          isScrolled &&
          "bg-background/95 shadow-xl shadow-black/10 dark:shadow-black/30",
        )}
      >
        {/* Logo 区域 */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="relative">
            <motion.div
              animate={{
                rotate: 360,
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 30px rgba(59, 130, 246, 0.6)",
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                ],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center"
            >
              {/* 更改icon */}
              <img src={icon.src} alt="logo" className="w-8 h-8" />
            </motion.div>
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </h1>
          </div>
        </motion.div>

        {/* 桌面导航菜单 */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item, index) => (
            <motion.a
              key={item.key}
              href={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium",
                "text-muted-foreground hover:text-foreground",
                "transition-all duration-200 ease-out",
                "hover:bg-accent/50 hover:backdrop-blur-sm",
              )}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <SvgIcon icon={item.icon} width={16} height={16} />
              <span className="capitalize">{item.key}</span>
            </motion.a>
          ))}
        </div>

        {/* 右侧控制区 */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <ThemeSwitcher variant="button" />
            <LanguageSwitcher />
          </div>

          {/* 移动端菜单按钮 */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <SvgIcon
                icon={isMobileMenuOpen ? "lucide:x" : "lucide:menu"}
                width={20}
                height={20}
              />
            </motion.div>
          </Button>
        </div>
      </nav>

      {/* 移动端下拉菜单 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl backdrop-blur-xl bg-background/95 border border-border/50 shadow-xl lg:hidden"
          >
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <SvgIcon icon={item.icon} width={18} height={18} />
                  <span className="capitalize">{item.key}</span>
                </motion.a>
              ))}

              <div className="flex items-center justify-center gap-4 pt-4 border-t border-border/50">
                <ThemeSwitcher variant="button" />
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
