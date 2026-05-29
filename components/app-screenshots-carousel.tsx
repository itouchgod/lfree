"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { AppScreenshot } from "@/lib/data/apps";

interface AppScreenshotsCarouselProps {
  screenshots: AppScreenshot[];
  title?: string;
  dotLabels?: string[];
}

export function AppScreenshotsCarousel({
  screenshots,
  title,
  dotLabels = [],
}: AppScreenshotsCarouselProps) {
  const [active, setActive] = useState(0);
  const count = screenshots.length;

  if (count === 0) return null;

  const current = screenshots[active];
  const isMainView = active === count - 1;

  return (
    <section className="container pb-20">
      {title && <h2 className="mb-6 text-xl font-semibold">{title}</h2>}

      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border/50 bg-card/30 shadow-soft">
        <div className="relative" aria-roledescription="carousel">
          <div
            className={cn(
              "relative flex items-center justify-center bg-gradient-to-b from-muted/20 to-background px-6",
              isMainView
                ? "min-h-[420px] py-8 md:min-h-[480px]"
                : "min-h-[360px] py-10 md:min-h-[400px]"
            )}
          >
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

          {count > 1 && (
            <div
              className="flex justify-center gap-2 border-t border-border/40 px-6 py-5"
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
                    "h-1.5 rounded-full transition-all duration-300",
                    active === i
                      ? "w-8 bg-primary"
                      : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
