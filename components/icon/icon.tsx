// components/icons/Icon.jsx
import { IconProps } from "@/types/components";
import { Icon } from "@iconify/react";
import React from "react";
// 类型定义
const SvgIcon: React.FC<IconProps> = ({
  icon,
  width = 24,
  height = 24,
  color,
  className = "",
  title,
  ariaLabel,
  style,
  ...rest
}) => {
  // 生成无障碍属性
  const ariaProps = {
    "aria-hidden": !!title || !!ariaLabel ? false : true,
    "aria-label": ariaLabel || title || undefined,
    focusable: false, // 图标不可聚焦，避免键盘导航干扰
  };

  return (
    <Icon
      icon={icon}
      width={width}
      height={height}
      color={color}
      className={`iconify-icon ${className}`}
      style={{ ...(color ? { color } : {}), ...style }}
      {...ariaProps}
      {...rest}
    />
  );
};

export default SvgIcon;
