/**
 * The two program families, described once. Read by the header nav, the
 * homepage cards, both program pages, and `SeoHead.astro`'s
 * `hasOfferCatalog` — so the site's structured data and its visible copy
 * describe the same two things in the same words.
 *
 * `desc` is written to survive being read out of context by a search engine:
 * it names the molecules and it carries the conditional, because a
 * structured-data offer with an unconditional description is an offer of
 * medication.
 */
/**
 * The weight-related conditions that bring the lower BMI threshold into play.
 *
 * ONE record, because two existed and they disagreed: /weight-loss/ published
 * non-alcoholic fatty liver disease as qualifying while the intake gave no way
 * to declare it, and the intake collected PCOS and osteoarthritis which
 * /weight-loss/ never listed. Both pages claim to publish the same criterion,
 * so a reader could be told they qualify on one page and find no way to say so
 * on the next.
 *
 * Keyed rather than an array: `IntakeForm.tsx` stores answers by these ids, so
 * the key is a stable identifier and the value is the translatable label.
 * Adding one here means adding its id to `CONDITION_IDS` in that island.
 */
export const qualifyingConditions = {
  hypertension: "High blood pressure (hypertension)",
  type2: "Type 2 diabetes",
  prediabetes: "Prediabetes",
  dyslipidaemia: "High cholesterol or dyslipidaemia",
  apnoea: "Obstructive sleep apnoea",
  cardiovascular: "Cardiovascular disease",
  nafld: "Non-alcoholic fatty liver disease",
  pcos: "Polycystic ovary syndrome (PCOS)",
  osteoarthritis: "Osteoarthritis",
};

const programs = {
  eyebrow: "Programs",
  title: "Two programs",
  /** Re-exported on the dictionary so pages reach it as `d.programs.conditions`. */
  conditions: qualifyingConditions,
  lead: "Both run through the same four handoffs and the same fixed fee. What differs is the molecule and who a clinician will consider it for.",

  /**
   * The card's price row. It used to read "From $129/mo all in", which was
   * false: `fromMonthly` is the pharmacy's medication price and excludes both
   * fees. On a site whose pitch is that the receipt is itemised, an "all in"
   * that is not all in is the worst possible line to get wrong — so the label
   * now names what the figure is, and the fees ride underneath it.
   */
  price: {
    from: "From",
    unit: "medication",
    /** `{visit}` and `{admin}` are substituted from pricing.ts by Programs.astro. */
    fees: "Plus {visit} for the clinician review, refunded in full if you are not approved, and the fixed {admin} administration fee.",
  },

  /**
   * The label on the strip that carries `gating.long` under the two cards.
   * The sentence itself lives in `common.ts` and is never rewritten here —
   * this only names it, so the strip reads as a designed part of the section
   * rather than as small print that got left at the bottom.
   */
  priceCondition: "The condition on both prices",
  items: [
    {
      id: "metabolic",
      eyebrow: "Metabolic",
      title: "GLP-1 treatment for weight",
      desc: "Compounded semaglutide and compounded tirzepatide, coordinated between an independent licensed clinician and a US mail-order pharmacy. Brand-name Wegovy® or Zepbound® where a clinician prescribes them, at pharmacy cost. Prescription only if a licensed clinician decides it is appropriate.",
      /** Two or three lines shown on the card, under the description. */
      points: [
        "Once-weekly injection, titrated over four-week steps",
        "Brand-name alternatives quoted at pharmacy cost, never marked up",
        "Not everyone qualifies — the thresholds are published, not hinted at",
      ],
      cta: "See the metabolic program",
    },
    {
      id: "longevity",
      eyebrow: "Longevity",
      title: "Peptides and cellular support",
      desc: "Compounded NAD+, sermorelin, glutathione and MIC + B12, prescribed at a clinician's discretion. None is FDA-approved for a specific indication, and each is described here by what it is studied for rather than by an outcome. Prescription only if a licensed clinician decides it is appropriate.",
      points: [
        "One to three self-administered injections a week, clinician-titrated",
        "What the evidence supports, and where it stops, stated on the page",
        "Sermorelin is not offered under 30, anywhere in this category",
      ],
      cta: "See the longevity program",
    },
  ],
};

export default programs;
