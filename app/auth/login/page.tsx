/**
 * 登录页面 - 集成导航栏的现代设计
 * 包含面包屑导航、精美动画和优雅交互
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Input, PasswordInput, Button, OAuthButton, Checkbox } from "@/components/auth/auth-components";

// 自定义缓动曲线
const SMOOTH_TRANSITION = { duration: 0.5, ease: "easeOut" } as const;

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 表单验证
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "请输入邮箱或用户名";
    } else if (
      formData.email.includes("@") &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "请输入有效的邮箱地址";
    }

    if (!formData.password) {
      newErrors.password = "请输入密码";
    } else if (formData.password.length < 6) {
      newErrors.password = "密码至少需要6位字符";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 表单提交逻辑
  };

  const handleOAuthLogin = (provider: "google" | "github") => {
    console.log(`使用 ${provider} 登录`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={SMOOTH_TRANSITION}
      className="w-full space-y-8"
    >


      {/* 主登录卡片 */}
      <div className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 p-8 md:p-10">
        {/* 标题区域 */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-foreground via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...SMOOTH_TRANSITION }}
          >
            欢迎回来
          </motion.h1>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, ...SMOOTH_TRANSITION }}
          >
            登录您的账户以继续精彩体验
          </motion.p>
        </div>

        {/* 登录表单 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, ...SMOOTH_TRANSITION }}
          >
            <Input
              label="邮箱或用户名"
              type="text"
              placeholder="请输入您的邮箱或用户名"
              icon={<Mail className="w-4 h-4" />}
              value={formData.email}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, email: e.target.value }));
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              error={errors.email}
              autoComplete="email"
              autoFocus
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, ...SMOOTH_TRANSITION }}
          >
            <PasswordInput
              label="密码"
              placeholder="请输入您的密码"
              icon={<Lock className="w-4 h-4" />}
              value={formData.password}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, password: e.target.value }));
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: "" }));
              }}
              error={errors.password}
              autoComplete="current-password"
            />
          </motion.div>

          {/* 记住我 & 忘记密码 */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          >
            <Checkbox
              checked={formData.rememberMe}
              onChange={(checked) =>
                setFormData((prev) => ({ ...prev, rememberMe: checked }))
              }
              label="记住我"
            />

            <Link
              href="/auth/forgot-password"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              忘记密码？
            </Link>
          </motion.div>

          {/* 登录按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, ...SMOOTH_TRANSITION }}
          >
            <Button
              type="submit"
              size="lg"
              loading={isLoading}
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full"
            >
              {isLoading ? "登录中..." : "登录"}
            </Button>
          </motion.div>
        </form>

        {/* 分隔线 */}
        <motion.div
          className="relative my-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 backdrop-blur-sm bg-background/80 text-muted-foreground">
              或使用以下方式登录
            </span>
          </div>
        </motion.div>

        {/* OAuth 登录按钮组 */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
        >
          <OAuthButton
            provider="google"
            onClick={() => handleOAuthLogin("google")}
            className="justify-center"
          />
          <OAuthButton
            provider="github"
            onClick={() => handleOAuthLogin("github")}
            className="justify-center"
          />
        </motion.div>

        {/* 注册链接 */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-sm text-slate-600 dark:text-slate-400">
            没有账号？
            <Link
              href="/auth/register"
              className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              立即注册
            </Link>
          </p>
        </motion.div>
      </div>


    </motion.div>
  );
}
