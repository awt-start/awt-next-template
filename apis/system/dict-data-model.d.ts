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
  USER_SEX: "sys_user_sex",
  USER_STATUS: "sys_user_status",
} as const;

export type DictTypeValue = (typeof DictType)[keyof typeof DictType]; // "sys_user_sex" | "sys_user_status"

// 品牌类型：标记为 DictType 的字符串（仅用于类型系统）
export type DictTypeKey = DictTypeValue & { __brand: "DictType" };

export type DictType = DictTypeKey | string;
