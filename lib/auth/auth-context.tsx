/**
 * 认证状态管理 Context
 * 基于Ruoyi-Plus后端接口的认证状态管理
 */

"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { AuthApi } from "@/apis/auth/auth-type";
import { storage, STORAGE_KEYS } from "@/lib/storage";

// 认证状态类型定义
interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthApi.UserInfo | null;
  accessToken: string | null;
  refreshToken: string | null;
  permissions: string[];
  roles: string[];
  error: string | null;
}

// 认证操作类型
type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: AuthApi.LoginResult }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "RESTORE_AUTH"; payload: Partial<AuthState> }
  | { type: "UPDATE_USER"; payload: AuthApi.UserInfo }
  | { type: "CLEAR_ERROR" };

// 初始状态
const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true, // 初始化时设为true，等待恢复认证状态
  user: null,
  accessToken: null,
  refreshToken: null,
  permissions: [],
  roles: [],
  error: null,
};

// 状态reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user_info,
        accessToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
        permissions: action.payload.permissions,
        roles: action.payload.roles,
        error: null,
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        accessToken: null,
        refreshToken: null,
        permissions: [],
        roles: [],
        error: action.payload,
      };

    case "LOGOUT":
      return {
        ...initialState,
        isLoading: false,
      };

    case "RESTORE_AUTH":
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };

    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// Context类型定义
interface AuthContextType extends AuthState {
  login: (result: AuthApi.LoginResult) => void;
  logout: () => void;
  clearError: () => void;
  updateUser: (user: AuthApi.UserInfo) => void;
  checkPermission: (permission: string) => boolean;
  checkRole: (role: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
}

// 创建Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider组件
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 登录成功处理
  const login = useCallback((result: AuthApi.LoginResult) => {
    // 保存到本地存储
    storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, result.access_token);
    storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, result.refresh_token);
    storage.setItem(STORAGE_KEYS.USER_INFO, result.user_info);
    storage.setItem(STORAGE_KEYS.PERMISSIONS, result.permissions);
    storage.setItem(STORAGE_KEYS.ROLES, result.roles);

    // 更新状态
    dispatch({ type: "LOGIN_SUCCESS", payload: result });
  }, []);

  // 登出处理
  const logout = useCallback(() => {
    // 清除本地存储
    storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    storage.removeItem(STORAGE_KEYS.USER_INFO);
    storage.removeItem(STORAGE_KEYS.PERMISSIONS);
    storage.removeItem(STORAGE_KEYS.ROLES);

    // 更新状态
    dispatch({ type: "LOGOUT" });
  }, []);

  // 清除错误
  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  // 更新用户信息
  const updateUser = useCallback((user: AuthApi.UserInfo) => {
    storage.setItem(STORAGE_KEYS.USER_INFO, user);
    dispatch({ type: "UPDATE_USER", payload: user });
  }, []);

  // 权限检查函数
  const checkPermission = useCallback(
    (permission: string): boolean => {
      return state.permissions.includes(permission);
    },
    [state.permissions]
  );

  // 角色检查函数
  const checkRole = useCallback(
    (role: string): boolean => {
      return state.roles.includes(role);
    },
    [state.roles]
  );

  // 检查是否拥有任一权限
  const hasAnyPermission = useCallback(
    (permissions: string[]): boolean => {
      return permissions.some(permission => state.permissions.includes(permission));
    },
    [state.permissions]
  );

  // 检查是否拥有任一角色
  const hasAnyRole = useCallback(
    (roles: string[]): boolean => {
      return roles.some(role => state.roles.includes(role));
    },
    [state.roles]
  );

  // 初始化时恢复认证状态
  useEffect(() => {
    const restoreAuthState = () => {
      try {
        const accessToken = storage.getItem<string>(STORAGE_KEYS.ACCESS_TOKEN);
        const refreshToken = storage.getItem<string>(STORAGE_KEYS.REFRESH_TOKEN);
        const userInfo = storage.getItem<AuthApi.UserInfo>(STORAGE_KEYS.USER_INFO);
        const permissions = storage.getItem<string[]>(STORAGE_KEYS.PERMISSIONS, []) || [];
        const roles = storage.getItem<string[]>(STORAGE_KEYS.ROLES, []) || [];

        if (accessToken && userInfo) {
          dispatch({
            type: "RESTORE_AUTH",
            payload: {
              isAuthenticated: true,
              user: userInfo,
              accessToken,
              refreshToken,
              permissions,
              roles,
            },
          });
        } else {
          dispatch({
            type: "RESTORE_AUTH",
            payload: {
              isAuthenticated: false,
            },
          });
        }
      } catch (error) {
        console.error("Failed to restore auth state:", error);
        dispatch({
          type: "RESTORE_AUTH",
          payload: {
            isAuthenticated: false,
          },
        });
      }
    };

    restoreAuthState();
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    clearError,
    updateUser,
    checkPermission,
    checkRole,
    hasAnyPermission,
    hasAnyRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// useAuth Hook
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// 权限组件 - 基于权限显示内容
interface PermissionGuardProps {
  permissions?: string[];
  roles?: string[];
  fallback?: ReactNode;
  requireAll?: boolean; // 是否需要全部权限/角色
  children: ReactNode;
}

export function PermissionGuard({
  permissions = [],
  roles = [],
  fallback = null,
  requireAll = false,
  children,
}: PermissionGuardProps) {
  const { checkPermission, checkRole } = useAuth();

  const hasPermission = permissions.length > 0 
    ? requireAll 
      ? permissions.every(checkPermission)
      : permissions.some(checkPermission)
    : true;

  const hasRole = roles.length > 0
    ? requireAll
      ? roles.every(checkRole)
      : roles.some(checkRole)
    : true;

  const canAccess = hasPermission && hasRole;

  return canAccess ? <>{children}</> : <>{fallback}</>;
}

// 认证路由守卫 - 需要登录才能访问
interface AuthGuardProps {
  fallback?: ReactNode;
  redirectTo?: string;
  children: ReactNode;
}

export function AuthGuard({ 
  fallback = <div>请先登录</div>, 
  redirectTo,
  children 
}: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && redirectTo) {
      window.location.href = redirectTo;
    }
  }, [isAuthenticated, isLoading, redirectTo]);

  if (isLoading) {
    return <div>加载中...</div>;
  }

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}