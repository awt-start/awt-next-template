/**
 * 资源中心主页 - 学习资源与知识库入口
 * 展示开发资源、学习教程和技术文档
 */

"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import SvgIcon from "@/components/icon/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";

// 动画配置
const SMOOTH_TRANSITION = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

const STAGGER_DELAY = 0.1;

// 资源统计数据
const resourceStats = [
  {
    label: "开发工具",
    value: "50+",
    description: "实用开发工具与资源",
    icon: "lucide:wrench",
    color: "text-blue-500",
  },
  {
    label: "教程指南",
    value: "100+",
    description: "详细的学习教程",
    icon: "lucide:book-open",
    color: "text-emerald-500",
  },
  {
    label: "技术文档",
    value: "80+",
    description: "完整的技术文档",
    icon: "lucide:file-text",
    color: "text-purple-500",
  },
  {
    label: "代码示例",
    value: "200+",
    description: "可复用的代码片段",
    icon: "lucide:code",
    color: "text-orange-500",
  },
];

// 资源页面导航
const resourcePages = [
  {
    title: "资源索引",
    description: "精选的开发工具和实用资源库",
    href: "/resources/index",
    icon: "lucide:layout-grid",
    color: "text-blue-500",
    gradient: "from-blue-500/10 to-cyan-500/10",
    features: ["开发工具", "设计资源", "在线服务", "软件推荐"],
    stats: "50+ 工具",
  },
  {
    title: "学习教程",
    description: "从入门到精通的完整学习路径",
    href: "/resources/tutorials",
    icon: "lucide:graduation-cap",
    color: "text-emerald-500",
    gradient: "from-emerald-500/10 to-teal-500/10",
    features: ["基础教程", "进阶指南", "实战项目", "最佳实践"],
    stats: "100+ 教程",
  },
  {
    title: "技术文档",
    description: "详细的API文档和技术参考手册",
    href: "/resources/docs",
    icon: "lucide:book",
    color: "text-purple-500",
    gradient: "from-purple-500/10 to-pink-500/10",
    features: ["API文档", "配置指南", "故障排除", "更新说明"],
    stats: "80+ 文档",
  },
];

// 热门资源分类
const popularCategories = [
  {
    name: "React & Next.js",
    description: "React生态系统相关资源",
    icon: "logos:react",
    color: "text-blue-500",
    count: 45,
    tags: ["React 19", "Next.js 15", "Hooks", "SSR"],
  },
  {
    name: "TypeScript",
    description: "TypeScript开发资源",
    icon: "logos:typescript-icon",
    color: "text-blue-600",
    count: 32,
    tags: ["类型系统", "配置", "最佳实践", "工具"],
  },
  {
    name: "样式设计",
    description: "CSS和UI设计资源",
    icon: "logos:tailwindcss-icon",
    color: "text-cyan-500",
    count: 28,
    tags: ["Tailwind CSS", "设计系统", "动画", "响应式"],
  },
  {
    name: "开发工具",
    description: "提升开发效率的工具",
    icon: "lucide:settings",
    color: "text-gray-500",
    count: 36,
    tags: ["VS Code", "构建工具", "调试", "部署"],
  },
  {
    name: "性能优化",
    description: "Web性能优化技巧",
    icon: "lucide:zap",
    color: "text-yellow-500",
    count: 24,
    tags: ["性能监控", "缓存", "CDN", "优化策略"],
  },
  {
    name: "测试调试",
    description: "测试框架和调试工具",
    icon: "lucide:bug",
    color: "text-red-500",
    count: 19,
    tags: ["单元测试", "E2E测试", "调试技巧", "错误处理"],
  },
];

