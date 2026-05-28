export const siteConfig = {
  name: "LFree",
  description:
    "A personal software lab building calm, intelligent and practical apps for macOS, productivity and AI workflows.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lfree.com",
  developer: "itouchgod",
  author: "itouchgod",
  email: "ukluocn@gmail.com",
  links: {
    github: "https://github.com/itouchgod",
    twitter: "https://twitter.com",
  },
} as const;

export const navLinks = [
  { href: "/apps", label: "Apps" },
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
  { href: "/changelog", label: "Changelog" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
] as const;

export const footerLinks = {
  product: [
    { href: "/apps", label: "Apps" },
    { href: "/changelog", label: "Changelog" },
    { href: "/pricing", label: "Pricing" },
  ],
  resources: [
    { href: "/docs", label: "Documentation" },
    { href: "/blog", label: "Blog" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
} as const;
