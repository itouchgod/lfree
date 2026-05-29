import type { Locale } from "@/i18n/routing";
import { getAllContent, getContentBySlug, getChangelogByApp } from "@/lib/content";
import { getPublishedApps } from "@/lib/data/apps";

export function getChangelogEntries(locale: Locale = "en") {
  return getAllContent("changelog", locale);
}

export function getChangelogEntry(slug: string, locale: Locale = "en") {
  return getContentBySlug("changelog", slug, locale);
}

export function getLatestChangelogEntries(limit = 5, locale: Locale = "en") {
  return getChangelogEntries(locale).slice(0, limit);
}

export function getAppsWithChangelog(locale: Locale = "en") {
  const appSlugs = new Set(
    getChangelogEntries(locale).map((e) => e.frontmatter.appSlug).filter(Boolean)
  );
  return getPublishedApps().filter((app) => appSlugs.has(app.slug));
}

export { getChangelogByApp };
