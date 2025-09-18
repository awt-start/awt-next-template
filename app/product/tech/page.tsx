/**
 * 技术架构页面 - 现代简约设计
 * 展示产品的技术实现和架构设计
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import SvgIcon from "@/components/icon/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 自定义缓动曲线 - 与项目保持一致
const SMOOTH_TRANSITION = { duration: 0.5, ease: "easeOut" } as const;

// 技术栈分类
const techCategories = [
  { id: "frontend", name: "前端框架", icon: "lucide:layout" },
  { id: "ui", name: "UI组件", icon: "lucide:palette" },
  { id: "tooling", name: "工具链", icon: "lucide:wrench" },
  { id: "deployment", name: "部署", icon: "lucide:server" },
];

// 技术栈数据
const technologies = [
  {
    category: "frontend",
    name: "Next.js 15",
    description: "现代化的React全栈框架",
    icon: "lucide:react",
    version: "15.5.3",
    color: "text-black dark:text-white",
    gradient:
      "from-black/10 to-gray-600/10 dark:from-white/10 dark:to-gray-300/10",
    features: [
      "App Router",
      "Server Components",
      "Streaming SSR",
      "Edge Runtime",
    ],
    reason: "提供完整的全栈开发体验，支持SSR、SSG和ISR",
  },
  {
    category: "frontend",
    name: "React 19",
    description: "现代化的用户界面库",
    icon: "lucide:component",
    version: "19.1.0",
    color: "text-blue-500",
    gradient: "from-blue-500/10 to-cyan-500/10",
    features: ["并发特性", "Hooks", "Suspense", "Server Components"],
    reason: "最新的React版本，提供更好的性能和开发体验",
  },
  {
    category: "ui",
    name: "Tailwind CSS",
    description: "实用优先的CSS框架",
    icon: "lucide:paintbrush",
    version: "^4",
    color: "text-cyan-500",
    gradient: "from-cyan-500/10 to-teal-500/10",
    features: ["原子化CSS", "响应式设计", "暗色模式", "自定义主题"],
    reason: "快速构建现代化UI，高度可定制化",
  },
  {
    category: "tooling",
    name: "Turbopack",
    description: "下一代打包工具",
    icon: "lucide:zap",
    version: "内置",
    color: "text-red-500",
    gradient: "from-red-500/10 to-orange-500/10",
    features: ["增量编译", "并行处理", "热更新", "缓存优化"],
    reason: "显著提升开发构建速度，提高开发效率",
  },
];

// 架构层级
const architectureLayers = [
  {
    name: "用户界面层",
    description: "组件、页面和用户交互",
    icon: "lucide:eye",
    color: "text-blue-500",
    technologies: ["React 19", "Framer Motion", "Tailwind CSS"],
    responsibilities: ["用户交互", "视觉呈现", "响应式布局", "动画效果"],
  },
  {
    name: "业务逻辑层",
    description: "应用状态管理和业务规则",
    icon: "lucide:cpu",
    color: "text-emerald-500",
    technologies: ["React Hooks", "Context API", "Custom Hooks"],
    responsibilities: ["状态管理", "业务逻辑", "数据处理", "事件处理"],
  },
  {
    name: "数据访问层",
    description: "API调用和数据获取",
    icon: "lucide:database",
    color: "text-purple-500",
    technologies: ["fetch API", "SWR/React Query", "Server Actions"],
    responsibilities: ["数据获取", "缓存管理", "错误处理", "数据同步"],
  },
  {
    name: "基础设施层",
    description: "构建工具和部署配置",
    icon: "lucide:server",
    color: "text-orange-500",
    technologies: ["Next.js", "Turbopack", "Vercel"],
    responsibilities: ["构建优化", "路由管理", "部署配置", "性能监控"],
  },
];

export default function TechPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("frontend");

  const filteredTechnologies = technologies.filter(
    (tech) => tech.category === selectedCategory,
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
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-cyan-500/8 via-emerald-500/8 to-teal-500/8 rounded-full blur-3xl" />
      </div>

      {/* 主要内容区域 */}
      <main className="relative z-10 min-h-screen pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SMOOTH_TRANSITION}
            className="space-y-16"
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
              <span className="text-foreground">技术架构</span>
            </motion.div>

            {/* 页面标题区域 */}
            <motion.div
              className="text-center space-y-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...SMOOTH_TRANSITION }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20">
                <SvgIcon
                  icon="lucide:cpu"
                  width={20}
                  height={20}
                  className="text-emerald-500"
                />
                <span className="text-sm font-medium text-muted-foreground">
                  技术架构
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                技术架构设计
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                深入了解我们Next.js模板的技术架构，从技术选型到实现细节，
                为您展示现代化Web应用的最佳实践。
              </p>
            </motion.div>

            {/* 架构层级展示 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...SMOOTH_TRANSITION }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  架构层级
                </h2>
                <p className="text-muted-foreground">
                  分层架构设计，职责清晰，易于维护
                </p>
              </div>

              <div className="grid gap-4">
                {architectureLayers.map((layer, index) => (
                  <motion.div
                    key={layer.name}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.4 + index * 0.1,
                      ...SMOOTH_TRANSITION,
                    }}
                    className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 flex items-center justify-center">
                        <SvgIcon
                          icon={layer.icon}
                          width={24}
                          height={24}
                          className={layer.color}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground">
                          {layer.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {layer.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          核心技术：
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {layer.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs bg-emerald-500/10 text-emerald-600 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          主要职责：
                        </h4>
                        <div className="grid grid-cols-2 gap-1">
                          {layer.responsibilities.map((responsibility) => (
                            <div
                              key={responsibility}
                              className="flex items-center gap-1 text-xs text-muted-foreground"
                            >
                              <SvgIcon
                                icon="lucide:dot"
                                width={12}
                                height={12}
                                className="text-emerald-500"
                              />
                              <span>{responsibility}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 技术栈展示 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, ...SMOOTH_TRANSITION }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  核心技术栈
                </h2>
                <p className="text-muted-foreground">精选的现代化技术组合</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      ...SMOOTH_TRANSITION,
                    }}
                    className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <div
                      className={cn(
                        "h-16 bg-gradient-to-r flex items-center justify-center",
                        tech.gradient,
                      )}
                    >
                      <SvgIcon
                        icon={tech.icon}
                        width={24}
                        height={24}
                        className={cn(
                          tech.color,
                          "group-hover:scale-110 transition-transform duration-300",
                        )}
                      />
                    </div>

                    <div className="p-6 space-y-3">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">
                          {tech.name}
                        </h3>
                        <p className="text-xs text-emerald-500">
                          {tech.version}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {tech.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 行动召唤 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, ...SMOOTH_TRANSITION }}
              className="text-center"
            >
              <div className="backdrop-blur-xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-border/50 rounded-2xl p-12 shadow-lg">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  技术咨询
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  对我们的技术架构有疑问？需要技术咨询和支持？随时联系我们的技术团队。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() =>
                      window.open("mailto:tech@awt0204.shop", "_blank")
                    }
                  >
                    <SvgIcon
                      icon="lucide:mail"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    技术咨询
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/product/roadmap">
                      <SvgIcon
                        icon="lucide:map"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      发展路线
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
