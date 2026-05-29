import type { Metadata } from "next";
import { BookOpen, FileText } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { AppDownloadButtons } from "@/components/app-download-buttons";
import { AppScreenshots } from "@/components/app-screenshots";
import { Badge, statusToBadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { appsBase } from "@/lib/data/apps-i18n";
import {
  getLocalizedApp,
  type AppMessages,
} from "@/lib/data/apps-i18n";
import { getChangelogByApp } from "@/lib/data/changelog";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return appsBase
    .filter((a) => a.published)
    .map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const app = getLocalizedApp(slug, messages.apps as Record<string, AppMessages>);
  if (!app) return { title: "App Not Found" };
  return { title: app.name, description: app.description };
}

export default async function AppDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const messages = (await import(`@/messages/${locale}.json`)).default;
  const appMessages = messages.apps as Record<string, AppMessages>;
  const app = getLocalizedApp(slug, appMessages);
  if (!app) notFound();

  const t = await getTranslations("appDetail");
  const tMmh = await getTranslations("apps.mmh");
  const tStatus = await getTranslations("status");
  const changelog = getChangelogByApp(slug, locale as "en" | "zh").slice(0, 3);

  return (
    <>
      <section className="container py-16 md:py-20">
        <div className="max-w-3xl space-y-6">
          <Badge variant={statusToBadgeVariant(app.status)}>
            {tStatus(app.status)}
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {app.name}
          </h1>
          <p className="text-lg text-muted-foreground">{app.tagline}</p>
          <p className="leading-relaxed text-muted-foreground">{app.description}</p>
          <p className="text-sm text-muted-foreground">{app.type}</p>
          <div className="flex flex-col gap-6 pt-2">
            <AppDownloadButtons app={app} />
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" asChild>
                <Link href="/changelog">
                  <FileText className="h-4 w-4" />
                  {t("changelog")}
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/docs/mmh-overview">
                  <BookOpen className="h-4 w-4" />
                  {t("documentation")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {slug === "mmh" && (
        <section className="container pb-8">
          <div className="rounded-2xl border border-border/50 bg-card/40 p-6 text-sm leading-relaxed text-muted-foreground">
            <p className="font-medium text-foreground">{tMmh("installNoteTitle")}</p>
            <p className="mt-2">{tMmh("installNote")}</p>
          </div>
        </section>
      )}

      <AppScreenshots screenshots={app.screenshots ?? []} />

      <section className="border-y border-border/40 bg-card/20 py-16">
        <div className="container">
          <h2 className="mb-8 text-2xl font-semibold">{t("features")}</h2>
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
          <h2 className="mb-6 text-2xl font-semibold">{t("recentUpdates")}</h2>
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
        <h2 className="mb-8 text-2xl font-semibold">{t("faq")}</h2>
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

      <section className="container pb-20">
        <div className="rounded-2xl border border-border/50 bg-card/30 p-8 text-center">
          <h2 className="text-xl font-semibold">{tMmh("ctaTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{tMmh("ctaDescription")}</p>
          <Button className="mt-6" asChild>
            <Link href="/contact">{t("contact")}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
