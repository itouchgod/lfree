---
title: "Tab X Overview"
description: "Download, load, and use the Tab X Chrome new tab extension."
date: "2026-06-18"
category: "Tab X"
---

Tab X is a local Chrome Manifest V3 extension that replaces the default new tab page with an Apple-inspired dashboard for tabs, shortcuts, saved-for-later links, archived pages, adaptive themes, and time.

## Download

Tab X 2.0.0 is currently distributed through GitHub source.

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

- **New tab dashboard** — Replaces Chrome's new tab page with a local Apple-inspired workspace
- **Ganzhi and word clock** — Shows Ganzhi time, natural-language English time, and an open-tab count badge
- **Grouped tabs** — Organizes open tabs by main domain, special homepages, and localhost ports
- **Sorting and expansion** — Sorts by most tabs, domain name, or recent activity, and expands large groups after the first 8 tabs
- **Top sites** — Shows Chrome top sites, history fallback shortcuts, manual shortcuts, and drag-to-save shortcuts
- **Saved and archived** — Stores selected tabs for later, then moves completed items into an Archived accordion
- **Adaptive theme** — Follows system dark mode and provides a manual footer theme toggle
- **Sync-ready utility** — Includes a strict `chrome.storage.sync` helper for lightweight saved/archive records
- **Local-first storage** — Uses Chrome extension APIs and `chrome.storage.local` for the live dashboard

## Data and permissions

Tab X does not run a server and does not require an account, Node.js, npm, or a database.

| Area | API / Storage |
|------|---------------|
| New tab replacement | Chrome Manifest V3 `chrome_url_overrides.newtab` |
| Open tab grouping, counting, focusing, and closing | `chrome.tabs`, `chrome.windows` |
| Open tab count badge | `chrome.action` in the service worker |
| Search box | `chrome.search`, with URL fallback |
| Top site shortcuts | `chrome.topSites`, with `chrome.history` fallback |
| Site icons | Chrome extension `/_favicon/` API with initials fallback |
| Saved for later UI | `chrome.storage.local` key `deferred` |
| Manual shortcuts | `chrome.storage.local` key `favoriteLinks` |
| Hidden automatic shortcuts | `chrome.storage.local` key `hiddenTopSiteUrls` |
| Open tabs sort preference | `chrome.storage.local` key `openTabsSortMode` |
| Optional sync storage utility | `chrome.storage.sync` keys `savedForLater`, `archived`, sanitized to `url`, `title`, and `timestamp` |
| Sound and close feedback | Web Audio API and DOM/CSS animation |

Use Google Chrome with Manifest V3 support, and enable Developer mode for manual loading.

## What changed in 2.0.0

- Adds the extension toolbar badge for real open-tab counts, with color states for calmer tab awareness
- Adds adaptive dark mode plus a manual footer theme toggle
- Adds a Homepages group for Gmail, X, YouTube, LinkedIn, and GitHub home pages
- Keeps localhost projects distinct by including port numbers in grouping
- Adds expandable groups for large tab sets
- Refines the Saved for later and Archived panel so updates feel local and smooth
- Adds a sync-ready storage module that strips heavy metadata before writing records to Chrome sync
