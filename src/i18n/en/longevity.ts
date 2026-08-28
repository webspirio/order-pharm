/**
 * The longevity program page.
 *
 * This is the page where a credible brand in this category is separated from a
 * grey-market one, and the separator is not design — it is epistemic honesty.
 * All four preparations are compounded, prescribed at an independent
 * clinician's discretion, and not FDA-approved for any specific indication.
 * Every competitor writes the first two sentences of a molecule's story ("what
 * it is", "what it is studied for") and stops exactly where it gets
 * uncomfortable. So the structural decision here is a third field on every
 * preparation — `limits`, where the evidence stops — given the same visual
 * weight as the price, and written to be unflattering wherever that is the
 * truth. It is the most important copy on this site.
 *
 * Consequences for the voice, which are absolute rather than stylistic:
 * - Hedge grammar only. "May support", "is studied for", "has been
 *   investigated for". Never "treats", "prevents", "reverses", "boosts",
 *   "restores", and no verb with an implied outcome smuggled into a noun.
 * - No figure is typed here. Prices, the sermorelin age floor, the count of
 *   preparations and the count of approved indications all come from
 *   `src/config/pricing.ts` via the component.
 * - The dark band states the claims this page refuses to make, and why. It is
 *   written as confidence, not as a legal notice: a business that can list the
 *   sentences it will not write is telling you something about the ones it
 *   will.
 */
