/**
 * 关于我们页面 - 现代简约设计
 * 展示公司介绍、团队成员、发展历程等信息
 */


/* import type { Metadata } from "next";

export const metadata: Metadata = {
  title: '关于我们',
  description: '了解我们的团队、使命、愿景和核心价值观。一支充满激情的技术团队。',
  keywords: ['关于我们', '团队介绍', '公司文化', '核心价值观'],
}; */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import SvgIcon from "@/components/icon/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 自定义缓动曲线 - 与项目保持一致
const SMOOTH_TRANSITION = { duration: 0.5, ease: "easeOut" } as const;

// 团队成员数据
const teamMembers = [
  {
    name: "芒星",
    role: "创始人 & CEO",
    avatar: "lucide:user-circle",
    description: "资深全栈开发者，专注于现代化Web技术栈",
    skills: ["Next.js", "React", "TypeScript", "Node.js"],
    email: "founder@awt0204.shop"
  },
  {
    name: "技术负责人",
    role: "CTO",
    avatar: "lucide:user-cog",
    description: "前端架构专家，致力于构建高性能用户体验",
    skills: ["前端架构", "性能优化", "DevOps", "云原生"],
    email: "cto@awt0204.shop"
  },
  {
    name: "设计负责人",
    role: "设计总监",
    avatar: "lucide:palette",
    description: "用户体验设计师，追求极致的视觉表现",
    skills: ["UI/UX", "视觉设计", "交互设计", "品牌设计"],
    email: "design@awt0204.shop"
  }
];

// 发展历程数据
const milestones = [
  {
    year: "2025",
    title: "项目启动",
    description: "Next.js模板项目正式启动，确立技术栈和设计规范",
    icon: "lucide:rocket"
  },
  {
    year: "2025 Q2",
    title: "功能完善",
    description: "完成核心功能开发，包括国际化、主题切换等",
    icon: "lucide:settings"
  },
  {
    year: "2025 Q3",
    title: "生态建设",
    description: "构建完整的组件库和开发工具链",
    icon: "lucide:puzzle"
  },
  {
    year: "未来",
    title: "持续创新",
    description: "探索新技术，为开发者提供更好的开发体验",
    icon: "lucide:trending-up"
  }
];

// 公司价值观
const values = [
  {
    title: "技术驱动",
    description: "始终追求最新技术，为用户提供最佳体验",
    icon: "lucide:code-2",
    color: "text-blue-500",
    gradient: "from-blue-500/10 to-cyan-500/10"
  },
  {
    title: "用户至上",
    description: "以用户需求为中心，持续优化产品体验",
    icon: "lucide:users",
    color: "text-emerald-500",
    gradient: "from-emerald-500/10 to-teal-500/10"
  },
  {
    title: "开放协作",
    description: "拥抱开源精神，与社区共同成长",
    icon: "lucide:git-branch",
    color: "text-purple-500",
    gradient: "from-purple-500/10 to-pink-500/10"
  },
  {
    title: "持续创新",
    description: "不断探索新技术，引领行业发展",
    icon: "lucide:lightbulb",
    color: "text-orange-500",
    gradient: "from-orange-500/10 to-red-500/10"
  }
];

export default function AboutPage() {
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

      {/* 主要内容区域 */}
      <main className="relative z-10 min-h-screen pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SMOOTH_TRANSITION}
            className="space-y-20"
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
              <span className="text-foreground">关于我们</span>
            </motion.div>

            {/* 页面标题区域 */}
            <motion.div
              className="text-center space-y-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...SMOOTH_TRANSITION }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20">
                <SvgIcon icon="lucide:building-2" width={20} height={20} className="text-blue-500" />
                <span className="text-sm font-medium text-muted-foreground">公司介绍</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-blue-600 to-purple-600 bg-clip-text text-transparent">
                关于我们
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                我们是一支充满激情的技术团队，专注于构建现代化的Web应用解决方案。
                致力于为开发者提供高质量的模板和工具，让创意更快地变为现实。
              </p>
            </motion.div>

            {/* 公司愿景使命 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...SMOOTH_TRANSITION }}
              className="grid md:grid-cols-2 gap-8"
            >
              <div className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <SvgIcon icon="lucide:eye" width={16} height={16} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">我们的愿景</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  成为全球领先的Web开发模板提供商，通过创新的技术和卓越的设计，
                  让每一位开发者都能轻松构建出色的Web应用。
                </p>
              </div>

              <div className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                    <SvgIcon icon="lucide:target" width={16} height={16} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">我们的使命</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  降低Web开发的门槛，提供高质量的开源模板和工具，
                  帮助开发者专注于业务逻辑，而非重复的基础架构工作。
                </p>
              </div>
            </motion.section>

            {/* 公司价值观 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ...SMOOTH_TRANSITION }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">核心价值观</h2>
                <p className="text-muted-foreground">这些价值观指导着我们的每一个决策和行动</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, ...SMOOTH_TRANSITION }}
                    className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-lg bg-gradient-to-r flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300",
                      value.gradient
                    )}>
                      <SvgIcon icon={value.icon} width={20} height={20} className={value.color} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 团队介绍 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, ...SMOOTH_TRANSITION }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">核心团队</h2>
                <p className="text-muted-foreground">认识我们充满激情的团队成员</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, ...SMOOTH_TRANSITION }}
                    className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group text-center"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <SvgIcon icon={member.avatar} width={32} height={32} className="text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-blue-500 font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-4">{member.description}</p>
                    
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {member.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-xs bg-blue-500/10 text-blue-600 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(`mailto:${member.email}`, '_blank')}
                    >
                      <SvgIcon icon="lucide:mail" width={16} height={16} className="mr-2" />
                      联系我
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 发展历程 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, ...SMOOTH_TRANSITION }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">发展历程</h2>
                <p className="text-muted-foreground">我们的成长轨迹</p>
              </div>

              <div className="relative">
                {/* 时间线 */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 md:-translate-x-0.5" />

                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1, ...SMOOTH_TRANSITION }}
                      className={cn(
                        "relative flex items-center",
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      )}
                    >
                      {/* 时间节点 */}
                      <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-blue-500 rounded-full border-4 border-background md:-translate-x-1.5 z-10" />

                      {/* 内容卡片 */}
                      <div className={cn(
                        "flex-1 ml-12 md:ml-0",
                        index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                      )}>
                        <div className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl p-6 shadow-lg">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                              <SvgIcon icon={milestone.icon} width={16} height={16} className="text-white" />
                            </div>
                            <div>
                              <span className="text-sm text-blue-500 font-medium">{milestone.year}</span>
                              <h3 className="text-lg font-semibold text-foreground">{milestone.title}</h3>
                            </div>
                          </div>
                          <p className="text-muted-foreground">{milestone.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* 联系我们 CTA */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, ...SMOOTH_TRANSITION }}
              className="text-center"
            >
              <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-border/50 rounded-2xl p-12 shadow-lg">
                <h2 className="text-3xl font-bold text-foreground mb-4">想要了解更多？</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  如果您对我们的工作感兴趣，或者想要合作，欢迎随时联系我们。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/company/contact">
                      <SvgIcon icon="lucide:mail" width={20} height={20} className="mr-2" />
                      联系我们
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/company/blog">
                      <SvgIcon icon="lucide:book-open" width={20} height={20} className="mr-2" />
                      查看博客
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </main>
    </div>
  );
}