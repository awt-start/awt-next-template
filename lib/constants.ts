/**
 * 通用常量工具类（基于 TypeScript Enum）
 * @author hsc
 * @date 2024-08-20
 *
 * 推荐用法：
 * import { UserRole, Status } from '@/lib/constants';
 * console.log(UserRole.Admin); // "admin"
 * Object.values(UserRole) // ['user', 'admin', 'moderator']
 */

// =============================
// 🟢 状态码（Status）
// =============================
export enum Status {
  Active = "active",
  Inactive = "inactive",
  Pending = "pending",
  Deleted = "deleted",
}

// =============================
// 📦 数据来源（Source）
// =============================
export enum Source {
  Web = "web",
  Mobile = "mobile",
  API = "api",
  AdminPanel = "admin-panel",
}

// =============================
// 📅 时间周期（Time Period）
// =============================
export enum TimePeriod {
  Hourly = "hourly",
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
  Yearly = "yearly",
}

// =============================
// 📊 排序方式（Sort Order）
// =============================
export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

// =============================
// 🖼️ 图片格式（Image Format）
// =============================
export enum ImageFormat {
  JPG = "jpg",
  PNG = "png",
  JPEG = "jpeg",
  WEBP = "webp",
  GIF = "gif",
}

// =============================
// 🌐 语言区域（Language）
// =============================
export enum Language {
  ZH = "zh-CN",
  EN = "en-US",
  JA = "ja-JP",
  KO = "ko-KR",
}

// =============================
// 🔧 辅助函数：通用工具（无需实例化）
// =============================

/**
 * 获取枚举的所有值（数组）
 * @param enumObj - 枚举对象
 * @returns 值数组
 */
/**
 * 获取枚举的所有值（数组）
 * @param enumObj - 枚举对象
 * @returns 值数组
 */
export function getEnumValues<T extends Record<string, any>>(
  enumObj: T,
): Array<T[keyof T]> {
  return Object.values(enumObj).filter(
    (value) => typeof value === "string",
  ) as Array<T[keyof T]>;
}

/**
 * 获取枚举的所有键名（key）
 * @param enumObj - 枚举对象
 * @returns 键名数组
 */
export function getEnumKeys<T extends Record<string, any>>(
  enumObj: T,
): Array<keyof T> {
  return Object.keys(enumObj).filter((key) => isNaN(Number(key))) as Array<
    keyof T
  >;
}

/**
 * 根据值查找对应的键名（反向映射）
 * @param enumObj - 枚举对象
 * @param value - 要查找的值
 * @returns 对应的键名或 undefined
 */
export function findEnumKeyByValue<T extends Record<string, any>>(
  enumObj: T,
  value: T[keyof T],
): keyof T | undefined {
  const keys = getEnumKeys(enumObj);
  return keys.find((key) => enumObj[key] === value);
}

/**
 * 验证某个值是否属于该枚举
 * @param enumObj - 枚举对象
 * @param value - 待验证值
 * @returns 是否有效
 */
export function isValidEnumValue<T extends Record<string, any>>(
  enumObj: T,
  value: unknown,
): value is T[keyof T] {
  return getEnumValues(enumObj).includes(value as T[keyof T]);
}

// =============================
// 🚀 导出常用常量集合（推荐在项目中统一使用）
// =============================

export const CONSTANTS = {
  // 状态
  Status,
  // 来源
  Source,
  // 时间周期
  TimePeriod,
  // 排序
  SortOrder,
  // 图片格式
  ImageFormat,
  // 语言
  Language,

  // 工具方法
  getEnumValues,
  getEnumKeys,
  findEnumKeyByValue,
  isValidEnumValue,
} as const;
