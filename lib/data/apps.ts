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
  status: AppStatus;
  features: string[];
  faq: AppFaq[];
  /** @deprecated Prefer `downloads` for multi-arch macOS builds */
  downloadUrl?: string;
  downloads?: AppDownload[];
  latestVersion?: string;
  featured?: boolean;
  /** Visible on site listings and navigation */
  published?: boolean;
  screenshots?: AppScreenshot[];
}

export const apps: App[] = [
  {
    slug: "mmh",
    name: "MMH",
    tagline: "Private media protection for macOS",
    description:
      "A private and calm macOS app for protecting personal photos, videos and local files.",
    type: "macOS Privacy Utility",
    status: "Released",
    featured: true,
    published: true,
    latestVersion: "1.0.0",
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
    tagline: "Visual folder launcher for power users",
    description:
      "A visual folder launcher for quickly accessing frequently used directories.",
    type: "macOS Productivity Tool",
    status: "Prototype",
    featured: false,
    published: false,
    features: [
      "Grid of favorite folders with custom icons",
      "Global hotkey to open from anywhere",
      "Recent directories and smart suggestions",
      "Per-workspace layouts for different projects",
      "Lightweight menu bar companion",
    ],
    faq: [
      {
        question: "How is FileNest different from Finder?",
        answer:
          "FileNest focuses on speed — one hotkey to reach your most-used folders without navigating nested paths.",
      },
      {
        question: "Can I sync layouts across Macs?",
        answer: "Sync is planned for a future release via iCloud or manual export.",
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
    status: "Internal Tool",
    featured: false,
    published: false,
    features: [
      "End-to-end quote → confirm → invoice pipeline",
      "PDF generation with branded templates",
      "Client and project document archive",
      "Status tracking dashboard",
      "Export for accounting workflows",
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
          "Reach out via the contact page to discuss custom workflow tooling.",
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
