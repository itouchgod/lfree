"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getLatestReleasedApp } from "@/lib/data/apps";

export function HeroSection() {
  const latestApp = getLatestReleasedApp();

  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
      <div className="absolute inset-0 -z-10 bg-gradient-radial opacity-60" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-6 inline-flex items-center rounded-full border border-border/60 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
            Personal software lab · macOS & workflows
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl md:leading-[1.1]">
            Private Tools for{" "}
            <span className="bg-gradient-to-r from-foreground via-primary to-primary/70 bg-clip-text text-transparent">
              Focused Digital Life
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            A personal software lab building calm, intelligent and practical apps
            for macOS, productivity and AI workflows.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/apps">View Apps</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href={latestApp ? `/apps/${latestApp.slug}` : "/apps"}>
                Download Latest App
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mx-auto mt-20 max-w-5xl"
        >
          <div className="relative rounded-2xl border border-border/50 bg-card/40 p-2 shadow-elevated backdrop-blur-md">
            <div className="aspect-[16/9] overflow-hidden rounded-xl bg-gradient-to-br from-muted/80 via-card to-background">
              <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <p className="text-sm text-muted-foreground">
                  App preview · Product screenshots coming soon
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
