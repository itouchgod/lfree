import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MarkdownContent } from "@/components/markdown-content";
import { Badge } from "@/components/ui/badge";
import { getAllContentSlugs } from "@/lib/content";
import { getChangelogEntry } from "@/lib/data/changelog";
import { getAppBySlug } from "@/lib/data/apps";
import { getChangelogByApp } from "@/lib/data/changelog";
import { apps } from "@/lib/data/apps";
import { formatDate } from "@/lib/utils";

interface ChangelogSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const entrySlugs = getAllContentSlugs("changelog").map((slug) => ({ slug }));
  const appSlugs = apps.map((app) => ({ slug: app.slug }));
  return [...entrySlugs, ...appSlugs];
}

export async function generateMetadata({
  params,
}: ChangelogSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getChangelogEntry(slug);
  if (entry) {
    return {
      title: entry.frontmatter.title,
      description: entry.frontmatter.description,
    };
  }
  const app = getAppBySlug(slug);
  if (app) {
    return {
      title: `${app.name} Changelog`,
      description: `Release history for ${app.name}.`,
    };
  }
  return { title: "Changelog Not Found" };
}

export default async function ChangelogSlugPage({ params }: ChangelogSlugPageProps) {
  const { slug } = await params;

  const entry = getChangelogEntry(slug);
  if (entry) {
    const app = entry.frontmatter.appSlug
      ? getAppBySlug(entry.frontmatter.appSlug)
      : undefined;

    return (
      <article className="container max-w-3xl py-16 md:py-20">
        <Link
          href="/changelog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to changelog
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

  const app = getAppBySlug(slug);
  if (app) {
    const entries = getChangelogByApp(slug);
    return (
      <>
        <section className="container py-16 md:py-20">
          <Link
            href="/changelog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All changelog
          </Link>
          <h1 className="text-4xl font-semibold tracking-tight">
            {app.name} Changelog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Release history for {app.name}.
          </p>
          <Link
            href={`/apps/${app.slug}`}
            className="mt-4 inline-block text-sm text-primary hover:underline"
          >
            View app →
          </Link>
        </section>
        <section className="container pb-20">
          <div className="space-y-4">
            {entries.length === 0 ? (
              <p className="text-muted-foreground">No releases yet.</p>
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
