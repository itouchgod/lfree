import { Code2, Cpu, Download, ExternalLink, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { getAppDownloads, type App } from "@/lib/data/apps";

interface AppDownloadPanelProps {
  app: App;
}

export async function AppDownloadPanel({ app }: AppDownloadPanelProps) {
  const t = await getTranslations("downloadPanel");
  const tDownload = await getTranslations("download");
  const downloads = getAppDownloads(app);

  const archLabels: Record<string, string> = {
    "apple-silicon": tDownload("appleSilicon"),
    intel: tDownload("intel"),
    universal: tDownload("download"),
  };

  return (
    <section className="container pb-16">
      <div className="grid gap-6 rounded-2xl border border-border/50 bg-card/40 p-6 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.7fr)] md:p-8">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Download className="h-4 w-4" />
            {t("eyebrow")}
          </div>
          <h2 className="mt-3 text-2xl font-semibold">{t("title")}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t("description", {
              name: app.name,
              version: app.latestVersion ? `v${app.latestVersion}` : "",
            })}
          </p>

          {downloads.length > 0 ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {downloads.map((download) => (
                <Button key={download.arch} asChild className="justify-start">
                  <a href={download.url} target="_blank" rel="noopener noreferrer">
                    <Cpu className="h-4 w-4" />
                    {archLabels[download.arch] ?? download.label}
                  </a>
                </Button>
              ))}
            </div>
          ) : (
            <Button disabled className="mt-6">
              <Download className="h-4 w-4" />
              {t("comingSoon")}
            </Button>
          )}
        </div>

        <div className="space-y-3 text-sm">
          <div className="rounded-xl border border-border/50 bg-background/50 p-4">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck className="h-4 w-4 text-primary" />
              {t("installTitle")}
            </div>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {t("installDescription")}
            </p>
          </div>

          {app.releaseUrl && (
            <Button variant="secondary" asChild className="w-full justify-start">
              <a href={app.releaseUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                {t("releaseNotes")}
              </a>
            </Button>
          )}
          {app.repositoryUrl && (
            <Button variant="outline" asChild className="w-full justify-start">
              <a href={app.repositoryUrl} target="_blank" rel="noopener noreferrer">
                <Code2 className="h-4 w-4" />
                {t("repository")}
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
