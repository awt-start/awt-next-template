import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // ========================
  // 🌐 国际化配置（由 next-intl 自动处理）
  // 已通过 withNextIntl 包装，无需额外配置
  // ========================

  // ========================
  // 🔄 开发环境 API 代理（重要！）
  // ========================
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/:path*", // 替换为你后端地址
      },
    ];
  },


  // ========================
  // 🔐 环境变量加载（默认支持 .env.local）
  // ========================
  // Next.js 默认会自动加载 .env.local，无需额外配置

  // ========================
  // ⚙️ 自定义 Webpack 配置（可选）
  // ========================


  // ========================
  // 🛡️ 安全头部（可选，推荐生产环境使用）
  // ========================


  // ========================
  // 📦 输出配置（如需导出为静态站点）
  // ========================
  // output: 'export', // 如果要静态导出（如 GitHub Pages），取消注释
  // distDir: 'out', // 静态导出目录，默认是 .next

  // ========================
  // 🌐 自定义 basePath（如果你部署在子路径，如 /myapp）
  // ========================
  // basePath: '/myapp',

  // ========================
  // 🧩 其他常用选项
  // ========================
};

export default withNextIntl(nextConfig);