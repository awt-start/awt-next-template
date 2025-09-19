/**
 * 学习教程页面 - 系统化的学习路径和教程指南
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

interface Tutorial {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  lessons: number;
  category: string;
  tags: string[];
  icon: string;
  color: string;
  gradient: string;
  progress?: number;
  featured?: boolean;
}

const levelConfig = {
  beginner: {
    label: "入门",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  intermediate: {
    label: "进阶",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  advanced: {
    label: "高级",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
};

const categories = [
  { id: "all", name: "全部", icon: "lucide:grid-3x3" },
  { id: "frontend", name: "前端开发", icon: "lucide:monitor" },
  { id: "backend", name: "后端开发", icon: "lucide:server" },
  { id: "tools", name: "开发工具", icon: "lucide:wrench" },
];

const tutorials: Tutorial[] = [
  {
    id: "nextjs-basics",
    title: "Next.js 15 基础入门",
    description: "从零开始学习Next.js 15，掌握现代React开发框架的核心概念。",
    level: "beginner",
    duration: "6小时",
    lessons: 12,
    category: "frontend",
    tags: ["Next.js", "React", "SSR"],
    icon: "logos:nextjs-icon",
    color: "text-black dark:text-white",
    gradient: "from-gray-500/10 to-black/10",
    progress: 25,
    featured: true,
  },
  {
    id: "react-hooks",
    title: "React Hooks 深度解析",
    description: "深入理解React Hooks的工作原理，学习自定义Hook开发。",
    level: "intermediate",
    duration: "4小时",
    lessons: 8,
    category: "frontend",
    tags: ["React", "Hooks", "状态管理"],
    icon: "logos:react",
    color: "text-blue-500",
    gradient: "from-blue-500/10 to-cyan-500/10",
    progress: 60,
  },
  {
    id: "typescript-advanced",
    title: "TypeScript 高级特性",
    description: "掌握TypeScript的高级类型系统和泛型编程。",
    level: "advanced",
    duration: "8小时",
    lessons: 16,
    category: "frontend",
    tags: ["TypeScript", "类型系统", "泛型"],
    icon: "logos:typescript-icon",
    color: "text-blue-600",
    gradient: "from-blue-600/10 to-indigo-600/10",
    featured: true,
  },
  {
    id: "node-api",
    title: "Node.js API 开发",
    description: "学习使用Node.js构建RESTful API。",
    level: "intermediate",
    duration: "7小时",
    lessons: 14,
    category: "backend",
    tags: ["Node.js", "Express", "API"],
    icon: "logos:nodejs-icon",
    color: "text-green-600",
    gradient: "from-green-600/10 to-emerald-600/10",
  },
];

function TutorialCard({
  tutorial,
  index,
}: {
  tutorial: Tutorial;
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
          "relative p-6 rounded-xl backdrop-blur-sm border border-border/50",
          "bg-gradient-to-br",
          tutorial.gradient,
          "hover:shadow-lg transition-all duration-300 cursor-pointer",
        )}
      >
        {tutorial.featured && (
          <div className="absolute top-3 right-3">
            <SvgIcon
              icon="lucide:star"
              width={16}
              height={16}
              className="text-yellow-500"
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <SvgIcon
              icon={tutorial.icon}
              width={32}
              height={32}
              className={tutorial.color}
            />
            <span
              className={cn(
                "px-2 py-1 text-xs rounded-full",
                levelConfig[tutorial.level].color,
                levelConfig[tutorial.level].bgColor,
              )}
            >
              {levelConfig[tutorial.level].label}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">{tutorial.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {tutorial.description}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <SvgIcon icon="lucide:clock" width={12} height={12} />
              {tutorial.duration}
            </div>
            <div className="flex items-center gap-1">
              <SvgIcon icon="lucide:book-open" width={12} height={12} />
              {tutorial.lessons} 课时
            </div>
          </div>

          {tutorial.progress && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">进度</span>
                <span className={tutorial.color}>{tutorial.progress}%</span>
              </div>
              <div className="w-full bg-accent/30 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full bg-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${tutorial.progress}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-1">
            {tutorial.tags.map((tag, idx) => (
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

export default function TutorialsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredTutorials = tutorials.filter(
    (t) => selectedCategory === "all" || t.category === selectedCategory,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      <Navbar />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 border border-emerald-500/20 mb-6"
          >
            <SvgIcon
              icon="lucide:graduation-cap"
              width={16}
              height={16}
              className="text-emerald-500"
            />
            <span className="text-sm font-medium text-muted-foreground">
              学习教程
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ...SMOOTH_TRANSITION }}
            className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent mb-6"
          >
            系统化学习
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, ...SMOOTH_TRANSITION }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            结构化的学习路径和高质量教程，帮助您系统掌握现代Web开发技术。
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, ...SMOOTH_TRANSITION }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "transition-all duration-300",
                selectedCategory === category.id &&
                  "bg-gradient-to-r from-emerald-500 to-blue-500 text-white",
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredTutorials.map((tutorial, index) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, ...SMOOTH_TRANSITION }}
          className="text-center"
        >
          <div className="backdrop-blur-xl bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 border border-border/50 rounded-3xl p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              开始学习之旅
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              选择适合您水平的教程开始学习，或联系我们获取个性化学习建议。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white border-0"
              >
                <SvgIcon
                  icon="lucide:play"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                开始学习
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  window.open("mailto:learn@awt0204.shop", "_blank")
                }
              >
                <SvgIcon
                  icon="lucide:mail"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                学习咨询
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
