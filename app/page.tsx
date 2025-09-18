"use client";

import { useTranslations } from "next-intl";
import { ThemeSwitcher } from "@/components/theme-switcher/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher/language-switcher";
import { Button } from "@/components/ui/button";
import SvgIcon from "@/components/icon/icon";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/50">
      {/* 顶部导航栏 */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SvgIcon
                icon="lucide:layers"
                width={28}
                height={28}
                className="text-primary"
                animate="hover-scale"
              />
              <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Next.js 模板
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <ThemeSwitcher variant="dropdown" showLabel />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容区 */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 欢迎区域 */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
              <SvgIcon
                icon="lucide:sparkles"
                width={32}
                height={32}
                className="text-primary"
                animate="hover-scale"
              />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                欢迎使用 Next.js 模板
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              这是一个现代化的 Next.js 模板项目，集成了 TypeScript、Tailwind
              CSS、国际化和主题切换功能。 支持亮色、暗色和跟随系统三种主题模式。
            </p>
          </div>

          {/* 功能展示区 */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* 主题切换展示 */}
            <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <SvgIcon
                  icon="lucide:palette"
                  width={24}
                  height={24}
                  className="text-primary"
                />
                <h3 className="font-semibold text-lg">主题切换</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                支持亮色、暗色和跟随系统三种主题模式，提供流畅的切换动画效果。
              </p>
              <div className="flex gap-3">
                <ThemeSwitcher variant="button" />
                <ThemeSwitcher variant="dropdown" size="sm" />
              </div>
            </div>

            {/* 国际化展示 */}
            <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <SvgIcon
                  icon="lucide:globe"
                  width={24}
                  height={24}
                  className="text-primary"
                />
                <h3 className="font-semibold text-lg">国际化支持</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                基于 next-intl 实现的多语言支持，目前支持中文和英文两种语言。
              </p>
              <LanguageSwitcher />
            </div>
          </div>

          {/* 技术栈展示 */}
          <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <SvgIcon
                icon="lucide:code"
                width={24}
                height={24}
                className="text-primary"
              />
              <h3 className="font-semibold text-xl">技术栈</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Next.js 15", icon: "logos:nextjs-icon" },
                { name: "React 19", icon: "logos:react" },
                { name: "TypeScript", icon: "logos:typescript-icon" },
                { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
                { name: "Framer Motion", icon: "logos:framer" },
                { name: "Biome", icon: "simple-icons:biome" },
                { name: "next-intl", icon: "lucide:globe" },
                { name: "Turbopack", icon: "simple-icons:turbopack" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-accent/50 transition-all duration-200 hover:scale-105"
                >
                  <SvgIcon
                    icon={tech.icon}
                    width={20}
                    height={20}
                    animate="hover-scale"
                  />
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">
              使用 Next.js 15 + TypeScript + Tailwind CSS 构建
            </p>
            <p className="text-sm">支持现代化开发体验与最佳实践</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
