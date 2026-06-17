---
title: "Tab X 2.0.0"
description: "Tab X 2.0.0 带来 Apple 风格仪表盘升级，加入自适应深色模式、打开标签徽标计数、首页分组、可展开分组和同步就绪的稍后再看/归档存储工具。"
date: "2026-06-18"
appSlug: "tab-x"
published: true
highlights:
  - "自适应深色模式与底部手动主题切换"
  - "打开标签徽标计数、首页分组和可展开分组"
  - "同步就绪的稍后再看/归档存储工具"
---

Tab X 2.0.0 是一次面向标签较多浏览场景的仪表盘升级。

## 本次更新

- 使用 Apple 风格布局，并加入更紧凑的底部署名与手动主题切换
- 跟随系统深色模式，也允许手动切换浅色/深色
- 新增工具栏徽标，统计真实网页标签数量，并随标签负载改变颜色
- 将 Gmail、X、YouTube、LinkedIn、GitHub 等首页类标签集中到一个清理卡片
- localhost 分组包含端口号，便于区分本地开发项目
- 大型域名分组默认显示前 8 个标签，并通过 `+N more` 展开
- 优化稍后再看与 Archived，保存、归档、删除记录时交互更平滑
- 新增严格的 `chrome.storage.sync` 工具，只保存 `url`、`title` 和 `timestamp`

## 安装

从 GitHub 下载最新源码 zip，解压后在 `chrome://extensions` 开启开发者模式，然后重新加载或加载其中的 `extension/` 文件夹。
