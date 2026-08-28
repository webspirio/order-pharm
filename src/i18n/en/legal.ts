/**
 * The two legal documents: /terms/ and /privacy/.
 *
 * WHY THESE ARE WRITTEN THE WAY THEY ARE. In this category the Terms are
 * where the truth is kept — "we are not a pharmacy", "no clinician-patient
 * relationship is formed", "the fee is not a share of the drug price" all
 * live in §14 of a document nobody opens, set in a grey 13px wall. This site
 * puts those statements on the homepage instead, which leaves these two
 * documents with a different job: to be the complete, checkable version of
 * the same claims, in the same voice, readable end to end.
 *
 * So: no all-caps blocks (the arbitration clause is a designed panel in plain
 * sentences, which is conspicuous in a way capitals stopped being years ago),
 * no defined-term soup, sentence-case headings, and the privacy policy leads
 * with the disclosure almost nobody in this category makes — that HIPAA does
 * not cover Ellery, and which data therefore sits under which regime.
 *
 * FIGURES AND NAMES ARE TOKENS, NOT TEXT. Every `{token}` below is
 * substituted by `LegalPage.astro` from `src/config/pricing.ts` and
 * `src/config/site.ts`, and rendered in the mono figure face where it is a
 * number. A fee quoted in a legal document that disagrees with the fee on the
 * pricing table is the worst version of the drift this site is built to
 * avoid, so it is made impossible here rather than checked by hand.
 *
 * The `{n_*}` tokens are footnote references. They resolve to the eight
 * symbols defined in `common.ts` and are answered by the compliance band at
 * the foot of every page.
 *
 * DEMONSTRATION TEXT. Coherent, internally consistent, and not in force —
 * the banner at the top of both pages says so, and carries the ◇ note.
 */
