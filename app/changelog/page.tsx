import type { Metadata } from "next";
import Link from "next/link";
import { ChangelogCard } from "@/components/changelog-card";
import { PageHeader } from "@/components/page-header";
import { getChangelogByApp } from "@/lib/data/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description: "MMH release notes and version history.",
};

export default function ChangelogPage() {
  const entries = getChangelogByApp("mmh");

  return (
    <>
      <PageHeader
        title="Changelog"
        description="Release notes for MMH."
      />
      <section className="container pb-20">
        <div className="mx-auto max-w-2xl space-y-4">
          {entries.length === 0 ? (
            <p className="text-muted-foreground">No releases yet.</p>
          ) : (
            entries.map((entry) => <ChangelogCard key={entry.slug} entry={entry} />)
          )}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          <Link href="/apps/mmh" className="text-primary hover:underline">
            ← Back to MMH
          </Link>
        </p>
      </section>
    </>
  );
}
