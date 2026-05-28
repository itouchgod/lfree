import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

function getContentDir(type: ContentType) {
  return path.join(contentRoot, type);
}

export function getAllContent(type: ContentType): ContentItem[] {
  const dir = getContentDir(type);
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
  slug: string
): ContentItem | null {
  const filePath = path.join(getContentDir(type), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as ContentFrontmatter,
    content,
  };
}

export function getAllContentSlugs(type: ContentType): string[] {
  return getAllContent(type).map((item) => item.slug);
}

export function getChangelogByApp(appSlug: string): ContentItem[] {
  return getAllContent("changelog").filter(
    (item) => item.frontmatter.appSlug === appSlug
  );
}
