/**
 * 认证页面导航 - 展示所有认证相关页面
 */

"use client";

import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import { LogIn, UserPlus, Mail } from "lucide-react";
import Link from "next/link";

// 自定义缓动曲线
const SMOOTH_EASING = [0.25, 0.46, 0.45, 0.94] as const;

const authPages = [
  {
    title: "登录",
    description: "用户名/邮箱输入、密码显隐切换、记住我、OAuth快捷登录",
    href: "/auth/login",
    icon: LogIn,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "注册",
    description: "用户名唯一性校验、邮箱验证、手机号国际区号、密码强度提示",
    href: "/auth/register",
    icon: UserPlus,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "忘记密码",
    description: "邮箱重置链接发送",
    href: "/auth/forgot-password",
    icon: Mail,
    color: "from-purple-500 to-pink-500",
  },
];

export default function AuthIndexPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: SMOOTH_EASING }}
      className="w-full"
    >
      {/* 主卡片 - 符合首页设计风格 */}
      <div className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 p-8 md:p-10">
        {/* 标题区域 */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-3xl font-bold bg-gradient-to-r from-foreground via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: SMOOTH_EASING }}
          >
            现代认证体验
          </motion.h1>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: SMOOTH_EASING }}
          >
            极简现代主义设计 × 科技感人文温度
          </motion.p>
        </div>

        {/* 页面卡片网格 */}
        <div className="grid gap-6 md:gap-8">
          {authPages.map((page, index) => (
            <motion.div
              key={page.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.3 + index * 0.1,
                duration: 0.5,
                ease: SMOOTH_EASING,
              }}
            >
              <Link href={page.href} className="group block">
                <div className="relative p-6 rounded-2xl border border-border/50 backdrop-blur-xl bg-background/30 hover:bg-background/50 transition-all duration-500 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-1">
                  {/* 渐变背景 */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${page.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  <div className="relative flex items-start gap-4">
                    {/* 图标 */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r ${page.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                    >
                      <page.icon className="w-6 h-6 text-white" />
                    </div>

                    {/* 内容 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-foreground/80 transition-colors">
                        {page.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {page.description}
                      </p>
                    </div>

                    {/* 箭头 */}
                    <div className="flex-shrink-0 w-6 h-6 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 返回首页 */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5, ease: SMOOTH_EASING }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            返回首页
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
