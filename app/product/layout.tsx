/**
 * 产品目录布局组件
 * 为product目录下的所有页面提供统一的布局和导航
 */

import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: {
    template: "%s | 产品 - Next Template",
    default: "产品中心 - Next Template",
  },
  description: "探索我们的产品功能、技术架构、发展路线和更新日志",
  keywords: [
    "产品",
    "功能特性",
    "技术架构",
    "发展路线",
    "更新日志",
    "Next.js",
    "React",
    "TypeScript",
  ],
  openGraph: {
    title: "产品中心 - Next Template",
    description: "探索我们的产品功能、技术架构、发展路线和更新日志",
    type: "website",
    siteName: "Next Template",
  },
  twitter: {
    card: "summary_large_image",
    title: "产品中心 - Next Template",
    description: "探索我们的产品功能、技术架构、发展路线和更新日志",
  },
};

interface ProductLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function ProductLayout({
  children,
  params: { locale },
}: ProductLayoutProps) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="min-h-screen bg-background">{children}</div>
    </NextIntlClientProvider>
  );
}
