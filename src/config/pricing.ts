/**
 * Every price, dose, duration and threshold on this site, declared once.
 *
 * WHY THIS FILE EXISTS: all three reference sites ship contradictory numbers
 * live — a hero badge claiming "350,000+ patients" directly under a ticker
 * claiming "100,000+", a membership quoted at both $75 and $74.99, a
 * "no memberships required" marquee above a product page charging a $74
 * membership fee. Each of those is one hand-typed number that drifted from
 * another. On a site whose entire pitch is "the numbers are in the open",
 * a drifted number is not a typo — it is the pitch failing. So the numbers
 * live here, are imported wherever they are shown, and cannot disagree.
 *
 * Formatting helpers live here too, so `$129/mo` renders identically on the
 * homepage preview, the program page and the pricing table.
 *
 * This is business data, not copy. Product names and the one-line clinical
 * descriptions are copy and live in `src/i18n/`.
 */

/* ------------------------------------------------------------------ */
/* What Ellery charges, and what it does not                          */
/* ------------------------------------------------------------------ */

export const fees = {
  /**
   * Paid to the affiliated clinical practice for the asynchronous review,
   * collected by Ellery as their agent. Refunded in full if no prescription
   * is issued — a fee contingent on an outcome would look like payment for a
   * referral, and a fee kept after ineligibility is the single most common
   * complaint in this category.
   */
  visit: 39,
  /** Ellery's own fee. Fixed per order. Never a share of the drug cost. */
  admin: 25,
  /** Optional membership. Waives `admin` and upgrades shipping. */
  membershipMonthly: 29,
  /** Same membership billed yearly, at two months off. */
  membershipYearly: 290,
} as const;

export const shipping = {
  /** Standard, included in every order. */
  standardCost: 0,
  standardDays: "2–4 business days",
  /** Overnight, or included with membership. */
  overnightCost: 19,
  overnightDays: "next business day",
  /** Alaska and Hawaii: carriers charge more, so we do. US territories are
      outside the served states entirely — see `coverage`. */
  remoteSurcharge: 45,
  remoteDays: "3–5 business days",
} as const;

/**
 * The clock the Relay renders. These are commitments, so they are stated as
 * ceilings, not averages — "≤ 2 hours" is a promise a coordination business
 * can be held to; "typically fast" is not.
 */
export const sla = {
  intakeMinutes: 8,
  reviewHours: 2,
  /** Orders approved before this go out the same day. */
  dispatchCutoff: "4:00 pm ET",
  /**
   * The delivery window the Relay quotes on the hero of every page.
   *
   * Derived from `shipping.standardDays` rather than written out. It used to
   * be its own literal, "1–2 business days", which meant the hero promised a
   * delivery window two days faster than the shipping table further down the
   * same page — the exact defect this file exists to prevent, shipped by the
   * file that prevents it. The Relay quotes the STANDARD lane because standard
   * is what is included; overnight is named in the courier step's own copy.
   */
  get deliveryDays(): string {
    return shipping.standardDays;
  },
};

/** Service availability. Stated as a real number, including the shortfall. */
export const coverage = {
  states: 47,
  includesDC: true,
  /** Total US states, for the honest "not all 50" phrasing. */
  totalStates: 50,
} as const;

/**
 * Clinical eligibility thresholds for the metabolic program, as the
 * affiliated practice applies them. Shown on the pricing page and computed
 * live in the intake so a visitor is not surprised at checkout.
 */
export const eligibility = {
  bmiAlone: 30,
  bmiWithCondition: 27,
  minAge: 18,
  /** Sermorelin is not offered below this age anywhere in this category. */
  minAgeSermorelin: 30,
} as const;

/* ------------------------------------------------------------------ */
/* Third parties, named                                                */
/* ------------------------------------------------------------------ */

/**
 * Naming the parties is the highest-credibility move available to a business
 * whose only product is coordination — and two of the three reference sites
 * do not do it at all. FICTIONAL on this demo build; replace with the real
 * entities and their licence numbers before launch.
 */
