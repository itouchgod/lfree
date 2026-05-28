import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MarkdownContent } from "@/components/markdown-content";
import { getAllContentSlugs } from "@/lib/content";
import { getDoc } from "@/lib/data/docs";
import { formatDate } from "@/lib/utils";

interface DocPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllContentSlugs("docs").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return { title: "Doc Not Found" };
  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
  };
}

export default async function DocDetailPage({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  return (
    <article className="container max-w-3xl py-16 md:py-20">
      <Link
        href="/docs"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to docs
      </Link>
      <header className="mb-10 space-y-4 border-b border-border/40 pb-10">
        <p className="text-sm text-muted-foreground">
          {formatDate(doc.frontmatter.date)}
          {doc.frontmatter.category && ` · ${doc.frontmatter.category}`}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          {doc.frontmatter.title}
        </h1>
        <p className="text-lg text-muted-foreground">{doc.frontmatter.description}</p>
      </header>
      <MarkdownContent content={doc.content} />
    </article>
  );
}
