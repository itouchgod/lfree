import { getAllContent, getContentBySlug } from "@/lib/content";

export function getBlogPosts() {
  return getAllContent("blog");
}

export function getBlogPost(slug: string) {
  return getContentBySlug("blog", slug);
}

export function getLatestBlogPosts(limit = 3) {
  return getBlogPosts().slice(0, limit);
}
