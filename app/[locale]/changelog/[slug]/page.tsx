import { redirect } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string; slug: string }> };

/** Changelog entries are shown on the list page only. */
export default async function ChangelogSlugPage({ params }: Props) {
  const { locale } = await params;
  redirect({ href: "/changelog", locale });
}
