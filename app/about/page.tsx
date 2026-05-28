import type { Metadata } from "next";
import { CtaSection } from "@/components/cta-section";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name} — a personal software lab by ${siteConfig.developer}.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About"
        description="A personal software lab focused on privacy, productivity and thoughtful workflows."
      />
      <section className="container max-w-3xl space-y-8 pb-20 text-muted-foreground leading-relaxed">
        <p>
          {siteConfig.name} is an independent product studio building a matrix of
          macOS utilities, productivity tools and custom business workflows. The goal
          is simple: software that respects your attention, keeps data local when it
          matters, and solves real problems without unnecessary complexity.
        </p>
        <p>
          Current projects include MMH (privacy utility), FileNest (folder launcher),
          and LC App (internal quotation-to-invoice workflow). Each app shares a
          design language inspired by modern macOS — quiet surfaces, cool accents,
          and interfaces that fade into the background of your work.
        </p>
        <p>
          Built by{" "}
          <a
            href={siteConfig.links.github}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {siteConfig.developer}
          </a>
          . Reach out at{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
            {siteConfig.email}
          </a>
          .
        </p>
        <p>
          This site ({siteConfig.url.replace("https://", "")}) is the home for releases,
          documentation, changelogs and writing from the lab.
        </p>
      </section>
      <CtaSection />
    </>
  );
}
