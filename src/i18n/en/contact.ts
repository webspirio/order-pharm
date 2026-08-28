/**
 * /contact/ copy.
 *
 * THE PAGE'S ARGUMENT: a coordination business is judged on reachability, so
 * the premium tell here is not a form — it is a published number, published
 * hours, and ROUTING. Three licensed parties touch an order and only one of
 * them is Ellery; the single most useful thing this page can do is say which
 * question belongs to which party, because being sent to the wrong one is the
 * failure that costs a patient a week. The routing table IS the page. The
 * channels above it exist to make the table actionable.
 *
 * NO FORM, DELIBERATELY. This is a static build with no endpoint, so a form
 * would either lie or open a mail client dressed as a form. The number is
 * published instead, and the page says so out loud rather than hoping nobody
 * notices.
 *
 * NO LINK TO THE ACCOUNT THREAD. It carries medical information and lives
 * behind a login that this build does not have. A link to a login that does
 * not exist is the same defect as an "Important Safety Information" link with
 * href="#", so the copy says where the thread lives instead of pretending to
 * point at it.
 *
 * FIGURES: the phone number, the email, the hours, the dispatch cutoff and
 * the address all come from `src/config/site.ts` and `src/config/pricing.ts`.
 * `{token}` placeholders are substituted in `ContactPage.astro`.
 */
