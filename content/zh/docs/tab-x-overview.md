---
title: "Tab X 使用说明"
description: "下载、加载与使用 Tab X Chrome 新标签页扩展。"
date: "2026-06-18"
category: "Tab X"
---

Tab X 是一个本地运行的 Chrome Manifest V3 扩展，会替换默认新标签页，提供 Apple 风格的标签分组、快捷入口、稍后再看、已归档页面、自适应主题和时间信息。

## 下载

Tab X 2.0.0 目前通过 GitHub 源码分发。

| 包 | 链接 |
|----|------|
| **源码 zip** | [tab-x main.zip](https://github.com/itouchgod/tab-x/archive/refs/heads/main.zip) |
| **仓库** | [github.com/itouchgod/tab-x](https://github.com/itouchgod/tab-x) |

## 安装

1. 下载并解压源码压缩包
2. 打开 Chrome，进入 `chrome://extensions`
3. 开启 **Developer mode / 开发者模式**
4. 点击 **Load unpacked / 加载已解压的扩展程序**
5. 选择解压后的 Tab X 源码中的 `extension/` 文件夹
6. 打开一个新标签页

如果之前已经加载过 Tab X，更新文件后在扩展卡片上点击 **Reload / 重新加载** 即可。

## 重点说明

- **新标签页仪表盘** — 替换 Chrome 默认新标签页，形成 Apple 风格的本地工作区
- **干支时钟与英文时钟** — 展示干支时间、英文自然语言时钟和打开标签数量徽标
- **标签分组** — 按主域名、首页类标签和 localhost 端口整理打开的标签
- **排序与展开** — 可按标签数量、域名 A-Z 或最近活跃排序，大分组默认显示前 8 个并可展开
- **常用站点** — 展示 Chrome Top sites、历史回退入口、手动快捷入口和拖拽保存入口
- **稍后再看与归档** — 关闭标签前可保存到本地清单，完成后进入 Archived 手风琴面板
- **自适应主题** — 跟随系统深色模式，并提供底部手动主题切换
- **同步就绪工具** — 包含严格的 `chrome.storage.sync` 轻量保存/归档记录工具
- **本地优先存储** — 当前仪表盘使用 Chrome 扩展 API 和 `chrome.storage.local`

## 数据与权限

Tab X 不运行服务器，也不需要账号、Node.js、npm 或数据库。

| 区域 | API / 存储 |
|------|------------|
| 新标签页替换 | Chrome Manifest V3 `chrome_url_overrides.newtab` |
| 打开标签分组、计数、聚焦与关闭 | `chrome.tabs`, `chrome.windows` |
| 打开标签数量徽标 | service worker 中的 `chrome.action` |
| 搜索框 | `chrome.search`，并带有 URL 回退 |
| 常用站点快捷入口 | `chrome.topSites`，并带有 `chrome.history` 回退 |
| 网站图标 | Chrome 扩展 `/_favicon/` API，并用首字母兜底 |
| 稍后再看界面 | `chrome.storage.local` key `deferred` |
| 手动快捷入口 | `chrome.storage.local` key `favoriteLinks` |
| 隐藏自动快捷入口 | `chrome.storage.local` key `hiddenTopSiteUrls` |
| 打开标签排序偏好 | `chrome.storage.local` key `openTabsSortMode` |
| 可选同步存储工具 | `chrome.storage.sync` keys `savedForLater`, `archived`，写入前压缩为 `url`, `title`, `timestamp` |
| 声音与关闭反馈 | Web Audio API 和 DOM/CSS animation |

支持 Manifest V3 的 Google Chrome，且手动加载时需要开启开发者模式。

## 2.0.0 更新重点

- 增加扩展工具栏徽标，显示真实打开标签数量，并用颜色表达标签负载
- 增加自适应深色模式和底部手动主题切换
- 增加 Homepages 分组，用于集中 Gmail、X、YouTube、LinkedIn、GitHub 等首页类标签
- localhost 分组会显示端口号，方便区分本地开发项目
- 大分组支持展开更多标签
- 优化稍后再看与 Archived 面板，使保存、归档、删除时更新更平滑
- 新增同步就绪存储模块，写入 Chrome sync 前会去掉重字段，只保留轻量记录
