/**
 * Copy shared by every page: navigation, the trust ticker, the footer, the
 * compliance band, accessibility strings, and the two closing calls to action.
 *
 * VOICE, for anything added here or in a sibling module:
 * - Short declarative sentences. Plain verbs. Sentence case. No exclamation
 *   marks. No "unlock", "journey", "elevate", "transform".
 * - Numbers persuade; adjectives do not. Where a claim has a figure, import
 *   the figure from `src/config/pricing.ts` in the component rather than
 *   typing it here — that is why almost no number appears in this file.
 * - Concede before the reader objects. "Not everyone qualifies." "Worth it
 *   only if you order more than once a quarter." Confidence reads as candour
 *   in a category full of overclaiming.
 *
 * COMPLIANCE, non-negotiable in every string on this site:
 * - Never a possessive over clinicians or pharmacies. Not "our doctors",
 *   "our pharmacy", "our clinical team". They are independent third parties.
 * - Never "we prescribe", "we'll get you a prescription", "we ship your
 *   medication". Ellery routes; it does not prescribe, dispense or ship.
 * - Never promise or imply a prescription. Every price is conditional on a
 *   clinician deciding treatment is appropriate.
 * - "Compounded" always adjacent to the molecule, never a brand name on a
 *   compounded product, and never "FDA-approved" near one. "FDA-registered"
 *   is not a synonym for approved and must not be used as one.
 * - Longevity claims hedge: "may support", "is studied for". Never "treats",
 *   "prevents", "reverses".
 */
const common = {
  nav: {
    weightLoss: "Weight loss",
    longevity: "Longevity",
    howItWorks: "How it works",
    pricing: "Pricing",
    learn: "Learn",
    faq: "FAQ",
    contact: "Contact",
    cta: "Start your intake",
    toggleTheme: "Toggle theme",
  },

  palette: {
    label: "Colour palette",
    options: {
      original: "Saline",
      indigo: "Indigo",
      clay: "Clay",
    },
  },

  /**
   * The ticker above the nav. All three reference sites run one, and it is
   * the cheapest vertical space on the page: five claims a visitor reads
   * before any image loads. The difference here is that every one of these
   * is checkable — a fixed fee, a published window, a refund rule — rather
   * than a patient count nobody can verify.
   *
   * Items are templates: `{n}` is substituted with a figure from
   * `src/config/pricing.ts` by TrustTicker.astro, so the ticker and the
   * pricing table cannot drift apart.
   */
  ticker: {
    label: "What this costs and how long it takes",
    items: [
      "Fixed {admin} administration fee",
      "No markup on medication",
      "Clinician review in {reviewHours} hours or less",
      "Refunded in full if you are not approved",
      "Available in {states} states and DC",
    ],
  },

  /** The two-line disclosure that appears wherever a price does. */
  gating: {
    short: "Prescription only if a licensed clinician decides it is appropriate.",
    long: "Prices are shown so you can plan. Nothing here is an offer of medication. A clinician licensed in your state reviews your intake and decides independently whether treatment is appropriate, and may decide it is not.",
  },

  cta: {
    eyebrow: "Start",
    title: "The intake takes about eight minutes.",
    lead: "You will not be asked for payment until you have seen the full itemised cost. If a clinician decides treatment is not appropriate for you, the review fee is refunded in full.",
    primary: "Start your intake",
    secondary: "See the full pricing",
    reassure: "No appointment. No phone call. No insurance.",
  },

  /** Closing dark band. Every symbol used anywhere on the site resolves here. */
  compliance: {
    title: "The part most sites bury",
    lead: "Ellery Health, Inc. is a technology and administration company. It is not a pharmacy, it is not a medical practice, and it does not employ the clinicians who review intakes.",
    notes: [
      {
        symbol: "*",
        text: "Ellery does not provide medical services and is not a pharmacy. All professional medical services are provided by independent, licensed clinicians affiliated with a separate professional entity. All prescriptions are dispensed by independent, state-licensed pharmacies. Using this site does not create a clinician-patient relationship with Ellery.",
      },
      {
        symbol: "†",
        text: "Ellery's administration fee is fixed, charged per order, and billed separately. It pays for intake technology, order coordination, payment processing, records handling and the support line. It does not include, purchase or guarantee a prescription, a medical service or medication, and it is never calculated as a share of the medication price.",
      },
      {
        symbol: "‡",
        text: "Compounded preparations are made by state-licensed pharmacies under Section 503A or 503B of the Federal Food, Drug and Cosmetic Act, for an individual patient, against a prescription. The FDA does not review or approve compounded preparations for safety, effectiveness or quality. FDA-approved alternatives exist for several of the molecules named on this site and a clinician may recommend one instead.",
      },
      {
        symbol: "§",
        text: "GLP-1 medications can cause serious side effects, including a risk of thyroid C-cell tumours. Do not use if you or a family member has had medullary thyroid carcinoma (MTC) or multiple endocrine neoplasia syndrome type 2 (MEN 2). Full safety information is provided with every prescription and before you are asked to pay.",
      },
      {
        symbol: "¶",
        text: "Longevity preparations are prescribed at a clinician's discretion and are not FDA-approved for any specific indication. Statements about them describe what they are studied for, not an outcome you should expect.",
      },
      {
        symbol: "◆",
        text: "Ellery Health, Inc. is not a covered entity under HIPAA. The affiliated clinical practice and the partner pharmacies are, and Ellery acts as their business associate where that applies. Separate state consumer health data laws apply to information you give Ellery directly, and the Privacy Policy sets out exactly which is which.",
      },
      {
        symbol: "‖",
        text: "Wegovy®, Ozempic®, Zepbound® and Mounjaro® are registered trademarks of their respective owners. Ellery is not affiliated with, endorsed by or sponsored by any of them, and no compounded preparation is a generic, equivalent or substitute for a branded product.",
      },
      {
        symbol: "◇",
        text: "Illustrative demonstration site. The company, the address, the phone number, the named clinical practice and the named pharmacies are examples, not real entities. Patient quotations are written for the demonstration and are not from real patients.",
      },
    ],
    emergency:
      "This site is not for emergencies. If you are having a medical emergency, call 911 or go to the nearest emergency room.",
  },

  footer: {
    tagline: "Licensed clinicians. Independent pharmacies. One clear path.",
    columns: {
      programs: "Programs",
      company: "How this works",
      support: "Support",
      legal: "Legal",
    },
    home: "Home",
    supportHours: "Mon–Fri 8am–8pm ET · Sat–Sun 10am–4pm ET",
    supportNote: "A person answers. Not a queue.",
    address: "Registered office",
    rights: "All rights reserved.",
    terms: "Terms of use",
    privacy: "Privacy policy",
    disclosures: "Disclosures",
  },

  a11y: {
    skip: "Skip to content",
    primaryNav: "Primary",
    langNav: "Language",
    close: "Close",
    openMenu: "Open menu",
    ticker: "Site announcements",
  },
};

export default common;
