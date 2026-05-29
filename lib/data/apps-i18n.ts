import {
  apps as appsBase,
  getAppDownloads,
  type App,
  type AppDownload,
  type AppScreenshot,
} from "@/lib/data/apps";

export type AppMessages = {
  name: string;
  tagline: string;
  description: string;
  type: string;
  installNoteTitle?: string;
  installNote?: string;
  installationGuide?: string;
  downloadChoose?: string;
  comingSoon?: string;
  features: string[];
  faq: { question: string; answer: string }[];
  screenshots: { alt: string; caption: string }[];
  ctaTitle?: string;
  ctaDescription?: string;
};

export function mergeAppTranslations(
  base: App,
  t: AppMessages | undefined
): App {
  if (!t) return base;

  const screenshots: AppScreenshot[] = (base.screenshots ?? []).map(
    (shot, i) => ({
      src: shot.src,
      alt: t.screenshots[i]?.alt ?? shot.alt,
      caption: t.screenshots[i]?.caption ?? shot.caption,
    })
  );

  return {
    ...base,
    name: t.name,
    tagline: t.tagline,
    description: t.description,
    type: t.type,
    features: t.features,
    faq: t.faq,
    screenshots,
  };
}

export function getLocalizedApp(
  slug: string,
  appMessages: Record<string, AppMessages>
): App | undefined {
  const base = appsBase.find((a) => a.slug === slug && a.published);
  if (!base) return undefined;
  return mergeAppTranslations(base, appMessages[slug]);
}

export function getLocalizedPublishedApps(
  appMessages: Record<string, AppMessages>
): App[] {
  return appsBase
    .filter((a) => a.published)
    .map((a) => mergeAppTranslations(a, appMessages[a.slug]))
    .filter(Boolean);
}

export function getLocalizedLatestReleasedApp(
  appMessages: Record<string, AppMessages>
): App | undefined {
  return getLocalizedPublishedApps(appMessages).find(
    (a) => a.status === "Released"
  );
}

export { getAppDownloads, appsBase, type App, type AppDownload };
