/**
 * Launch inputs that must not be invented. Everything here is read from
 * environment variables (see `.env.example`); unset values render a safe
 * placeholder instead of a fake contact action.
 */

function env(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export const siteConfig = {
  siteUrl: env(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000",

  contact: {
    privateEmail: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    tradeEmail: env(process.env.NEXT_PUBLIC_TRADE_EMAIL),
    phone: env(process.env.NEXT_PUBLIC_CONTACT_PHONE),
  },

  legal: {
    privacy: env(process.env.NEXT_PUBLIC_LEGAL_PRIVACY_URL),
    imprint: env(process.env.NEXT_PUBLIC_LEGAL_IMPRINT_URL),
    terms: env(process.env.NEXT_PUBLIC_LEGAL_TERMS_URL),
  },

  /**
   * Hero video slot. Drop the files into `public/video/` and set
   * NEXT_PUBLIC_HERO_VIDEO=true. The still photo remains the poster and the
   * fallback for reduced motion, Save-Data and blocked autoplay.
   */
  heroVideo:
    env(process.env.NEXT_PUBLIC_HERO_VIDEO) === "true"
      ? {
          desktop: "/video/hero-desktop.mp4",
          mobile: "/video/hero-mobile.mp4",
        }
      : null,
} as const;
