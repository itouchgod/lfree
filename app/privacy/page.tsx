import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How LFree handles your data across apps and this website.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        description={`Last updated: May 2026 · ${siteConfig.name}`}
      />
      <section className="container max-w-3xl space-y-6 pb-20 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-2 text-lg font-medium text-foreground">Overview</h2>
          <p>
            {siteConfig.name} builds software with a local-first and privacy-respecting
            mindset. This policy describes data practices for our website and apps.
            Specific apps may include additional notices in their documentation.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-foreground">Website</h2>
          <p>
            This marketing site may use basic analytics in the future. We do not sell
            personal data. Contact form submissions will be processed via email providers
            (e.g. Resend) when integrated.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-foreground">Apps</h2>
          <p>
            Apps such as MMH are designed to process data on your device. Cloud features,
            if any, will be opt-in and documented per app. Internal tools like LC App
            follow separate agreements with their operators.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-foreground">Contact</h2>
          <p>
            Privacy questions:{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
              {siteConfig.email}
            </a>
          </p>
        </section>
      </section>
    </>
  );
}
