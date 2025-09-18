/**
 * 隐私政策页面 - 现代简约设计风格
 * 保持与项目整体设计的一致性，包含导航栏和精美排版
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私政策 - 保护您的隐私",
  description: "了解我们如何收集、使用和保护您的个人信息",
};

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
