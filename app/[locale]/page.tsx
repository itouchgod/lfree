import { getTranslations, setRequestLocale } from "next-intl/server";
import { AppScreenshots } from "@/components/app-screenshots";
import { HeroSection } from "@/components/hero-section";
import { Link } from "@/i18n/navigation";
import {
  getLocalizedLatestReleasedApp,
  type AppMessages,
} from "@/lib/data/apps-i18n";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = (await import(`@/messages/${locale}.json`)).default;
  const appMessages = messages.apps as Record<string, AppMessages>;
  const app = getLocalizedLatestReleasedApp(appMessages);

  const t = await getTranslations("home");

  if (!app) return null;

  const highlights = app.features.slice(0, 4);

  return (
    <>
      <HeroSection app={app} />

      <section className="border-t border-border/40 py-16 md:py-20">
        <div className="container max-w-3xl">
          <ul className="grid gap-4 sm:grid-cols-2">
            {highlights.map((feature) => (
              <li
                key={feature}
                className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            <Link href="/apps/mmh" className="text-primary hover:underline">
              {t("fullDetails")}
            </Link>
          </p>
        </div>
      </section>

      <AppScreenshots screenshots={app.screenshots ?? []} showTitle={false} />
    </>
  );
}
