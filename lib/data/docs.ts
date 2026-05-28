import { getAllContent, getContentBySlug } from "@/lib/content";

export function getDocs() {
  return getAllContent("docs");
}

export function getDoc(slug: string) {
  return getContentBySlug("docs", slug);
}
