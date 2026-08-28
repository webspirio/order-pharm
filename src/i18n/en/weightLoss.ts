/**
 * The metabolic program page (/weight-loss/).
 *
 * WHO IS READING THIS: an adult paying cash who has already priced Hims, Ro
 * and Found, has seen "starting at $X" three times, and cannot tell from any
 * of those pages what the second month costs, what dose they would be on, or
 * whether they would even be approved. So this page answers those three
 * questions in that order — the ladder, the price table, the thresholds — and
 * says plainly that not everyone qualifies before it asks for anything.
 *
 * WHY THE LADDER IS A CHART: the escalation schedule is a sequence of
 * magnitudes. A bulleted list preserves the sequence and throws the magnitude
 * away, which is why every competitor's dose "schedule" reads as reassurance
 * rather than information. Drawn to scale, it also makes the honest point for
 * free: the milligram figures for the two molecules are not comparable.
 *
 * NO FIGURE IS TYPED HERE. Prices, doses, week ranges, BMI thresholds, the
 * review window and the dispatch cutoff all come from `src/config/pricing.ts`
 * through `WeightLossPage.astro` and `Ladder.astro`.
 */
const weightLoss = {
  header: {
    eyebrow: "Metabolic",
    title: "The dose ladder, the price table, the thresholds.",
    lead: "Compounded semaglutide and compounded tirzepatide, coordinated between you, a clinician licensed in your state, and one of three named mail-order pharmacies. Everything a competitor puts behind an intake is on this page instead, including the part where a clinician says no.",
    ctaPrimary: "Start your intake",
    ctaSecondary: "See the full pricing",
    figuresLabel: "What this costs and how fast it moves",
    figures: [
      {
        label: "Lowest monthly equivalent",
        note: "compounded semaglutide, bought three months at a time, at the pharmacy's price",
      },
      { label: "Clinician review", note: "from submitted intake to a decision, not an average" },
      { label: "Dispatch cutoff", note: "approved before this and the pharmacy ships the same day" },
    ],
    imageAlt:
      "A man in dark running kit jogging along a gravel path between trees in yellow autumn leaf.",
  },

  /**
   * The ladder. `Ladder.astro` renders `ladders.semaglutide` and
   * `ladders.tirzepatide` from pricing.ts; these strings are the frame around
   * it. The lead is deliberately two sentences: what titration is, and who is
   * allowed to stop it.
   */
  ladder: {
    eyebrow: "Titration",
    title: "The ladder, drawn to scale",
    lead: "Titration means starting at a dose low enough to be tolerated and stepping up only once the step below it has been. A clinician may hold you at a step, move you back down, or stop below the top of the ladder — the highest dose is a ceiling, not a target, and most courses are not a straight climb.",
    stepsLabel: "steps",
    rangeLabel: "Range",
    axisLabel: "Dose per injection",
    captions: {
      semaglutide:
        "Acts on the GLP-1 receptor alone. Steps are held for weeks at a time, and a clinician will often keep someone at a middle step for as long as it is working.",
      tirzepatide:
        "Acts on two receptors, GLP-1 and GIP, which is why its milligram figures are not comparable with semaglutide's — a larger number here is not a stronger dose there. The ladder is longer, and stopping part-way up it is ordinary.",
    },
    caveat:
      "These are the manufacturer-labelled escalation schedules for each molecule, published so you can see the shape of a course before you begin one. A compounded preparation is dispensed against an individual prescription, and the dose, the interval and the stopping point are the prescribing clinician's decision. Ellery does not set them and cannot change them.",
    cta: "How the two molecules differ",
  },

  treatments: {
    eyebrow: "What it costs",
    title: "Two preparations, priced at one month and at three",
    lead: "The pharmacy sets these prices and Ellery passes the invoice through unchanged. The price is the same whichever step of the ladder you are on, because you are buying a preparation rather than a dose — which is also why moving up a step does not cost more.",
    header: {
      preparation: "Preparation",
      oneMonth: "One month",
      threeMonth: "Three months",
      equivalent: "Monthly equivalent",
    },
    hedgeLabel: "Before you buy three months",
    hedge:
      "If you are not sure you will stay on it, buy one month. The three-month price is only a saving if you finish the three months, and stopping early is common in this category.",
    feesLabel: "Charged on top of the medication, and itemised before payment",
    fees: [
      {
        label: "Clinician review",
        note: "paid to the affiliated practice, refunded in full if no prescription is issued",
      },
      {
        label: "Ellery administration",
        note: "fixed per order, never a share of what the medication costs",
      },
    ],
    note: "Neither of those two lines changes when your dose does, and neither is a percentage of anything. They are the same figures on the metabolic program as on the longevity one.",
    cta: "The whole receipt, line by line",
    ctaSecondary: "What GLP-1s cost without insurance",
  },

  brands: {
    eyebrow: "Brand-name alternatives",
    title: "The FDA-approved products, at pharmacy cost",
    lead: "The compounded preparations above are not FDA-approved. These two are, and a clinician may decide one of them is the right prescription for you instead of a compounded preparation. Ellery quotes what the pharmacy charges, with nothing added, which is why each one is a range rather than a price.",
    header: { product: "Product", cost: "Pharmacy cost, per month" },
    indication:
      "Each is approved for specific indications and labelled criteria, and a clinician may also prescribe a medication outside its labelled indication where they judge that appropriate. That decision, and the explanation for it, belongs to the clinician; Ellery neither suggests it nor arranges it.",
    candour:
      "For someone paying cash these cost several times the compounded route, and most people who read this page will choose the cheaper one. They are published anyway, because a page that quietly omits the FDA-approved option is not a transparent page.",
    note: "Ellery is not affiliated with, endorsed by or sponsored by either manufacturer, and no compounded preparation is a generic, an equivalent or a substitute for a branded product.",
  },

  eligibility: {
    eyebrow: "Eligibility",
    title: "Not everyone qualifies, and the line is published",
    lead: "A clinician licensed in your state makes this decision. These are the thresholds the affiliated practice applies, written here rather than discovered at the end of an intake.",
    thresholds: [
      {
        label: "Body mass index, on its own",
        note: "considered at or above this figure with no additional condition required",
      },
      {
        label: "Body mass index, with a condition",
        note: "considered at or above this figure where a weight-related condition is present",
      },
      { label: "Minimum age", note: "no exceptions, and age is the first thing verified" },
    ],
    countsTitle: "Conditions that count toward the lower threshold",
    /* The list itself is `d.programs.conditions` — see the note there. This
       page used to keep its own copy, and the two drifted. */
    rulesOutTitle: "Histories that rule this treatment out",
    rulesOut: [
      "A personal or family history of medullary thyroid carcinoma (MTC)",
      "Multiple endocrine neoplasia syndrome type 2 (MEN 2)",
      "Pregnancy, breastfeeding, or trying to conceive",
      "Active pancreatitis, or a previous episode of it",
      "A serious hypersensitivity reaction to semaglutide or tirzepatide",
      "Another GLP-1 medication already prescribed and in use",
    ],
    refundLabel: "Reviewed and declined",
    closing:
      "If you are below the lower threshold and have none of the conditions beside it, expect to be declined. We would rather write that here than collect a review fee and tell you afterwards — and if it happens anyway, that fee is refunded in full, automatically, to the card you used.",
  },

  safety: {
    eyebrow: "Safety",
    title: "Important safety information",
    lead: "In this category this is usually a link with a dead anchor at the bottom of a page. It is on the page instead. What follows is a summary rather than the full prescribing information, which is provided with every prescription and before you are asked to pay.",
    warningLabel: "Boxed warning — thyroid C-cell tumours",
    warning:
      "In rodent studies, semaglutide and tirzepatide caused thyroid C-cell tumours, including medullary thyroid carcinoma (MTC). It is not known whether either medication causes thyroid C-cell tumours, including MTC, in humans. Tell a clinician immediately about a lump or swelling in the neck, hoarseness, trouble swallowing, or shortness of breath.",
    contraindicationsTitle: "Do not take either medication if",
    contraindications: [
      "You or a family member has ever had medullary thyroid carcinoma (MTC), or you have multiple endocrine neoplasia syndrome type 2 (MEN 2).",
      "You have had a serious hypersensitivity reaction to semaglutide, to tirzepatide, or to any ingredient in the preparation.",
    ],
    urgentTitle: "Stop dosing and seek care the same day if",
    urgent: [
      "Severe abdominal pain, with or without vomiting, that goes through to your back — this can be pancreatitis.",
      "Pain in the upper right of the abdomen, fever, or yellowing of the eyes or skin — this can be the gallbladder.",
      "Shaking, sweating, confusion or a racing heart, particularly if you also take insulin or a sulfonylurea — this can be low blood sugar.",
      "A rash with swelling of the face, lips or tongue, or any difficulty breathing.",
    ],
    effectsTitle: "What people commonly report, and what to do about it",
    effectsHeader: { effect: "What you may feel", action: "What to do" },
    effects: [
      {
        effect: "Nausea in the days after a dose",
        action:
          "Smaller meals, less fat, no alcohol on dose day. Say so at review: holding a step is a normal clinical response, and a held step is not a failed course.",
      },
      {
        effect: "Constipation, or diarrhoea",
        action:
          "Fluids and fibre first. Either one persisting is worth a message, because dehydration is what turns a side effect into a kidney problem.",
      },
      {
        effect: "Vomiting you cannot stay ahead of",
        action:
          "Stop dosing and contact the practice the same day. Never take an extra dose to make up for one you brought back up.",
      },
      {
        effect: "Redness, itching or a small lump at the injection site",
        action: "Rotate sites. It usually settles within a day or two; if it spreads or weeps, get it looked at.",
      },
      {
        effect: "Appetite lower than you want it, and fatigue with it",
        action:
          "Eat to a schedule rather than to hunger, and keep protein up. Weight lost as muscle is not the outcome you are paying for.",
      },
    ],
    note: "Tell the reviewing clinician everything you already take, including insulin, sulfonylureas, oral contraceptives and thyroid medication. These medications slow the stomach, so what else you swallow and when matters as much as the dose does. They are not for use in pregnancy and are not a treatment for type 1 diabetes.",
  },

  faq: {
    eyebrow: "Questions",
    title: "The six that come up on this program",
    cta: "Every question we get asked",
    items: [
      {
        q: "Is compounded semaglutide the same thing as the branded product?",
        a: "It is the same molecule, prepared for one patient by a state-licensed pharmacy against a prescription, rather than manufactured and approved as a finished drug product. That difference is real and we will not soften it: the FDA does not review compounded preparations for safety, effectiveness or quality, and no compounded preparation is a generic or an equivalent of a branded one. What a licensed pharmacy can evidence instead is the release testing on your own batch — potency, sterility, endotoxins — and the certificate of analysis for that batch ships with the order.",
      },
      {
        q: "What happens if I cannot tolerate the next step?",
        a: "You tell the practice, and a clinician decides — hold you where you are, step you back down, change the interval, or stop. That is what titration is for. The pharmacy price follows the preparation rather than the dose, so a held or reduced step does not change what you pay, and Ellery's administration fee is the same figure either way.",
      },
      {
        q: "Can I switch from one molecule to the other?",
        a: "A clinician may decide to, and the intake asks what you have already taken so that conversation starts from the truth. A switch restarts titration at the bottom of the new molecule's ladder rather than matching your old milligram figure, because the two are not comparable. The new preparation's price applies from the order it appears on.",
      },
      {
        q: "Is there a video call, a scale, or a blood test?",
        a: "No video call. The intake is written and reviewed asynchronously by a clinician licensed in your state, and that is the whole consultation for most people. A clinician may ask for recent labs, for a follow-up answer, or for a reading you take at home before deciding, and may decline to prescribe without them.",
      },
      {
        q: "How much weight will I lose?",
        a: "We do not know, and a site that answers that question with a number is selling you something other than coordination. Published trials report averages across a population, achieved alongside changes to food and activity, and an average is not a forecast for one person. A clinician may also decide these medications are not appropriate for you at all.",
      },
      {
        q: "What happens when I stop?",
        a: "Appetite generally returns, and studies of people coming off GLP-1 medications report that a substantial share of the weight comes back. That is worth knowing before the first order rather than after the sixth: this is a treatment you either plan to continue, taper deliberately with a clinician, or replace with something else you can sustain. Nobody here will pressure you into any of the three.",
      },
    ],
  },
};

export default weightLoss;
