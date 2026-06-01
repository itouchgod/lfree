import { ArrowUpRight } from "lucide-react";
import { Badge, statusToBadgeVariant } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import type { App } from "@/lib/data/apps";

interface AppCardProps {
  app: App;
  statusLabel: string;
  actionLabel: string;
}

export function AppCard({ app, statusLabel, actionLabel }: AppCardProps) {
  return (
    <Link href={`/apps/${app.slug}`} className="group block h-full">
      <Card className="h-full transition-all duration-300 hover:border-primary/30 hover:shadow-glow">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-lg font-semibold text-primary ring-1 ring-primary/20">
              {app.name.charAt(0)}
            </div>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-primary" />
          </div>
          <CardTitle className="mt-4">{app.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{app.type}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {app.tagline}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{app.category}</Badge>
            {app.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="muted">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant={statusToBadgeVariant(app.status)}>{statusLabel}</Badge>
            {app.latestVersion && (
              <span className="text-xs text-muted-foreground">v{app.latestVersion}</span>
            )}
          </div>
          <span className="inline-block text-sm font-medium text-primary">
            {actionLabel}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
