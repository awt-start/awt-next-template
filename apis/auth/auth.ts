// src/lib/api/hooks/authHooks.ts

import { ApiRequestError, useApiMutation, useApiQuery } from "@/lib/api";
import { CaptchaResponse } from "./auth-type";

export const useCaptcha = {
  /**
   * 发送短信验证码 Hook
   * 使用 useApiMutation，因为是“触发行为”，非数据获取
   */
  useSendSmsCode(phonenumber: string) {
    return useApiQuery<void>({
      endpoint: "/resource/sms/code",
      params: { phonenumber },
    });
  },

  /**
   * 发送邮箱验证码 Hook
   */
  useSendEmailCode(email: string) {
    return useApiQuery<void>({
      endpoint: "/resource/sms/code",
      params: { email },
    });
  },

  /**
   * 获取图片验证码 Hook
   * 使用 useApiQuery，因为是获取资源数据，但禁用自动请求，需手动 refetch
   */
  useCaptchaImage() {
    return useApiQuery<CaptchaResponse>({
      endpoint: "/resource/captcha",
    });
  },
};


export const useAuth={

   /**
     * 处理登录
     */
    login: (
      options?: {
      onSuccess?: (data: any) => void;
      onError?: (error: ApiRequestError) => void;
    }) =>{
      return useApiMutation<
        any,
        ApiRequestError
      >({
        endpoint: "/auth/login",
        method: "POST",
        onSuccess: (data) => {
          options?.onSuccess?.(data);
        },
        onError: options?.onError,
      })
    },

    /**
     * 处理登出
     */
    logout: (options?: {
      onSuccess?: (data: any) => void;
      onError?: (error: ApiRequestError) => void;
    }) =>{
      return useApiMutation<
        any,
        ApiRequestError,
        {}
      >({
        endpoint: "/auth/logout",
        method: "POST",
        onSuccess: (data) => {
          options?.onSuccess?.(data);
        }
      })
    },

}