# Ruoyi-Plus 认证集成

本项目已成功集成 Ruoyi-Plus 后端认证系统，提供完整的登录状态管理和权限控制功能。

## 功能特性

✅ **JWT 认证** - 基于 Token 的无状态认证  
✅ **登录状态管理** - 自动保存和恢复登录状态  
✅ **权限控制** - 细粒度的权限和角色检查  
✅ **路由守卫** - 自动保护需要认证的页面  
✅ **组件守卫** - 基于权限的组件显示控制  
✅ **自动刷新** - Token 自动续期机制  
✅ **TypeScript** - 完整的类型安全支持

## 快速开始

### 1. 环境配置

在 `.env.local` 文件中配置后端 API 地址：

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 2. 使用登录页面

访问 `/auth/login` 进行登录，支持：

- 用户名/密码登录
- 图片验证码（如果后端开启）
- 记住我功能
- 第三方登录（Google、GitHub）

### 3. 检查登录状态

```tsx
import { useAuth } from "@/lib/auth/auth-context";

function MyComponent() {
  const { isAuthenticated, user, permissions, roles } = useAuth();
  
  if (!isAuthenticated) {
    return <div>请先登录</div>;
  }
  
  return (
    <div>
      <h1>欢迎, {user?.nick_name}</h1>
      <p>权限数量: {permissions.length}</p>
      <p>角色: {roles.join(', ')}</p>
    </div>
  );
}
```

### 4. 权限检查

```tsx
import { useAuth } from "@/lib/auth/auth-context";

function AdminPanel() {
  const { checkPermission, checkRole } = useAuth();
  
  // 检查具体权限
  if (!checkPermission('system:user:list')) {
    return <div>无权限访问</div>;
  }
  
  // 检查角色
  if (!checkRole('admin')) {
    return <div>需要管理员权限</div>;
  }
  
  return <div>管理员面板</div>;
}
```

### 5. 使用守卫组件

```tsx
import { AuthGuard, PermissionGuard } from "@/lib/auth/auth-context";

function App() {
  return (
    <div>
      {/* 认证守卫 - 需要登录 */}
      <AuthGuard fallback={<div>请先登录</div>}>
        <UserDashboard />
      </AuthGuard>
      
      {/* 权限守卫 - 需要特定权限 */}
      <PermissionGuard 
        permissions={['system:user:add']} 
        fallback={<div>无权限</div>}
      >
        <AddUserButton />
      </PermissionGuard>
      
      {/* 角色守卫 - 需要特定角色 */}
      <PermissionGuard 
        roles={['admin']} 
        fallback={<div>需要管理员权限</div>}
      >
        <AdminPanel />
      </PermissionGuard>
    </div>
  );
}
```

## API 接口

### 认证接口

```tsx
import { useAuth as useAuthApi } from "@/apis/auth/auth";

// 登录
const loginMutation = useAuthApi.login({
  onSuccess: (data) => {
    console.log('登录成功', data);
  },
  onError: (error) => {
    console.error('登录失败', error);
  }
});

// 登出
const logoutMutation = useAuthApi.logout({
  onSuccess: () => {
    console.log('登出成功');
  }
});

// 刷新 Token
const refreshMutation = useAuthApi.refreshToken();

// 获取用户信息
const userInfo = useAuthApi.useUserInfo();

// 获取用户权限
const userPermissions = useAuthApi.useUserPermissions();
```

### 验证码接口

```tsx
import { useCaptcha } from "@/apis/auth/auth";

// 获取图片验证码
const captcha = useCaptcha.useCaptchaImage();

// 发送短信验证码
const smsCode = useCaptcha.useSendSmsCode();

// 发送邮箱验证码  
const emailCode = useCaptcha.useSendEmailCode();
```

## 认证状态

### Context API

```tsx
interface AuthContextType {
  // 状态
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserInfo | null;
  accessToken: string | null;
  refreshToken: string | null;
  permissions: string[];
  roles: string[];
  error: string | null;
  
  // 方法
  login: (result: LoginResult) => void;
  logout: () => void;
  clearError: () => void;
  updateUser: (user: UserInfo) => void;
  checkPermission: (permission: string) => boolean;
  checkRole: (role: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
}
```