const longevity = {
  header: {
    eyebrow: "Longevity",
    /** The page's thesis, and the whole argument for the `limits` field. */
    title: "Where the evidence stops,\nso does the sentence.",
    lead: "Four compounded preparations, prescribed at an independent clinician's discretion. None is FDA-approved for any specific indication, and none is described on this page by an outcome. What each one is, what the literature has actually investigated, and the point at which the honest answer becomes that nobody knows yet — all three, in that order, for all four.",
    imageAlt:
      "A grey-haired man carrying a hiking pack, stopped on a high path, looking across a misty limestone range.",
    /** The disclosure as the hero caption rather than as small print. */
    imageNote:
      "Prescribed at a clinician's discretion. Not FDA-approved for any specific indication.",
    figures: [
      { label: "Preparations", note: "coordinated in this program" },
      { label: "From", note: "monthly equivalent, medication at pharmacy cost" },
      { label: "Age floor", note: "sermorelin, applied before a clinician sees the file" },
      { label: "Approved indications", note: "across all four, in the United States" },
    ],
  },

  /**
   * The four preparations. `what` is mechanistic and plain, `studiedFor` is
   * hedged and names what was actually measured, `limits` is where the
   * evidence stops. Keys are treatment ids from `src/config/pricing.ts`, so a
   * preparation cannot appear here without a price or vice versa.
   */
  treatments: {
    eyebrow: "The four preparations",
    title: "What each one is, and where the case for it runs out",
    lead: "Every longevity page in this category writes the first two of these three fields. The third is the one that tells you whether the first two were written honestly.",
    labels: {
      what: "What it is",
      studiedFor: "Studied for",
      limits: "Where the evidence stops",
      molecule: "Molecule",
      form: "Form",
      cadence: "Cadence",
      oneMonth: "1 month",
      threeMonth: "3 months",
      monthlyEquivalent: "Monthly equivalent",
    },
    /** The argument against the bigger basket, next to the better price. */
    note: "Three months at once lowers the monthly equivalent. It also commits you to three months of something nobody can promise will do anything, so buy one month first and see whether you would have bought the second.",
    items: {
      nad: {
        what: "A coenzyme every cell uses to move electrons during energy metabolism, and the substrate the sirtuin and PARP enzymes consume when they regulate gene expression and repair DNA.",
        studiedFor:
          "Tissue availability of it falls with age in animal models, and raising that availability has been investigated in small human trials for effects on metabolic markers, muscle function and self-reported fatigue.",
        limits:
          "Almost all of the human data is on oral precursors — nicotinamide riboside and nicotinamide mononucleotide — rather than on this molecule, and none of it is on injection. Subcutaneous dosing is extrapolated from that precursor work, not established by it. The trials that do exist are small, short, and report blood chemistry rather than how anyone felt or functioned, and no clinical endpoint has been established for any route.",
      },
      sermorelin: {
        what: "A 29-amino-acid fragment of growth-hormone-releasing hormone, which binds the pituitary receptor and prompts the gland to release its own growth hormone in pulses.",
        studiedFor:
          "It has been investigated as a diagnostic agent for growth hormone deficiency and, historically, in children with growth failure; in adults it is studied for its effect on the pituitary's own secretion pattern and on the IGF-1 that follows.",
        limits:
          "It is a GHRH analogue, not HGH, and nothing about it should be read as HGH: it works only where the pituitary can still respond, and its ceiling is whatever that gland will do. Body-composition and sleep-quality data in otherwise healthy adults is thin — small studies, mostly unblinded, largely reporting hormone output rather than anything a patient would notice. The one approved US product containing it was withdrawn from the market, and there is no approved product for the use it is prescribed for here.",
      },
      glutathione: {
        what: "A tripeptide the liver makes continuously and the cell's principal water-soluble antioxidant, handing off electrons to neutralise reactive species and conjugating compounds so they can be excreted.",
        studiedFor:
          "It has been investigated in Parkinson's disease, in fatty liver disease, and in dermatology for effects on skin pigmentation, and is studied for markers of oxidative stress across a range of conditions.",
        limits:
          "Both halves of the case are contested. Taken orally it is largely broken down before it is absorbed; injected, it raises what is measurable in blood without established evidence that levels inside the tissue anyone cares about follow. The clinical trials are small and their endpoints inconsistent, and the dermatological work in particular is short, mostly conducted outside the US, and often funded by people selling it. There is no established dose and no approved indication.",
      },
      "mic-b12": {
        what: "Three lipotropic compounds — methionine, inositol and choline — which participate in fat transport and in methylation, combined with methylcobalamin, the active form of vitamin B12.",
        studiedFor:
          "B12 has been studied for decades and does correct a real deficiency, which is common on metformin, after bariatric surgery, and on a diet with no animal products. Choline is an essential nutrient with a defined daily intake requirement.",
        limits:
          "The weight-loss claim attached to this injection is the weakest thing on this page. There is no good human evidence that injected methionine, inositol and choline cause fat loss, and the combination has never been trialled as a combination. Correcting a B12 deficiency raises energy in someone who was deficient and does nothing measurable in someone who was not — which is a reason to have the level checked before buying, not after. It is the cheapest thing here, and that is the most honest argument for it.",
      },
    },
  },

  /**
   * The dark band. The claims this category makes that this page does not, and
   * the reason for each. Written as a two-column table because that is what it
   * is: a claim, and the specific thing wrong with it.
   */
  refuse: {
    eyebrow: "The line",
    title: "What we will not say",
    lead: "This category runs on sentences that cannot be supported. Here are the ones you will read elsewhere, and the exact reason each is absent here. Read it as the specification this page was written against rather than as a notice.",
    header: { claim: "The sentence you will read elsewhere", why: "Why it is not on this page" },
    rows: [
      {
        claim: "Reverses ageing",
        why: "Nothing here has been shown to change the rate at which anyone ages. Ageing is not an approvable indication, no trial on any of these four preparations used it as an endpoint, and a sentence with no endpoint behind it is decoration.",
      },
      {
        claim: "Lowers your biological age",
        why: "Biological-age scores are research instruments. Different ones disagree with each other on the same blood sample, none is validated as a target a treatment can be aimed at, and a number that moves is not the same as a person who is better off.",
      },
      {
        claim: "Fixes fatigue, brain fog and burnout",
        why: "Those are symptoms with dozens of causes, most of which an injection does not touch — thyroid, iron, sleep apnoea, depression, a medication you already take. The first move on any of them is to look for the cause, and the intake is written to look.",
      },
      {
        claim: "Made in an FDA-registered facility",
        why: "A pharmacy registers with the FDA; a drug gets approved by it. The two words are not synonyms, and using the first where a reader will hear the second is the most common piece of misdirection in this category. The pharmacies here are named, and what they can actually evidence is the release testing on your batch.",
      },
      {
        claim: "Clinically proven",
        why: "A citation or nothing. Where a study exists, this site says what it measured, in how many people, for how long. Where it does not, this site says that instead — which is why the third field on every preparation above exists.",
      },
      {
        claim: "The purest, the strongest, the most effective",
        why: "A superlative is a comparison, and a comparison needs a trial that ran both arms. None exists for any of these four against any other. Potency is not a marketing axis; it is a number on a certificate of analysis, and that ships with the vial.",
      },
    ],
    /** The concession. It belongs here, at the loudest point of the page. */
    concede:
      "None of this makes the four preparations above worth buying. It makes the description of them accurate, which is a smaller and more useful claim. If you want a guarantee, there is not one available anywhere in this category, and a site that offers you one is telling you what it thinks of you.",
  },

  gating: {
    eyebrow: "Eligibility and safety",
    title: "Usually it is not the molecule. It is what else you take.",
    lead: "A clinician licensed in your state decides whether any of this is appropriate, and may decide it is not. These are the rules that are applied before that decision and the ones that most often decide it.",
    ageGate: {
      label: "Minimum age, sermorelin",
      body: "Sermorelin is not offered below this age here or anywhere reputable in this category. In younger adults the pituitary's own output is already near its peak, so there is little to prompt, and raising IGF-1 — a growth signal — in a body that has recently finished growing carries risk without a benefit anyone has demonstrated. The intake applies the floor before a clinician ever opens the file.",
    },
    rulesTitle: "Not offered, in these circumstances",
    rules: [
      {
        rule: "Active cancer, or cancer treated recently",
        why: "Sermorelin raises growth hormone and therefore IGF-1, which is a proliferative signal. There is no good evidence it causes cancer and no good evidence it is safe alongside one, and the second of those is the sentence that matters. Clearance from your oncologist, not from a website.",
      },
      {
        rule: "Pregnancy, an attempt to conceive, or breastfeeding",
        why: "None of these four has safety data in pregnancy worth acting on. Absence of evidence is not reassurance, and this is one of the places where that distinction has consequences.",
      },
      {
        rule: "Untreated pituitary disease, or a known hypersensitivity",
        why: "A pituitary lesion changes what a GHRH analogue does, and a documented reaction to a preparation or one of its components is a hard stop rather than a dose adjustment.",
      },
      {
        rule: "A symptom that has not been worked up",
        why: "New fatigue, new weight change, new cognitive change: those need a diagnosis first. A clinician who prescribes over the top of an undiagnosed symptom has made your problem harder to find, and the review is meant to catch it, not to sell around it.",
      },
    ],
    interactions: {
      title: "The intake asks for every medication, and it means every one",
      body: "Interactions, not molecules, are what usually rule treatment out. The clearest illustration in this category is a compound Ellery does not coordinate at all: methylene blue, sold widely as a longevity product, inhibits monoamine oxidase and can precipitate serotonin syndrome in anyone taking an SSRI, an SNRI or a triptan. None of the four preparations above carries that particular interaction, and the discipline is identical anyway — a clinician cannot see a conflict you did not disclose, and the supplement you assumed did not count is the one that most often does.",
    },
    injection: {
      title: "You inject this yourself. Here is exactly what that involves.",
      lead: "No clinic visit, no infusion suite, no appointment. If the idea of a needle in your own hand is a problem, it is worth knowing that now rather than after the order.",
      steps: [
        {
          label: "What arrives",
          body: "A sealed vial from the named pharmacy that filled it, syringes matched to the dose written, alcohol swabs, a sharps container, and the preparation's own instructions with your name on the label. Cold-packed and tracked where the preparation requires it.",
        },
        {
          label: "What you do",
          body: "Swab the top of the vial, draw the dose on the label, and inject — into the fat of the abdomen or the outer thigh for the subcutaneous preparations, into the muscle of the outer thigh or upper arm for the intramuscular one. The needles are short and fine. Rotate the site every time.",
        },
        {
          label: "How often",
          body: "On the cadence printed on your label, which is the cadence listed against that preparation above, on days you choose. A clinician may change it, and may lower it before they raise it.",
        },
        {
          label: "What you never do",
          body: "You do not mix, dilute, reconstitute or split anything. The pharmacy dispenses it ready to draw. A vial that arrives cloudy, discoloured, frozen, or past its date goes back rather than into you — call the support line and it is handled between Ellery and the pharmacy, not by you.",
        },
      ],
    },
  },

  relay: {
    eyebrow: "The chain",
    title: "Who touches a longevity order",
    lead: "The same four handoffs and the same clock as every other order on this site. What differs is what the clinician is deciding: not a dose schedule, but whether a preparation with no approved indication is a reasonable thing for you to be taking at all.",
    cta: "The whole process, in detail",
  },

  faq: {
    eyebrow: "Questions",
    title: "The six this page owes you",
    cta: "Every question, on one page",
    items: [
      {
        q: "Is any of this FDA-approved?",
        a: "No, and nothing on this page should be read as saying otherwise. All four are compounded preparations, made by a state-licensed pharmacy against a prescription for one named patient under Section 503A or 503B, and the FDA does not review or approve compounded preparations for safety, effectiveness or quality. Nor has it approved any of these molecules for the uses they are prescribed for here. That is a fact about the category, not a detail specific to Ellery, and any site that leaves you unsure of it has left you unsure on purpose.",
      },
      {
        q: "Will this make me feel better?",
        a: "Nobody can tell you that, and anyone who does is guessing in front of you. What the intake and the review can establish is whether a clinician considers a given preparation reasonable for you, and what the evidence behind it actually consists of — which is set out above, including where it runs out. If the honest version of that is not enough to buy on, that is a legitimate conclusion and this page is not going to argue you out of it.",
      },
      {
        q: "Why does sermorelin have an age floor?",
        a: "Because in younger adults the pituitary's own growth hormone output is still near its peak, so there is little for a GHRH analogue to prompt, and because raising IGF-1 in a body that has recently finished growing carries a theoretical risk with no demonstrated benefit to weigh against it. The floor is applied by the intake before a clinician sees the file, so nobody is charged a review fee for an answer that was already known.",
      },
      {
        q: "Can I take more than one of them?",
        a: "A clinician may prescribe more than one and will often decline to. Each is a separate prescription, a separate pharmacy line and a separate reason to exist, and stacking four because a page listed four is how people end up spending a great deal on an effect nobody measured. If a clinician does prescribe two, ask which one they would stop first — the answer tells you which one they actually believe in.",
      },
      {
        q: "Do I need bloodwork first?",
        a: "Not to submit the intake. A clinician may ask for it before deciding, and for one of these there is a specific test genuinely worth having beforehand: a B12 level turns the question of whether that injection can do anything into a number rather than a hope. Ellery does not order, hold or interpret laboratory results — the affiliated clinical practice does, and you can upload results you already have.",
      },
      {
        q: "What happens if a clinician says no?",
        a: "The review fee is refunded in full, automatically, to the card you used, and you are told which part of the intake led to the decision. No prescription means no medication charge and no administration fee. This is not a rare outcome on this program, and the refund rule exists precisely so that a decline costs you nothing but the time the intake took.",
      },
    ],
  },
};

export default longevity;
