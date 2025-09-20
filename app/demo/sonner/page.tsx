"use client";

import { useToast } from "@/lib/useToast";
import { motion } from "framer-motion";
import SvgIcon from "@/components/icon/icon";
import { Button } from "@/components/ui/button";

const SMOOTH_TRANSITION = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

export default function sonnerPage() {
  const { success, error, warning, info, dismiss } = useToast();

  return (
    <div className="relative z-10 min-h-screen pt-24 pb-16">
      {/* 装饰性背景（复用你之前的风格，保持一致性） */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 网格背景 */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* 渐变光晕 */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-indigo-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-purple-500/15 via-pink-500/10 to-red-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        {/* 标题 + 标签徽章 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SMOOTH_TRANSITION}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, ...SMOOTH_TRANSITION }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 mb-6 backdrop-blur-sm"
          >
            <SvgIcon
              icon="lucide:airplay"
              width={16}
              height={16}
              className="text-blue-500"
            />
            <span className="text-sm font-medium text-muted-foreground">
              通知系统演示
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            通知系统演示
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            点击下方按钮体验不同类型的 toast 通知，支持自定义操作与动画反馈。
          </p>
        </motion.div>

        {/* 按钮网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Success */}
          <Button
            variant="default"
            size="lg"
            onClick={() => success("🎉 Event created successfully!")}
            className="group relative overflow-hidden"
          >
            <SvgIcon
              icon="lucide:check-circle"
              width={18}
              height={18}
              className="text-green-400 group-hover:scale-110 transition-transform duration-200"
            />
            成功通知
          </Button>

          {/* Error */}
          <Button
            variant="destructive"
            size="lg"
            onClick={() => error("❌ Failed to save data")}
            className="group relative overflow-hidden"
          >
            <SvgIcon
              icon="lucide:alert-circle"
              width={18}
              height={18}
              className="text-red-400 group-hover:scale-110 transition-transform duration-200"
            />
            错误通知
          </Button>

          {/* Warning */}
          <Button
            variant="outline-destructive"
            size="lg"
            onClick={() => warning("⚠️ This will delete your data permanently")}
            className="group relative overflow-hidden"
          >
            <SvgIcon
              icon="lucide:alert-triangle"
              width={18}
              height={18}
              className="text-amber-400 group-hover:scale-110 transition-transform duration-200"
            />
            警告通知
          </Button>

          {/* Info */}
          <Button
            variant="secondary"
            size="lg"
            onClick={() => info("ℹ️ You have 5 new notifications")}
            className="group relative overflow-hidden"
          >
            <SvgIcon
              icon="lucide:info"
              width={18}
              height={18}
              className="text-blue-400 group-hover:scale-110 transition-transform duration-200"
            />
            信息通知
          </Button>

          {/* Custom Action */}
          <Button
            variant="outline"
            size="lg"
            onClick={() =>
              success("Custom with action!", {
                description: "Click undo to revert.",
                action: {
                  label: "Undo",
                  onClick: () => alert("Undid!"),
                },
              })
            }
            className="group relative overflow-hidden border-blue-500/30 hover:border-blue-400/50"
          >
            <SvgIcon
              icon="lucide:zap"
              width={18}
              height={18}
              className="text-cyan-400 group-hover:scale-110 transition-transform duration-200"
            />
            自定义操作
          </Button>

          {/* Dismiss All */}
          <Button
            variant="ghost"
            size="lg"
            onClick={dismiss}
            className="group relative overflow-hidden text-gray-400 hover:text-white hover:bg-gray-800/30"
          >
            <SvgIcon
              icon="lucide:x"
              width={18}
              height={18}
              className="text-gray-400 group-hover:scale-110 transition-transform duration-200"
            />
            关闭所有
          </Button>
        </div>

        {/* 底部提示语 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, ...SMOOTH_TRANSITION }}
          className="mt-16 text-center text-sm text-gray-500"
        >
          所有通知均使用{" "}
          <code className="bg-gray-800 px-2 py-1 rounded text-xs">
            useToast()
          </code>{" "}
          实现，支持自定义图标、描述与操作按钮。
        </motion.div>
      </div>
    </div>
  );
}
