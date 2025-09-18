/**
 * 认证共享组件 - 输入框、按钮、表单验证
 * 实现极简现代设计风格和精致动效
 */

"use client";

import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Check, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// 自定义缓动曲线 - "丝滑如德芙"
const SMOOTH_EASING = [0.25, 0.46, 0.45, 0.94] as const;

// ============================================================================
// 输入框组件
// ============================================================================

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      success,
      hint,
      icon,
      rightIcon,
      size = "md",
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const sizeClasses = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-5 py-4 text-lg",
    };

    return (
      <div className="space-y-2">
        {label && (
          <motion.label
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: isFocused ? 1 : 0.7 }}
            transition={{ duration: 0.2, ease: SMOOTH_EASING }}
          >
            {label}
          </motion.label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
              {icon}
            </div>
          )}

          <motion.input
            ref={ref}
            className={cn(
              // 基础样式
              "w-full rounded-2xl border-0 bg-white/50 dark:bg-slate-800/50",
              "backdrop-blur-sm shadow-sm",
              "text-slate-900 dark:text-slate-100",
              "placeholder:text-slate-400 dark:placeholder:text-slate-500",
              "transition-all duration-300 ease-out",

              // 聚焦状态
              "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-slate-800",
              "focus:shadow-lg focus:shadow-blue-500/5",

              // 悬停状态
              "hover:shadow-md hover:bg-white/80 dark:hover:bg-slate-800/80",

              // 尺寸
              sizeClasses[size],

              // 图标间距
              icon && "pl-10",
              rightIcon && "pr-10",

              // 错误状态
              error && "ring-2 ring-red-500/20 bg-red-50/50 dark:bg-red-900/10",

              // 成功状态
              success &&
                "ring-2 ring-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-900/10",

              className,
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
            transition={{ duration: 0.2, ease: SMOOTH_EASING }}
            {...(props as any)}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>

        {/* 提示信息 */}
        <AnimatePresence>
          {(error || success || hint) && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2, ease: SMOOTH_EASING }}
              className={cn(
                "text-xs px-1",
                error && "text-red-600 dark:text-red-400",
                success && "text-emerald-600 dark:text-emerald-400",
                !error && !success && "text-slate-500 dark:text-slate-400",
              )}
            >
              <div className="flex items-center gap-1">
                {error && <X className="w-3 h-3" />}
                {success && <Check className="w-3 h-3" />}
                <span>{error || success || hint}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

Input.displayName = "Input";

// ============================================================================
// 密码输入框组件
// ============================================================================

interface PasswordInputProps extends Omit<InputProps, "type" | "rightIcon"> {
  showStrength?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showStrength = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState(0);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const password = e.target.value;

      if (showStrength) {
        // 简单的密码强度计算
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        setStrength(score);
      }

      props.onChange?.(e);
    };

    const strengthText = ["很弱", "弱", "一般", "强", "很强"][strength];
    const strengthColor = ["red", "orange", "yellow", "blue", "emerald"][
      strength
    ];

    return (
      <div className="space-y-2">
        <Input
          ref={ref}
          type={showPassword ? "text" : "password"}
          rightIcon={
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </motion.button>
          }
          onChange={handlePasswordChange}
          {...props}
        />

        {/* 密码强度指示器 */}
        {showStrength && props.value && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">密码强度：</span>
              <span
                className={`text-xs font-medium text-${strengthColor}-600 dark:text-${strengthColor}-400`}
              >
                {strengthText}
              </span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <motion.div
                  key={level}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-all duration-300",
                    level <= strength
                      ? `bg-${strengthColor}-500`
                      : "bg-slate-200 dark:bg-slate-700",
                  )}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: level <= strength ? 1 : 0.3 }}
                  transition={{ delay: level * 0.05 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

// ============================================================================
// 按钮组件
// ============================================================================

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      icon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500/30",
      secondary:
        "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-slate-500/30",
      ghost:
        "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-slate-500/30",
      outline:
        "border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-slate-500/30",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        whileHover={{
          scale: disabled || loading ? 1 : 1.02,
          y: disabled || loading ? 0 : -1,
        }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        transition={{ duration: 0.15, ease: SMOOTH_EASING }}
        {...(props as any)}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : icon ? (
          <span className="flex items-center">{icon}</span>
        ) : null}
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";

// ============================================================================
// OAuth 按钮组件
// ============================================================================

interface OAuthButtonProps extends Omit<ButtonProps, "variant"> {
  provider: "google" | "github";
}

const OAuthIcons = {
  google: (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  ),
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
};

const OAuthLabels = {
  google: "Google",
  github: "GitHub",
};

export const OAuthButton: React.FC<OAuthButtonProps> = ({
  provider,
  children,
  ...props
}) => {
  return (
    <Button
      variant="outline"
      icon={OAuthIcons[provider]}
      className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg"
      {...props}
    >
      {children || OAuthLabels[provider]}
    </Button>
  );
};

// ============================================================================
// 复选框组件
// ============================================================================

interface CheckboxProps {
  id?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked = false,
  onChange,
  label,
  className,
}) => {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <motion.button
        type="button"
        onClick={() => onChange?.(!checked)}
        className={cn(
          "flex items-center justify-center w-5 h-5 rounded-lg border-2 transition-all duration-200",
          checked
            ? "bg-blue-600 border-blue-600 text-white"
            : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800",
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Check className="w-3 h-3" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {label && (
        <label
          htmlFor={id}
          className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer flex-1"
          onClick={() => onChange?.(!checked)}
        >
          {label}
        </label>
      )}
    </div>
  );
};
