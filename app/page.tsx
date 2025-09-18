"use client";

import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function Home() {
  return (
    <div className="relative">
      {/* 顶部导航栏 */}
      <Navbar />

      {/* 主要内容区域 */}
      <main className="relative">
        {/* 英雄区域 */}
        <HeroSection />

        {/* 功能特性区域 */}
        <FeaturesSection />

        {/* 技术栈展示区域 */}
        <TechStackSection />
      </main>

      {/* 页脚 */}
      <Footer />

      {/* 回到顶部按钮 */}
      <ScrollToTop />
    </div>
  );
}
