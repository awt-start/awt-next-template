/**
 * 产品更新日志页面 - 时间轴展示产品版本历史
 * 展示详细的版本发布记录和功能更新信息
 */

"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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

// 更新日志数据类型
interface ChangelogEntry {
  version: string;
  date: string;
  type: "major" | "minor" | "patch" | "hotfix";
  title: string;
  description: string;
  changes: {
    category: "新增" | "优化" | "修复" | "移除" | "安全";
    items: string[];
    icon: string;
    color: string;
  }[];
  breaking?: boolean;
  downloads?: number;
}

// 模拟更新日志数据
const changelogData: ChangelogEntry[] = [
  {
    version: "v2.1.0",
    date: "2024-01-15",
    type: "minor",
    title: "智能组件优化",
    description: "引入AI辅助的组件自动优化功能，提升开发效率和代码质量。",
    changes: [
      {
        category: "新增",
        icon: "lucide:plus-circle",
        color: "text-emerald-500",
        items: [
          "AI驱动的组件智能建议",
          "自动代码优化工具",
          "性能分析仪表板",
          "智能错误修复建议",
        ],
      },
      {
        category: "优化",
        icon: "lucide:arrow-up-circle",
        color: "text-blue-500",
        items: [
          "构建性能提升 40%",
          "热重载速度优化",
          "类型检查性能改进",
          "内存使用降低 25%",
        ],
      },
      {
        category: "修复",
        icon: "lucide:check-circle",
        color: "text-orange-500",
        items: [
          "修复开发模式下的内存泄漏",
          "解决 TypeScript 严格模式警告",
          "修复移动端触摸事件冲突",
        ],
      },
    ],
    downloads: 15420,
  },
  {
    version: "v2.0.0",
    date: "2023-12-01",
    type: "major",
    title: "架构全面升级",
    description:
      "基于 Next.js 15 和 React 19 的全新架构，带来革命性的开发体验。",
    breaking: true,
    changes: [
      {
        category: "新增",
        icon: "lucide:plus-circle",
        color: "text-emerald-500",
        items: [
          "Next.js 15 全面支持",
          "React 19 服务器组件",
          "Turbopack 构建系统",
          "全新的主题系统",
        ],
      },
      {
        category: "优化",
        icon: "lucide:arrow-up-circle",
        color: "text-blue-500",
        items: [
          "页面加载速度提升 60%",
          "Bundle 体积减少 30%",
          "SEO 优化改进",
          "无障碍访问增强",
        ],
      },
    ],
    downloads: 23850,
  },
  {
    version: "v1.8.2",
    date: "2023-11-15",
    type: "patch",
    title: "安全更新",
    description: "重要的安全漏洞修复和依赖包更新。",
    changes: [
      {
        category: "安全",
        icon: "lucide:shield-check",
        color: "text-red-500",
        items: [
          "修复 XSS 潜在风险",
          "更新依赖包安全版本",
          "增强 CSRF 保护",
          "优化输入验证机制",
        ],
      },
      {
        category: "修复",
        icon: "lucide:check-circle",
        color: "text-orange-500",
        items: [
          "修复深色模式切换问题",
          "解决国际化文本缺失",
          "修复表单验证边界情况",
        ],
      },
    ],
    downloads: 8420,
  },
  {
    version: "v1.8.0",
    date: "2023-10-20",
    type: "minor",
    title: "功能扩展包",
    description: "新增多项实用功能和组件，提升用户体验。",
    changes: [
      {
        category: "新增",
        icon: "lucide:plus-circle",
        color: "text-emerald-500",
        items: [
          "全新的数据可视化组件",
          "拖拽排序功能",
          "文件上传组件优化",
          "实时通知系统",
        ],
      },
      {
        category: "优化",
        icon: "lucide:arrow-up-circle",
        color: "text-blue-500",
        items: ["动画性能优化", "移动端体验改进", "搜索功能增强"],
      },
    ],
    downloads: 12300,
  },
];

// 版本类型配置
const versionTypeConfig = {
  major: {
    label: "重大版本",
    color: "bg-gradient-to-r from-red-500 to-pink-500",
    textColor: "text-red-500",
    icon: "lucide:zap",
  },
  minor: {
    label: "功能版本",
    color: "bg-gradient-to-r from-blue-500 to-purple-500",
    textColor: "text-blue-500",
    icon: "lucide:star",
  },
  patch: {
    label: "修复版本",
    color: "bg-gradient-to-r from-emerald-500 to-teal-500",
    textColor: "text-emerald-500",
    icon: "lucide:shield",
  },
  hotfix: {
    label: "紧急修复",
    color: "bg-gradient-to-r from-orange-500 to-red-500",
    textColor: "text-orange-500",
    icon: "lucide:alert-triangle",
  },
};

