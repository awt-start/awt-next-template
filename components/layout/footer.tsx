"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SvgIcon from "@/components/icon/icon"; // 👈 你的自定义 SvgIcon
import type { AnimationType } from "@/components/icon/icon"; // 导入动画类型（可选）

interface FooterProps {
  className?: string;
}

const footerLinks = {
  product: [
    { name: "功能特性", href: "/product/features", icon: "lucide:sparkles" },
    { name: "技术栈", href: "/product/tech", icon: "lucide:code" },
    { name: "更新日志", href: "/product/changelog", icon: "lucide:file-text" },
    { name: "路线图", href: "/product/roadmap", icon: "lucide:map-pin" },
  ],
  resources: [
    { name: "资源", href: "/resources/index", icon: "lucide:book-open" },
    {
      name: "教程",
      href: "/resources/tutorials",
      icon: "lucide:graduation-cap",
    },
    { name: "文档", href: "/resources/docs", icon: "lucide:file-text" },
  ],
  company: [
    { name: "关于我们", href: "/company/about", icon: "lucide:users" },
    { name: "博客", href: "/company/blog", icon: "lucide:pen-line" },
    { name: "联系我们", href: "/company/contact", icon: "lucide:mail" },
  ],
  legal: [
    { name: "隐私政策", href: "/privacy/info", icon: "lucide:lock" },
    { name: "服务条款", href: "/privacy/terms", icon: "lucide:file-text" },
    { name: "Cookie 政策", href: "/privacy/cookies", icon: "lucide:cookie" },
    { name: "许可证", href: "/privacy/license", icon: "lucide:award" },
  ],
};

const socialLinks = [
  {
    name: "GitHub",
    icon: "lucide:github",
    href: "#",
    color: "hover:text-gray-900 dark:hover:text-gray-100",
  },
  {
    name: "Twitter",
    icon: "lucide:twitter",
    href: "#",
    color: "hover:text-blue-500",
  },
  {
    name: "Discord",
    icon: "lucide:message-circle",
    href: "#",
    color: "hover:text-indigo-500",
  },
  {
    name: "YouTube",
    icon: "lucide:youtube",
    href: "#",
    color: "hover:text-red-500",
  },
];

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "relative bg-background border-t border-border/50",
        className,
      )}
    >
      {/* 装饰性背景 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)
            `,
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Logo 和描述区域 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Logo - 带旋转动画 */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 0 30px rgba(147, 51, 234, 0.4)",
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                    ],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    boxShadow: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center"
                >
                  {/* 使用你的 SvgIcon，启用 spin 动画 */}
                  <SvgIcon
                    icon="lucide:layers"
                    width={20}
                    height={20}
                    className="text-white"
                    animate="spin" // ✅ 启用旋转动画
                  />
                </motion.div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Next Template
                </h3>
                <p className="text-xs text-muted-foreground">
                  Modern & Amazing
                </p>
              </div>
            </div>

            {/* 描述 */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              基于 Next.js 15 构建的现代化模板框架，集成最新技术栈，
              为开发者提供极致的开发体验和令人惊艳的用户界面。
            </p>

            {/* 邮件订阅 */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">
                获取最新资讯
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="输入您的邮箱"
                  className="flex-1 px-3 py-2 text-sm bg-background border border-border/50 rounded-lg focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                />
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                >
                  {/* 发送图标，带悬停缩放 */}
                  <SvgIcon
                    icon="lucide:send"
                    width={14}
                    height={14}
                    animate="hover-scale" // ✅ 悬停缩放
                  />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* 链接区域 */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(
              ([category, links], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h4 className="text-sm font-semibold text-foreground capitalize">
                    {category === "product" && "产品"}
                    {category === "resources" && "资源"}
                    {category === "company" && "公司"}
                    {category === "legal" && "法律"}
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link, linkIndex) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: categoryIndex * 0.1 + linkIndex * 0.05,
                        }}
                        viewport={{ once: true }}
                      >
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center group"
                        >
                          <SvgIcon
                            icon={link.icon}
                            width={12}
                            height={12}
                            animate="hover-scale" // ✅ 悬停缩放
                          />
                          <span className="ml-2">{link.name}</span>
                          <motion.div
                            className="ml-1 opacity-0 group-hover:opacity-100"
                            initial={{ x: -5 }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <SvgIcon
                              icon="lucide:arrow-up-right"
                              width={12}
                              height={12}
                              className="text-muted-foreground group-hover:text-foreground"
                              animate="hover-scale" // ✅ 悬停缩放
                            />
                          </motion.div>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ),
            )}
          </div>
        </div>

        {/* 分割线 */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"
        />

        {/* 底部区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* 版权信息 */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Next Template. 保留所有权利。</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <SvgIcon
                  icon="lucide:heart"
                  width={14}
                  height={14}
                  className="text-red-500"
                  animate="hover-scale" // ✅ 悬停缩放
                />
                Made with love
              </span>
              <span className="flex items-center gap-1">
                <SvgIcon
                  icon="lucide:coffee"
                  width={14}
                  height={14}
                  className="text-orange-500"
                  animate="hover-scale" // ✅ 悬停缩放
                />
                Powered by caffeine
              </span>
            </div>
          </div>

          {/* 社交媒体链接 */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "p-2 rounded-lg bg-background/50 border border-border/50 text-muted-foreground transition-all duration-300 hover:border-border hover:bg-accent/50",
                  social.color,
                )}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.name}
              >
                <SvgIcon
                  icon={social.icon}
                  width={16}
                  height={16}
                  animate="hover-scale" // ✅ 悬停缩放
                />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* 额外装饰 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20">
            <SvgIcon
              icon="lucide:sparkles"
              width={14}
              height={14}
              className="text-blue-500"
              animate="hover-scale" // ✅ 悬停缩放
            />
            <span className="text-xs text-muted-foreground">
              持续更新中 · 感谢您的支持
            </span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <SvgIcon
                icon="lucide:heart"
                width={14}
                height={14}
                className="text-red-500"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
