/**
 * Launch inputs that must not be invented. Values can be overridden with
 * environment variables (see `.env.example`); anything unset renders a safe
 * placeholder instead of a fake contact action.
 */

function env(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export const siteConfig = {
  siteUrl: env(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000",

  contact: {
    privateEmail: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "liqueurquince@gmail.com",
    /** Separate address for trade enquiries; falls back to the main email. */
    tradeEmail: env(process.env.NEXT_PUBLIC_TRADE_EMAIL),
    /** Display format; the tel: link strips the spaces. */
    phone: env(process.env.NEXT_PUBLIC_CONTACT_PHONE) ?? "+381 63 899 1629",
  },

  /**
   * Full-screen hero video (on by default; NEXT_PUBLIC_HERO_VIDEO=false
   * switches back to the bottle photo hero). The poster still remains the
   * fallback for reduced motion, Save-Data and blocked autoplay.
   */
  heroVideo:
    env(process.env.NEXT_PUBLIC_HERO_VIDEO) !== "false"
      ? {
          desktop: "/video/hero-desktop.mp4",
          mobile: "/video/hero-mobile.mp4",
        }
      : null,
} as const;
