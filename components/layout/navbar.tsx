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
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { useAuth as useAuthApi } from "@/apis/auth/auth";
import { useRouter } from "next/navigation";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  // 登出API
  const logoutMutation = useAuthApi.logout({
    onSuccess: () => {
      logout();
      router.push("/");
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 点击外部关闭用户菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isUserMenuOpen) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isUserMenuOpen]);

  const navItems = [
    { key: "首页", href: "/", icon: "lucide:home" },
    { key: "产品", href: "/product", icon: "lucide:box" },
    { key: "资源", href: "/resources", icon: "lucide:library" },
    { key: "公司", href: "/company", icon: "lucide:building-2" },
    { key: "联系", href: "/company/contact", icon: "lucide:mail" },
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
        <Link href="/">
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
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
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
        </Link>

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

          {/* 用户头像和登录区域 */}
          {isAuthenticated && user ? (
            <div className="relative">
              <motion.button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-accent/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                  {user.nickName?.[0] || user.userName?.[0] || "U"}
                </div>
                <span className="hidden md:inline text-sm font-medium text-foreground">
                  {user.nickName || user.userName}
                </span>
                <motion.div
                  animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <SvgIcon icon="lucide:chevron-down" width={16} height={16} />
                </motion.div>
              </motion.button>

              {/* 用户下拉菜单 */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute right-0 top-full mt-2 w-64 p-2 rounded-xl backdrop-blur-xl bg-background/95 border border-border/50 shadow-xl z-50"
                  >
                    {/* 用户信息头部 */}
                    <div className="p-3 border-b border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {user.nickName?.[0] || user.userName?.[0] || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {user.nickName || user.userName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.email || `@${user.userName}`}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 菜单项 */}
                    <div className="py-2">
                      <Link
                        href="/demo/auth"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-accent/50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <SvgIcon icon="lucide:user" width={16} height={16} />
                        <span>个人中心</span>
                      </Link>

                      <Link
                        href="/demo/auth"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-accent/50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <SvgIcon
                          icon="lucide:settings"
                          width={16}
                          height={16}
                        />
                        <span>账户设置</span>
                      </Link>

                      <hr className="my-2 border-border/50" />

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logoutMutation.mutate({});
                        }}
                        disabled={logoutMutation.isPending}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left disabled:opacity-50"
                      >
                        <SvgIcon icon="lucide:log-out" width={16} height={16} />
                        <span>
                          {logoutMutation.isPending ? "登出中..." : "退出登录"}
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/auth/login")}
                className="hidden sm:flex"
              >
                <SvgIcon
                  icon="lucide:log-in"
                  width={16}
                  height={16}
                  className="mr-1"
                />
                登录
              </Button>

              <Button
                size="sm"
                onClick={() => router.push("/auth/login")}
                className="hidden sm:flex"
              >
                注册
              </Button>
            </div>
          )}

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

              {/* 移动端用户信息 */}
              {isAuthenticated && user && (
                <>
                  <div className="border-t border-border/50 pt-4 mt-2">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-accent/30">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {user.nickName?.[0] || user.userName?.[0] || "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {user.nickName || user.userName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email || `@${user.userName}`}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 space-y-1">
                      <Link
                        href="/demo/auth"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-accent/50 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <SvgIcon icon="lucide:user" width={16} height={16} />
                        <span>个人中心</span>
                      </Link>

                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          logoutMutation.mutate({});
                        }}
                        disabled={logoutMutation.isPending}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left disabled:opacity-50"
                      >
                        <SvgIcon icon="lucide:log-out" width={16} height={16} />
                        <span>
                          {logoutMutation.isPending ? "登出中..." : "退出登录"}
                        </span>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* 移动端登录按钮 */}
              {!isAuthenticated && (
                <div className="border-t border-border/50 pt-4 mt-2">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        router.push("/auth/login");
                      }}
                      className="flex-1"
                    >
                      <SvgIcon
                        icon="lucide:log-in"
                        width={16}
                        height={16}
                        className="mr-1"
                      />
                      登录
                    </Button>

                    <Button
                      size="sm"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        router.push("/auth/login");
                      }}
                      className="flex-1"
                    >
                      注册
                    </Button>
                  </div>
                </div>
              )}

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
