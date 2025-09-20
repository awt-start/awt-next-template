export interface DictData {
  createBy: string;
  createTime: string;
  cssClass: string;
  default: boolean;
  dictCode: number;
  dictLabel: string;
  dictSort: number;
  dictType: string;
  dictValue: string;
  isDefault: string;
  listClass: string;
  remark: string;
  status: string;
  updateBy?: any;
  updateTime?: any;
}


const DictType = {
  USER_SEX: 'sys_user_sex',
  USER_STATUS: 'sys_user_status',
} as const;

export type DictTypeValue = typeof DictType[keyof typeof DictType]; // "sys_user_sex" | "sys_user_status"

// 品牌类型：标记为 DictType 的字符串（仅用于类型系统）
export type DictTypeKey = DictTypeValue & { __brand: 'DictType' };

// 工厂函数：创建带品牌的安全值（运行时）
export function createDictKey<K extends DictTypeValue>(value: K): DictTypeKey {
  return value as DictTypeKey;
}

// 类型守卫：判断一个字符串是否是合法的 DictTypeKey
export function isDictTypeKey(value: string): value is DictTypeKey {
  return Object.values(DictType).includes(value as any);
}

// ✅ 你的最终类型：允许 DictTypeKey 或任意字符串
export type DictType = DictTypeKey | string;