const contact = {
  header: {
    eyebrow: "Contact",
    title: "Reachable, and specific about it.",
    lead: "A business whose only product is coordination should be judged on whether anyone answers. So: the number, the hours a person is on it, and a table that says which of the three parties in your order owns which question.",
    /** Labels for the mono row of published facts under the lead. */
    figures: {
      phone: "Support line",
      weekday: "Weekdays",
      weekend: "Weekends",
    },
    noForm: "There is no contact form on this page. A form is a queue with a nicer typeface, and a business that will not publish a number is telling you something.",
    /** The sentence that argues against calling. Every page gets one. */
    against: "If you are ringing to find out whether you will be approved, nobody here can tell you, and a call does not improve the odds. Read the thresholds and the whole cost first — if you do not meet them, do not pay for a review yet.",
    againstCta: "The thresholds and the full price",
  },

  channels: {
    eyebrow: "Three channels",
    title: "Three ways in, and they are not interchangeable",
    lead: "Each one reaches a different party and is good at a different thing. Choosing the right one is the difference between an answer today and an answer next week.",
    hoursLabel: "Hours",
    repliesLabel: "Replies",
    whereLabel: "Where it lives",
    phone: {
      label: "Channel 01",
      title: "The phone",
      body: "A person answers, and they can see your order while you are talking. Best for anything about an order, a charge, an invoice, an address or a delay. They will not answer a clinical question and will say so rather than guess — you get told where it goes instead, and they will stay on the line while you get there.",
      note: "Outside those hours, leave a voicemail. Calls are returned the next business morning, in the order they arrived.",
    },
    email: {
      label: "Channel 02",
      title: "Email",
      body: "Best when you want a paper trail, or need to attach something — a receipt for a plan administrator, a records request, a photograph of a package that arrived damaged. Put your order number in the subject line. Do not send symptoms or clinical detail here: this is not the channel the practice reads.",
      note: "Sent before {cutoff}, answered the same business day; after it, the next business morning.",
    },
    thread: {
      label: "Channel 03",
      title: "The message thread in your account",
      where: "In your account, under Messages, on the order it belongs to.",
      body: "This is the only channel that reaches the clinician who reviewed your intake, and the only correct place for anything clinical — a dose change, a side effect, a symptom, a lab result, a question about whether to continue. It carries medical information, so it sits behind your login rather than on a public page, which is why there is no link to it here. You will find it once your first intake is submitted.",
      note: "Read by {practice} on business days, usually answered within one. Not monitored for emergencies.",
    },
  },

  plate: {
    label: "The desk",
    caption: "Support is a room in {locality} with a published number on it, not an outsourced queue behind a chat widget. There is still nothing to collect there.",
    alt: "A quiet, daylit room with a wooden lattice screen, potted plants and a table set for work.",
  },

  /** The routing table. This is the page. */
  routing: {
    eyebrow: "Routing",
    title: "Who to ask about what",
    lead: "Only one of the three parties that touch your order is Ellery. Asking the wrong one is not rude, it is only slow — so here is the whole map, including the row where the answer is not us at all.",
    header: { topic: "If your question is about", party: "Ask", how: "How, and what happens" },
    rows: [
      {
        urgent: true,
        symbols: "",
        topic: "Chest pain, breathing difficulty, a severe allergic reaction, thoughts of self-harm — any emergency",
        party: "911",
        how: "Call 911 or go to the nearest emergency room. Do not message, and do not wait for the line to open. Tell the practice afterwards, so the clinician who has your file knows what happened.",
      },
      {
        urgent: false,
        symbols: "†",
        topic: "Where your order is, what you were charged, an invoice, a refund, the administration fee, a change of address",
        party: "Ellery",
        how: "Phone or email, during published hours. This is precisely what the support line is for, and it is the only set of questions Ellery can answer on its own authority.",
      },
      {
        urgent: false,
        symbols: "§",
        topic: "Whether treatment is appropriate, a dose change, a side effect, a symptom, a lab result, whether to continue",
        party: "{practice}",
        how: "The message thread in your account. Ellery cannot answer these, cannot ask a clinician to change a decision, and will not relay a question as though it were a clinical opinion.",
      },
      {
        urgent: false,
        symbols: "‡",
        topic: "What is in the vial, a certificate of analysis, a label or expiry question, a cold pack that arrived warm, a shipping exception",
        party: "The dispensing pharmacy, named on your invoice",
        how: "Call the pharmacy on the invoice. Ellery will give you the number, and make the introduction if you would rather not start cold.",
      },
      {
        urgent: false,
        symbols: "◆",
        topic: "A copy of your records, a privacy question, a request to correct or delete something",
        party: "Whichever party holds that record",
        how: "Ellery for the intake, the orders and the invoices; the practice for the clinical record; the pharmacy for the dispensing record. Ask any of the three and you will be told which, rather than sent in a circle.",
      },
      {
        urgent: false,
        symbols: "",
        topic: "Press, a partnership, a security disclosure, a legal notice",
        party: "Ellery",
        how: "Email, with the reason in the subject line. Legal notices also reach us by post at the registered office below.",
      },
    ],
    note: "Ellery will not answer a clinical question even on the days when answering would be faster. That separation is the same one that makes a fixed administration fee defensible: nobody here is paid more for a particular answer, so nobody here has a reason to lean on one.",
  },

  response: {
    eyebrow: "What to expect",
    title: "Response windows, published",
    lead: "These are the windows Ellery holds itself to. The two that belong to another party are marked as theirs, because a window nobody publishes is a window nobody can be held to.",
    header: { what: "What you send", when: "First reply", detail: "What actually happens" },
    rows: [
      {
        what: "A call inside published hours",
        when: "Answered live",
        detail: "A person, not a menu tree. If they cannot answer it they say who can, and send it on while you are still on the line.",
      },
      {
        what: "A voicemail outside hours",
        when: "Next business morning",
        detail: "Returned in the order the messages arrived. Leave your order number if you have one; it saves a second call.",
      },
      {
        what: "An email",
        when: "Same business day",
        detail: "Before {cutoff}, the same business day. After it, the next business morning. Weekend email is read on the weekend and usually answered on Monday.",
      },
      {
        what: "A clinical message in the account thread",
        when: "One business day",
        detail: "Answered by {practice}, not by Ellery, and usually sooner than a day. That window is theirs, and Ellery cannot escalate inside it on your behalf — which is the same separation that keeps the clinical decision independent.",
      },
      {
        what: "A records or refund request",
        when: "Acknowledged same day",
        detail: "A review-fee refund is initiated the day the decision is recorded, and then takes as long as your card issuer takes. A clinical record comes from the practice, within the period state law allows them.",
      },
      {
        what: "A shipping exception",
        when: "Same day we hear it",
        detail: "Whenever the pharmacy tells us, you are told that day, with their revised date rather than a guess. The administration fee for that order comes back without your asking.",
      },
    ],
    note: "On the rare day one of these is missed, the administration fee for that order is refunded. It is a small amount of money, and the point is the accounting rather than the compensation.",
  },

  office: {
    eyebrow: "Registered office",
    title: "An office, not a clinic",
    body: "This is where the company is registered and where the support desk sits. It is not a clinic and it is not a pharmacy: nothing can be collected, dropped off or dispensed here, there is no waiting room, no dispensary and no clinician on the premises. Prescriptions are filled, labelled and shipped by the pharmacy named on your invoice, from their own licensed facility.",
    addressLabel: "Post reaches us at",
    postNote: "Legal notices and formal records requests are welcome by post. Everything else is faster by phone or email.",
    hoursLabel: "Desk hours",
    mapCta: "Open in Google Maps",
  },
};

export default contact;
