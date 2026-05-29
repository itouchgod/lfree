"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { AppDownloadButtons } from "@/components/app-download-buttons";
import { Badge, statusToBadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { App } from "@/lib/data/apps";

interface HeroSectionProps {
  app: App;
}

export function HeroSection({ app }: HeroSectionProps) {
  const t = useTranslations("apps.mmh");
  const heroScreenshot = app.screenshots?.[2] ?? app.screenshots?.[0];

  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="absolute inset-0 -z-10 bg-gradient-radial opacity-50" />
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="space-y-6"
          >
            <Badge variant={statusToBadgeVariant(app.status)}>
              {app.type} · v{app.latestVersion}
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {app.name}
            </h1>
            <p className="text-xl text-muted-foreground">{app.tagline}</p>
            <p className="max-w-lg leading-relaxed text-muted-foreground">
              {app.description}
            </p>
            <AppDownloadButtons app={app} size="lg" />
            <Button
              variant="ghost"
              asChild
              className="px-0 text-muted-foreground hover:text-foreground"
            >
              <Link href="/docs/mmh-overview">{t("installationGuide")}</Link>
            </Button>
          </motion.div>

          {heroScreenshot && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-md lg:max-w-none"
            >
              <div className="rounded-2xl border border-border/50 bg-card/40 p-2 shadow-elevated">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted/20">
                  <div className="absolute left-3 top-3 z-10 flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <Image
                    src={heroScreenshot.src}
                    alt={heroScreenshot.alt}
                    fill
                    className="object-contain object-top p-4 pt-8"
                    sizes="(max-width: 1024px) 90vw, 480px"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
