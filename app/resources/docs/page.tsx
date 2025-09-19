/**
 * 技术文档页面 - API文档和技术参考手册
 */

"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SvgIcon from "@/components/icon/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";

const SMOOTH_TRANSITION = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

interface DocSection {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  gradient: string;
  pages: DocPage[];
  featured?: boolean;
}

interface DocPage {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  readTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

const categories = [
  { id: "all", name: "全部", icon: "lucide:grid-3x3" },
  { id: "api", name: "API参考", icon: "lucide:code" },
  { id: "guides", name: "使用指南", icon: "lucide:book-open" },
  { id: "config", name: "配置文档", icon: "lucide:settings" },
  { id: "troubleshooting", name: "故障排除", icon: "lucide:wrench" },
];

const docSections: DocSection[] = [
  {
    id: "api-reference",
    title: "API 参考文档",
    description: "完整的API接口文档，包含所有端点、参数和响应示例",
    category: "api",
    icon: "lucide:code",
    color: "text-blue-500",
    gradient: "from-blue-500/10 to-cyan-500/10",
    featured: true,
    pages: [
      {
        id: "auth-api",
        title: "身份验证 API",
        description: "用户登录、注册和权限验证相关接口",
        lastUpdated: "2025-01-15",
        readTime: "10分钟",
        difficulty: "intermediate",
      },
      {
        id: "user-api",
        title: "用户管理 API",
        description: "用户信息CRUD操作和权限管理",
        lastUpdated: "2025-01-12",
        readTime: "15分钟",
        difficulty: "beginner",
      },
      {
        id: "data-api",
        title: "数据操作 API",
        description: "数据查询、过滤、排序和分页接口",
        lastUpdated: "2025-01-10",
        readTime: "20分钟",
        difficulty: "advanced",
      },
    ],
  },
  {
    id: "setup-guides",
    title: "配置指南",
    description: "项目初始化、环境配置和部署相关的详细指南",
    category: "guides",
    icon: "lucide:settings",
    color: "text-emerald-500",
    gradient: "from-emerald-500/10 to-teal-500/10",
    pages: [
      {
        id: "quick-start",
        title: "快速开始",
        description: "5分钟搭建你的第一个项目",
        lastUpdated: "2025-01-14",
        readTime: "5分钟",
        difficulty: "beginner",
      },
      {
        id: "environment-setup",
        title: "开发环境配置",
        description: "详细的开发环境搭建流程",
        lastUpdated: "2025-01-13",
        readTime: "12分钟",
        difficulty: "beginner",
      },
      {
        id: "deployment-guide",
        title: "部署指南",
        description: "生产环境部署的完整流程",
        lastUpdated: "2025-01-11",
        readTime: "18分钟",
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "configuration",
    title: "配置参考",
    description: "所有配置选项的详细说明和最佳实践",
    category: "config",
    icon: "lucide:cog",
    color: "text-purple-500",
    gradient: "from-purple-500/10 to-pink-500/10",
    featured: true,
    pages: [
      {
        id: "next-config",
        title: "Next.js 配置",
        description: "next.config.js 配置选项详解",
        lastUpdated: "2025-01-16",
        readTime: "8分钟",
        difficulty: "intermediate",
      },
      {
        id: "tailwind-config",
        title: "Tailwind 配置",
        description: "自定义主题和扩展配置",
        lastUpdated: "2025-01-15",
        readTime: "12分钟",
        difficulty: "beginner",
      },
      {
        id: "typescript-config",
        title: "TypeScript 配置",
        description: "tsconfig.json 最佳实践配置",
        lastUpdated: "2025-01-14",
        readTime: "10分钟",
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "故障排除",
    description: "常见问题解决方案和调试技巧",
    category: "troubleshooting",
    icon: "lucide:bug",
    color: "text-orange-500",
    gradient: "from-orange-500/10 to-red-500/10",
    pages: [
      {
        id: "common-errors",
        title: "常见错误",
        description: "开发过程中的常见错误和解决方案",
        lastUpdated: "2025-01-13",
        readTime: "15分钟",
        difficulty: "beginner",
      },
      {
        id: "performance-issues",
        title: "性能问题",
        description: "性能瓶颈诊断和优化方法",
        lastUpdated: "2025-01-12",
        readTime: "25分钟",
        difficulty: "advanced",
      },
      {
        id: "build-issues",
        title: "构建问题",
        description: "构建失败的排查和解决步骤",
        lastUpdated: "2025-01-11",
        readTime: "10分钟",
        difficulty: "intermediate",
      },
    ],
  },
];

function DocSectionCard({
  section,
  index,
}: {
  section: DocSection;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.1, ...SMOOTH_TRANSITION }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <div
        className={cn(
          "relative p-8 rounded-xl backdrop-blur-sm border border-border/50",
          "bg-gradient-to-br",
          section.gradient,
          "hover:shadow-lg transition-all duration-300 cursor-pointer",
        )}
      >
        {section.featured && (
          <div className="absolute top-4 right-4">
            <SvgIcon
              icon="lucide:star"
              width={16}
              height={16}
              className="text-yellow-500"
            />
          </div>
        )}

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-3 rounded-xl bg-gradient-to-br from-accent/50 to-accent/30"
            >
              <SvgIcon
                icon={section.icon}
                width={24}
                height={24}
                className={section.color}
              />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {section.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {section.description}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <SvgIcon icon="lucide:book-open" width={14} height={14} />
              包含文档 ({section.pages.length})
            </h4>
            <div className="space-y-2">
              {section.pages.slice(0, 3).map((page, idx) => (
                <div
                  key={page.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">
                      {page.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {page.readTime} • {page.lastUpdated}
                    </div>
                  </div>
                  <SvgIcon
                    icon="lucide:arrow-right"
                    width={14}
                    height={14}
                    className="text-muted-foreground"
                  />
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full gap-2 group-hover:bg-primary/90 transition-all">
            <SvgIcon icon="lucide:book-open" width={16} height={16} />
            查看文档
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function DocsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = docSections.filter((section) => {
    const matchesCategory =
      selectedCategory === "all" || section.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <Navbar />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-emerald-500/10 border border-purple-500/20 mb-6"
          >
            <SvgIcon
              icon="lucide:book"
              width={16}
              height={16}
              className="text-purple-500"
            />
            <span className="text-sm font-medium text-muted-foreground">
              技术文档
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ...SMOOTH_TRANSITION }}
            className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent mb-6"
          >
            开发文档
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, ...SMOOTH_TRANSITION }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            详细的技术文档和API参考，帮助您快速上手和深入掌握每个功能特性。
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, ...SMOOTH_TRANSITION }}
          className="space-y-6 mb-12"
        >
          <div className="max-w-md mx-auto">
            <div className="relative">
              <SvgIcon
                icon="lucide:search"
                width={18}
                height={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="搜索文档..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "transition-all duration-300",
                  selectedCategory === category.id &&
                    "bg-gradient-to-r from-purple-500 to-blue-500 text-white",
                )}
              >
                <SvgIcon
                  icon={category.icon}
                  width={14}
                  height={14}
                  className="mr-2"
                />
                {category.name}
              </Button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredSections.length > 0 ? (
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={SMOOTH_TRANSITION}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
            >
              {filteredSections.map((section, index) => (
                <DocSectionCard
                  key={section.id}
                  section={section}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <SvgIcon
                icon="lucide:search-x"
                width={48}
                height={48}
                className="text-muted-foreground/50 mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                未找到相关文档
              </h3>
              <p className="text-muted-foreground mb-4">
                尝试调整搜索关键词或选择其他分类
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                重置筛选
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, ...SMOOTH_TRANSITION }}
          className="text-center"
        >
          <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-emerald-500/10 border border-border/50 rounded-3xl p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              完善文档
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              发现文档中的问题或需要补充内容？欢迎提交反馈或直接贡献文档内容。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() =>
                  window.open("mailto:docs@awt0204.shop", "_blank")
                }
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
              >
                <SvgIcon
                  icon="lucide:edit"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                改进文档
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open("https://github.com", "_blank")}
              >
                <SvgIcon
                  icon="lucide:github"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                GitHub贡献
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
