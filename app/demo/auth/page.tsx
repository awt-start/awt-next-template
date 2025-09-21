/**
 * 认证功能演示页面
 */

import { AuthDemo } from "./components/AuthDemo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "认证功能演示 | Next Template",
  description: "演示Ruoyi-Plus认证集成的功能和使用方法",
};

export default function AuthDemoPage() {
  return <AuthDemo />;
}
