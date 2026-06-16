"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { AppScreenshot } from "@/lib/data/apps";

interface AppScreenshotsCarouselProps {
  screenshots: AppScreenshot[];
  title?: string;
  dotLabels?: string[];
  layout?: "uniform" | "mixed";
  embedded?: boolean;
  autoPlay?: boolean;
}

export function AppScreenshotsCarousel({
  screenshots,
  title,
  dotLabels = [],
  layout = "mixed",
  embedded = false,
  autoPlay = true,
}: AppScreenshotsCarouselProps) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const count = screenshots.length;

  const go = useCallback(
    (index: number) => {
      if (index < 0 || index >= count) return;
      setActive(index);
    },
    [count]
  );

  const goNext = useCallback(() => {
    setActive((current) => (current + 1) % count);
  }, [count]);

  useEffect(() => {
    if (!autoPlay || expanded || count < 2) return;
    const timer = window.setInterval(goNext, 3600);
    return () => window.clearInterval(timer);
  }, [autoPlay, count, expanded, goNext]);

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded]);

  if (count === 0) return null;

  const current = screenshots[active];
  const isUniform = layout === "uniform";
  const isMainView = !isUniform && active === count - 1;
  const canPrev = active > 0;
  const canNext = active < count - 1;

  const content = (
    <>
      {title && (
        <h2 className={cn("text-center font-semibold", embedded ? "mb-4 text-base" : "mb-10 text-xl md:mb-12")}>
          {title}
        </h2>
      )}

      <div
        className={cn(
          "group relative mx-auto w-full",
          embedded ? "max-w-xl" : "max-w-5xl"
        )}
        aria-roledescription="carousel"
      >
        {/* Stage */}
        <div
          className={cn(
            "relative flex items-center justify-center px-12 md:px-16",
            embedded
              ? "min-h-[220px] sm:min-h-[280px] lg:min-h-[320px]"
              : isUniform || isMainView
                ? "min-h-[380px] md:min-h-[460px]"
                : "min-h-[320px] md:min-h-[400px]"
          )}
        >
          {/* Prev — visible on hover (desktop) or when available (mobile) */}
          <button
            type="button"
            onClick={() => go(active - 1)}
            disabled={!canPrev}
            aria-label="Previous screenshot"
            className={cn(
              "absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all duration-300",
              "hover:bg-white/5 hover:text-foreground",
              canPrev
                ? "opacity-0 group-hover:opacity-100 max-md:opacity-70"
                : "pointer-events-none opacity-0"
            )}
          >
            <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} />
          </button>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.src}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className={cn(
                "relative mx-auto",
                embedded
                  ? "aspect-[1024/694] w-full max-w-lg"
                  : isUniform || isMainView
                  ? "aspect-[1024/694] w-full max-w-4xl"
                  : "h-[260px] w-[200px] sm:h-[280px] sm:w-[220px]"
              )}
            >
              <button
                type="button"
                className="relative block h-full w-full overflow-hidden rounded-lg border border-border/50 bg-background/40"
                onClick={() => setExpanded(true)}
                aria-label={current.caption ?? current.alt}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  className="object-contain object-center drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.015]"
                  sizes={
                    embedded
                      ? "(max-width: 1024px) 90vw, 520px"
                      : isUniform || isMainView
                        ? "(max-width: 1024px) 90vw, 896px"
                        : "220px"
                  }
                  loading={embedded ? "eager" : undefined}
                  fetchPriority={embedded ? "high" : undefined}
                  preload={!embedded && active === 0}
                />
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Next */}
          <button
            type="button"
              onClick={() => (canNext ? go(active + 1) : go(0))}
              disabled={!canNext}
            aria-label="Next screenshot"
            className={cn(
              "absolute right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all duration-300",
              "hover:bg-white/5 hover:text-foreground",
              canNext
                ? "opacity-0 group-hover:opacity-100 max-md:opacity-70"
                : "pointer-events-none opacity-0"
            )}
          >
            <ChevronRight className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} />
          </button>
        </div>

        {/* Caption */}
        <AnimatePresence mode="wait" initial={false}>
          {current.caption && (
            <motion.p
              key={current.caption}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mx-auto mt-6 max-w-lg text-center text-sm text-muted-foreground md:text-base"
            >
              {current.caption}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Indicators */}
        {count > 1 && (
          <div
            className={cn("flex justify-center gap-2.5", embedded ? "mt-5" : "mt-8")}
            role="tablist"
            aria-label={title ?? "Screenshot navigation"}
          >
            {screenshots.map((shot, i) => (
              <button
                key={shot.src}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={dotLabels[i] ?? shot.caption ?? `Screenshot ${i + 1}`}
                onClick={() => setActive(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 ease-out",
                  active === i
                    ? "w-7 bg-foreground/85"
                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/55"
                )}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setExpanded(false)}
              aria-label="Close screenshot preview"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="absolute inset-0 -z-10"
              onClick={() => setExpanded(false)}
              aria-label="Close screenshot preview backdrop"
            />
            <motion.div
              className="relative h-[82vh] w-full max-w-6xl"
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                className="object-contain"
                sizes="95vw"
                loading="eager"
                fetchPriority="high"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return embedded ? (
    <div>{content}</div>
  ) : (
    <section className="container pb-16">{content}</section>
  );
}
