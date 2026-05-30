import { getTranslations } from "next-intl/server";
import { AppScreenshotsCarousel } from "@/components/app-screenshots-carousel";
import type { AppScreenshot } from "@/lib/data/apps";

interface AppScreenshotsProps {
  screenshots: AppScreenshot[];
  showTitle?: boolean;
  dotLabels?: string[];
  layout?: "uniform" | "mixed";
}

export async function AppScreenshots({
  screenshots,
  showTitle = true,
  dotLabels = [],
  layout = "mixed",
}: AppScreenshotsProps) {
  if (screenshots.length === 0) return null;

  const t = await getTranslations("appDetail");

  return (
    <AppScreenshotsCarousel
      screenshots={screenshots}
      title={showTitle ? t("screenshots") : undefined}
      dotLabels={dotLabels}
      layout={layout}
    />
  );
}