export default function ChangelogPage() {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "major" | "minor" | "patch">(
    "all",
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // 过滤版本数据
  const filteredData =
    filter === "all"
      ? changelogData
      : changelogData.filter((entry) => entry.type === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        {/* 顶部导航栏 */}
        <Navbar />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 mb-6"
          >
            <SvgIcon
              icon="lucide:clock"
              width={16}
              height={16}
              className="text-blue-500"
            />
            <span className="text-sm font-medium text-muted-foreground">
              更新日志
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ...SMOOTH_TRANSITION }}
            className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent mb-6"
          >
            版本历史
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, ...SMOOTH_TRANSITION }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            跟踪每一次重要更新，见证产品的成长历程。我们致力于持续改进，为您带来更好的使用体验。
          </motion.p>
        </motion.div>

        {/* 版本过滤器 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, ...SMOOTH_TRANSITION }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {(["all", "major", "minor", "patch"] as const).map((type) => (
            <Button
              key={type}
              variant={filter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(type)}
              className={cn(
                "transition-all duration-300",
                filter === type &&
                  "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
              )}
            >
              {type === "all" ? "全部版本" : versionTypeConfig[type].label}
            </Button>
          ))}
        </motion.div>

        {/* 版本时间轴 */}
        <div ref={containerRef} className="space-y-8">
          {filteredData.map((entry, index) => (
            <motion.div
              key={entry.version}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
              }
              transition={{
                delay: index * STAGGER_DELAY,
                ...SMOOTH_TRANSITION,
              }}
              className="relative"
            >
              {/* 时间轴线条 */}
              {index < filteredData.length - 1 && (
                <div className="absolute left-1/2 top-24 w-px h-16 bg-gradient-to-b from-border to-transparent hidden lg:block" />
              )}

              <div
                className={cn(
                  "flex flex-col lg:flex-row items-start lg:items-center gap-8",
                  index % 2 === 1 && "lg:flex-row-reverse",
                )}
              >
                {/* 版本信息卡片 */}
                <motion.div
                  className="flex-1 backdrop-blur-xl bg-background/50 border border-border/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* 版本头部 */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-semibold",
                            versionTypeConfig[entry.type].color,
                            "text-white",
                          )}
                        >
                          {versionTypeConfig[entry.type].label}
                        </span>
                        {entry.breaking && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                            破坏性更新
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {entry.version}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {entry.date} • {entry.downloads?.toLocaleString()}{" "}
                        次下载
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setSelectedVersion(
                          selectedVersion === entry.version
                            ? null
                            : entry.version,
                        )
                      }
                    >
                      <SvgIcon
                        icon={
                          selectedVersion === entry.version
                            ? "lucide:chevron-up"
                            : "lucide:chevron-down"
                        }
                        width={16}
                        height={16}
                      />
                    </Button>
                  </div>

                  {/* 版本标题和描述 */}
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-foreground mb-2">
                      {entry.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {entry.description}
                    </p>
                  </div>

                  {/* 更改摘要 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {entry.changes.map((change, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/50 border border-border/30"
                      >
                        <SvgIcon
                          icon={change.icon}
                          width={12}
                          height={12}
                          className={change.color}
                        />
                        <span className="text-xs font-medium text-foreground">
                          {change.category} {change.items.length}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* 详细更改列表 */}
                  <AnimatePresence>
                    {selectedVersion === entry.version && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6 pt-6 border-t border-border/30"
                      >
                        {entry.changes.map((change, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="space-y-3"
                          >
                            <div className="flex items-center gap-2">
                              <SvgIcon
                                icon={change.icon}
                                width={16}
                                height={16}
                                className={change.color}
                              />
                              <h5 className="font-semibold text-foreground">
                                {change.category}
                              </h5>
                            </div>
                            <ul className="space-y-2 ml-6">
                              {change.items.map((item, itemIdx) => (
                                <motion.li
                                  key={itemIdx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay: idx * 0.1 + itemIdx * 0.05,
                                  }}
                                  className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                  <SvgIcon
                                    icon="lucide:arrow-right"
                                    width={12}
                                    height={12}
                                    className="text-muted-foreground/50 mt-0.5 flex-shrink-0"
                                  />
                                  <span>{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* 时间轴节点 */}
                <motion.div
                  className="hidden lg:flex flex-shrink-0 w-16 h-16 rounded-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  <SvgIcon
                    icon={versionTypeConfig[entry.type].icon}
                    width={24}
                    height={24}
                    className="text-white"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 底部行动召唤 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, ...SMOOTH_TRANSITION }}
          className="text-center mt-20"
        >
          <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-border/50 rounded-3xl p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              获取最新版本
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              立即更新到最新版本，体验最新功能和性能改进。我们建议始终保持使用最新稳定版本。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <SvgIcon
                  icon="lucide:download"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                下载最新版本
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hover:bg-accent/50 hover:border-blue-500/50 transition-all duration-300"
              >
                <SvgIcon
                  icon="lucide:github"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                查看源码
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
