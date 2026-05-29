import { redirect } from "@/i18n/navigation";
import { getPublishedApps } from "@/lib/data/apps";

type Props = { params: Promise<{ locale: string }> };

export default async function AppsPage({ params }: Props) {
  const { locale } = await params;
  const published = getPublishedApps();
  if (published.length === 1) {
    redirect({ href: `/apps/${published[0].slug}`, locale });
  }
  redirect({ href: "/", locale });
}
