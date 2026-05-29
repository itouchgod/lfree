import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/routing";

export type ContentType = "blog" | "docs" | "changelog";

export interface ContentFrontmatter {
  title: string;
  description: string;
  date: string;
  author?: string;
  appSlug?: string;
  category?: string;
  readingTime?: string;
}

export interface ContentItem {
  slug: string;
  frontmatter: ContentFrontmatter;
  content: string;
}

const contentRoot = path.join(process.cwd(), "content");

function getContentDir(type: ContentType, locale: Locale) {
  const localized = path.join(contentRoot, locale, type);
  if (fs.existsSync(localized)) return localized;
  return path.join(contentRoot, type);
}

export function getAllContent(type: ContentType, locale: Locale = "en"): ContentItem[] {
  const dir = getContentDir(type, locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        frontmatter: data as ContentFrontmatter,
        content,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getContentBySlug(
  type: ContentType,
  slug: string,
  locale: Locale = "en"
): ContentItem | null {
  const localizedPath = path.join(getContentDir(type, locale), `${slug}.md`);
  const fallbackPath = path.join(contentRoot, type, `${slug}.md`);

  const filePath = fs.existsSync(localizedPath)
    ? localizedPath
    : fs.existsSync(fallbackPath)
      ? fallbackPath
      : null;

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as ContentFrontmatter,
    content,
  };
}

export function getAllContentSlugs(type: ContentType, locale: Locale = "en"): string[] {
  return getAllContent(type, locale).map((item) => item.slug);
}

export function getChangelogByApp(appSlug: string, locale: Locale = "en"): ContentItem[] {
  return getAllContent("changelog", locale).filter(
    (item) => item.frontmatter.appSlug === appSlug
  );
}
