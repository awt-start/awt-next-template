/**
 * API响应处理工具
 * 统一处理API响应和错误
 */

import { toast } from "sonner";
import { ApiRequestError } from "./client";

/**
 * 处理API响应结果
 * @param result - API调用结果
 * @param options - 处理选项
 */
export function handleApiResponse<T>(
  result: T,
  options?: {
    successMessage?: string;
    errorMessage?: string;
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
  }
): T {
  const { successMessage, showSuccessToast = true } = options || {};

  if (showSuccessToast && successMessage) {
    toast.success(successMessage);
  }

  return result;
}

/**
 * 处理API错误
 * @param error - 错误对象
 * @param options - 处理选项
 */
export function handleApiError(
  error: unknown,
  options?: {
    defaultMessage?: string;
    showDefaultError?: boolean;
    onUnauthorized?: () => void;
    onError?: (error: ApiRequestError) => void;
  }
): void {
  const { 
    defaultMessage = "操作失败", 
    showDefaultError = true, 
    onUnauthorized, 
    onError 
  } = options || {};

  let message = defaultMessage;
  let status: number | undefined;

  if (error instanceof ApiRequestError) {
    status = error.status;
    
    // 处理特定状态码
    switch (status) {
      case 401:
        message = "登录已过期，请重新登录";
        if (onUnauthorized) {
          onUnauthorized();
        }
        break;
      case 403:
        message = "没有权限执行此操作";
        break;
      case 404:
        message = "请求的资源不存在";
        break;
      case 500:
        message = "服务器内部错误";
        break;
      case 408: // 请求超时
        message = "请求超时，请稍后重试";
        break;
      default:
        message = error.message || defaultMessage;
    }

    onError?.(error);
  } else if (error instanceof Error) {
    message = error.message;
  }

  if (showDefaultError) {
    toast.error(message);
  }
}

/**
 * 安全执行API调用
 * @param apiCall - API调用函数
 * @param options - 选项
 */
export async function safeApiCall<T>(
  apiCall: () => Promise<T>,
  options?: {
    successMessage?: string;
    defaultMessage?: string;
    showSuccessToast?: boolean;
    showDefaultError?: boolean;
    onUnauthorized?: () => void;
    onSuccess?: (data: T) => void;
    onError?: (error: ApiRequestError) => void;
  }
): Promise<T | null> {
  try {
    const result = await apiCall();
    
    // 处理成功响应
    handleApiResponse(result, {
      successMessage: options?.successMessage,
      showSuccessToast: options?.showSuccessToast,
    });
    
    options?.onSuccess?.(result);
    
    return result;
  } catch (error) {
    // 处理错误
    handleApiError(error, {
      defaultMessage: options?.defaultMessage,
      showDefaultError: options?.showDefaultError,
      onUnauthorized: options?.onUnauthorized,
      onError: options?.onError,
    });
    
    return null;
  }
}

/**
 * 带重试机制的API调用
 * @param apiCall - API调用函数
 * @param maxRetries - 最大重试次数
 * @param retryDelay - 重试延迟（毫秒）
 */
export async function retryApiCall<T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 3,
  retryDelay: number = 1000
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      
      // 如果是最后一次尝试，抛出错误
      if (attempt === maxRetries) {
        break;
      }

      // 对于网络错误或超时错误，等待后重试
      if (error instanceof ApiRequestError) {
        if (error.status === 0 || error.status === 408 || error.status >= 500) {
          console.warn(`API调用失败，第${attempt + 1}次重试...`, error);
          await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt))); // 指数退避
          continue;
        }
      }

      // 对于其他错误，不重试
      break;
    }
  }

  throw lastError;
}