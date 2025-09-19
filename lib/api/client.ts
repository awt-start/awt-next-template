/**
 * API客户端服务层
 * 基于fetch API封装，提供统一的HTTP请求接口
 * 支持请求/响应拦截、错误处理、类型安全等特性
 */

// API响应基础类型
export interface ApiResponse<T = unknown> {
  data: T;
  msg?: string;
  code?: string | number;
}

// API错误类型
export interface ApiError {
  message: string;
  code?: string | number;
  status?: number;
  details?: unknown;
}

// 请求配置类型
export interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>;
  timeout?: number;
  skipAuth?: boolean;
}

// HTTP状态码常量
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * 自定义API错误类
 */
export class ApiRequestError extends Error {
  public readonly status: number;
  public readonly code?: string | number;
  public readonly details?: unknown;

  constructor(
    message: string,
    status: number,
    code?: string | number,
    details?: unknown,
  ) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/**
 * 构建查询参数字符串
 */
function buildQueryString(
  params: Record<string, string | number | boolean>,
): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

/**
 * 获取认证令牌
 */
function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;

  // 从localStorage或cookie中获取token
  // 这里需要根据您的认证方案调整
  return localStorage.getItem("auth_token") || null;
}

/**
 * 设置默认请求头
 */
function getDefaultHeaders(skipAuth = false): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // 添加认证头
  if (!skipAuth) {
    const token = getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
}

/**
 * 处理响应数据
 */
async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  let data: unknown;
  try {
    data = isJson ? await response.json() : await response.text();
  } catch (error) {
    throw new ApiRequestError(
      "响应解析失败",
      response.status,
      "PARSE_ERROR",
      error,
    );
  }

  // 处理HTTP错误状态
  if (!response.ok) {
    const errorMessage =
      isJson && data && typeof data === "object" && "msg" in data
        ? (data as { msg: string }).msg
        : `HTTP错误: ${response.status} ${response.statusText}`;

    const errorCode =
      isJson && data && typeof data === "object" && "code" in data
        ? (data as { code: string | number }).code
        : response.status;

    throw new ApiRequestError(errorMessage, response.status, errorCode, data);
  }

  // 如果响应是标准API格式，返回data字段
  if (isJson && data && typeof data === "object" && "data" in data) {
    return (data as ApiResponse<T>).data;
  }

  return data as T;
}

/**
 * 超时控制器
 */
function createTimeoutController(timeout: number): AbortController {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);
  return controller;
}

/**
 * 通用请求函数
 */
async function request<T>(
  endpoint: string,
  config: RequestConfig = {},
): Promise<T> {
  const {
    params,
    timeout = 10000,
    skipAuth = false,
    headers: customHeaders,
    ...restConfig
  } = config;

  // 构建完整URL
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
  const queryString = params ? buildQueryString(params) : "";
  const url = `${baseUrl}${endpoint}${queryString}`;

  // 合并请求头
  const headers = {
    ...getDefaultHeaders(skipAuth),
    ...customHeaders,
  };

  // 超时控制
  const timeoutController = createTimeoutController(timeout);

  try {
    const response = await fetch(url, {
      ...restConfig,
      headers,
      signal: timeoutController.signal,
    });

    return await handleResponse<T>(response);
  } catch (error) {
    // 处理中止错误（超时）
    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiRequestError("请求超时", 408, "TIMEOUT", { timeout });
    }

    // 处理网络错误
    if (error instanceof TypeError) {
      throw new ApiRequestError("网络连接失败", 0, "NETWORK_ERROR", error);
    }

    // 重新抛出API错误
    if (error instanceof ApiRequestError) {
      throw error;
    }

    // 处理其他未知错误
    throw new ApiRequestError("请求失败", 500, "UNKNOWN_ERROR", error);
  }
}

/**
 * API客户端类
 * 提供RESTful API的标准方法
 */
export class ApiClient {
  /**
   * GET请求
   */
  static async get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean>,
    config?: Omit<RequestConfig, "params" | "method">,
  ): Promise<T> {
    return request<T>(endpoint, {
      ...config,
      method: "GET",
      params,
    });
  }

  /**
   * POST请求
   */
  static async post<T, D = unknown>(
    endpoint: string,
    data?: D,
    config?: Omit<RequestConfig, "method" | "body">,
  ): Promise<T> {
    return request<T>(endpoint, {
      ...config,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT请求
   */
  static async put<T, D = unknown>(
    endpoint: string,
    data?: D,
    config?: Omit<RequestConfig, "method" | "body">,
  ): Promise<T> {
    return request<T>(endpoint, {
      ...config,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PATCH请求
   */
  static async patch<T, D = unknown>(
    endpoint: string,
    data?: D,
    config?: Omit<RequestConfig, "method" | "body">,
  ): Promise<T> {
    return request<T>(endpoint, {
      ...config,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE请求
   */
  static async delete<T>(
    endpoint: string,
    config?: Omit<RequestConfig, "method">,
  ): Promise<T> {
    return request<T>(endpoint, {
      ...config,
      method: "DELETE",
    });
  }
}

/**
 * 默认导出API客户端实例
 */
export default ApiClient;
