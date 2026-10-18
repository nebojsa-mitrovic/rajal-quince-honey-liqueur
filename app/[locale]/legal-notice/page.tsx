import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locale as localeParam } from "next/root-params";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { getDictionary, hasLocale, resolveLocale } from "@/lib/i18n";
import { getLegalTexts } from "@/lib/legal";

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveLocale(await localeParam());
  const texts = await getLegalTexts(locale);
  return {
    title: `${texts.imprint.title} — Rajal Distillery`,
    alternates: { canonical: `/${locale}/legal-notice` },
  };
}

export default async function LegalNoticePage() {
  const locale = await localeParam();
  if (!hasLocale(locale)) notFound();
  const [dict, texts] = await Promise.all([getDictionary(locale), getLegalTexts(locale)]);

  return (
    <LegalDocument
      doc={texts.imprint}
      locale={locale}
      updatedLabel={texts.updatedLabel}
      backLabel={dict.legalPage.back}
      fallbackNotice={texts.fallbackNotice}
    />
  );
}
