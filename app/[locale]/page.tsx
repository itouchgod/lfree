import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, BookOpen, Download, Sparkles } from "lucide-react";
import { AppCard } from "@/components/app-card";
import { ChangelogTimeline } from "@/components/changelog-timeline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  getLocalizedPublishedApps,
  type AppMessages,
} from "@/lib/data/apps-i18n";
import { getLatestChangelogEntries } from "@/lib/data/changelog";
import { getDocs } from "@/lib/data/docs";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = (await import(`@/messages/${locale}.json`)).default;
  const appMessages = messages.apps as Record<string, AppMessages>;
  const apps = getLocalizedPublishedApps(appMessages);
  const featuredApp = apps[0];
  const latestUpdates = getLatestChangelogEntries(3, locale as "en" | "zh");
  const docs = getDocs(locale as "en" | "zh").slice(0, 2);

  const t = await getTranslations("home");
  const tStatus = await getTranslations("status");

  return (
    <>
      <section className="relative overflow-hidden pt-10 pb-10 md:pt-14 md:pb-12">
        <div className="absolute inset-0 -z-10 bg-gradient-radial opacity-50" />
        <div className="container grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] lg:items-center">
          <div className="max-w-3xl">
            <Badge variant="secondary">{t("eyebrow")}</Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/apps">
                  <Download className="h-4 w-4" />
                  {t("primaryCta")}
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/changelog">
                  <Sparkles className="h-4 w-4" />
                  {t("secondaryCta")}
                </Link>
              </Button>
            </div>
          </div>

          {featuredApp && (
            <div className="rounded-lg border border-border/50 bg-card/50 p-5 shadow-elevated">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t("featured")}</p>
                  <h2 className="mt-2 text-2xl font-semibold">{featuredApp.name}</h2>
                </div>
                <Badge variant="success">{tStatus(featuredApp.status)}</Badge>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {featuredApp.description}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {featuredApp.homeHighlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full" variant="secondary" asChild>
                <Link href={`/apps/${featuredApp.slug}`}>
                  {t("viewApp", { name: featuredApp.name })}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="pb-12 pt-10 md:pb-14">
        <div className="container">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {t("products")}
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{t("productsTitle")}</h2>
            </div>
            <Link href="/apps" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
              {t("allApps")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {apps.map((app) => (
              <AppCard
                key={app.slug}
                app={app}
                statusLabel={tStatus(app.status)}
                actionLabel={t("viewApp", { name: app.name })}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/40 bg-card/20 py-10 md:py-12">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(300px,0.7fr)]">
          <div>
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">{t("latestUpdates")}</h2>
              <Link href="/changelog" className="text-sm text-primary hover:underline">
                {t("viewChangelog")}
              </Link>
            </div>
            <ChangelogTimeline entries={latestUpdates} compact />
          </div>

          <div>
            <div className="mb-6 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">{t("guides")}</h2>
            </div>
            <div className="space-y-3">
              {docs.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/docs/${doc.slug}`}
                  className="block rounded-2xl border border-border/50 bg-background/50 p-4 transition-colors hover:border-primary/40"
                >
                  <h3 className="font-medium">{doc.frontmatter.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {doc.frontmatter.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
