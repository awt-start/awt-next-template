"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import SvgIcon, { animationVariants } from "@/components/icon/icon";
import { useNavigate } from "@/lib/router";

// 类型定义
interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export default function DemoPage() {
  const { push } = useNavigate();

  const featureCards: FeatureCard[] = [
    {
      title: "字典Demo",
      description:
        "基于shadcn-ui构建的完整组件系统\n50+精美UI组件\n完全可定制化\n无障碍访问支持",
      icon: "mdi:component",
      href: "/demo/dict-tag",
    },
    {
      title: "React Query",
      description:
        "移动优先的响应式布局框架\n移动优先设计\n断点系统\n弹性网格布局",
      icon: "mdi:responsive",
      href: "/demo/query",
    },
    {
      title: "sonner",
      description:
        "基于Framer Motion的流畅动画效果\n页面过渡动画\n组件微交互\n手势支持",
      icon: "mdi:animation",
      href: "/demo/sonner",
    },
  ];

  const handleNavigate = (href: string) => {
    console.log(href);
    push(href);
  };

  return (
    <>
      {/* 主内容区 */}
      <main className="relative z-10 min-h-screen pt-24 pb-16">
        {/* 标题区域 */}
        <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              variants={animationVariants.fade}
              initial="initial"
              animate="animate"
              className="inline-block"
            >
              <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                强大的功能特性
              </h1>
            </motion.div>
            <p className="mt-4 text-xl text-gray-300 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
              探索我们 Next.js 模板的核心功能，从现代化 UI
              组件到性能优化，为您的项目提供完整的全栈解决方案。
            </p>

            {/* 标签筛选器 */}
            <div className="flex justify-center gap-4 mt-12 flex-wrap">
              {[
                { label: "UI组件", color: "bg-cyan-600" },
                { label: "性能", color: "bg-purple-600" },
                { label: "开发体验", color: "bg-blue-600" },
                { label: "集成", color: "bg-pink-600" },
              ].map((tag, i) => (
                <button
                  key={i}
                  className={`px-6 py-3 rounded-full font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-700 dark:border-gray-600 ${
                    tag.color
                  } text-white hover:shadow-cyan-500/20`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* 功能卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureCards.map((card, index) => (
              <motion.div
                key={index}
                variants={animationVariants["slide-up"]}
                initial="initial"
                animate="animate"
                whileHover={{
                  y: -8,
                  boxShadow:
                    "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)",
                  border: "1px solid rgba(59, 130, 246, 0.4)",
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="group relative overflow-hidden bg-white dark:bg-gray-800 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* 卡片顶部装饰条 */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* 图标背景 */}
                <div className="h-32 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-cyan-800/40 dark:from-blue-900/30 dark:via-purple-900/20 dark:to-cyan-800/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:from-transparent dark:via-gray-900/5 dark:to-transparent" />
                  <SvgIcon
                    icon={card.icon}
                    width={52}
                    height={52}
                    color="white"
                    animate="hover-scale"
                    className="drop-shadow-lg"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/0 to-blue-400/0 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700" />
                </div>

                {/* 内容区 */}
                <div className="p-7">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-cyan-500 transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm mb-6 whitespace-pre-line">
                    {card.description}
                  </p>

                  {/* 按钮 */}
                  <button
                    onClick={() => handleNavigate(card.href)}
                    className="w-full py-3 text-center text-cyan-500 font-medium hover:text-cyan-600 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    查看详情
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 group-hover:translate-x-1.5 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* 底部光晕 */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-tr from-cyan-400/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
