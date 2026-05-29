import { formatDate } from "@/lib/utils";
import type { ContentItem } from "@/lib/content";

interface ChangelogTimelineProps {
  entries: ContentItem[];
  compact?: boolean;
}

export function ChangelogTimeline({ entries, compact = false }: ChangelogTimelineProps) {
  if (entries.length === 0) return null;

  return (
    <div className="space-y-0">
      {entries.map((entry, index) => {
        const highlights = entry.frontmatter.highlights ?? [];
        const isLast = index === entries.length - 1;

        return (
          <div
            key={entry.slug}
            className="relative flex gap-5 pb-8 last:pb-0"
          >
            {!isLast && (
              <span
                className="absolute left-[7px] top-3 h-full w-px bg-border/60"
                aria-hidden
              />
            )}
            <span
              className="relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-primary bg-background"
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-semibold text-foreground">
                  {entry.frontmatter.title}
                </h3>
                <time className="text-sm text-muted-foreground">
                  {formatDate(entry.frontmatter.date)}
                </time>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {entry.frontmatter.description}
              </p>
              {highlights.length > 0 && (
                <ul
                  className={
                    compact
                      ? "mt-2 space-y-1 text-sm text-muted-foreground"
                      : "mt-3 space-y-1.5 text-sm text-muted-foreground"
                  }
                >
                  {highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-primary">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
