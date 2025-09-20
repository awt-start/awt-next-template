# 字典标签组件 (DictTag)

基于字典API的通用标签组件，提供智能样式映射、自动数据获取和丰富的交互功能。

## 功能特性

- 🔗 **字典集成**: 自动从字典API获取数据，无需手动管理
- 🎨 **智能样式**: 根据字典值和配置自动选择合适的标签样式  
- 🖱️ **交互支持**: 支持点击事件和自定义回调
- 📦 **标签组**: 批量显示多个标签，支持数量限制
- ⚡ **状态处理**: 完善的加载、错误和空状态处理
- 🎯 **高度可定制**: 样式、图标、行为全面可配置
- 📱 **响应式**: 完美适配各种屏幕尺寸

## 基础用法

### 简单使用

```tsx
import { DictTag } from "@/components/dict";

// 显示用户状态
<DictTag dictType="sys_normal_disable" dictValue="1" />

// 带图标显示
<DictTag dictType="sys_normal_disable" dictValue="0" showIcon />

// 自定义图标
<DictTag 
  dictType="sys_normal_disable" 
  dictValue="1" 
  showIcon 
  icon="lucide:check-circle-2" 
/>
```

### 交互式标签

```tsx
import { DictTag } from "@/components/dict";
import { DictData } from "@/apis/system/dict-data-model";

function MyComponent() {
  const handleDictClick = (dictData: DictData) => {
    console.log('点击了字典项:', dictData);
    // 处理点击事件
  };

  return (
    <DictTag 
      dictType="sys_normal_disable" 
      dictValue="1" 
      showIcon
      onDictClick={handleDictClick}
    />
  );
}
```

### 标签组

```tsx
import { DictTagGroup } from "@/components/dict";

function StatusList() {
  const statuses = ["0", "1", "2"];
  
  return (
    <DictTagGroup
      dictType="sys_normal_disable"
      dictValues={statuses}
      maxCount={5}
      showIcon
      gap="default"
      onDictClick={(dictData) => console.log(dictData)}
    />
  );
}
```

## API 参考

### DictTag Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| dictType | `string` | - | 字典类型（必需） |
| dictValue | `string` | - | 字典值（必需） |
| showIcon | `boolean` | `false` | 是否显示图标 |
| icon | `string` | - | 自定义图标，覆盖自动映射 |
| onDictClick | `(dictData: DictData) => void` | - | 点击回调函数 |
| loadingText | `string` | `"加载中..."` | 加载状态文本 |
| fallbackText | `string` | - | 未找到数据时的显示文本 |
| hideOnNotFound | `boolean` | `false` | 未找到数据时是否隐藏组件 |

继承自 `TagProps` 的所有属性（除了 `children`）。

### DictTagGroup Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| dictType | `string` | - | 字典类型（必需） |
| dictValues | `string[]` | - | 字典值数组（必需） |
| maxCount | `number` | `5` | 最大显示数量 |
| showIcon | `boolean` | `false` | 是否显示图标 |
| gap | `"sm" \| "default" \| "lg"` | `"default"` | 标签间距 |
| onDictClick | `(dictData: DictData) => void` | - | 点击回调函数 |
| className | `string` | - | 容器类名 |

### Tag Props (基础组件)

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| variant | `TagVariant` | `"default"` | 标签变体样式 |
| size | `"sm" \| "default" \| "lg"` | `"default"` | 标签尺寸 |
| clickable | `boolean` | `false` | 是否可点击 |
| onTagClick | `() => void` | - | 点击回调 |

### TagVariant 类型

```typescript
type TagVariant = 
  | "default" 
  | "primary" 
  | "secondary" 
  | "success" 
  | "warning" 
  | "destructive" 
  | "purple" 
  | "emerald" 
  | "outline";
```

## 样式映射配置

### 自动变体映射

组件会根据字典数据自动选择合适的标签样式：

1. **cssClass 优先**: 如果字典数据的 `cssClass` 字段包含 `tag-*` 格式，直接使用
2. **dictValue 映射**: 根据预定义的值映射表选择样式
3. **dictLabel 映射**: 根据标签文本的小写形式映射

```typescript
// 内置映射规则示例
const DICT_VARIANT_MAP = {
  "0": "destructive",  // 禁用/停用
  "1": "success",      // 启用/正常
  "2": "warning",      // 警告
  "3": "secondary",    // 其他
  // ...更多映射
};
```

### 自动图标映射

```typescript
// 内置图标映射示例
const DICT_ICON_MAP = {
  "0": "lucide:x-circle",      // 禁用
  "1": "lucide:check-circle",  // 启用
  "2": "lucide:alert-circle",  // 警告
  "3": "lucide:info",          // 信息
  // ...更多映射
};
```

