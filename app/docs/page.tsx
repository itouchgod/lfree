import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { getDocs } from "@/lib/data/docs";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Guides and references for LFree apps and workflows.",
};

export default function DocsPage() {
  const docs = getDocs();

  return (
    <>
      <PageHeader
        title="Documentation"
        description="Guides, setup instructions and references for apps in the lab."
      />
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