### 数据类型

```tsx
// 用户信息
interface UserInfo {
  user_id: number;
  dept_id: number;
  user_name: string;
  nick_name: string;
  user_type: string;
  email: string;
  phonenumber: string;
  sex: string;
  avatar: string;
  status: string;
  // ... 更多字段
}

// 登录参数
interface SimpleLoginParams {
  clientId: string;
  grantType: "password";
  tenantId: string;
  username: string;
  password: string;
  code?: string;    // 验证码
  uuid?: string;    // 验证码ID
}

// 登录结果
interface LoginResult {
  access_token: string;
  refresh_token: string;
  client_id: string;
  expire_in: number;
  user_info: UserInfo;
  permissions: string[];
  roles: string[];
}
```

## 演示页面

- `/auth/login` - 登录页面
- `/demo/auth` - 认证功能演示
- `/demo/query` - TanStack Query 演示
- `/demo/dict-tag` - 字典标签演示

## 项目结构

```
lib/auth/
├── auth-context.tsx    # 认证状态管理
└── index.ts           # 统一导出

apis/auth/
├── auth-type.d.ts     # 类型定义
└── auth.ts           # API 接口

app/auth/
├── login/
│   └── page.tsx      # 登录页面
├── register/
│   └── page.tsx      # 注册页面
└── layout.tsx        # 认证布局

components/auth/
├── auth-components.tsx # 认证组件
└── index.ts           # 统一导出
```

## 最佳实践

### 1. 路由保护

```tsx
// app/admin/layout.tsx
import { AuthGuard } from "@/lib/auth/auth-context";

export default function AdminLayout({ children }) {
  return (
    <AuthGuard redirectTo="/auth/login">
      <PermissionGuard roles={['admin']} fallback={<div>需要管理员权限</div>}>
        {children}
      </PermissionGuard>
    </AuthGuard>
  );
}
```

### 2. 条件渲染

```tsx
function Navigation() {
  const { isAuthenticated, checkPermission } = useAuth();
  
  return (
    <nav>
      {isAuthenticated && (
        <>
          <Link href="/dashboard">仪表板</Link>
          {checkPermission('system:user:list') && (
            <Link href="/users">用户管理</Link>
          )}
        </>
      )}
    </nav>
  );
}
```

### 3. API 请求拦截

```tsx
// API 客户端自动携带 Token
// 在 lib/api/client.ts 中已实现
function getAuthToken(): string | null {
  return storage.getItem<string>(STORAGE_KEYS.ACCESS_TOKEN);
}
```

### 4. 错误处理

```tsx
function MyComponent() {
  const { error, clearError } = useAuth();
  
  useEffect(() => {
    if (error) {
      // 显示错误提示
      toast.error(error);
      
      // 如果是认证错误，跳转到登录页
      if (error.includes('401') || error.includes('未授权')) {
        router.push('/auth/login');
      }
    }
  }, [error]);
  
  // ...
}
```

## 注意事项

1. **Token 存储**: 使用 localStorage 存储，刷新页面后状态会自动恢复
2. **权限更新**: 权限变更后需要重新登录或手动刷新权限
3. **路由守卫**: 在需要认证的页面使用 AuthGuard 组件
4. **开发调试**: 可访问 `/demo/auth` 查看认证状态和权限信息
5. **类型安全**: 所有 API 都有完整的 TypeScript 类型定义

## 故障排除

### 常见问题

1. **登录后页面无变化**: 检查 AuthProvider 是否正确包装应用
2. **权限检查失败**: 确认后端返回的权限格式正确
3. **Token 过期**: 实现自动刷新机制或引导用户重新登录
4. **CORS 错误**: 配置后端允许前端域名的跨域请求

### 调试技巧

```tsx
// 开启认证调试
function DebugAuth() {
  const auth = useAuth();
  
  console.log('认证状态:', {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    permissions: auth.permissions,
    roles: auth.roles,
    token: auth.accessToken,
  });
  
  return null;
}
```