/**
 * 个人信息处理说明页面 - 现代简约设计
 * 与项目整体设计风格保持一致
 */

"use client";

import { motion } from "framer-motion";
import { UserCheck, Database, Shield, Key, Settings, Clock, Mail, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

// 自定义缓动曲线 - 与项目保持一致
const SMOOTH_TRANSITION = { duration: 0.5, ease: "easeOut" } as const;

export default function InfoPage() {
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
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-500/8 via-indigo-500/8 to-blue-500/8 rounded-full blur-3xl" />
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
              <span className="text-foreground">个人信息处理</span>
            </motion.div>

            {/* 页面标题区域 */}
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...SMOOTH_TRANSITION }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20">
                <UserCheck className="w-5 h-5 text-indigo-500" />
                <span className="text-sm font-medium text-muted-foreground">数据处理</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                个人信息处理说明
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                详细说明我们如何收集、处理、存储和保护您的个人信息，以及您对这些信息的控制权。
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
              {/* 数据收集 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                    <Database className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">数据收集方式</h2>
                </div>
                
                <div className="space-y-6 pl-11">
                  <p className="text-muted-foreground">
                    我们通过以下方式收集您的个人信息：
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl border border-border/50 bg-background/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                          <UserCheck className="w-3 h-3 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">直接收集</h3>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• 账户注册时提供的信息</li>
                        <li>• 联系表单填写的内容</li>
                        <li>• 客服对话记录</li>
                        <li>• 用户反馈和评价</li>
                        <li>• 订阅和设置偏好</li>
                      </ul>
                    </div>

                    <div className="p-6 rounded-xl border border-border/50 bg-background/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <Settings className="w-3 h-3 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">自动收集</h3>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• 设备和浏览器信息</li>
                        <li>• IP地址和位置数据</li>
                        <li>• 网站使用行为</li>
                        <li>• Cookie和追踪数据</li>
                        <li>• 错误和性能日志</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 处理目的 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Settings className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">处理目的和法律依据</h2>
                </div>
                
                <div className="space-y-4 pl-11">
                  <p className="text-muted-foreground">
                    我们基于以下法律依据处理您的个人信息：
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-600 text-xs font-bold flex items-center justify-center mt-0.5">1</span>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">合同履行</h4>
                          <p className="text-sm text-muted-foreground">
                            为向您提供服务、处理付款、管理账户等合同义务而处理数据。
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-600 text-xs font-bold flex items-center justify-center mt-0.5">2</span>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">合法利益</h4>
                          <p className="text-sm text-muted-foreground">
                            基于改善服务质量、防止欺诈、确保安全等合法商业利益。
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-600 text-xs font-bold flex items-center justify-center mt-0.5">3</span>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">明确同意</h4>
                          <p className="text-sm text-muted-foreground">
                            在您明确同意的情况下，处理敏感信息或用于营销目的。
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-600 text-xs font-bold flex items-center justify-center mt-0.5">4</span>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">法律义务</h4>
                          <p className="text-sm text-muted-foreground">
                            为遵守适用法律法规、配合执法部门调查等法律要求。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 数据保护措施 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">数据保护措施</h2>
                </div>
                
                <div className="space-y-6 pl-11">
                  <p className="text-muted-foreground">
                    我们采用多层次的安全措施保护您的个人信息：
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <div className="flex items-center gap-2 mb-3">
                        <Key className="w-4 h-4 text-emerald-500" />
                        <h4 className="font-semibold text-foreground">加密保护</h4>
                      </div>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• SSL/TLS传输加密</li>
                        <li>• 数据库加密存储</li>
                        <li>• 密码哈希处理</li>
                        <li>• 端到端加密通信</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-4 h-4 text-emerald-500" />
                        <h4 className="font-semibold text-foreground">访问控制</h4>
                      </div>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• 身份验证机制</li>
                        <li>• 角色权限管理</li>
                        <li>• 最小权限原则</li>
                        <li>• 定期权限审查</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <div className="flex items-center gap-2 mb-3">
                        <Database className="w-4 h-4 text-emerald-500" />
                        <h4 className="font-semibold text-foreground">系统安全</h4>
                      </div>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• 防火墙保护</li>
                        <li>• 入侵检测系统</li>
                        <li>• 定期安全扫描</li>
                        <li>• 备份和恢复</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 数据保留 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">数据保留期限</h2>
                </div>
                
                <div className="space-y-4 pl-11">
                  <p className="text-muted-foreground">
                    我们仅在必要期间保留您的个人信息：
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-background/30">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">账户信息</h4>
                        <p className="text-sm text-muted-foreground">
                          在账户有效期间保留，删除账户后30天内完全清除
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-background/30">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">使用日志</h4>
                        <p className="text-sm text-muted-foreground">
                          保留12个月用于分析和改进服务质量
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-background/30">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">安全日志</h4>
                        <p className="text-sm text-muted-foreground">
                          保留24个月用于安全监控和事件调查
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-background/30">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">法律要求</h4>
                        <p className="text-sm text-muted-foreground">
                          根据法律法规要求的最短保留期限
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 数据主体权利 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <UserCheck className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">您的权利</h2>
                </div>
                
                <div className="space-y-4 pl-11">
                  <p className="text-muted-foreground">
                    作为数据主体，您享有以下权利：
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        知情权
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        了解我们收集和处理您个人信息的详细情况
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        访问权
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        请求获取我们持有的关于您的个人信息副本
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        更正权
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        要求更正不准确或不完整的个人信息
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        删除权
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        在特定条件下要求删除您的个人信息
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        限制处理权
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        要求限制对您个人信息的处理
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        数据可携带权
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        以结构化格式获取您的数据并转移给其他服务
                      </p>
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
                  <h2 className="text-2xl font-bold text-foreground">行使权利</h2>
                </div>
                
                <div className="pl-11 space-y-4">
                  <p className="text-muted-foreground">
                    如需行使上述权利或对数据处理有疑问，请联系我们：
                  </p>
                  
                  <div className="p-6 rounded-xl bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-pink-500/5 border border-border/30">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-violet-500" />
                        <span className="text-foreground font-medium">数据保护专员：dpo@awt0204.shop</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        我们将在收到您的请求后30天内处理并回复您的请求。
                      </p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>• 身份验证：处理请求前我们需要验证您的身份</p>
                        <p>• 复杂请求：某些请求可能需要额外时间处理</p>
                        <p>• 法律限制：某些情况下我们可能无法完全满足您的请求</p>
                      </div>
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
                href="/privacy/cookies"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Cookie政策</span>
              </Link>
              
              <Link 
                href="/privacy/license"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>开源许可证</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}