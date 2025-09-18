/**
 * 开源许可证页面 - 现代简约设计
 * 与项目整体设计风格保持一致
 */

"use client";

import { motion } from "framer-motion";
import { Code, Github, FileText, Star, Heart, Clock, Mail, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

// 自定义缓动曲线 - 与项目保持一致
const SMOOTH_TRANSITION = { duration: 0.5, ease: "easeOut" } as const;

export default function LicensePage() {
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
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-emerald-500/8 via-green-500/8 to-lime-500/8 rounded-full blur-3xl" />
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
              <span className="text-foreground">开源许可证</span>
            </motion.div>

            {/* 页面标题区域 */}
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...SMOOTH_TRANSITION }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/20">
                <Code className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-muted-foreground">开源软件</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-green-600 to-emerald-600 bg-clip-text text-transparent">
                开源许可证
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                我们感谢开源社区的贡献。本项目使用了多个开源库和框架，以下是详细的许可证信息。
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
              {/* 项目许可证 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">项目许可证</h2>
                </div>
                
                <div className="space-y-4 pl-11">
                  <div className="p-6 rounded-xl bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 border border-green-500/20">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Github className="w-5 h-5 text-green-500" />
                        <h3 className="text-lg font-semibold text-foreground">MIT License</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        本项目采用MIT开源许可证，这是一个宽松的许可证，允许您自由使用、修改和分发代码。
                      </p>
                      <div className="bg-background/50 rounded-lg p-4 font-mono text-xs text-muted-foreground">
                        <p>Copyright (c) 2025 Next Template Project</p>
                        <br />
                        <p>Permission is hereby granted, free of charge, to any person obtaining a copy</p>
                        <p>of this software and associated documentation files (the "Software"), to deal</p>
                        <p>in the Software without restriction, including without limitation the rights</p>
                        <p>to use, copy, modify, merge, publish, distribute, sublicense, and/or sell</p>
                        <p>copies of the Software, and to permit persons to whom the Software is</p>
                        <p>furnished to do so, subject to the following conditions:</p>
                        <br />
                        <p>The above copyright notice and this permission notice shall be included in all</p>
                        <p>copies or substantial portions of the Software.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 第三方库 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Code className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">使用的开源库</h2>
                </div>
                
                <div className="space-y-4 pl-11">
                  <p className="text-muted-foreground">
                    以下是本项目使用的主要开源库及其许可证信息：
                  </p>
                  
                  <div className="grid md:grid-cols-1 gap-4">
                    {/* React */}
                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">React</h4>
                            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-600 rounded">MIT</span>
                          </div>
                          <p className="text-sm text-muted-foreground">用户界面构建库</p>
                          <p className="text-xs text-muted-foreground">Copyright (c) Meta Platforms, Inc.</p>
                        </div>
                        <Star className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>

                    {/* Next.js */}
                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">Next.js</h4>
                            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-600 rounded">MIT</span>
                          </div>
                          <p className="text-sm text-muted-foreground">React全栈框架</p>
                          <p className="text-xs text-muted-foreground">Copyright (c) 2024 Vercel, Inc.</p>
                        </div>
                        <Star className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>

                    {/* Tailwind CSS */}
                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">Tailwind CSS</h4>
                            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-600 rounded">MIT</span>
                          </div>
                          <p className="text-sm text-muted-foreground">实用优先的CSS框架</p>
                          <p className="text-xs text-muted-foreground">Copyright (c) Tailwind Labs, Inc.</p>
                        </div>
                        <Star className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>

                    {/* Framer Motion */}
                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">Framer Motion</h4>
                            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-600 rounded">MIT</span>
                          </div>
                          <p className="text-sm text-muted-foreground">React动画库</p>
                          <p className="text-xs text-muted-foreground">Copyright (c) 2018 Framer B.V.</p>
                        </div>
                        <Star className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>

                    {/* Lucide React */}
                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">Lucide React</h4>
                            <span className="px-2 py-1 text-xs bg-green-500/20 text-green-600 rounded">ISC</span>
                          </div>
                          <p className="text-sm text-muted-foreground">图标库</p>
                          <p className="text-xs text-muted-foreground">Copyright (c) 2024 Lucide Contributors</p>
                        </div>
                        <Star className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>

                    {/* TypeScript */}
                    <div className="p-4 rounded-xl border border-border/50 bg-background/30">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">TypeScript</h4>
                            <span className="px-2 py-1 text-xs bg-orange-500/20 text-orange-600 rounded">Apache-2.0</span>
                          </div>
                          <p className="text-sm text-muted-foreground">JavaScript的超集</p>
                          <p className="text-xs text-muted-foreground">Copyright (c) Microsoft Corporation</p>
                        </div>
                        <Star className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 许可证类型说明 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">许可证类型说明</h2>
                </div>
                
                <div className="space-y-4 pl-11">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl border border-border/50 bg-background/30">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-600 rounded font-mono">MIT</span>
                          <h3 className="text-lg font-semibold text-foreground">MIT许可证</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          最宽松的开源许可证之一，允许任何人使用、修改、分发代码，包括商业用途。
                          只需保留原始版权声明即可。
                        </p>
                      </div>
                    </div>

                    <div className="p-6 rounded-xl border border-border/50 bg-background/30">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 text-xs bg-green-500/20 text-green-600 rounded font-mono">ISC</span>
                          <h3 className="text-lg font-semibold text-foreground">ISC许可证</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          类似于MIT许可证的宽松许可证，语言更简洁。允许自由使用、修改和分发，
                          只需保留版权声明。
                        </p>
                      </div>
                    </div>

                    <div className="p-6 rounded-xl border border-border/50 bg-background/30">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 text-xs bg-orange-500/20 text-orange-600 rounded font-mono">Apache-2.0</span>
                          <h3 className="text-lg font-semibold text-foreground">Apache 2.0</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          提供专利保护的宽松许可证。允许商业使用，但要求保留版权声明、
                          许可证文本和重要变更的说明。
                        </p>
                      </div>
                    </div>

                    <div className="p-6 rounded-xl border border-border/50 bg-background/30">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-600 rounded font-mono">GPL</span>
                          <h3 className="text-lg font-semibold text-foreground">GPL许可证</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Copyleft许可证，要求派生作品也必须使用相同许可证开源。
                          确保软件的自由性得到延续。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 感谢开源 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">感谢开源社区</h2>
                </div>
                
                <div className="pl-11 space-y-4">
                  <p className="text-muted-foreground">
                    我们深深感谢所有开源项目的贡献者和维护者。没有你们的无私奉献，就没有今天丰富的技术生态。
                  </p>
                  
                  <div className="p-6 rounded-xl bg-gradient-to-r from-pink-500/5 via-rose-500/5 to-red-500/5 border border-pink-500/20">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-pink-500" />
                        <h4 className="font-semibold text-foreground">支持开源</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        如果您觉得这些开源项目对您有帮助，请考虑：
                      </p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• 在GitHub上给项目点星</li>
                        <li>• 参与项目贡献代码或文档</li>
                        <li>• 向项目维护者提供资金支持</li>
                        <li>• 在社区中推广和分享</li>
                      </ul>
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
                  <h2 className="text-2xl font-bold text-foreground">许可证问题</h2>
                </div>
                
                <div className="pl-11 space-y-4">
                  <p className="text-muted-foreground">
                    如果您对许可证有任何疑问或发现遗漏，请联系我们：
                  </p>
                  
                  <div className="p-6 rounded-xl bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-pink-500/5 border border-border/30">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-violet-500" />
                        <span className="text-foreground font-medium">开源团队：opensource@awt0204.shop</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        我们致力于遵守所有开源许可证条款，并及时更新许可证信息。
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
                href="/privacy/info"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>个人信息处理</span>
              </Link>
              
              <Link 
                href="/privacy"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>返回隐私政策</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}