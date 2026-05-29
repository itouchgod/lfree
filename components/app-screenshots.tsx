import { getMessages, getTranslations } from "next-intl/server";
import { AppScreenshotsCarousel } from "@/components/app-screenshots-carousel";
import type { AppScreenshot } from "@/lib/data/apps";

interface AppScreenshotsProps {
  screenshots: AppScreenshot[];
  showTitle?: boolean;
}

export async function AppScreenshots({
  screenshots,
  showTitle = true,
}: AppScreenshotsProps) {
  if (screenshots.length === 0) return null;

  const t = await getTranslations("appDetail");
  const messages = await getMessages();
  const tabLabels = messages.screenshotTabs as string[];

  return (
    <AppScreenshotsCarousel
      screenshots={screenshots}
      title={showTitle ? t("screenshots") : undefined}
      tabLabels={tabLabels}
    />
  );
}
