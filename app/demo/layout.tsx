"use client"

import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface QueryDemoLayoutProps {
    children: ReactNode;
}

export default function DemoLayout({ children }: QueryDemoLayoutProps) {
    return (
        <div className="min-h-screen overflow-x-hidden">
            {/* 头部导航 */}
            <Navbar />

            {/* 动态背景层 - 多重渐变 + 流动粒子 */}
            <div className="min-h-screen absolute inset-0 overflow-hidden pointer-events-none">
                {/* 背景网格（细线） */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* 主渐变球体（左上） */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-indigo-600/10 rounded-full blur-3xl animate-pulse" />

                {/* 主渐变球体（右下） */}
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-purple-500/25 via-pink-500/20 to-red-500/15 rounded-full blur-3xl animate-pulse delay-1000" />

                {/* 次级光晕（左下） */}
                <div className="absolute -bottom-32 -left-24 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-transparent rounded-full blur-2xl" />

                {/* 次级光晕（右上） */}
                <div className="absolute -top-32 -right-24 w-72 h-72 bg-gradient-to-l from-purple-400/10 to-transparent rounded-full blur-2xl" />

                {/* 动态粒子背景（使用伪元素模拟） */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            suppressHydrationWarning
                            key={i}
                            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                                opacity: Math.random() * 0.5 + 0.3,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                x: [0, 10, -10, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 3 + Math.random() * 4,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* 主内容区 */}
            <div className="relative z-10">{children}</div>
            {/* 全局动画样式（用于粒子浮动） */}
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
            `}</style>
        </div>
    )
}
