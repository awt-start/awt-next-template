export interface IconProps {
  icon: string; // 图标名称，如 'mdi:home' 或 'fa6-solid:heart'
  width?: number | string; // 宽度，默认 24
  height?: number | string; // 高度，默认 24
  color?: string; // 颜色，支持 hex / rgb / named color
  className?: string; // 额外的 CSS 类名
  title?: string; // 可选的无障碍标题（accessibility）
  ariaLabel?: string; // 无障碍标签
  style?: React.CSSProperties; // 自定义内联样式
}
