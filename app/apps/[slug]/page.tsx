import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, FileText } from "lucide-react";
import { AppDownloadButtons } from "@/components/app-download-buttons";
import { AppScreenshots } from "@/components/app-screenshots";
import { CtaSection } from "@/components/cta-section";
import { Badge, statusToBadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apps, getAppBySlug } from "@/lib/data/apps";
import { getChangelogByApp } from "@/lib/data/changelog";

interface AppDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: AppDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app) return { title: "App Not Found" };
  return {
    title: app.name,
    description: app.description,
  };
}

export default async function AppDetailPage({ params }: AppDetailPageProps) {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app) notFound();

  const changelog = getChangelogByApp(slug).slice(0, 3);

  return (
    <>
      <section className="container py-16 md:py-20">
        <div className="max-w-3xl space-y-6">
          <Badge variant={statusToBadgeVariant(app.status)}>{app.status}</Badge>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {app.name}
          </h1>
          <p className="text-lg text-muted-foreground">{app.tagline}</p>
          <p className="text-muted-foreground leading-relaxed">{app.description}</p>
          <p className="text-sm text-muted-foreground">{app.type}</p>
          <div className="flex flex-col gap-6 pt-2">
            <AppDownloadButtons app={app} />
            <div className="flex flex-wrap gap-4">
            <Button variant="secondary" asChild>
              <Link href={`/changelog?app=${app.slug}`}>
                <FileText className="h-4 w-4" />
                Changelog
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={slug === "mmh" ? "/docs/mmh-overview" : "/docs"}>
                <BookOpen className="h-4 w-4" />
                Documentation
              </Link>
            </Button>
            </div>
          </div>
        </div>
      </section>

      {slug === "mmh" && (
        <section className="container pb-8">
          <div className="rounded-2xl border border-border/50 bg-card/40 p-6 text-sm text-muted-foreground leading-relaxed">
            <p className="font-medium text-foreground">Install note</p>
            <p className="mt-2">
              After download, unzip the archive, drag <strong>MMH.app</strong> to
              Applications, then open from Launchpad. On first launch, macOS may ask
              you to allow the app in Privacy &amp; Security settings.
            </p>
          </div>
        </section>
      )}

      <AppScreenshots
        screenshots={app.screenshots ?? []}
        appName={app.name}
      />

      <section className="border-y border-border/40 bg-card/20 py-16">
        <div className="container">
          <h2 className="mb-8 text-2xl font-semibold">Features</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {app.features.map((feature) => (
              <li
                key={feature}
                className="flex gap-3 rounded-xl border border-border/40 bg-background/50 p-4 text-sm leading-relaxed"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {changelog.length > 0 && (
        <section className="container py-16">
          <h2 className="mb-6 text-2xl font-semibold">Recent Updates</h2>
          <div className="space-y-4">
            {changelog.map((entry) => (
              <Link
                key={entry.slug}
                href={`/changelog/${entry.slug}`}
                className="block rounded-xl border border-border/40 p-4 transition-colors hover:border-primary/30 hover:bg-card/50"
              >
                <p className="font-medium">{entry.frontmatter.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {entry.frontmatter.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="container pb-20">
        <h2 className="mb-8 text-2xl font-semibold">FAQ</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {app.faq.map((item) => (
            <Card key={item.question}>
              <CardHeader>
                <CardTitle className="text-base">{item.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <CtaSection
        title={`Interested in ${app.name}?`}
        description="Get in touch for early access, feedback or custom workflow discussions."
        primaryHref="/contact"
        primaryLabel="Contact"
        secondaryHref="/apps"
        secondaryLabel="All Apps"
      />
    </>
  );
}
