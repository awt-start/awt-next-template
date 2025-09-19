/**
 * TanStack Query配置和QueryClient实例
 * 提供统一的缓存、重试、错误处理等配置
 */

import { QueryClient, DefaultOptions } from "@tanstack/react-query";
import { ApiRequestError, HTTP_STATUS } from "@/lib/api/client";

/**
 * 默认查询配置
 */
const defaultQueryOptions: DefaultOptions = {
  queries: {
    // 缓存时间：5分钟
    staleTime: 5 * 60 * 1000,
    // 垃圾回收时间：10分钟
    gcTime: 10 * 60 * 1000,
    // 重试配置
    retry: (failureCount, error) => {
      // 不重试的错误类型
      const noRetryErrors = [
        HTTP_STATUS.BAD_REQUEST,
        HTTP_STATUS.UNAUTHORIZED,
        HTTP_STATUS.FORBIDDEN,
        HTTP_STATUS.NOT_FOUND,
        HTTP_STATUS.CONFLICT,
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
      ];

      if (error instanceof ApiRequestError) {
        return !noRetryErrors.includes(error.status as typeof noRetryErrors[number]) && failureCount < 3;
      }

      // 网络错误重试
      return failureCount < 3;
    },
    // 重试延迟（指数退避）
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    // 失焦时重新获取
    refetchOnWindowFocus: false,
    // 重连时重新获取
    refetchOnReconnect: true,
    // 挂载时重新获取
    refetchOnMount: true,
  },
  mutations: {
    // 变更重试配置（更保守）
    retry: (failureCount, error) => {
      // 仅对网络错误或5xx错误重试
      if (error instanceof ApiRequestError) {
        return error.status >= 500 && failureCount < 2;
      }
      return failureCount < 2;
    },
    // 变更重试延迟
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  },
};

/**
 * 全局错误处理器
 */
function handleGlobalError(error: unknown): void {
  console.error("Query Error:", error);

  if (error instanceof ApiRequestError) {
    switch (error.status) {
      case HTTP_STATUS.UNAUTHORIZED:
        // 401错误：跳转到登录页
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
          window.location.href = "/auth/login";
        }
        break;

      case HTTP_STATUS.FORBIDDEN:
        // 403错误：显示权限不足提示
        console.warn("权限不足：", error.message);
        break;

      case HTTP_STATUS.NOT_FOUND:
        // 404错误：资源不存在
        console.warn("资源不存在：", error.message);
        break;

      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      case HTTP_STATUS.BAD_GATEWAY:
      case HTTP_STATUS.SERVICE_UNAVAILABLE:
        // 5xx错误：系统错误
        console.error("系统错误：", error.message);
        break;

      default:
        console.error("API错误：", error.message);
    }
  }
}

/**
 * 创建QueryClient实例
 */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: defaultQueryOptions,
  });
}

/**
 * 单例QueryClient实例
 * 在客户端复用同一个实例，避免重复创建
 */
let clientQueryClient: QueryClient | undefined = undefined;

export function getQueryClient(): QueryClient {
  if (typeof window !== "undefined") {
    // 客户端：创建单例实例
    if (!clientQueryClient) {
      clientQueryClient = createQueryClient();
    }
    return clientQueryClient;
  } else {
    // 服务端：每次创建新实例
    return createQueryClient();
  }
}

/**
 * QueryKey工厂函数
 * 提供标准化的查询键生成方法
 */
export const queryKeys = {
  // 所有查询的根键
  all: ["api"] as const,
  
  // 用户相关查询
  users: () => [...queryKeys.all, "users"] as const,
  user: (id: string | number) => [...queryKeys.users(), id] as const,
  userProfile: () => [...queryKeys.users(), "profile"] as const,
  
  // 通用列表查询
  list: (resource: string) => [...queryKeys.all, resource] as const,
  listWithFilter: (resource: string, filters: Record<string, unknown>) => 
    [...queryKeys.list(resource), filters] as const,
  
  // 通用详情查询
  detail: (resource: string, id: string | number) => 
    [...queryKeys.list(resource), id] as const,
  
  // 无限查询
  infinite: (resource: string) => [...queryKeys.list(resource), "infinite"] as const,
  infiniteWithFilter: (resource: string, filters: Record<string, unknown>) => 
    [...queryKeys.infinite(resource), filters] as const,
} as const;

/**
 * 常用查询失效操作
 */
export const invalidateQueries = {
  // 失效所有查询
  all: (queryClient: QueryClient) => {
    return queryClient.invalidateQueries({ queryKey: queryKeys.all });
  },
  
  // 失效用户相关查询
  users: (queryClient: QueryClient) => {
    return queryClient.invalidateQueries({ queryKey: queryKeys.users() });
  },
  
  // 失效特定用户查询
  user: (queryClient: QueryClient, id: string | number) => {
    return queryClient.invalidateQueries({ queryKey: queryKeys.user(id) });
  },
  
  // 失效资源列表
  list: (queryClient: QueryClient, resource: string) => {
    return queryClient.invalidateQueries({ queryKey: queryKeys.list(resource) });
  },
  
  // 失效特定资源详情
  detail: (queryClient: QueryClient, resource: string, id: string | number) => {
    return queryClient.invalidateQueries({ queryKey: queryKeys.detail(resource, id) });
  },
} as const;

export default getQueryClient;