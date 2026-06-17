---
title: "Tab X 使用说明"
description: "下载、加载与使用 Tab X Chrome 新标签页扩展。"
date: "2026-06-17"
category: "Tab X"
---

Tab X 是一个本地运行的 Chrome Manifest V3 扩展，会替换默认新标签页，提供标签分组、快捷入口、稍后再看、已归档页面和时间信息组成的安静仪表盘。

## 下载

Tab X 1.1.0 目前通过 GitHub 源码分发。

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

- **新标签页仪表盘** — 替换 Chrome 默认新标签页，形成更聚焦的双栏工作区
- **标签分组** — 按主域名整理打开的标签，并支持直接跳转、收藏与关闭
- **排序控制** — 可按标签数量等方式排序，方便快速清理窗口
- **常用站点** — 展示 Chrome Top sites、本地手动快捷入口和快速 Add 入口
- **稍后再看** — 关闭标签前可保存到本地清单
- **已归档页面** — 将处理完成或归档的页面保存在独立本地清单
- **干支时钟与英文时钟** — 展示干支时间头部、自然语言时钟和自定义 Chrome 入口
- **本地存储** — 使用 Chrome 扩展 API 和 `chrome.storage.local`

## 数据与权限

Tab X 不运行服务器，也不需要账号、Node.js、npm 或数据库。

| 区域 | API / 存储 |
|------|------------|
| 新标签页替换 | Chrome Manifest V3 `chrome_url_overrides.newtab` |
| 打开标签分组与聚焦 | `chrome.tabs`, `chrome.windows` |
| 常用站点快捷入口 | `chrome.topSites`，并带有 `chrome.history` 回退 |
| 稍后再看、已归档页面与手动快捷入口 | `chrome.storage.local` |
| 搜索框 | `chrome.search`，并带有 URL 回退 |

支持 Manifest V3 的 Google Chrome，且手动加载时需要开启开发者模式。
