import Link from "next/link";
import { ArrowRight, Cpu, Layers, Shield } from "lucide-react";
import { AppCard } from "@/components/app-card";
import { BlogCard } from "@/components/blog-card";
import { ChangelogCard } from "@/components/changelog-card";
import { CtaSection } from "@/components/cta-section";
import { FeatureCard } from "@/components/feature-card";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { getLatestBlogPosts } from "@/lib/data/blog";
import { getLatestChangelogEntries } from "@/lib/data/changelog";
import { getFeaturedApps } from "@/lib/data/apps";

export default function HomePage() {
  const featuredApps = getFeaturedApps();
  const latestChangelog = getLatestChangelogEntries(3);
  const latestBlog = getLatestBlogPosts(3);

  return (
    <>
      <HeroSection />

      <section className="container py-20">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Products"
            title="Featured Apps"
            description="Calm, practical tools built for macOS and focused workflows."
          />
          <Button variant="ghost" asChild className="shrink-0 self-start sm:self-auto">
            <Link href="/apps">
              View all apps
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredApps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </section>

      <section className="border-y border-border/40 bg-card/20 py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Philosophy"
            title="Why This Lab"
            description="Software should feel quiet, trustworthy and built for real daily use — not noise."
            className="mb-12"
          />
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={Shield}
              title="Privacy-first"
              description="Local-first design where your data stays on your devices. No unnecessary cloud dependencies."
            />
            <FeatureCard
              icon={Layers}
              title="Calm interfaces"
              description="macOS-native aesthetics with generous spacing, clear hierarchy and minimal distraction."
            />
            <FeatureCard
              icon={Cpu}
              title="Practical intelligence"
              description="Thoughtful automation and AI workflows that save time without taking control away from you."
            />
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Updates"
            title="Latest Changelog"
            description="Track what shipped across the product matrix."
          />
          <Button variant="ghost" asChild className="shrink-0 self-start sm:self-auto">
            <Link href="/changelog">
              Full changelog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {latestChangelog.map((entry) => (
            <ChangelogCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </section>

      <section className="container pb-20">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Writing"
            title="Latest Blog"
            description="Notes on building software, privacy tools and calm product design."
          />
          <Button variant="ghost" asChild className="shrink-0 self-start sm:self-auto">
            <Link href="/blog">
              Read the blog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestBlog.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
