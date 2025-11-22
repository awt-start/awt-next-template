/**
 * TanStack Query通用Hooks封装
 * 提供类型安全的useApiQuery和useApiMutation
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
} from "@tanstack/react-query";
import { ApiClient, ApiRequestError } from "@/lib/api/client";
import { queryKeys } from "@/lib/api/query-client";
import { handleApiError } from "@/lib/api/response-handler";

// 通用API查询参数类型
export interface ApiQueryParams {
  [key: string]: string | number | boolean;
}

// useApiQuery选项类型
export interface UseApiQueryOptions<TData, TError = ApiRequestError>
  extends Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn"> {
  endpoint: string;
  params?: ApiQueryParams;
  queryKey?: QueryKey;
}

// useApiMutation选项类型
export interface UseApiMutationOptions<
  TData,
  TError = ApiRequestError,
  TVariables = unknown,
> extends Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn"> {
  endpoint: string;
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
}

/**
 * 通用API查询Hook
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useApiQuery<User[]>({
 *   endpoint: "/users",
 *   params: { page: 1, limit: 10 },
 *   queryKey: ["users", { page: 1, limit: 10 }],
 * });
 * ```
 */
export function useApiQuery<TData = unknown, TError = ApiRequestError>({
  endpoint,
  params,
  queryKey,
  ...options
}: UseApiQueryOptions<TData, TError>) {
  // 生成默认queryKey
  const defaultQueryKey = queryKey || [endpoint, params].filter(Boolean);

  return useQuery<TData, TError>({
    queryKey: defaultQueryKey,
    queryFn: () => ApiClient.get<TData>(endpoint, params),
    ...options,
  });
}

/**
 * 通用API变更Hook
 *
 * @example
 * ```tsx
 * const createUser = useApiMutation<User, ApiRequestError, CreateUserData>({
 *   endpoint: "/users",
 *   method: "POST",
 *   onSuccess: (data) => {
 *     console.log("用户创建成功:", data);
 *     // 重新获取用户列表
 *     queryClient.invalidateQueries({ queryKey: ["users"] });
 *   },
 *   onError: (error) => {
 *     console.error("用户创建失败:", error.message);
 *   },
 * });
 *
 * // 使用
 * createUser.mutate({ name: "张三", email: "zhangsan@awt0204.shop" });
 * ```
 */
export function useApiMutation<
  TData = unknown,
  TError = ApiRequestError,
  TVariables = unknown,
>({
  endpoint,
  method = "POST",
  onError,
  ...options
}: UseApiMutationOptions<TData, TError, TVariables>) {
  return useMutation<TData, TError, TVariables>({
    mutationFn: (variables: TVariables) => {
      switch (method) {
        case "POST":
          return ApiClient.post<TData, TVariables>(endpoint, variables);
        case "PUT":
          return ApiClient.put<TData, TVariables>(endpoint, variables);
        case "PATCH":
          return ApiClient.patch<TData, TVariables>(endpoint, variables);
        case "DELETE":
          return ApiClient.delete<TData>(endpoint);
        default:
          throw new Error(`不支持的HTTP方法: ${method}`);
      }
    },
    onError: (error: TError, variables: TVariables, context) => {
      // 调用自定义错误处理
      if (onError) {
        onError(error, variables, context);
      } else {
        // 默认错误处理
        handleApiError(error);
      }
    },
    ...options,
  });
}

/**
 * 用户相关查询Hooks
 */
export const useUserQueries = {
  /**
   * 获取用户列表
   */
  list: (params?: { page?: number; limit?: number; search?: string }) =>
    useApiQuery<{
      users: Array<{
        id: string;
        name: string;
        email: string;
        avatar?: string;
        role: string;
        createdAt: string;
      }>;
      total: number;
      page: number;
      limit: number;
    }>({
      endpoint: "/users",
      params,
      queryKey: queryKeys.listWithFilter("users", params || {}),
      staleTime: 2 * 60 * 1000, // 2分钟
    }),

  /**
   * 获取用户详情
   */
  detail: (id: string) =>
    useApiQuery<{
      id: string;
      name: string;
      email: string;
      avatar?: string;
      role: string;
      profile: {
        bio?: string;
        location?: string;
        website?: string;
      };
      createdAt: string;
      updatedAt: string;
    }>({
      endpoint: `/users/${id}`,
      queryKey: queryKeys.detail("users", id),
      enabled: !!id,
    }),

  /**
   * 获取当前用户信息
   */
  profile: () =>
    useApiQuery<{
      id: string;
      name: string;
      email: string;
      avatar?: string;
      role: string;
      profile: {
        bio?: string;
        location?: string;
        website?: string;
      };
      preferences: {
        theme: "light" | "dark" | "system";
        language: string;
        notifications: boolean;
      };
    }>({
      endpoint: "/users/profile",
      queryKey: queryKeys.userProfile(),
      staleTime: 5 * 60 * 1000, // 5分钟
    }),
};

