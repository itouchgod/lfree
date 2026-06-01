export const siteConfig = {
  name: "LFree",
  logo: "/logo.png",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lfree.cc",
  developer: "itouchgod",
  author: "itouchgod",
  email: "ukluocn@gmail.com",
  links: {
    github: "https://github.com/itouchgod",
    twitter: "https://twitter.com",
  },
} as const;

export const navHrefs = [
  { href: "/apps", key: "apps" as const },
  { href: "/docs", key: "docs" as const },
  { href: "/blog", key: "blog" as const },
  { href: "/changelog", key: "changelog" as const },
] as const;

export const footerHrefs = [
  { href: "/apps/mmh", key: "mmh" as const },
  { href: "/apps/filenest", key: "filenest" as const },
  { href: "/docs", key: "documentation" as const },
  { href: "/blog", key: "blog" as const },
  { href: "/changelog", key: "changelog" as const },
  { href: "/about", key: "about" as const },
  { href: "/privacy", key: "privacy" as const },
  { href: "/terms", key: "terms" as const },
] as const;
