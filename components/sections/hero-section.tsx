/**
 * 英雄区域组件 - 令人屏息的视觉冲击力
 * 包含动态背景、粒子效果、流畅动画和响应式设计
 */

"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import SvgIcon from "@/components/icon/icon";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

// 粒子接口
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function HeroSection({ className }: HeroSectionProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // 视差效果
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // 平滑的 spring 动画
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  // 初始化粒子系统
  useEffect(() => {
    const createParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
      setParticles(newParticles);
    };

    createParticles();

    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => {
          const newX = particle.x + particle.speedX;
          const newY = particle.y + particle.speedY;

          return {
            ...particle,
            x:
              newX > window.innerWidth
                ? 0
                : newX < 0
                  ? window.innerWidth
                  : newX,
            y:
              newY > window.innerHeight
                ? 0
                : newY < 0
                  ? window.innerHeight
                  : newY,
          };
        }),
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // 鼠标跟踪
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stats = [
    { label: "性能优化", value: "99%", icon: "lucide:zap" },
    { label: "用户满意度", value: "98%", icon: "lucide:heart" },
    { label: "响应速度", value: "<100ms", icon: "lucide:timer" },
    { label: "可用性", value: "99.9%", icon: "lucide:shield-check" },
  ];

  return (
    <motion.section
      ref={heroRef}
      style={{ y: springY, opacity, scale }}
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        "bg-gradient-to-br from-background via-background/95 to-background/90",
        className,
      )}
    >
      {/* 动态网格背景 */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      </div>

      {/* 粒子系统 */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-500 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              opacity: particle.opacity,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [
                particle.opacity,
                particle.opacity * 1.5,
                particle.opacity,
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 主要内容区域 */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* 标题区域 */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20"
            >
              <SvgIcon
                icon="lucide:sparkles"
                width={16}
                height={16}
                className="text-blue-500"
              />
              <span className="text-sm font-medium text-muted-foreground">
                现代化模板框架
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-foreground via-blue-600 to-purple-600 bg-clip-text text-transparent">
                令人惊艳的
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                现代化体验
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              基于 Next.js 15 构建的现代化模板，集成 TypeScript、Tailwind CSS 和
              Framer Motion， 为您提供极致的开发体验和令人惊叹的用户界面。
            </motion.p>
          </div>

          {/* 行动按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                <SvgIcon icon="lucide:rocket" width={20} height={20} />
                开始探索
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group hover:bg-accent/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <SvgIcon icon="lucide:github" width={20} height={20} />
                查看源码
              </span>
              <motion.div className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                <SvgIcon icon="lucide:arrow-right" width={16} height={16} />
              </motion.div>
            </Button>
          </motion.div>

          {/* 统计数据 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                className="group p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300">
                    <SvgIcon
                      icon={stat.icon}
                      width={24}
                      height={24}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* 底部渐变 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </motion.section>
  );
}
