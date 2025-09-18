/**
 * 公司主页 - 现代简约设计
 * 公司概览页面，展示公司简介、服务与导航
 */
/* import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "公司介绍 | 现代Web开发技术团队",
  description: "专注于Next.js模板开发与前端架构的技术团队，提供高质量开源组件与专业咨询服务。",
  keywords: ["公司介绍", "Web开发", "Next.js模板", "技术团队", "前端架构", "开源贡献"],
};
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

// 页面导航数据
const companyPages = [
  {
    title: "关于我们",
    description: "了解我们的团队、愿景和价值观",
    href: "/company/about",
    icon: "lucide:building-2",
    color: "text-blue-500",
    gradient: "from-blue-500/10 to-cyan-500/10",
    features: ["团队介绍", "公司历程", "核心价值观"],
  },
  {
    title: "联系我们",
    description: "多种联系方式，随时为您服务",
    href: "/company/contact",
    icon: "lucide:mail",
    color: "text-emerald-500",
    gradient: "from-emerald-500/10 to-teal-500/10",
    features: ["在线咨询", "技术支持", "商务合作"],
  },
  {
    title: "技术博客",
    description: "分享技术见解和开发经验",
    href: "/company/blog",
    icon: "lucide:book-open",
    color: "text-purple-500",
    gradient: "from-purple-500/10 to-pink-500/10",
    features: ["技术文章", "最佳实践", "行业趋势"],
  },
] as const;

// 统计数据
const stats = [
  {
    number: "1+",
    label: "年开发经验",
    icon: "lucide:calendar",
    color: "text-blue-500",
  },
  {
    number: "10+",
    label: "开源项目",
    icon: "lucide:git-branch",
    color: "text-emerald-500",
  },
  {
    number: "100+",
    label: "组件库",
    icon: "lucide:puzzle",
    color: "text-purple-500",
  },
  {
    number: "24/7",
    label: "技术支持",
    icon: "lucide:headphones",
    color: "text-orange-500",
  },
] as const;

// 核心服务
const services = [
  {
    title: "模板开发",
    description: "提供高质量的Next.js应用模板",
    icon: "lucide:layout-template",
    features: ["现代化设计", "最佳实践", "可定制化"],
  },
  {
    title: "技术咨询",
    description: "前端架构和技术选型建议",
    icon: "lucide:users",
    features: ["架构设计", "技术评估", "解决方案"],
  },
  {
    title: "开源贡献",
    description: "积极参与开源社区建设",
    icon: "lucide:heart",
    features: ["开源项目", "社区维护", "知识分享"],
  },
] as const;

export default function CompanyPageIndex() {
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

      {/* 装饰性渐变球体 - 提升视觉深度 */}
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
            className="space-y-16 md:space-y-20"
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
                aria-label="返回首页"
              >
                <SvgIcon icon="lucide:home" width={16} height={16} />
                <span>首页</span>
              </Link>
              <span>/</span>
              <span className="text-foreground" aria-current="page">公司介绍</span>
            </motion.div>

            {/* 页面标题区域 */}
            <motion.div
              className="text-center space-y-6 md:space-y-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...SMOOTH_TRANSITION }}
            >
              {/* 标签徽章 */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20">
                <SvgIcon icon="lucide:building" width={18} height={18} className="text-blue-500" />
                <span className="text-sm font-medium text-muted-foreground">公司介绍</span>
              </div>

              {/* 主标题 */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                欢迎了解我们
              </h1>

              {/* 副标题 */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                我们是一支专注于现代Web开发的技术团队，致力于为开发者提供高质量的解决方案和工具。
                通过创新的技术和卓越的设计，让每一个想法都能快速变为现实。
              </p>

              {/* 统计数据卡片 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, ...SMOOTH_TRANSITION }}
                    className="text-center"
                  >
                    <div className="w-14 h-14 mx-auto mb-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                      <SvgIcon icon={stat.icon} width={20} height={20} className={stat.color} />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.number}</div>
                    <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 核心服务 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ...SMOOTH_TRANSITION }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">我们的服务</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  专业的技术服务，助力您的项目成功
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, ...SMOOTH_TRANSITION }}
                    className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group text-center"
                    aria-labelledby={`service-${index}`}
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <SvgIcon icon={service.icon} width={24} height={24} className="text-blue-500" />
                    </div>
                    <h3
                      id={`service-${index}`}
                      className="text-xl font-semibold text-foreground mb-3 group-hover:text-blue-500 transition-colors duration-300"
                    >
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                    <div className="space-y-2">
                      {service.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                        >
                          <SvgIcon icon="lucide:check" width={14} height={14} className="text-emerald-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 页面导航卡片 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, ...SMOOTH_TRANSITION }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">了解更多</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  探索我们的各个方面，开启您的技术旅程
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {companyPages.map((page, index) => (
                  <motion.div
                    key={page.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, ...SMOOTH_TRANSITION }}
                    className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* 卡片头部 */}
                    <div
                      className={cn(
                        "h-32 bg-gradient-to-r flex items-center justify-center relative overflow-hidden",
                        page.gradient
                      )}
                    >
                      <SvgIcon
                        icon={page.icon}
                        width={48}
                        height={48}
                        className={cn(page.color, "group-hover:scale-110 transition-transform duration-300")}
                      />
                    </div>

                    {/* 卡片内容 */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-blue-500 transition-colors duration-300">
                        {page.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed">
                        {page.description}
                      </p>

                      {/* 特性列表 */}
                      <div className="space-y-2">
                        {page.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <SvgIcon icon="lucide:check" width={14} height={14} className="text-emerald-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA 按钮 */}
                      <div className="pt-4">
                        <Button
                          variant="outline"
                          className="w-full group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all duration-300"
                          asChild
                        >
                          <Link href={page.href} aria-label={`了解更多：${page.title}`}>
                            <span>了解更多</span>
                            <SvgIcon icon="lucide:arrow-right" width={16} height={16} className="ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 快速联系 CTA 区域 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, ...SMOOTH_TRANSITION }}
              className="text-center"
            >
              <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-border/50 rounded-2xl p-8 md:p-12 shadow-lg">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <SvgIcon icon="lucide:rocket" width={32} height={32} className="text-blue-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  准备开始您的项目？
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  无论您需要技术咨询、定制开发，还是简单的问题解答，我们的团队都随时为您提供帮助。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="min-w-[140px]">
                    <Link href="/company/contact" aria-label="立即联系我们">
                      <SvgIcon icon="lucide:mail" width={20} height={20} className="mr-2" />
                      立即联系我们
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="min-w-[140px]"
                  >
                    <Link href="/company/about" aria-label="了解我们的团队">
                      <SvgIcon icon="lucide:users" width={20} height={20} className="mr-2" />
                      了解团队
                    </Link>
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