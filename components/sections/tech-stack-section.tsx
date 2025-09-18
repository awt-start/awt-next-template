/**
 * 技术栈展示组件 - 动态的技术标签云
 * 展示项目使用的技术栈，具有交互动画和视觉效果
 */

"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import SvgIcon from "@/components/icon/icon";
import { cn } from "@/lib/utils";

interface TechStackSectionProps {
  className?: string;
}

interface TechItem {
  name: string;
  icon: string;
  color: string;
  category: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
}

const techStack: TechItem[] = [
  // 前端框架
  {
    name: "Next.js 15",
    icon: "logos:nextjs-icon",
    color: "text-black dark:text-white",
    category: "框架",
    description: "React 全栈框架",
    level: "expert",
  },
  {
    name: "React 19",
    icon: "logos:react",
    color: "text-blue-500",
    category: "框架",
    description: "用户界面库",
    level: "expert",
  },
  {
    name: "TypeScript",
    icon: "logos:typescript-icon",
    color: "text-blue-600",
    category: "语言",
    description: "类型安全",
    level: "expert",
  },

  // 样式和UI
  {
    name: "Tailwind CSS",
    icon: "logos:tailwindcss-icon",
    color: "text-cyan-500",
    category: "样式",
    description: "实用优先的CSS框架",
    level: "expert",
  },
  {
    name: "Framer Motion",
    icon: "logos:framer",
    color: "text-purple-600",
    category: "动画",
    description: "React 动画库",
    level: "advanced",
  },
  {
    name: "Radix UI",
    icon: "simple-icons:radixui",
    color: "text-gray-800 dark:text-gray-200",
    category: "组件",
    description: "无头UI组件",
    level: "advanced",
  },

  // 工具链
  {
    name: "Turbopack",
    icon: "simple-icons:turbopack",
    color: "text-red-500",
    category: "构建",
    description: "极速打包工具",
    level: "intermediate",
  },
  {
    name: "Biome",
    icon: "simple-icons:biome",
    color: "text-green-600",
    category: "工具",
    description: "代码格式化",
    level: "intermediate",
  },
  {
    name: "Zod",
    icon: "simple-icons:zod",
    color: "text-blue-700",
    category: "验证",
    description: "TypeScript 模式验证",
    level: "advanced",
  },

  // 国际化和状态
  {
    name: "next-intl",
    icon: "lucide:globe",
    color: "text-emerald-500",
    category: "国际化",
    description: "多语言支持",
    level: "advanced",
  },
  {
    name: "date-fns",
    icon: "simple-icons:datefns",
    color: "text-orange-500",
    category: "工具",
    description: "日期处理库",
    level: "intermediate",
  },
  {
    name: "Lucide React",
    icon: "lucide:feather",
    color: "text-gray-700 dark:text-gray-300",
    category: "图标",
    description: "图标库",
    level: "beginner",
  },
];

const categories = Array.from(new Set(techStack.map((tech) => tech.category)));

const levelColors = {
  beginner: "from-green-500/20 to-emerald-500/20 border-green-500/30",
  intermediate: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  advanced: "from-purple-500/20 to-violet-500/20 border-purple-500/30",
  expert: "from-orange-500/20 to-red-500/20 border-orange-500/30",
};

const levelLabels = {
  beginner: "入门",
  intermediate: "中级",
  advanced: "高级",
  expert: "专家",
};

function TechCard({ tech, index }: { tech: TechItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.8, y: 50 }
      }
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={cn(
          "relative p-6 rounded-xl backdrop-blur-sm border",
          "bg-gradient-to-br",
          levelColors[tech.level],
          "hover:shadow-lg transition-all duration-300",
          "cursor-pointer overflow-hidden",
        )}
        whileHover={{
          y: -5,
          scale: 1.05,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* 背景动效 */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* 内容 */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-3">
          {/* 图标 */}
          <motion.div
            className="relative"
            animate={{
              rotate: isHovered ? [0, -10, 10, 0] : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            <SvgIcon
              icon={tech.icon}
              width={32}
              height={32}
              className={cn(tech.color, "drop-shadow-sm")}
            />

            {/* 光环效果 */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${tech.color.replace("text-", "").replace("-500", "")}20 0%, transparent 70%)`,
              }}
              animate={{
                scale: isHovered ? [1, 1.5, 1] : 1,
                opacity: isHovered ? [0.3, 0.6, 0.3] : 0,
              }}
              transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
            />
          </motion.div>

          {/* 技术名称 */}
          <motion.h3
            className="font-semibold text-sm text-foreground"
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {tech.name}
          </motion.h3>

          {/* 等级标签 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0.7,
              scale: isHovered ? 1 : 0.9,
            }}
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              "bg-background/50 text-muted-foreground border border-border/50",
            )}
          >
            {levelLabels[tech.level]}
          </motion.div>

          {/* 悬停时显示的描述 */}
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            className="text-xs text-muted-foreground overflow-hidden"
          >
            {tech.description}
          </motion.p>
        </div>

        {/* 装饰性粒子 */}
        <motion.div
          className="absolute top-2 right-2 w-2 h-2 rounded-full bg-current opacity-20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export function TechStackSection({ className }: TechStackSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredTechStack = selectedCategory
    ? techStack.filter((tech) => tech.category === selectedCategory)
    : techStack;

  return (
    <motion.section
      ref={sectionRef}
      style={{ y }}
      className={cn(
        "relative py-24 lg:py-32 overflow-hidden",
        "bg-gradient-to-b from-background via-accent/5 to-background",
        className,
      )}
    >
      {/* 背景网格 */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-purple-500/20 mb-6"
          >
            <SvgIcon
              icon="lucide:code"
              width={16}
              height={16}
              className="text-purple-500"
            />
            <span className="text-sm font-medium text-muted-foreground">
              技术栈
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              现代技术栈
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            我们使用业界领先的技术和工具，确保项目的可维护性、性能和开发体验。
            每一项技术的选择都经过深思熟虑。
          </motion.p>
        </motion.div>

        {/* 分类过滤器 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <motion.button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              selectedCategory === null
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "bg-background/50 text-muted-foreground hover:text-foreground hover:bg-accent border border-border/50",
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            全部
          </motion.button>

          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-background/50 text-muted-foreground hover:text-foreground hover:bg-accent border border-border/50",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* 技术网格 */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {filteredTechStack.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index} />
          ))}
        </motion.div>

        {/* 统计信息 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            {
              label: "技术数量",
              value: techStack.length,
              icon: "lucide:layers",
            },
            { label: "分类", value: categories.length, icon: "lucide:folder" },
            {
              label: "专家级",
              value: techStack.filter((t) => t.level === "expert").length,
              icon: "lucide:star",
            },
            { label: "现代化", value: "100%", icon: "lucide:trending-up" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-background/50 to-accent/10 backdrop-blur-sm border border-border/50"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-3">
                <SvgIcon
                  icon={stat.icon}
                  width={20}
                  height={20}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
