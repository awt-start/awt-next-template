/**
 * Cookie政策页面 - 现代简约设计
 * 与项目整体设计风格保持一致
 */

"use client";

import { motion } from "framer-motion";
import {
  Cookie,
  Settings,
  Shield,
  Eye,
  Trash2,
  Clock,
  Mail,
  Home,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

// 自定义缓动曲线 - 与项目保持一致
const SMOOTH_TRANSITION = { duration: 0.5, ease: "easeOut" } as const;

export default function CookiesPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* 顶部导航栏 */}
      <Navbar />

      {/* 动态网格背景 - 复用项目风格 */}
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

      {/* 装饰性渐变球体 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-cyan-500/8 via-emerald-500/8 to-teal-500/8 rounded-full blur-3xl" />
      </div>

      {/* 主要内容区域 */}
      <main className="relative z-10 min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SMOOTH_TRANSITION}
            className="space-y-12"
          >
            {/* 面包屑导航 */}
            <motion.div
              className="flex items-center gap-2 text-sm text-muted-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, ...SMOOTH_TRANSITION }}
            >
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>首页</span>
              </Link>
              <span>/</span>
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                隐私政策
              </Link>
              <span>/</span>
              <span className="text-foreground">Cookie政策</span>
            </motion.div>

            {/* 页面标题区域 */}
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...SMOOTH_TRANSITION }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20">
                <Cookie className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium text-muted-foreground">
                  网站追踪
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Cookie政策
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                了解我们如何使用Cookie和类似技术来改善您的浏览体验，以及您如何控制这些设置。
              </p>

              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>最后更新：2025年1月18日</span>
                </div>
              </div>
            </motion.div>

            {/* 主要内容区域 */}
            <motion.div
              className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 p-8 md:p-12 space-y-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...SMOOTH_TRANSITION }}
            >
              {/* 什么是Cookie */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
                    <Cookie className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    什么是Cookie
                  </h2>
                </div>

                <div className="space-y-4 pl-11 text-muted-foreground">
                  <p>
                    Cookie是您访问网站时存储在设备上的小文本文件。它们帮助网站记住您的偏好设置，
                    提供个性化体验，并分析网站使用情况。
                  </p>

                  <div className="p-6 rounded-xl bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-blue-500/5 border border-emerald-500/20">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">
                        Cookie的工作原理
                      </h4>
                      <p className="text-sm">
                        当您首次访问我们的网站时，我们会在您的设备上放置Cookie。这些文件包含唯一标识符，
                        帮助我们在您再次访问时识别您的设备。
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Cookie类型 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Settings className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    我们使用的Cookie类型
                  </h2>
                </div>

                <div className="space-y-6 pl-11">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl border border-border/50 bg-background/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                          <Shield className="w-3 h-3 text-emerald-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                          必要Cookie
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        这些Cookie对网站正常运行至关重要，无法被禁用。
                      </p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• 用户身份验证</li>
                        <li>• 安全功能</li>
                        <li>• 购物车状态</li>
                        <li>• 语言偏好</li>
                      </ul>
                    </div>

                    <div className="p-6 rounded-xl border border-border/50 bg-background/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <Eye className="w-3 h-3 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                          分析Cookie
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        帮助我们了解访问者如何使用网站，以改善用户体验。
                      </p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• 页面访问统计</li>
                        <li>• 用户行为分析</li>
                        <li>• 性能监控</li>
                        <li>• 错误跟踪</li>
                      </ul>
                    </div>

                    <div className="p-6 rounded-xl border border-border/50 bg-background/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <Settings className="w-3 h-3 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                          功能Cookie
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        记住您的选择和偏好，提供个性化体验。
                      </p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• 主题偏好</li>
                        <li>• 字体大小</li>
                        <li>• 地区设置</li>
                        <li>• 记住登录状态</li>
                      </ul>
                    </div>

                    <div className="p-6 rounded-xl border border-border/50 bg-background/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-6 rounded-lg bg-orange-500/20 flex items-center justify-center">
                          <Cookie className="w-3 h-3 text-orange-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                          第三方Cookie
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        来自外部服务提供商，用于集成第三方功能。
                      </p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• 社交媒体插件</li>
                        <li>• 视频播放器</li>
                        <li>• 地图服务</li>
                        <li>• 客服聊天</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Cookie管理 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Trash2 className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    管理Cookie设置
                  </h2>
                </div>

                <div className="space-y-4 pl-11">
                  <p className="text-muted-foreground">
                    您可以通过以下方式控制和管理Cookie：
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2">
                        浏览器设置
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        大多数浏览器允许您查看、删除或阻止Cookie。请注意，禁用某些Cookie可能影响网站功能。
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2">
                        退出分析追踪
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        您可以选择退出Google Analytics等分析服务的数据收集。
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2">
                        Cookie横幅设置
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        首次访问时，您可以通过我们的Cookie横幅选择接受或拒绝非必要Cookie。
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 第三方服务 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    第三方服务
                  </h2>
                </div>

                <div className="space-y-4 pl-11">
                  <p className="text-muted-foreground">
                    我们的网站可能使用以下第三方服务，它们可能设置自己的Cookie：
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2">
                        Google Analytics
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        网站使用情况分析
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2">
                        CDN服务
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        内容分发网络
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2">
                        字体服务
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Web字体加载
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 联系信息 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    联系我们
                  </h2>
                </div>

                <div className="pl-11 space-y-4">
                  <p className="text-muted-foreground">
                    如果您对我们的Cookie使用有任何疑问，请联系我们：
                  </p>

                  <div className="p-6 rounded-xl bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-pink-500/5 border border-border/30">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-violet-500" />
                        <span className="text-foreground font-medium">
                          邮箱：cookies@awt0204.shop
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        我们将在收到您的咨询后3个工作日内回复。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>

            {/* 导航链接 */}
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ...SMOOTH_TRANSITION }}
            >
              <Link
                href="/privacy/terms"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>服务条款</span>
              </Link>

              <Link
                href="/privacy/info"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>个人信息处理</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
