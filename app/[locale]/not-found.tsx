import { locale as localeParam } from "next/root-params";
import { getDictionary, resolveLocale } from "@/lib/i18n";

export default async function NotFound() {
  const locale = resolveLocale(await localeParam());
  const dict = await getDictionary(locale);

  return (
    <main
      id="main"
      className="flex min-h-svh flex-col items-start justify-center bg-[radial-gradient(ellipse_at_70%_40%,#2c1509,#0b0503_65%)] px-5 sm:px-8 lg:px-[7vw]"
    >
      <p className="eyebrow">404</p>
      <h1 className="heading mt-5 mb-10 max-w-3xl">{dict.notFound.title}</h1>
      <a href={`/${locale}`} className="text-link">
        {dict.notFound.back}
        <span aria-hidden>→</span>
      </a>
    </main>
  );
}
