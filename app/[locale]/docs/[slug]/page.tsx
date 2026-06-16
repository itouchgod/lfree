import type { Metadata } from "next";
import { ArrowLeft, Download } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/markdown-content";
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
    <article className="pb-16">
      <div className="border-b border-border/30 bg-card/15">
        <div className="container max-w-2xl py-8 md:py-10">
          <Link
            href="/docs"
            className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </Link>
          <p className="text-sm text-muted-foreground">
            {doc.frontmatter.category} · {formatDate(doc.frontmatter.date)}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {doc.frontmatter.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            {doc.frontmatter.description}
          </p>
          {app && (
            <Button className="mt-5" size="sm" asChild>
              <Link href={`/apps/${app.slug}`}>
                <Download className="h-4 w-4" />
                {tNav("download")} {app.name}
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="container max-w-2xl py-8 md:py-10">
        <MarkdownContent content={doc.content} className="text-[15px]" />
      </div>
    </article>
  );
}
