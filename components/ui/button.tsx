// components/ui/Button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ✅ 从 Icon 组件导入类型
import type { AnimationType } from "@/components/icon/icon";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 ease-in-out disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 active:scale-98",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 active:scale-98 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 active:scale-98",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 active:scale-98",
        link:
          "text-primary underline-offset-4 hover:underline focus-visible:underline data-[state=open]:underline",
        "outline-destructive":
          "border border-destructive text-destructive shadow-xs hover:bg-destructive/5 hover:text-destructive/90 dark:border-destructive/70 dark:hover:bg-destructive/10",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3 min-w-[8rem]",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 min-w-[6rem]",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4 min-w-[8rem]",
        icon: "size-9 flex-shrink-0 justify-center items-center text-base",
      },
    },
    compoundVariants: [
      { size: "default", className: "min-h-9" },
      { size: "sm", className: "min-h-8" },
      { size: "lg", className: "min-h-10" },
      // @ts-ignore
      { variant: "icon", className: "text-base" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// ✅ 新增：为 Button 定义支持的动画类型（复用 Icon 类型）
type ButtonAnimationType = AnimationType;

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  type?: "button" | "submit" | "reset";
  iconAnimation?: ButtonAnimationType; // ✅ 新增：控制图标动画
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      type = "button",
      iconAnimation = null,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // ✅ 检查子元素是否是 SvgIcon，如果是，则自动应用 iconAnimation
    // 我们通过 React.Children 来遍历，但更简单的方式是：让使用者显式传入带动画的图标
    // 因为无法在 Button 内部“劫持”子组件的 props，所以采用显式方式：用户自己写 <SvgIcon animate="..." />

    return (
      <Comp
        ref={ref}
        data-slot="button"
        type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };