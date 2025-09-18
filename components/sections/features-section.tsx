/**
 * 功能特性展示组件 - 优雅的卡片布局与微交互
 * 展示产品核心特性，包含动画效果和响应式设计
 */

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import SvgIcon from "@/components/icon/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeaturesSectionProps {
  className?: string;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  stats?: string;
}

const features: Feature[] = [
  {
    title: "极速性能",
    description:
      "基于 Next.js 15 和 Turbopack，提供极致的开发和运行性能，让您的应用飞一般的快速。",
    icon: "lucide:zap",
    color: "text-yellow-500",
    gradient: "from-yellow-500/10 to-orange-500/10",
    stats: "99% 更快",
  },
  {
    title: "现代设计",
    description:
      "采用最新的设计趋势，结合 Tailwind CSS 和 Framer Motion，创造令人惊艳的用户体验。",
    icon: "lucide:palette",
    color: "text-purple-500",
    gradient: "from-purple-500/10 to-pink-500/10",
    stats: "100+ 组件",
  },
  {
    title: "类型安全",
    description:
      "完整的 TypeScript 支持，严格模式下的类型检查，让您的代码更加安全可靠。",
    icon: "lucide:shield-check",
    color: "text-blue-500",
    gradient: "from-blue-500/10 to-cyan-500/10",
    stats: "100% 类型覆盖",
  },
  {
    title: "国际化",
    description:
      "基于 next-intl 的完整国际化解决方案，轻松支持多语言，触达全球用户。",
    icon: "lucide:globe",
    color: "text-green-500",
    gradient: "from-green-500/10 to-emerald-500/10",
    stats: "20+ 语言",
  },
  {
    title: "响应式",
    description: "完美适配各种设备尺寸，从手机到桌面端，提供一致的优质体验。",
    icon: "lucide:monitor-smartphone",
    color: "text-indigo-500",
    gradient: "from-indigo-500/10 to-blue-500/10",
    stats: "100% 适配",
  },
  {
    title: "开发体验",
    description:
      "集成 Biome、热重载、自动格式化等现代开发工具，提升开发效率和代码质量。",
    icon: "lucide:code",
    color: "text-red-500",
    gradient: "from-red-500/10 to-pink-500/10",
    stats: "10x 效率",
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="group relative"
    >
      <motion.div
        className={cn(
          "relative p-8 rounded-2xl backdrop-blur-sm border border-border/50",
          "bg-gradient-to-br",
          feature.gradient,
          "hover:border-border transition-all duration-500",
          "shadow-lg shadow-black/5 dark:shadow-black/20",
          "hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30",
        )}
        whileHover={{
          y: -8,
          scale: 1.02,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        {/* 背景光效 */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${feature.color.replace("text-", "").replace("-500", "")}33 0%, transparent 70%)`,
          }}
        />

        {/* 内容区域 */}
        <div className="relative z-10 space-y-6">
          {/* 图标和统计 */}
          <div className="flex items-start justify-between">
            <motion.div
              className={cn(
                "p-4 rounded-xl bg-gradient-to-br",
                feature.gradient,
                "border border-border/30",
              )}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
            >
              <SvgIcon
                icon={feature.icon}
                width={28}
                height={28}
                className={cn(feature.color, "drop-shadow-sm")}
                animate="hover-scale"
              />
            </motion.div>

            {feature.stats && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ delay: index * 0.1 + 0.3 }}
                className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-xs font-medium text-muted-foreground"
              >
                {feature.stats}
              </motion.div>
            )}
          </div>

          {/* 标题和描述 */}
          <div className="space-y-3">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="text-xl font-bold text-foreground group-hover:text-foreground/90 transition-colors duration-300"
            >
              {feature.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="text-muted-foreground leading-relaxed text-sm"
            >
              {feature.description}
            </motion.p>
          </div>

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
              了解更多
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
        <motion.div
          className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, ${feature.color.replace("text-", "").replace("-500", "")}40 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export function FeaturesSection({ className }: FeaturesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  return (
    <motion.section
      ref={sectionRef}
      id="features"
      style={{ y, opacity }}
      className={cn(
        "relative py-24 lg:py-32 overflow-hidden",
        "bg-gradient-to-b from-background via-background/95 to-background",
        className,
      )}
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.1) 0%, transparent 50%)
            `,
            backgroundSize: "100% 100%",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 mb-6"
          >
            <SvgIcon
              icon="lucide:sparkles"
              width={16}
              height={16}
              className="text-blue-500"
            />
            <span className="text-sm font-medium text-muted-foreground">
              核心特性
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-foreground via-blue-600 to-purple-600 bg-clip-text text-transparent">
              为什么选择我们？
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            我们提供业界领先的开发体验和用户界面，让您的项目在竞争中脱颖而出。
            每一个细节都经过精心打磨，只为给您最好的体验。
          </motion.p>
        </motion.div>

        {/* 特性网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* 底部行动区域 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16 lg:mt-20"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <SvgIcon
                icon="lucide:rocket"
                width={20}
                height={20}
                className="mr-2"
              />
              立即开始
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-accent/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <SvgIcon
                icon="lucide:book-open"
                width={20}
                height={20}
                className="mr-2"
              />
              查看文档
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
