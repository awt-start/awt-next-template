"use client";

import { Navbar } from "@/components/layout/navbar";
import { motion, useAnimation } from "framer-motion";
import { ReactNode, useMemo } from "react";

interface QueryDemoLayoutProps {
  children: ReactNode;
}

export default function DemoLayout({ children }: QueryDemoLayoutProps) {
  const particleVariants = useMemo(
    () => ({
      animate: {
        y: [0, -20, 0],
        x: [0, 10, -10, 0],
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.2, 1],
        transition: {
          repeat: Infinity,
          duration: 3 + Math.random() * 4,
          ease: "easeInOut",
          delay: Math.random() * 2,
        },
      },
    }),
    [],
  );

  // 创建一个用于控制粒子动画的动画控制器（可选）
  const controls = useAnimation();

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* 头部导航 */}
      <Navbar />

      {/* 动态背景层 - 多重渐变 + 流动粒子 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 背景网格（细线） */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
      linear-gradient(rgba(59, 130, 246, 0.06) 0.5px, transparent 0.5px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.06) 0.5px, transparent 0.5px)
    `,
            backgroundSize: "20px 20px" /* 实际物理像素 = 40px / 2 */,
            transform: "scale(0.5)",
            transformOrigin: "top left",
            width: "200%" /* 拉伸以补偿缩放 */,
            height: "200%",
            zIndex: 1,
          }}
        />

        {/* 主渐变球体（左上） */}
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-indigo-600/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 主渐变球体（右下） */}
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-purple-500/25 via-pink-500/20 to-red-500/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* 次级光晕（左下） */}
        <div className="absolute -bottom-32 -left-24 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-transparent rounded-full blur-2xl" />

        {/* 次级光晕（右上） */}
        <div className="absolute -top-32 -right-24 w-72 h-72 bg-gradient-to-l from-purple-400/10 to-transparent rounded-full blur-2xl" />

        {/* 动态粒子背景（优化版） */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              suppressHydrationWarning
              key={i}
              //@ts-ignore
              variants={particleVariants}
              initial="animate"
              animate="animate"
              className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
              }}
            />
          ))}
        </div>

        {/* 鼠标悬停时的背景微动效果（可选） */}
        <div
          className="absolute inset-0 pointer-events-none"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            // 可以通过 CSS 或 JS 控制背景轻微偏移（例如用 transform）
            // 这里仅作为示例，实际可用 `transform: translate()` 或 `filter`
          }}
        />
      </div>

      {/* 主内容区 */}
      <div className="relative z-10 min-h-screen">{children}</div>

      {/* 全局动画样式 */}
      <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                    }
                    25% {
                        transform: translateY(-10px) translateX(5px);
                    }
                    50% {
                        transform: translateY(-5px) translateX(-5px);
                    }
                    75% {
                        transform: translateY(-15px) translateX(0);
                    }
                }

                /* 添加鼠标悬停背景响应（可选） */
                .hover-effect:hover {
                    filter: brightness(1.05);
                }
            `}</style>
    </div>
  );
}
