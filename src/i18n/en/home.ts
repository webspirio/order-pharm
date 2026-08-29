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

  /** Four figures under the Relay. Values come from pricing.ts. */
  stats: {
    label: "The numbers this runs on",
    items: [
      { label: "States and DC", note: "where the platform operates" },
      { label: "Review window", note: "from submitted intake to a decision" },
      { label: "Dispatch cutoff", note: "approved before this ships the same day" },
      { label: "Administration fee", note: "fixed, per order, never a share of the drug" },
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
    header: { task: "What happens", who: "Who does it" },
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
    header: { item: "Line", amount: "Amount", dest: "Paid to" },
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
    membership: {
      title: "Membership is optional, and often not worth it",
      /**
       * `{orders}` is substituted by Receipt.astro from
       * `membershipBreakEvenOrders()`, the same function /pricing/ calls. This
       * sentence used to say "more than once a quarter" — four orders a year —
       * while /pricing/ computed seven from the same constants.
       */
      body: "Membership waives the administration fee and upgrades shipping to overnight. It is worth buying only above about {best} orders a year, and only if you would have paid for overnight every time — on standard delivery the figure is nearer {worst}. Below that, do not buy it, and nothing on this site will ask you twice.",
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
   * exactly that. A mono monogram is also simply more honest on a demo.
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
      },
      {
        quote:
          "The part I did not expect: the review fee came back the same week the clinician said no. No email chain, no form to fill in.",
        name: "Marcus T.",
        location: "Arizona",
        context: "Reviewed, not approved",
      },
      {
        quote:
          "Twenty-five dollars an order, with the pharmacy invoice attached. I stopped double-checking the maths after month three.",
        name: "Priya N.",
        location: "New Jersey",
        context: "Longevity · 11 months",
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
    title: "The six that come up first",
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
