---
title: "Tab X 1.0.0"
description: "Tab X 加入 LFree，作为本地运行的 Chrome 新标签页仪表盘，用于标签分组、快捷入口、稍后再看和时间显示。"
date: "2026-06-16"
appSlug: "tab-x"
published: true
highlights:
  - "Chrome Manifest V3 新标签页替换扩展"
  - "按域名分组打开标签并清理重复页面"
  - "本地稍后再看清单与手动快捷入口"
---

Tab X 现在作为第三个公开应用加入 LFree。

## 本次包含

- 替换 Chrome 新标签页，提供本地运行的仪表盘
- 按主域名整理已打开标签
- 支持 Top sites、手动快捷入口和拖拽保存快捷入口
- 标记重复 URL，并可关闭多余副本
- 使用 `chrome.storage.local` 保存稍后再看清单

## 安装

从 GitHub 下载源码 zip，解压后在 `chrome://extensions` 开启开发者模式，然后加载其中的 `extension/` 文件夹。
