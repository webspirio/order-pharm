/**
 * /how-it-works/ — the page the whole site's thesis points at, and therefore
 * the most thorough one.
 *
 * The homepage asserts that the chain is published; this page is where the
 * assertion has to survive contact with detail. So it is built around one
 * move nobody else in the category makes: every handoff carries a FAILURE
 * row. What goes wrong, who pays for it, and who tells you. An intake that
 * needs clarifying, a clinician who declines, a pharmacy without stock, a
 * parcel that arrives warm — each has a published consequence here, because a
 * process page that only describes the good day is a brochure.
 *
 * Two other sections earn their length. The 503A/503B explainer, because
 * "FDA-registered" is the most-abused phrase in compounding and the honest
 * reading of it is a competitive advantage; and the data band, which states
 * plainly that Ellery is not a covered entity rather than printing "HIPAA
 * compliant" over a page whose Terms say otherwise.
 *
 * Figures are NOT written here. Every duration, threshold, fee and shipping
 * window is imported from `src/config/pricing.ts` by the component, and the
 * named parties come from `partners` in the same file.
 */
const howItWorks = {
  header: {
    eyebrow: "The chain",
    /**
     * `{accent}` is the page's one Fraunces word, substituted by
     * `Headline.astro`. It sits on "fails" deliberately: the failure row is
     * what this page has that no competitor's process page has, and the
     * accent should land on the claim rather than on a noun.
     */
    title: "Four handoffs, and what happens when one {accent}.",
    titleAccent: "fails",
    lead: "Three licensed parties touch an order, and only one of them is Ellery. This is the long version: what each party does, how long it has to do it, what you get at the end of it, and — the part nobody in this category publishes — what happens on the days it does not go to plan.",
    clockLabel: "The clock, end to end",
    clockNote: "None of these is an average. Each one is the ceiling the party is held to, and it is the same figure the ticker at the top of this page quotes, read from the same file.",
  },

  /**
   * The four handoffs in depth. Field order per item is deliberate — what,
   * who, how long, what you receive, then the failure — so the reader meets
   * the accountable party before the promise.
   */
  steps: {
    eyebrow: "Step by step",
    title: "Every handoff, in depth.",
    lead: "Four subsections, one per party. The last block in each is the one to read: what goes wrong at that step, what it costs you, and who tells you it happened.",
    /**
     * The accessible name of the custody rail these four steps hang on. The
     * numerals in the rail's chips are decorative and hidden; the order is
     * carried by the `<ol>`, so the list needs a name.
     */
    railLabel: "The four custody handoffs, in order",
    labels: {
      what: "What happens",
      who: "Who does it",
      takes: "How long it takes",
      receive: "What you receive",
      risk: "What can go wrong",
      then: "What happens then",
    },
    items: [
      {
        actor: "You",
        action: "Intake",
        what: "You answer a health questionnaire in one sitting: your state first, then your history, what you already take, what you have tried before, and what you are trying to change. It saves as you go, so a broken train of thought does not cost you the form. No appointment, no video call, no phone tag.",
        who: "You, on your own. Ellery built the form and holds the answers. It does not score them, and it cannot approve anything.",
        takesNote: "One sitting, and you can leave and come back. The clock on the next step does not start until you submit.",
        receive: "A written copy of everything you submitted, and the full itemised cost of what you are asking for — before a card is requested.",
        failure: {
          trigger: "Something in the intake is incomplete, or contradicts something else in it.",
          response:
            "You get one clarifying question rather than a refusal. The clock stops while that question is with you and starts again when you answer, so a slow reply cannot be counted against the review window. The second look is not charged for twice.",
        },
      },
      {
        actor: "Clinician",
        action: "Review",
        what: "A clinician licensed in your state reads the intake against the thresholds the practice publishes and decides independently whether treatment is appropriate. If it is, they choose the molecule, the starting dose and the titration schedule, and write the prescription.",
        who: "An independent clinician affiliated with {practice} — not employed by Ellery, not paid more for approving you, and not reachable by anyone at Ellery to reconsider a decision.",
        takesNote: "A ceiling rather than an average, running from the moment you submit. If the window is going to be missed you are told before it is missed, not after.",
        receive: "The decision in writing, with the reason for it. If a prescription is written you see the molecule, the dose, the schedule and the pharmacy before the order is placed.",
        failure: {
          trigger: "The clinician decides treatment is not appropriate for you.",
          response:
            "The review fee is refunded in full, automatically, to the card you used — not as credit, and with no form to fill in. No prescription is written, so nothing is charged for medication. You are told which part of the intake led to the decision, and whether a different program can be reviewed instead.",
        },
      },
      {
        actor: "Pharmacy",
        action: "Dispatch",
        what: "The prescription is transmitted to one of three named, state-licensed pharmacies. It compounds or fills the preparation, labels it for you by name, packs it with the certificate of analysis for its own batch, and hands it to the carrier.",
        who: "The pharmacy, under its own state licence and its own pharmacist-in-charge. Ellery does not touch a vial and does not set the price; the pharmacy's invoice is passed through unchanged.",
        takesNote: "Same day, if the prescription is approved before the cutoff on a business day. That cutoff is the pharmacy's own, published below, and it is not a marketing figure.",
        receive: "A dispatch email naming the pharmacy, the batch, the tracking number, and the invoice exactly as the pharmacy issued it.",
        failure: {
          trigger: "The chosen pharmacy does not hold the preparation in stock.",
          response:
            "The prescription is routed to one of the other two named pharmacies, and you are told which one and why before it ships — routing an order somewhere else quietly is how a two-day wait becomes a nine-day one. If none of the three can fill it, the order is cancelled and nothing is charged for medication.",
        },
      },
      {
        actor: "Courier",
        action: "Delivered",
        what: "The carrier moves the parcel from the pharmacy's bench to your door, tracked the whole way, in plain packaging with nothing clinical printed on the outside. Anything that needs refrigeration travels cold-packed, with a temperature indicator inside.",
        who: "The carrier. Ellery watches the tracking and calls you if it stops moving. The pharmacy is the only party that can reship.",
        takesNote: "In transit, after dispatch. Alaska and Hawaii run slower, and that window is published below rather than averaged into this one.",
        receive: "The tracking number when the label is printed, an alert when the parcel is out for delivery, and a delivery confirmation.",
        failure: {
          trigger: "The parcel is late, damaged, or arrives warm.",
          response:
            "Call the support line and do not use the preparation. Ellery opens the carrier claim the same day and asks the pharmacy for a replacement. Whether the preparation is still fit to use is the pharmacist's decision — Ellery does not make it, guess at it, or talk you into it.",
        },
      },
    ],
    /** The media column for step one: figures instead of a photograph. */
    intake: {
      label: "What the intake checks",
      rows: [
        { label: "Where the platform operates" },
        { label: "Body mass index, on its own" },
        { label: "With a related condition" },
        { label: "Minimum age" },
        { label: "Minimum age, sermorelin" },
      ],
      note: "These are the thresholds the affiliated practice applies, and the intake computes them live so nothing is a surprise at checkout. Meeting one is not approval. A clinician still decides, and may decide no.",
    },
    resolutionLabels: {
      clock: "Clock",
      refunded: "Refunded",
      extra: "Extra cost to you",
      support: "Support line",
    },
    clockPaused: "Paused",
    noChange: "No change",
    images: {
      clinician:
        "A woman sitting at home with a laptop open in front of her, a clinician in a headset on the screen.",
      clinicianCaption:
        "Illustrative. The review here is asynchronous: no appointment, no video call. What the clinician reads is the intake you wrote.",
      pharmacy:
        "Two hands laying protective kraft paper into an open white shipping box on a bench.",
      courier: "A pair of hands holding a plain, unmarked kraft cardboard box.",
    },
  },

  parties: {
    eyebrow: "The parties",
    title: "Three parties, named, with the registration each one holds.",
    lead: "A quality claim from an unnamed facility evidences nothing. So the practice is named, the three pharmacies are named, and the classification each pharmacy works under is stated — along with what that classification does and does not mean.",
    practice: {
      label: "The clinical practice",
      role: "The independent professional entity the reviewing clinicians are affiliated with. It sets the thresholds an intake is measured against, it stands behind the licence each clinician holds in your state, and it bills for the review. Ellery collects that fee as its agent and refunds it in full when no prescription is issued.",
      note: "No clinician who reviews an intake is employed by Ellery, and none is paid more for approving one.",
    },
    pharmaciesLabel: "The pharmacies",
    header: { name: "Pharmacy", kind: "Registration", state: "State" },
    sections: [
      {
        term: "Section 503A",
        title: "Patient-specific compounding",
        body: "A pharmacy compounding a preparation for one identified patient, against a prescription with that patient's name on it. It is licensed and inspected by its state board of pharmacy. It may not make batches in advance to hold as stock — which is also why a 503A pharmacy sometimes cannot fill an order today.",
      },
      {
        term: "Section 503B",
        title: "An outsourcing facility",
        body: "A facility that registers with the FDA, may compound in batches without a patient-specific prescription, and is inspected by the FDA against current good manufacturing practice (cGMP) — the standard a manufacturer is held to. It is usually the one of the three that can fill an order the others cannot.",
      },
    ],
    notFdaTitle: "Neither of them is FDA approval",
    notFda: "Registration is a status a facility holds. Approval is a review of one specific drug. The FDA does not review or approve compounded preparations for safety, effectiveness or quality, and anyone who offers you “FDA-registered” as if it meant the medicine is approved is either mistaken or selling something.",
    choiceLabel: "How one of the three is chosen",
    choiceLead: "The clinician writes the prescription. The routing is administrative, so Ellery does it, and three things decide it — in this order.",
    choices: [
      {
        title: "Which one holds the preparation",
        body: "Stock first. A pharmacy with it on the shelf today beats one that would compound it on Thursday.",
      },
      {
        title: "Which registration the preparation needs",
        body: "A preparation made to a batch standard goes to the outsourcing facility. A patient-specific formulation goes to a 503A pharmacy.",
      },
      {
        title: "Which one is closest to you",
        body: "Between two that can both fill it, the shorter lane wins. Fewer hours in transit matters most for anything that ships cold.",
      },
    ],
    choiceNote: "You are told which pharmacy before the order is placed, it is named in the dispatch email, and it is on the invoice afterwards. If you would rather it went to one of the other two, say so — and if that pharmacy can fill it, that is where it goes.",
  },

  shipping: {
    eyebrow: "Shipping and tracking",
    title: "The lane, the window, and the two places it costs more.",
    lead: "Shipping is the part of the chain Ellery controls least, so it is published the way the carrier actually charges it, including the lanes that are slower and the ones that cost more.",
    header: { option: "Option", cost: "Cost", window: "Window", note: "Notes" },
    rows: [
      { option: "Standard", note: "On every order, including the first. Not a promotion, and not withdrawn later." },
      { option: "Overnight", note: "Charged per order, or included on membership." },
      {
        option: "Alaska and Hawaii",
        note: "Carriers charge more on these lanes. The surcharge is passed through at cost and the window is genuinely longer.",
      },
    ],
    included: "Included",
    details: [
      {
        label: "Dispatch cutoff",
        body: "A prescription approved before this, on a business day, leaves the pharmacy the same day. Approved after it, the next business day. Weekends and public holidays are not dispatch days at any of the three pharmacies, and nothing on this site will imply otherwise.",
      },
      {
        label: "Cold chain",
        body: "Preparations that need refrigeration ship in an insulated mailer with gel packs and a temperature indicator, timed so a box is not sitting in a depot over a weekend. If the indicator has tripped, do not use the vial. Call, and the pharmacist decides whether it is still fit to use.",
      },
      {
        label: "Packaging",
        body: "A plain outer box. No pharmacy branding, no clinical wording, nothing on the outside that says what is inside. The label with your name on it is on the vial, inside the box.",
      },
      {
        label: "The tracking number",
        body: "The carrier's own, emailed the moment the pharmacy prints the label rather than when you pay — a number that does not scan yet is worse than no number. It arrives alongside the pharmacy's name and the invoice.",
      },
    ],
    notShipping: "Ellery does not ship anything and cannot reship anything. The dispatch belongs to the pharmacy, the parcel belongs to the carrier, and replacing a preparation is the pharmacist's decision. What Ellery does is watch the tracking, open the claim, and tell you what it hears.",
  },

  refills: {
    eyebrow: "Refills and re-evaluation",
    title: "A refill is a second look, not a subscription.",
    lead: "Nothing here renews itself quietly. A prescription written through this platform runs for one course, that course has a ceiling, and when it ends a clinician looks again before anything else is dispensed.",
    maxLabel: "Longest one prescription runs",
    maxNote: "Never open-ended, and often shorter — the clinician sets the length within that ceiling. A prior approval is not a standing authorisation to keep shipping.",
    header: { event: "What changes", consequence: "What has to happen" },
    rows: [
      {
        event: "You are due a refill",
        consequence:
          "A clinician reviews the file again, including what you report about how the first course went. Nothing dispenses on the strength of the first decision alone.",
      },
      {
        event: "The dose changes",
        consequence:
          "A new prescription, and a new label. The titration schedule belongs to the clinician; they may hold you at a step, or move you back down one.",
      },
      {
        event: "You report a side effect",
        consequence:
          "The review reopens before anything else ships. Depending on what you report you may be told to stop, and Ellery is not the party that makes that call.",
      },
      {
        event: "There is a gap in treatment",
        consequence:
          "Restarting usually means going back down the ladder to a tolerated dose rather than resuming where you stopped. That is slower, and it costs more than staying on schedule.",
      },
      {
        event: "You want to stop",
        consequence:
          "One action. Say so on the phone, or reply to any order email, and the next refill is cancelled.",
      },
    ],
    stopTitle: "Stopping is one action, and it is not made hard",
    stopBody: "No retention flow, no cancellation queue, no offer engineered to hold you for one more month. You are not asked why, though you can say if you want the clinician to know. Anything already dispatched cannot be recalled — a prescription that has left the pharmacy is yours.",
    concession: "And the argument against starting today: if you already know the next few months are unpredictable — travel, a move, a stretch where a weekly injection is not realistic — waiting is the cheaper decision. A course begun and abandoned halfway costs the whole course and leaves you back at the first dose.",
  },

  data: {
    eyebrow: "Your data",
    title: "Where HIPAA applies, and where it does not.",
    lead: "Ellery Health, Inc. is not a covered entity under HIPAA. The affiliated practice and the partner pharmacies are, and Ellery acts as their business associate where that applies. Printing “HIPAA compliant” across a marketing page and then denying covered-entity status in the Terms is common in this category. Both sentences cannot be true at once, so here is the actual arrangement, row by row.",
    header: { what: "What moves", who: "Where it goes", law: "Under which law" },
    rows: [
      {
        what: "Your intake answers, your state, your age",
        who: "The clinician reviewing it, at the affiliated practice",
        law: "HIPAA. The practice is the covered entity; Ellery handles this as its business associate, under a written agreement.",
      },
      {
        what: "The prescription, your name, your delivery address",
        who: "The one pharmacy that fills it",
        law: "HIPAA. The pharmacy is a covered entity in its own right and keeps its own record.",
      },
      {
        what: "Your name, address and phone number",
        who: "The carrier",
        law: "Not health information. A carrier is given an address and a parcel, never a diagnosis or a drug name.",
      },
      {
        what: "Your card details",
        who: "The payment processor",
        law: "Card-industry rules. Ellery is shown the last four digits and an authorisation, and never holds a card number.",
      },
      {
        what: "Anything you type on this site before an intake exists",
        who: "Ellery",
        law: "State consumer health data law, not HIPAA — a real regime with real duties, and a different one. The privacy policy names which applies to what.",
      },
    ],
    notTitle: "And what does not move",
    notItems: [
      "Your intake answers are not sold, and they are not rented.",
      "They are not used to target advertising, here or anywhere else, and there is no advertising pixel on the intake.",
      "They do not go to an employer, an insurer or a credit bureau.",
      "They are not used to train a model.",
    ],
    cta: "Read the privacy policy",
  },

  isNot: {
    eyebrow: "In plain terms",
    title: "What Ellery is, and what it is not.",
    lead: "The same division of labour the rest of this page describes, compressed to two columns. Nothing in the left column is a clinical act, and nothing in the right one is available for purchase.",
    isTitle: "Ellery does",
    isItems: [
      "Build and run the intake, and hold your answers under a written agreement with the practice.",
      "Move your information to a clinician licensed in your state, and a prescription to the pharmacy.",
      "Take payment, itemise it, and pass the pharmacy invoice through unchanged.",
      "Watch the tracking, open the carrier claim, and answer the phone when a parcel stops moving.",
    ],
    isNotTitle: "Ellery does not",
    isNotItems: [
      "Practise medicine, or employ the clinicians who review intakes.",
      "Decide whether you qualify, or ask a clinician to look at a decision again.",
      "Compound, dispense, label or ship anything.",
      "Set what the medication costs, or earn more when a more expensive one is prescribed.",
    ],
    close: "That split is not a disclaimer at the bottom of the page. It is the reason a fixed administration fee can be the whole of what Ellery charges, and the reason the clinical decision in the middle is worth anything at all.",
    ctaPricing: "The whole receipt, line by line",
    ctaStart: "Or start the intake",
  },
};

export default howItWorks;
