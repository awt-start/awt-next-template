/**
 * 公共类型定义
 * 项目中通用的类型定义和工具类型
 */

/**
 * 可空类型
 */
export type Nullable<T> = T | null;

/**
 * 可选类型
 */
export type Optional<T> = T | undefined;

/**
 * 非空类型
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * 深度可选类型
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 深度只读类型
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * 深度必需类型
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * 函数类型
 */
export type AnyFunction = (...args: any[]) => any;

/**
 * 异步函数类型
 */
export type AsyncFunction<T = any> = (...args: any[]) => Promise<T>;

/**
 * 构造函数类型
 */
export type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * 键值对类型
 */
export type KeyValue<T = any> = Record<string, T>;

/**
 * 分页参数类型
 */
export interface PaginationParams {
  pageNum: number;
  pageSize: number;
  sort?: string;
  order?: "asc" | "desc";
}

/**
 * 分页响应类型
 */
export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * API 响应类型
 */
export interface ApiResponse<T = any> {
  code: number;
  msg: string;
  data: T;
  timestamp: number;
}

/**
 * 列表响应类型
 */
export interface ListResponse<T> extends ApiResponse<PaginationResult<T>> {}

/**
 * 错误响应类型
 */
export interface ErrorResponse {
  code: number;
  msg: string;
  data?: any;
}

/**
 * 加载状态类型
 */
export type LoadingState = "idle" | "loading" | "success" | "error";

/**
 * 主题类型
 */
export type ThemeMode = "light" | "dark" | "system";

/**
 * 语言类型
 */
export type Language = "zh-CN" | "en-US" | "ja-JP" | "ko-KR";


/**
 * 工具类型：获取数组元素类型
 */
export type ArrayElement<T> = T extends (infer U)[] ? U : never;

/**
 * 工具类型：获取 Promise 返回值类型
 */
export type PromiseType<T> = T extends Promise<infer U> ? U : T;

/**
 * 工具类型：获取函数参数类型
 */
export type Parameters<T extends AnyFunction> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

/**
 * 工具类型：获取函数返回值类型
 */
export type ReturnType<T extends AnyFunction> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;

/**
 * 工具类型：获取对象键类型
 */
export type Keys<T> = keyof T;

/**
 * 工具类型：获取对象值类型
 */
export type Values<T> = T[keyof T];

/**
 * 工具类型：排除 null 和 undefined
 */
export type ExcludeNullish<T> = T extends null | undefined ? never : T;

/**
 * 工具类型：联合类型转交叉类型
 */
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

/**
 * 工具类型：可选键
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * 工具类型：必需键
 */
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

/**
 * 工具类型：提取函数参数为元组
 */
export type Tuple<T extends any[]> = T;

/**
 * 工具类型：创建枚举类型
 */
export type Enum<T extends readonly string[]> = T[number];

/**
 * 工具类型：品牌类型（用于类型安全）
 */
export type Brand<T, B> = T & { __brand: B };

/**
 * 工具类型：确保类型安全的结果
 */
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * 工具类型：异步结果
 */
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

/**
 * 工具类型：事件处理函数
 */
export type EventHandler<T = any> = (event: T) => void;

/**
 * 工具类型：变化处理函数
 */
export type ChangeHandler<T = any> = (value: T) => void;

/**
 * 工具类型：空对象
 */
export type EmptyObject = Record<string, never>;

/**
 * 工具类型：字符串字面量类型
 */
export type StringLiteral<T extends string> = T;

/**
 * 工具类型：数字字面量类型
 */
export type NumberLiteral<T extends number> = T;

/**
 * 工具类型：布尔字面量类型
 */
export type BooleanLiteral<T extends boolean> = T;

/**
 * 工具类型：提取对象的部分属性
 */
export type PickByType<T, U> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends U ? K : never;
  }[keyof T]
>;

/**
 * 工具类型：排除对象的部分属性
 */
export type OmitByType<T, U> = Omit<
  T,
  {
    [K in keyof T]: T[K] extends U ? K : never;
  }[keyof T]
>;

/**
 * 常用常量
 */
export const CONSTANTS = {
  EMPTY_STRING: "",
  EMPTY_ARRAY: [] as const,
  EMPTY_OBJECT: {} as const,
  ZERO: 0 as const,
  TRUE: true as const,
  FALSE: false as const,
} as const;
