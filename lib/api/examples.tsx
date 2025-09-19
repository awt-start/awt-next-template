/**
 * TanStack Query使用示例
 * 展示如何在实际组件中使用封装的Query和Mutation Hooks
 */

"use client";

import { useState } from "react";
import { useApiQuery, useApiMutation, useUserQueries, useUserMutations, useQueryManager } from "@/lib/api/hooks";
import { Button } from "@/components/ui/button";
import SvgIcon from "@/components/icon/icon";

/**
 * 示例1: 基础的API查询
 */
export function BasicQueryExample() {
  // 使用通用查询Hook获取用户列表
  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useApiQuery<{
    users: Array<{ id: string; name: string; email: string }>;
    total: number;
  }>({
    endpoint: "/users",
    params: { page: 1, limit: 10 },
    queryKey: ["users", { page: 1, limit: 10 }],
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 p-4">
        <SvgIcon icon="lucide:loader-2" width={16} height={16} className="animate-spin" />
        <span>加载用户列表...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-red-200 rounded-lg bg-red-50 text-red-700">
        <p className="font-semibold">加载失败</p>
        <p className="text-sm">{error.message}</p>
        <Button
          size="sm"
          variant="outline"
          onClick={() => refetch()}
          className="mt-2"
        >
          重试
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">用户列表</h3>
        <p className="text-sm text-muted-foreground">
          共 {users?.total} 个用户
        </p>
      </div>
      
      <div className="grid gap-2">
        {users?.users.map((user) => (
          <div
            key={user.id}
            className="p-3 border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        ))}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => refetch()}
        className="w-full"
      >
        <SvgIcon icon="lucide:refresh-cw" width={16} height={16} className="mr-2" />
        刷新数据
      </Button>
    </div>
  );
}

/**
 * 示例2: 使用专门的用户查询Hooks
 */
export function UserQueriesExample() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // 使用专门的用户查询Hooks
  const userList = useUserQueries.list({ page: 1, limit: 5 });
  const userProfile = useUserQueries.profile();
  const userDetail = useUserQueries.detail(selectedUserId || "");

  return (
    <div className="space-y-6">
      {/* 当前用户信息 */}
      <div className="p-4 border rounded-lg">
        <h4 className="font-semibold mb-2">当前用户</h4>
        {userProfile.isLoading ? (
          <div className="flex items-center gap-2">
            <SvgIcon icon="lucide:loader-2" width={16} height={16} className="animate-spin" />
            <span>加载中...</span>
          </div>
        ) : userProfile.data ? (
          <div>
            <p className="font-medium">{userProfile.data.name}</p>
            <p className="text-sm text-muted-foreground">{userProfile.data.email}</p>
          </div>
        ) : (
          <p className="text-muted-foreground">未登录</p>
        )}
      </div>

      {/* 用户列表 */}
      <div className="p-4 border rounded-lg">
        <h4 className="font-semibold mb-2">其他用户</h4>
        {userList.isLoading ? (
          <div className="text-muted-foreground">加载中...</div>
        ) : (
          <div className="space-y-2">
            {userList.data?.users.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className={`w-full text-left p-2 rounded border transition-colors ${
                  selectedUserId === user.id
                    ? "bg-blue-50 border-blue-200"
                    : "hover:bg-accent/50"
                }`}
              >
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.role}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 选中用户详情 */}
      {selectedUserId && (
        <div className="p-4 border rounded-lg">
          <h4 className="font-semibold mb-2">用户详情</h4>
          {userDetail.isLoading ? (
            <div className="text-muted-foreground">加载中...</div>
          ) : userDetail.data ? (
            <div className="space-y-2">
              <div>
                <span className="font-medium">{userDetail.data.name}</span>
                <span className="ml-2 text-xs px-2 py-1 rounded bg-accent">
                  {userDetail.data.role}
                </span>
              </div>
              <p className="text-sm">{userDetail.data.email}</p>
              {userDetail.data.profile.bio && (
                <p className="text-sm text-muted-foreground">
                  {userDetail.data.profile.bio}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                注册时间: {new Date(userDetail.data.createdAt).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground">用户不存在</p>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * 示例3: 使用Mutation进行数据修改
 */
export function UserMutationsExample() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const queryManager = useQueryManager();

  // 创建用户Mutation
  const createUser = useUserMutations.create({
    onSuccess: (data) => {
      alert(`用户创建成功: ${data.name}`);
      setFormData({ name: "", email: "", bio: "" });
    },
    onError: (error) => {
      alert(`创建失败: ${error.message}`);
    },
  });

  // 更新资料Mutation
  const updateProfile = useUserMutations.updateProfile({
    onSuccess: () => {
      alert("资料更新成功");
    },
    onError: (error) => {
      alert(`更新失败: ${error.message}`);
    },
  });

  // 删除用户Mutation
  const deleteUser = useUserMutations.delete({
    onSuccess: () => {
      alert("用户删除成功");
    },
    onError: (error) => {
      alert(`删除失败: ${error.message}`);
    },
  });

  const handleCreateUser = () => {
    if (!formData.name || !formData.email) {
      alert("请填写姓名和邮箱");
      return;
    }

    createUser.mutate({
      name: formData.name,
      email: formData.email,
      password: "temp123456", // 临时密码
    });
  };

  const handleUpdateProfile = () => {
    updateProfile.mutate({
      name: formData.name || undefined,
      bio: formData.bio || undefined,
    });
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("确定要删除这个用户吗？")) {
      deleteUser.mutate(userId);
    }
  };

  return (
    <div className="space-y-6">
      {/* 创建用户表单 */}
      <div className="p-4 border rounded-lg">
        <h4 className="font-semibold mb-4">创建新用户</h4>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="姓名"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="邮箱"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={handleCreateUser}
            disabled={createUser.isPending}
            className="w-full"
          >
            {createUser.isPending ? (
              <>
                <SvgIcon icon="lucide:loader-2" width={16} height={16} className="mr-2 animate-spin" />
                创建中...
              </>
            ) : (
              <>
                <SvgIcon icon="lucide:user-plus" width={16} height={16} className="mr-2" />
                创建用户
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 更新资料表单 */}
      <div className="p-4 border rounded-lg">
        <h4 className="font-semibold mb-4">更新个人资料</h4>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="新姓名"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="个人简介"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <Button
            onClick={handleUpdateProfile}
            disabled={updateProfile.isPending}
            variant="outline"
            className="w-full"
          >
            {updateProfile.isPending ? (
              <>
                <SvgIcon icon="lucide:loader-2" width={16} height={16} className="mr-2 animate-spin" />
                更新中...
              </>
            ) : (
              <>
                <SvgIcon icon="lucide:edit" width={16} height={16} className="mr-2" />
                更新资料
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 查询管理示例 */}
      <div className="p-4 border rounded-lg">
        <h4 className="font-semibold mb-4">查询管理</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => queryManager.invalidateAll()}
          >
            <SvgIcon icon="lucide:refresh-cw" width={14} height={14} className="mr-1" />
            刷新所有
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => queryManager.invalidate(["users"])}
          >
            刷新用户
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * 主示例组件
 */
export function TanStackQueryExamples() {
  const [activeTab, setActiveTab] = useState("basic");

  const tabs = [
    { id: "basic", label: "基础查询", component: BasicQueryExample },
    { id: "users", label: "用户查询", component: UserQueriesExample },
    { id: "mutations", label: "数据修改", component: UserMutationsExample },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || BasicQueryExample;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">TanStack Query 使用示例</h1>
        <p className="text-muted-foreground">
          演示如何在Next.js项目中使用封装的Query和Mutation Hooks
        </p>
      </div>

      {/* 标签页 */}
      <div className="border-b mb-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 text-sm font-medium transition-colors ${
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