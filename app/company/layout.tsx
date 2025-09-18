import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | 公司介绍",
    default: "公司介绍",
  },
  description: "了解我们的团队、愿景和服务。专注于现代Web开发解决方案。",
  keywords: ["公司介绍", "团队", "服务", "Next.js", "React", "Web开发"],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    title: "公司介绍",
    description: "了解我们的团队、愿景和服务。专注于现代Web开发解决方案。",
  },
};

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
