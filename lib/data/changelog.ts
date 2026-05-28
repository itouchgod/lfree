import { getAllContent, getContentBySlug, getChangelogByApp } from "@/lib/content";
import { apps } from "@/lib/data/apps";

export function getChangelogEntries() {
  return getAllContent("changelog");
}

export function getChangelogEntry(slug: string) {
  return getContentBySlug("changelog", slug);
}

export function getLatestChangelogEntries(limit = 5) {
  return getChangelogEntries().slice(0, limit);
}

export function getAppsWithChangelog() {
  const appSlugs = new Set(
    getChangelogEntries().map((e) => e.frontmatter.appSlug).filter(Boolean)
  );
  return apps.filter((app) => appSlugs.has(app.slug));
}

export { getChangelogByApp };
