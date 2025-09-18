/**
 * 忘记密码页面 - 极简现代设计
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Input, Button } from "@/components/auth/auth-components";

// 自定义缓动曲线
const SMOOTH_EASING = [0.25, 0.46, 0.45, 0.94] as const;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");

  // 表单验证
  const validateForm = () => {
    if (!email) {
      setError("请输入邮箱地址");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("请输入有效的邮箱地址");
      return false;
    }
    setError("");
    return true;
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // 模拟发送重置邮件请求
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("发送重置邮件到:", email);
      setIsEmailSent(true);
      // 这里将集成实际的重置密码逻辑
    } catch (error) {
      console.error("发送邮件失败:", error);
      setError("发送邮件失败，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: SMOOTH_EASING }}
        className="w-full"
      >
        <div className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 p-8 md:p-10 text-center">
          {/* 成功图标 */}
          <div className="w-16 h-16 mx-auto mb-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>

          <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground via-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
            邮件已发送
          </h1>

          <p className="text-muted-foreground mb-6">
            我们已向{" "}
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {email}
            </span>{" "}
            发送了密码重置链接。 请检查您的邮箱并点击链接重置密码。
          </p>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              没有收到邮件？请检查垃圾邮件文件夹，或者
            </p>

            <Button
              variant="ghost"
              onClick={() => {
                setIsEmailSent(false);
                setEmail("");
              }}
              className="text-blue-600 dark:text-blue-400"
            >
              重新发送
            </Button>
          </div>

          <div className="mt-8">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              返回登录
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: SMOOTH_EASING }}
      className="w-full"
    >
      {/* 主卡片 */}
      <div className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 p-8 md:p-10">
        {/* 标题区域 */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-3xl font-bold bg-gradient-to-r from-foreground via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: SMOOTH_EASING }}
          >
            忘记密码
          </motion.h1>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: SMOOTH_EASING }}
          >
            输入您的邮箱地址，我们将发送重置链接给您
          </motion.p>
        </div>

        {/* 重置表单 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: SMOOTH_EASING }}
          >
            <Input
              label="邮箱地址"
              type="email"
              placeholder="请输入您的邮箱地址"
              icon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              error={error}
              autoComplete="email"
              autoFocus
            />
          </motion.div>

          {/* 发送按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: SMOOTH_EASING }}
          >
            <Button
              type="submit"
              size="lg"
              loading={isLoading}
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full"
            >
              {isLoading ? "发送中..." : "发送重置链接"}
            </Button>
          </motion.div>
        </form>

        {/* 返回登录 */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: SMOOTH_EASING }}
        >
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回登录
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
