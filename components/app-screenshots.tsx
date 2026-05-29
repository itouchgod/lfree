import Image from "next/image";
import type { AppScreenshot } from "@/lib/data/apps";

interface AppScreenshotsProps {
  screenshots: AppScreenshot[];
  appName: string;
  showTitle?: boolean;
}

export function AppScreenshots({
  screenshots,
  appName,
  showTitle = true,
}: AppScreenshotsProps) {
  if (screenshots.length === 0) return null;

  return (
    <section className="container pb-20">
      {showTitle && (
        <h2 className="mb-6 text-xl font-semibold">Screenshots</h2>
      )}
      <div className="grid gap-6 md:grid-cols-3">
        {screenshots.map((shot, i) => (
          <figure
            key={shot.src}
            className="overflow-hidden rounded-2xl border border-border/50 bg-card/40 shadow-soft"
          >
            <div className="relative aspect-[4/5] w-full bg-muted/30">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                className="object-contain object-top p-2"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={i === 0}
              />
            </div>
            {shot.caption && (
              <figcaption className="border-t border-border/40 px-4 py-3 text-sm text-muted-foreground">
                {shot.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
