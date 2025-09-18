/**
 * 认证页面布局 - 极简现代主义设计
 * 提供居中卡片式布局和优雅的视觉基调
 */

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800/50 flex items-center justify-center p-4">
      {/* 背景装饰 - 柔和渐变和几何元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 主要背景渐变球体 */}
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-emerald-400/8 to-blue-400/8 rounded-full blur-3xl" />

        {/* 细节装饰点 */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full animate-pulse" />
        <div
          className="absolute top-3/4 right-1/3 w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-cyan-400/25 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* 主要内容区域 */}
      <div className="relative w-full max-w-md">{children}</div>
    </div>
  );
}
