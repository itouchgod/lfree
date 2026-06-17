---
title: "Tab X 2.0.0"
description: "Tab X 2.0.0 adds an Apple-inspired dashboard refresh with adaptive dark mode, open-tab badge counts, homepage grouping, expandable groups, and sync-ready saved/archive storage utilities."
date: "2026-06-18"
appSlug: "tab-x"
published: true
highlights:
  - "Adaptive dark mode and manual footer theme toggle"
  - "Open-tab count badge, homepage grouping, and expandable groups"
  - "Sync-ready saved/archive storage utility"
---

Tab X 2.0.0 is a larger dashboard upgrade for tab-heavy Chrome sessions.

## What's new

- Adds an Apple-inspired layout with a compact signature footer and manual theme toggle
- Follows the system dark mode preference while still allowing manual light/dark switching
- Adds a toolbar badge that counts real web tabs and changes color as tab load grows
- Groups homepage-style tabs such as Gmail, X, YouTube, LinkedIn, and GitHub into one cleanup card
- Keeps localhost projects easier to distinguish by including port numbers in tab grouping
- Expands large domain groups after the first 8 tabs with a `+N more` control
- Refines Saved for later and Archived so adding, archiving, and deleting records feels smoother
- Adds a strict `chrome.storage.sync` helper for saved/archive records, storing only `url`, `title`, and `timestamp`

## Install

Download the latest source zip from GitHub, unzip it, enable Developer mode in `chrome://extensions`, then reload or load the `extension/` folder as an unpacked extension.
