export const siteConfig = {
  name: "LFree",
  description:
    "MMH — a calm macOS app for protecting your photos, videos and local files with local-only encryption.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lfree.cc",
  developer: "itouchgod",
  author: "itouchgod",
  email: "ukluocn@gmail.com",
  links: {
    github: "https://github.com/itouchgod",
    twitter: "https://twitter.com",
  },
} as const;

export const navLinks = [
  { href: "/apps/mmh", label: "MMH" },
  { href: "/docs", label: "Docs" },
  { href: "/changelog", label: "Changelog" },
] as const;

export const footerLinks = [
  { href: "/apps/mmh", label: "MMH" },
  { href: "/docs/mmh-overview", label: "Documentation" },
  { href: "/changelog", label: "Changelog" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;
