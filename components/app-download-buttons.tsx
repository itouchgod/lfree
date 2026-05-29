"use client";

import { Cpu, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { getAppDownloads, type App } from "@/lib/data/apps";

interface AppDownloadButtonsProps {
  app: App;
  size?: "default" | "lg";
}

export function AppDownloadButtons({ app, size = "default" }: AppDownloadButtonsProps) {
  const t = useTranslations("download");
  const tApp = useTranslations("apps.mmh");
  const downloads = getAppDownloads(app);
  const versionLabel = app.latestVersion ? `v${app.latestVersion}` : "";

  const archLabels: Record<string, string> = {
    "apple-silicon": t("appleSilicon"),
    intel: t("intel"),
    universal: t("download"),
  };

  if (downloads.length === 0) {
    return (
      <Button size={size === "lg" ? "lg" : "default"} disabled>
        <Download className="h-4 w-4" />
        {tApp("comingSoon")}
      </Button>
    );
  }

  if (downloads.length === 1) {
    const [dl] = downloads;
    return (
      <Button size={size === "lg" ? "lg" : "default"} asChild>
        <a href={dl.url} target="_blank" rel="noopener noreferrer">
          <Download className="h-4 w-4" />
          {t("download")} {versionLabel}
        </a>
      </Button>
    );
  }

  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto">
      <p className="text-sm text-muted-foreground">
        {tApp("downloadChoose", { name: app.name, version: versionLabel })}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {downloads.map((dl) => (
          <Button key={dl.arch} size={size === "lg" ? "lg" : "default"} asChild>
            <a href={dl.url} target="_blank" rel="noopener noreferrer">
              <Cpu className="h-4 w-4" />
              {archLabels[dl.arch] ?? dl.label}
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}