const legal = {
  /** The one status banner each document carries, at the top, designed. */
  notice: {
    label: "Demonstration document",
    title: "Example text, for an example company.",
    body: "{legalName} is a demonstration entity. This document is written to be internally consistent, to match every figure and every claim elsewhere on this site, and to show how a coordination business of this shape should describe itself. It is not legal advice, it is not a template to adopt, and it is not in force. Counsel admitted in the relevant states must review and replace it before this site takes a real order.{n_demo}",
  },

  tocLabel: "On this page",
  tocMobileLabel: "Jump to a section",
  effectiveLabel: "Effective",
  sectionLabel: "Section",
  effectiveNote:
    "This version took effect on {effective} and replaces every earlier version of it. Earlier versions are available on request.",
  relatedLabel: "Elsewhere on this site",

  terms: {
    eyebrow: "Legal",
    title: "Terms of use",
    lead: "The agreement between you and {legalName}: what Ellery does, what it is not permitted to do, what it charges and who receives each charge, and what happens when something goes wrong. Written to be read rather than to be survived.",
    sections: [
      {
        id: "parties",
        heading: "Who this agreement is with",
        blocks: [
          {
            text: "These terms are an agreement between you and {legalName}, a United States corporation with its registered office at {office} — “Ellery”, “we”, “us”. They apply every time you use this site, submit an intake, place an order, hold a subscription, or contact support.\n\nTwo other parties touch every order, and neither is a party to this agreement. Clinical services are provided by independent clinicians licensed in your state and affiliated with {practice}, an independent professional entity. Dispensing is performed by the independent, state-licensed pharmacies named in section seven. Each of them has its own terms, its own notice of privacy practices and its own professional obligations, and each is given to you at the point it becomes relevant to your order.\n\nBy continuing to use this site you accept these terms. If you do not accept them, do not submit an intake.",
          },
        ],
      },
      {
        id: "what-ellery-does",
        heading: "What Ellery is, and what it is not",
        symbols: ["*"],
        blocks: [
          {
            text: "Ellery is a technology and administration company. It is not a medical practice, not a clinic and not a pharmacy. It does not employ, direct or supervise the clinicians who review intakes, and it does not own, operate or control any pharmacy.\n\nWhat Ellery provides is administrative and management services. This is the complete list of them:",
          },
          {
            items: [
              "Intake technology — the questionnaire, the eligibility logic, and the secure transmission of your answers to a clinician licensed in your state.",
              "Order coordination — routing an issued prescription to a pharmacy that holds the preparation, and following the order until the carrier marks it delivered.",
              "Payment processing — collecting one itemised payment through a third-party processor, on behalf of each party entitled to a line of it.",
              "Records handling — storing, retrieving and transmitting records on behalf of the practice and the pharmacies, as their business associate where HIPAA applies.{n_hipaa}",
              "Customer support — a published phone number and inbox, staffed by Ellery employees who are not clinicians and will not answer a clinical question.",
              "Tracking — order status, dispatch confirmation and carrier tracking, in one place, for both you and the parties handling your order.",
            ],
          },
          {
            text: "Nothing in that list is the practice of medicine or the practice of pharmacy, and nothing on this site should be read as either. Using this site does not create a clinician-patient relationship with Ellery, because Ellery has no clinicians to form one with.\n\nEllery does not control, direct or interfere with the practice of medicine or with dispensing. It does not decide whether you are treated, what you are prescribed, at what dose, or on what schedule; it cannot overrule a clinician's decision or ask for one to be reconsidered on commercial grounds; and it cannot instruct a pharmacy about a preparation. Each clinician and each pharmacy is solely responsible for the care or the service they provide, and answerable for it to their own licensing board.\n\nEllery is paid the same fixed amount whichever way a review goes, which is what makes that division of labour something you can check rather than something you have to take on trust.{n_fee}",
          },
        ],
      },
      {
        id: "fees",
        heading: "Fees, and who receives each one",
        symbols: ["†"],
        blocks: [
          {
            text: "You see the whole itemisation before you are asked for a card, and the same itemisation appears on the receipt afterwards. There is no line after the total.",
          },
          {
            table: {
              label: "Every charge that can arise on an order",
              head: ["Line", "Amount", "Who receives it", "Refundable"],
              rows: [
                [
                  "Clinician review",
                  "{visit}",
                  "{practice}, collected by Ellery as their agent",
                  "In full, automatically, if no prescription is issued",
                ],
                [
                  "Medication, compounding and fulfilment",
                  "The pharmacy's invoiced price",
                  "The dispensing pharmacy, collected by Ellery as its agent",
                  "Not once a preparation has been dispensed",
                ],
                [
                  "Standard shipping",
                  "Included",
                  "The carrier",
                  "Not charged, so not refunded",
                ],
                [
                  "Ellery administration",
                  "{admin}",
                  "Ellery",
                  "Not charged unless a prescription is transmitted",
                ],
              ],
              note: "Overnight shipping costs {overnight} and is included with membership. Alaska and Hawaii carry a {remote} carrier surcharge, because the carrier charges it and Ellery does not absorb or mark up carrier costs.",
            },
          },
          {
            text: "The administration fee is fixed, charged once per order, and billed as its own line. It does not include, purchase or guarantee a prescription, a medical service or medication, and it is never calculated as a share of what the medication costs.{n_fee} Ellery does not mark the pharmacy invoice up, and is not paid more when a more expensive preparation is prescribed.\n\nEllery collects the review fee as agent for {practice} and the medication charge as agent for the dispensing pharmacy. Money collected as agent is not Ellery's revenue: it is held for, and paid to, the party that earned it. That is why those amounts appear as separate lines rather than inside one bundled price.\n\nIf no prescription is issued, the review fee is refunded in full to the card you paid with, automatically, without a form and without a phone call. The administration fee is not charged at all in that case — it falls due only when a prescription is transmitted to a pharmacy — so there is nothing to refund. You are never charged for medication that was not dispensed.\n\nPrices can change. A change never applies to an order already placed, and a change to a subscription price is notified before it is charged.",
          },
          { note: "{gatingLong}" },
        ],
      },
      {
        id: "self-pay",
        heading: "Self-pay only",
        blocks: [
          {
            text: "Neither Ellery nor {practice} participates in Medicare, Medicaid, TRICARE, the Veterans Health Administration or any other federal or state healthcare programme. No claim will be submitted to any of them on your behalf, by anyone, at any point. No claim will be submitted to a commercial insurer either.\n\nEverything on this site is self-pay. If you are enrolled in a federal healthcare programme you may still buy here as a self-pay patient; Ellery does not check your enrolment, and no price or discount on this site is conditional on it.\n\nAn itemised receipt is issued on every order, and you are welcome to send it to an HSA or FSA administrator. Whether they reimburse it is between you and them, and Ellery will not tell you that they will.",
          },
        ],
      },
      {
        id: "eligibility",
        heading: "Eligibility and your account",
        blocks: [
          {
            text: "To use this service you must be at least {minAge} years old, physically located in one of the {states} where the platform operates, and using it for yourself. Sermorelin is not reviewed for anyone under {minAgeSermorelin}. Meeting these conditions gets your intake reviewed; it does not mean you will be prescribed anything.",
          },
          {
            items: [
              "Accurate answers — a clinician makes a real decision on what you write. A wrong answer about a medication, a condition, an allergy or a pregnancy can turn a safe treatment into an unsafe one.",
              "One account per person — do not share an account, do not order on someone else's behalf, and do not use payment details that are not yours.",
              "Your own credentials — keep them to yourself, and tell support the day you think someone else has them.",
              "Your own current state — tell Ellery when you move, because the licence that made your review lawful is state by state.",
            ],
          },
          {
            text: "Deliberately false information ends the account and any subscription on it, and may be reported where a law requires reporting. Ellery may also suspend or close an account for non-payment, for a chargeback raised instead of a support request, or for anything in section nine.\n\nYou may close your account whenever you like. Closing it does not delete records the practice or a pharmacy is required by law to keep; the privacy policy says who keeps what, and for how long.",
          },
        ],
      },
      {
        id: "subscriptions",
        heading: "Repeat orders, and the one thing that renews on its own",
        blocks: [
          {
            text: "An order can be set to repeat. That is a scheduling convenience, not a standing authority to charge you: a repeat order still needs your confirmation each cycle before anything is transmitted to a pharmacy or taken from your card. Membership is the one thing on this site that renews by itself. A repeat order is optional, is never pre-selected, and is shown with its cadence and its price on the page where you choose it. Here is every term:",
          },
          {
            items: [
              "Cadence — every month, or every three months, matching the supply the clinician approved. You choose it, and you can change it between charges.",
              "Price — the pharmacy's price for that supply on the day it ships, plus the fixed {admin} administration fee, unless you hold a membership. Shipping is included at standard speed.",
              "Membership — {memberMonthly}, or {memberYearly} paid yearly. It waives the administration fee and upgrades shipping to overnight. Below about {breakEvenBest} orders a year — or {breakEvenWorst} if you would have taken standard delivery — it costs you more than it saves, and we would rather write that here than sell it to you.",
              "Refill confirmation — when a cycle is due you are messaged in your account thread with the amount and the date, at least {renewalNotice} beforehand. The charge is raised only after you confirm. If you do not confirm, nothing is transmitted to a pharmacy and no card is charged.",
              "Membership renewal — membership itself does renew automatically, at {memberMonthly} or {memberYearly}. You are emailed before every membership charge with the amount and the date, at least {renewalNotice} beforehand, and cancelling stops the next one.",
              "Cancelling — from your account in one step, or by one email to {email}. No phone call, no retention offer, no “are you sure” loop.",
              "When cancellation takes effect — immediately, for anything not yet transmitted to a pharmacy. The charge for that cycle is reversed the same day.",
              "What cannot be undone — once a pharmacy has compounded, labelled or dispensed a preparation for you, it cannot be returned, resold or refunded. That is not a policy Ellery chose; federal and state law forbids a pharmacy taking a dispensed prescription back into stock.",
            ],
          },
          {
            text: "A subscription does not extend a prescription. When the prescription behind it runs out, a clinician has to review you again before anything further can be dispensed, and may decide that continuing is not appropriate. If that happens the subscription ends, nothing further is charged, and you are told why.\n\nIf a charge fails, the order is held rather than cancelled, and you have a week to fix the payment method before the subscription lapses.",
          },
          { note: "{gatingShort}" },
        ],
      },
      {
        id: "prescriptions",
        heading: "Prescriptions, pharmacies and dispensing",
        symbols: ["‡"],
        blocks: [
          {
            text: "A prescription, if one is written at all, is written by the reviewing clinician at their own discretion and transmitted electronically to one of three independent, state-licensed mail-order pharmacies: {pharmacies}. You are told which one has your order before it is placed, and it is named on the invoice afterwards.\n\nBy placing an order you authorise the transfer of your prescription between those three pharmacies — where the preparation is out of stock at one of them, where another is materially closer to you, or where a licence condition requires it. You are told when a transfer happens and which pharmacy has it. You may refuse a transfer; refusing may mean the order cannot be filled.\n\nSeveral preparations available here are compounded. A compounded preparation is made by a state-licensed pharmacy, for one patient, against one prescription, under Section 503A or 503B of the Federal Food, Drug and Cosmetic Act. The FDA does not review or approve compounded preparations for safety, effectiveness or quality.{n_compound} FDA-approved products exist for several of the molecules named on this site, a clinician may recommend one of those instead, and their pharmacy price is published on the program pages rather than hidden behind a call.\n\nGLP-1 medications carry serious risks, which are set out in full with every prescription and before you are asked to pay.{n_glp1} The longevity preparations are prescribed at a clinician's discretion and are not FDA-approved for any specific indication.{n_longevity}\n\nEllery does not select the preparation, the dose or the schedule; does not compound, label, package, store or ship anything; and cannot alter a prescription. A question about what is in the vial, how it was made, how it should be stored, or which batch it came from goes to the pharmacy that dispensed it. A question about whether it is right for you goes to the clinician. Support will route either one and will not answer either itself.",
          },
        ],
      },
      {
        id: "trademarks",
        heading: "Trademarks and non-affiliation",
        symbols: ["‖"],
        blocks: [
          {
            text: "{legalName} owns the Ellery name, the Ellery logotype, the text of this site and the arrangement of its pages.\n\nWegovy®, Ozempic®, Zepbound® and Mounjaro® are registered trademarks of their respective owners. Ellery is not affiliated with, endorsed by, sponsored by or otherwise connected to any of those owners.{n_marks} Where a brand name appears on this site it appears to identify that branded product and for no other purpose, and no compounded preparation is a generic, an equivalent, a bioequivalent or a substitute for a branded product.\n\nThe names of the affiliated practice and the partner pharmacies are their own. They are used here to identify the independent parties handling your order, which is the opposite of an implication that they are part of Ellery.",
          },
        ],
      },
      {
        id: "use-and-liability",
        heading: "Acceptable use, intellectual property and liability",
        blocks: [
          {
            subheading: "What you may not do",
            items: [
              "Submit anyone else's health information, or your own under a name that is not yours.",
              "Resell, share, gift or ship on any medication dispensed to you.",
              "Obtain or attempt to obtain a prescription drug outside the process described in these terms.",
              "Scrape, republish or resell the site, its content or its pricing tables, or use them to train a model.",
              "Probe, load-test or attempt to reach accounts, records or systems that are not yours.",
              "Interfere with the operation of the site, or with anyone else's use of it.",
            ],
          },
          {
            subheading: "Intellectual property",
            text: "You may read, print and keep a copy of these documents and of anything Ellery publishes for you, for your own use. Everything else stays Ellery's, and the licence to use the site ends when your account does.",
          },
          {
            subheading: "Information, not medical advice",
            text: "Everything written on this site, including every explanatory article, is information rather than medical advice, and none of it replaces a consultation with a clinician who knows your history. The site is provided as it is. Ellery does not warrant that it will be uninterrupted or error-free, that a clinician will be available inside any particular window on any particular day, that any treatment will be prescribed, or that any treatment will work.",
          },
          {
            subheading: "Limitation of liability",
            text: "Ellery's total liability to you for anything arising out of these terms or your use of the site is limited to the administration fees you paid Ellery in the {liabilityWindow} before the claim. Ellery is not liable for indirect, incidental, special or consequential loss, or for lost earnings.\n\nTwo things that limit does not touch. It does not limit liability for fraud, for death or personal injury caused by negligence, or for anything the law of your state does not permit to be limited. And it does not limit the liability of the reviewing clinician or of the dispensing pharmacy: their responsibility for the care and the medication they provide is their own, is not capped by this agreement, and cannot be waived by it.",
          },
          {
            subheading: "Indemnity",
            text: "You agree to cover Ellery's reasonable costs where a claim arises from information you gave that was untrue, from use of the site outside these terms, or from medication dispensed to you being taken by someone else.",
          },
        ],
      },
      {
        id: "disputes",
        heading: "Disputes, arbitration and class actions",
        blocks: [
          {
            text: "Most disputes are a billing question with a bad first answer. So before anything formal begins, both sides agree to spend {informalWindow} trying to settle it directly — you write to {email} setting out what happened and what would fix it, a named person replies, and neither side files anything in that period.\n\nIf that fails, the clause below applies. It is the one that is usually set in capitals. Capitals are not clarity, so here it is in ordinary sentences, in a panel you cannot miss.",
          },
          {
            panel: {
              label: "Read this one",
              title: "Arbitration, the class-action waiver, and how to opt out of both",
              body: "Both sides agree that a dispute neither of us can settle informally goes to binding arbitration before a single arbitrator at a recognised US arbitration body, rather than to court. The hearing is held in the county where you live, or by video if you prefer. Ellery pays the filing fee for any claim under ten thousand dollars.\n\nArbitration means no judge and no jury, and a decision that is final with very limited grounds of appeal. Either side may still bring a claim in small-claims court instead, and either side may still ask a court to protect intellectual property.\n\nYou also agree that a claim is heard on its own. That means giving up the right to bring or join a class action, a collective action or a class-wide arbitration against Ellery. If a court decides that this waiver is unenforceable for a particular claim, that claim leaves arbitration and goes to court, and the rest of this section still applies to everything else.\n\nYou can opt out of all of it. Write to {email} within {optOutWindow} of first accepting these terms, say that you are opting out of arbitration, and give your name and the email address on your account. That is the whole process. Opting out costs nothing, changes nothing else in this agreement, and has no effect on how your order, your refund or your support request is handled.\n\nNone of this section applies to a claim about the practice of medicine or about dispensing. Those claims are between you and the clinician or the pharmacy, under their own terms, and Ellery's agreement with you cannot and does not sign them away.",
            },
          },
        ],
      },
      {
        id: "general",
        heading: "Governing law, changes and contact",
        blocks: [
          {
            subheading: "Governing law",
            text: "These terms are governed by the laws of the state in which Ellery's registered office sits, as stated in section one, without regard to its conflict-of-laws rules. Anything not sent to arbitration belongs to the state and federal courts sitting there. Nothing in this paragraph removes a protection your own state's consumer law gives you.",
          },
          {
            subheading: "Changes to these terms",
            text: "When these terms change, the effective date changes with them, and the previous version stays available on request. A change that affects fees, cadence, the refund rule or the arbitration clause is emailed to every account holder at least {changeNotice} before it takes effect. Using the site after that date is acceptance; if you would rather not accept, cancel before it, and any order already placed is completed on the old terms.",
          },
          {
            subheading: "The rest",
            text: "If a court finds one provision unenforceable, the rest stands unchanged. A failure to enforce a term is not a waiver of it. These terms, together with the privacy policy, are the whole agreement between you and Ellery, and they replace anything said in a chat window or on the phone. You may not assign this agreement; Ellery may assign it to a successor, on notice to you, and the privacy policy travels with it.",
          },
          {
            subheading: "Contact",
            text: "Write to {email}, or call {phone}. Support hours are {supportHours}, and a person answers.\n\nSupport is Ellery's own staff and cannot answer a clinical question. Clinical questions go to {practice}; questions about a dispensed preparation go to the pharmacy named on your invoice. Support will route either one the same day.\n\nThis site is not for emergencies. If you are having a medical emergency, call 911 or go to the nearest emergency room.",
          },
        ],
      },
    ],
  },

  privacy: {
    eyebrow: "Legal",
    title: "Privacy policy",
    lead: "What Ellery collects, what it passes to the affiliated practice and the partner pharmacies, what it passes to nobody — and the disclosure this category almost never makes: where HIPAA applies, and where it does not.",
    sections: [
      {
        id: "who-controls-what",
        heading: "Who controls what, and where HIPAA applies",
        symbols: ["◆"],
        blocks: [
          {
            text: "{legalName} is not a covered entity under HIPAA. That sentence is unusual on a site like this one, and it is the most important sentence in this document.\n\nHIPAA does not apply to a company merely because health information is involved. It applies to health plans, to healthcare clearinghouses, and to healthcare providers who transmit claims electronically — and to their business associates, by contract. A technology company that runs an intake form is none of those things by default, which is why so many companies in this category describe themselves as “HIPAA-compliant” without ever saying which side of the line they sit on.\n\nHere is which side. {practice} and the clinician who reviews your intake are covered entities. The dispensing pharmacies are covered entities. Ellery is their business associate: where it handles protected health information on their behalf it does so under a business associate agreement that limits it to what those parties have instructed, forbids using that information for its own purposes, and requires it to be returned or destroyed on request.\n\nInformation you give Ellery directly, for Ellery's own purposes — your account, your email address, the pages you looked at, what you wrote to support — is not protected health information under HIPAA. It is governed instead by state consumer health data laws, which reach precisely this kind of data and are in several respects stricter than HIPAA is.",
          },
          {
            panel: {
              label: "The short version",
              title: "Three buckets, three sets of rules",
              body: "If it is clinical, the practice or the pharmacy holds it, HIPAA governs it, and Ellery touches it only as their business associate under their instruction.\n\nIf it is about your account or your use of this site, Ellery holds it and state consumer health data law governs it.\n\nIf it is your card number, the payment processor holds it, and neither Ellery nor the practice nor the pharmacy can see it.",
            },
          },
          {
            table: {
              label: "Which data sits in which bucket",
              head: ["Information", "Held by", "What governs it"],
              rows: [
                [
                  "Your intake answers, the clinician's notes, the prescription, the clinical record",
                  "{practice} and the reviewing clinician",
                  "HIPAA, as protected health information. Ellery holds its copy as their business associate.",
                ],
                [
                  "The dispensing record, the label, the batch record, the certificate of analysis",
                  "The dispensing pharmacy",
                  "HIPAA, and state pharmacy law. Ellery sees the order status and the shipping address, not the pharmacy record.",
                ],
                [
                  "Your account, email address, phone number, order history, support messages, device and usage data",
                  "Ellery",
                  "Not HIPAA. State consumer health data laws and general state privacy law, including the Washington My Health My Data Act.",
                ],
                [
                  "Your full card number",
                  "The payment processor",
                  "PCI DSS and the processor's own terms. Ellery never receives it and could not produce it if you asked.",
                ],
              ],
            },
          },
          {
            text: "For visitors in Washington State, this policy is Ellery's consumer health data privacy notice under the My Health My Data Act, and the sections below state what consumer health data is collected, why, who it is shared with, and how to withdraw consent or ask for deletion. Ellery does not sell consumer health data, to anyone, for anything — so the valid-authorisation process that a sale would require does not exist here, because there is nothing for it to authorise. The equivalent notices required by the Nevada, Connecticut, Texas and comparable state health-data laws are met by these same disclosures.",
          },
        ],
      },
      {
        id: "what-is-collected",
        heading: "What is collected",
        blocks: [
          {
            items: [
              "Account data — your name, email address, phone number, date of birth, state of residence and shipping address. Given by you, held by Ellery.",
              "Intake responses — your answers to the health questionnaire, including height, weight, conditions, medications, allergies and pregnancy status, plus any photograph or laboratory result you choose to attach. Collected through Ellery's intake and transmitted to the reviewing clinician, who holds them as the medical record.",
              "Payment data — the brand of the card, its expiry, its last four digits, and a token that stands in for it. The card number itself is typed into the processor's own field and goes to the processor. Ellery never receives it and never stores it.",
              "Order data — what was ordered, which pharmacy filled it, what each line cost, where it shipped and when it arrived.",
              "Support messages — what you wrote to Ellery and what Ellery wrote back, so the next person you speak to has read the last conversation.",
              "Device and usage data — IP address, browser and device type, the pages requested, and whether an email was opened. Used to keep the site working and to find the pages that fail people.",
            ],
          },
          {
            text: "No third-party advertising or analytics tag runs on this site. No data broker receives anything. Nothing here is used to build a profile of you for anyone else's purposes.\n\nAnd if you would rather not give a company your health information at all, that is a defensible position rather than a problem to be handled. Read this page first and then decide not to start the intake: nothing beyond the ordinary server log for the page you are reading has been collected, and nothing further will be.",
          },
        ],
      },
      {
        id: "what-goes-where",
        heading: "What goes where, and what does not",
        blocks: [
          {
            text: "Every transfer Ellery makes is in this table. There is not a second, quieter list.",
          },
          {
            table: {
              label: "Transfers out of Ellery",
              head: ["What", "Goes to", "Why"],
              rows: [
                [
                  "Your intake responses, and anything you attached to them",
                  "The reviewing clinician at {practice}",
                  "So a clinician licensed in your state can decide whether treatment is appropriate. That decision is theirs; Ellery cannot make it and does not try to influence it.",
                ],
                [
                  "Your name, shipping address, and the prescription written for you",
                  "The dispensing pharmacy",
                  "So it can dispense, label and ship a prescription written for you. It receives no more of your intake than dispensing requires.",
                ],
                [
                  "A payment token, the amount, and the line items",
                  "The payment processor",
                  "So one itemised payment can be split correctly between the practice, the pharmacy, the carrier and Ellery. The processor receives no health information.",
                ],
                [
                  "Your address and the parcel weight",
                  "The carrier",
                  "So the parcel can be delivered and tracked. Plain packaging; no medication named on the outside.",
                ],
                [
                  "Nothing",
                  "Advertisers, ad networks, data brokers, social platforms",
                  "There is no version of this business in which that is acceptable. No personal information is sold. Nothing is shared for cross-context behavioural advertising. No health data is used for ad targeting, ever.",
                ],
              ],
              note: "“Sold” and “shared” are used here in the sense the state statutes give them, not in a narrower sense of Ellery's own devising.",
            },
          },
          {
            text: "Ellery uses a small number of vendors to run the service: hosting, transactional email, the payment processor, and error monitoring. Each is bound by a written agreement limiting it to processing on Ellery's instruction, and each one that touches protected health information is bound by a business associate agreement as well. A vendor is reviewed before it is engaged and cannot use what it processes for its own purposes.\n\nEllery will disclose information where a law or a valid legal order requires it, and will tell you when it is permitted to tell you. If Ellery were ever acquired, this policy travels with the data: a successor would be bound by it, and could not repurpose what it holds without asking you first.",
          },
        ],
      },
      {
        id: "purposes-retention-security",
        heading: "Why it is held, how long, and how it is protected",
        blocks: [
          {
            text: "Ellery processes what it holds to run the service you asked for — to operate the intake, to route it to a licensed clinician, to take one payment and split it correctly, to keep the records the practice and the pharmacies are required to keep, to answer support requests, to meet tax and anti-fraud obligations, and to keep the site secure. Where consent is the basis rather than necessity, as with a marketing email or a disclosure of sensitive data that the service does not require, it is asked for separately and can be withdrawn without any effect on your order.\n\nNothing Ellery holds is used to train a model, and no decision about you is made automatically. A human clinician makes the clinical decision, every time.",
          },
          {
            subheading: "How long each record is kept",
            items: [
              "Account and order records — {accountRetention} after your last order, then deleted or aggregated beyond recovery.",
              "Intake responses and clinical records — held by {practice} under the medical-record retention rule of the state you were reviewed in, typically {clinicalRetention}. Ellery's copy exists only as their business associate and is deleted on their instruction.",
              "Dispensing records — held by the dispensing pharmacy under its own state's pharmacy law, typically {dispensingRetention}.",
              "Payment and tax records — {taxRetention}, because tax and anti-fraud law requires it.",
              "Server and usage logs — {logRetention}.",
              "Support messages — {supportRetention}, then deleted with the account.",
            ],
          },
          {
            subheading: "How it is protected",
            text: "Data is encrypted in transit and at rest. Access inside Ellery is granted by role and reviewed quarterly: support staff can see order status and contact details, not intake answers. Administrative access requires multi-factor authentication and is logged. Vendors are assessed before engagement and re-assessed annually.\n\nNo system is unbreakable, and a company that tells you otherwise is asserting something it cannot know. What Ellery will commit to is this: if a breach affects your information, you are notified inside the period your state requires, told what was involved, and told what to do about it — in the first message, not the third.",
          },
        ],
      },
      {
        id: "your-rights",
        heading: "Your rights, and which party to ask",
        blocks: [
          {
            text: "Depending on where you live, you have some or all of the rights below. Ellery honours them for everyone in the United States rather than only where a statute compels it, because operating two standards would mean deciding which visitors deserve the better one.",
          },
          {
            items: [
              "Access — a copy of what is held about you, and of who it has been disclosed to.",
              "Correction — a fix for anything inaccurate or out of date.",
              "Deletion — removal of anything not required by law to be kept.",
              "Portability — the same copy, in a machine-readable format you can take elsewhere.",
              "Opt out of sale or sharing — already the default: nothing is sold, and nothing is shared for cross-context behavioural advertising.",
              "Withdraw consent — for anything resting on consent, including consumer health data, without any effect on an order already placed.",
              "Non-discrimination — exercising any of these changes nothing about your price, your eligibility, your place in a queue, or how your order is handled.",
            ],
          },
          {
            subheading: "Which party holds it, and where to ask",
            table: {
              label: "Where to send a request",
              head: ["What you are asking about", "Who holds it", "Where to ask"],
              rows: [
                [
                  "Your account, order history, marketing preferences, support messages, device and usage data",
                  "Ellery",
                  "{email}, or {phone}",
                ],
                [
                  "Your intake answers, the clinical notes, the prescription, or an amendment to the medical record",
                  "{practice}",
                  "Ellery will pass the request on within one business day, and the practice answers you directly under its own notice of privacy practices.",
                ],
                [
                  "The dispensing record, the label, the batch record or the certificate of analysis",
                  "The pharmacy named on your invoice",
                  "Ellery will route the request and tell you which pharmacy holds it.",
                ],
              ],
              note: "Sending a request to the wrong party is not a problem: Ellery forwards it and tells you where it went, rather than replying that it is not the data controller.",
            },
          },
          {
            text: "Requests are answered within {rightsDays}. If one genuinely needs longer it may be extended once, and you are told why before the first period runs out. Verification is proportionate: enough to be sure the request is yours, and never so much that answering it means collecting more data than the request concerns. An authorised agent may act for you with written permission.\n\nIf you think a request was mishandled, say so to {email} first and a named person will look at it. You also keep the right to complain to your state attorney general, and — for anything HIPAA covers — to the Office for Civil Rights at the US Department of Health and Human Services.",
          },
        ],
      },
      {
        id: "cookies",
        heading: "Cookies, and the two things kept in your browser",
        blocks: [
          {
            text: "This site sets no cookies. There is no advertising pixel, no analytics tag, no session cookie, and therefore no consent banner to dismiss and no “we value your privacy” overlay standing between you and the page. There is nothing here that would need one.\n\nTwo preferences are stored in your browser's localStorage: whether you chose the light or the dark theme, and which colour palette you picked. localStorage is not a cookie. It is never attached to a request, never reaches Ellery's servers, and never reaches anyone else's. Clearing your site data removes both, and the site works exactly as before with the defaults back.\n\nServer logs record what any web server has to record to serve a page — the requesting address, the page asked for, the time, the response. Those are kept for {logRetention} and used to keep the site up and to investigate abuse.",
          },
        ],
      },
      {
        id: "children-changes-contact",
        heading: "Children, changes and contact",
        blocks: [
          {
            subheading: "Children",
            text: "This service is for adults. Ellery does not knowingly collect information from anyone under {minAge}; the intake asks for your age in its first few questions and stops there if the answer is below the threshold. An account found to belong to a minor is closed and its data deleted, and the parent or guardian on record is told.",
          },
          {
            subheading: "Changes to this policy",
            text: "When this policy changes, the effective date changes with it. A change that materially affects what is collected, who receives it, or how long it is kept is emailed to every account holder at least {changeNotice} before it takes effect, and the previous version stays available on request. A change is never applied retroactively to information already collected without asking you first.",
          },
          {
            subheading: "Contact",
            text: "Written questions about this policy go to {email}. By telephone: {phone}, {supportHours}. By post: {office}.\n\nQuestions about the clinical record go to {practice}, and questions about a dispensed preparation go to the pharmacy named on your invoice. Ellery will route either one, and will tell you where it went.",
          },
        ],
      },
    ],
  },
};

export default legal;
