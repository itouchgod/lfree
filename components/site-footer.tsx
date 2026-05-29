import Link from "next/link";
import { footerLinks, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/40">
      <div className="container flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Link href="/" className="font-semibold tracking-tight">
            {siteConfig.name}
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="container border-t border-border/40 py-6 text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.developer} ·{" "}
          <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
            {siteConfig.email}
          </a>
        </p>
      </div>
    </footer>
  );
}
