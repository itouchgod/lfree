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
  const tApp = await getTranslations(`apps.${app.slug}`);
  const downloads = getAppDownloads(app);

  const archLabels: Record<string, string> = {
    "apple-silicon": tDownload("appleSilicon"),
    intel: tDownload("intel"),
    universal: tDownload("download"),
  };

  return (
    <section className="container pb-10">
      <div className="grid gap-5 rounded-lg border border-border/50 bg-card/35 p-4 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.7fr)] md:p-5">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Download className="h-4 w-4" />
            {t("eyebrow")}
          </div>
          <h2 className="mt-2 text-xl font-semibold">{t("title")}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t("description", {
              name: app.name,
              version: app.latestVersion ? `v${app.latestVersion}` : "",
            })}
          </p>

          {downloads.length > 0 ? (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {downloads.map((download) => (
                <Button key={download.arch} asChild size="sm" className="justify-start">
                  <a href={download.url} target="_blank" rel="noopener noreferrer">
                    <Cpu className="h-4 w-4" />
                    {archLabels[download.arch] ?? download.label}
                  </a>
                </Button>
              ))}
            </div>
          ) : (
            <Button disabled size="sm" className="mt-4">
              <Download className="h-4 w-4" />
              {t("comingSoon")}
            </Button>
          )}
        </div>

        <div className="space-y-3 text-sm">
          <div className="rounded-lg border border-border/50 bg-background/50 p-3">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck className="h-4 w-4 text-primary" />
              {tApp("installNoteTitle")}
            </div>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {tApp("installNote")}
            </p>
          </div>

          {app.releaseUrl && (
            <Button variant="secondary" size="sm" asChild className="w-full justify-start">
              <a href={app.releaseUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                {t("releaseNotes")}
              </a>
            </Button>
          )}
          {app.repositoryUrl && (
            <Button variant="outline" size="sm" asChild className="w-full justify-start">
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
