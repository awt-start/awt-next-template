/**
 * 产品主页 - 现代简约设计
 * 产品概览页面，展示产品特性和导航
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import SvgIcon from "@/components/icon/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 自定义缓动曲线 - 与项目保持一致
const SMOOTH_TRANSITION = { duration: 0.5, ease: "easeOut" } as const;

// 产品页面导航数据
const productPages = [
  {
    title: "功能特性",
    description: "探索产品的核心功能和特色",
    href: "/product/features",
    icon: "lucide:sparkles",
    color: "text-blue-500",
    gradient: "from-blue-500/10 to-cyan-500/10",
    features: ["核心功能", "技术特色", "使用案例"],
  },
  {
    title: "技术架构",
    description: "深入了解技术实现和架构设计",
    href: "/product/tech",
    icon: "lucide:cpu",
    color: "text-emerald-500",
    gradient: "from-emerald-500/10 to-teal-500/10",
    features: ["架构设计", "技术选型", "性能优化"],
  },
  {
    title: "发展路线",
    description: "查看产品发展规划和未来计划",
    href: "/product/roadmap",
    icon: "lucide:map",
    color: "text-purple-500",
    gradient: "from-purple-500/10 to-pink-500/10",
    features: ["版本规划", "功能路线", "里程碑"],
  },
  {
    title: "更新日志",
    description: "跟踪产品的版本更新和改进",
    href: "/product/changelog",
    icon: "lucide:clock",
    color: "text-orange-500",
    gradient: "from-orange-500/10 to-red-500/10",
    features: ["版本历史", "新增功能", "修复记录"],
  },
];

// 产品统计数据
const productStats = [
  {
    number: "15+",
    label: "核心功能",
    icon: "lucide:zap",
    color: "text-blue-500",
  },
  {
    number: "50+",
    label: "UI组件",
    icon: "lucide:layers",
    color: "text-emerald-500",
  },
  {
    number: "99%",
    label: "性能提升",
    icon: "lucide:trending-up",
    color: "text-purple-500",
  },
  {
    number: "100%",
    label: "类型安全",
    icon: "lucide:shield-check",
    color: "text-orange-500",
  },
];

// 核心亮点
const highlights = [
  {
    title: "现代化技术栈",
    description: "基于Next.js 15和React 19构建",
    icon: "lucide:rocket",
    features: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "开箱即用",
    description: "预配置完整的开发环境和工具链",
    icon: "lucide:package",
    features: ["自动化构建", "代码规范", "性能优化", "部署配置"],
  },
  {
    title: "高度可定制",
    description: "灵活的组件系统和主题配置",
    icon: "lucide:settings",
    features: ["主题系统", "组件库", "国际化", "响应式设计"],
  },
];

export default function ProductPage() {
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
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-500/8 via-blue-500/8 to-cyan-500/8 rounded-full blur-3xl" />
      </div>

      {/* 主要内容区域 */}
      <main className="relative z-10 min-h-screen pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SMOOTH_TRANSITION}
            className="space-y-20"
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
                <SvgIcon icon="lucide:home" width={16} height={16} />
                <span>首页</span>
              </Link>
              <span>/</span>
              <span className="text-foreground">产品介绍</span>
            </motion.div>

            {/* 页面标题区域 */}
            <motion.div
              className="text-center space-y-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...SMOOTH_TRANSITION }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20">
                <SvgIcon
                  icon="lucide:box"
                  width={20}
                  height={20}
                  className="text-blue-500"
                />
                <span className="text-sm font-medium text-muted-foreground">
                  产品介绍
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Next.js 模板产品
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                专业的Next.js应用模板，集成现代化工具链和最佳实践。
                帮助开发者快速构建高质量的Web应用，专注于业务逻辑而非基础架构。
              </p>

              {/* 统计数据 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {productStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.3 + index * 0.1,
                      ...SMOOTH_TRANSITION,
                    }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                      <SvgIcon
                        icon={stat.icon}
                        width={20}
                        height={20}
                        className={stat.color}
                      />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 核心亮点 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ...SMOOTH_TRANSITION }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  产品亮点
                </h2>
                <p className="text-muted-foreground">
                  为什么选择我们的Next.js模板
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.5 + index * 0.1,
                      ...SMOOTH_TRANSITION,
                    }}
                    className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <SvgIcon
                        icon={highlight.icon}
                        width={24}
                        height={24}
                        className="text-blue-500"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {highlight.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {highlight.description}
                    </p>

                    <div className="space-y-2">
                      {highlight.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                        >
                          <SvgIcon
                            icon="lucide:check"
                            width={14}
                            height={14}
                            className="text-emerald-500"
                          />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 产品页面导航卡片 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, ...SMOOTH_TRANSITION }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  深入了解
                </h2>
                <p className="text-muted-foreground">探索产品的各个方面</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {productPages.map((page, index) => (
                  <motion.div
                    key={page.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.7 + index * 0.1,
                      ...SMOOTH_TRANSITION,
                    }}
                    className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* 卡片头部 */}
                    <div
                      className={cn(
                        "h-24 bg-gradient-to-r flex items-center justify-center relative overflow-hidden",
                        page.gradient,
                      )}
                    >
                      <SvgIcon
                        icon={page.icon}
                        width={32}
                        height={32}
                        className={cn(
                          page.color,
                          "group-hover:scale-110 transition-transform duration-300",
                        )}
                      />
                    </div>

                    {/* 卡片内容 */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-blue-500 transition-colors duration-300">
                        {page.title}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {page.description}
                      </p>

                      {/* 特性列表 */}
                      <div className="space-y-1">
                        {page.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <SvgIcon
                              icon="lucide:dot"
                              width={12}
                              height={12}
                              className="text-blue-500"
                            />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full group-hover:bg-blue-500 group-hover:text-white transition-all duration-300"
                          asChild
                        >
                          <Link href={page.href}>
                            <span>了解更多</span>
                            <SvgIcon
                              icon="lucide:arrow-right"
                              width={14}
                              height={14}
                              className="ml-2"
                            />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 快速开始 CTA */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, ...SMOOTH_TRANSITION }}
              className="text-center"
            >
              <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-border/50 rounded-2xl p-12 shadow-lg">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <SvgIcon
                    icon="lucide:download"
                    width={32}
                    height={32}
                    className="text-blue-500"
                  />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  准备开始使用？
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  立即下载我们的Next.js模板，开始构建您的下一个Web应用项目。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => window.open("https://github.com", "_blank")}
                  >
                    <SvgIcon
                      icon="lucide:github"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    GitHub下载
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/product/features">
                      <SvgIcon
                        icon="lucide:eye"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      查看演示
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() =>
                      window.open("mailto:product@awt0204.shop", "_blank")
                    }
                  >
                    <SvgIcon
                      icon="lucide:mail"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    联系咨询
                  </Button>
                </div>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
