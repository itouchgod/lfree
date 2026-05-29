import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { CtaSection } from "@/components/cta-section";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple pricing for indie apps and custom workflow tooling.",
};

const plans = [
  {
    name: "Indie Apps",
    price: "TBD",
    description: "One-time purchase for public macOS utilities when released.",
    features: [
      "Lifetime updates for major versions",
      "Family sharing on App Store (where applicable)",
      "Email support",
      "Early access for waitlist members",
    ],
    cta: "Join Waitlist",
    href: `mailto:${siteConfig.email}`,
  },
  {
    name: "Pro / Teams",
    price: "Custom",
    description: "For workflow systems like LC App and bespoke business tooling.",
    features: [
      "Custom deployment",
      "Document templates & branding",
      "Integration planning",
      "Priority support channel",
    ],
    cta: "Email",
    href: `mailto:${siteConfig.email}`,
    highlighted: true,
  },
  {
    name: "Sponsor",
    price: "Optional",
    description: "Support ongoing development of privacy-first indie software.",
    features: [
      "Name in supporters page (optional)",
      "Early beta access",
      "Direct feedback channel",
      "Helps fund MMH & FileNest",
    ],
    cta: "Get in Touch",
    href: `mailto:${siteConfig.email}`,
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title="Pricing"
        description="Fair, transparent pricing — indie apps stay affordable; custom work is quoted clearly."
      />
      <section className="container pb-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.highlighted
                  ? "border-primary/40 shadow-glow"
                  : undefined
              }
            >
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <p className="text-3xl font-semibold tracking-tight">{plan.price}</p>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "secondary"}
                  asChild
                >
                  {plan.href.startsWith("mailto:") ? (
                    <a href={plan.href}>{plan.cta}</a>
                  ) : (
                    <Link href={plan.href}>{plan.cta}</Link>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-12 text-center text-sm text-muted-foreground">
          Stripe checkout integration planned — pricing will be finalized before public launch.
        </p>
      </section>
      <CtaSection />
    </>
  );
}
