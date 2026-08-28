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
const programs = {
  title: "Two programs",
  lead: "Both run through the same four handoffs and the same fixed fee. What differs is the molecule and who a clinician will consider it for.",
  items: [
    {
      id: "metabolic",
      eyebrow: "Metabolic",
      title: "GLP-1 treatment for weight",
      desc: "Compounded semaglutide and compounded tirzepatide, coordinated between an independent licensed clinician and a US mail-order pharmacy. Brand-name Wegovy® or Zepbound® where a clinician prescribes them, at pharmacy cost. Prescription only if a clinician decides it is appropriate.",
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
      desc: "Compounded NAD+, sermorelin, glutathione and MIC + B12, prescribed at a clinician's discretion. None is FDA-approved for a specific indication, and each is described here by what it is studied for rather than by an outcome. Prescription only if a clinician decides it is appropriate.",
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
