import type { MetadataRoute } from "next";
import { getAllContentSlugs } from "@/lib/content";
import { getPublishedApps } from "@/lib/data/apps";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes = [
    "",
    "/docs",
    "/changelog",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const appRoutes = getPublishedApps().map((app) => ({
    url: `${base}/apps/${app.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const docsRoutes = getAllContentSlugs("docs").map((slug) => ({
    url: `${base}/docs/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const changelogRoutes = getAllContentSlugs("changelog").map((slug) => ({
    url: `${base}/changelog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...appRoutes,
    ...docsRoutes,
    ...changelogRoutes,
  ];
}
