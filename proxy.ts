import { NextResponse, type NextRequest } from "next/server";
import { approvedLocales, defaultLocale, hasLocale, type Locale } from "@/lib/i18n";

function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.split("-")[0].toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of ranked) {
    if ((approvedLocales as readonly string[]).includes(lang)) return lang as Locale;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // One canonical host: www.quinceliqueur.com → quinceliqueur.com (permanent).
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  if (host.startsWith("www.")) {
    return NextResponse.redirect(`https://${host.slice(4)}${pathname}${search}`, 308);
  }

  // Files (sitemap.xml, robots.txt, icon.svg, images…) are served as is.
  if (pathname.includes(".")) return;

  const firstSegment = pathname.split("/")[1];
  if (hasLocale(firstSegment)) return;

  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Everything except Next's build assets, so the www redirect also covers files.
  matcher: ["/((?!_next/).*)"],
};
