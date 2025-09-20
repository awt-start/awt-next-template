// lib/useToast.ts

import SvgIcon from "@/components/icon/icon";
import { useCallback } from "react";
import { toast as sonnerToast } from "sonner";

// 定义 Toast 类型
type ToastType = "success" | "error" | "warning" | "info" | "loading";

// 图标映射：使用 Material Symbols 和 Epicons
const ICON_MAP: Record<ToastType, string> = {
  success: "material-symbols:check-circle-outline",
  error: "material-symbols:error-outline",
  warning: "material-symbols:warning-outline",
  info: "material-symbols:info-outline",
  loading: "ep:loading",
};

// 全局默认配置（可集中管理）
const DEFAULT_TOAST_OPTIONS: Omit<Parameters<typeof sonnerToast>[1], "icon"> = {
  position: "top-center" as const,
  duration: 5000, // 默认显示 5 秒
  className: (type: ToastType) => `sonner-toast-${type}`,
};

// 创建一个缓存的图标组件工厂，避免重复渲染
const createIconComponent = (type: ToastType) => {
  return <SvgIcon icon={ICON_MAP[type]} width={20} height={20} />;
};

// 自定义 Hook
export function useToast() {
  // 封装核心创建函数
  const createToast = useCallback(
    (
      type: ToastType,
      message: string,
      options?: Omit<Parameters<typeof sonnerToast>[1], "icon">,
    ) => {
      return sonnerToast[type](message, {
        ...DEFAULT_TOAST_OPTIONS,
        // @ts-ignore
        icon: options?.icon ?? createIconComponent(type), // 支持自定义 icon 覆盖
        ...options,
      });
    },
    [],
  );

  // 每种类型的具体调用方法
  const success = useCallback(
    (
      message: string,
      options?: Omit<Parameters<typeof sonnerToast>[1], "icon">,
    ) => createToast("success", message, options),
    [createToast],
  );

  const error = useCallback(
    (
      message: string,
      options?: Omit<Parameters<typeof sonnerToast>[1], "icon">,
    ) => createToast("error", message, options),
    [createToast],
  );

  const warning = useCallback(
    (
      message: string,
      options?: Omit<Parameters<typeof sonnerToast>[1], "icon">,
    ) => createToast("warning", message, options),
    [createToast],
  );

  const info = useCallback(
    (
      message: string,
      options?: Omit<Parameters<typeof sonnerToast>[1], "icon">,
    ) => createToast("info", message, options),
    [createToast],
  );

  // 批量清除
  const dismiss = useCallback(() => {
    sonnerToast.dismiss();
  }, []);

  // 清除特定 ID 的 toast
  const dismissById = useCallback((id: string) => {
    sonnerToast.dismiss(id);
  }, []);

  return {
    success,
    error,
    warning,
    info,
    dismiss,
    dismissById,

    // 🎯 可选：暴露底层 sonnerToast 供高级用法
    raw: sonnerToast,
  };
}
