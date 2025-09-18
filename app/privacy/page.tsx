/**
 * 隐私政策页面 - 现代简约设计
 * 与认证页面保持一致的设计风格，包含导航栏和优雅排版
 */

"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Lock, Users, FileText, Clock, Mail, Home, ArrowLeft, Cookie, UserCheck, Code } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

// 自定义缓动曲线 - 与项目保持一致
const SMOOTH_TRANSITION = { duration: 0.5, ease: "easeOut" } as const;

export default function PrivacyPage() {
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <Home className="w-4 h-4" />
                <span>首页</span>
              </Link>
              <span>/</span>
              <span className="text-foreground">隐私政策</span>
            </motion.div>

            {/* 页面标题区域 */}
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...SMOOTH_TRANSITION }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20">
                <Shield className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-muted-foreground">隐私保护</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-blue-600 to-purple-600 bg-clip-text text-transparent">
                隐私政策
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                我们重视并致力于保护您的个人隐私。本政策详细说明了我们如何收集、使用、存储和保护您的信息。
              </p>
              
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>最后更新：2025年1月18日</span>
                </div>
              </div>
            </motion.div>

            {/* 主要内容区域 */}
            <motion.div
              className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 p-8 md:p-12 space-y-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...SMOOTH_TRANSITION }}
            >
              {/* 信息收集 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">我们收集的信息</h2>
                </div>
                
                <div className="space-y-4 pl-11">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">个人信息</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                        <span>账户信息：用户名、邮箱地址、密码（加密存储）</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                        <span>联系信息：手机号码（可选）</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                        <span>个人资料：头像、个人简介等自主提供的信息</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">使用信息</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                        <span>设备信息：IP地址、浏览器类型、操作系统</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                        <span>使用统计：访问页面、使用功能、停留时间</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                        <span>Cookie和本地存储：用于改善用户体验</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 信息使用 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">信息使用方式</h2>
                </div>
                
                <div className="space-y-4 pl-11 text-muted-foreground">
                  <p>我们使用收集的信息来：</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 text-xs font-bold flex items-center justify-center mt-0.5">1</span>
                      <span>提供、维护和改善我们的服务</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 text-xs font-bold flex items-center justify-center mt-0.5">2</span>
                      <span>处理用户注册、登录和账户管理</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 text-xs font-bold flex items-center justify-center mt-0.5">3</span>
                      <span>发送重要的服务通知和安全提醒</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 text-xs font-bold flex items-center justify-center mt-0.5">4</span>
                      <span>分析使用模式，优化用户体验</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 text-xs font-bold flex items-center justify-center mt-0.5">5</span>
                      <span>防止欺诈和滥用，确保平台安全</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 信息保护 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">信息保护措施</h2>
                </div>
                
                <div className="space-y-4 pl-11">
                  <p className="text-muted-foreground">我们采用多层安全措施保护您的信息：</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">技术保护</h3>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        <li>• HTTPS加密传输</li>
                        <li>• 密码哈希存储</li>
                        <li>• 定期安全审计</li>
                        <li>• 访问权限控制</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">管理保护</h3>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        <li>• 员工隐私培训</li>
                        <li>• 最小权限原则</li>
                        <li>• 数据访问日志</li>
                        <li>• 定期备份策略</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 您的权利 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">您的权利</h2>
                </div>
                
                <div className="space-y-4 pl-11 text-muted-foreground">
                  <p>根据适用的隐私法律，您享有以下权利：</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2">访问权</h4>
                      <p className="text-sm">您有权了解我们持有的关于您的个人信息</p>
                    </div>
                    
                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2">更正权</h4>
                      <p className="text-sm">您可以要求更正不准确或不完整的信息</p>
                    </div>
                    
                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2">删除权</h4>
                      <p className="text-sm">在某些条件下，您可以要求删除个人信息</p>
                    </div>
                    
                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2">数据可携带权</h4>
                      <p className="text-sm">您可以要求以可读格式导出您的数据</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 联系我们 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">联系我们</h2>
                </div>
                
                <div className="pl-11 space-y-4">
                  <p className="text-muted-foreground">
                    如果您对本隐私政策有任何疑问，或希望行使您的权利，请通过以下方式联系我们：
                  </p>
                  
                  <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 border border-border/30">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-500" />
                        <span className="text-foreground font-medium">邮箱：privacy@awt0204.shop</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        我们将在收到您的请求后7个工作日内回复。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>

            {/* 返回链接 */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ...SMOOTH_TRANSITION }}
            >
              <Link 
                href="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>返回首页</span>
              </Link>
            </motion.div>

            {/* 相关页面导航 */}
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, ...SMOOTH_TRANSITION }}
            >
              <Link 
                href="/privacy/terms"
                className="group p-4 rounded-xl border border-border/50 bg-background/30 hover:bg-background/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                    <FileText className="w-3 h-3 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-foreground">服务条款</h3>
                </div>
                <p className="text-sm text-muted-foreground">了解使用我们服务的条款和条件</p>
              </Link>

              <Link 
                href="/privacy/cookies"
                className="group p-4 rounded-xl border border-border/50 bg-background/30 hover:bg-background/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                    <Cookie className="w-3 h-3 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-foreground">Cookie政策</h3>
                </div>
                <p className="text-sm text-muted-foreground">了解我们如何使用Cookie和追踪技术</p>
              </Link>

              <Link 
                href="/privacy/info"
                className="group p-4 rounded-xl border border-border/50 bg-background/30 hover:bg-background/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                    <UserCheck className="w-3 h-3 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-foreground">个人信息处理</h3>
                </div>
                <p className="text-sm text-muted-foreground">详细的个人信息收集和处理说明</p>
              </Link>

              <Link 
                href="/privacy/license"
                className="group p-4 rounded-xl border border-border/50 bg-background/30 hover:bg-background/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                    <Code className="w-3 h-3 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-foreground">开源许可证</h3>
                </div>
                <p className="text-sm text-muted-foreground">查看项目使用的开源软件许可证</p>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}