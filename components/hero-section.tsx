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
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14">
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
              className="flex w-full items-center justify-center lg:justify-end"
            >
              <div className="relative aspect-[1024/631] w-full max-w-xl lg:max-w-none">
                <Image
                  src={heroScreenshot.src}
                  alt={heroScreenshot.alt}
                  fill
                  className="object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.55)]"
                  sizes="(max-width: 1024px) 92vw, 560px"
                  priority
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