export const partners = {
  /** The independent practice whose clinicians review intakes. */
  practice: "Wren Clinical Partners, P.A.",
  pharmacies: [
    { name: "Rosemill Pharmacy Services", kind: "503A", state: "TX" },
    { name: "Kestrel Compounding", kind: "503B outsourcing facility", state: "OH" },
    { name: "Ninebark Mail Order", kind: "503A", state: "NV" },
  ],
} as const;

/**
 * The per-batch release panel the partner pharmacies publish. Real USP
 * chapter references — citing the standard by number is what separates a
 * quality claim from a quality adjective.
 */
export const batchPanel = [
  { test: "Potency", standard: "USP <1225>", result: "Pass" },
  { test: "Sterility", standard: "USP <71>", result: "Pass" },
  { test: "Bacterial endotoxins", standard: "USP <85>", result: "Pass" },
  { test: "pH and appearance", standard: "USP <797>", result: "Pass" },
] as const;

/* ------------------------------------------------------------------ */
/* Programs and products                                               */
/* ------------------------------------------------------------------ */

export type ProgramId = "metabolic" | "longevity";

export interface Treatment {
  id: string;
  program: ProgramId;
  /** Molecule is the parent name; "compounded" or a brand mark qualifies it. */
  molecule: string;
  /** Display name, exactly as it may legally be written. */
  display: string;
  /** true when this is a pharmacy-compounded preparation, not an approved drug. */
  compounded: boolean;
  form: string;
  cadence: string;
  /** Lowest monthly equivalent, in whole dollars. */
  fromMonthly: number;
  /** One month supply, bought one month at a time. */
  oneMonth: number;
  /** Three month supply, total. */
  threeMonth: number;
}

export const treatments: Treatment[] = [
  {
    id: "semaglutide",
    program: "metabolic",
    molecule: "Semaglutide",
    display: "Compounded semaglutide",
    compounded: true,
    form: "Subcutaneous injection, vial and syringes",
    cadence: "Once weekly",
    fromMonthly: 129,
    oneMonth: 149,
    threeMonth: 387,
  },
  {
    id: "tirzepatide",
    program: "metabolic",
    molecule: "Tirzepatide",
    display: "Compounded tirzepatide",
    compounded: true,
    form: "Subcutaneous injection, vial and syringes",
    cadence: "Once weekly",
    fromMonthly: 209,
    oneMonth: 239,
    threeMonth: 627,
  },
  {
    id: "nad",
    program: "longevity",
    molecule: "Nicotinamide adenine dinucleotide",
    display: "Compounded NAD+",
    compounded: true,
    form: "Subcutaneous injection, 5 mL vial",
    cadence: "One to three times weekly",
    fromMonthly: 99,
    oneMonth: 109,
    threeMonth: 297,
  },
  {
    id: "sermorelin",
    program: "longevity",
    molecule: "Sermorelin",
    display: "Compounded sermorelin",
    compounded: true,
    form: "Subcutaneous injection, 5 mL vial",
    cadence: "One to three times weekly",
    fromMonthly: 119,
    oneMonth: 134,
    threeMonth: 357,
  },
  {
    id: "glutathione",
    program: "longevity",
    molecule: "Glutathione",
    display: "Compounded glutathione",
    compounded: true,
    form: "Subcutaneous injection, 5 mL vial",
    cadence: "One to three times weekly",
    fromMonthly: 89,
    oneMonth: 99,
    threeMonth: 267,
  },
  {
    id: "mic-b12",
    program: "longevity",
    molecule: "Methionine, inositol, choline and methylcobalamin",
    display: "Compounded MIC + B12",
    compounded: true,
    form: "Intramuscular injection, 10 mL vial",
    cadence: "Once weekly",
    fromMonthly: 49,
    oneMonth: 55,
    threeMonth: 147,
  },
];

export const treatmentsIn = (program: ProgramId): Treatment[] =>
  treatments.filter((t) => t.program === program);

export const treatment = (id: string): Treatment => {
  const found = treatments.find((t) => t.id === id);
  if (!found) throw new Error(`Unknown treatment id: ${id}. Known: ${treatments.map((t) => t.id).join(", ")}`);
  return found;
};

