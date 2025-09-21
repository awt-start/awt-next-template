/**
 * 认证功能演示组件
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth/auth-context";
import { useAuth as useAuthApi } from "@/apis/auth/auth";
import { Button } from "@/components/auth/auth-components";
import SvgIcon from "@/components/icon/icon";
import { AuthGuard, PermissionGuard } from "@/lib/auth/auth-context";
import { cn } from "@/lib/utils";

/**
 * 用户信息展示组件
 */
function UserInfoCard() {
  const { user, isAuthenticated, permissions, roles } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="p-6 border rounded-lg bg-gray-50 dark:bg-gray-900">
        <p className="text-muted-foreground">未登录状态</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 border rounded-lg bg-background"
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                  {user.nickName?.[0] || user.nickName?.[0] || 'U'}
        </div>
        
        <div className="flex-1 space-y-2">
          <div>
                      <h3 className="font-semibold text-lg">{user.nickName || user.userName}</h3>
                      <p className="text-sm text-muted-foreground">@{user.userName}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">邮箱：</span>
              <span>{user.email || '未设置'}</span>
            </div>
            <div>
              <span className="text-muted-foreground">手机：</span>
              <span>{user.phonenumber || '未设置'}</span>
            </div>
            <div>
              <span className="text-muted-foreground">部门ID：</span>
                          <span>{user.deptId}</span>
            </div>
            <div>
              <span className="text-muted-foreground">用户类型：</span>
                          <span>{user.userType}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="mb-2">
              <span className="text-sm font-medium text-muted-foreground">角色：</span>
              <div className="flex flex-wrap gap-1 mt-1">
                              {roles.length > 0 ? roles.map((role, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-blue-500/10 text-blue-600 rounded-full"
                  >
                    {role}
                  </span>
                )) : (
                  <span className="text-xs text-muted-foreground">无角色</span>
                )}
              </div>
            </div>
            
            <div>
              <span className="text-sm font-medium text-muted-foreground">权限：</span>
              <div className="flex flex-wrap gap-1 mt-1">
                              {permissions.length > 0 ? permissions.slice(0, 5).map((permission, index) => (
                                  <span
                                      key={index}
                                      className="px-2 py-1 text-xs bg-green-500/10 text-green-600 rounded-full"
                                  >
                                      {permission}
                                  </span>
                              )) : (
                                  <span className="text-xs text-muted-foreground">无权限</span>
                              )}
                              {permissions.length > 5 && (
                                  <span className="px-2 py-1 text-xs bg-gray-500/10 text-gray-600 rounded-full">
                                      +{permissions.length - 5}
                                  </span>
                              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * 登录状态控制组件
 */
function AuthControls() {
  const { isAuthenticated, logout, error, clearError } = useAuth();
  const logoutMutation = useAuthApi.logout({
    onSuccess: () => {
      logout();
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate({});
  };

  if (error) {
    return (
      <div className="p-4 border border-red-200 rounded-lg bg-red-50 text-red-700">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold">认证错误</p>
            <p className="text-sm">{error}</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={clearError}
            className="ml-2"
          >
            清除
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-3 h-3 rounded-full",
            isAuthenticated ? "bg-green-500" : "bg-gray-400"
          )} />
          <span className="font-medium">
            {isAuthenticated ? "已登录" : "未登录"}
          </span>
        </div>
        
        {isAuthenticated ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            loading={logoutMutation.isPending}
            disabled={logoutMutation.isPending}
          >
            <SvgIcon icon="lucide:log-out" width={16} height={16} className="mr-1" />
            {logoutMutation.isPending ? '登出中...' : '登出'}
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={() => window.location.href = '/auth/login'}
          >
            <SvgIcon icon="lucide:log-in" width={16} height={16} className="mr-1" />
            登录
          </Button>
        )}
      </div>
    </div>
  );
}

/**
 * 权限测试组件
 */
function PermissionTests() {
  const { checkPermission, checkRole, permissions, roles } = useAuth();
  
  const testPermissions = [
    'system:user:list',
    'system:user:add', 
    'system:user:edit',
    'system:user:remove',
    'system:role:list',
    'system:menu:list',
  ];
  
  const testRoles = [
    'admin',
    'common',
    'user',
    'guest',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">权限测试</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {testPermissions.map((permission) => {
            const hasPermission = checkPermission(permission);
            return (
              <div
                key={permission}
                className={cn(
                  "p-3 rounded-lg border text-sm",
                  hasPermission 
                    ? "bg-green-50 border-green-200 text-green-700" 
                    : "bg-gray-50 border-gray-200 text-gray-600"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono">{permission}</span>
                  <SvgIcon 
                    icon={hasPermission ? "lucide:check" : "lucide:x"} 
                    width={16} 
                    height={16}
                    className={hasPermission ? "text-green-500" : "text-gray-400"}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">角色测试</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {testRoles.map((role) => {
            const hasRole = checkRole(role);
            return (
              <div
                key={role}
                className={cn(
                  "p-3 rounded-lg border text-sm text-center",
                  hasRole 
                    ? "bg-blue-50 border-blue-200 text-blue-700" 
                    : "bg-gray-50 border-gray-200 text-gray-600"
                )}
              >
                <div className="font-medium">{role}</div>
                <SvgIcon 
                  icon={hasRole ? "lucide:check" : "lucide:x"} 
                  width={16} 
                  height={16}
                  className={cn(
                    "mx-auto mt-1",
                    hasRole ? "text-blue-500" : "text-gray-400"
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * 组件保护演示
 */
function ComponentGuards() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">认证守卫演示</h3>
        
        <AuthGuard 
          fallback={
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-muted-foreground">
              需要登录才能查看此内容
            </div>
          }
        >
          <div className="p-4 border border-green-200 rounded-lg bg-green-50 text-green-700">
            ✅ 已登录用户可以看到这个内容
          </div>
        </AuthGuard>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">权限守卫演示</h3>
        
        <div className="space-y-3">
          <PermissionGuard 
            permissions={['system:user:list']}
            fallback={
              <div className="p-4 border-2 border-dashed border-orange-300 rounded-lg text-center text-muted-foreground">
                需要 "system:user:list" 权限才能查看
              </div>
            }
          >
            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50 text-blue-700">
              ✅ 有用户列表权限的用户可以看到这个内容
            </div>
          </PermissionGuard>
          
          <PermissionGuard 
            roles={['admin']}
            fallback={
              <div className="p-4 border-2 border-dashed border-red-300 rounded-lg text-center text-muted-foreground">
                需要 "admin" 角色才能查看
              </div>
            }
          >
            <div className="p-4 border border-purple-200 rounded-lg bg-purple-50 text-purple-700">
              ✅ 管理员角色可以看到这个内容
            </div>
          </PermissionGuard>
        </div>
      </div>
    </div>
  );
}

/**
 * 主演示组件
 */
export function AuthDemo() {
  const [activeTab, setActiveTab] = useState("info");

  const tabs = [
    { id: "info", label: "用户信息", component: UserInfoCard },
    { id: "controls", label: "登录控制", component: AuthControls },
    { id: "permissions", label: "权限测试", component: PermissionTests },
    { id: "guards", label: "组件守卫", component: ComponentGuards },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || UserInfoCard;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">认证功能演示</h1>
        <p className="text-muted-foreground">
          演示Ruoyi-Plus认证集成的功能，包括登录状态、权限检查和组件守卫
        </p>
      </div>

      {/* 功能特性 */}
      <div className="mb-8 p-6 border rounded-lg bg-accent/10">
        <h2 className="text-lg font-semibold mb-4">功能特性</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <SvgIcon icon="lucide:shield-check" width={16} height={16} className="text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium">JWT认证</h3>
              <p className="text-sm text-muted-foreground">基于Token的无状态认证</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
              <SvgIcon icon="lucide:key" width={16} height={16} className="text-green-500" />
            </div>
            <div>
              <h3 className="font-medium">权限控制</h3>
              <p className="text-sm text-muted-foreground">细粒度的权限和角色管理</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
              <SvgIcon icon="lucide:shield" width={16} height={16} className="text-purple-500" />
            </div>
            <div>
              <h3 className="font-medium">路由守卫</h3>
              <p className="text-sm text-muted-foreground">自动保护需要认证的页面</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
              <SvgIcon icon="lucide:refresh-cw" width={16} height={16} className="text-orange-500" />
            </div>
            <div>
              <h3 className="font-medium">自动刷新</h3>
              <p className="text-sm text-muted-foreground">Token自动刷新机制</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
              <SvgIcon icon="lucide:database" width={16} height={16} className="text-red-500" />
            </div>
            <div>
              <h3 className="font-medium">状态持久化</h3>
              <p className="text-sm text-muted-foreground">登录状态本地持久化</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
              <SvgIcon icon="lucide:code" width={16} height={16} className="text-cyan-500" />
            </div>
            <div>
              <h3 className="font-medium">TypeScript</h3>
              <p className="text-sm text-muted-foreground">完整的类型安全支持</p>
            </div>
          </div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="border-b mb-6">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 示例内容 */}
      <div className="bg-background border rounded-lg p-6">
        <ActiveComponent />
      </div>
    </div>
  );
}