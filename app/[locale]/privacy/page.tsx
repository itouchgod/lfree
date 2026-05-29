import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return { title: t("title") };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  return (
    <>
      <PageHeader
        title={t("title")}
        description={t("updated", { name: siteConfig.name })}
      />
      <section className="container max-w-3xl space-y-6 pb-20 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-2 text-lg font-medium text-foreground">
            {t("overviewTitle")}
          </h2>
          <p>{t("overview", { name: siteConfig.name })}</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-foreground">
            {t("websiteTitle")}
          </h2>
          <p>{t("website")}</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-foreground">{t("appsTitle")}</h2>
          <p>{t("apps")}</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-foreground">
            {t("contactTitle")}
          </h2>
          <p>
            {t("contact")}{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
              {siteConfig.email}
            </a>
          </p>
        </section>
      </section>
    </>
  );
}
