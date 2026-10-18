import type { Dictionary, Locale } from "@/lib/i18n";
import { localeMeta, locales } from "@/lib/i18n";
import { Wordmark } from "./Wordmark";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { footer } = dict;
  const legalLinks = [
    { href: `/${locale}/legal-notice`, label: footer.legal.imprint },
    { href: `/${locale}/privacy`, label: footer.legal.privacy },
    { href: `/${locale}/privacy#cookies`, label: footer.legal.cookies },
  ];

  return (
    <footer className="bg-[linear-gradient(180deg,#20241a_0%,#14160f_100%)] px-5 pt-20 pb-10 text-sm text-muted sm:px-8 lg:px-[7vw]">
      <div className="mx-auto grid max-w-[110rem] gap-12 border-t border-line/50 pt-12 md:grid-cols-[auto_1fr_auto] md:gap-16">
        <div className="text-ivory">
          <Wordmark />
        </div>

        <div className="space-y-2 leading-relaxed">
          <p>{footer.tagline}</p>
          <p>{footer.product}</p>
          <p className="pt-3 text-ivory/90">{footer.responsible}</p>
        </div>

        <div className="space-y-6">
          <nav aria-label={dict.nav.language}>
            <ul className="flex flex-wrap gap-x-1">
              {locales.map((l) => (
                <li key={l}>
                  <a
                    href={`/${l}`}
                    hrefLang={localeMeta[l].htmlLang}
                    lang={localeMeta[l].htmlLang}
                    aria-current={l === locale ? "true" : undefined}
                    className={`flex min-h-11 min-w-11 items-center justify-center text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:text-gold ${
                      l === locale ? "text-gold" : ""
                    }`}
                  >
                    <span className="sr-only">{localeMeta[l].nativeName} — </span>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={footer.legal.label}>
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex min-h-11 items-center underline-offset-4 hover:text-gold hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-[110rem] text-xs text-muted/70">© {footer.rights}</p>
    </footer>
  );
}
