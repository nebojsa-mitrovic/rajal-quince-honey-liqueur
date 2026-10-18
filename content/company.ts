/**
 * Legal entity details for the Legal notice and Privacy policy, taken from
 * the official APR register entry — never guess. Every `null` renders as a
 * highlighted placeholder on the legal pages. The public contact email and
 * phone come from lib/site-config.ts.
 */
export const company = {
  /** Registered business name (poslovno ime) exactly as in APR. */
  name: "RAJAL DISTILLERY DOO VRBAS" as string | null,
  /** Name shown with the address in the homepage contact section. */
  contactName: "Rajal Destilerija",
  /** "d.o.o." is translated per language in content/legal/*; anything else is shown as is. */
  legalForm: "d.o.o." as string | null,
  street: "Sivč Jovgena bb" as string | null,
  postalCode: "21460" as string | null,
  city: "Vrbas" as string | null,
  /** Legal representative as registered with APR (zastupnik) — usually the director. */
  representative: null as string | null,
  /** Person responsible for the website content and contact person. */
  contentResponsible: "Strahinja Babović" as string | null,
  /** Matični broj (company registration number). */
  registrationNumber: "21086444" as string | null,
  /** PIB (tax identification number). */
  taxId: "108882218" as string | null,
  /** Who took the photographs / holds the image rights. */
  photoCredits: "Strahinja Babovic Photography" as string | null,

  /** Hosting provider acting as processor under its Data Processing Agreement. */
  hostingProvider: "SiteGround Spain S.L., Calle de Prim 19, 28004 Madrid, Spain" as string | null,
  /**
   * Server log retention in days, if the host documents one. SiteGround does
   * not publish a fixed period, so the policy describes it qualitatively.
   */
  logRetentionDays: null as number | null,
};
