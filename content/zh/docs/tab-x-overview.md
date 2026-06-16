---
title: "Tab X 使用说明"
description: "下载、加载与使用 Tab X Chrome 新标签页扩展。"
date: "2026-06-16"
category: "Tab X"
---

Tab X 是一个本地运行的 Chrome Manifest V3 扩展，会替换默认新标签页，提供标签、快捷入口、稍后再看清单和时间信息组成的安静仪表盘。

> **当前版本：v1.0.0** · 以源码形式提供

## 下载

Tab X 目前通过 GitHub 源码分发。

| 包 | 链接 |
|----|------|
| **源码 zip** | [tab-x main.zip](https://github.com/itouchgod/tab-x/archive/refs/heads/main.zip) |
| **仓库** | [github.com/itouchgod/tab-x](https://github.com/itouchgod/tab-x) |

也可在 [Tab X 产品页](/zh/apps/tab-x) 下载。

## 安装

1. 下载并解压源码压缩包
2. 打开 Chrome，进入 `chrome://extensions`
3. 开启 **Developer mode / 开发者模式**
4. 点击 **Load unpacked / 加载已解压的扩展程序**
5. 选择解压后的 Tab X 源码中的 `extension/` 文件夹
6. 打开一个新标签页

如果之前已经加载过 Tab X，更新文件后在扩展卡片上点击 **Reload / 重新加载** 即可。

## 功能

- **新标签页仪表盘** — 替换 Chrome 默认新标签页，形成更聚焦的工作区
- **标签分组** — 按主域名整理打开的标签，并支持直接跳转与关闭
- **重复页面清理** — 发现重复 URL，并可一键关闭多余副本只保留一个
- **常用站点** — 展示 Chrome Top sites、本地手动快捷入口和拖拽保存入口
- **稍后再看** — 关闭标签前可保存到本地清单
- **干支时钟与英文时钟** — 展示干支时间头部和自然语言时钟
- **本地存储** — 使用 Chrome 扩展 API 和 `chrome.storage.local`

## 数据与权限

Tab X 不运行服务器，也不需要账号、Node.js、npm 或数据库。

| 区域 | API / 存储 |
|------|------------|
| 新标签页替换 | Chrome Manifest V3 `chrome_url_overrides.newtab` |
| 打开标签分组与聚焦 | `chrome.tabs`, `chrome.windows` |
| 常用站点快捷入口 | `chrome.topSites`，并带有 `chrome.history` 回退 |
| 稍后再看与手动快捷入口 | `chrome.storage.local` |
| 搜索框 | `chrome.search`，并带有 URL 回退 |

## 要求

- 支持 Manifest V3 的 Google Chrome
- 手动加载时需要开启开发者模式
