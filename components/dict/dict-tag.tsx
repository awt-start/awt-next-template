/**
 * 字典标签组件
 * 基于字典API自动渲染标签，支持自定义样式、图标、交互与批量展示
 * 支持缓存字典数据，避免重复请求
 */

"use client";

import { forwardRef, useMemo } from "react";
import { Tag, type TagProps } from "@/components/ui/tag";
import { dictDataInfo } from "@/apis/system/dict";
import { DictData } from "@/apis/system/dict-data-model";
import SvgIcon from "@/components/icon/icon";
import { cn } from "@/lib/utils";

// ========================
// 🧩 映射配置（集中管理）
// ========================

/** 可用的 Tag 变体类型 */
type ValidVariant = Exclude<TagProps["variant"], "outline">;

const DICT_VARIANT_MAP: Record<string, ValidVariant> = {
  // 状态类
  "0": "destructive", // 禁用/停用
  "1": "success", // 启用/正常
  "2": "warning", // 警告
  "3": "secondary", // 其他

  // 类型类
  normal: "default",
  important: "warning",
  urgent: "destructive",
  info: "primary",

  // 等级类
  low: "secondary",
  medium: "warning",
  high: "destructive",

  // 默认兜底
  default: "default",
};

const DICT_ICON_MAP: Record<string, string> = {
  // 状态图标
  "0": "lucide:x-circle",
  "1": "lucide:check-circle",
  "2": "lucide:alert-circle",
  "3": "lucide:info",

  // 类型图标
  normal: "lucide:circle",
  important: "lucide:alert-triangle",
  urgent: "lucide:zap",
  info: "lucide:info",
};

/**
 * 根据字典数据获取 Tag 变体
 * 优先级：cssClass > dictValue > dictLabel > 默认
 */
function getDictVariant(dictData: DictData): ValidVariant {
  // 1. 优先使用 cssClass（如：tag-success）
  if (dictData.cssClass && dictData.cssClass.startsWith("tag-")) {
    const variant = dictData.cssClass.slice(4) as ValidVariant;
    // @ts-ignore
    if (
      [
        "primary",
        "secondary",
        "success",
        "warning",
        "destructive",
        "purple",
        "emerald",
      ].includes(variant)
    ) {
      return variant;
    }
  }

  // 2. 使用 dictValue 匹配
  if (DICT_VARIANT_MAP[dictData.dictValue] !== undefined) {
    return DICT_VARIANT_MAP[dictData.dictValue];
  }

  // 3. 使用 dictLabel 小写匹配（兼容中文或英文标签）
  const labelLower = dictData.dictLabel?.toLowerCase();
  if (labelLower && DICT_VARIANT_MAP[labelLower] !== undefined) {
    return DICT_VARIANT_MAP[labelLower];
  }

  // 4. 默认
  return "default";
}

/**
 * 根据字典数据获取图标路径
 * 优先级：传入 icon > listClass > dictValue > dictLabel > 无
 */
function getDictIcon(
  dictData: DictData,
  customIcon?: string,
): string | undefined {
  // 1. 自定义图标优先
  if (customIcon) return customIcon;

  // 2. 使用 listClass（如：icon-check-circle）
  if (dictData.listClass && dictData.listClass.startsWith("icon-")) {
    return `lucide:${dictData.listClass.slice(5)}`;
  }

  // 3. 使用 dictValue 匹配
  if (DICT_ICON_MAP[dictData.dictValue]) {
    return DICT_ICON_MAP[dictData.dictValue];
  }

  // 4. 使用 dictLabel 小写匹配
  const labelLower = dictData.dictLabel?.toLowerCase();
  if (labelLower && DICT_ICON_MAP[labelLower]) {
    return DICT_ICON_MAP[labelLower];
  }

  return undefined;
}

// ========================
// 🎯 DictTag 组件
// ========================

export interface DictTagProps
  extends Omit<TagProps, "children" | "variant" | "onTagClick"> {
  /** 字典类型（必填） */
  dictType: string;
  /** 要显示的字典值（必填） */
  dictValue: string;
  /** 是否显示图标（默认 false） */
  showIcon?: boolean;
  /** 自定义图标（覆盖内置逻辑） */
  icon?: string;
  /** 点击回调，传递完整字典数据 */
  onDictClick?: (dictData: DictData) => void;
  /** 加载中占位文本 */
  loadingText?: string;
  /** 未找到时的占位文本（若未设置，则显示 dictValue） */
  fallbackText?: string;
  /** 未找到时是否隐藏组件（默认 false） */
  hideOnNotFound?: boolean;
  /** 是否启用缓存（默认 true） - 用于避免重复请求同一字典类型 */
  cacheEnabled?: boolean;
}

