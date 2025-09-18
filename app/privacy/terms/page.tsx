/**
 * 服务条款页面 - 现代简约设计
 * 与隐私政策页面保持一致的设计风格
 */

"use client";

import { motion } from "framer-motion";
import { FileText, Scale, Shield, AlertTriangle, UserCheck, Clock, Mail, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

// 自定义缓动曲线 - 与项目保持一致
const SMOOTH_TRANSITION = { duration: 0.5, ease: "easeOut" } as const;

export default function TermsPage() {
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
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-red-500/8 via-orange-500/8 to-yellow-500/8 rounded-full blur-3xl" />
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
              <Link 
                href="/privacy" 
                className="hover:text-foreground transition-colors"
              >
                隐私政策
              </Link>
              <span>/</span>
              <span className="text-foreground">服务条款</span>
            </motion.div>

            {/* 页面标题区域 */}
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...SMOOTH_TRANSITION }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 border border-orange-500/20">
                <Scale className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-muted-foreground">法律条款</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-orange-600 to-red-600 bg-clip-text text-transparent">
                服务条款
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                使用我们的服务即表示您同意以下条款和条件。请仔细阅读本协议的所有内容。
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
              {/* 接受条款 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                    <UserCheck className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">接受条款</h2>
                </div>
                
                <div className="space-y-4 pl-11 text-muted-foreground">
                  <p>
                    通过访问和使用我们的服务，您确认已阅读、理解并同意受本服务条款约束。
                    如果您不同意这些条款，请不要使用我们的服务。
                  </p>
                  <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20">
                    <p className="text-sm">
                      <strong className="text-orange-600">重要提示：</strong>
                      我们可能会不时更新这些条款。继续使用服务即表示您接受修订后的条款。
                    </p>
                  </div>
                </div>
              </section>

              {/* 服务描述 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">服务说明</h2>
                </div>
                
                <div className="space-y-4 pl-11">
                  <p className="text-muted-foreground">
                    我们提供的服务包括但不限于：
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-600 text-xs font-bold flex items-center justify-center mt-0.5">1</span>
                      <span>Web应用程序模板和工具</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-600 text-xs font-bold flex items-center justify-center mt-0.5">2</span>
                      <span>用户账户管理和身份验证</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-600 text-xs font-bold flex items-center justify-center mt-0.5">3</span>
                      <span>数据存储和同步服务</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-600 text-xs font-bold flex items-center justify-center mt-0.5">4</span>
                      <span>技术支持和客户服务</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 用户责任 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">用户责任</h2>
                </div>
                
                <div className="space-y-4 pl-11">
                  <p className="text-muted-foreground">使用我们的服务时，您同意：</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">允许的使用</h3>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        <li>• 遵守所有适用法律</li>
                        <li>• 保护账户安全</li>
                        <li>• 提供准确信息</li>
                        <li>• 尊重他人权利</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">禁止的行为</h3>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        <li>• 恶意攻击系统</li>
                        <li>• 传播有害内容</li>
                        <li>• 侵犯知识产权</li>
                        <li>• 干扰服务运行</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 免责声明 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">免责声明</h2>
                </div>
                
                <div className="space-y-4 pl-11 text-muted-foreground">
                  <p>
                    我们的服务按"现状"提供，不提供任何明示或暗示的保证。我们不保证服务的可用性、
                    准确性或可靠性。
                  </p>
                  
                  <div className="p-6 rounded-xl bg-gradient-to-r from-yellow-500/5 via-orange-500/5 to-red-500/5 border border-yellow-500/20">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">责任限制</h4>
                      <p className="text-sm">
                        在任何情况下，我们都不对因使用或无法使用服务而产生的任何直接、间接、
                        附带或后果性损害承担责任。
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 终止服务 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">服务终止</h2>
                </div>
                
                <div className="space-y-4 pl-11 text-muted-foreground">
                  <p>我们保留在以下情况下终止或暂停您的账户的权利：</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2">违反条款</h4>
                      <p className="text-sm">违反本服务条款的任何规定</p>
                    </div>
                    
                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2">非法活动</h4>
                      <p className="text-sm">从事任何非法或有害活动</p>
                    </div>
                    
                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2">长期不活跃</h4>
                      <p className="text-sm">账户长期未使用或处于非活跃状态</p>
                    </div>
                    
                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2">服务调整</h4>
                      <p className="text-sm">因业务调整需要停止提供服务</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 联系信息 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">联系我们</h2>
                </div>
                
                <div className="pl-11 space-y-4">
                  <p className="text-muted-foreground">
                    如果您对本服务条款有任何疑问，请联系我们：
                  </p>
                  
                  <div className="p-6 rounded-xl bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-pink-500/5 border border-border/30">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-violet-500" />
                        <span className="text-foreground font-medium">邮箱：legal@awt0204.shop</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        我们将在收到您的咨询后3个工作日内回复。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>

            {/* 导航链接 */}
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ...SMOOTH_TRANSITION }}
            >
              <Link 
                href="/privacy"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>返回隐私政策</span>
              </Link>
              
              <Link 
                href="/privacy/cookies"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Cookie政策</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}