## 高级用法

### 自定义样式映射

通过修改字典数据的 `cssClass` 和 `listClass` 字段来控制样式：

```typescript
// 字典数据示例
{
  dictValue: "1",
  dictLabel: "启用",
  cssClass: "tag-success",     // 控制标签变体
  listClass: "icon-check",     // 控制图标
  // ...其他字段
}
```

### 条件渲染

```tsx
// 只在数据存在时显示
<DictTag 
  dictType="user_status" 
  dictValue={user.status} 
  hideOnNotFound 
/>

// 自定义fallback内容
<DictTag 
  dictType="user_status" 
  dictValue={user.status} 
  fallbackText={`未知状态: ${user.status}`}
/>
```

### 组合使用

```tsx
function UserStatusCard({ user }) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{user.name}</h3>
        <DictTag 
          dictType="user_status" 
          dictValue={user.status} 
          showIcon
        />
      </div>
      
      <div className="space-y-2">
        <div>
          <span className="text-sm text-muted-foreground">角色：</span>
          <DictTagGroup
            dictType="user_roles"
            dictValues={user.roles}
            maxCount={3}
            size="sm"
          />
        </div>
        
        <div>
          <span className="text-sm text-muted-foreground">权限：</span>
          <DictTagGroup
            dictType="user_permissions"
            dictValues={user.permissions}
            maxCount={5}
            size="sm"
            gap="sm"
          />
        </div>
      </div>
    </div>
  );
}
```

## 最佳实践

### 1. 字典类型命名

- 使用有意义的命名：`user_status`、`order_type`、`priority_level`
- 保持一致的命名规范：`模块_用途` 格式

### 2. 样式配置

- 在字典管理中合理配置 `cssClass` 和 `listClass`
- 使用语义化的样式名称：`tag-success`、`icon-check`

### 3. 性能优化

- 使用 `hideOnNotFound` 避免显示无效标签
- 合理设置 `maxCount` 控制标签组大小
- 考虑使用 React.memo 包装频繁更新的组件

### 4. 错误处理

- 始终提供 `fallbackText` 作为备选显示
- 考虑使用 loading 状态提升用户体验

## 与其他组件集成

### 与表单组件

```tsx
import { DictTag } from "@/components/dict";

function StatusSelect({ value, onChange }) {
  const { data: statusOptions } = dictDataInfo("sys_normal_disable");
  
  return (
    <div className="space-y-2">
      <label>状态选择</label>
      <div className="flex gap-2">
        {statusOptions?.map(option => (
          <DictTag
            key={option.dictValue}
            dictType="sys_normal_disable"
            dictValue={option.dictValue}
            showIcon
            clickable
            onDictClick={() => onChange(option.dictValue)}
            className={value === option.dictValue ? "ring-2 ring-blue-500" : ""}
          />
        ))}
      </div>
    </div>
  );
}
```

### 与数据表格

```tsx
function UserTable({ users }) {
  return (
    <table>
      <thead>
        <tr>
          <th>姓名</th>
          <th>状态</th>
          <th>角色</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>
              <DictTag 
                dictType="user_status" 
                dictValue={user.status} 
                showIcon 
                size="sm"
              />
            </td>
            <td>
              <DictTagGroup
                dictType="user_roles"
                dictValues={user.roles}
                maxCount={2}
                size="sm"
                gap="sm"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## 样式定制

组件基于项目的设计系统构建，支持通过 Tailwind CSS 类进行样式定制：

```tsx
// 自定义样式示例
<DictTag 
  dictType="user_status" 
  dictValue="1"
  className="shadow-lg hover:shadow-xl transform hover:scale-105"
/>

// 自定义容器样式
<DictTagGroup
  dictType="user_roles"
  dictValues={roles}
  className="p-2 bg-accent/10 rounded-lg"
/>
```

## 故障排除

### 常见问题

1. **标签不显示**: 检查字典类型和值是否正确
2. **样式不正确**: 确认字典数据的 `cssClass` 配置
3. **图标不显示**: 检查 `showIcon` 属性和图标名称
4. **点击无响应**: 确认 `onDictClick` 回调函数

### 调试技巧

```tsx
// 开启调试模式
<DictTag 
  dictType="user_status" 
  dictValue="1"
  onDictClick={(dictData) => {
    console.log('字典数据:', dictData);
    console.log('CSS类:', dictData.cssClass);
    console.log('图标类:', dictData.listClass);
  }}
/>
```