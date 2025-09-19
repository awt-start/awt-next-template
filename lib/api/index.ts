/**
 * TanStack Query API 模块统一导出
 * 提供所有Query相关的类型、函数和组件的便捷导入
 */

// 核心客户端
export { ApiClient, ApiRequestError, HTTP_STATUS } from "./client";
export type { ApiResponse, ApiError, RequestConfig } from "./client";

// Query配置和管理
export { 
  createQueryClient, 
  getQueryClient, 
  queryKeys, 
  invalidateQueries 
} from "./query-client";

// Query Provider组件
export { QueryProvider } from "./query-provider";

// 通用Hooks
export {
  useApiQuery,
  useApiMutation,
  useUserQueries,
  useUserMutations,
  useQueryManager,
} from "./hooks";

export type {
  ApiQueryParams,
  UseApiQueryOptions,
  UseApiMutationOptions,
} from "./hooks";

// 示例组件（仅用于开发和演示）
export { 
  TanStackQueryExamples,
  BasicQueryExample,
  UserQueriesExample, 
  UserMutationsExample 
} from "./examples";