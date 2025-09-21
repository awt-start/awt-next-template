// lib/env.ts

const ENV_KEYS = {
  NODE_ENV: "NODE_ENV" as const,
  NEXT_PUBLIC_APP_NAME: "NEXT_PUBLIC_APP_NAME" as const,
  NEXT_PUBLIC_API_URL: "NEXT_PUBLIC_API_URL" as const,
  NEXT_STORE_PREFIX: "NEXT_PUBLIC_STORE_PREFIX" as const,
  NEXT_PUBLIC_BASE_URL: "NEXT_PUBLIC_BASE_URL" as const,
  NEXT_PUBLIC_APP_CLIENT_ID: "NEXT_PUBLIC_APP_CLIENT_ID" as const,
  NEXT_PUBLIC_SSE_ENABLE: "NEXT_PUBLIC_SSE_ENABLE" as const,
  NEXT_PUBLIC_ENABLE_ENCRYPT: "NEXT_PUBLIC_ENABLE_ENCRYPT" as const,
  NEXT_PUBLIC_RSA_PUBLIC_KEY: "NEXT_PUBLIC_RSA_PUBLIC_KEY" as const,
  NEXT_PUBLIC_RSA_PRIVATE_KEY: "NEXT_PUBLIC_RSA_PRIVATE_KEY" as const,
  DEV: "development" as const,
  PROD: "production" as const,
  TEST: "test" as const,
} as const;

// =============================
// ✅ 定义环境变量类型（仅用于类型安全，不进行运行时校验）
// =============================
type EnvVariables = {
  [ENV_KEYS.NODE_ENV]?: string; // 可选，生产中通常由框架设置
  [ENV_KEYS.NEXT_PUBLIC_APP_NAME]: string;
  [ENV_KEYS.NEXT_PUBLIC_API_URL]?: string;
  [ENV_KEYS.NEXT_STORE_PREFIX]: string;
  [ENV_KEYS.NEXT_PUBLIC_ENABLE_ENCRYPT]?: string; // 字符串形式，由业务自行解析
  [ENV_KEYS.NEXT_PUBLIC_RSA_PUBLIC_KEY]: string;
  [ENV_KEYS.NEXT_PUBLIC_RSA_PRIVATE_KEY]: string;
  [ENV_KEYS.NEXT_PUBLIC_BASE_URL]: string;
  [ENV_KEYS.NEXT_PUBLIC_APP_CLIENT_ID]: string;
};

// =============================
// 🌐 动态提取所有 NEXT_PUBLIC_ 开头的键（自动同步 ENV_KEYS）
// =============================
type PublicEnvKeys = Extract<keyof EnvVariables, `NEXT_PUBLIC_${string}`>;

// =============================
// ⚙️ 服务端安全读取（仅封装访问，无校验）
// =============================
export function getEnv<T extends keyof EnvVariables>(key: T): EnvVariables[T] {
  return process.env[key] as EnvVariables[T];
}

// =============================
// 📊 导出所有常量和类型（供其他模块引用）
// =============================
export { ENV_KEYS, type EnvVariables, type PublicEnvKeys };

// ✅ 客户端安全读取：仅暴露 NEXT_PUBLIC_ 变量，类型安全
export const publicEnv = process.env as unknown as Pick<
  EnvVariables,
  PublicEnvKeys
>;
