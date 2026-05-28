import { Cpu, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAppDownloads, type App } from "@/lib/data/apps";

interface AppDownloadButtonsProps {
  app: App;
  size?: "default" | "lg";
}

export function AppDownloadButtons({ app, size = "default" }: AppDownloadButtonsProps) {
  const downloads = getAppDownloads(app);
  const versionLabel = app.latestVersion ? `v${app.latestVersion}` : "";

  if (downloads.length === 0) {
    return (
      <Button size={size === "lg" ? "lg" : "default"} disabled>
        <Download className="h-4 w-4" />
        {app.status === "Released" ? "Download" : "Coming Soon"}
      </Button>
    );
  }

  if (downloads.length === 1) {
    const [dl] = downloads;
    return (
      <Button size={size === "lg" ? "lg" : "default"} asChild>
        <a href={dl.url} target="_blank" rel="noopener noreferrer">
          <Download className="h-4 w-4" />
          Download {versionLabel}
        </a>
      </Button>
    );
  }

  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto">
      <p className="text-sm text-muted-foreground">
        Download {app.name} {versionLabel} — choose your Mac chip:
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {downloads.map((dl) => (
          <Button key={dl.arch} size={size === "lg" ? "lg" : "default"} asChild>
            <a href={dl.url} target="_blank" rel="noopener noreferrer">
              <Cpu className="h-4 w-4" />
              {dl.label}
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}
