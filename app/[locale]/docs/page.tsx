import { FileText } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { getDocs } from "@/lib/data/docs";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "docs" });
  return { title: t("title"), description: t("description") };
}

export default async function DocsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("docs");
  const docs = getDocs(locale as "en" | "zh").filter(
    (d) => d.slug === "mmh-overview" || d.slug === "getting-started"
  );

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <section className="container pb-20">
        <div className="grid gap-4 md:grid-cols-2">
          {docs.map((doc) => (
            <Link key={doc.slug} href={`/docs/${doc.slug}`}>
              <Card className="h-full transition-all hover:border-primary/30">
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{doc.frontmatter.title}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatDate(doc.frontmatter.date)}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {doc.frontmatter.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
