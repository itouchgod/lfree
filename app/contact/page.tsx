import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for early access, feedback or custom workflow projects.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="Questions, early access, or custom workflow discussions — reach out anytime."
      />
      <section className="container max-w-xl pb-20">
        <Card>
          <CardHeader>
            <CardTitle>Send a message</CardTitle>
            <p className="text-sm text-muted-foreground">
              Form backend (Resend / API route) coming soon. For now, email directly.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4" action={`mailto:${siteConfig.email}`}>
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Tell me about your project or feedback..."
                />
              </div>
              <Button type="submit" className="w-full">
                Open Email Client
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground">
              Or email{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
                {siteConfig.email}
              </a>
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
