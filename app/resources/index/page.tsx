/**
 * 资源索引页面 - 开发工具和实用资源集合
 * 分类展示各种开发工具、设计资源和在线服务
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

// 资源类型
interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  icon: string;
  color: string;
  gradient: string;
  rating: number;
  free: boolean;
  featured?: boolean;
}

// 资源分类
const categories = [
  { id: "all", name: "全部", icon: "lucide:grid-3x3", count: 50 },
  { id: "development", name: "开发工具", icon: "lucide:code", count: 15 },
  { id: "design", name: "设计资源", icon: "lucide:palette", count: 12 },
  { id: "productivity", name: "效率工具", icon: "lucide:zap", count: 8 },
  { id: "learning", name: "学习平台", icon: "lucide:book-open", count: 10 },
  { id: "hosting", name: "托管服务", icon: "lucide:server", count: 5 },
];

// 模拟资源数据
const resources: Resource[] = [
  // 开发工具
  {
    id: "vscode",
    name: "Visual Studio Code",
    description: "微软开发的免费代码编辑器，支持丰富的插件生态",
    url: "https://code.visualstudio.com",
    category: "development",
    tags: ["编辑器", "插件", "调试", "Git"],
    icon: "logos:visual-studio-code",
    color: "text-blue-500",
    gradient: "from-blue-500/10 to-cyan-500/10",
    rating: 5,
    free: true,
    featured: true,
  },
  {
    id: "github",
    name: "GitHub",
    description: "全球最大的代码托管平台，支持Git版本控制和协作开发",
    url: "https://github.com",
    category: "development",
    tags: ["Git", "版本控制", "协作", "开源"],
    icon: "logos:github-icon",
    color: "text-gray-900",
    gradient: "from-gray-500/10 to-slate-500/10",
    rating: 5,
    free: true,
    featured: true,
  },
  {
    id: "postman",
    name: "Postman",
    description: "API开发和测试的强大工具，支持自动化测试和文档生成",
    url: "https://www.postman.com",
    category: "development",
    tags: ["API", "测试", "文档", "自动化"],
    icon: "logos:postman-icon",
    color: "text-orange-500",
    gradient: "from-orange-500/10 to-red-500/10",
    rating: 4,
    free: true,
  },
  {
    id: "docker",
    name: "Docker",
    description: "容器化平台，简化应用部署和环境管理",
    url: "https://www.docker.com",
    category: "development",
    tags: ["容器", "部署", "DevOps", "虚拟化"],
    icon: "logos:docker-icon",
    color: "text-blue-600",
    gradient: "from-blue-600/10 to-cyan-600/10",
    rating: 5,
    free: true,
  },

  // 设计资源
  {
    id: "figma",
    name: "Figma",
    description: "基于云的界面设计工具，支持实时协作和原型设计",
    url: "https://www.figma.com",
    category: "design",
    tags: ["UI设计", "原型", "协作", "组件"],
    icon: "logos:figma",
    color: "text-purple-500",
    gradient: "from-purple-500/10 to-pink-500/10",
    rating: 5,
    free: true,
    featured: true,
  },
  {
    id: "unsplash",
    name: "Unsplash",
    description: "高质量免费图片库，为设计师和开发者提供美丽的照片",
    url: "https://unsplash.com",
    category: "design",
    tags: ["图片", "摄影", "免费", "素材"],
    icon: "lucide:image",
    color: "text-emerald-500",
    gradient: "from-emerald-500/10 to-teal-500/10",
    rating: 4,
    free: true,
  },
  {
    id: "iconify",
    name: "Iconify",
    description: "统一的图标框架，包含超过100,000个开源图标",
    url: "https://iconify.design",
    category: "design",
    tags: ["图标", "SVG", "开源", "组件"],
    icon: "lucide:star",
    color: "text-yellow-500",
    gradient: "from-yellow-500/10 to-orange-500/10",
    rating: 5,
    free: true,
  },

  // 效率工具
  {
    id: "notion",
    name: "Notion",
    description: "一体化工作空间，集笔记、文档、项目管理于一体",
    url: "https://www.notion.so",
    category: "productivity",
    tags: ["笔记", "文档", "项目管理", "协作"],
    icon: "lucide:book",
    color: "text-gray-800",
    gradient: "from-gray-500/10 to-slate-500/10",
    rating: 4,
    free: true,
  },
  {
    id: "obsidian",
    name: "Obsidian",
    description: "基于链接的知识管理工具，支持Markdown和图谱视图",
    url: "https://obsidian.md",
    category: "productivity",
    tags: ["知识管理", "Markdown", "笔记", "图谱"],
    icon: "lucide:brain",
    color: "text-purple-600",
    gradient: "from-purple-600/10 to-indigo-600/10",
    rating: 4,
    free: true,
  },

  // 学习平台
  {
    id: "mdn",
    name: "MDN Web Docs",
    description: "Mozilla维护的Web开发文档，权威的Web技术参考资料",
    url: "https://developer.mozilla.org",
    category: "learning",
    tags: ["文档", "Web", "API", "教程"],
    icon: "logos:mozilla",
    color: "text-orange-600",
    gradient: "from-orange-600/10 to-red-600/10",
    rating: 5,
    free: true,
    featured: true,
  },
  {
    id: "freecodecamp",
    name: "freeCodeCamp",
    description: "免费的编程学习平台，提供全栈开发课程和认证",
    url: "https://www.freecodecamp.org",
    category: "learning",
    tags: ["编程", "课程", "认证", "免费"],
    icon: "lucide:graduation-cap",
    color: "text-green-600",
    gradient: "from-green-600/10 to-emerald-600/10",
    rating: 5,
    free: true,
  },

  // 托管服务
  {
    id: "vercel",
    name: "Vercel",
    description: "专为前端框架优化的部署平台，支持Next.js原生部署",
    url: "https://vercel.com",
    category: "hosting",
    tags: ["部署", "CDN", "无服务器", "Next.js"],
    icon: "logos:vercel-icon",
    color: "text-black",
    gradient: "from-gray-500/10 to-black/10",
    rating: 5,
    free: true,
    featured: true,
  },
  {
    id: "netlify",
    name: "Netlify",
    description: "现代Web项目的一体化平台，支持静态站点和无服务器函数",
    url: "https://www.netlify.com",
    category: "hosting",
    tags: ["静态站点", "JAMstack", "CI/CD", "表单"],
    icon: "logos:netlify",
    color: "text-teal-500",
    gradient: "from-teal-500/10 to-cyan-500/10",
    rating: 4,
    free: true,
  },
];

// 资源卡片组件
function ResourceCard({
  resource,
  index,
}: {
  resource: Resource;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.05, ...SMOOTH_TRANSITION }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative"
    >
      <div
        className={cn(
          "relative p-6 rounded-xl backdrop-blur-sm border border-border/50",
          "bg-gradient-to-br",
          resource.gradient,
          "hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20",
          "transition-all duration-300 cursor-pointer overflow-hidden",
        )}
        onClick={() => window.open(resource.url, "_blank")}
      >
        {/* 特色标识 */}
        {resource.featured && (
          <div className="absolute top-3 right-3">
            <div className="px-2 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
              <SvgIcon
                icon="lucide:star"
                width={12}
                height={12}
                className="text-yellow-500"
              />
            </div>
          </div>
        )}

        {/* 图标和信息 */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <SvgIcon
                icon={resource.icon}
                width={32}
                height={32}
                className={cn(resource.color, "drop-shadow-sm")}
              />
            </motion.div>

            <div className="flex items-center gap-2">
              {resource.free && (
                <span className="px-2 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-600 border border-emerald-500/30">
                  免费
                </span>
              )}
            </div>
          </div>

          {/* 标题和描述 */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground group-hover:text-foreground/90 transition-colors">
              {resource.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {resource.description}
            </p>
          </div>

          {/* 评分 */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <SvgIcon
                key={i}
                icon={i < resource.rating ? "lucide:star" : "lucide:star"}
                width={12}
                height={12}
                className={cn(
                  "transition-colors duration-200",
                  i < resource.rating
                    ? "text-yellow-500"
                    : "text-gray-300 dark:text-gray-600",
                )}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              {resource.rating}/5
            </span>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-1">
            {resource.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded bg-accent/30 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="px-2 py-1 text-xs rounded bg-accent/30 text-muted-foreground">
                +{resource.tags.length - 3}
              </span>
            )}
          </div>

          {/* 悬停操作 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <Button size="sm" className="gap-2">
              <SvgIcon icon="lucide:external-link" width={14} height={14} />
              访问资源
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ResourcesIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // 过滤资源
  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchesCategory && matchesSearch;
  });

  // 特色资源
  const featuredResources = resources.filter((resource) => resource.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-purple-500/10 border border-blue-500/20 mb-6"
          >
            <SvgIcon
              icon="lucide:layout-grid"
              width={16}
              height={16}
              className="text-blue-500"
            />
            <span className="text-sm font-medium text-muted-foreground">
              资源索引
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ...SMOOTH_TRANSITION }}
            className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent mb-6"
          >
            开发工具库
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, ...SMOOTH_TRANSITION }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            精心整理的开发工具、设计资源和在线服务，助力您的开发工作。
            所有资源均经过验证，提供最佳的使用体验。
          </motion.p>
        </motion.div>

        {/* 搜索和筛选 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, ...SMOOTH_TRANSITION }}
          className="space-y-6 mb-12"
        >
          {/* 搜索框 */}
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
                placeholder="搜索资源..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* 分类筛选 */}
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
                    "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
                )}
              >
                <SvgIcon
                  icon={category.icon}
                  width={14}
                  height={14}
                  className="mr-2"
                />
                {category.name}
                <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-background/20">
                  {category.count}
                </span>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* 特色资源 */}
        {selectedCategory === "all" && featuredResources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, ...SMOOTH_TRANSITION }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                特色推荐
              </h2>
              <p className="text-muted-foreground">编辑精选的优质资源</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map((resource, index) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* 资源网格 */}
        <div ref={containerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, ...SMOOTH_TRANSITION }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {selectedCategory === "all"
                  ? "所有资源"
                  : categories.find((c) => c.id === selectedCategory)?.name}
              </h2>
              <div className="text-sm text-muted-foreground">
                找到 {filteredResources.length} 个资源
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {filteredResources.length > 0 ? (
              <motion.div
                key={selectedCategory + searchQuery}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={SMOOTH_TRANSITION}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredResources.map((resource, index) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <SvgIcon
                  icon="lucide:search-x"
                  width={48}
                  height={48}
                  className="text-muted-foreground/50 mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  未找到相关资源
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
        </div>

        {/* 提交资源 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, ...SMOOTH_TRANSITION }}
          className="text-center mt-20"
        >
          <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-purple-500/10 border border-border/50 rounded-3xl p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              推荐优质资源
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              发现了好用的工具或资源？与社区分享，让更多开发者受益。
              我们会仔细评估每一个推荐。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() =>
                  window.open(
                    "mailto:resources@awt0204.shop?subject=资源推荐",
                    "_blank",
                  )
                }
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <SvgIcon
                  icon="lucide:plus"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                推荐资源
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open("https://github.com", "_blank")}
                className="hover:bg-accent/50 hover:border-blue-500/50 transition-all duration-300"
              >
                <SvgIcon
                  icon="lucide:github"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                GitHub项目
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
