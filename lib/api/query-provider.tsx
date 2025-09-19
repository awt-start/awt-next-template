/**
 * TanStack Query Provider组件
 * 为应用提供QueryClient上下文
 */

"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/api/query-client";

interface QueryProviderProps {
  children: React.ReactNode;
}

/**
 * Query Provider组件
 *
 * 注意：在App Router中，这个组件需要使用"use client"指令，
 * 因为QueryClient需要在客户端环境中运行
 */
export function QueryProvider({ children }: QueryProviderProps) {
  // 使用useState确保QueryClient实例在组件生命周期内保持稳定
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
