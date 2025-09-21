/**
 * @param img 图片验证码 需要和base64拼接
 * @param captchaEnabled 是否开启
 * @param uuid 验证码ID
 */
export interface CaptchaResponse {
  captchaEnabled: boolean;
  img: string;
  uuid: string;
}

/**
 * 登录类型
 * password 密码
 * sms 短信
 * social 第三方oauth
 * email 邮箱
 * xcx 小程序
 */
export type GrantType = "email" | "password" | "sms" | "social" | "xcx";

export namespace AuthApi {
  /**
   * @description: 所有登录类型都需要用到的
   * @param clientId 客户端ID 这里为必填项 但是在loginApi内部处理了 所以为可选
   * @param grantType 授权/登录类型
   * @param tenantId 租户id
   */
  export interface BaseLoginParams {
    clientId?: string;
    grantType: GrantType;
    tenantId: string;
  }

  /**
   * @description: oauth登录需要用到的参数
   * @param socialCode 第三方参数
   * @param socialState 第三方参数
   * @param source 与后端的 justauth.type.xxx的回调地址的source对应
   */
  export interface OAuthLoginParams extends BaseLoginParams {
    socialCode: string;
    socialState: string;
    source: string;
  }

  /**
   * @description: 验证码登录需要用到的参数
   * @param code 验证码 可选(未开启验证码情况)
   * @param uuid 验证码ID 可选(未开启验证码情况)
   * @param username 用户名
   * @param password 密码
   */
   export interface SimpleLoginParams extends BaseLoginParams {
    code?: string;
    uuid?: string;
    username: string;
    password: string;
  }

  export type LoginParams = OAuthLoginParams | SimpleLoginParams;

  /** 用户信息 */
  export interface UserInfo {
    userId: number;
    tenantId: string;
    deptId: number;
    userName: string;
    nickName: string;
    userType: string;
    email: string;
    phonenumber: string;
    sex: string;
    avatar: string | null;
    status: string;
    loginIp: string;
    loginDate: string;
    remark: string;
    createTime: string;
    deptName: string;
    roles: Role[];
    roleIds?: number[] | null;
    postIds?: number[] | null;
    roleId?: number | null;
  }

  /** 角色信息 */
  export interface Role {
    roleId: number;
    roleName: string;
    roleKey: string;
    roleSort: number;
    dataScope: string;
    menuCheckStrictly?: boolean | null;
    deptCheckStrictly?: boolean | null;
    status: string;
    remark?: string | null;
    createTime?: string | null;
    flag: boolean;
    superAdmin: boolean;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    access_token: string;
    refresh_token: string;
    client_id: string;
    expire_in: number;
  }

  /** 用户信息接口返回值 */
  export interface UserInfoResult {
    user: UserInfo;
    permissions: string[];
    roles: string[];
  }

   interface RefreshTokenResult {
    data: string;
    status: number;
  }

   interface TenantOption {
  companyName: string;
  domain?: string;
  tenantId: string;
}

/**
 * @param tenantEnabled 是否启用租户
 * @param voList 租户列表
 */
 interface TenantResp {
  tenantEnabled: boolean;
  voList: TenantOption[];
}
}
