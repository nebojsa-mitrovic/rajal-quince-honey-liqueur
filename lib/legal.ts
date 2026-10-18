import { company } from "@/content/company";
import { siteConfig } from "@/lib/site-config";
import { AGE_STORAGE_DAYS, AGE_STORAGE_KEY } from "@/lib/age";
import type { Locale } from "@/lib/i18n";

/** A paragraph, a bullet list, or label/value rows. `[[…]]` marks missing data. */
export type Block = string | { list: string[] } | { rows: [string, string][] };
export type LegalSection = { id?: string; heading: string; blocks: Block[] };
export type LegalDoc = { title: string; intro?: string; sections: LegalSection[] };

export type LegalTexts = {
  privacy: LegalDoc;
  imprint: LegalDoc;
  updatedLabel: string;
  /** Shown when a locale falls back to another language's text. */
  fallbackNotice?: string;
};

/** Facts available to the text builders; missing values become `[[label]]`. */
export type LegalFacts = {
  pending: (value: string | number | null, label: string) => string;
  company: typeof company;
  email: string | null;
  phone: string | null;
  /** Key used for the age confirmation in localStorage (see AgeGate). */
  ageStorageKey: string;
  ageStorageDays: number;
};

export type LegalBuilder = (facts: LegalFacts) => LegalTexts;

/** Date the legal texts were last revised — bump when you change them. */
export const LEGAL_UPDATED = "2026-10-18";

const builders: Partial<Record<Locale, () => Promise<LegalBuilder>>> = {
  en: () => import("@/content/legal/en").then((m) => m.default),
  sr: () => import("@/content/legal/sr").then((m) => m.default),
  de: () => import("@/content/legal/de").then((m) => m.default),
};

const fallbackNotices: Partial<Record<Locale, string>> = {
  hu: "Ez a dokumentum jelenleg angol nyelven érhető el.",
  fr: "Ce document est actuellement disponible en anglais.",
};

export async function getLegalTexts(locale: Locale): Promise<LegalTexts> {
  const build = await (builders[locale] ?? builders.en!)();
  const texts = build({
    pending: (value, label) => (value === null || value === "" ? `[[${label}]]` : String(value)),
    company,
    email: siteConfig.contact.privateEmail,
    phone: siteConfig.contact.phone,
    ageStorageKey: AGE_STORAGE_KEY,
    ageStorageDays: AGE_STORAGE_DAYS,
  });
  return builders[locale] ? texts : { ...texts, fallbackNotice: fallbackNotices[locale] };
}
