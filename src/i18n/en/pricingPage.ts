/**
 * /pricing/ — the page the whole site is positioned against.
 *
 * The category standard is "from $X*", where the asterisk resolves nowhere,
 * the $X is the cheapest dose of the cheapest preparation bought in the
 * largest quantity, and the two fees that turn it into the real number are
 * disclosed at checkout. Every structural decision here is a refusal of that:
 * the receipt is shown line by line WITH the reason each line is shaped the
 * way it is, every preparation is published at every supply length rather
 * than reduced to one "from" figure, the membership section prints the
 * arithmetic that argues against buying it, and there are two explicit lists
 * of what is not included and what will never be charged.
 *
 * NO FIGURE IS TYPED IN THIS FILE. Amounts, windows, cadences, thresholds and
 * the membership break-even all come from `src/config/pricing.ts` via
 * `PricingPage.astro`, which is the only way a pricing page and a ticker can
 * be guaranteed to agree. Where a sentence needs a number, it carries a token
 * (`{cutoff}`, `{orders}`) that the component substitutes — the same
 * mechanism `common.ticker` uses.
 */
const pricingPage = {
  header: {
    eyebrow: "Pricing",
    title: "The whole cost, in advance.",
    lead: "Three parties charge you, and only one of them is Ellery: a fixed administration fee per order, the pharmacy's own invoice passed through without a markup, and a clinician review fee that is refunded in full if no prescription is issued.",
    ctaSecondary: "See the four handoffs",
    /** Three figures under the lead. Values are supplied by the component. */
    figures: [
      { label: "Administration fee", note: "Fixed, per order. Never a share of the drug price." },
      { label: "Clinician review", note: "Refunded in full if no prescription is issued." },
      { label: "Medication", note: "The pharmacy's invoiced price, passed through unchanged." },
    ],
  },

  /**
   * The homepage shows these four lines and their destinations. Here each one
   * also has to justify its own shape, because "why is the fee fixed" is the
   * question a reader is actually asking and the answer is the business model.
   */
  receipt: {
    eyebrow: "The receipt",
    title: "Four lines, and the reason each one is shaped that way",
    lead: "This is the itemisation you approve before a card is charged, and the same itemisation on the invoice afterwards. Two of the four amounts are set by someone other than Ellery, which is why they are words here rather than figures.",
    header: { item: "Line", amount: "Amount", dest: "Paid to, and why it is that shape" },
    /** Writing "$0" for something included reads as a trick, and the pharmacy
        sets the other one, so both stay words. */
    atCost: "at cost",
    included: "included",
    totalLabel: "Added after you approve this",
    totalValue: "Nothing",
    rows: [
      {
        item: "Clinician review",
        dest: "The affiliated clinical practice, collected by Ellery as their agent.",
        why: "It pays a clinician licensed in your state to read the intake and decide. It is refunded in full if no prescription is issued, for two reasons: a review fee kept after a decline is a charge for nothing, and a fee that only stuck when the answer was yes would be a payment for a prescription rather than for a professional judgement.",
      },
      {
        item: "Medication, compounding and fulfilment",
        dest: "The partner pharmacy, at their invoiced price.",
        why: "The pharmacy sets this, not Ellery, which is why it is published per preparation and per supply length further down this page rather than as a single number. Ellery adds nothing to it, and the pharmacy's invoice is attached to your order so you can check the two against each other.",
      },
      {
        item: "Standard shipping",
        dest: "The carrier. Included on every order.",
        why: "A shipping line that appears at the last step of a checkout is the oldest trick in mail order, so there is not one. Overnight is a real upgrade with a published price, and it is included on membership; both are in the delivery table below.",
      },
      {
        item: "Ellery administration",
        dest: "Ellery. Fixed per order, billed separately.",
        why: "This is the only line Ellery is paid on, and it is the same amount whether the pharmacy invoice is the cheapest preparation on this page or the most expensive. It is never calculated as a share of the medication price: an administrator paid a percentage of the drug has a reason to prefer the expensive drug, and nobody in this chain should have that reason. It pays for the intake technology, order coordination, payment processing, records handling and the support line. It does not include, purchase or guarantee a prescription, a medical service or medication, and paying it does not mean a clinician will write one.",
      },
    ],
    note: "No enrolment fee, no consultation upsell, no charge for sending the practice a follow-up question, and nothing added after the line above.",
  },

  /**
   * Real per-supply prices for all six preparations. This is the section the
   * page exists for: publishing the whole grid, including the preparations
   * that cost the most, is the clearest premium signal available here, and it
   * is the opposite of a "from" price.
   */
  treatments: {
    eyebrow: "Per preparation",
    title: "Every preparation, at every supply length",
    lead: "Published as real per-supply prices rather than as one headline figure, because a headline figure is only ever true for the cheapest preparation at its starting dose and stops being true at the first titration step.",
    header: {
      name: "Preparation",
      cadence: "Cadence",
      one: "One month",
      three: "Three months",
      equiv: "Per month, on three",
    },
    programs: [
      {
        title: "Metabolic",
        note: "Compounded semaglutide and compounded tirzepatide are prepared by a state-licensed pharmacy, for one patient, against a prescription. Neither is FDA-approved, and a clinician may recommend an approved brand-name product instead.",
      },
      {
        title: "Longevity",
        note: "None of these is FDA-approved for any specific indication. Each is prescribed at a clinician's discretion, and each is described on this site by what it is studied for rather than by an outcome you should expect.",
      },
    ],
    supplyNote: "A three-month supply is one order, so the administration fee is charged once against it instead of three times, and the pharmacy's own per-supply price is lower. Both differences are in the table above; there is no third discount hiding behind a phone call.",
    brand: {
      title: "Brand-name alternatives",
      lead: "A clinician may decide an FDA-approved brand-name product is the better choice. Those are quoted here too, at the pharmacy's cash price, as a range — because the price moves with supply and with which of the three pharmacies holds it, and quoting the bottom of the range as though it were the price is the thing this page refuses to do.",
      header: { name: "Product", molecule: "Molecule", price: "Pharmacy price, per month" },
      note: "No compounded preparation is a generic, an equivalent or a substitute for any of these products, and Ellery is not affiliated with, endorsed by or sponsored by their manufacturers. The same fixed administration fee applies, and it does not rise because the medication does.",
    },
  },

  /**
   * The comparison table plus the arithmetic. `home.ts` sets the precedent
   * that membership is "often not worth it"; this section is obliged to prove
   * it, so the break-even is computed from `fees` and printed even though the
   * honest answer loses the sale most of the time.
   */
  membership: {
    eyebrow: "Membership",
    title: "Optional, and for most people not worth buying",
    lead: "Membership waives the administration fee and upgrades every order to overnight. It changes nothing clinical and it does not change what the pharmacy charges. Here is the whole comparison, and then the arithmetic that tells you whether to buy it.",
    monthlyLabel: "Billed monthly",
    yearlyLabel: "Billed yearly",
    yearlyNote: "Two months off the monthly price.",
    header: { row: "What you actually feel", payg: "Pay as you go", member: "Membership" },
    /** Cell words. Kept here so the table can say "the same" out loud where
        the honest answer is that membership changes nothing. */
    waived: "Waived",
    includedWord: "Included",
    atPharmacyCost: "At pharmacy cost",
    theSame: "The same",
    queueOrder: "In the order received",
    nothingToCancel: "Nothing to cancel",
    cancelAnyTime: "Any time, no fee",
    rows: [
      {
        label: "Administration fee, per order",
        gloss: "The only line Ellery is paid on, and the only one membership removes.",
      },
      {
        label: "Overnight shipping",
        gloss: "Standard delivery is included on every order either way, member or not.",
      },
      {
        label: "What the medication costs",
        gloss: "The pharmacy sets it and Ellery passes it through. Membership does not move it, and could not.",
      },
      {
        label: "Clinician review fee",
        gloss: "Charged by the practice per review, refunded in full if no prescription is issued.",
      },
      {
        label: "Position in the review queue",
        gloss: "Intakes are read in the order they arrive. Membership does not move you up it and is not permitted to — a queue you can pay to skip is a clinical decision with a price on it.",
      },
      {
        label: "Cancellation",
        gloss: "No fee, no phone call, no retention offer. It stops at the end of the period you have already paid for and nothing renews.",
      },
    ],
    /**
     * Computed in the component from `fees` and `shipping`, never typed. The
     * headline is the friendliest case for membership; the three cases under
     * it are the rest of the grid, because quoting only the friendliest case
     * is the move this page is written against.
     */
    breakEven: {
      title: "The break-even, worked out",
      unit: "orders a year",
      /** `{weeks}` is substituted by the component. */
      headlineNote: "That is the yearly plan, and it holds only if you would have paid for overnight delivery on every order — about one order every {weeks} weeks. The other three combinations need more.",
      cases: [
        "Billed monthly, overnight every time",
        "Billed yearly, standard delivery",
        "Billed monthly, standard delivery",
      ],
      verdict: "Most people on a three-month supply place four orders a year or fewer, which is below every number in this panel. If that is you, do not buy this — and nothing on this site will ask you a second time.",
    },
  },

  shipping: {
    eyebrow: "Delivery",
    title: "Three shipping lines, and the window each one commits to",
    lead: "Charged at what the carrier charges. The window starts when the pharmacy dispatches, not when you submit the intake, and everything before that is on the how-it-works page.",
    header: { option: "Option", cost: "Cost", window: "Window" },
    rows: [
      {
        option: "Standard",
        note: "Included on every order. Tracked, in plain packaging, cold-packed where the preparation requires it.",
      },
      {
        option: "Overnight",
        note: "Chosen per order, or included on membership.",
      },
      {
        option: "Alaska and Hawaii",
        note: "A surcharge on top of the option you choose, because the carriers charge more to those addresses. It is published here rather than added at checkout.",
      },
    ],
    /** `{cutoff}` is substituted by the component. */
    cutoffNote: "An order approved before {cutoff} is dispatched the same day. After it, the next business day.",
  },

  /**
   * The two boundary lists, on the page's dark band. On a fixed brand-800
   * ground because "you will never be charged for this" is the page's thesis
   * stated as a rule, and it should carry the same weight as the receipt.
   */
  boundaries: {
    eyebrow: "The boundaries",
    title: "What this does not cover, and what you will never be charged",
    lead: "The first list is what a fixed administration fee cannot buy. The second is a set of charges that do not exist here, written down so you can hold this page to them.",
    notIncluded: {
      title: "Not included",
      items: [
        "Insurance billing of any kind. This is self-pay only: neither Ellery nor the affiliated practice bills a commercial plan, and neither participates in Medicare, Medicaid or any other federal or state programme.",
        "Lab work. If a clinician wants blood work before deciding, you arrange it where you like and the price is the laboratory's, not Ellery's.",
        "Anything a clinician orders elsewhere — a referral, an in-person examination, imaging, or a prescription you fill at a retail pharmacy. Whoever provides it bills you for it.",
      ],
    },
    neverCharged: {
      title: "You will never be charged",
      items: [
        "A markup on medication. The pharmacy's invoice is passed through unchanged and attached to your order.",
        "A fee for being declined. The review fee is refunded in full, automatically, to the card you used.",
        "A cancellation fee — not on membership, and not on a repeat order that has not been dispatched.",
        "A charge that was not on the itemisation you approved. No enrolment fee, no restocking fee, no annual fee, and no line that only appears once you are inside.",
      ],
    },
  },

  eligibility: {
    eyebrow: "Before you pay",
    title: "The thresholds, so you can check yourself first",
    lead: "These are the criteria the affiliated practice applies. They are published here rather than discovered at the end of an intake, because a fee paid just before a decline is the single most common complaint in this category.",
    header: { criterion: "Criterion", threshold: "Threshold", note: "What it means" },
    rows: [
      {
        criterion: "Body mass index, on its own",
        note: "Calculated from the height and weight you enter, and shown back to you in the intake before anything is charged.",
      },
      {
        criterion: "Body mass index, with a weight-related condition",
        note: "High blood pressure, type 2 diabetes, obstructive sleep apnoea and dyslipidaemia are the usual ones. The intake asks; you do not need a diagnosis letter.",
      },
      {
        criterion: "Minimum age, any program",
        note: "Government-issued identification is checked before a prescription is transmitted to a pharmacy.",
      },
      {
        criterion: "Minimum age, compounded sermorelin",
        note: "Higher than the rest of the longevity program, and higher than the legal minimum. Nobody in this category offers it younger.",
      },
      {
        criterion: "Where the platform operates",
        note: "The first question in the intake is your state, and it answers this before anything else is asked or charged.",
      },
    ],
    note: "Meeting every threshold in this table is not approval. It is the point at which a clinician will consider the question, and they may still decide treatment is not appropriate for you.",
    asideLabel: "Before you start",
    faqLink: "Read the full question set",
  },
};

export default pricingPage;