/**
 * 用户相关变更Hooks
 */
export const useUserMutations = {
  /**
   * 创建用户
   */
  create: (options?: {
    onSuccess?: (data: any) => void;
    onError?: (error: ApiRequestError) => void;
  }) => {
    const queryClient = useQueryClient();

    return useApiMutation<
      { id: string; name: string; email: string },
      ApiRequestError,
      { name: string; email: string; password: string; role?: string }
    >({
      endpoint: "/users",
      method: "POST",
      onSuccess: (data) => {
        // 自动失效用户列表查询
        queryClient.invalidateQueries({ queryKey: queryKeys.users() });
        options?.onSuccess?.(data);
      },
      onError: options?.onError,
    });
  },

  /**
   * 更新用户
   */
  update: (options?: {
    onSuccess?: (data: any) => void;
    onError?: (error: ApiRequestError) => void;
  }) => {
    const queryClient = useQueryClient();

    return useApiMutation<
      { id: string; name: string; email: string },
      ApiRequestError,
      { id: string; name?: string; email?: string; role?: string }
    >({
      endpoint: "/users",
      method: "PUT",
      onSuccess: (data, variables) => {
        // 失效相关查询
        queryClient.invalidateQueries({ queryKey: queryKeys.users() });
        queryClient.invalidateQueries({
          queryKey: queryKeys.user(variables.id),
        });
        options?.onSuccess?.(data);
      },
      onError: options?.onError,
    });
  },

  /**
   * 删除用户
   */
  delete: (options?: {
    onSuccess?: () => void;
    onError?: (error: ApiRequestError) => void;
  }) => {
    const queryClient = useQueryClient();

    return useMutation<void, ApiRequestError, string>({
      mutationFn: (userId: string) => ApiClient.delete(`/users/${userId}`),
      onSuccess: (_, userId) => {
        // 失效相关查询
        queryClient.invalidateQueries({ queryKey: queryKeys.users() });
        queryClient.removeQueries({ queryKey: queryKeys.user(userId) });
        options?.onSuccess?.();
      },
      onError: options?.onError,
    });
  },

  /**
   * 更新用户资料
   */
  updateProfile: (options?: {
    onSuccess?: (data: any) => void;
    onError?: (error: ApiRequestError) => void;
  }) => {
    const queryClient = useQueryClient();

    return useApiMutation<
      any,
      ApiRequestError,
      {
        name?: string;
        bio?: string;
        location?: string;
        website?: string;
        avatar?: string;
      }
    >({
      endpoint: "/users/profile",
      method: "PATCH",
      onSuccess: (data) => {
        // 失效用户资料查询
        queryClient.invalidateQueries({ queryKey: queryKeys.userProfile() });
        options?.onSuccess?.(data);
      },
      onError: options?.onError,
    });
  },
};

/**
 * 通用查询管理Hook
 * 提供常用的查询操作方法
 */
export function useQueryManager() {
  const queryClient = useQueryClient();

  return {
    /**
     * 失效所有查询
     */
    invalidateAll: () => {
      return queryClient.invalidateQueries();
    },

    /**
     * 失效指定查询
     */
    invalidate: (queryKey: QueryKey) => {
      return queryClient.invalidateQueries({ queryKey });
    },

    /**
     * 移除指定查询
     */
    remove: (queryKey: QueryKey) => {
      return queryClient.removeQueries({ queryKey });
    },

    /**
     * 设置查询数据
     */
    setData: <T>(queryKey: QueryKey, data: T) => {
      return queryClient.setQueryData(queryKey, data);
    },

    /**
     * 获取查询数据
     */
    getData: <T>(queryKey: QueryKey): T | undefined => {
      return queryClient.getQueryData<T>(queryKey);
    },

    /**
     * 预取查询数据
     */
    prefetch: <T>(
      queryKey: QueryKey,
      queryFn: () => Promise<T>,
      options?: { staleTime?: number },
    ) => {
      return queryClient.prefetchQuery({
        queryKey,
        queryFn,
        staleTime: options?.staleTime || 5 * 60 * 1000, // 默认5分钟
      });
    },
  };
}
