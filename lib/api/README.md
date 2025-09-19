# TanStack Query 集成文档

这个文档介绍如何在我们的Next.js项目中使用TanStack Query进行数据获取和状态管理。

## 📦 已安装的包

- `@tanstack/react-query` v5.89.0 - 核心查询库
- `@tanstack/query-devtools` v5.87.3 - 开发工具

## 🏗️ 架构概述

项目采用分层架构设计：

```
lib/api/
├── client.ts          # API客户端服务层
├── query-client.ts    # QueryClient配置和工厂函数
├── query-provider.tsx # QueryProvider组件
├── hooks.ts           # 通用Query和Mutation Hooks
├── examples.tsx       # 使用示例组件
└── README.md          # 本文档
```

## ⚙️ 配置

### 1. 环境变量

在`.env.local`中配置API基础URL：

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 2. 根布局集成

QueryProvider已集成到根布局中：

```tsx
// app/layout.tsx
import { QueryProvider } from "@/lib/api/query-provider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <QueryProvider>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## 🚀 快速开始

### 基础用法

```tsx
import { useApiQuery, useApiMutation } from "@/lib/api/hooks";

function UserList() {
  // 1. 获取数据
  const { data, isLoading, error } = useApiQuery<User[]>({
    endpoint: "/users",
    params: { page: 1, limit: 10 },
    queryKey: ["users", { page: 1, limit: 10 }],
  });

  // 2. 数据修改
  const createUser = useApiMutation<User, ApiRequestError, CreateUserData>({
    endpoint: "/users",
    method: "POST",
    onSuccess: () => {
      // 创建成功后刷新列表
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;

  return (
    <div>
      {data?.map(user => <div key={user.id}>{user.name}</div>)}
      <button onClick={() => createUser.mutate({ name: "新用户" })}>
        添加用户
      </button>
    </div>
  );
}
```

### 使用专门的用户Hooks

```tsx
import { useUserQueries, useUserMutations } from "@/lib/api/hooks";

function UserManagement() {
  // 获取用户列表
  const userList = useUserQueries.list({ page: 1, limit: 10 });
  
  // 获取当前用户资料
  const userProfile = useUserQueries.profile();
  
  // 创建用户
  const createUser = useUserMutations.create({
    onSuccess: () => console.log("用户创建成功"),
  });

  return (
    <div>
      {/* 使用数据 */}
    </div>
  );
}
```

## 📚 API参考

### useApiQuery

通用查询Hook，支持所有GET请求：

```tsx
const { data, isLoading, error, refetch } = useApiQuery<ResponseType>({
  endpoint: string,           // API端点
  params?: object,           // 查询参数
  queryKey?: QueryKey,       // 自定义查询键
  // ...其他useQuery选项
});
```

### useApiMutation

通用变更Hook，支持POST、PUT、PATCH、DELETE请求：

```tsx
const mutation = useApiMutation<ResponseType, ErrorType, VariablesType>({
  endpoint: string,           // API端点
  method?: "POST" | "PUT" | "PATCH" | "DELETE", // HTTP方法
  onSuccess?: (data) => void, // 成功回调
  onError?: (error) => void,  // 错误回调
});

// 执行变更
mutation.mutate(variables);
```

### 用户专门Hooks

#### 查询Hooks (useUserQueries)

```tsx
// 用户列表
const userList = useUserQueries.list(params);

// 用户详情
const userDetail = useUserQueries.detail(userId);

// 当前用户资料
const userProfile = useUserQueries.profile();
```

#### 变更Hooks (useUserMutations)

```tsx
// 创建用户
const createUser = useUserMutations.create(options);

// 更新用户
const updateUser = useUserMutations.update(options);

// 删除用户  
const deleteUser = useUserMutations.delete(options);

// 更新资料
const updateProfile = useUserMutations.updateProfile(options);
```

### 查询管理 (useQueryManager)

```tsx
const queryManager = useQueryManager();

// 失效所有查询
queryManager.invalidateAll();

// 失效指定查询
queryManager.invalidate(["users"]);

// 移除查询
queryManager.remove(["users", userId]);

// 设置查询数据
queryManager.setData(["users"], newData);

// 预取数据
queryManager.prefetch(["users"], fetchUsers);
```

## 🔧 配置选项

### QueryClient默认配置

```tsx
// lib/api/query-client.ts
const defaultQueryOptions = {
  queries: {
    staleTime: 5 * 60 * 1000,        // 5分钟缓存
    gcTime: 10 * 60 * 1000,          // 10分钟垃圾回收
    retry: 3,                        // 重试3次
    refetchOnWindowFocus: false,     // 失焦不重新获取
    refetchOnReconnect: true,        // 重连时重新获取
  },
  mutations: {
    retry: 2,                        // 变更重试2次
  },
};
```

### 错误处理

系统自动处理常见HTTP错误：

- `401 Unauthorized` - 自动跳转登录页
- `403 Forbidden` - 显示权限不足提示
- `404 Not Found` - 显示资源不存在提示
- `5xx Server Error` - 显示系统错误提示

## 📋 QueryKey规范

使用标准化的查询键结构：

```tsx
// 资源列表
["api", "users"]
["api", "users", { page: 1, limit: 10 }]

// 资源详情
["api", "users", userId]

// 用户资料
["api", "users", "profile"]

// 无限查询
["api", "users", "infinite"]
["api", "users", "infinite", filters]
```

## 🎯 最佳实践

### 1. 查询键管理

使用查询键工厂函数：

```tsx
import { queryKeys } from "@/lib/api/query-client";

// 推荐方式
queryKey: queryKeys.listWithFilter("users", params)

// 避免硬编码
queryKey: ["users", params] // ❌
```

### 2. 错误处理

```tsx
const { data, error } = useApiQuery({
  endpoint: "/users",
  onError: (error) => {
    // 组件级错误处理
    console.error("查询失败:", error.message);
  },
});

// 全局错误处理在query-client.ts中配置
```

### 3. 加载状态

```tsx
const { isLoading, isFetching, isRefetching } = useApiQuery({
  endpoint: "/users",
});

// isLoading: 首次加载
// isFetching: 任何获取状态（包括后台刷新）
// isRefetching: 重新获取数据
```

### 4. 缓存策略

```tsx
// 长缓存（静态数据）
const { data } = useApiQuery({
  endpoint: "/config",
  staleTime: 24 * 60 * 60 * 1000, // 24小时
});

// 短缓存（动态数据）
const { data } = useApiQuery({
  endpoint: "/notifications",
  staleTime: 30 * 1000, // 30秒
});

// 实时数据（不缓存）
const { data } = useApiQuery({
  endpoint: "/live-data",
  staleTime: 0,
});
```

### 5. 条件查询

```tsx
const { data } = useApiQuery({
  endpoint: `/users/${userId}`,
  enabled: !!userId, // 只有当userId存在时才执行查询
});
```

### 6. 数据转换

```tsx
const { data } = useApiQuery({
  endpoint: "/users",
  select: (data) => data.users.map(user => ({
    ...user,
    displayName: `${user.name} (${user.email})`,
  })),
});
```

## 🐛 调试

### 开发工具

在开发环境中，QueryDevtools会自动加载（需要手动导入配置）：

```tsx
// 如需手动启用DevTools
import { ReactQueryDevtools } from "@tanstack/query-devtools";

function App() {
  return (
    <>
      <YourApp />
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
}
```

### 常见问题

1. **查询不触发**
   - 检查`enabled`条件
   - 确认queryKey是否正确
   - 验证依赖参数是否存在

2. **数据不更新**
   - 检查`staleTime`配置
   - 确认是否需要手动失效查询
   - 验证queryKey是否变化

3. **重复请求**
   - 检查queryKey是否稳定
   - 避免在渲染过程中创建新对象作为params

## 📝 示例代码

查看完整示例：

```tsx
import { TanStackQueryExamples } from "@/lib/api/examples";

// 在你的页面中使用
export default function ExamplesPage() {
  return <TanStackQueryExamples />;
}
```

## 🔗 相关链接

- [TanStack Query 官方文档](https://tanstack.com/query/latest)
- [Next.js App Router](https://nextjs.org/docs/app)
- [项目代码规范](../README.md)