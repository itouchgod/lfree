import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the LFree website and software products.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms of Service"
        description={`Last updated: May 2026 · ${siteConfig.name}`}
      />
      <section className="container max-w-3xl space-y-6 pb-20 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-2 text-lg font-medium text-foreground">Acceptance</h2>
          <p>
            By using {siteConfig.name} websites or software, you agree to these terms.
            If you do not agree, please do not use our services.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-foreground">Software License</h2>
          <p>
            Each app is provided under its own license (e.g. commercial, beta, or
            internal use). Beta and in-development builds are provided as-is without
            warranty. See app-specific documentation for details.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-foreground">Limitations</h2>
          <p>
            We are not liable for indirect damages arising from use of our software.
            You are responsible for backing up your data and complying with applicable laws.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-foreground">Contact</h2>
          <p>
            Legal inquiries:{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
              {siteConfig.email}
            </a>
          </p>
        </section>
      </section>
    </>
  );
}
