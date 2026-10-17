import type { MetadataRoute } from "next";
import { approvedLocales, localeMeta } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    approvedLocales.map((l) => [localeMeta[l].htmlLang, `${siteConfig.siteUrl}/${l}`]),
  );
  return approvedLocales.map((locale) => ({
    url: `${siteConfig.siteUrl}/${locale}`,
    alternates: { languages },
  }));
}
