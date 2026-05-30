import { getTranslations, setRequestLocale } from "next-intl/server";
import { AppCard } from "@/components/app-card";
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
  const tStatus = await getTranslations("status");

  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="absolute inset-0 -z-10 bg-gradient-radial opacity-50" />
        <div className="container max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </div>
      </section>

      <section className="border-t border-border/40 pb-24 md:pb-28">
        <div className="container">
          <h2 className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {t("products")}
          </h2>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
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
    </>
  );
}
