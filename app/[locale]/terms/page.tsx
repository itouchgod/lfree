import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  return { title: t("title") };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");

  return (
    <>
      <PageHeader
        title={t("title")}
        description={t("updated", { name: siteConfig.name })}
      />
      <section className="container max-w-3xl space-y-6 pb-20 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-2 text-lg font-medium text-foreground">{t("acceptTitle")}</h2>
          <p>{t("accept", { name: siteConfig.name })}</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-foreground">
            {t("licenseTitle")}
          </h2>
          <p>{t("license")}</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-foreground">{t("limitTitle")}</h2>
          <p>{t("limit")}</p>
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
