import { CalendarDays, Cpu, Database, RadioTower } from "lucide-react";
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
      value: [app.macos, app.downloadFormat].filter(Boolean).join(" · "),
      icon: <Cpu className={iconClassName} />,
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
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-border/50 bg-card/30 p-3"
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
