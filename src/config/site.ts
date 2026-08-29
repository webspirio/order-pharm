/**
 * Non-text business data. Single source for markup, legal pages, and JSON-LD.
 * All user-visible *copy* belongs in `src/i18n/`, not here. Every price, dose
 * and duration belongs in `src/config/pricing.ts`, not here.
 *
 * Optional fields left empty are omitted from structured data rather than
 * emitted as nulls.
 *
 * DEMO SITE. The company, the address, the phone number (a reserved 555-01xx
 * fictional-use number) and the pharmacy-network names are illustrative. What
 * is NOT illustrative is the compliance posture: every sentence on this site
 * is written for a business that administers and coordinates, and neither
 * prescribes nor dispenses.
 */
export const site = {
  /** Brand name, as shown in page titles, JSON-LD, and OG tags. */
  name: "Ellery Health",
  /** Name only, for the header logotype. */
  shortName: "Ellery",
  /** Registered legal entity. */
  legalName: "Ellery Health, Inc.",
  /** Founder or responsible person. Not named on a demo build. */
  owner: "",
  /**
   * Canonical ORIGIN, no trailing slash and no path. Single source of truth —
   * `astro.config.ts` imports this file and sets `site: site.domain`, so the
   * two can never drift.
   *
   * This is a GitHub Pages project site, so the origin is the github.io host
   * and the repository name is a path prefix — see `basePath` below. The pair
   * is what every canonical, hreflang, sitemap entry and the JSON-LD `@id` is
   * built from, which is why they live together.
   */
  domain: "https://webspirio.github.io",

  /**
   * Path prefix, with a leading slash and NO trailing slash; "" for a site
   * served from a domain root.
   *
   * A GitHub Pages project site serves at `<user>.github.io/<repo>/`, so every
   * absolute path the site emits has to carry the repo name. Rather than
   * sprinkle that through the markup it is threaded in exactly two places:
   * `localizedPath()` prepends it to every internal link, and `assetPath()`
   * prepends it to the handful of `/public` references in `Layout.astro`.
   * `astro.config.ts` also reads it as Astro's own `base`, which is what
   * rewrites the built asset URLs.
   *
   * Moving to a custom domain is therefore a one-line change: set this to ""
   * and point `domain` at the new origin.
   */
  basePath: "/order-pharm",

  /**
   * schema.org type for the primary entity. Deliberately `Organization`, NOT
   * `MedicalBusiness` / `MedicalOrganization` / `Pharmacy`. Ellery does not
   * practise medicine and does not dispense, and the structured data has to
   * say the same thing the footer does — a `MedicalBusiness` entity would
   * assert in machine-readable form exactly the claim every page disclaims.
   */
  schemaType: "Organization",

  email: "hello@joinellery.com",
  mailHref: "mailto:hello@joinellery.com",
  /**
   * Human-readable phone. The premium end of this category publishes a real
   * number and real hours, because the top anxiety in a mail-order
   * prescription flow is "will anyone answer". 555-01xx is the reserved
   * fictional-use range, so a demo can show the pattern without ringing a
   * real business.
   */
  phoneDisplay: "(888) 555-0134",
  phoneHref: "tel:+18885550134",
  /** WhatsApp/Signal/Telegram deep link. Empty hides the messenger CTAs. */
  messengerHref: "",
  /**
   * Social profile URLs. Deliberately empty on this build: a footer icon that
   * links nowhere is the same defect as an "Important Safety Information"
   * link with href="#", which two of the three reference sites ship. Fill
   * these in when the accounts exist and the icons appear on their own.
   */
  facebookUrl: "",
  youtubeUrl: "",

  /* --- Optional: omitted from JSON-LD when empty --------------------- */
  addressStreet: "600 Congress Avenue, Suite 1400",
  addressPostal: "78701",
  addressLocality: "Austin",
  addressRegion: "TX",
  /** ISO 3166-1 alpha-2. Required by schema.org if an address is set. */
  addressCountryCode: "US",
  /** No physical storefront to map — Ellery is not a clinic and not a pharmacy. */
  geoLat: undefined as number | undefined,
  geoLng: undefined as number | undefined,
  vatId: "",
  /**
   * Relative price level. Deliberately empty and must STAY empty: a
   * `priceRange` on the organization would read as Ellery pricing medical
   * care, which is precisely the claim the administrative-fee model rests on
   * not making. Real, itemised prices live on /pricing/.
   */
  priceRange: "",
  /** Where the service is available. */
  areaServed: "United States",
  /**
   * Support hours, published because the category's premium end does and
   * because a coordination business is judged on reachability. Weekend hours
   * are narrower and stated in copy; schema.org takes the weekday block.
   */
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "20:00",
  } as { days: string[]; opens: string; closes: string } | undefined,
  /** Public profile URLs for schema.org `sameAs`. Derived, not duplicated. */
  get sameAs(): string[] {
    return [this.facebookUrl, this.youtubeUrl].filter(Boolean);
  },

  /** "Open in Google Maps" link, or "" when there is no address to link. */
  get mapHref(): string {
    if (!this.addressStreet) return "";
    const query = encodeURIComponent(
      `${this.addressStreet}, ${this.addressLocality} ${this.addressRegion} ${this.addressPostal}`,
    );
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  },

  /** Social share image (1200x630), served from /public. */
  ogImage: "/og-image.jpg",
};

/**
 * Prefix a `/public` path with the deployment's base path.
 *
 * Astro rewrites asset URLs it generates itself (imported images, the CSS and
 * JS bundles), but a hand-written `href="/favicon.svg"` in markup is opaque to
 * it and would resolve against the domain root — 404 on a project site. This
 * is the one helper for those, and `verify-dist.mjs` fails the build if a
 * built page links to a path that is neither a route nor a real file, so a
 * missed call cannot ship silently.
 */
export const assetPath = (file: string): string =>
  `${site.basePath}${file.startsWith("/") ? file : `/${file}`}`;


/** In-page anchor ids, shared by header nav, sections, and footer. */
export const anchors = {
  relay: "how",
  programs: "programs",
  pricing: "pricing",
  roles: "who-does-what",
  faq: "faq",
  learn: "learn",
} as const;
