/**
 * TanStack Query 示例页面
 * 演示如何在Next.js项目中使用封装的Query和Mutation Hooks
 */

import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import {
  Link,
  Home,
  Shield,
  Clock,
  Eye,
  Users,
  FileText,
  Mail,
  ArrowLeft,
  Cookie,
  UserCheck,
  Code,
} from "lucide-react";
import { TanStackQueryExamples } from "./components/QueryExamples";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TanStack Query 示例 | Next Template",
  description: "演示TanStack Query在Next.js项目中的使用方法和最佳实践",
};

export default function QueryDemoPage() {
  return <TanStackQueryExamples />;
}
