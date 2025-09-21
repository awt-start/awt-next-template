/**
 * 登录页面
 * 集成Ruoyi-Plus后端接口的登录功能
 */

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Input,
  PasswordInput,
  Button,
  Checkbox,
  OAuthButton,
} from "@/components/auth/auth-components";
import SvgIcon from "@/components/icon/icon";
import { useAuth } from "@/lib/auth/auth-context";
import { useAuth as useAuthApi, useCaptcha } from "@/apis/auth/auth";
import { AuthApi } from "@/apis/auth/auth-type";
import { cn } from "@/lib/utils";

// 动画配置
const SMOOTH_SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;
const SMOOTH_TRANSITION = { duration: 0.6, ease: "easeOut" } as const;

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, login: loginToContext, clearError } = useAuth();

  // 表单状态
  const [formData, setFormData] = useState<AuthApi.SimpleLoginParams>({
    clientId: "e5cd7e4891bf95d1d19206ce24a7b32e",
    grantType: "password",
    tenantId: "000000",
    username: "",
    password: "",
    code: "",
    uuid: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);

  // API hooks
  const captchaQuery = useCaptcha.useCaptchaImage();
  const loginMutation = useAuthApi.login({
    onSuccess: (data) => {
      // 登录成功，更新Context状态
      loginToContext(data);
      // 跳转到首页或上一个页面
      const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
      router.push(returnUrl || '/');
    },
    onError: (error) => {
      console.error('登录失败:', error.message);
      // 如果是验证码错误，刷新验证码
      if (error.status === 400 && showCaptcha) {
        captchaQuery.refetch();
      }
    },
  });

  // 如果已登录，跳转到首页
  useEffect(() => {
    if (isAuthenticated) {
      const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
      router.push(returnUrl || '/');
    }
  }, [isAuthenticated, router]);

  // 初始化时获取验证码
  useEffect(() => {
    if (captchaQuery.data?.captchaEnabled) {
      setShowCaptcha(true);
      setFormData(prev => ({
        ...prev,
        uuid: captchaQuery.data?.uuid || '',
      }));
    }
  }, [captchaQuery.data]);

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    // 表单验证
    if (!formData.username.trim()) {
      alert('请输入用户名');
      return;
    }

    if (!formData.password.trim()) {
      alert('请输入密码');
      return;
    }

    if (showCaptcha && !formData.code?.trim()) {
      alert('请输入验证码');
      return;
    }

    // 提交登录请求
    loginMutation.mutate(formData);
  };

  // 刷新验证码
  const refreshCaptcha = () => {
    captchaQuery.refetch();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-blue-950/30 dark:to-purple-950/30" />

      {/* 动画光效 */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl"
            style={{
              width: 300 + i * 100,
              height: 300 + i * 100,
              left: `${20 + i * 20}%`,
              top: `${10 + i * 15}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 180],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* 登录卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={SMOOTH_SPRING}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          className="backdrop-blur-xl bg-background/90 dark:bg-background/70 border border-border/50 rounded-3xl shadow-2xl shadow-black/10 dark:shadow-black/30 p-8"
          whileHover={{ y: -2, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
          transition={SMOOTH_TRANSITION}
        >
          {/* 标题 */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, ...SMOOTH_TRANSITION }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-4 shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={SMOOTH_SPRING}
            >
              <SvgIcon icon="lucide:lock" width={24} height={24} />
            </motion.div>

            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              欢迎回来
            </h1>

            <p className="text-muted-foreground mt-2">
              登录您的账户继续使用
            </p>
          </motion.div>

          {/* 登录表单 */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...SMOOTH_TRANSITION }}
          >
            {/* 用户名 */}
            <Input
              label="用户名"
              type="text"
              placeholder="请输入用户名"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              icon={<SvgIcon icon="lucide:user" width={16} height={16} />}
              autoComplete="username"
            />

            {/* 密码 */}
            <PasswordInput
              label="密码"
              placeholder="请输入密码"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              autoComplete="current-password"
            />

            {/* 验证码 */}
            {showCaptcha && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={SMOOTH_SPRING}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-muted-foreground">
                  验证码
                </label>

                <div className="flex gap-3">
                  <Input
                    placeholder="请输入验证码"
                    value={formData.code || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                    className="flex-1"
                  />

                  <motion.button
                    type="button"
                    onClick={refreshCaptcha}
                    className="flex-shrink-0 w-36 h-12 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={captchaQuery.isLoading}
                  >
                    {captchaQuery.isLoading ? (
                      <SvgIcon icon="lucide:loader-2" width={16} height={16} className="animate-spin mx-auto" />
                    ) : captchaQuery.data?.img ? (
                      <img
                        src={`data:image/jpeg;base64,${captchaQuery.data.img}`}
                        alt="验证码"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground">点击刷新</span>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* 记住我 */}
            <div className="flex items-center justify-between">
              <Checkbox
                checked={rememberMe}
                onChange={setRememberMe}
                label="记住我"
              />

              <motion.button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/auth/forgot-password')}
              >
                忘记密码？
              </motion.button>
            </div>

            {/* 登录按钮 */}
            <Button
              type="submit"
              size="lg"
              loading={loginMutation.isPending}
              disabled={loginMutation.isPending}
              className="w-full"
            >
              {loginMutation.isPending ? '登录中...' : '登录'}
            </Button>
          </motion.form>

          {/* 分割线 */}
          <motion.div
            className="relative my-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, ...SMOOTH_TRANSITION }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                或使用以下方式登录
              </span>
            </div>
          </motion.div>

          {/* 第三方登录 */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, ...SMOOTH_TRANSITION }}
          >
            <OAuthButton provider="google" size="sm">
              Google
            </OAuthButton>
            <OAuthButton provider="github" size="sm">
              GitHub
            </OAuthButton>
          </motion.div>

          {/* 注册链接 */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, ...SMOOTH_TRANSITION }}
          >
            <span className="text-sm text-muted-foreground">
              还没有账户？{' '}
            </span>
            <motion.button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/auth/register')}
            >
              立即注册
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}