import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-medium text-primary">{t("code")}</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-4 max-w-md text-muted-foreground">{t("description")}</p>
      <Button className="mt-8" asChild>
        <Link href="/">{t("home")}</Link>
      </Button>
    </div>
  );
}
