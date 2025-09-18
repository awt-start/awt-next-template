/**
 * 联系我们页面 - 现代简约设计
 * 提供多种联系方式和联系表单
 */

/* import type { Metadata } from "next";

export const metadata: Metadata = {
  title: '联系我们',
  description: '多种联系方式任您选择，技术支持、商务合作、在线咨询，我们随时为您服务。',
  keywords: ['联系我们', '技术支持', '商务合作', '在线咨询'],
}; */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import SvgIcon from "@/components/icon/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 自定义缓动曲线 - 与项目保持一致
const SMOOTH_TRANSITION = { duration: 0.5, ease: "easeOut" } as const;

// 联系方式数据
const contactMethods = [
  {
    title: "邮箱联系",
    description: "我们会在24小时内回复您的邮件",
    icon: "lucide:mail",
    color: "text-blue-500",
    gradient: "from-blue-500/10 to-cyan-500/10",
    content: "contact@awt0204.shop",
    action: () => window.open("mailto:contact@awt0204.shop", "_blank"),
  },
  {
    title: "技术支持",
    description: "技术相关问题咨询",
    icon: "lucide:headphones",
    color: "text-emerald-500",
    gradient: "from-emerald-500/10 to-teal-500/10",
    content: "support@awt0204.shop",
    action: () => window.open("mailto:support@awt0204.shop", "_blank"),
  },
  {
    title: "商务合作",
    description: "项目合作和商务洽谈",
    icon: "lucide:handshake",
    color: "text-purple-500",
    gradient: "from-purple-500/10 to-pink-500/10",
    content: "business@awt0204.shop",
    action: () => window.open("mailto:business@awt0204.shop", "_blank"),
  },
  {
    title: "GitHub",
    description: "查看我们的开源项目",
    icon: "lucide:github",
    color: "text-gray-500",
    gradient: "from-gray-500/10 to-slate-500/10",
    content: "github.com/company",
    action: () => window.open("https://github.com", "_blank"),
  },
];

