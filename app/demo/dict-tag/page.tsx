/**
 * 字典标签组件使用示例
 */

"use client";

import { useState } from "react";
import { DictTag, DictTagGroup } from "@/components/dict";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import SvgIcon from "@/components/icon/icon";
import { DictData, DictType } from "@/apis/system/dict-data-model";
import { motion } from "framer-motion";
const SMOOTH_TRANSITION = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
};
/**
 * 基础用法示例
 */

export function BasicUsageExample() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">基础用法</h3>
                <div className="space-y-4">
                    {/* 状态标签示例 */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">
                            用户状态
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            <DictTag dictType="sys_normal_disable" dictValue="0" />
                            <DictTag dictType={'sys_normal_disable'} dictValue="1" />
                        </div>
                    </div>

                    {/* 带图标的标签 */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">
                            带图标状态
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            <DictTag dictType="sys_normal_disable" dictValue="0" showIcon />
                            <DictTag dictType="sys_normal_disable" dictValue="1" showIcon />
                        </div>
                    </div>

                    {/* 自定义图标 */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">
                            自定义图标
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            <DictTag
                                dictType=''
                                dictValue="Y"
                                showIcon
                                icon="lucide:ban"
                            />
                            <DictTag
                                dictType='sys_user_sex'
                                dictValue="1"
                                showIcon
                                icon="lucide:check-circle-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * 交互式示例
 */
export function InteractiveExample() {
    const [selectedDict, setSelectedDict] = useState<DictData | null>(null);

    const handleDictClick = (dictData: DictData) => {
        setSelectedDict(dictData);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">交互式标签</h3>

                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <DictTag
                            dictType=""
                            dictValue="0"
                            showIcon
                            onDictClick={handleDictClick}
                        />
                        <DictTag
                            dictType="sys_normal_disable"
                            dictValue="1"
                            showIcon
                            onDictClick={handleDictClick}
                        />
                    </div>

                    {selectedDict && (
                        <div className="p-4 border rounded-lg bg-accent/20">
                            <h4 className="font-semibold mb-2">选中的字典项：</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span className="text-muted-foreground">标签：</span>
                                    <span className="font-medium">{selectedDict.dictLabel}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">值：</span>
                                    <span className="font-medium">{selectedDict.dictValue}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">类型：</span>
                                    <span className="font-medium">{selectedDict.dictType}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">排序：</span>
                                    <span className="font-medium">{selectedDict.dictSort}</span>
                                </div>
                                {selectedDict.remark && (
                                    <div className="col-span-2">
                                        <span className="text-muted-foreground">备注：</span>
                                        <span className="font-medium">{selectedDict.remark}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/**
 * 标签组示例
 */
export function TagGroupExample() {
    const [maxCount, setMaxCount] = useState(3);

    const dictValues = ["0", "1", "2", "3", "4", "5"];

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">标签组</h3>

                <div className="space-y-4">
                    {/* 控制面板 */}
                    <div className="p-4 border rounded-lg bg-accent/10">
                        <div className="flex items-center gap-4">
                            <label className="text-sm font-medium">最大显示数量：</label>
                            <div className="flex gap-2">
                                {[2, 3, 4, 5, 6].map((count) => (
                                    <Button
                                        key={count}
                                        variant={maxCount === count ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setMaxCount(count)}
                                    >
                                        {count}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 标签组展示 */}
                    <div className="space-y-3">
                        <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-2">
                                默认样式
                            </h4>
                            <DictTagGroup
                                dictType="sys_normal_disable"
                                dictValues={dictValues}
                                maxCount={maxCount}
                            />
                        </div>

                        <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-2">
                                带图标
                            </h4>
                            <DictTagGroup
                                dictType="sys_normal_disable"
                                dictValues={dictValues}
                                maxCount={maxCount}
                                showIcon
                            />
                        </div>

                        <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-2">
                                大间距
                            </h4>
                            <DictTagGroup
                                dictType="sys_normal_disable"
                                dictValues={dictValues}
                                maxCount={maxCount}
                                gap="lg"
                                showIcon
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * 状态演示
 */
export function StatusExample() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">不同状态</h3>

                <div className="space-y-4">
                    {/* 加载状态 */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">
                            加载状态
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            <Tag variant="outline" size="sm" className="animate-pulse">
                                <SvgIcon
                                    icon="lucide:loader-2"
                                    width={12}
                                    height={12}
                                    className="animate-spin"
                                />
                                加载中...
                            </Tag>
                        </div>
                    </div>

                    {/* 错误状态 */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">
                            未找到数据
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            <DictTag
                                dictType="non_existent_type"
                                dictValue="unknown"
                                fallbackText="未知状态"
                                showIcon
                            />
                            <DictTag
                                dictType="sys_normal_disable"
                                dictValue="999"
                                fallbackText="数据不存在"
                            />
                        </div>
                    </div>

                    {/* 隐藏模式 */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">
                            隐藏模式（未找到时不显示）
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="text-sm text-muted-foreground">正常：</span>
                            <DictTag dictType="sys_normal_disable" dictValue="1" />
                            <span className="text-sm text-muted-foreground">不存在：</span>
                            <DictTag
                                dictType="sys_normal_disable"
                                dictValue="999"
                                hideOnNotFound
                            />
                            <span className="text-sm text-muted-foreground">（已隐藏）</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * 样式变体示例
 */
export function StyleVariantsExample() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">样式变体</h3>

                <div className="space-y-4">
                    {/* 基础Tag组件变体 */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">
                            基础Tag变体
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            <Tag variant="default">默认</Tag>
                            <Tag variant="primary">主要</Tag>
                            <Tag variant="secondary">次要</Tag>
                            <Tag variant="success">成功</Tag>
                            <Tag variant="warning">警告</Tag>
                            <Tag variant="destructive">危险</Tag>
                            <Tag variant="purple">紫色</Tag>
                            <Tag variant="emerald">翠绿</Tag>
                            <Tag variant="outline">轮廓</Tag>
                        </div>
                    </div>

                    {/* 尺寸变体 */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">
                            尺寸变体
                        </h4>
                        <div className="flex flex-wrap items-center gap-2">
                            <Tag variant="primary" size="sm">
                                小型
                            </Tag>
                            <Tag variant="primary" size="default">
                                默认
                            </Tag>
                            <Tag variant="primary" size="lg">
                                大型
                            </Tag>
                        </div>
                    </div>

                    {/* 带图标的变体 */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">
                            带图标的变体
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            <Tag variant="success">
                                <SvgIcon icon="lucide:check" width={12} height={12} />
                                已完成
                            </Tag>
                            <Tag variant="warning">
                                <SvgIcon icon="lucide:clock" width={12} height={12} />
                                进行中
                            </Tag>
                            <Tag variant="destructive">
                                <SvgIcon icon="lucide:x" width={12} height={12} />
                                已取消
                            </Tag>
                        </div>
                    </div>

                    {/* 可点击标签 */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">
                            可点击标签
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            <Tag
                                variant="primary"
                                clickable
                                onTagClick={() => alert("点击了主要标签")}
                            >
                                <SvgIcon
                                    icon="lucide:mouse-pointer-click"
                                    width={12}
                                    height={12}
                                />
                                点击我
                            </Tag>
                            <Tag
                                variant="success"
                                clickable
                                onTagClick={() => alert("点击了成功标签")}
                            >
                                点击测试
                            </Tag>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * 主示例组件
 */
export default function DictTagExamples() {
    const [activeTab, setActiveTab] = useState("basic");

    const tabs = [
        { id: "basic", label: "基础用法", component: BasicUsageExample },
        { id: "interactive", label: "交互式", component: InteractiveExample },
        { id: "group", label: "标签组", component: TagGroupExample },
        { id: "status", label: "状态演示", component: StatusExample },
        { id: "variants", label: "样式变体", component: StyleVariantsExample },
    ];

    const ActiveComponent =
        tabs.find((tab) => tab.id === activeTab)?.component || BasicUsageExample;

    return (
        <div className="relative z-10 min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-6 pb-20">
                {/* 页面标题 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={SMOOTH_TRANSITION}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, ...SMOOTH_TRANSITION }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 mb-6"
                    >
                        <SvgIcon
                            icon="lucide:airplay"
                            width={16}
                            height={16}
                            className="text-blue-500"
                        />
                        <span className="text-sm font-medium text-muted-foreground">
                            标签展示
                        </span>
                    </motion.div>
                </motion.div>
                {/* 功能特性 */}
                <div className="mb-8 p-6 border rounded-lg bg-accent/10">
                    <h2 className="text-lg font-semibold mb-4">功能特性</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <SvgIcon
                                    icon="lucide:database"
                                    width={16}
                                    height={16}
                                    className="text-blue-500"
                                />
                            </div>
                            <div>
                                <h3 className="font-medium">字典集成</h3>
                                <p className="text-sm text-muted-foreground">
                                    自动从字典API获取数据
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                                <SvgIcon
                                    icon="lucide:palette"
                                    width={16}
                                    height={16}
                                    className="text-green-500"
                                />
                            </div>
                            <div>
                                <h3 className="font-medium">智能样式</h3>
                                <p className="text-sm text-muted-foreground">
                                    根据字典值自动选择样式
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                                <SvgIcon
                                    icon="lucide:mouse-pointer-click"
                                    width={16}
                                    height={16}
                                    className="text-purple-500"
                                />
                            </div>
                            <div>
                                <h3 className="font-medium">交互支持</h3>
                                <p className="text-sm text-muted-foreground">
                                    可点击和事件回调
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                                <SvgIcon
                                    icon="lucide:layers"
                                    width={16}
                                    height={16}
                                    className="text-orange-500"
                                />
                            </div>
                            <div>
                                <h3 className="font-medium">标签组</h3>
                                <p className="text-sm text-muted-foreground">
                                    批量显示和数量控制
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                                <SvgIcon
                                    icon="lucide:loader-2"
                                    width={16}
                                    height={16}
                                    className="text-red-500"
                                />
                            </div>
                            <div>
                                <h3 className="font-medium">状态处理</h3>
                                <p className="text-sm text-muted-foreground">
                                    加载、错误、空状态
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                                <SvgIcon
                                    icon="lucide:settings"
                                    width={16}
                                    height={16}
                                    className="text-cyan-500"
                                />
                            </div>
                            <div>
                                <h3 className="font-medium">高度可定制</h3>
                                <p className="text-sm text-muted-foreground">
                                    样式、图标、行为可配置
                                </p>
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
                                className={`pb-2 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
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
        </div>
    );
}
