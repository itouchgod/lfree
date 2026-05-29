import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/markdown-content";
import { Link } from "@/i18n/navigation";
import { getAllContentSlugs } from "@/lib/content";
import { getDoc } from "@/lib/data/docs";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = new Set<string>();
  for (const locale of ["en", "zh"] as const) {
    getAllContentSlugs("docs", locale).forEach((s) => slugs.add(s));
  }
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const doc = getDoc(slug, locale as "en" | "zh");
  if (!doc) return { title: "Doc Not Found" };
  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
  };
}

export default async function DocDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("docs");

  const doc = getDoc(slug, locale as "en" | "zh");
  if (!doc) notFound();

  return (
    <article className="container max-w-3xl py-16 md:py-20">
      <Link
        href="/docs"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("back")}
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
