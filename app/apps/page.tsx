import { redirect } from "next/navigation";
import { getPublishedApps } from "@/lib/data/apps";

export default function AppsPage() {
  const published = getPublishedApps();
  if (published.length === 1) {
    redirect(`/apps/${published[0].slug}`);
  }
  redirect("/");
}
