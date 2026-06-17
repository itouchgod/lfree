---
title: "Tab X Overview"
description: "Download, load, and use the Tab X Chrome new tab extension."
date: "2026-06-17"
category: "Tab X"
---

Tab X is a local Chrome Manifest V3 extension that replaces the default new tab page with a calm dashboard for tabs, shortcuts, saved-for-later links, archived pages, and time.

## Download

Tab X 1.1.0 is currently distributed through GitHub source.

| Package | Link |
|---------|------|
| **Source zip** | [tab-x main.zip](https://github.com/itouchgod/tab-x/archive/refs/heads/main.zip) |
| **Repository** | [github.com/itouchgod/tab-x](https://github.com/itouchgod/tab-x) |

## Install

1. Download and unzip the source archive
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the `extension/` folder from the unzipped Tab X source
6. Open a new tab

If you already loaded Tab X before, click **Reload** on the extension card after updating the files.

## Essentials

- **New tab dashboard** — Replaces Chrome's new tab page with a focused two-column workspace
- **Grouped tabs** — Organizes open tabs by main domain with jump, bookmark, and close controls
- **Sorting controls** — Sorts open tab groups by cleanup-friendly views such as most tabs
- **Top sites** — Shows Chrome top sites, local manual shortcuts, and a quick Add shortcut tile
- **Saved for later** — Stores selected tabs in a local checklist before closing them
- **Archived pages** — Keeps completed or archived pages in a separate local list
- **Ganzhi and word clock** — Shows a Ganzhi time header, natural-language clock, and custom Chrome entry
- **Local storage** — Uses Chrome extension APIs and `chrome.storage.local`

## Data and permissions

Tab X does not run a server and does not require an account, Node.js, npm, or a database.

| Area | API / Storage |
|------|---------------|
| New tab replacement | Chrome Manifest V3 `chrome_url_overrides.newtab` |
| Open tab grouping and focusing | `chrome.tabs`, `chrome.windows` |
| Top site shortcuts | `chrome.topSites`, with `chrome.history` fallback |
| Saved links, archived pages, and manual shortcuts | `chrome.storage.local` |
| Search box | `chrome.search`, with URL fallback |

Use Google Chrome with Manifest V3 support, and enable Developer mode for manual loading.