// 常见问题数据
const faqs = [
  {
    question: "这个模板是免费的吗？",
    answer:
      "是的，我们的Next.js模板完全开源免费，采用MIT许可证。您可以自由使用、修改和分发。",
  },
  {
    question: "如何获得技术支持？",
    answer:
      "您可以通过邮件联系我们的技术团队，我们会在24小时内回复。对于开源项目，也可以在GitHub上提交issue。",
  },
  {
    question: "是否提供定制开发服务？",
    answer:
      "是的，我们提供基于模板的定制开发服务。请通过商务邮箱联系我们，详细说明您的需求。",
  },
  {
    question: "支持哪些技术栈？",
    answer:
      "我们专注于现代前端技术栈，包括Next.js、React、TypeScript、Tailwind CSS等。具体技术支持请咨询我们的技术团队。",
  },
];

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 模拟表单提交
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 实际项目中，这里应该调用API提交表单
      console.log("表单数据:", formData);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      // 3秒后重置状态
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

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
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-cyan-500/8 via-emerald-500/8 to-teal-500/8 rounded-full blur-3xl" />
      </div>

      {/* 主要内容区域 */}
      <main className="relative z-10 min-h-screen pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SMOOTH_TRANSITION}
            className="space-y-16"
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
              <Link
                href="/company/"
                className="hover:text-foreground transition-colors"
              >
                公司介绍
              </Link>
              <span>/</span>
              <span className="text-foreground">联系我们</span>
            </motion.div>

            {/* 页面标题区域 */}
            <motion.div
              className="text-center space-y-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...SMOOTH_TRANSITION }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20">
                <SvgIcon
                  icon="lucide:mail"
                  width={20}
                  height={20}
                  className="text-emerald-500"
                />
                <span className="text-sm font-medium text-muted-foreground">
                  联系我们
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                保持联系
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                有任何问题或想法？我们很乐意听到您的声音。
                选择最适合您的联系方式，我们会尽快回复。
              </p>
            </motion.div>

            {/* 联系方式卡片 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...SMOOTH_TRANSITION }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4 + index * 0.1,
                    ...SMOOTH_TRANSITION,
                  }}
                  className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={method.action}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-lg bg-gradient-to-r flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300",
                      method.gradient,
                    )}
                  >
                    <SvgIcon
                      icon={method.icon}
                      width={20}
                      height={20}
                      className={method.color}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {method.description}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {method.content}
                  </p>
                </motion.div>
              ))}
            </motion.section>

            {/* 主要内容区域 - 表单和FAQ */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* 联系表单 */}
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, ...SMOOTH_TRANSITION }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    发送消息
                  </h2>
                  <p className="text-muted-foreground">
                    填写下面的表单，我们会尽快回复您。
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl p-6 shadow-lg space-y-4">
                    {/* 姓名输入 */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        姓名 *
                      </label>
                      <div className="relative">
                        <SvgIcon
                          icon="lucide:user"
                          width={16}
                          height={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border/50 bg-background/50 backdrop-blur-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/50 focus:bg-background/80 transition-all duration-300"
                          placeholder="请输入您的姓名"
                        />
                      </div>
                    </div>

                    {/* 邮箱输入 */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        邮箱 *
                      </label>
                      <div className="relative">
                        <SvgIcon
                          icon="lucide:mail"
                          width={16}
                          height={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border/50 bg-background/50 backdrop-blur-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/50 focus:bg-background/80 transition-all duration-300"
                          placeholder="请输入您的邮箱"
                        />
                      </div>
                    </div>

                    {/* 主题输入 */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        主题 *
                      </label>
                      <div className="relative">
                        <SvgIcon
                          icon="lucide:tag"
                          width={16}
                          height={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) =>
                            handleInputChange("subject", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border/50 bg-background/50 backdrop-blur-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/50 focus:bg-background/80 transition-all duration-300"
                          placeholder="请输入消息主题"
                        />
                      </div>
                    </div>

                    {/* 消息输入 */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        消息 *
                      </label>
                      <div className="relative">
                        <SvgIcon
                          icon="lucide:message-square"
                          width={16}
                          height={16}
                          className="absolute left-3 top-3 text-muted-foreground"
                        />
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border/50 bg-background/50 backdrop-blur-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/50 focus:bg-background/80 transition-all duration-300 resize-none"
                          placeholder="请详细描述您的问题或需求..."
                        />
                      </div>
                    </div>

                    {/* 提交按钮 */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <SvgIcon
                            icon="lucide:loader-2"
                            width={16}
                            height={16}
                            className="mr-2 animate-spin"
                          />
                          发送中...
                        </>
                      ) : (
                        <>
                          <SvgIcon
                            icon="lucide:send"
                            width={16}
                            height={16}
                            className="mr-2"
                          />
                          发送消息
                        </>
                      )}
                    </Button>

                    {/* 提交状态显示 */}
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-emerald-600 text-sm"
                      >
                        <SvgIcon
                          icon="lucide:check-circle"
                          width={16}
                          height={16}
                        />
                        <span>消息发送成功！我们会尽快回复您。</span>
                      </motion.div>
                    )}

                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-600 text-sm"
                      >
                        <SvgIcon
                          icon="lucide:x-circle"
                          width={16}
                          height={16}
                        />
                        <span>发送失败，请稍后重试。</span>
                      </motion.div>
                    )}
                  </div>
                </form>
              </motion.section>

              {/* 常见问题 */}
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, ...SMOOTH_TRANSITION }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    常见问题
                  </h2>
                  <p className="text-muted-foreground">
                    这里是一些常见问题的答案，或许能帮到您。
                  </p>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.7 + index * 0.1,
                        ...SMOOTH_TRANSITION,
                      }}
                      className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl p-6 shadow-lg"
                    >
                      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <SvgIcon
                          icon="lucide:help-circle"
                          width={18}
                          height={18}
                          className="text-emerald-500"
                        />
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* 额外帮助 */}
                <div className="backdrop-blur-xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-border/50 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    需要更多帮助？
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    如果您的问题没有在上面找到答案，可以查看我们的博客或直接联系我们。
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/company/blog">
                        <SvgIcon
                          icon="lucide:book-open"
                          width={16}
                          height={16}
                          className="mr-2"
                        />
                        查看博客
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open("mailto:support@awt0204.shop", "_blank")
                      }
                    >
                      <SvgIcon
                        icon="lucide:mail"
                        width={16}
                        height={16}
                        className="mr-2"
                      />
                      技术支持
                    </Button>
                  </div>
                </div>
              </motion.section>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
