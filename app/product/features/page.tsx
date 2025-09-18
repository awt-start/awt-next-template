/**
 * 功能特性页面 - 现代简约设计
 * 展示产品的核心功能和特色
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import SvgIcon from "@/components/icon/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 自定义缓动曲线 - 与项目保持一致
const SMOOTH_TRANSITION = { duration: 0.5, ease: "easeOut" } as const;

// 功能分类
const featureCategories = [
  { id: "ui", name: "UI组件", icon: "lucide:palette" },
  { id: "performance", name: "性能", icon: "lucide:zap" },
  { id: "developer", name: "开发体验", icon: "lucide:code" },
  { id: "integration", name: "集成", icon: "lucide:plug" },
];

// 功能特性数据
const features = [
  // UI组件
  {
    category: "ui",
    title: "现代化UI组件库",
    description: "基于shadcn-ui构建的完整组件系统",
    icon: "lucide:layers",
    color: "text-blue-500",
    gradient: "from-blue-500/10 to-cyan-500/10",
    details: [
      "50+精美UI组件",
      "完全可定制化",
      "无障碍访问支持",
      "暗色主题适配",
    ],
    demo: "包含按钮、表单、导航、卡片等常用组件",
  },
  {
    category: "ui",
    title: "响应式设计系统",
    description: "移动优先的响应式布局框架",
    icon: "lucide:smartphone",
    color: "text-emerald-500",
    gradient: "from-emerald-500/10 to-teal-500/10",
    details: ["移动优先设计", "断点系统", "弹性网格布局", "自适应组件"],
    demo: "支持所有主流设备和屏幕尺寸",
  },
  {
    category: "ui",
    title: "动画与交互",
    description: "基于Framer Motion的流畅动画效果",
    icon: "lucide:sparkles",
    color: "text-purple-500",
    gradient: "from-purple-500/10 to-pink-500/10",
    details: ["页面过渡动画", "组件微交互", "手势支持", "性能优化动画"],
    demo: "丰富的动画效果提升用户体验",
  },
  // 性能
  {
    category: "performance",
    title: "极速构建",
    description: "基于Turbopack的超快构建速度",
    icon: "lucide:rocket",
    color: "text-orange-500",
    gradient: "from-orange-500/10 to-red-500/10",
    details: ["Turbopack加速", "增量编译", "热更新优化", "并行处理"],
    demo: "构建速度提升99%，开发效率显著提升",
  },
  {
    category: "performance",
    title: "代码分割优化",
    description: "智能的代码分割和懒加载策略",
    icon: "lucide:scissors",
    color: "text-cyan-500",
    gradient: "from-cyan-500/10 to-blue-500/10",
    details: ["自动代码分割", "组件懒加载", "路由预加载", "资源优化"],
    demo: "首屏加载时间减少70%",
  },
  {
    category: "performance",
    title: "SEO优化",
    description: "内置SEO最佳实践和优化工具",
    icon: "lucide:search",
    color: "text-green-500",
    gradient: "from-green-500/10 to-emerald-500/10",
    details: ["元数据管理", "结构化数据", "站点地图生成", "性能监控"],
    demo: "搜索引擎排名和可见性大幅提升",
  },
  // 开发体验
  {
    category: "developer",
    title: "TypeScript严格模式",
    description: "完整的类型安全和智能提示",
    icon: "lucide:shield-check",
    color: "text-indigo-500",
    gradient: "from-indigo-500/10 to-purple-500/10",
    details: ["严格类型检查", "智能代码补全", "错误提前发现", "重构支持"],
    demo: "100%类型安全，减少运行时错误",
  },
  {
    category: "developer",
    title: "代码质量工具",
    description: "集成Biome的代码格式化和检查",
    icon: "lucide:check-circle",
    color: "text-pink-500",
    gradient: "from-pink-500/10 to-rose-500/10",
    details: ["自动代码格式化", "代码规范检查", "统一代码风格", "提交前验证"],
    demo: "团队协作更高效，代码质量更稳定",
  },
  {
    category: "developer",
    title: "开发工具链",
    description: "完整的开发、测试、部署工具链",
    icon: "lucide:wrench",
    color: "text-amber-500",
    gradient: "from-amber-500/10 to-orange-500/10",
    details: ["开发服务器", "热重载", "调试工具", "性能分析"],
    demo: "一键启动，开箱即用的开发环境",
  },
  // 集成
  {
    category: "integration",
    title: "国际化支持",
    description: "基于next-intl的多语言解决方案",
    icon: "lucide:globe",
    color: "text-violet-500",
    gradient: "from-violet-500/10 to-purple-500/10",
    details: ["多语言切换", "本地化内容", "日期时间格式", "数字货币格式"],
    demo: "支持中英文等多种语言",
  },
  {
    category: "integration",
    title: "主题系统",
    description: "灵活的主题配置和暗色模式",
    icon: "lucide:palette",
    color: "text-teal-500",
    gradient: "from-teal-500/10 to-cyan-500/10",
    details: ["明暗主题切换", "自定义主题", "系统偏好跟随", "CSS变量系统"],
    demo: "完美的暗色模式体验",
  },
  {
    category: "integration",
    title: "第三方集成",
    description: "常用服务和工具的无缝集成",
    icon: "lucide:link",
    color: "text-rose-500",
    gradient: "from-rose-500/10 to-pink-500/10",
    details: ["分析工具集成", "支付系统", "认证服务", "数据库连接"],
    demo: "快速集成常用第三方服务",
  },
];

export default function FeaturesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ui");
  const [selectedFeature, setSelectedFeature] = useState<
    (typeof features)[0] | null
  >(null);

  const filteredFeatures = features.filter(
    (feature) => feature.category === selectedCategory,
  );

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
                <SvgIcon icon="lucide:home" width={16} height={16} />
                <span>首页</span>
              </Link>
              <span>/</span>
              <Link
                href="/product"
                className="hover:text-foreground transition-colors"
              >
                产品介绍
              </Link>
              <span>/</span>
              <span className="text-foreground">功能特性</span>
            </motion.div>

            {/* 页面标题区域 */}
            <motion.div
              className="text-center space-y-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...SMOOTH_TRANSITION }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20">
                <SvgIcon
                  icon="lucide:sparkles"
                  width={20}
                  height={20}
                  className="text-blue-500"
                />
                <span className="text-sm font-medium text-muted-foreground">
                  功能特性
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-blue-600 to-purple-600 bg-clip-text text-transparent">
                强大的功能特性
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                探索我们Next.js模板的核心功能，从现代化UI组件到性能优化，
                为您的项目提供完整的解决方案。
              </p>
            </motion.div>

            {/* 分类筛选 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...SMOOTH_TRANSITION }}
              className="flex flex-wrap justify-center gap-3"
            >
              {featureCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                    selectedCategory === category.id
                      ? "bg-blue-500 text-white shadow-lg scale-105"
                      : "bg-background/50 text-muted-foreground hover:bg-background/80 hover:text-foreground border border-border/50",
                  )}
                >
                  <SvgIcon icon={category.icon} width={16} height={16} />
                  <span>{category.name}</span>
                </button>
              ))}
            </motion.div>

            {/* 功能特性网格 */}
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, ...SMOOTH_TRANSITION }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, ...SMOOTH_TRANSITION }}
                  className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedFeature(feature)}
                >
                  {/* 特性头部 */}
                  <div
                    className={cn(
                      "h-20 bg-gradient-to-r flex items-center justify-center relative overflow-hidden",
                      feature.gradient,
                    )}
                  >
                    <SvgIcon
                      icon={feature.icon}
                      width={28}
                      height={28}
                      className={cn(
                        feature.color,
                        "group-hover:scale-110 transition-transform duration-300",
                      )}
                    />
                  </div>

                  {/* 特性内容 */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-blue-500 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>

                    {/* 特性详情 */}
                    <div className="space-y-1">
                      {feature.details.slice(0, 3).map((detail) => (
                        <div
                          key={detail}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <SvgIcon
                            icon="lucide:check"
                            width={12}
                            height={12}
                            className="text-emerald-500"
                          />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-border/30">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full group-hover:bg-blue-500 group-hover:text-white transition-all duration-300"
                      >
                        <span>查看详情</span>
                        <SvgIcon
                          icon="lucide:external-link"
                          width={14}
                          height={14}
                          className="ml-2"
                        />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* 特性详情弹窗 */}
            <AnimatePresence>
              {selectedFeature && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm"
                  onClick={() => setSelectedFeature(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full max-w-lg backdrop-blur-xl bg-background/95 border border-border/50 rounded-2xl p-8 shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-lg bg-gradient-to-r flex items-center justify-center",
                            selectedFeature.gradient,
                          )}
                        >
                          <SvgIcon
                            icon={selectedFeature.icon}
                            width={20}
                            height={20}
                            className={selectedFeature.color}
                          />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">
                          {selectedFeature.title}
                        </h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedFeature(null)}
                      >
                        <SvgIcon icon="lucide:x" width={20} height={20} />
                      </Button>
                    </div>

                    <p className="text-muted-foreground mb-6">
                      {selectedFeature.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-foreground">
                        功能详情：
                      </h4>
                      {selectedFeature.details.map((detail) => (
                        <div
                          key={detail}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <SvgIcon
                            icon="lucide:check"
                            width={16}
                            height={16}
                            className="text-emerald-500"
                          />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-border/30">
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">示例：</strong>
                        {selectedFeature.demo}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 行动召唤 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, ...SMOOTH_TRANSITION }}
              className="text-center"
            >
              <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-border/50 rounded-2xl p-12 shadow-lg">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  体验完整功能
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  立即下载我们的Next.js模板，体验所有强大功能，开始构建您的项目。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => window.open("https://github.com", "_blank")}
                  >
                    <SvgIcon
                      icon="lucide:download"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    立即下载
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/product/tech">
                      <SvgIcon
                        icon="lucide:cpu"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      技术架构
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
                    咨询详情
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
