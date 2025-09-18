/**
 * 认证页面布局 - 集成导航栏的完整页面设计
 * 复用首页的设计风格，包含导航栏和背景效果
 */

import { Navbar } from "@/components/layout/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "登录 - 现代认证体验",
  description: "安全、简洁的登录注册体验",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* 顶部导航栏 */}
      <Navbar />

      {/* 动态网格背景 - 复用首页风格 */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* 装饰性渐变球体 - 与首页保持一致 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-500/8 via-blue-500/8 to-cyan-500/8 rounded-full blur-3xl" />

        {/* 细节装饰点 - 呼应首页粒子效果 */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500/20 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-500/30 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-pink-500/25 rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* 主要内容区域 - 考虑导航栏高度 */}
      <main className="relative z-10 min-h-screen flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
    </div>
  );
}
