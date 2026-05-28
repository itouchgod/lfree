import type { Metadata } from "next";
import Link from "next/link";
import { ChangelogCard } from "@/components/changelog-card";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { getAppsWithChangelog, getChangelogEntries } from "@/lib/data/changelog";
import { apps } from "@/lib/data/apps";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Release notes and updates across all LFree apps.",
};

interface ChangelogPageProps {
  searchParams: Promise<{ app?: string }>;
}

export default async function ChangelogPage({ searchParams }: ChangelogPageProps) {
  const { app: filterApp } = await searchParams;
  const allEntries = getChangelogEntries();
  const entries = filterApp
    ? allEntries.filter((e) => e.frontmatter.appSlug === filterApp)
    : allEntries;
  const appsWithChangelog = getAppsWithChangelog();

  return (
    <>
      <PageHeader
        title="Changelog"
        description="Release notes and product updates across the software matrix."
      />
      <section className="container pb-8">
        <div className="flex flex-wrap gap-2">
          <Link href="/changelog">
            <Badge variant={!filterApp ? "default" : "secondary"}>All</Badge>
          </Link>
          {apps.map((app) => (
            <Link key={app.slug} href={`/changelog?app=${app.slug}`}>
              <Badge
                variant={filterApp === app.slug ? "default" : "secondary"}
              >
                {app.name}
              </Badge>
            </Link>
          ))}
        </div>
      </section>
      <section className="container pb-12">
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {appsWithChangelog.map((app) => (
            <Link
              key={app.slug}
              href={`/changelog/${app.slug}`}
              className="rounded-xl border border-border/40 p-4 text-sm transition-colors hover:border-primary/30 hover:bg-card/50"
            >
              <p className="font-medium">{app.name}</p>
              <p className="mt-1 text-muted-foreground">Per-app changelog →</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="container pb-20">
        <div className="grid gap-4 md:grid-cols-2">
          {entries.map((entry) => (
            <ChangelogCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </section>
    </>
  );
}
