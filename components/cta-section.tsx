import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function CtaSection({
  title = "Ready to explore the lab?",
  description = "Browse apps, read the docs, or get in touch for early access and custom workflows.",
  primaryHref = "/apps",
  primaryLabel = "View Apps",
  secondaryHref = "/contact",
  secondaryLabel = "Contact",
}: CtaSectionProps) {
  return (
    <section className="container py-20">
      <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card/80 to-primary/5 p-10 md:p-14 shadow-soft">
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
          <p className="mt-4 text-muted-foreground">{description}</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href={primaryHref}>{primaryLabel}</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