/**
 * Brand-name products the affiliated clinicians may prescribe instead. Prices
 * are the pharmacy's, passed through without markup, which is why they are a
 * range rather than a number. Registered marks are mandatory on first and
 * prominent use, and Ellery is not affiliated with any of these
 * manufacturers — see the non-affiliation notice in the footer.
 */
export const brandOptions = [
  { display: "Wegovy®", molecule: "semaglutide", low: 499, high: 649 },
  { display: "Zepbound®", molecule: "tirzepatide", low: 1049, high: 1299 },
] as const;

/* ------------------------------------------------------------------ */
/* Titration — "the Ladder"                                            */
/* ------------------------------------------------------------------ */

export interface LadderStep {
  weeks: string;
  mg: number;
}

/**
 * The dose schedules the affiliated clinicians titrate along. Rendered as a
 * stepped chart rather than a list, because the magnitude of each step and
 * the order of the steps are both information the reader wants — a bulleted
 * list throws the magnitude away.
 *
 * These are the manufacturer-labelled escalation schedules for the molecule.
 * An individual clinician may hold, slow or stop at any step.
 */
export const ladders: Record<"semaglutide" | "tirzepatide", LadderStep[]> = {
  semaglutide: [
    { weeks: "Weeks 1–4", mg: 0.25 },
    { weeks: "Weeks 5–8", mg: 0.5 },
    { weeks: "Weeks 9–12", mg: 1.0 },
    { weeks: "Weeks 13–16", mg: 1.7 },
    { weeks: "Week 17+", mg: 2.4 },
  ],
  tirzepatide: [
    { weeks: "Weeks 1–4", mg: 2.5 },
    { weeks: "Weeks 5–8", mg: 5 },
    { weeks: "Weeks 9–12", mg: 7.5 },
    { weeks: "Weeks 13–16", mg: 10 },
    { weeks: "Weeks 17–20", mg: 12.5 },
    { weeks: "Week 21+", mg: 15 },
  ],
};

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */

/** `129` -> `"$129"`. Whole dollars only; nothing here has cents. */
export const usd = (amount: number): string =>
  `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

/** `129` -> `"$129/mo"`. */
export const usdMonthly = (amount: number): string => `${usd(amount)}/mo`;

/** `0.25` -> `"0.25 mg"`, `5` -> `"5 mg"` — no trailing zeros invented. */
export const mg = (dose: number): string => `${dose} mg`;

/** The three-month total expressed as its monthly equivalent. */
export const monthlyEquivalent = (t: Treatment): number => Math.round(t.threeMonth / 3);

/**
 * How many orders a year membership has to cover before it pays for itself.
 *
 * Membership waives the per-order administration fee and, for a buyer who
 * would otherwise have paid for overnight, the overnight charge too. So the
 * break-even depends on two things the buyer controls: whether they pay
 * yearly or monthly, and whether they actually wanted overnight.
 *
 * `best` is the friendliest case (yearly billing, overnight every time) and
 * `worst` the least (monthly billing, standard delivery). Quoting only `best`
 * halves the real threshold for the majority who take standard delivery, so
 * copy states the range.
 *
 * These are derived rather than written because five surfaces used to assert
 * "pays for itself above one order a quarter" — four orders a year — while
 * /pricing/ computed seven from these same constants. Everything that makes
 * the claim now calls this.
 */
export const membershipBreakEven = {
  /** Yearly billing, and you would have bought overnight anyway. */
  get best(): number {
    return Math.ceil(fees.membershipYearly / (fees.admin + shipping.overnightCost));
  },
  /** Monthly billing, standard delivery — only the admin fee is saved. */
  get worst(): number {
    return Math.ceil((fees.membershipMonthly * 12) / fees.admin);
  },
  /** Roughly one order every N weeks, at the best case. */
  get weeks(): number {
    return Math.round(52 / this.best);
  },
};

/** The friendliest break-even, for surfaces that have room for only one figure. */
export const membershipBreakEvenOrders = (): number => membershipBreakEven.best;

/** `"47 states and the District of Columbia"`. */
export const coverageLabel = (): string =>
  `${coverage.states} states${coverage.includesDC ? " and the District of Columbia" : ""}`;
