import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, BookOpen, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  getLocalizedPublishedApps,
  type AppMessages,
} from "@/lib/data/apps-i18n";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = (await import(`@/messages/${locale}.json`)).default;
  const appMessages = messages.apps as Record<string, AppMessages>;
  const apps = getLocalizedPublishedApps(appMessages);

  const t = await getTranslations("home");

  return (
    <>
      <section className="container py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("description")}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/apps">
                <Download className="h-4 w-4" />
                {t("primaryCta")}
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/docs">
                <BookOpen className="h-4 w-4" />
                {t("guides")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container pb-20">
        <div className="border-t border-border/50">
          {apps.map((app) => (
            <Link
              key={app.slug}
              href={`/apps/${app.slug}`}
              className="group grid gap-2 border-b border-border/50 py-5 transition-colors hover:border-primary/40 md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-center"
            >
              <div>
                <h2 className="font-semibold">{app.name}</h2>
                <p className="mt-1 text-xs text-muted-foreground">{app.type}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {app.tagline}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                {t("viewApp", { name: app.name })}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
