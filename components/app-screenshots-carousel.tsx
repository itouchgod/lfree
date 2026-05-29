"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AppScreenshot } from "@/lib/data/apps";

interface AppScreenshotsCarouselProps {
  screenshots: AppScreenshot[];
  title?: string;
  tabLabels: string[];
}

export function AppScreenshotsCarousel({
  screenshots,
  title,
  tabLabels,
}: AppScreenshotsCarouselProps) {
  const [active, setActive] = useState(0);
  const count = screenshots.length;

  const go = useCallback(
    (index: number) => {
      setActive((index + count) % count);
    },
    [count]
  );

  if (count === 0) return null;

  const current = screenshots[active];
  const isMainView = active === count - 1;

  return (
    <section className="container pb-20">
      {title && <h2 className="mb-6 text-xl font-semibold">{title}</h2>}

      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border/50 bg-card/30 shadow-soft">
        {/* Tabs */}
        <div
          className="flex border-b border-border/50 p-1.5"
          role="tablist"
          aria-label={title ?? "Screenshots"}
        >
          {screenshots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-controls={`screenshot-panel-${i}`}
              onClick={() => setActive(i)}
              className={cn(
                "flex-1 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active === i
                  ? "bg-accent text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tabLabels[i] ?? `Tab ${i + 1}`}
            </button>
          ))}
        </div>

        {/* Preview */}
        <div
          id={`screenshot-panel-${active}`}
          role="tabpanel"
          className="relative"
        >
          <div
            className={cn(
              "relative flex items-center justify-center bg-gradient-to-b from-muted/20 to-background px-6",
              isMainView ? "min-h-[420px] py-8 md:min-h-[480px]" : "min-h-[360px] py-10 md:min-h-[400px]"
            )}
          >
            <div className="pointer-events-none absolute left-4 top-4 z-10 flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            </div>

            {count > 1 && (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card/80 backdrop-blur-sm"
                  onClick={() => go(active - 1)}
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card/80 backdrop-blur-sm"
                  onClick={() => go(active + 1)}
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={current.src}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={cn(
                  "relative",
                  isMainView
                    ? "h-[340px] w-full max-w-3xl md:h-[400px]"
                    : "h-[280px] w-[200px] sm:h-[300px] sm:w-[220px]"
                )}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  className="object-contain object-center"
                  sizes={isMainView ? "(max-width: 1024px) 90vw, 768px" : "220px"}
                  priority={active === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {current.caption && (
            <p className="border-t border-border/50 px-6 py-4 text-center text-sm text-muted-foreground">
              {current.caption}
            </p>
          )}
        </div>

        {/* Dots */}
        {count > 1 && (
          <div className="flex justify-center gap-2 pb-4">
            {screenshots.map((shot, i) => (
              <button
                key={shot.src}
                type="button"
                aria-label={`Go to screenshot ${i + 1}`}
                onClick={() => setActive(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  active === i ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/40"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
