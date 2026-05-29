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
    (d) => d.slug === "mmh-overview"
  );

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <section className="container max-w-2xl pb-20">
        <div className="space-y-4">
          {docs.map((doc) => (
            <Link key={doc.slug} href={`/docs/${doc.slug}`}>
              <Card className="transition-all hover:border-primary/30 hover:shadow-soft">
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg">{doc.frontmatter.title}</CardTitle>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {doc.frontmatter.description}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {formatDate(doc.frontmatter.date)}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <span className="text-sm font-medium text-primary">
                    {locale === "zh" ? "阅读文档 →" : "Read guide →"}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
