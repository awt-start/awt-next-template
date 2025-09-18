/**
 * 博客页面 - 现代简约设计
 * 展示技术文章和公司动态
 */

/* import type { Metadata } from "next";

export const metadata: Metadata = {
  title: '技术博客',
  description: '分享我们的技本见解、设计思考和开发经验。探索前端技术的最新趋势。',
  keywords: ['技术博客', '前端开发', 'Next.js', 'React', '最佳实践'],
}; */

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

// 博客文章数据
const blogPosts = [
  {
    id: 1,
    title: "Next.js 15 新特性详解",
    excerpt:
      "深入了解Next.js 15的新功能，包括Turbopack、App Router改进和性能优化。",
    content: "Next.js 15 带来了许多激动人心的新功能...",
    author: "芒星",
    date: "2025-01-18",
    category: "技术",
    tags: ["Next.js", "React", "前端"],
    readTime: "5分钟",
    image: "lucide:code-2",
    color: "text-blue-500",
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    id: 2,
    title: "TypeScript严格模式最佳实践",
    excerpt: "如何在项目中正确使用TypeScript严格模式，提高代码质量和开发体验。",
    content: "TypeScript严格模式是提高代码质量的重要工具...",
    author: "技术团队",
    date: "2025-01-15",
    category: "技术",
    tags: ["TypeScript", "代码质量", "最佳实践"],
    readTime: "8分钟",
    image: "lucide:shield-check",
    color: "text-emerald-500",
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    id: 3,
    title: "现代化Web设计趋势",
    excerpt: "探讨2025年Web设计的最新趋势，包括毛玻璃效果、渐变设计和微交互。",
    content: "现代Web设计注重用户体验和视觉效果...",
    author: "设计团队",
    date: "2025-01-12",
    category: "设计",
    tags: ["UI/UX", "设计趋势", "用户体验"],
    readTime: "6分钟",
    image: "lucide:palette",
    color: "text-purple-500",
    gradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    id: 4,
    title: "Tailwind CSS v4 升级指南",
    excerpt: "详细介绍如何从Tailwind CSS v3升级到v4，以及新版本的特性和改进。",
    content: "Tailwind CSS v4带来了许多激动人心的改进...",
    author: "芒星",
    date: "2025-01-10",
    category: "技术",
    tags: ["Tailwind CSS", "CSS", "升级"],
    readTime: "7分钟",
    image: "lucide:paintbrush",
    color: "text-cyan-500",
    gradient: "from-cyan-500/10 to-blue-500/10",
  },
  {
    id: 5,
    title: "开源项目的管理之道",
    excerpt: "分享我们在开源项目管理中的经验和教训，如何构建健康的开源社区。",
    content: "开源项目的成功不仅仅依赖于代码质量...",
    author: "团队",
    date: "2025-01-08",
    category: "经验",
    tags: ["开源", "项目管理", "社区"],
    readTime: "10分钟",
    image: "lucide:git-branch",
    color: "text-orange-500",
    gradient: "from-orange-500/10 to-red-500/10",
  },
  {
    id: 6,
    title: "React 19 性能优化技巧",
    excerpt: "深入探讨React 19的性能优化策略，包括新的Hook和并发特性。",
    content: "React 19引入了许多性能优化特性...",
    author: "技术团队",
    date: "2025-01-05",
    category: "技术",
    tags: ["React", "性能优化", "Hook"],
    readTime: "9分钟",
    image: "lucide:zap",
    color: "text-yellow-500",
    gradient: "from-yellow-500/10 to-orange-500/10",
  },
];

