import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { ContentItem } from "@/lib/content";
import { getAppBySlug } from "@/lib/data/apps";

interface ChangelogCardProps {
  entry: ContentItem;
}

export function ChangelogCard({ entry }: ChangelogCardProps) {
  const app = entry.frontmatter.appSlug
    ? getAppBySlug(entry.frontmatter.appSlug)
    : undefined;

  return (
    <Link href={`/changelog/${entry.slug}`} className="group block">
      <Card className="transition-all hover:border-primary/30">
        <CardHeader className="flex-row items-center justify-between space-y-0 gap-4">
          <div className="space-y-1">
            <CardTitle className="text-base group-hover:text-primary transition-colors">
              {entry.frontmatter.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {formatDate(entry.frontmatter.date)}
            </p>
          </div>
          {app && <Badge variant="secondary">{app.name}</Badge>}
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {entry.frontmatter.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
