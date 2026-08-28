/**
 * The complete question set, for /faq/.
 *
 * WHY GROUPS RATHER THAN ONE LIST: twenty-seven disclosures in a single
 * column is an archive, not an answer. Grouped by the decision the reader is
 * actually making — is this legitimate, will I qualify, what is in the vial,
 * what will it cost, when does it arrive, how do I stop, who has my data,
 * what if something goes wrong — a visitor can find their own question
 * without reading anyone else's.
 *
 * WHY THE HOMEPAGE'S SIX ARE IMPORTED, NOT RETYPED: the six on the homepage
 * are the six that come up first, and their answers are final. Retyping them
 * here would create exactly the failure this site is built against — two
 * copies of one promise, drifting apart on separate edits. They are pulled
 * from `home.faq.items` and spliced into the group each belongs to, so the
 * homepage and /faq/ cannot disagree about the refund rule or about what
 * Ellery is.
 *
 * FIGURES: none are typed here. `{token}` placeholders are substituted in
 * `FaqPage.astro` from `src/config/pricing.ts`, the same mechanism the trust
 * ticker uses, and an unknown token is a build error rather than a literal
 * brace shipped to a reader.
 *
 * ANSWER LENGTH is two to five sentences, and every answer is allowed to end
 * in "no". The awkward ones are the reason a page like this earns trust:
 * declined intakes, the guarantee that does not exist, insurance that cannot
 * be used, a compounded preparation that is not a brand-name drug, a pharmacy
 * that ships late, and who actually holds the clinical record.
 */
import home from "./home";

/**
 * The six from the homepage, in the order `home.faq.items` declares them.
 * Named so the groups below read as prose rather than as index arithmetic.
 */
const [
  isPharmacy,
  whoDecides,
  notApproved,
  fdaApproved,
  wholeFee,
  whereIlive,
] = home.faq.items;

