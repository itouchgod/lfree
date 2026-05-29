import type { Locale } from "@/i18n/routing";
import { getAllContent, getContentBySlug } from "@/lib/content";

export function getDocs(locale: Locale = "en") {
  return getAllContent("docs", locale);
}

export function getDoc(slug: string, locale: Locale = "en") {
  return getContentBySlug("docs", slug, locale);
}
