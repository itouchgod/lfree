/** Doc markdown slug for a published app (e.g. mmh → mmh-overview). */
export function docSlugForApp(appSlug: string): string {
  return `${appSlug}-overview`;
}

export function appSlugFromDocSlug(docSlug: string): string {
  return docSlug.replace(/-overview$/, "");
}
