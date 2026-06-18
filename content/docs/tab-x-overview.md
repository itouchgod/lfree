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

## Chrome Web Store status

- Current submitted version: **2.0.0**
- Chrome Web Store item ID: `mdpnfjjeclibnejfdcfnbclhdhjannac`
- Submission date: June 18, 2026
- Current store status: **Pending review**
- Publication mode: publish automatically after review approval

Until the store listing is approved, use the GitHub source zip and manual loading steps below.

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
- **Synced saved records** — Uses `chrome.storage.sync` for Saved for later and Archived records
- **Local preferences** — Keeps manual shortcuts, hidden automatic shortcuts, and sorting preferences in `chrome.storage.local`

## Data and permissions

Tab X does not run a Tab X server and does not require an app account, Node.js, npm, or a database.

| Area | API / Storage |
|------|---------------|
| New tab replacement | Chrome Manifest V3 `chrome_url_overrides.newtab` |
| Open tab grouping, counting, focusing, and closing | `chrome.tabs`, `chrome.windows` |
| Open tab count badge | `chrome.action` in the service worker |
| Search box | `chrome.search`, with URL fallback |
| Top site shortcuts | `chrome.topSites`, with `chrome.history` fallback |
| Site icons | Chrome extension `/_favicon/` API with initials fallback |
| New tab favicon | Bundled Chrome-style `icons/newtab-favicon.svg` asset |
| Saved for later + Archived | `chrome.storage.sync` keys `savedForLater`, `archived`; sanitized to `url`, `title`, and `timestamp` |
| Legacy saved-record migration | Old `chrome.storage.local` key `deferred` is migrated once into sync storage |
| Manual shortcuts | `chrome.storage.local` key `favoriteLinks` |
| Hidden automatic shortcuts | `chrome.storage.local` key `hiddenTopSiteUrls` |
| Open tabs sort preference | `chrome.storage.local` key `openTabsSortMode` |
| Sound | Web Audio API |
| Confetti | DOM/CSS animation |

Use Google Chrome with Manifest V3 support, and enable Developer mode for manual loading.

## What changed in 2.0.0

- Adds the extension toolbar badge for real open-tab counts, with color states for calmer tab awareness
- Adds adaptive dark mode plus a manual footer theme toggle
- Adds a Homepages group for Gmail, X, YouTube, LinkedIn, and GitHub home pages
- Keeps localhost projects distinct by including port numbers in grouping
- Adds expandable groups for large tab sets
- Refines the Saved for later and Archived panel so updates feel local and smooth
- Moves Saved for later and Archived records to Chrome sync, with one-time migration from the old local `deferred` key
- Strips heavy metadata before syncing, keeping only `url`, `title`, and `timestamp`
