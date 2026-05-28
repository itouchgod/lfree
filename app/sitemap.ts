import type { MetadataRoute } from "next";
import { getAllContentSlugs } from "@/lib/content";
import { apps } from "@/lib/data/apps";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes = [
    "",
    "/apps",
    "/docs",
    "/blog",
    "/changelog",
    "/pricing",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const appRoutes = apps.map((app) => ({
    url: `${base}/apps/${app.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogRoutes = getAllContentSlugs("blog").map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
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

  const appChangelogRoutes = apps.map((app) => ({
    url: `${base}/changelog/${app.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...appRoutes,
    ...blogRoutes,
    ...docsRoutes,
    ...changelogRoutes,
    ...appChangelogRoutes,
  ];
}
