import { Code2, ExternalLink, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { App } from "@/lib/data/apps";

interface AppDownloadPanelProps {
  app: App;
}

export async function AppDownloadPanel({ app }: AppDownloadPanelProps) {
  const t = await getTranslations("downloadPanel");
  const tApp = await getTranslations(`apps.${app.slug}`);

  return (
    <Card className="h-fit border-border/50 bg-card/35">
      <CardHeader className="p-4 pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <ShieldCheck className="h-4 w-4 text-primary" />
          {tApp("installNoteTitle")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {tApp("installNote")}
        </p>

        <div className="flex flex-col gap-2">
          {app.releaseUrl && (
            <Button variant="secondary" size="sm" asChild className="justify-start">
              <a href={app.releaseUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                {t("releaseNotes")}
              </a>
            </Button>
          )}
          {app.repositoryUrl && (
            <Button variant="outline" size="sm" asChild className="justify-start">
              <a href={app.repositoryUrl} target="_blank" rel="noopener noreferrer">
                <Code2 className="h-4 w-4" />
                {t("repository")}
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
