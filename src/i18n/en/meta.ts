/**
 * <title> and <meta name="description"> for every route, in one place, so a
 * page cannot ship with a title borrowed from its neighbour.
 *
 * Titles: the distinctive part first, brand last, under ~60 characters where
 * possible. Descriptions: one sentence that says what the page is FOR, in the
 * site's voice, and never a keyword list. Where a description names a price it
 * names the condition too — a bare price in a SERP snippet reads as an offer of
 * medication, which is the one thing an administrator must not make.
 */
const meta = {
  home: {
    title: "Ellery Health — GLP-1 and longevity treatment, coordinated",
    description:
      "Ellery coordinates GLP-1 and longevity treatment between you, an independent licensed clinician, and a US mail-order pharmacy. Every fee, every handoff and every hour, published.",
  },
  weightLoss: {
    title: "Weight loss — compounded semaglutide and tirzepatide | Ellery",
    description:
      "Compounded semaglutide and tirzepatide, coordinated end to end, with the titration schedule and the itemised cost shown before you pay. Prescription only if a licensed clinician decides it is appropriate.",
  },
  longevity: {
    title: "Longevity — NAD+, sermorelin, glutathione, MIC + B12 | Ellery",
    description:
      "Compounded NAD+, sermorelin, glutathione and MIC + B12, with what each is studied for stated plainly and no outcome promised. Prescription only if a licensed clinician decides it is appropriate.",
  },
  howItWorks: {
    title: "How it works — the four handoffs, on the clock | Ellery",
    description:
      "Intake, independent clinician review, pharmacy dispatch, tracked delivery. Who does what, how long each step takes, and exactly where Ellery's role begins and ends.",
  },
  pricing: {
    title: "Pricing — every line item, and who it goes to | Ellery",
    description:
      "A fixed administration fee, medication at pharmacy cost with no markup, and the clinician review fee refunded if you are not approved. The whole receipt, before you start.",
  },
  start: {
    title: "Start your intake — about eight minutes | Ellery",
    description:
      "Answer a short health questionnaire so a clinician licensed in your state can review it. See the full itemised cost before any payment is requested.",
  },
  learn: {
    title: "Learn — straight answers on GLP-1s and peptides | Ellery",
    description:
      "What these medications do, what they cost without insurance, and what the evidence actually supports. Written plainly, reviewed by a licensed clinician, and not medical advice.",
  },
  faq: {
    title: "Questions — eligibility, cost, shipping, refunds | Ellery",
    description:
      "What Ellery is and is not, who decides whether you qualify, what happens if you are declined, how the pharmacies are chosen, and how your data is handled.",
  },
  contact: {
    title: "Contact — a person answers | Ellery",
    description:
      "Reach Ellery by phone or email, with published support hours. Clinical questions go to the affiliated practice, and dispensing questions go to the pharmacy — this page says which is which.",
  },
  terms: {
    title: "Terms of use | Ellery Health",
    description:
      "The agreement between you and Ellery Health, Inc., including what Ellery does and does not do, how fees work, and how disputes are handled.",
  },
  privacy: {
    title: "Privacy policy | Ellery Health",
    description:
      "What Ellery collects, what it passes to the affiliated clinical practice and the partner pharmacies, and where HIPAA applies and where state consumer health data law applies instead.",
  },
  notFound: {
    title: "Page not found | Ellery Health",
    description: "That page does not exist. The links below cover everything this site has.",
  },
  /** One entry per article under /learn/. Keys are the URL slugs. */
  articles: {
    "semaglutide-vs-tirzepatide": {
      title: "Semaglutide vs tirzepatide: how they actually differ | Ellery",
      description:
        "One drug acts on one receptor, the other on two. What that means for appetite, for side effects, for the dose schedule, and for what you pay.",
    },
    "glp-1-cost-without-insurance": {
      title: "GLP-1 cost without insurance: the 2026 numbers | Ellery",
      description:
        "What brand-name and compounded GLP-1s cost when you are paying cash, which fees sit on top, and the three questions that tell you whether a quoted price is the whole price.",
    },
    "nad-injections-explained": {
      title: "NAD+ injections, explained | Ellery",
      description:
        "What NAD+ does in a cell, why levels fall with age, what the human evidence supports so far, and what it does not. Studied for, not proven to.",
    },
  },
};

export default meta;
