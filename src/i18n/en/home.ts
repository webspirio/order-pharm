/**
 * Homepage copy. This file sets the voice for the whole site — every other
 * page's module should read as though the same person wrote it.
 *
 * The thesis: every competitor in this category sells the outcome ("expert
 * care for a healthier, more confident you"). Ellery's actual product is
 * coordination, and the category's real anxiety is not "will it work" but
 * "what happens between paying and a box arriving". So the homepage sells the
 * chain, on the clock, in the open — and the regulatory constraint that
 * Ellery may not prescribe or dispense becomes the reason to trust it rather
 * than a disclaimer at the bottom.
 *
 * Figures are NOT written here. Anything numeric is imported from
 * `src/config/pricing.ts` by the component, so the hero, the stat strip, the
 * ticker and the pricing table can never quote different numbers — the exact
 * failure all three reference sites ship live.
 */
const home = {
  hero: {
    kicker: "Metabolic and longevity treatment, coordinated",
    /** The one line the page is remembered by. The Relay directly below it
        is the answer to the question it deliberately leaves open.
        `{accent}` marks the single word set in Fraunces italic — the site's
        whole budget for that face is one word per page, so the token is a
        contract, not a convenience. Headline.astro does the substitution. */
    title: "Nothing hidden\nin the {accent}.",
    titleAccent: "middle",
    subtitle:
      "Ellery sits between you, an independent licensed clinician, and a US mail-order pharmacy. We publish every fee, every handoff, and every hour it takes — including the ones that are not ours.",
    ctaPrimary: "Start your intake",
    ctaSecondary: "See what it costs",
    /** Sits under the buttons. Removes the two objections that stop a click. */
    note: "About {minutes} minutes. No appointment, and no payment until you have seen the whole cost.",
  },

  /**
   * THE THESIS. One paragraph between the hero and the programs, in the slot
   * the reference template gives its scroll-blur statement. It restates the
   * whole argument in the site's own voice, and the two phrases marked for
   * highlighting are the two claims the rest of the page then has to earn.
   */
  thesis: {
    body: "Three parties touch your order, and only one of them is Ellery. A clinician licensed in your state decides. A state-licensed pharmacy dispenses. Ellery runs the intake, moves the file and answers the phone — and publishes what every step costs and how long it has, including the steps it does not control.",
    /** Substrings of `body`, highlighted as the paragraph resolves. */
    highlights: ["only one of them is Ellery", "including the steps it does not control"],
  },

  /**
   * THE RELAY — the site's signature element. Four custody handoffs on one
   * tick-marked track. Rendered as a measurement scale rather than three
   * rounded cards, because the order of the steps and the time each one takes
   * are both information the reader came for, and a card grid throws the time
   * away.
   */
  relay: {
    eyebrow: "The chain",
    title: "Four handoffs. One clock.",
    lead: "Three licensed parties touch your order, and only one of them is Ellery. Here is what each does, and how long it has to do it.",
    /**
     * The accessible name of the custody rail. The rail's numerals live in
     * decorative chips that are hidden from assistive technology — the order
     * is carried by the `<ol>` itself — so the list needs a name of its own.
     */
    railLabel: "The four custody handoffs, in order",
    steps: [
      {
        actor: "You",
        action: "Intake",
        /** Duration strings come from `sla` in pricing.ts, not from here. */
        detail:
          "Twenty-four questions about your health, your goals and what you already take. No appointment, no video call, no phone tag.",
      },
      {
        actor: "Clinician",
        action: "Review",
        detail:
          "A clinician licensed in your state reads the intake and decides independently whether treatment is appropriate. Ellery is not in that decision and cannot influence it.",
      },
      {
        actor: "Pharmacy",
        action: "Dispatch",
        detail:
          "If a prescription is written, it goes to one of three named partner pharmacies, which compounds or fills it, labels it for you, and ships it.",
      },
      {
        actor: "Courier",
        action: "Delivered",
        detail:
          "Tracked from the pharmacy bench to your door, in plain packaging, cold-packed where the preparation requires it.",
      },
    ],
    cta: "The whole process, in detail",
  },

  /**
   * THE LEDGER — the four figures under the Relay.
   *
   * Values still come from pricing.ts; this file carries the name of each
   * figure and the one line saying what it means. `id` is the new part, and
   * it is a correctness fix rather than copy: StatStrip.astro used to zip
   * this array against a parallel array of constants BY POSITION, so moving
   * one entry here silently relabelled every number on the strip, with no
   * type error and nothing for `pnpm check` to catch. The component now looks
   * its constants up by id.
   */
  stats: {
    eyebrow: "Measured",
    title: "The four numbers the rest of the site has to match.",
    lead: "Every one appears again elsewhere on this site, and it is the same figure there. One that drifted between two pages would tell you more about this service than the copy does.",
    items: [
      { id: "states", label: "States and DC", note: "where the platform operates" },
      { id: "review", label: "Review window", note: "from submitted intake to a decision" },
      { id: "cutoff", label: "Dispatch cutoff", note: "approved before this ships the same day" },
      { id: "admin", label: "Administration fee", note: "fixed, per order, never a share of the drug" },
    ],
  },

  /**
   * WHO DOES WHAT — the disclosure table. Every competitor puts this in
   * §14 of the Terms. Putting it on the homepage as a designed table is the
   * single strongest differentiator available to a business whose only
   * product is coordination.
   */
  roles: {
    eyebrow: "Who does what",
    title: "Six jobs. Four parties. No overlap.",
    lead: "Corporate-practice rules mean an administrator cannot touch clinical decisions or dispensing. Rather than write that into the small print, here is the whole division of labour.",
    /**
     * `caption` is rendered `sr-only` inside the `<table>`. A screen reader
     * announcing "table with 2 columns and 7 rows" tells the listener nothing
     * about what the table asserts, and the heading above it is a separate
     * element it may never reach. The caption is the one place the table can
     * describe itself.
     */
    header: {
      task: "What happens",
      who: "Who does it",
      caption: "Each task involved in an order, and the party responsible for it.",
    },
    rows: [
      {
        task: "Decides whether treatment is appropriate for you",
        who: "A clinician licensed in your state, affiliated with an independent professional practice",
      },
      {
        task: "Writes the prescription and transmits it",
        who: "The same clinician, at their own discretion",
      },
      {
        task: "Compounds or fills it, labels it, ships it",
        who: "One of three named, state-licensed mail-order pharmacies",
      },
      {
        task: "Sets what the medication costs",
        who: "The pharmacy. Ellery passes the invoice through unchanged.",
      },
      {
        task: "Runs the intake, the payments, the tracking and the support line",
        who: "Ellery",
      },
      {
        task: "Practises medicine, dispenses medication, or leans on a clinical decision",
        who: "Nobody at Ellery. Not on a busy day, not on request.",
      },
    ],
    cta: "How the three parties are chosen",
  },

  /**
   * THE RECEIPT — pricing preview as an itemised bill with a destination
   * column. The category standard is one bundled price with an asterisk that
   * resolves nowhere. Showing where each dollar goes is both the honest form
   * and the reason the fixed-fee model is defensible.
   */
  receipt: {
    eyebrow: "What it costs",
    title: "One receipt. Four lines. Nothing after the total.",
    lead: "You see this itemised before you are asked for a card, and it is the same itemisation on the invoice afterwards.",
    header: {
      item: "Line",
      amount: "Amount",
      dest: "Paid to",
      caption: "Every line on an order, its amount, and who receives it.",
    },
    /** The two amounts that are words rather than figures. Writing "$0" for
        something included reads as a trick, and the pharmacy sets the other. */
    atCost: "at cost",
    included: "included",
    optionalLabel: "Optional",
    rows: [
      {
        item: "Clinician review",
        dest: "The affiliated clinical practice, collected by Ellery as their agent. Refunded in full if no prescription is issued.",
      },
      {
        item: "Medication, compounding and fulfilment",
        dest: "The partner pharmacy, at their invoiced price. Ellery adds nothing to it.",
      },
      {
        item: "Standard shipping",
        dest: "The carrier. Included on every order; overnight costs extra, or is free on membership.",
      },
      {
        item: "Ellery administration",
        dest: "Ellery. Fixed per order. Not a percentage, not per dose, not per prescription — and not charged at all unless a prescription is transmitted.",
      },
    ],
    /**
     * The optional membership, as a summary panel rather than a paragraph.
     *
     * Every label here names a row whose figure comes from `fees`,
     * `shipping` or `membershipBreakEven` — the panel states what it costs,
     * what it covers, and the threshold above which buying it stops being a
     * waste of money. The threshold is the closing figure on purpose: the
     * reference block this shape is taken from closes on "Total per month",
     * and on a page arguing that most readers should not buy this, a total is
     * the wrong ending.
     *
     * `{best}` and `{worst}` are substituted by Receipt.astro from
     * `membershipBreakEven`. `best` assumes yearly billing and overnight
     * every time; `worst` assumes monthly billing and standard delivery.
     * Quoting only `best` halves the real threshold for the majority who take
     * standard delivery, which is why the range is stated and `body` says
     * which end is which.
     */
    membership: {
      title: "Membership is optional, and often not worth it",
      costsLabel: "What it costs",
      monthly: "Billed monthly",
      yearly: "Billed yearly",
      coversLabel: "What it covers, per order",
      adminFee: "Administration fee",
      overnight: "Overnight shipping",
      breakEvenLabel: "Pays for itself above",
      breakEvenUnit: "orders a year",
      body: "The lower figure assumes yearly billing and overnight delivery every time. Billed monthly, on standard delivery, it is the higher one. Below that, do not buy it — and nothing on this site will ask you twice.",
    },
    cta: "Full pricing, including dose tiers",
  },

  /**
   * QUALITY — the per-batch release panel. Almost nobody in this category
   * publishes lab work, and it is the most direct available answer to the
   * compounded-pharmacy trust gap.
   */
  quality: {
    eyebrow: "Quality",
    title: "The lab work, not the adjective",
    lead: "Compounded preparations are not FDA-approved, and no amount of design should be allowed to obscure that. What a pharmacy can show you instead is the release testing on the batch your vial came from.",
    header: { test: "Test", standard: "Standard", result: "Result" },
    note: "Every order ships with the certificate of analysis for its own batch. Ask for a prior batch's and you get it.",
    pharmaciesTitle: "Who fills it",
    pharmaciesNote: "One of three, chosen by which holds the preparation in stock and which is closest to you. You are told which one before the order is placed, and it is on the invoice afterwards.",
  },

  /**
   * Testimonials without photographs, on purpose. The Unsplash and Pexels
   * licences both forbid using a depicted person in a way that implies
   * endorsement, and attaching a written quotation to a stranger's face does
   * exactly that. Every block in the reference library is built on avatars;
   * none of them survives that licence, so Voices.astro identifies a speaker
   * by name, state and context and by nothing else.
   *
   * `feature` marks the one quotation the section is really built around, and
   * it is set here rather than derived from array position: the middle
   * quotation earns the larger card because it is from someone who was
   * DECLINED, which is the only place on the site where the refund rule is
   * evidenced rather than promised. Reorder these and the emphasis follows
   * the meaning instead of following the index. Every item carries the flag,
   * including the false ones, so the array keeps a single element type.
   *
   * No figure appears inside a quotation anywhere here. A number written into
   * a quote cannot be imported from pricing.ts and cannot be corrected when
   * the fee changes — it would be a hand-typed price hiding inside quotation
   * marks, which is the one drift this site is built to prevent. The third
   * quotation makes its point about the fee being FIXED, which is the part
   * that is actually the differentiator.
   */
  voices: {
    eyebrow: "Patients",
    title: "What people actually mention",
    lead: "Not the weight. In a category where the medication is the same molecule everywhere, what people remember is whether anyone was accountable for the middle.",
    items: [
      {
        quote:
          "I have used two of these services before. This is the first one where I could tell you, on any given day, who had my file.",
        name: "Dana R.",
        location: "Ohio",
        context: "Metabolic · 7 months",
        feature: false,
      },
      {
        quote:
          "The part I did not expect: the review fee came back the same week the clinician said no. No email chain, no form to fill in.",
        name: "Marcus T.",
        location: "Arizona",
        context: "Reviewed, not approved",
        feature: true,
      },
      {
        quote:
          "The same administration fee every order, with the pharmacy invoice attached underneath it. I stopped double-checking the maths after month three.",
        name: "Priya N.",
        location: "New Jersey",
        context: "Longevity · 11 months",
        feature: false,
      },
    ],
    disclosure:
      "Written for this demonstration rather than collected from patients, and labelled as such wherever it appears.",
  },

  learn: {
    eyebrow: "Learn",
    title: "Straight answers, before you need them",
    lead: "Written plainly, reviewed by a licensed clinician, and clearly labelled as information rather than medical advice.",
    cta: "All articles",
    readTime: "min read",
  },

  faq: {
    eyebrow: "Questions",
    /**
     * "The six that come up first" until the rebuild, which put a hand-typed
     * count in the one sentence nothing derives it from: adding a seventh item
     * below would have left the heading quietly lying about the list under it.
     * The count is visible in the list; the heading no longer duplicates it.
     */
    title: "The ones that come up first",
    cta: "Every question we get asked",
    items: [
      {
        q: "Is Ellery a pharmacy?",
        a: "No, and it is not a medical practice either. Ellery builds and runs the intake, moves your information to the right party, handles payment, tracks the order and answers the phone. The clinical decision belongs to an independently licensed clinician, and the medication is dispensed by a state-licensed pharmacy. Neither works for Ellery.",
      },
      {
        q: "Then who decides whether I qualify?",
        a: "A clinician licensed in your state, affiliated with an independent professional practice. They read your intake, they may ask follow-up questions, and they decide. Ellery cannot see a way to influence that decision, because there is not one — the thresholds they apply are published on the pricing page so you can check yourself against them first.",
      },
      {
        q: "What happens if I am not approved?",
        a: "The review fee is refunded in full, automatically, to the card you used. You are not charged for the medication, because no prescription was written. You will be told which part of the intake led to the decision, and whether a different program might be reviewed instead.",
      },
      {
        q: "Is the medication FDA-approved?",
        a: "The compounded preparations are not. They are made by a state-licensed pharmacy against a prescription for one person, under Section 503A or 503B, and the FDA does not review or approve them for safety, effectiveness or quality. FDA-approved brand-name products exist for semaglutide and tirzepatide, a clinician may recommend one instead, and their pharmacy price is published on the metabolic program page rather than hidden behind a call.",
      },
      {
        q: "How can the administration fee be the whole fee?",
        a: "Because it is the only thing Ellery sells. The clinician bills for the review, the pharmacy bills for the medication and the fulfilment, and Ellery bills a fixed amount per order for the coordination. Ellery does not mark the medication up, and it is not paid more when a more expensive drug is prescribed — which is also the arrangement the rules require.",
      },
      {
        q: "Is this available where I live?",
        a: "In most places, but not everywhere, and we would rather say so here than at checkout. The first question in the intake is your state, and it will tell you immediately if the platform is not yet operating there. Nothing else is asked, and nothing is charged, if the answer is no.",
      },
    ],
  },
};

export default home;
