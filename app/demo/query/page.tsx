/**
 * TanStack Query 示例页面
 * 演示如何在Next.js项目中使用封装的Query和Mutation Hooks
 */

import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import { Link, Home, Shield, Clock, Eye, Users, FileText, Mail, ArrowLeft, Cookie, UserCheck, Code } from "lucide-react";
import { TanStackQueryExamples } from "./components/QueryExamples";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "TanStack Query 示例 | Next Template",
    description: "演示TanStack Query在Next.js项目中的使用方法和最佳实践",
};

export default function QueryDemoPage() {
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
                <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-500/8 via-blue-500/8 to-cyan-500/8 rounded-full blur-3xl" />
            </div>

            <main className="relative z-10 min-h-screen pt-24 pb-16">
                {/* 主要内容区域 */}
                <TanStackQueryExamples />
            </main>
        </div>
    )
}