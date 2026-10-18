import { notFound } from "next/navigation";
import { locale as localeParam } from "next/root-params";
import { PageMotion } from "@/components/animation/PageMotion";
import { AgeGate } from "@/components/layout/AgeGate";
import { Bottle } from "@/components/sections/Bottle";
import { Contact } from "@/components/sections/Contact";
import { Craft } from "@/components/sections/Craft";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Ingredients } from "@/components/sections/Ingredients";
import { Story } from "@/components/sections/Story";
import { getDictionary, hasLocale, localeMeta, locales } from "@/lib/i18n";

export default async function HomePage() {
  const locale = await localeParam();
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <AgeGate
        dict={dict.ageGate}
        legal={dict.footer.legal}
        languageLabel={dict.nav.language}
        locale={locale}
        locales={locales.map((l) => ({
          code: l,
          nativeName: localeMeta[l].nativeName,
          htmlLang: localeMeta[l].htmlLang,
        }))}
      />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero dict={dict.hero} />
        <Story dict={dict.story} />
        <Ingredients dict={dict.ingredients} />
        <Craft dict={dict.craft} />
        <Experience dict={dict.experience} />
        <Bottle dict={dict.bottle} />
        <Contact dict={dict.contact} />
        <PageMotion />
      </main>
    </>
  );
}
