import Link from "next/link";
import { AppScreenshots } from "@/components/app-screenshots";
import { HeroSection } from "@/components/hero-section";
import { getLatestReleasedApp } from "@/lib/data/apps";

export default function HomePage() {
  const app = getLatestReleasedApp();
  if (!app) return <HeroSection />;

  const highlights = app.features.slice(0, 4);

  return (
    <>
      <HeroSection />

      <section className="border-t border-border/40 py-16 md:py-20">
        <div className="container max-w-3xl">
          <ul className="grid gap-4 sm:grid-cols-2">
            {highlights.map((feature) => (
              <li
                key={feature}
                className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            <Link href="/apps/mmh" className="text-primary hover:underline">
              Full details, screenshots & FAQ →
            </Link>
          </p>
        </div>
      </section>

      <AppScreenshots
        screenshots={app.screenshots ?? []}
        appName={app.name}
        showTitle={false}
      />
    </>
  );
}
