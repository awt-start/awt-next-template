// src/lib/api/hooks/authHooks.ts

import { useApiMutation, useApiQuery } from '@/lib/api';
import { CaptchaResponse } from './auth-type';

/**
 * 发送短信验证码 Hook
 * 使用 useApiMutation，因为是“触发行为”，非数据获取
 */
export function useSendSmsCode(phonenumber: string) {
  return useApiQuery<void>({
    endpoint: '/resource/sms/code',
    params: { phonenumber },
  })
}

/**
 * 发送邮箱验证码 Hook
 */
export function useSendEmailCode(email:string) {
   return useApiQuery<void>({
    endpoint: '/resource/sms/code',
    params: { email },
  })
}

/**
 * 获取图片验证码 Hook
 * 使用 useApiQuery，因为是获取资源数据，但禁用自动请求，需手动 refetch
 */
export function useCaptchaImage() {
  return useApiQuery<CaptchaResponse>({
    endpoint: '/resource/captcha',
  })}