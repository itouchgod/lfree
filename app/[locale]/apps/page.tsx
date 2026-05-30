import { getTranslations, setRequestLocale } from "next-intl/server";
import { AppCard } from "@/components/app-card";
import { PageHeader } from "@/components/page-header";
import {
  getLocalizedPublishedApps,
  type AppMessages,
} from "@/lib/data/apps-i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("apps"), description: t("apps") };
}

export default async function AppsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = (await import(`@/messages/${locale}.json`)).default;
  const appMessages = messages.apps as Record<string, AppMessages>;
  const apps = getLocalizedPublishedApps(appMessages);

  const t = await getTranslations("nav");
  const tHome = await getTranslations("home");
  const tStatus = await getTranslations("status");

  return (
    <>
      <PageHeader title={t("apps")} description={tHome("description")} />
      <section className="container max-w-4xl pb-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {apps.map((app) => (
            <AppCard
              key={app.slug}
              app={app}
              statusLabel={tStatus(app.status)}
              actionLabel={tHome("viewApp", { name: app.name })}
            />
          ))}
        </div>
      </section>
    </>
  );
}
