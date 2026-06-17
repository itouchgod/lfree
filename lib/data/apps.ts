export type AppStatus =
  | "In Development"
  | "Prototype"
  | "Internal Tool"
  | "Released";

export interface AppFaq {
  question: string;
  answer: string;
}

export interface AppDownload {
  label: string;
  arch: "apple-silicon" | "intel" | "universal";
  url: string;
}

export interface AppScreenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface App {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  type: string;
  category: string;
  tags: string[];
  status: AppStatus;
  features: string[];
  homeHighlights: string[];
  faq: AppFaq[];
  /** @deprecated Prefer `downloads` for multi-arch macOS builds */
  downloadUrl?: string;
  downloads?: AppDownload[];
  latestVersion?: string;
  releasedAt?: string;
  updatedAt?: string;
  macos: string;
  downloadFormat: string;
  dataLocation: string;
  networkAccess: string;
  releaseChannel?: string;
  repositoryUrl?: string;
  releaseUrl?: string;
  featured?: boolean;
  /** Visible on site listings and navigation */
  published?: boolean;
  screenshots?: AppScreenshot[];
  /** uniform = same frame for every slide (landscape); mixed = compact slides + large last (MMH) */
  screenshotLayout?: "uniform" | "mixed";
}

export const apps: App[] = [
  {
    slug: "mmh",
    name: "MMH",
    tagline: "Private media protection for macOS",
    description:
      "A private and calm macOS app for protecting personal photos, videos and local files.",
    type: "macOS Privacy Utility",
    category: "Privacy",
    tags: ["Encryption", "Local-first", "Media vault", "No account"],
    status: "Released",
    featured: true,
    published: true,
    latestVersion: "1.0.0",
    releasedAt: "2026-05-18",
    updatedAt: "2026-05-18",
    macos: "macOS 14 Sonoma or later",
    downloadFormat: ".zip app bundle",
    dataLocation: "Local encrypted vault folder",
    networkAccess: "No cloud sync or account required",
    releaseChannel: "GitHub Releases",
    repositoryUrl: "https://github.com/itouchgod/mmh",
    releaseUrl: "https://github.com/itouchgod/mmh/releases/tag/v1.0.0",
    downloads: [
      {
        label: "Apple Silicon",
        arch: "apple-silicon",
        url: "https://github.com/itouchgod/mmh/releases/download/v1.0.0/MMH-Apple-Silicon.zip",
      },
      {
        label: "Intel",
        arch: "intel",
        url: "https://github.com/itouchgod/mmh/releases/download/v1.0.0/MMH-Intel.zip",
      },
    ],
    screenshots: [
      {
        src: "/apps/mmh/setup.png",
        alt: "MMH initial setup — select encrypted storage folder and create master password",
        caption: "First launch — choose vault folder and set master password",
      },
      {
        src: "/apps/mmh/unlock.png",
        alt: "MMH unlock screen with combination dial and master password field",
        caption: "Unlock your vault with the master password",
      },
      {
        src: "/apps/mmh/vault.png",
        alt: "MMH main window with encrypted folders, secure notes and sidebar navigation",
        caption: "Main vault — encrypted folders and secure notes",
      },
    ],
    features: [
      "Local-only encryption for photos and videos",
      "Quick-hide vault for sensitive content",
      "Drag-and-drop import from Finder",
      "No cloud sync — your data stays on device",
      "Minimal UI designed for daily calm use",
    ],
    homeHighlights: [
      "Private vault for personal photos and videos",
      "Designed around local-only storage",
      "Two-chip downloads for Apple Silicon and Intel Macs",
    ],
    faq: [
      {
        question: "Which download should I choose?",
        answer:
          "Apple Silicon (M1/M2/M3/M4) or Intel — check About This Mac → Chip / Processor. Download the matching .zip, unzip, and open MMH.app.",
      },
      {
        question: "Does MMH upload my files?",
        answer:
          "No. MMH is designed as a local-first privacy tool. Your media never leaves your Mac.",
      },
      {
        question: "Which macOS versions are supported?",
        answer: "MMH targets macOS 14 Sonoma and later.",
      },
    ],
  },
  {
    slug: "filenest",
    name: "FileNest",
    tagline: "Collect, tag, and open your favorite folders on macOS",
    description:
      "A lightweight macOS desktop tool to manage and quickly access frequently used folders. Drag folders in, add tags and favorites, search, and open them in Finder from the app window or menu bar.",
    type: "macOS Folder Manager",
    category: "Productivity",
    tags: ["Folder launcher", "Tags", "Menu bar", "Local JSON"],
    status: "Released",
    featured: true,
    published: true,
    latestVersion: "0.1.3",
    releasedAt: "2026-05-29",
    updatedAt: "2026-05-29",
    macos: "macOS 13 Ventura or later",
    downloadFormat: ".zip app bundle",
    dataLocation: "Local JSON library on your Mac",
    networkAccess: "No login or cloud sync required",
    releaseChannel: "GitHub Releases",
    repositoryUrl: "https://github.com/itouchgod/filenest",
    releaseUrl: "https://github.com/itouchgod/filenest/releases/tag/v0.1.3",
    downloads: [
      {
        label: "Apple Silicon",
        arch: "apple-silicon",
        url: "https://github.com/itouchgod/filenest/releases/download/v0.1.3/FileNest-mac-arm64.zip",
      },
      {
        label: "Intel",
        arch: "intel",
        url: "https://github.com/itouchgod/filenest/releases/download/v0.1.3/FileNest-mac-x64.zip",
      },
    ],
    features: [
      "Drag folders in and organize with custom tags",
      "Favorites and fast search across your library",
      "Open any entry in Finder with one click",
      "Menu bar quick access and recent folders",
      "Import and export JSON backups — data stays local",
      "No account, no cloud sync required",
    ],
    homeHighlights: [
      "Fast access to the folders you use every day",
      "Search, tags and favorites without a cloud account",
      "Menu bar access plus JSON backup import/export",
    ],
    faq: [
      {
        question: "Which download should I choose?",
        answer:
          "Apple Silicon (M1/M2/M3/M4) or Intel — check About This Mac → Chip / Processor. Download the matching .zip, unzip, and open FileNest.app.",
      },
      {
        question: "Where is my data stored?",
        answer:
          "All folders, tags, and settings are saved locally on your Mac as JSON. FileNest does not require login and does not sync to the cloud.",
      },
      {
        question: "How is FileNest different from Finder?",
        answer:
          "Finder is great for browsing any path. FileNest keeps the folders you care about in one place — tagged, searchable, and reachable from the window or menu bar without digging through nested directories.",
      },
      {
        question: "Which macOS versions are supported?",
        answer: "FileNest targets macOS 13 Ventura and later.",
      },
    ],
    screenshotLayout: "uniform",
    screenshots: [
      {
        src: "/apps/filenest/main.png",
        alt: "FileNest main window — folder cards with paths, favorites, and search",
        caption: "Folder library — favorites, search, and grid layout",
      },
      {
        src: "/apps/filenest/grid.png",
        alt: "FileNest compact grid view with folder icons",
        caption: "Compact grid — quick visual scan of your folders",
      },
      {
        src: "/apps/filenest/edit.png",
        alt: "FileNest edit folder dialog with tags and display name",
        caption: "Edit folder — tags, favorites, and custom display name",
      },
    ],
  },
  {
    slug: "tab-x",
    name: "Tab X",
    tagline: "Calm Chrome dashboard for tabs, shortcuts, and time",
    description:
      "A local Chrome Manifest V3 extension that replaces the new tab page with an Apple-inspired dashboard for open tabs, top sites, saved links, archived pages, adaptive themes, and time.",
    type: "Chrome New Tab Extension",
    category: "Browser Productivity",
    tags: ["Chrome extension", "New tab", "Tab manager", "Local storage"],
    status: "Released",
    featured: true,
    published: true,
    latestVersion: "2.0.0",
    releasedAt: "2026-06-16",
    updatedAt: "2026-06-18",
    macos: "Google Chrome with Manifest V3 support",
    downloadFormat: "Source zip / unpacked extension",
    dataLocation: "Chrome extension local storage",
    networkAccess: "No server, account, npm, or database required",
    releaseChannel: "GitHub source",
    repositoryUrl: "https://github.com/itouchgod/tab-x",
    downloadUrl: "https://github.com/itouchgod/tab-x/archive/refs/heads/main.zip",
    features: [
      "Replaces Chrome's new tab page with an Apple-inspired local dashboard",
      "Shows Ganzhi time, a natural-language word clock, and an open-tab count badge",
      "Groups open tabs by main domain, homepages, and localhost ports with expandable lists",
      "Sorts open tab groups by most tabs, domain name, or recent activity",
      "Shows top sites, manual shortcuts, drag-to-save shortcuts, and hidden automatic shortcuts",
      "Saves tabs for later, archives completed items, and updates the side panel smoothly",
      "Follows system dark mode and includes a manual footer theme toggle",
      "Includes a sync-ready storage helper that keeps saved/archive records lightweight",
      "Runs inside Chrome with local-first storage and no server, account, build step, npm, or database",
    ],
    homeHighlights: [
      "Apple-inspired new tab dashboard for tab-heavy browsing",
      "Grouped tabs, saved/archive lists, badge counts, and theme switching",
      "Local-first Chrome extension with no server or account",
    ],
    faq: [
      {
        question: "Is Tab X on the Chrome Web Store?",
        answer:
          "Not yet. Download the source zip from GitHub, unzip it, then load the extension/ folder from chrome://extensions with Developer mode enabled.",
      },
      {
        question: "Does Tab X send my tabs to a server?",
        answer:
          "No. Tab X runs as a local Chrome extension. The dashboard uses chrome.storage.local for everyday data, and its optional sync helper stores only url, title, and timestamp fields.",
      },
      {
        question: "Why does it need tab and history permissions?",
        answer:
          "Tab permissions let Tab X count, group, focus, save, and close open tabs. History and topSites are used only to create local shortcut suggestions when Chrome provides them, and favicon permission is used for stable site icons.",
      },
    ],
    screenshotLayout: "uniform",
    screenshots: [
      {
        src: "/apps/tab-x/dashboard.png",
        alt: "Tab X 2.0.0 Chrome new tab dashboard with top sites, grouped open tabs, saved-for-later panel, archived panel, and time",
        caption: "Dashboard — grouped tabs, top sites, saved and archived links, theme controls, and time at a glance",
      },
    ],
  },
  {
    slug: "lc-app",
    name: "LC App",
    tagline: "Quotation-to-invoice workflow system",
    description:
      "A custom workflow system for quotation, confirmation, invoice and document management.",
    type: "Business Workflow System",
    category: "Workflow",
    tags: ["Internal", "Documents", "PDF", "Accounting"],
    status: "Internal Tool",
    featured: false,
    published: false,
    macos: "Private deployment",
    downloadFormat: "Not public",
    dataLocation: "Private business workspace",
    networkAccess: "Deployment-specific",
    features: [
      "End-to-end quote → confirm → invoice pipeline",
      "PDF generation with branded templates",
      "Client and project document archive",
      "Status tracking dashboard",
      "Export for accounting workflows",
    ],
    homeHighlights: [
      "Quote-to-invoice workflow",
      "Branded document templates",
      "Private business deployment",
    ],
    faq: [
      {
        question: "Is LC App available publicly?",
        answer:
          "LC App is an internal tool built for specific business workflows and is not offered as a public product.",
      },
      {
        question: "Can I request a similar system?",
        answer:
          "Email ukluocn@gmail.com to discuss custom workflow tooling.",
      },
    ],
  },
];

export function getAppBySlug(slug: string): App | undefined {
  return apps.find((app) => app.slug === slug);
}

export function getPublishedAppBySlug(slug: string): App | undefined {
  const app = getAppBySlug(slug);
  return app?.published ? app : undefined;
}

export function getPublishedApps(): App[] {
  return apps.filter((app) => app.published);
}

export function getFeaturedApps(): App[] {
  return getPublishedApps();
}

export function getLatestReleasedApp(): App | undefined {
  return getPublishedApps().find((app) => app.status === "Released");
}

export function getAppDownloads(app: App): AppDownload[] {
  if (app.downloads?.length) return app.downloads;
  if (app.downloadUrl) {
    return [
      {
        label: "Download",
        arch: "universal",
        url: app.downloadUrl,
      },
    ];
  }
  return [];
}

export function canDownloadApp(app: App): boolean {
  return app.status === "Released" && getAppDownloads(app).length > 0;
}
