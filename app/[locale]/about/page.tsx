import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaSection } from "@/components/cta-section";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <>
      <PageHeader
        title={t("title")}
        description={t("description")}
      />
      <section className="container max-w-3xl space-y-8 pb-20 text-muted-foreground leading-relaxed">
        <p>{t("body1", { name: siteConfig.name })}</p>
        <p>{t("body2")}</p>
        <p>
          {t("builtBy")}{" "}
          <a
            href={siteConfig.links.github}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {siteConfig.developer}
          </a>
          . {t("reachOut")}{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
            {siteConfig.email}
          </a>
          .
        </p>
        <p>{t("body3", { host: siteConfig.url.replace("https://", "") })}</p>
      </section>
      <CtaSection />
    </>
  );
}
