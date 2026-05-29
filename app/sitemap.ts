import type { MetadataRoute } from "next";
import { getAllContentSlugs } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { getPublishedApps } from "@/lib/data/apps";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticPaths = ["", "/apps/mmh", "/docs", "/changelog", "/contact", "/privacy", "/terms"];

  const staticRoutes = routing.locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }))
  );

  const appRoutes = routing.locales.flatMap((locale) =>
    getPublishedApps().map((app) => ({
      url: `${base}/${locale}/apps/${app.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }))
  );

  const docsRoutes = routing.locales.flatMap((locale) =>
    getAllContentSlugs("docs", locale).map((slug) => ({
      url: `${base}/${locale}/docs/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const changelogRoutes = routing.locales.flatMap((locale) =>
    getAllContentSlugs("changelog", locale).map((slug) => ({
      url: `${base}/${locale}/changelog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  );

  return [...staticRoutes, ...appRoutes, ...docsRoutes, ...changelogRoutes];
}
