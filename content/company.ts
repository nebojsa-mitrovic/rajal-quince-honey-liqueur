/**
 * Legal entity details for the Legal notice and Privacy policy.
 * Fill these in from the official registration (APR) — never guess.
 * Every `null` renders as a highlighted placeholder on the legal pages.
 * Contact email/phone come from NEXT_PUBLIC_CONTACT_EMAIL / _PHONE.
 */
export const company = {
  /** Registered company name, e.g. as listed in the APR register. */
  name: null as string | null,
  /** Legal form, e.g. "d.o.o." or "preduzetnik". */
  legalForm: null as string | null,
  street: null as string | null,
  postalCode: null as string | null,
  city: null as string | null,
  /** Person(s) authorised to represent the company. */
  representative: null as string | null,
  /** Matični broj (company registration number). */
  registrationNumber: null as string | null,
  /** PIB (tax identification number). */
  taxId: null as string | null,
  /** Who took the photographs / holds the image rights. */
  photoCredits: null as string | null,

  /** Hosting provider, e.g. "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA". */
  hostingProvider: null as string | null,
  /** How long the host keeps server logs, in days (check the provider's documentation). */
  logRetentionDays: null as number | null,
  /** Safeguard for transfers outside the EU/EEA/Serbia, if the host is located there. */
  transferSafeguard: null as string | null,
};
