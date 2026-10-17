import type { Dictionary, Locale } from "@/lib/i18n";
import { localeMeta, locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { Wordmark } from "./Wordmark";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { footer } = dict;
  const legalLinks = (Object.keys(siteConfig.legal) as (keyof typeof siteConfig.legal)[])
    .map((key) => ({ key, href: siteConfig.legal[key], label: footer.legal[key] }))
    .filter((link): link is typeof link & { href: string } => link.href !== null);

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

          {legalLinks.length > 0 ? (
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className="underline-offset-4 hover:text-gold hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted/80">{footer.legalPending}</p>
          )}
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-[110rem] text-xs text-muted/70">© {footer.rights}</p>
    </footer>
  );
}
