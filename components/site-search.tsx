"use client";

import { Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";

interface SiteSearchProps {
  compact?: boolean;
  onSearch?: () => void;
}

export function SiteSearch({ compact = false, onSearch }: SiteSearchProps) {
  const t = useTranslations("search");
  const locale = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <form
      role="search"
      className={compact ? "relative w-full" : "relative w-56 lg:w-72"}
      onSubmit={(event) => {
        event.preventDefault();
        const nextQuery = query.trim();
        router.push(
          nextQuery
            ? `/search?q=${encodeURIComponent(nextQuery)}`
            : "/search"
        );
        onSearch?.();
      }}
    >
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t("placeholder")}
        aria-label={t("label")}
        autoComplete="off"
        className="h-10 w-full rounded-xl border border-border/60 bg-secondary/60 pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:bg-secondary"
        data-locale={locale}
      />
    </form>
  );
}
