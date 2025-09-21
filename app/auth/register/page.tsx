/**
 * 注册页面 - 极简现代设计
 * 用户名唯一性校验、邮箱验证、手机号国际区号、密码强度提示
 */

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, ArrowRight, Check, X } from "lucide-react";
import Link from "next/link";
import {
  Input,
  PasswordInput,
  Button,
  OAuthButton,
  Checkbox,
} from "@/components/auth/auth-components";

// 自定义缓动曲线
const SMOOTH_EASING = [0.25, 0.46, 0.45, 0.94] as const;

// 国际区号选项
const COUNTRY_CODES = [
  { code: "+86", name: "中国", flag: "🇨🇳" },
  { code: "+1", name: "美国", flag: "🇺🇸" },
  { code: "+44", name: "英国", flag: "🇬🇧" },
  { code: "+81", name: "日本", flag: "🇯🇵" },
  { code: "+82", name: "韩国", flag: "🇰🇷" },
];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    countryCode: "+86",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validations, setValidations] = useState<Record<string, boolean>>({});
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  // 用户名唯一性校验（防抖）
  useEffect(() => {
    if (formData.username.length >= 3) {
      const timer = setTimeout(async () => {
        setIsCheckingUsername(true);
        try {
          // 模拟API调用
          await new Promise((resolve) => setTimeout(resolve, 800));
          // 模拟用户名已存在的情况（如果用户名是'admin'）
          const isAvailable = formData.username.toLowerCase() !== "admin";
          setValidations((prev) => ({ ...prev, username: isAvailable }));
          if (!isAvailable) {
            setErrors((prev) => ({ ...prev, username: "该用户名已被使用" }));
          } else {
            setErrors((prev) => ({ ...prev, username: "" }));
          }
        } catch (error) {
          console.error("用户名检查失败:", error);
        } finally {
          setIsCheckingUsername(false);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [formData.username]);

  // 表单验证
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 用户名验证
    if (!formData.username) {
      newErrors.username = "请输入用户名";
    } else if (formData.username.length < 3) {
      newErrors.username = "用户名至少需要3个字符";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "用户名只能包含字母、数字和下划线";
    }

    // 邮箱验证
    if (!formData.email) {
      newErrors.email = "请输入邮箱地址";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "请输入有效的邮箱地址";
    }

    // 手机号验证
    if (!formData.phone) {
      newErrors.phone = "请输入手机号";
    } else if (
      formData.countryCode === "+86" &&
      !/^1[3-9]\d{9}$/.test(formData.phone)
    ) {
      newErrors.phone = "请输入有效的中国大陆手机号";
    }

    // 密码验证
    if (!formData.password) {
      newErrors.password = "请输入密码";
    } else if (formData.password.length < 8) {
      newErrors.password = "密码至少需要8位字符";
    }

    // 确认密码验证
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "请确认密码";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "两次输入的密码不一致";
    }

    // 协议同意验证
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "请同意用户协议和隐私政策";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // 模拟注册请求
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("注册数据:", formData);
      // 这里将集成实际的注册逻辑
    } catch (error) {
      console.error("注册失败:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理OAuth注册
  const handleOAuthRegister = (provider: "google" | "github") => {
    console.log(`使用 ${provider} 注册`);
    // 这里将集成OAuth注册逻辑
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: SMOOTH_EASING }}
      className="w-full"
    >
      {/* 主注册卡片 - 符合首页设计风格 */}
      <div className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 p-8 md:p-10">
        {/* 标题区域 */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-3xl font-bold bg-gradient-to-r from-foreground via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: SMOOTH_EASING }}
          >
            开始您的旅程
          </motion.h1>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: SMOOTH_EASING }}
          >
            创建您的账户，探索更多精彩功能
          </motion.p>
        </div>

        {/* 注册表单 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 邮箱 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: SMOOTH_EASING }}
          >
            <Input
              label="邮箱地址"
              type="email"
              placeholder="请输入您的邮箱地址"
              icon={<Mail className="w-4 h-4" />}
              value={formData.email}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, email: e.target.value }));
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              error={errors.email}
              autoComplete="email"
            />
          </motion.div>

          {/* 手机号（带国际区号） */}

          {/* 密码 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: SMOOTH_EASING }}
          >
            <PasswordInput
              label="密码"
              placeholder="请输入密码（至少8位字符）"
              icon={<Lock className="w-4 h-4" />}
              value={formData.password}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, password: e.target.value }));
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: "" }));
              }}
              error={errors.password}
              showStrength={true}
              autoComplete="new-password"
            />
          </motion.div>

          {/* 用户协议同意 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5, ease: SMOOTH_EASING }}
          >
            <Checkbox
              checked={formData.agreeToTerms}
              onChange={(checked) => {
                setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
                if (errors.agreeToTerms)
                  setErrors((prev) => ({ ...prev, agreeToTerms: "" }));
              }}
              label={
                <span className="text-sm">
                  我已阅读并同意
                  <Link
                    href="/privacy/terms"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mx-1"
                  >
                    《用户协议》
                  </Link>
                  和
                  <Link
                    href="/privacy/info"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 ml-1"
                  >
                    《隐私政策》
                  </Link>
                </span>
              }
              className={
                errors.agreeToTerms ? "text-red-600 dark:text-red-400" : ""
              }
            />
            {errors.agreeToTerms && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1 px-1">
                {errors.agreeToTerms}
              </p>
            )}
          </motion.div>

          {/* 注册按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5, ease: SMOOTH_EASING }}
          >
            <Button
              type="submit"
              size="lg"
              loading={isLoading}
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full"
              disabled={!formData.agreeToTerms}
            >
              {isLoading ? "注册中..." : "立即注册"}
            </Button>
          </motion.div>
        </form>

        {/* 分隔线 */}
        <motion.div
          className="relative my-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5, ease: SMOOTH_EASING }}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 backdrop-blur-sm bg-background/80 text-muted-foreground">
              或使用以下方式快速注册
            </span>
          </div>
        </motion.div>

        {/* OAuth 注册按钮组 */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5, ease: SMOOTH_EASING }}
        >
          <OAuthButton
            provider="google"
            onClick={() => handleOAuthRegister("google")}
            className="justify-center"
          />
          <OAuthButton
            provider="github"
            onClick={() => handleOAuthRegister("github")}
            className="justify-center"
          />
        </motion.div>

        {/* 登录链接 */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5, ease: SMOOTH_EASING }}
        >
          <p className="text-sm text-slate-600 dark:text-slate-400">
            已有账号？
            <Link
              href="/auth/login"
              className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              立即登录
            </Link>
          </p>
        </motion.div>
      </div>

      {/* 底部装饰 */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5, ease: SMOOTH_EASING }}
      >
        <p className="text-xs text-muted-foreground">
          注册即表示您同意我们的服务条款和隐私政策
        </p>
      </motion.div>
    </motion.div>
  );
}
