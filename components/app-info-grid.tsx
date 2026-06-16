import { CalendarDays, Cpu, Database, HardDriveDownload, RadioTower } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { App } from "@/lib/data/apps";
import { formatDate } from "@/lib/utils";

interface AppInfoGridLabels {
  title: string;
  version: string;
  updated: string;
  macos: string;
  architecture: string;
  format: string;
  data: string;
  network: string;
  channel: string;
}

interface AppInfoGridProps {
  app: App;
  labels: AppInfoGridLabels;
}

const iconClassName = "h-4 w-4 text-primary";

export function AppInfoGrid({ app, labels }: AppInfoGridProps) {
  const items = [
    {
      label: `${labels.version} / ${labels.updated}`,
      value: [
        app.latestVersion ? `v${app.latestVersion}` : "-",
        app.updatedAt ? formatDate(app.updatedAt) : "",
      ]
        .filter(Boolean)
        .join(" · "),
      icon: <CalendarDays className={iconClassName} />,
    },
    {
      label: labels.macos,
      value: app.macos,
      icon: <Cpu className={iconClassName} />,
    },
    {
      label: labels.format,
      value: app.downloadFormat,
      icon: <HardDriveDownload className={iconClassName} />,
    },
    {
      label: labels.data,
      value: app.dataLocation,
      icon: <Database className={iconClassName} />,
    },
    {
      label: labels.network,
      value: app.networkAccess,
      icon: <RadioTower className={iconClassName} />,
    },
  ];

  return (
    <section className="container pb-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold">{labels.title}</h2>
        <div className="flex flex-wrap gap-1.5">
          {app.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-border/50 bg-card/35 p-3"
          >
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {item.icon}
              {item.label}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
