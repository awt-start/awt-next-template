"use client";

import { IconProps } from "@/types/components";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import React, { memo, useMemo } from "react";

// Define animation variants with proper Framer Motion structure
export const animationVariants = {
  "hover-scale": {
    initial: { scale: 1 },
    whileHover: { scale: 1.1 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },
  spin: {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
    transition: { duration: 1, repeat: Infinity, ease: "linear" },
  },
  "click-pulse": {
    initial: { scale: 1 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },

  // ==================== 新增推荐 ====================

  // 淡入淡出（常用于页面切换、弹窗）
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: "easeInOut" },
  },

  // 上滑进入（常用于列表项、卡片加载）
  "slide-up": {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  },

  // 下滑进入
  "slide-down": {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  },

  // 左右滑动（用于侧边栏、导航菜单）
  "slide-left": {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
  "slide-right": {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
  },

  // 缩放进入（用于按钮、图标强调）
  "scale-in": {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },

  // 轻微抖动（用于错误提示、无效点击反馈）
  shake: {
    initial: { x: 0 },
    animate: { x: [-5, 5, -3, 3, -2, 2, -1, 1, 0] },
    transition: { duration: 0.5, ease: "easeInOut" },
  },

  // 点击后“按下”效果（比 click-pulse 更明显）
  "press-effect": {
    initial: { scale: 1 },
    whileTap: { scale: 0.9, backgroundColor: "#e0e0e0" }, // 可配合背景色变化
    transition: { type: "spring", stiffness: 500, damping: 30 },
  },

  // 长按高亮（适用于长按菜单）
  "long-press-highlight": {
    initial: { backgroundColor: "transparent" },
    whileTap: { backgroundColor: "rgba(0, 0, 0, 0.05)" },
    transition: { duration: 0.1 },
  },

  // 波浪效果（适合加载指示器或装饰性元素）
  wave: {
    initial: { scale: 1, opacity: 0.7 },
    animate: { scale: 1.2, opacity: 0.3 },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
} as const;

export type AnimationType = keyof typeof animationVariants | null;

/**
 * Animated icon component using Iconify and Framer Motion.
 * Supports hover-scale, spin, and click-pulse animations.
 *
 * @param icon - Iconify icon name (e.g., 'mdi:home')
 * @param width - Icon width, defaults to 24
 * @param height - Icon height, defaults to 24
 * @param color - Icon color (CSS color value)
 * @param className - Custom CSS class name
 * @param title - Icon title for accessibility
 * @param ariaLabel - Explicit ARIA label (takes precedence over title)
 * @param animate - Animation type: 'hover-scale' | 'spin' | 'click-pulse' | null
 * @param style - Inline styles
 * @param rest - Additional props passed to Icon or MotionIcon
 */
const SvgIcon: React.FC<IconProps & { animate?: AnimationType }> = memo(
  ({
    icon,
    width = 24,
    height = 24,
    color,
    className = "",
    title,
    ariaLabel,
    style,
    animate = null,
    ...rest
  }) => {
    // Compute ARIA properties for accessibility
    const ariaProps = useMemo(() => {
      const isInteractive = !!title || !!ariaLabel;
      return {
        "aria-hidden": isInteractive ? undefined : true,
        "aria-label": ariaLabel || title || undefined,
        role: isInteractive ? "img" : undefined,
      };
    }, [title, ariaLabel]);

    // Compute motion props for animation
    const motionProps = useMemo(() => {
      if (!animate || !animationVariants[animate]) {
        if (animate) {
          console.warn(
            `SvgIcon: Unknown animation type "${animate}". Valid options are: ${Object.keys(
              animationVariants,
            ).join(", ")}.`,
          );
        }
        return {};
      }
      return animationVariants[animate];
    }, [animate]);

    // Compute icon styles
    const iconStyle = useMemo(
      () => ({
        color: color || undefined,
        ...style,
      }),
      [color, style],
    );

    // ✅ 主要修复：使用 <motion.div> 包裹 <Icon>，而不是 motion.create(Icon)
    if (animate && animationVariants[animate]) {
      return (
        <motion.div
          variants={animationVariants[animate]}
          className={`iconify-wrapper ${className}`} // 添加 wrapper 类用于样式控制
          style={{ display: "inline-block", ...style }} // 确保容器是块级/内联块，支持 transform
          {...motionProps}
          {...ariaProps}
        >
          <Icon
            icon={icon}
            width={width}
            height={height}
            className="iconify-icon"
            style={iconStyle}
            {...rest}
          />
        </motion.div>
      );
    }

    // Render static icon if no animation
    return (
      <Icon
        icon={icon}
        width={width}
        height={height}
        className={`iconify-icon ${className}`}
        style={iconStyle}
        {...ariaProps}
        {...rest}
      />
    );
  },
);

SvgIcon.displayName = "SvgIcon";

export default SvgIcon;
