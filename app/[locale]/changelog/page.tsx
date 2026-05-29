import { getTranslations, setRequestLocale } from "next-intl/server";
import { ChangelogCard } from "@/components/changelog-card";
import { PageHeader } from "@/components/page-header";
import { Link } from "@/i18n/navigation";
import { getChangelogByApp } from "@/lib/data/changelog";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "changelog" });
  return { title: t("title"), description: t("description") };
}

export default async function ChangelogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("changelog");
  const entries = getChangelogByApp("mmh", locale as "en" | "zh");

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <section className="container pb-20">
        <div className="mx-auto max-w-2xl space-y-4">
          {entries.length === 0 ? (
            <p className="text-muted-foreground">{t("empty")}</p>
          ) : (
            entries.map((entry) => <ChangelogCard key={entry.slug} entry={entry} />)
          )}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          <Link href="/apps/mmh" className="text-primary hover:underline">
            {t("backToMmh")}
          </Link>
        </p>
      </section>
    </>
  );
}
