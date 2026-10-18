import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { locale as localeParam } from "next/root-params";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  approvedLocales,
  getDictionary,
  localeMeta,
  locales,
  resolveLocale,
} from "@/lib/i18n";
import { AGE_STORAGE_DAYS, AGE_STORAGE_KEY } from "@/lib/age";
import { siteConfig } from "@/lib/site-config";
import ogImage from "@/public/images/bottle-studio-dark.jpg";
import "@/styles/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Runs before first paint: enables motion-only styles, restores a recent
// age confirmation (so the age gate never flashes), and reveals all content
// if the animation bundle has not started within a few seconds.
const bootScript = `(function(d){d.classList.add('js');try{var t=+localStorage.getItem('${AGE_STORAGE_KEY}');if(t&&Date.now()-t<${AGE_STORAGE_DAYS}*864e5)d.classList.add('age-ok')}catch(e){}setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.add('motion-fallback')},4000)})(document.documentElement)`;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0b0503",
  colorScheme: "dark",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveLocale(await localeParam());
  const dict = await getDictionary(locale);
  const meta = localeMeta[locale];

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(approvedLocales.map((l) => [localeMeta[l].htmlLang, `/${l}`])),
        "x-default": "/en",
      },
    },
    robots: meta.status === "approved" ? undefined : { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: "Rajal Distillery",
      title: dict.meta.title,
      description: dict.meta.description,
      locale: meta.ogLocale,
      url: `/${locale}`,
      images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height }],
    },
  };
}

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = resolveLocale(await localeParam());
  const dict = await getDictionary(locale);

  return (
    <html
      lang={localeMeta[locale].htmlLang}
      className={`${playfair.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] bg-ivory px-5 py-3 text-sm font-semibold text-espresso focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          {dict.nav.skip}
        </a>
        <SiteHeader
          locale={locale}
          nav={dict.nav}
          locales={locales.map((l) => ({
            code: l,
            nativeName: localeMeta[l].nativeName,
            htmlLang: localeMeta[l].htmlLang,
          }))}
        />
        {dict.draftNotice ? (
          <p className="fixed right-4 bottom-4 z-40 max-w-[18rem] border border-gold/40 bg-espresso/90 px-4 py-2 text-xs text-muted backdrop-blur">
            {dict.draftNotice}
          </p>
        ) : null}
        {children}
        <SiteFooter locale={locale} dict={dict} />
      </body>
    </html>
  );
}
