/**
 * 资源目录布局组件
 * 为resources目录下的所有页面提供统一的布局和SEO优化
 */

import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: {
    template: "%s | 资源中心 - Next Template",
    default: "资源中心 - Next Template",
  },
  description: "丰富的开发资源、学习教程和技术文档，助力您的编程学习和项目开发",
  keywords: [
    "开发资源",
    "学习教程",
    "技术文档",
    "API文档",
    "编程教程",
    "开发工具",
    "Next.js",
    "React",
    "TypeScript",
    "Web开发",
  ],
  openGraph: {
    title: "资源中心 - Next Template",
    description:
      "丰富的开发资源、学习教程和技术文档，助力您的编程学习和项目开发",
    type: "website",
    siteName: "Next Template",
  },
  twitter: {
    card: "summary_large_image",
    title: "资源中心 - Next Template",
    description:
      "丰富的开发资源、学习教程和技术文档，助力您的编程学习和项目开发",
  },
};

interface ResourcesLayoutProps {
  children: React.ReactNode;
  params: Promise<Record<string, string>>;
}

export default async function ResourcesLayout({
  children,
  params,
}: ResourcesLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="min-h-screen bg-background">{children}</div>
    </NextIntlClientProvider>
  );
}
