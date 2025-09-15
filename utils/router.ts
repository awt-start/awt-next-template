/**
 * 路由封装工具（App Router）
 */

import { type Route } from "next";
import { useRouter } from "next/navigation";

// =============================
// 📦 路由常量（类型安全，IDE 自动补全）
// =============================
export const ROUTES = {
  // 静态路由
  Home: "/" as const,
  About: "/about" as const,
} as const;

// 类型推导：所有路由路径的联合类型
export type AppRoute = typeof ROUTES[keyof typeof ROUTES] extends (...args: any[]) => any
  ? ReturnType<typeof ROUTES[keyof typeof ROUTES]>
  : typeof ROUTES[keyof typeof ROUTES];


// =============================
// 🔧 路由构建器（函数式 + 类型安全）
// =============================

/**
 * 构建查询字符串（自动编码）
 * @param query - 查询参数对象
 * @returns URLSearchParams 字符串
 */
export function buildQuery(query: Record<string, string | number | boolean | null | undefined>): string {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value != null) { // 排除 null/undefined
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}

/**
 * 安全构建动态路由路径
 * @param template - 如 `/users/[userId]/posts/[postId]`
 * @param params - 参数对象，如 { userId: '123', postId: '456' }
 * @returns 完整路径
 */
export function buildRoute(template: string, params: Record<string, string>): string {
  return template.replace(/\[([^\]]+)\]/g, (match, key) => {
    const value = params[key];
    if (value === undefined) {
      // 错误信息使用英文，便于调试和国际化
      throw new Error(`Missing required route parameter: '${key}' in path template "${template}"`);
    }
    return encodeURIComponent(value); // ✅ 自动编码，防止路径错误
  });
}

/**
 * 构建完整 URL（路径 + 查询参数）
 * @param path - 路径模板或预定义路由
 * @param params - 动态路由参数（如 [id]）
 * @param query - 查询参数
 * @returns 完整 URL（带协议和主机？不，仅路径+查询）
 */
export function buildUrl(
  path: string,
  params: Record<string, string> = {},
  query: Record<string, string | number | boolean | null | undefined> = {}
): string {
  const routePath = buildRoute(path, params);
  const queryString = buildQuery(query);

  return queryString ? `${routePath}?${queryString}` : routePath;
}

/**
 * 根据预定义路由常量构建 URL（类型安全）
 * @param routePath - 完整的路径字符串（由 ROUTES 的函数返回）
 * @param query - 可选的查询参数
 * @returns 完整的 URL 字符串
 *
 * 示例：
 * const userUrl = build(ROUTES.User('123')); // '/users/123'
 * const postUrl = build(ROUTES.Post('123', '456'), { tab: 'details' }); // '/users/123/posts/456?tab=details'
 * const homeUrl = build(ROUTES.Home, { ref: '1' }); // '/?ref=1'
 */
export function build(
  routePath: Route,
  query: Record<string, string | number | boolean | null | undefined> = {}
): string {
  const queryString = buildQuery(query);
  return queryString ? `${routePath}?${queryString}` : routePath;
}


// =============================
// 🧭 导航 Hook：客户端专用（React Server Component 兼容）
// =============================

/**
 * 封装 next/navigation 的 useRouter，提供类型安全跳转
 * @returns 包装后的 navigate 函数
 */
export function useNavigate() {
  const router = useRouter();

  return {
    push: (url: AppRoute) => router.push(url),
    replace: (url: AppRoute) => router.replace(url),
    back: () => router.back(),
    forward: () => router.forward(),
  };
}


// =============================
// 🧪 辅助：用于服务端获取完整 URL（例如 SSR/ISR）
// =============================

/**
 * 服务端安全构建完整 URL（包含域名）
 * 注意：在 Server Component 中使用需注入 BASE_URL 环境变量
 */
export function buildFullUrl(
  path: string,
  params: Record<string, string> = {},
  query: Record<string, string | number | boolean | null | undefined> = {},
  baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
): string {
  const relativeUrl = buildUrl(path, params, query);
  return new URL(relativeUrl, baseUrl).toString();
}
