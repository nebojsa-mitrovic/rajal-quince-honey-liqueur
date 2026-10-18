import type en from "@/content/en.json";

export type Dictionary = typeof en;

export const locales = ["en", "sr", "hu", "de", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/**
 * `approved` locales are indexable and eligible for automatic redirects.
 * `draft` locales render a visible notice and are marked noindex until a
 * native-speaking reviewer signs off — flip the status here when approved.
 */
export const localeMeta: Record<
  Locale,
  {
    nativeName: string;
    htmlLang: string;
    ogLocale: string;
    status: "approved" | "draft";
  }
> = {
  en: { nativeName: "English", htmlLang: "en", ogLocale: "en_GB", status: "approved" },
  sr: { nativeName: "Srpski", htmlLang: "sr-Latn", ogLocale: "sr_RS", status: "approved" },
  hu: { nativeName: "Magyar", htmlLang: "hu", ogLocale: "hu_HU", status: "approved" },
  de: { nativeName: "Deutsch", htmlLang: "de", ogLocale: "de_DE", status: "approved" },
  fr: { nativeName: "Français", htmlLang: "fr", ogLocale: "fr_FR", status: "approved" },
};

export const approvedLocales = locales.filter(
  (locale) => localeMeta[locale].status === "approved",
);

export function hasLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function resolveLocale(value: string | undefined): Locale {
  return hasLocale(value) ? value : defaultLocale;
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/content/en.json").then((m) => m.default),
  sr: () => import("@/content/sr.json").then((m) => m.default),
  hu: () => import("@/content/hu.json").then((m) => m.default),
  de: () => import("@/content/de.json").then((m) => m.default),
  fr: () => import("@/content/fr.json").then((m) => m.default),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
