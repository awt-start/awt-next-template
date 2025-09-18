/**
 * 回到顶部按钮组件 - 优雅的浮动按钮
 * 具有平滑滚动和精美动画效果
 */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import SvgIcon from "@/components/icon/icon";
import { cn } from "@/lib/utils";

interface ScrollToTopProps {
  className?: string;
  threshold?: number;
}

export function ScrollToTop({ className, threshold = 300 }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;

      setScrollProgress(progress);
      setIsVisible(scrolled > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={cn("fixed bottom-8 right-8 z-50", className)}
        >
          <div className="relative">
            {/* 进度圆环 */}
            <svg
              className="absolute inset-0 w-12 h-12 -rotate-90"
              viewBox="0 0 36 36"
            >
              <path
                className="text-border"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                d="M18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
              />
              <motion.path
                className="text-blue-500"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                strokeLinecap="round"
                d="M18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                style={{
                  strokeDasharray: "100, 100",
                }}
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 100 - scrollProgress }}
                transition={{ duration: 0.1 }}
              />
            </svg>

            {/* 按钮 */}
            <Button
              onClick={scrollToTop}
              size="icon"
              className={cn(
                "relative w-12 h-12 rounded-full shadow-lg hover:shadow-xl",
                "bg-background/80 backdrop-blur-sm border border-border/50",
                "hover:bg-accent transition-all duration-300",
                "group",
              )}
              aria-label="回到顶部"
            >
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <SvgIcon
                  icon="lucide:arrow-up"
                  width={20}
                  height={20}
                  className="text-foreground group-hover:text-blue-500 transition-colors duration-300"
                />
              </motion.div>

              {/* 悬停光效 */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </Button>

            {/* 工具提示 */}
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              whileHover={{ opacity: 1, x: 0, scale: 1 }}
              className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-2 bg-foreground text-background text-xs rounded-lg whitespace-nowrap pointer-events-none"
            >
              回到顶部
              <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-foreground border-y-4 border-y-transparent" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