const DictTag = forwardRef<HTMLSpanElement, DictTagProps>(
  (
    {
      dictType,
      dictValue,
      showIcon = false,
      icon,
      onDictClick,
      loadingText = "加载中...",
      fallbackText,
      hideOnNotFound = false,
      className,
      cacheEnabled = true,
      ...props
    },
    ref,
  ) => {
    // ✅ 缓存字典数据：避免同一 dictType 多次请求
    // @ts-ignore
    const {
      data: dictList,
      isLoading,
      error,
    } = dictDataInfo(dictType, { cache: cacheEnabled });

    // 查找匹配项
    const dictData = useMemo(() => {
      if (!dictList || !Array.isArray(dictList)) return null;
      return dictList.find((item) => item.dictValue === dictValue);
    }, [dictList, dictValue]);

    // 加载中状态
    if (isLoading) {
      return (
        <Tag
          ref={ref}
          variant="outline"
          size="sm"
          className={cn("animate-pulse", className)}
          {...props}
        >
          {showIcon && (
            <SvgIcon
              icon="lucide:loader-2"
              width={12}
              height={12}
              className="animate-spin"
            />
          )}
          {loadingText}
        </Tag>
      );
    }

    // 错误或未找到
    if (error || !dictData) {
      if (hideOnNotFound) {
        return null;
      }

      return (
        <Tag
          ref={ref}
          variant="secondary"
          className={cn("opacity-70", className)}
          {...props}
        >
          {showIcon && (
            <SvgIcon icon="lucide:help-circle" width={12} height={12} />
          )}
          {fallbackText ?? dictValue}
        </Tag>
      );
    }

    // 计算最终样式和图标
    const variant = getDictVariant(dictData);
    const tagIcon = getDictIcon(dictData, icon);

    const handleClick = onDictClick ? () => onDictClick(dictData) : undefined;

    return (
      <Tag
        ref={ref}
        variant={variant}
        clickable={!!onDictClick}
        onTagClick={handleClick}
        className={cn(className)}
        title={dictData.remark || dictData.dictLabel}
        {...props}
      >
        {tagIcon && (
          <SvgIcon icon={tagIcon} width={12} height={12} className="shrink-0" />
        )}
        {dictData.dictLabel}
      </Tag>
    );
  },
);

DictTag.displayName = "DictTag";

export { DictTag };

// ========================
// 📦 DictTagGroup 组件（批量展示）
// ========================

export interface DictTagGroupProps {
  /** 字典类型（必填） */
  dictType: string;
  /** 字典值数组（必填） */
  dictValues: string[];
  /** 最大显示数量（默认 5） */
  maxCount?: number;
  /** 是否显示图标 */
  showIcon?: boolean;
  /** 标签间距 */
  gap?: "sm" | "default" | "lg";
  /** 点击回调 */
  onDictClick?: (dictData: DictData) => void;
  /** 容器类名 */
  className?: string;
  /** 是否启用缓存（默认 true） */
  cacheEnabled?: boolean;
  /** 超出部分的提示文案（默认 "+X 更多"） */
  moreText?: string;
}

export function DictTagGroup({
  dictType,
  dictValues,
  maxCount = 5,
  showIcon = false,
  gap = "default",
  onDictClick,
  className,
  cacheEnabled = true,
  moreText = "+{count} 更多",
}: DictTagGroupProps) {
  // 防止空数组
  if (!Array.isArray(dictValues) || dictValues.length === 0) {
    return null;
  }

  const displayValues = dictValues.slice(0, maxCount);
  const remainingCount = dictValues.length - maxCount;

  const gapClasses = {
    sm: "gap-1",
    default: "gap-2",
    lg: "gap-3",
  };

  return (
    <div
      className={cn("flex flex-wrap items-center", gapClasses[gap], className)}
    >
      {displayValues.map((value, index) => (
        <DictTag
          key={`${dictType}-${value}-${index}`}
          dictType={dictType}
          dictValue={value}
          showIcon={showIcon}
          onDictClick={onDictClick}
          size="sm"
          cacheEnabled={cacheEnabled}
        />
      ))}

      {remainingCount > 0 && (
        <Tag variant="outline" size="sm">
          {moreText.replace("{count}", String(remainingCount))}
        </Tag>
      )}
    </div>
  );
}
