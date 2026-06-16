import { Search } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { getChangelogEntries } from "@/lib/data/changelog";
import { getDocs } from "@/lib/data/docs";
import {
  getLocalizedPublishedApps,
  type AppMessages,
} from "@/lib/data/apps-i18n";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
};

type SearchResult = {
  type: string;
  title: string;
  description: string;
  href: string;
  meta?: string;
  haystack: string;
};

function includesQuery(value: string, query: string) {
  return value.toLowerCase().includes(query.toLowerCase());
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "search" });
  return { title: t("title"), description: t("description") };
}

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { q = "" } = await searchParams;
  setRequestLocale(locale);

  const query = q.trim();
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const appMessages = messages.apps as Record<string, AppMessages>;
  const apps = getLocalizedPublishedApps(appMessages);
  const docs = getDocs(locale as "en" | "zh");
  const changelog = getChangelogEntries(locale as "en" | "zh");

  const t = await getTranslations("search");

  const allResults: SearchResult[] = [
    ...apps.map((app) => ({
      type: t("types.app"),
      title: app.name,
      description: app.description,
      href: `/apps/${app.slug}`,
      meta: [app.category, app.latestVersion ? `v${app.latestVersion}` : ""]
        .filter(Boolean)
        .join(" · "),
      haystack: [
        app.name,
        app.tagline,
        app.description,
        app.type,
        app.category,
        ...app.tags,
        ...app.features,
      ].join(" "),
    })),
    ...docs.map((doc) => ({
      type: t("types.doc"),
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      href: `/docs/${doc.slug}`,
      meta: doc.frontmatter.date,
      haystack: `${doc.frontmatter.title} ${doc.frontmatter.description} ${doc.content}`,
    })),
    ...changelog.map((entry) => ({
      type: t("types.changelog"),
      title: entry.frontmatter.title,
      description: entry.frontmatter.description,
      href: `/changelog/${entry.slug}`,
      meta: entry.frontmatter.date,
      haystack: `${entry.frontmatter.title} ${entry.frontmatter.description} ${entry.content}`,
    })),
  ];

  const results = query
    ? allResults.filter((result) => includesQuery(result.haystack, query))
    : allResults.slice(0, 8);

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <section className="container max-w-3xl pb-24">
        <form action={`/${locale}/search`} className="relative mb-8">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder={t("placeholder")}
            className="h-12 w-full rounded-2xl border border-border/60 bg-card/70 pl-12 pr-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
          />
        </form>

        <p className="mb-5 text-sm text-muted-foreground">
          {query
            ? t("count", { count: results.length, query })
            : t("starter", { count: results.length })}
        </p>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-border/50 bg-card/40 p-10 text-center text-sm text-muted-foreground">
            {t("empty")}
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((result) => (
              <Link
                key={`${result.type}-${result.href}`}
                href={result.href}
                className="block rounded-2xl border border-border/50 bg-card/40 p-5 transition-colors hover:border-primary/40"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{result.type}</Badge>
                  {result.meta && (
                    <span className="text-xs text-muted-foreground">
                      {result.meta}
                    </span>
                  )}
                </div>
                <h2 className="mt-3 text-lg font-semibold">{result.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {result.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