// 页面卡片组件
function ResourcePageCard({
  page,
  index,
}: {
  page: (typeof resourcePages)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: index * STAGGER_DELAY, ...SMOOTH_TRANSITION }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      <Link href={page.href}>
        <div
          className={cn(
            "relative p-8 rounded-2xl backdrop-blur-sm border border-border/50",
            "bg-gradient-to-br",
            page.gradient,
            "hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30",
            "transition-all duration-300 cursor-pointer overflow-hidden",
          )}
        >
          {/* 背景光效 */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${page.color.replace("text-", "").replace("-500", "")}15 0%, transparent 70%)`,
            }}
          />

          {/* 内容区域 */}
          <div className="relative z-10 space-y-6">
            {/* 图标和统计 */}
            <div className="flex items-start justify-between">
              <motion.div
                className={cn(
                  "p-4 rounded-xl bg-gradient-to-br",
                  page.gradient,
                  "border border-border/30",
                )}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
              >
                <SvgIcon
                  icon={page.icon}
                  width={28}
                  height={28}
                  className={cn(page.color, "drop-shadow-sm")}
                  animate="hover-scale"
                />
              </motion.div>

              <div className="text-right">
                <div className={cn("text-xs font-medium", page.color)}>
                  {page.stats}
                </div>
              </div>
            </div>

            {/* 标题和描述 */}
            <div className="space-y-3">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: index * STAGGER_DELAY + 0.2 }}
                className="text-xl font-bold text-foreground group-hover:text-foreground/90 transition-colors duration-300"
              >
                {page.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: index * STAGGER_DELAY + 0.3 }}
                className="text-muted-foreground leading-relaxed text-sm"
              >
                {page.description}
              </motion.p>
            </div>

            {/* 功能特性列表 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * STAGGER_DELAY + 0.4 }}
              className="flex flex-wrap gap-2"
            >
              {page.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs rounded-md bg-accent/50 text-muted-foreground border border-border/30"
                >
                  {feature}
                </span>
              ))}
            </motion.div>

            {/* 悬停时显示的操作按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <Button
                variant="ghost"
                size="sm"
                className="text-xs hover:bg-background/50"
              >
                探索资源
                <motion.div
                  className="ml-1"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <SvgIcon icon="lucide:arrow-right" width={12} height={12} />
                </motion.div>
              </Button>
            </motion.div>
          </div>

          {/* 装饰性元素 */}
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>
    </motion.div>
  );
}

// 分类卡片组件
function CategoryCard({
  category,
  index,
}: {
  category: (typeof popularCategories)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.05, ...SMOOTH_TRANSITION }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="group cursor-pointer"
    >
      <div className="p-6 rounded-xl backdrop-blur-sm bg-background/50 border border-border/30 hover:shadow-lg transition-all duration-300">
        <div className="space-y-4">
          {/* 图标和数量 */}
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <SvgIcon
                icon={category.icon}
                width={24}
                height={24}
                className={cn(category.color, "drop-shadow-sm")}
              />
            </motion.div>
            <span
              className={cn(
                "text-xs font-semibold px-2 py-1 rounded-full",
                category.color,
                "bg-current/10",
              )}
            >
              {category.count}个
            </span>
          </div>

          {/* 名称和描述 */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground group-hover:text-foreground/90 transition-colors">
              {category.name}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-1">
            {category.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded bg-accent/30 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ResourcesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      <Navbar />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SMOOTH_TRANSITION}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, ...SMOOTH_TRANSITION }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-purple-500/10 border border-blue-500/20 mb-6"
          >
            <SvgIcon
              icon="lucide:library"
              width={16}
              height={16}
              className="text-blue-500"
            />
            <span className="text-sm font-medium text-muted-foreground">
              资源中心
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ...SMOOTH_TRANSITION }}
            className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent mb-6"
          >
            学习资源库
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, ...SMOOTH_TRANSITION }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            精心整理的开发资源、学习教程和技术文档，助力您的编程学习之旅。
            从基础知识到高级技巧，我们为您提供全方位的学习支持。
          </motion.p>
        </motion.div>

        {/* 统计数据展示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, ...SMOOTH_TRANSITION }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {resourceStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1, ...SMOOTH_TRANSITION }}
              whileHover={{ scale: 1.05, y: -4 }}
              onHoverStart={() => setHoveredStat(index)}
              onHoverEnd={() => setHoveredStat(null)}
              className="group cursor-pointer"
            >
              <div className="text-center p-6 rounded-xl backdrop-blur-sm bg-background/50 border border-border/30 hover:shadow-lg transition-all duration-300">
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-accent/50 to-accent/30 mb-4"
                  animate={{
                    rotate: hoveredStat === index ? 360 : 0,
                    scale: hoveredStat === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <SvgIcon
                    icon={stat.icon}
                    width={24}
                    height={24}
                    className={stat.color}
                  />
                </motion.div>
                <div className="space-y-2">
                  <div className={cn("text-2xl font-bold", stat.color)}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 主要资源页面 */}
        <div ref={containerRef} className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, ...SMOOTH_TRANSITION }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              探索资源
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              按照不同类型浏览我们精心整理的资源库，找到最适合您学习需求的内容。
            </p>
          </motion.div>

          {/* 资源页面卡片网格 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {resourcePages.map((page, index) => (
              <ResourcePageCard key={page.title} page={page} index={index} />
            ))}
          </div>
        </div>

        {/* 热门分类 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, ...SMOOTH_TRANSITION }}
          className="mt-20 space-y-12"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              热门分类
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              按技术栈和应用场景分类的资源集合，快速找到您需要的学习材料。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCategories.map((category, index) => (
              <CategoryCard
                key={category.name}
                category={category}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* 行动召唤 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, ...SMOOTH_TRANSITION }}
          className="text-center mt-20"
        >
          <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-purple-500/10 border border-border/50 rounded-3xl p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              开始学习之旅
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              准备好提升你的开发技能了吗？从我们精选的学习路径开始，
              或者直接跳转到感兴趣的资源类型。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/resources/tutorials">
                  <SvgIcon
                    icon="lucide:play"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  开始学习
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hover:bg-accent/50 hover:border-blue-500/50 transition-all duration-300"
                asChild
              >
                <Link href="/resources/index">
                  <SvgIcon
                    icon="lucide:search"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  浏览资源
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  window.open("mailto:resources@awt0204.shop", "_blank")
                }
                className="hover:bg-accent/50 hover:border-emerald-500/50 transition-all duration-300"
              >
                <SvgIcon
                  icon="lucide:mail"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                资源建议
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
