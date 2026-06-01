import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";

interface CtaSectionProps {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  showEmail?: boolean;
}

export async function CtaSection({
  title,
  description,
  primaryHref = "/apps/mmh",
  primaryLabel,
  showEmail = true,
}: CtaSectionProps) {
  const t = await getTranslations("cta");
  const resolvedTitle = title ?? t("title");
  const resolvedDescription = description ?? t("description");
  const resolvedPrimaryLabel = primaryLabel ?? t("primary");

  return (
    <section className="container py-20">
      <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card/80 to-primary/5 p-10 md:p-14 shadow-soft">
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {resolvedTitle}
          </h2>
          <p className="mt-4 text-muted-foreground">{resolvedDescription}</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href={primaryHref}>{resolvedPrimaryLabel}</Link>
            </Button>
            {showEmail && (
              <Button size="lg" variant="secondary" asChild>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