// 分类数据
const categories = [
  { name: "全部", count: blogPosts.length },
  {
    name: "技术",
    count: blogPosts.filter((post) => post.category === "技术").length,
  },
  {
    name: "设计",
    count: blogPosts.filter((post) => post.category === "设计").length,
  },
  {
    name: "经验",
    count: blogPosts.filter((post) => post.category === "经验").length,
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");

  // 过滤博客文章
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "全部" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchesCategory && matchesSearch;
  });

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
                href="/company/"
                className="hover:text-foreground transition-colors"
              >
                公司介绍
              </Link>
              <span>/</span>
              <span className="text-foreground">博客</span>
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
                  icon="lucide:book-open"
                  width={20}
                  height={20}
                  className="text-purple-500"
                />
                <span className="text-sm font-medium text-muted-foreground">
                  技术博客
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-purple-600 to-pink-600 bg-clip-text text-transparent">
                技术博客
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                分享我们的技术见解、设计思考和开发经验。
                探索前端技术的最新趋势和最佳实践。
              </p>
            </motion.div>

            {/* 搜索和筛选 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...SMOOTH_TRANSITION }}
              className="flex flex-col md:flex-row gap-6 items-center justify-between"
            >
              {/* 搜索框 */}
              <div className="relative flex-1 max-w-md">
                <SvgIcon
                  icon="lucide:search"
                  width={18}
                  height={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="搜索文章..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border/50 bg-background/50 backdrop-blur-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/50 focus:bg-background/80 transition-all duration-300"
                />
              </div>

              {/* 分类筛选 */}
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap",
                      selectedCategory === category.name
                        ? "bg-purple-500 text-white shadow-lg"
                        : "bg-background/50 text-muted-foreground hover:bg-background/80 hover:text-foreground border border-border/50",
                    )}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </motion.div>

            {/* 博客文章列表 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ...SMOOTH_TRANSITION }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5 + index * 0.1,
                    ...SMOOTH_TRANSITION,
                  }}
                  className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  {/* 文章头部 */}
                  <div
                    className={cn(
                      "h-32 bg-gradient-to-r flex items-center justify-center relative overflow-hidden",
                      post.gradient,
                    )}
                  >
                    <SvgIcon
                      icon={post.image}
                      width={48}
                      height={48}
                      className={cn(
                        post.color,
                        "group-hover:scale-110 transition-transform duration-300",
                      )}
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 text-xs bg-background/80 backdrop-blur-sm text-foreground rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* 文章内容 */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <SvgIcon
                          icon="lucide:calendar"
                          width={12}
                          height={12}
                        />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <SvgIcon icon="lucide:clock" width={12} height={12} />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-foreground group-hover:text-purple-500 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-purple-500/10 text-purple-600 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                          <SvgIcon
                            icon="lucide:user"
                            width={12}
                            height={12}
                            className="text-purple-500"
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {post.author}
                        </span>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          // 这里可以导航到文章详情页
                          console.log("查看文章:", post.id);
                        }}
                      >
                        <span className="text-sm">阅读更多</span>
                        <SvgIcon
                          icon="lucide:arrow-right"
                          width={14}
                          height={14}
                          className="ml-1"
                        />
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {/* 空状态 */}
            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, ...SMOOTH_TRANSITION }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                  <SvgIcon
                    icon="lucide:search-x"
                    width={32}
                    height={32}
                    className="text-purple-500"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  没有找到相关文章
                </h3>
                <p className="text-muted-foreground mb-6">
                  尝试调整搜索条件或选择不同的分类
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("全部");
                  }}
                >
                  重置筛选
                </Button>
              </motion.div>
            )}

            {/* 加载更多 / 分页 */}
            {filteredPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, ...SMOOTH_TRANSITION }}
                className="text-center"
              >
                <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 border border-border/50 rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    想要了解更多？
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    关注我们的GitHub或订阅我们的邮件列表，获取最新的技术文章和产品动态。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      onClick={() =>
                        window.open("https://github.com", "_blank")
                      }
                    >
                      <SvgIcon
                        icon="lucide:github"
                        width={16}
                        height={16}
                        className="mr-2"
                      />
                      关注GitHub
                    </Button>
                    <Button asChild>
                      <Link href="/company/contact">
                        <SvgIcon
                          icon="lucide:mail"
                          width={16}
                          height={16}
                          className="mr-2"
                        />
                        订阅邮件
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
