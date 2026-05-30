import type { Metadata } from "next";
import { ArrowLeft, Download } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/markdown-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getAllContentSlugs } from "@/lib/content";
import { appSlugFromDocSlug } from "@/lib/app-docs";
import { getPublishedAppBySlug } from "@/lib/data/apps";
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
  const tNav = await getTranslations("nav");

  const doc = getDoc(slug, locale as "en" | "zh");
  if (!doc) notFound();

  const appSlug = appSlugFromDocSlug(slug);
  const app = getPublishedAppBySlug(appSlug);

  return (
    <article className="pb-20">
      <div className="border-b border-border/40 bg-card/20">
        <div className="container max-w-3xl py-10 md:py-14">
          <Link
            href="/docs"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            {doc.frontmatter.category && (
              <Badge variant="secondary">{doc.frontmatter.category}</Badge>
            )}
            <span className="text-sm text-muted-foreground">
              {formatDate(doc.frontmatter.date)}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            {doc.frontmatter.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            {doc.frontmatter.description}
          </p>
          {app && (
            <Button className="mt-6" asChild>
              <Link href={`/apps/${app.slug}`}>
                <Download className="h-4 w-4" />
                {tNav("download")} {app.name}
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="container max-w-3xl py-12 md:py-16">
        <MarkdownContent content={doc.content} />
      </div>
    </article>
  );
}
