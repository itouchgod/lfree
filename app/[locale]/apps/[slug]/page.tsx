import type { Metadata } from "next";
import { BookOpen, FileText } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { AppDownloadPanel } from "@/components/app-download-panel";
import { AppDownloadButtons } from "@/components/app-download-buttons";
import { AppInfoGrid } from "@/components/app-info-grid";
import { AppScreenshots } from "@/components/app-screenshots";
import { Badge, statusToBadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { docSlugForApp } from "@/lib/app-docs";
import { appsBase } from "@/lib/data/apps-i18n";
import {
  getLocalizedApp,
  type AppMessages,
} from "@/lib/data/apps-i18n";
import { ChangelogTimeline } from "@/components/changelog-timeline";
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
  const tInfo = await getTranslations("appInfo");
  const tStatus = await getTranslations("status");
  const changelog = getChangelogByApp(slug, locale as "en" | "zh").slice(0, 2);
  const docSlug = docSlugForApp(slug);

  return (
    <>
      <section className="container py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.82fr)] lg:items-center">
          <div className="max-w-2xl space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={statusToBadgeVariant(app.status)}>
                {tStatus(app.status)}
              </Badge>
              <span className="text-sm text-muted-foreground">{app.type}</span>
            </div>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                {app.name}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">{app.tagline}</p>
            </div>
            <p className="leading-relaxed text-muted-foreground">{app.description}</p>
            <div className="flex flex-col gap-4 pt-1">
              <AppDownloadButtons app={app} />
              <div className="flex flex-wrap gap-2">
              <Button variant="secondary" asChild>
                <Link href="/changelog">
                  <FileText className="h-4 w-4" />
                  {t("changelog")}
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/docs/${docSlug}`}>
                  <BookOpen className="h-4 w-4" />
                  {t("documentation")}
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/apps">{t("allApps")}</Link>
              </Button>
              </div>
            </div>
          </div>

          <AppScreenshots
            screenshots={app.screenshots ?? []}
            showTitle={false}
            dotLabels={appMessages[slug]?.screenshotTabs ?? []}
            layout={app.screenshotLayout ?? "mixed"}
            embedded
          />
        </div>
      </section>

      <AppInfoGrid
        app={app}
        labels={{
          title: tInfo("title"),
          version: tInfo("version"),
          updated: tInfo("updated"),
          macos: tInfo("macos"),
          architecture: tInfo("architecture"),
          format: tInfo("format"),
          data: tInfo("data"),
          network: tInfo("network"),
          channel: tInfo("channel"),
        }}
      />

      <AppDownloadPanel app={app} />

      <section className="border-y border-border/40 bg-card/20 py-10 md:py-12">
        <div className="container">
          <h2 className="mb-5 text-xl font-semibold">{t("features")}</h2>
          <ul className="grid gap-2 md:grid-cols-2">
            {app.features.map((feature) => (
              <li
                key={feature}
                className="flex gap-3 rounded-lg border border-border/40 bg-background/50 p-3 text-sm leading-relaxed"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {changelog.length > 0 && (
        <section className="container max-w-xl py-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">{t("recentUpdates")}</h2>
            <Link
              href="/changelog"
              className="text-sm text-primary hover:underline"
            >
              {t("changelog")} →
            </Link>
          </div>
          <ChangelogTimeline entries={changelog} compact />
        </section>
      )}

      <section className="container pb-14">
        <h2 className="mb-5 text-xl font-semibold">{t("faq")}</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {app.faq.map((item) => (
            <Card key={item.question}>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">{item.question}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
