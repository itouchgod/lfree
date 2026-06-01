import { getTranslations, setRequestLocale } from "next-intl/server";
import { AppBrowser } from "@/components/app-browser";
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
  const tApps = await getTranslations("appsPage");
  const tStatus = await getTranslations("status");

  return (
    <>
      <PageHeader title={t("apps")} description={tApps("description")} />
      <section className="container max-w-5xl pb-24">
        <AppBrowser
          apps={apps}
          labels={{
            searchPlaceholder: tApps("searchPlaceholder"),
            allCategories: tApps("allCategories"),
            allStatuses: tApps("allStatuses"),
            filters: tApps("filters"),
            empty: tApps("empty"),
            showing: tApps("showing"),
            result: tApps("result"),
            results: tApps("results"),
            actionTemplate: tHome("viewApp", { name: "{name}" }),
            statusLabels: {
              Released: tStatus("Released"),
              "In Development": tStatus("In Development"),
              Prototype: tStatus("Prototype"),
              "Internal Tool": tStatus("Internal Tool"),
            },
          }}
        />
      </section>
    </>
  );
}
