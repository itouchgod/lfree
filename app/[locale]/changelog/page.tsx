import { getTranslations, setRequestLocale } from "next-intl/server";
import { ChangelogTimeline } from "@/components/changelog-timeline";
import { Link } from "@/i18n/navigation";
import { getChangelogEntries } from "@/lib/data/changelog";

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
  const entries = getChangelogEntries(locale as "en" | "zh");

  return (
    <section className="container max-w-xl py-14 md:py-16">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("description")}</p>
      </header>

      {entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("empty")}</p>
      ) : (
        <ChangelogTimeline entries={entries} />
      )}

      <p className="mt-10 text-sm text-muted-foreground">
        <Link href="/apps" className="text-primary hover:underline">
          {t("backToApps")}
        </Link>
      </p>
    </section>
  );
}
