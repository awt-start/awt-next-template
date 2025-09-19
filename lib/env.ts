// lib/env.ts

import { z } from "zod";

const ENV_KEYS = {
  NODE_ENV: "NODE_ENV" as const,
  NEXT_PUBLIC_APP_NAME: "NEXT_PUBLIC_APP_NAME" as const,
  NEXT_PUBLIC_API_URL: "NEXT_PUBLIC_API_URL" as const,
  NEXT_STORE_PREFIX: "NEXT_STORE_PREFIX" as const,
  DEV: "development" as const,
  PROD: "production" as const,
  TEST: "test" as const,
} as const;

const envSchema = z.object({
  [ENV_KEYS.NODE_ENV]: z
    .enum(["development", "production", "test"])
    .default("development"),
  [ENV_KEYS.NEXT_PUBLIC_APP_NAME]: z.string(),
  [ENV_KEYS.NEXT_PUBLIC_API_URL]: z.string().optional(),
  [ENV_KEYS.NEXT_STORE_PREFIX]: z.string(),
});

type EnvVariables = z.infer<typeof envSchema>;

// =============================
// 🌐 动态提取所有 NEXT_PUBLIC_ 开头的键（自动同步 ENV_KEYS）
// =============================
type PublicEnvKeys = Extract<keyof EnvVariables, `NEXT_PUBLIC_${string}`>;

// ✅ 客户端安全读取：仅暴露 NEXT_PUBLIC_ 变量，类型安全
export const publicEnv = process.env as unknown as Pick<
  EnvVariables,
  PublicEnvKeys
>;

// =============================
// ⚙️ 服务端安全读取（启动时校验）
// =============================
let parsedEnv: EnvVariables;

try {
  parsedEnv = envSchema.parse(process.env);
} catch (error) {
  console.error("❌ 环境变量校验失败：", error);
  if (error instanceof z.ZodError) {
    error.issues.forEach((err) => {
      const key = err.path[0] as keyof EnvVariables;
      const friendly = Object.values(ENV_KEYS).find((k) => k === key);
      console.error(`  - ${friendly || key}: ${err.message}`);
    });
  }
  process.exit(1);
}

export function getEnv<T extends keyof EnvVariables>(key: T): EnvVariables[T] {
  return parsedEnv[key]; // ✅ 仅限服务端使用
}

// =============================
// 📊 导出所有常量和类型（供其他模块引用）
// =============================
export { ENV_KEYS, type EnvVariables, type PublicEnvKeys };
