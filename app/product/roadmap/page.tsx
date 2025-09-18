/**
 * 发展路线页面 - 现代简约设计
 * 展示产品发展规划和未来计划
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

// 路线图状态
const roadmapStatuses = [
  {
    id: "completed",
    name: "已完成",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    id: "in-progress",
    name: "进行中",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: "planned",
    name: "计划中",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    id: "future",
    name: "未来规划",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

// 版本路线图数据
const roadmapItems = [
  // 已完成
  {
    version: "v1.0.0",
    title: "基础模板发布",
    description: "完整的Next.js 15模板，包含基础UI组件和工具链",
    status: "completed",
    date: "2025-01",
    features: [
      "Next.js 15 + React 19",
      "TypeScript严格模式",
      "Tailwind CSS v4",
      "基础UI组件库",
      "暗色主题支持",
      "国际化支持",
    ],
    icon: "lucide:rocket",
  },
  {
    version: "v1.1.0",
    title: "性能优化版本",
    description: "专注于性能优化和开发体验改进",
    status: "completed",
    date: "2025-01",
    features: [
      "Turbopack集成",
      "代码分割优化",
      "图片优化",
      "字体优化",
      "Bundle分析工具",
      "性能监控",
    ],
    icon: "lucide:zap",
  },
  // 进行中
  {
    version: "v1.2.0",
    title: "增强UI组件库",
    description: "扩展UI组件库，增加更多高级组件",
    status: "in-progress",
    date: "2025-02",
    features: [
      "数据表格组件",
      "图表组件集成",
      "文件上传组件",
      "富文本编辑器",
      "日期时间选择器",
      "虚拟滚动支持",
    ],
    icon: "lucide:layers",
    progress: 60,
  },
  {
    version: "v1.3.0",
    title: "表单和验证系统",
    description: "完整的表单处理和验证解决方案",
    status: "in-progress",
    date: "2025-02",
    features: [
      "表单构建器",
      "实时验证",
      "多步骤表单",
      "表单状态管理",
      "自定义验证规则",
      "表单模板",
    ],
    icon: "lucide:clipboard-check",
    progress: 30,
  },
  // 计划中
  {
    version: "v2.0.0",
    title: "后端集成支持",
    description: "增加后端API集成和数据管理功能",
    status: "planned",
    date: "2025-03",
    features: [
      "API路由模板",
      "数据库集成",
      "认证系统",
      "权限管理",
      "文件存储",
      "缓存策略",
    ],
    icon: "lucide:server",
  },
  {
    version: "v2.1.0",
    title: "测试和质量保证",
    description: "完整的测试框架和质量保证工具",
    status: "planned",
    date: "2025-04",
    features: [
      "单元测试框架",
      "集成测试",
      "E2E测试",
      "视觉回归测试",
      "性能测试",
      "代码覆盖率",
    ],
    icon: "lucide:check-circle",
  },
  // 未来规划
  {
    version: "v3.0.0",
    title: "AI集成和智能化",
    description: "集成AI功能，提供智能化开发体验",
    status: "future",
    date: "2025 Q3",
    features: [
      "AI代码生成",
      "智能组件推荐",
      "自动化测试生成",
      "性能优化建议",
      "代码审查助手",
      "智能文档生成",
    ],
    icon: "lucide:brain",
  },
  {
    version: "v3.1.0",
    title: "微前端支持",
    description: "支持微前端架构和多应用管理",
    status: "future",
    date: "2025 Q4",
    features: [
      "模块联邦",
      "独立部署",
      "跨应用通信",
      "共享组件库",
      "统一路由",
      "状态共享",
    ],
    icon: "lucide:puzzle",
  },
];

// 关键里程碑
const milestones = [
  {
    quarter: "2025 Q1",
    title: "基础框架完善",
    description: "完成核心框架和基础组件",
    achievements: ["模板发布", "性能优化", "社区反馈收集"],
  },
  {
    quarter: "2025 Q2",
    title: "组件库扩展",
    description: "丰富UI组件库和开发工具",
    achievements: ["高级组件", "表单系统", "开发工具"],
  },
  {
    quarter: "2025 Q3",
    title: "全栈能力",
    description: "增加后端支持和全栈开发能力",
    achievements: ["后端集成", "测试框架", "AI功能"],
  },
  {
    quarter: "2025 Q4",
    title: "企业级功能",
    description: "面向企业级应用的高级功能",
    achievements: ["微前端", "企业组件", "高级安全"],
  },
];

export default function RoadmapPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredItems =
    selectedStatus === "all"
      ? roadmapItems
      : roadmapItems.filter((item) => item.status === selectedStatus);

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
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-pink-500/8 via-purple-500/8 to-indigo-500/8 rounded-full blur-3xl" />
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
              <span className="text-foreground">发展路线</span>
            </motion.div>

            {/* 页面标题区域 */}
            <motion.div
              className="text-center space-y-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...SMOOTH_TRANSITION }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 border border-purple-500/20">
                <SvgIcon
                  icon="lucide:map"
                  width={20}
                  height={20}
                  className="text-purple-500"
                />
                <span className="text-sm font-medium text-muted-foreground">
                  发展路线
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-purple-600 to-pink-600 bg-clip-text text-transparent">
                产品发展路线
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                了解我们的产品规划和发展方向，跟踪最新功能的开发进度，
                参与产品的未来发展。
              </p>
            </motion.div>

            {/* 关键里程碑 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...SMOOTH_TRANSITION }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  关键里程碑
                </h2>
                <p className="text-muted-foreground">
                  2025年的主要发展目标和计划
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.quarter}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4 + index * 0.1,
                      ...SMOOTH_TRANSITION,
                    }}
                    className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 mx-auto rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-purple-500">
                          {milestone.quarter.split(" ")[1]}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {milestone.description}
                        </p>
                      </div>
                      <div className="space-y-1">
                        {milestone.achievements.map((achievement) => (
                          <div
                            key={achievement}
                            className="flex items-center gap-2 text-xs text-muted-foreground justify-center"
                          >
                            <SvgIcon
                              icon="lucide:check"
                              width={12}
                              height={12}
                              className="text-emerald-500"
                            />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 状态筛选 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, ...SMOOTH_TRANSITION }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  版本路线图
                </h2>
                <p className="text-muted-foreground">
                  详细的版本规划和功能开发进度
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setSelectedStatus("all")}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                    selectedStatus === "all"
                      ? "bg-purple-500 text-white shadow-lg scale-105"
                      : "bg-background/50 text-muted-foreground hover:bg-background/80 hover:text-foreground border border-border/50",
                  )}
                >
                  全部状态
                </button>
                {roadmapStatuses.map((status) => (
                  <button
                    key={status.id}
                    onClick={() => setSelectedStatus(status.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                      selectedStatus === status.id
                        ? "bg-purple-500 text-white shadow-lg scale-105"
                        : "bg-background/50 text-muted-foreground hover:bg-background/80 hover:text-foreground border border-border/50",
                    )}
                  >
                    <div className={cn("w-2 h-2 rounded-full", status.bg)} />
                    <span>{status.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* 路线图时间线 */}
            <motion.div
              key={selectedStatus}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, ...SMOOTH_TRANSITION }}
              className="relative"
            >
              {/* 时间线 */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 md:-translate-x-0.5" />

              <div className="space-y-8">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.version}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, ...SMOOTH_TRANSITION }}
                    className={cn(
                      "relative flex items-center",
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                    )}
                  >
                    {/* 时间节点 */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-background md:-translate-x-2 z-10" />

                    {/* 内容卡片 */}
                    <div
                      className={cn(
                        "flex-1 ml-12 md:ml-0",
                        index % 2 === 0 ? "md:mr-8" : "md:ml-8",
                      )}
                    >
                      <div className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                              <SvgIcon
                                icon={item.icon}
                                width={20}
                                height={20}
                                className="text-purple-500"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-foreground">
                                {item.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-purple-500">
                                  {item.version}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  •
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {item.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium",
                              roadmapStatuses.find((s) => s.id === item.status)
                                ?.bg,
                              roadmapStatuses.find((s) => s.id === item.status)
                                ?.color,
                            )}
                          >
                            {
                              roadmapStatuses.find((s) => s.id === item.status)
                                ?.name
                            }
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4">
                          {item.description}
                        </p>

                        {/* 进度条 (仅显示进行中的项目) */}
                        {item.status === "in-progress" && item.progress && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-muted-foreground">
                                开发进度
                              </span>
                              <span className="font-medium text-foreground">
                                {item.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-background/50 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* 功能列表 */}
                        <div className="grid md:grid-cols-2 gap-2">
                          {item.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
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
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 参与贡献 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, ...SMOOTH_TRANSITION }}
              className="text-center"
            >
              <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 border border-border/50 rounded-2xl p-12 shadow-lg">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  参与产品发展
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  我们重视社区的意见和建议。如果您有好的想法或功能建议，欢迎与我们联系。
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
                    GitHub反馈
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() =>
                      window.open("mailto:roadmap@awt0204.shop", "_blank")
                    }
                  >
                    <SvgIcon
                      icon="lucide:mail"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    功能建议
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/product/changelog">
                      <SvgIcon
                        icon="lucide:clock"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      更新日志
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
