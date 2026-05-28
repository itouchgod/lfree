import type { Metadata } from "next";
import { AppCard } from "@/components/app-card";
import { PageHeader } from "@/components/page-header";
import { apps } from "@/lib/data/apps";

export const metadata: Metadata = {
  title: "Apps",
  description: "Explore macOS utilities, productivity tools and workflow systems from LFree.",
};

export default function AppsPage() {
  return (
    <>
      <PageHeader
        title="Apps"
        description="A growing collection of calm, practical software for macOS and business workflows."
      />
      <section className="container pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </section>
    </>
  );
}
