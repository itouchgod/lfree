"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { AppCard } from "@/components/app-card";
import { Badge } from "@/components/ui/badge";
import type { App } from "@/lib/data/apps";
import { cn } from "@/lib/utils";

interface AppBrowserLabels {
  searchPlaceholder: string;
  allCategories: string;
  allStatuses: string;
  filters: string;
  empty: string;
  showing: string;
  result: string;
  results: string;
  actionTemplate: string;
  statusLabels: Record<App["status"], string>;
}

interface AppBrowserProps {
  apps: App[];
  labels: AppBrowserLabels;
}

export function AppBrowser({ apps, labels }: AppBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const categories = useMemo(
    () => Array.from(new Set(apps.map((app) => app.category))).sort(),
    [apps]
  );
  const statuses = useMemo(
    () => Array.from(new Set(apps.map((app) => app.status))),
    [apps]
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return apps.filter((app) => {
      const matchesQuery =
        !needle ||
        [app.name, app.tagline, app.description, app.type, app.category, ...app.tags]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      const matchesCategory = category === "all" || app.category === category;
      const matchesStatus = status === "all" || app.status === status;
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [apps, category, query, status]);

  const resultLabel = filtered.length === 1 ? labels.result : labels.results;

  return (
    <div className="space-y-8">
      <div className="grid gap-3 rounded-2xl border border-border/50 bg-card/40 p-4 md:grid-cols-[minmax(0,1fr)_auto_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.searchPlaceholder}
            className="h-11 w-full rounded-xl border border-border/60 bg-background/70 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
          />
        </label>

        <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/70 px-3 text-sm text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label={labels.filters}
            className="h-10 bg-transparent text-foreground outline-none"
          >
            <option value="all">{labels.allCategories}</option>
            {categories.map((item) => (
              <option key={item} value={item}>
              {item}
              </option>
            ))}
          </select>
        </div>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          aria-label={labels.allStatuses}
          className="h-11 rounded-xl border border-border/60 bg-background/70 px-3 text-sm text-foreground outline-none focus:border-primary/50"
        >
          <option value="all">{labels.allStatuses}</option>
          {statuses.map((item) => (
            <option key={item} value={item}>
              {labels.statusLabels[item]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {labels.showing} {filtered.length} {resultLabel}
        </p>
        {category !== "all" && <Badge variant="secondary">{category}</Badge>}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border/50 bg-card/40 p-10 text-center text-sm text-muted-foreground">
          {labels.empty}
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-6",
            filtered.length === 1 ? "md:grid-cols-1" : "sm:grid-cols-2"
          )}
        >
          {filtered.map((app) => (
            <AppCard
              key={app.slug}
              app={app}
              statusLabel={labels.statusLabels[app.status]}
              actionLabel={labels.actionTemplate.replace("{name}", app.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
