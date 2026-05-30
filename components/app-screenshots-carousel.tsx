"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import type { AppScreenshot } from "@/lib/data/apps";

interface AppScreenshotsCarouselProps {
  screenshots: AppScreenshot[];
  title?: string;
  dotLabels?: string[];
  layout?: "uniform" | "mixed";
}

export function AppScreenshotsCarousel({
  screenshots,
  title,
  dotLabels = [],
  layout = "mixed",
}: AppScreenshotsCarouselProps) {
  const [active, setActive] = useState(0);
  const count = screenshots.length;

  const go = useCallback(
    (index: number) => {
      if (index < 0 || index >= count) return;
      setActive(index);
    },
    [count]
  );

  if (count === 0) return null;

  const current = screenshots[active];
  const isUniform = layout === "uniform";
  const isMainView = !isUniform && active === count - 1;
  const canPrev = active > 0;
  const canNext = active < count - 1;

  return (
    <section className="container pb-24">
      {title && (
        <h2 className="mb-10 text-center text-xl font-semibold md:mb-12">
          {title}
        </h2>
      )}

      <div
        className="group relative mx-auto w-full max-w-5xl"
        aria-roledescription="carousel"
      >
        {/* Stage */}
        <div
          className={cn(
            "relative flex items-center justify-center px-12 md:px-16",
            isUniform || isMainView
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className={cn(
                "relative mx-auto",
                isUniform || isMainView
                  ? "aspect-[1024/694] w-full max-w-4xl"
                  : "h-[260px] w-[200px] sm:h-[280px] sm:w-[220px]"
              )}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                className="object-contain object-center drop-shadow-2xl"
                sizes={
                  isUniform || isMainView
                    ? "(max-width: 1024px) 90vw, 896px"
                    : "220px"
                }
                priority={active === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Next */}
          <button
            type="button"
            onClick={() => go(active + 1)}
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
            className="mt-8 flex justify-center gap-2.5"
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
    </section>
  );
}
