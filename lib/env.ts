/**
 * 环境变量安全读取工具
 * 提取常量、启动时校验、类型安全访问
 */

import { z } from "zod";

// =============================
// 📦 环境变量键名常量（推荐提取）
// =============================
const ENV_KEYS = {
  NODE_ENV: "NODE_ENV" as const,
  NEXT_PUBLIC_APP_NAME: "NEXT_PUBLIC_APP_NAME" as const,
  NEXT_STORE_PREFIX: "NEXT_STORE_PREFIX" as const,
  /* 常量 */
  DEV: "development" as const,
  PROD: "production" as const,
  TEST: "test" as const,
} as const;

// =============================
// 🧩 环境变量 Schema 定义
// =============================
const envSchema = z.object({
  [ENV_KEYS.NODE_ENV]: z
    .enum(["development", "production", "test"])
    .default("development"),
  [ENV_KEYS.NEXT_PUBLIC_APP_NAME]: z.string(),
  [ENV_KEYS.NEXT_STORE_PREFIX]: z.string(),
});

// 类型定义：从 schema 推导出完整类型
type EnvVariables = z.infer<typeof envSchema>;

// =============================
// ⚙️ 启动时一次性校验环境变量
// =============================
let parsedEnv: EnvVariables;

try {
  parsedEnv = envSchema.parse(process.env);
} catch (error) {
  console.error("❌ 环境变量校验失败，请检查 .env 文件：", error);
  if (error instanceof z.ZodError) {
    error.issues.forEach((err) => {
      const key = err.path[0] as keyof EnvVariables;
      const friendlyName = Object.values(ENV_KEYS).find((k) => k === key);
      console.error(`  - ${friendlyName || key} : ${err.message}`);
    });
  }
  process.exit(1); // 启动失败，快速暴露问题
}

// =============================
// 🔐 安全获取环境变量（无运行时校验，高性能）
// =============================
export function getEnv<T extends keyof EnvVariables>(key: T): EnvVariables[T] {
  return parsedEnv[key];
}

// =============================
// 🌐 常用辅助函数（基于 getEnv）
// =============================
export function isDev(): boolean {
  return getEnv(ENV_KEYS.NODE_ENV) === ENV_KEYS.DEV;
}

export function isProd(): boolean {
  return getEnv(ENV_KEYS.NODE_ENV) === ENV_KEYS.PROD;
}

// =============================
// 📊 可选：导出原始环境对象（用于调试或日志）
// =============================
export { parsedEnv as env };

// =============================
// 🧭 导出所有键名常量（供其他模块引用）
// =============================
export { ENV_KEYS, type EnvVariables };