const faq = {
  header: {
    eyebrow: "Questions",
    title: "The whole list, including the awkward ones.",
    lead: "Grouped so you can find yours, and written to be complete rather than reassuring. Where the answer is no, it says no. Where it depends on a clinician, it says which one, and where it belongs to the pharmacy it says that too.",
    /** Labels for the mono figure row under the lead. Values are computed. */
    figures: {
      questions: "Questions answered here",
      review: "Clinician review window",
      refund: "Refunded if you are not approved",
    },
    /** Sits under the figure row, above the fold, with the symbols resolved
        in the compliance band at the foot of the page. */
    note: "Nothing on this page is medical advice, and none of it replaces the safety information that comes with a prescription.",
  },

  /**
   * The dark band between the header and the long pale question set. Four
   * sentences that do not change whichever group you land in, so a reader who
   * scrolls no further still leaves with the load-bearing ones.
   */
  fixed: {
    eyebrow: "Before you scroll",
    title: "Four answers that never change",
    items: [
      {
        symbols: "*",
        term: "Ellery is not a pharmacy and not a medical practice.",
        def: "It runs the intake, the payments, the tracking and the support line. The clinical decision belongs to an independently licensed clinician and the medication belongs to a state-licensed pharmacy, and neither of them works for Ellery.",
      },
      {
        symbols: "",
        term: "No prescription is guaranteed.",
        def: "A clinician licensed in your state reviews your intake and decides independently whether treatment is appropriate. They may decide it is not, and when that happens the review fee is refunded in full.",
      },
      {
        symbols: "‡‖",
        term: "Compounded preparations are not FDA-approved.",
        def: "They are made by a licensed pharmacy for one patient against one prescription, and the FDA does not review them for safety, effectiveness or quality. No compounded preparation is a generic of, an equivalent to, or a substitute for a branded product.",
      },
      {
        symbols: "†",
        term: "Ellery's fee is fixed and never a share of the drug.",
        def: "It is the same amount whether a clinician prescribes the cheapest preparation on the list or the most expensive, and the pharmacy's invoice is passed through unchanged. Ellery earns nothing extra from a bigger order.",
      },
    ],
  },

  /** The sticky group index at lg and up. */
  nav: {
    label: "Question groups",
    heading: "The groups",
    countLabel: "questions",
    helpTitle: "Not in the list",
    helpBody: "Call and ask. A person answers, and if the question is clinical they will tell you who to send it to instead of guessing at it.",
    helpCta: "Contact and hours",
  },

  groups: [
    {
      id: "what-ellery-is",
      title: "What Ellery is",
      lead: "The separation between the three parties is the product. It is worth understanding before anything else on this page makes sense.",
      items: [
        isPharmacy,
        {
          q: "Then what is Ellery responsible for, exactly?",
          a: "Four things: the intake, the money, the tracking and the phone. Ellery builds the questionnaire and transmits it to a clinician licensed in your state, collects payment and passes the pharmacy's invoice through unchanged, tells you where the order is, and answers when you call. Everything clinical belongs to the affiliated practice and everything inside the vial belongs to the pharmacy. If something goes wrong inside those four jobs it is Ellery's to fix, and if it goes wrong outside them Ellery's job is to tell you plainly whose it is.",
        },
        {
          q: "Who are the clinicians and the pharmacies? Are they named?",
          a: "Yes — before you pay, and again on the invoice. Reviews are done by clinicians licensed in your state and affiliated with {practice}, an independent professional entity. Prescriptions are dispensed by one of three named, state-licensed mail-order pharmacies — {pharmacies} — chosen by which is licensed to ship to your state, which holds the preparation, and which is closest to you. A service that will not name the parties handling your prescription is asking for more trust than it has earned.",
        },
      ],
    },

    {
      id: "eligibility",
      title: "Eligibility and the review",
      lead: "Not everyone qualifies, and the thresholds are published rather than discovered at checkout.",
      items: [
        whoDecides,
        whereIlive,
        {
          q: "Does paying the review fee guarantee a prescription?",
          a: "No. The fee pays for a licensed clinician to read your intake and decide, and a decision that could only go one way would not be a clinical decision at all. Some intakes are approved, some come back with follow-up questions, some are approved for something other than what was asked for, and some are declined. If the answer is no, the review fee is refunded in full and nothing is charged for medication, because none was prescribed.",
        },
        notApproved,
        {
          q: "Can I appeal, or ask a different clinician to look again?",
          a: "You can add information and ask for another review — a lab result, a corrected weight, a medication you forgot to list. What you cannot do is buy a different answer, and Ellery has no mechanism for asking a clinician to revisit a decision on a patient's behalf. A second review is a new review by the practice, and it may reach the same conclusion. If the first review went wrong because Ellery mishandled your intake, the correction costs you nothing.",
        },
      ],
    },

    {
      id: "medication",
      title: "Medication and compounding",
      lead: "The honest answer to “is this real medication” is not an adjective. It is a licence, a prescription and a release panel.",
      items: [
        fdaApproved,
        {
          q: "Is compounded semaglutide the same as Ozempic®?",
          a: "No, and the comparison is the wrong way round. Ozempic® is a specific FDA-approved product, made by its manufacturer to an approved formulation and sold under that name. A compounded preparation is made by a licensed pharmacy for one patient against one prescription, and it is not a generic of, an equivalent to, or a substitute for any branded product — they may share a molecule and that is where the sameness stops. Anyone marketing a compounded preparation as “generic Ozempic®” is describing something that does not legally exist.",
        },
        {
          q: "Who compounds it, and can I choose the pharmacy?",
          a: "One of the three, and no. The pharmacy is chosen by licence, stock and transit distance, because those are what decide whether a cold-packed preparation arrives in good condition — it is a logistics decision rather than a preference. You are told which pharmacy has your order before it is placed, and it is named on the invoice afterwards. If you have a reason to avoid a particular facility, say so on the phone and you will be told honestly whether the order can be placed at all.",
        },
        {
          q: "How do I know what is actually in the vial?",
          a: "Ask for the certificate of analysis, and one ships with every order in any case. It is the release panel for the batch your own vial came from — potency, sterility, bacterial endotoxins, pH and appearance, each against a named USP chapter — signed by the pharmacy that made it. A prior batch's certificate is available on request from the pharmacy named on your invoice. That is what a compounding pharmacy can actually evidence, and it is a better answer than the word “premium”.",
        },
      ],
    },

    {
      id: "cost",
      title: "Cost, refunds and membership",
      lead: "Four lines on the receipt, and a membership this page will talk you out of if you do not order often.",
      items: [
        wholeFee,
        {
          q: "Can I use insurance, Medicare, Medicaid or an HSA card?",
          a: "This is self-pay only. Neither Ellery, the affiliated practice nor the partner pharmacies bill insurance, and none of them participates in Medicare, Medicaid, TRICARE or any other federal or state health care programme — so nothing here is submitted to a plan, and nothing here can be reimbursed through one on your behalf. An HSA or FSA card usually works at checkout because it runs as an ordinary card, but whether a given charge is an eligible expense is between you and your plan administrator. Every order produces an itemised receipt, which is the document a plan administrator will ask you for.",
        },
        {
          q: "When am I charged, and what gets refunded?",
          a: "The review fee is charged when you submit the intake, and refunded in full if no prescription is issued. The medication and the administration fee are charged when a prescription is transmitted to the pharmacy, and you see the itemised total before either is taken. Once a preparation has been compounded and labelled for you it cannot be returned or resold, so that part is not refundable — that is a pharmacy law constraint rather than a policy choice. If Ellery fails at one of its own four jobs, the administration fee for that order comes back without your having to ask for it.",
        },
        {
          q: "Is membership worth it?",
          a: "Often not, and we would rather say so here than sell it twice. It waives the administration fee and upgrades shipping to overnight, which pays for itself if you order more than once a quarter and loses you money if you do not. Buy it after your second order rather than before your first. There is no cancellation fee and no retention call.",
        },
      ],
    },

    {
      id: "shipping",
      title: "Shipping and tracking",
      lead: "The part of the chain Ellery does not control, and what happens on the days it slips.",
      items: [
        {
          q: "How long does delivery take, and what does shipping cost?",
          a: "Standard shipping is included on every order and arrives in {standardDays} once the pharmacy dispatches; orders approved before {cutoff} dispatch the same day, and after that on the next business day. Overnight costs extra, or is included with membership. Alaska, Hawaii and the US territories take {remoteDays} and carry a carrier surcharge, shown as its own line rather than averaged into everyone else's price. Every amount is on the pricing page before you are asked for a card.",
        },
        {
          q: "What happens if the pharmacy ships late?",
          a: "You hear it from Ellery rather than from a tracking page that has stopped moving. If a dispatch is going to miss the published cutoff we tell you the same day, say why, and pass on the pharmacy's own revised date instead of a guess. The administration fee for that order is refunded, and if the delay risks a gap in a titration schedule the practice is told, so a clinician can decide what to do about it. What Ellery cannot do is make an independent pharmacy work faster, and claiming otherwise would be the comfortable answer rather than the true one.",
        },
        {
          q: "Is the packaging discreet, and does anything need refrigeration?",
          a: "Plain outer packaging, no drug name and no clinical branding on the outside, shipped to you by the pharmacy rather than by Ellery. Preparations that require cold chain travel cold-packed with a temperature indicator, and the label tells you what to do on arrival. If a package turns up warm, damaged, or after a long wait on a doorstep, do not use it — call the pharmacy named on the invoice, because the replacement decision is theirs to make and not ours.",
        },
      ],
    },

    {
      id: "refills",
      title: "Refills, changes and stopping",
      lead: "A refill is an order, not a subscription, and stopping takes one sentence.",
      items: [
        {
          q: "How do refills work?",
          a: "When your supply is running down you get a message in your account thread. You confirm, and the refill goes to the pharmacy against the prescription already on file. Nothing ships automatically and no card is charged without a confirmation from you. If the prescription has no refills left, the practice reviews again before anything is dispensed.",
        },
        {
          q: "Can my dose be changed?",
          a: "Only by a clinician, and only through the practice. Send a message in your account thread describing what is happening — that thread reaches the practice, not Ellery's support desk — and a clinician decides whether to hold, step up, step down or stop. Ellery's staff cannot change a dose, cannot ask for one to be changed, and will not relay a request as though it were a clinical opinion.",
        },
        {
          q: "How do I stop?",
          a: "Say so once, to anyone here. There is no cancellation fee, no minimum term and no retention call, and membership, if you have it, ends at the close of the period you have already paid for. Stopping a GLP-1 is a clinical matter as well as a billing one, so tell the practice too: appetite and some of the weight commonly return, and a clinician can tell you what to expect. Your records stay available to you afterwards, for the period the privacy policy states.",
        },
      ],
    },

    {
      id: "privacy",
      title: "Data, privacy and records",
      lead: "Three parties hold three different records about you. This is which, and how to get each one.",
      items: [
        {
          q: "Can Ellery see or influence my clinical notes?",
          a: "Ellery can see the intake as you submitted it, because Ellery built the form and transmits it. The clinical record — the assessment, the reasoning, the notes a clinician writes — belongs to the practice, and Ellery holds parts of it only as their business associate, under a contract that permits access for support and record-keeping and for nothing else. Every such access is logged. Ellery cannot write in that record, cannot edit it, and has no route for asking a clinician to reach a different conclusion: there is no flag, no queue and no button for it, which is the point.",
        },
        {
          q: "How do I get a copy of my records, and from whom?",
          a: "It depends which record, and you will be told which party has it rather than sent in a circle. Ellery gives you the intake as submitted, your orders, your invoices and your support history — ask by phone or email. The clinical record comes from {practice} in writing, with identity verification, within the period state law allows them. The dispensing record and the certificate of analysis come from the pharmacy named on the invoice.",
        },
        {
          q: "Is my information covered by HIPAA, and is any of it sold?",
          a: "Partly, and no. The affiliated practice and the partner pharmacies are covered entities under HIPAA, and Ellery acts as their business associate where that applies; the information you give Ellery directly, before any clinician sees it, is governed by state consumer health data law instead, and the privacy policy sets out which is which line by line. None of it is sold, and none of it is used for advertising — there are no third-party advertising or analytics tags on the pages where you answer health questions. If that ever changes it will change in the privacy policy first, and be announced rather than discovered.",
        },
      ],
    },

    {
      id: "safety",
      title: "Safety and emergencies",
      lead: "The one part of this site that is not asynchronous.",
      items: [
        {
          q: "What should I do in an emergency?",
          a: "Call 911, or go to the nearest emergency room. Do not use the account thread and do not wait for the support line to open: neither is monitored for emergencies, and a message queue is the wrong tool for chest pain, breathing difficulty, a severe allergic reaction or thoughts of self-harm. Tell the practice afterwards, so the clinician who has your file knows what happened.",
        },
        {
          q: "What if I have a side effect?",
          a: "Message the practice through your account thread, and call 911 first if it is severe. GLP-1 medications carry real risks, including a risk of thyroid C-cell tumours, and they are not for anyone with a personal or family history of medullary thyroid carcinoma or multiple endocrine neoplasia syndrome type 2 — that is in the safety information you are given before you are asked to pay, and it is worth reading rather than clicking past. Nausea, reflux and constipation are common early on and often settle; anything sudden, severe or unexpected is a reason to stop and ask rather than to wait and see. A problem with a specific batch can also be reported to the pharmacy on your invoice and to the FDA directly.",
        },
      ],
    },
  ],
};

export default faq;
