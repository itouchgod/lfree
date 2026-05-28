import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MarkdownContent } from "@/components/markdown-content";
import { getAllContentSlugs } from "@/lib/content";
import { getBlogPost } from "@/lib/data/blog";
import { formatDate } from "@/lib/utils";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllContentSlugs("blog").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="container max-w-3xl py-16 md:py-20">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>
      <header className="mb-10 space-y-4 border-b border-border/40 pb-10">
        <p className="text-sm text-muted-foreground">
          {formatDate(post.frontmatter.date)}
          {post.frontmatter.category && ` · ${post.frontmatter.category}`}
          {post.frontmatter.readingTime && ` · ${post.frontmatter.readingTime}`}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          {post.frontmatter.title}
        </h1>
        <p className="text-lg text-muted-foreground">{post.frontmatter.description}</p>
      </header>
      <MarkdownContent content={post.content} />
    </article>
  );
}
