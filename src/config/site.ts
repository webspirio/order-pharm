/**
 * Non-text business data. Single source for markup, legal pages, and JSON-LD.
 * All user-visible *copy* belongs in `src/i18n/`, not here.
 *
 * Optional fields left empty are omitted from structured data rather than
 * emitted as nulls. The `/new-site` skill fills this file in.
 */
export const site = {
  /** Brand name, as shown in page titles, JSON-LD, and OG tags. */
  name: "Rechtsanwältin Olga Gatlin",
  /** Name only, without the professional title — used for the header logotype. */
  shortName: "Olga Gatlin",
  /** Registered legal entity, if it differs from the brand name. */
  legalName: "",
  /** Founder or responsible person. Optional. */
  owner: "",
  /**
   * Canonical origin, no trailing slash. Single source of truth for the
   * site's domain — `astro.config.ts` imports this file and sets
   * `site: site.domain` from it, so the two can no longer drift.
   *
   * TEMPORARY test domain (the workers.dev subdomain this Worker serves
   * from, see `wrangler.jsonc`'s `name`) while the real domain isn't live
   * yet — swap this for the real origin once it is; `pnpm verify`'s
   * placeholder checks only special-case example.com, so they'll pass as-is
   * either way. NOT the same domain as the contact-form's outbound mail
   * (`chorno.us`, see `worker/wrangler.toml`) — those are deliberately two
   * separate test domains right now.
   */
  domain: "https://swt.webspirio.workers.dev",

  /**
   * schema.org type for the primary entity. Attorney — most specific fit for
   * a solo-practice Rechtsanwältin (subtype of LegalService/LocalBusiness).
   */
  schemaType: "Attorney",

  email: "olga@gatlin.de",
  mailHref: "mailto:olga@gatlin.de",
  /** Human-readable phone number. Leave empty to hide phone CTAs. */
  phoneDisplay: "+49 176 7938 8816",
  /** e.g. "tel:+10000000000" */
  phoneHref: "tel:+4917679388816",
  /** WhatsApp/Signal/Telegram deep link. Leave empty to hide messenger CTAs. */
  messengerHref: "",
  /** Social profile URLs. Leave empty to hide the footer's social icons. */
  facebookUrl: "https://www.facebook.com/lawyergatlin",
  youtubeUrl: "https://www.youtube.com/@soliduaritye.v.2113",

  /* --- Optional: omitted from JSON-LD when empty --------------------- */
  addressStreet: "Ludwigstraße 8",
  addressPostal: "80539",
  addressLocality: "München",
  addressRegion: "Bayern",
  /** ISO 3166-1 alpha-2, e.g. "DE". Required by schema.org if an address is set. */
  addressCountryCode: "DE",
  /**
   * Geo coordinates, if you have a physical location. Also drives the
   * office-location map on /kontakt/ (`pnpm office-map` — re-run it after
   * changing these, its tile coordinates aren't read live from here).
   */
  geoLat: 48.1456326 as number | undefined,
  geoLng: 11.5796767 as number | undefined,
  /** VAT / tax identifier, where legally displayed. TODO(owner): fill in. */
  vatId: "",
  /**
   * Relative price level, e.g. "$$" or "€€". Deliberately left empty and
   * must STAY empty — this site never displays consultation prices/sums.
   */
  priceRange: "",
  /** City or region served. Leave empty for non-local businesses. */
  areaServed: "München",
  /** Opening hours, or undefined if not applicable. */
  openingHours: undefined as
    | { days: string[]; opens: string; closes: string }
    | undefined,
  /**
   * Public profile URLs for schema.org `sameAs` (entity reconciliation).
   * Derived from facebookUrl/youtubeUrl above rather than duplicated here.
   */
  get sameAs(): string[] {
    return [this.facebookUrl, this.youtubeUrl].filter(Boolean);
  },

  /**
   * "Open in Google Maps" link for the office address — shared by
   * /kontakt/ (address row + map photo card) and the homepage's closing
   * Contact section, so the query string is only ever built once. Empty
   * string when there's no address to link to.
   */
  get mapHref(): string {
    if (!this.addressStreet) return "";
    const query = encodeURIComponent(
      `${this.addressStreet}, ${this.addressPostal} ${this.addressLocality}`,
    );
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  },

  /** Social share image (1200x630), served from /public. */
  ogImage: "/og-image.jpg",
};

/** In-page anchor ids, shared by header nav, sections, and footer. */
export const anchors = {
  gallery: "work",
  why: "why",
  faq: "faq",
  contact: "contact",
} as const;
