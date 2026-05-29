import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/markdown-content";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { getAllContentSlugs } from "@/lib/content";
import { getChangelogEntry, getChangelogByApp } from "@/lib/data/changelog";
import { getPublishedAppBySlug, getPublishedApps } from "@/lib/data/apps";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = new Set<string>();
  for (const locale of ["en", "zh"] as const) {
    getAllContentSlugs("changelog", locale).forEach((s) => slugs.add(s));
  }
  getPublishedApps().forEach((a) => slugs.add(a.slug));
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const entry = getChangelogEntry(slug, locale as "en" | "zh");
  if (entry) {
    return {
      title: entry.frontmatter.title,
      description: entry.frontmatter.description,
    };
  }
  const app = getPublishedAppBySlug(slug);
  if (app) {
    return {
      title: `${app.name} Changelog`,
      description: `Release history for ${app.name}.`,
    };
  }
  return { title: "Changelog Not Found" };
}

export default async function ChangelogSlugPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("changelog");

  const entry = getChangelogEntry(slug, locale as "en" | "zh");
  if (entry) {
    const app = entry.frontmatter.appSlug
      ? getPublishedAppBySlug(entry.frontmatter.appSlug)
      : undefined;

    return (
      <article className="container max-w-3xl py-16 md:py-20">
        <Link
          href="/changelog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToAll")}
        </Link>
        <header className="mb-10 space-y-4 border-b border-border/40 pb-10">
          <div className="flex flex-wrap items-center gap-2">
            {app && <Badge variant="secondary">{app.name}</Badge>}
            <span className="text-sm text-muted-foreground">
              {formatDate(entry.frontmatter.date)}
            </span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">
            {entry.frontmatter.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {entry.frontmatter.description}
          </p>
        </header>
        <MarkdownContent content={entry.content} />
      </article>
    );
  }

  const app = getPublishedAppBySlug(slug);
  if (app) {
    const entries = getChangelogByApp(slug, locale as "en" | "zh");
    return (
      <>
        <section className="container py-16 md:py-20">
          <Link
            href="/changelog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToAll")}
          </Link>
          <h1 className="text-4xl font-semibold tracking-tight">
            {app.name} {t("title")}
          </h1>
          <Link
            href={`/apps/${app.slug}`}
            className="mt-4 inline-block text-sm text-primary hover:underline"
          >
            MMH →
          </Link>
        </section>
        <section className="container pb-20">
          <div className="space-y-4">
            {entries.length === 0 ? (
              <p className="text-muted-foreground">{t("empty")}</p>
            ) : (
              entries.map((e) => (
                <Link
                  key={e.slug}
                  href={`/changelog/${e.slug}`}
                  className="block rounded-xl border border-border/40 p-6 transition-colors hover:border-primary/30"
                >
                  <p className="font-medium">{e.frontmatter.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatDate(e.frontmatter.date)} — {e.frontmatter.description}
                  </p>
                </Link>
              ))
            )}
          </div>
        </section>
      </>
    );
  }

  notFound();
}
