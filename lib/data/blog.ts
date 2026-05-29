import type { Locale } from "@/i18n/routing";
import { getAllContent, getContentBySlug } from "@/lib/content";

export function getBlogPosts(locale: Locale = "en") {
  return getAllContent("blog", locale);
}

export function getBlogPost(slug: string, locale: Locale = "en") {
  return getContentBySlug("blog", slug, locale);
}

export function getLatestBlogPosts(limit = 3, locale: Locale = "en") {
  return getBlogPosts(locale).slice(0, limit);
}
