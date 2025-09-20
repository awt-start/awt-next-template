/**
 * Tag 通用标签组件
 * 基于项目设计规范的现代简约标签组件
 */

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-medium transition-all duration-200 whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-accent/30 text-muted-foreground hover:bg-accent/50",
        primary:
          "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
        secondary:
          "bg-gray-500/10 text-gray-600 dark:text-gray-400 border border-gray-500/20",
        success:
          "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20",
        warning:
          "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20",
        destructive:
          "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
        purple:
          "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20",
        emerald:
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
        outline:
          "border border-border/50 bg-background/50 text-foreground hover:bg-accent/30",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-1 text-sm",
        lg: "px-3 py-1.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  /**
   * 是否可点击
   */
  clickable?: boolean;
  /**
   * 点击回调
   */
  onTagClick?: () => void;
}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    { className, variant, size, clickable, onTagClick, children, ...props },
    ref,
  ) => {
    const Component = clickable ? "button" : "span";

    return (
      <Component
        ref={ref as any}
        className={cn(
          tagVariants({ variant, size }),
          clickable && "cursor-pointer hover:scale-105 active:scale-95",
          className,
        )}
        onClick={clickable ? onTagClick : undefined}
        {...(props as any)}
      >
        {children}
      </Component>
    );
  },
);

Tag.displayName = "Tag";

export { Tag, tagVariants };
