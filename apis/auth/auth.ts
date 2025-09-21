// Ruoyi-Plus认证API

import { useApiMutation, useApiQuery } from "@/lib/api/hooks";
import { ApiRequestError } from "@/lib/api/client";
import { CaptchaResponse, AuthApi } from "./auth-type";
import { storage, STORAGE_KEYS } from "@/lib/storage";

/**
 * 验证码相关API
 */
export const useCaptcha = {
  /**
   * 发送短信验证码 Hook
   * 使用 useApiMutation，因为是"触发行为"，非数据获取
   */
  useSendSmsCode() {
    return useApiMutation<void, ApiRequestError, { phonenumber: string }>({
      endpoint: "/resource/sms/code",
      method: "POST",
    });
  },

  /**
   * 发送邮箱验证码 Hook
   */
  useSendEmailCode() {
    return useApiMutation<void, ApiRequestError, { email: string }>({
      endpoint: "/resource/email/code",
      method: "POST",
    });
  },

  /**
   * 获取图片验证码 Hook
   * 使用 useApiQuery，因为是获取资源数据
   */
  useCaptchaImage() {
    return useApiQuery<CaptchaResponse>({
      endpoint: "/auth/code",
      queryKey: ["captcha"],
      staleTime: 0, // 验证码不缓存
      gcTime: 0,
    });
  },
};

/**
 * 认证相关API
 */
export const useAuth = {
  /**
   * 用户登录
   */
  login(options?: {
    onSuccess?: (data: AuthApi.LoginResult) => void;
    onError?: (error: ApiRequestError) => void;
  }) {
    return useApiMutation<
      AuthApi.LoginResult,
      ApiRequestError,
      AuthApi.SimpleLoginParams
    >({
      endpoint: "/auth/pc-login",
      method: "POST",
      onSuccess: (data) => {
        // 自动保存token到请求头
        if (data.access_token) {
          // 这里可以设置全局请求头，在API client中处理
        }
        options?.onSuccess?.(data);
      },
      onError: options?.onError,
    });
  },

  /**
   * 用户登出
   */
  logout(options?: {
    onSuccess?: (data: any) => void;
    onError?: (error: ApiRequestError) => void;
  }) {
    return useApiMutation<any, ApiRequestError, {}>(
      {
        endpoint: "/auth/logout",
        method: "POST",
        onSuccess: (data) => {
          // 清除本地存储的token
          storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
          storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
          storage.removeItem(STORAGE_KEYS.USER_INFO);
          storage.removeItem(STORAGE_KEYS.PERMISSIONS);
          storage.removeItem(STORAGE_KEYS.ROLES);
          options?.onSuccess?.(data);
        },
        onError: options?.onError,
      }
    );
  },

  /**
   * 刷新Token
   */
  refreshToken(options?: {
    onSuccess?: (data: AuthApi.RefreshTokenResult) => void;
    onError?: (error: ApiRequestError) => void;
  }) {
    return useApiMutation<
      AuthApi.RefreshTokenResult,
      ApiRequestError,
      { refresh_token: string }
    >({
      endpoint: "/auth/refresh",
      method: "POST",
      onSuccess: options?.onSuccess,
      onError: options?.onError,
    });
  },

  /**
   * 获取当前用户信息
   */
  useUserInfo() {
    return useApiQuery<AuthApi.UserInfoResult>({
      endpoint: "/system/user/getInfo",
      queryKey: ["userInfo"],
      staleTime: 5 * 60 * 1000, // 5分钟内不重新请求
    });
  },

  /**
   * 获取用户权限
   */
  useUserPermissions() {
    const accessToken = storage.getItem<string>(STORAGE_KEYS.ACCESS_TOKEN);
    
    return useApiQuery<{ permissions: string[]; roles: string[] }>({
      endpoint: "/system/user/permissions",
      queryKey: ["userPermissions"],
      enabled: !!accessToken,
      staleTime: 10 * 60 * 1000, // 10分钟内不重新请求
    });
  },

  /**
   * 获取租户列表
   */
  useTenantList() {
    return useApiQuery<AuthApi.TenantResp>({
      endpoint: "/auth/tenant/list",
      queryKey: ["tenantList"],
      staleTime: 30 * 60 * 1000, // 30分钟内不重新请求
    });
  },
};