import { qualifyingConditions } from "./programs";

/**
 * /start/ — the intake, previewed in full.
 *
 * This page is the site's thesis under load. Every competitor's intake is a
 * funnel: a progress bar with no endpoint, a price revealed at step nine, and
 * a "you qualify" screen written by a form rather than by a clinician. So this
 * one is built the opposite way round. It states what it is and is not before
 * the first question, it carries the running cost beside every step, and the
 * last screen is a review summary rather than a checkout.
 *
 * The intake here is also a DEMONSTRATION and says so in three places. It runs
 * entirely in the browser tab, there is no server behind it, and nothing is
 * sent or stored. Writing that plainly costs nothing and is the same posture
 * the rest of the site takes about the parts of the chain it does not own.
 *
 * Two hard rules held throughout the strings below:
 * - No figure is typed. Every threshold, price, duration and state count is
 *   imported from `src/config/pricing.ts` by the component, and the few
 *   sentences that need one carry a `{n}` placeholder the component fills.
 * - The intake never reaches a verdict. It reports what a threshold says and
 *   what a clinician will be shown. "Flagged for the clinician" is the
 *   strongest thing any branch here is allowed to say.
 */
const start = {
  header: {
    eyebrow: "Intake",
    /** `{accent}` is the page's one Fraunces-italic word; see Headline.astro. */
    title: "Every question, and {accent} it is asked.",
    titleAccent: "why",
    lead: "This is the whole questionnaire, in the open, before you give anything to anyone. It asks what a clinician licensed in your state needs in order to decide, it shows the itemised cost while you are still answering, and it asks for no payment at any point.",
    /** The four figures under the lead. Values come from pricing.ts. */
    factsLabel: "What starting commits you to",
    facts: [
      { label: "Time to complete", note: "in one sitting, with no appointment and no video call" },
      { label: "Review window", note: "from a submitted intake to a clinician's decision" },
      { label: "Refunded if declined", note: "the review fee, in full, to the card used" },
      { label: "Administration fee", note: "fixed per order, and the only thing Ellery charges" },
    ],
    /** Footnote ◇, promoted out of a grey line and into the header's aside. */
    demoLabel: "Demonstration",
    demo: "The intake below is a working demonstration. It runs in this browser tab, nothing is transmitted, and nothing is stored.",
  },

  scope: {
    eyebrow: "Before you start",
    title: "What this is, and what it is not.",
    lead: "The intake is a questionnaire and a price itemisation. It is not a consultation, not an approval, and not a checkout. Those are separate, they belong to different parties, and none of them happens on this page.",
    isLabel: "This is",
    is: [
      "A health questionnaire, written to be read by a clinician licensed in your state.",
      "A live cost itemisation, updated as you answer, with every line named and attributed.",
      "Editable to the last screen. Nothing is fixed until you have read the summary.",
    ],
    isNotLabel: "This is not",
    isNot: [
      "A prescription, or a promise that one will be written.",
      "A clinical assessment. Nobody at Ellery reads your answers clinically, and no answer here produces a decision.",
      "A payment step. No card details are requested anywhere in the intake.",
    ],
    /** The argument against starting. Every page carries one. */
    concessionLabel: "The case against starting",
    concession:
      "If what you want is certainty today, no honest intake can give it to you, and this one will not pretend. A clinician may decide treatment is not appropriate, may ask for records first, or may recommend an FDA-approved product instead of a compounded one. If that outcome is not acceptable to you, close the tab now rather than after the review fee.",
    decider:
      "Ellery does not decide. It builds the form, moves the answers to the affiliated clinical practice, and stays out of the decision, which belongs to the clinician who reads them.",
  },

  intake: {
    eyebrow: "The intake",
    title: "The questionnaire, as it runs.",
    lead: "Answer it here to see exactly what is asked and what it costs. The step index, the time left and the running itemisation stay visible the whole way, because the surprise at checkout is the injury this category is known for.",
    /** The coverage figure and the shortfall, side by side. Both come from
        `coverage` in pricing.ts — the count is not typed here. */
    coverageLabel: "States and DC covered",
    notYetLabel: "No clinician licensed yet",
  },

  next: {
    eyebrow: "After you submit",
    title: "What the four handoffs do with it.",
    lead: "A submitted intake goes to the affiliated clinical practice, not to Ellery. Here is the chain it enters, and how long each party has.",
    note: "Timings are commitments, not averages. If a clinician needs records or a follow-up answer, you are told the same day rather than left in a queue.",
  },

  /**
   * Every string inside the island. Passed down as one `copy` prop from
   * StartPage.astro — a React island cannot read the dictionary itself
   * without shipping all of it to the browser.
   */
  form: {
    a11y: {
      progressLabel: "Intake progress",
      /** `{n}` and `{total}` are filled by the island. */
      stepCounter: "Step {n} of {total}",
      formLabel: "Intake questionnaire",
      railLabel: "Progress and running cost",
    },
    nav: {
      back: "Back",
      next: "Continue",
      toReview: "See the summary",
      restart: "Clear it and start again",
      optional: "You can leave this empty",
    },
    rail: {
      title: "No surprise at checkout",
      stepLabel: "Step",
      timeLabel: "Time left",
      timeUnit: "min",
      stagesLabel: "Stages",
      costLabel: "Running cost",
      costPending: "Priced once you choose a supply length",
      notCharged:
        "Not a charge and not an authorisation. The itemisation is here so it cannot appear for the first time at the end.",
    },
    steps: {
      state: {
        eyebrow: "Where you live",
        title: "Which state are you in?",
        lead: "A licence to practise is issued per state, so this is the first question rather than the last one. If the answer rules you out, you will know before you have typed anything else.",
        label: "State or district",
        placeholder: "Choose a state",
        groupAvailable: "Available now",
        groupUnavailable: "Not yet available",
        description:
          "The count is published rather than rounded up, and the shortfall is named below rather than discovered at the end.",
        error: "Choose a state, so the intake can be routed to a clinician licensed there.",
        remoteNote:
          "Carriers charge more to reach you, and that surcharge is passed through rather than absorbed into the medication price. It appears in the itemisation on the right.",
      },
      /** The stop branch. Calm, specific, and it names the state. */
      blocked: {
        eyebrow: "Not yet",
        title: "No clinician is licensed here yet.",
        /** `{state}` is filled by the island. */
        body: "The platform is not operating in {state}. No clinician affiliated with the practice holds a licence there yet, and until one does there is nothing further worth asking you. The intake stops here rather than collecting your health history and disappointing you at the end.",
        listLabel: "Tell me when it opens",
        emailLabel: "Email address",
        emailButton: "Notify me",
        emailNote:
          "This field is part of the demonstration and is not connected to anything. Nothing you type is sent, and no list exists yet.",
        change: "Choose a different state",
        alternative: "Everything else on this site is readable from anywhere, including the full pricing.",
      },
      goal: {
        eyebrow: "What you are here for",
        title: "Which program are you asking about?",
        lead: "This decides which questions follow, and nothing else. A clinician may still decide the other program is the more appropriate one, or that neither is.",
        label: "Program",
        options: {
          metabolic: {
            label: "Metabolic",
            note: "Compounded semaglutide or compounded tirzepatide, for weight. Once weekly, titrated in steps.",
          },
          longevity: {
            label: "Longevity",
            note: "Compounded NAD+, sermorelin, glutathione or MIC + B12, prescribed at a clinician's discretion and studied for, not proven to deliver, the effects people ask about.",
          },
          both: {
            label: "Both",
            note: "Read together in one review. A clinician may find one appropriate and the other not, and will say which.",
          },
        },
        error: "Choose one, so the questions that follow match it.",
      },
      about: {
        eyebrow: "About you",
        title: "Four answers that set the thresholds.",
        lead: "Height and weight give a BMI, which is the first thing checked and the least interesting. Age and sex assigned at birth change what is safe to prescribe.",
        ageLabel: "Age",
        ageUnit: "years",
        sexLabel: "Sex assigned at birth",
        sexNote:
          "Asked because dosing and the pregnancy question further on depend on it. It is not a question about how you identify, and it is not passed to anyone but the clinician.",
        sexOptions: {
          female: "Female",
          male: "Male",
          other: "I will tell the clinician",
        },
        heightLabel: "Height",
        heightFtUnit: "ft",
        heightInUnit: "in",
        weightLabel: "Weight",
        weightUnit: "lb",
        bmiLabel: "Estimated BMI",
        bmiPending: "Enter a height and a weight",
        bmiNote:
          "An estimate from two measurements. It knows nothing about your muscle, your bloodwork or your history, and it does not by itself determine whether treatment is appropriate.",
        thresholdLabel: "What the published thresholds say",
        /** `{n}` is the threshold, filled by the island. */
        thresholdAlone:
          "This is at or above {n}, the threshold the affiliated practice applies to BMI on its own.",
        thresholdWithCondition:
          "This is below {alone} but at or above {with}, the lower threshold the practice applies when a weight-related condition is also documented. The next step asks about those.",
        thresholdBelow:
          "This is below both published thresholds. A clinician will still read the intake and may decide the metabolic program is not appropriate, or may suggest the longevity program instead.",
        thresholdLongevity:
          "BMI is not a threshold for the longevity program. It is recorded because dose and safety questions use it.",
        thresholdInfo:
          "Information, not a decision, and not a pre-approval. The clinician who reads your intake is the only party that decides.",
        ageMinNote: "Intakes are reviewed for adults only, from age {n}.",
        sermorelinAgeNote:
          "Compounded sermorelin is not offered below age {n}, here or anywhere in this category. The rest of the longevity program is unaffected.",
        errors: {
          age: "Enter your age in years.",
          ageMin: "The affiliated practice does not review intakes below age {n}.",
          sex: "Choose one, or say you would rather tell the clinician.",
          height: "Enter a height in feet and inches.",
          weight: "Enter a weight in pounds.",
        },
      },
      conditions: {
        eyebrow: "Weight-related conditions",
        title: "Has a clinician diagnosed any of these?",
        lead: "This is the second half of the lower BMI threshold, which is why it is asked here rather than buried in the history. Tick only what has actually been diagnosed.",
        legend: "Diagnosed, not suspected",
        /** The shared record — see the note on it in ./programs. */
        items: qualifyingConditions,
        none: "None of these",
        lowerThresholdLabel: "The lower threshold",
        lowerThresholdNote:
          "A documented weight-related condition is what brings the lower threshold into play. Whether it applies to you is the clinician's call, not this form's.",
      },
      history: {
        eyebrow: "History a clinician must see",
        title: "Anything here changes the answer.",
        lead: "Two of these are absolute contraindications on the labelling and the rest routinely change a decision. Tick anything that applies to you, or, where it says so, to a close relative.",
        legend: "Tick anything that applies",
        items: {
          thyroid: "Medullary thyroid carcinoma or MEN 2, in me or in a close relative",
          pancreatitis: "Pancreatitis, at any point",
          pregnancy: "Pregnant, planning a pregnancy, or breastfeeding",
          gallbladder: "Active gallbladder disease",
          gastroparesis: "Gastroparesis, or delayed gastric emptying",
          cancer: "Active cancer, or cancer treated recently",
          eatingDisorder: "An eating disorder, now or previously",
        },
        none: "None of these",
        flaggedTitle: "This will be flagged for the clinician",
        flaggedBody:
          "The form does not decide anything and is not able to. A flag means the clinician reads this before the rest, and may decide treatment is not appropriate, may ask for records, or may proceed with a different preparation.",
        cancerNote:
          "Compounded sermorelin is not prescribed alongside active or recent cancer. That part of the longevity program is set aside; the rest is still read.",
      },
      meds: {
        eyebrow: "What you already take",
        title: "Medications and allergies.",
        lead: "Interactions are the most common reason a clinician says no, and the second most common is a medication nobody mentioned. Write it the way you would say it out loud.",
        medsLabel: "Current medications and supplements",
        medsPlaceholder: "One per line. Brand or generic name, and the dose if you know it.",
        medsNote:
          "Supplements and over-the-counter medicines count. So does anything you take occasionally.",
        allergiesLabel: "Allergies and previous reactions",
        allergiesPlaceholder: "What it was, and what happened.",
        allergiesNote:
          "A reaction to a preservative or a needle material matters here as much as a reaction to a drug.",
        blankNote:
          "Left blank, either box reads as \"not answered\" rather than \"none\", and the clinician will come back and ask. Writing \"none\" is faster.",
      },
      supply: {
        eyebrow: "How much at a time",
        title: "One month, or three?",
        lead: "The pharmacy prices three months below three single months and passes that through. Nothing clinical changes with this answer, and it can be changed after a prescription is written.",
        label: "Supply length",
        options: { one: "One month", three: "Three months" },
        header: { item: "Preparation", price: "At this supply", monthly: "Monthly equivalent" },
        note: "Every preparation that could apply to the program you chose, at the pharmacy's price, passed through unchanged. Which one, if any, is the clinician's decision and not yours or Ellery's.",
        concession:
          "If you are not certain you will still be on treatment next quarter, take the single month. It costs more per month and wastes less.",
        error: "Choose a supply length.",
      },
      review: {
        eyebrow: "Review",
        title: "Everything you answered, in one place.",
        lead: "This is the summary a clinician would open, followed by the cost it produces. Read both before deciding whether you want any of it.",
        answersTitle: "Your answers",
        answersHeader: { question: "Question", answer: "Answer" },
        labels: {
          state: "State",
          goal: "Program",
          age: "Age",
          sex: "Sex assigned at birth",
          height: "Height",
          weight: "Weight",
          bmi: "Estimated BMI",
          conditions: "Weight-related conditions",
          history: "History flags",
          medications: "Current medications",
          allergies: "Allergies",
          supply: "Supply length",
        },
        empty: "Not answered",
        noneReported: "None reported",
        costTitle: "The itemised cost",
        costLead:
          "Built from the answers above. On the live site this is the screen that appears before a card is requested, and these are the same lines that appear on the invoice afterwards.",
        costHeader: { item: "Line", amount: "Amount", dest: "Paid to" },
        atCost: "at cost",
        included: "included",
        rows: {
          visit: {
            item: "Clinician review",
            dest: "The affiliated clinical practice, collected by Ellery as their agent. Refunded in full if no prescription is issued.",
          },
          medication: {
            item: "Medication, compounding and fulfilment",
            dest: "The partner pharmacy, at the price it invoices. A range, because the preparation is the clinician's decision and has not been made yet.",
          },
          shipping: {
            item: "Shipping",
            dest: "The carrier. Standard is included on every order; overnight costs extra, or comes with membership.",
          },
          admin: {
            item: "Ellery administration",
            dest: "Ellery. Fixed per order. Not a percentage, not per dose, not per prescription.",
          },
        },
        totalLabel: "Estimated total",
        totalNote:
          "A range rather than a figure, because the pharmacy sets the medication price and no preparation has been chosen. Both ends of it are real prices you could be invoiced.",
        refundTitle: "The refund rule, in one sentence",
        refundBody:
          "If the clinician decides treatment is not appropriate, the review fee is returned in full and automatically to the card used, and no medication line is ever raised, because no prescription was written.",
        demoTitle: "Nothing was submitted, and nothing was stored",
        demoBody:
          "This intake is a demonstration. It has no server behind it: every answer stayed in this browser tab, nothing was transmitted, no account exists, and reloading the page erases all of it. On the live site, this is the point at which you would confirm and pay.",
        linkPricing: "The full pricing, line by line",
        linkHowItWorks: "How the review actually works",
      },
    },
  },

  /**
   * The 50 states and the District of Columbia, alphabetically. Which ones the
   * platform serves is NOT declared here — StartPage.astro derives that from
   * `coverage` in pricing.ts, so the list and the published state count cannot
   * disagree.
   */
  states: [
    { code: "AL", name: "Alabama" },
    { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" },
    { code: "CA", name: "California" },
    { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" },
    { code: "DE", name: "Delaware" },
    { code: "DC", name: "District of Columbia" },
    { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" },
    { code: "HI", name: "Hawaii" },
    { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" },
    { code: "IN", name: "Indiana" },
    { code: "IA", name: "Iowa" },
    { code: "KS", name: "Kansas" },
    { code: "KY", name: "Kentucky" },
    { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" },
    { code: "MD", name: "Maryland" },
    { code: "MA", name: "Massachusetts" },
    { code: "MI", name: "Michigan" },
    { code: "MN", name: "Minnesota" },
    { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" },
    { code: "MT", name: "Montana" },
    { code: "NE", name: "Nebraska" },
    { code: "NV", name: "Nevada" },
    { code: "NH", name: "New Hampshire" },
    { code: "NJ", name: "New Jersey" },
    { code: "NM", name: "New Mexico" },
    { code: "NY", name: "New York" },
    { code: "NC", name: "North Carolina" },
    { code: "ND", name: "North Dakota" },
    { code: "OH", name: "Ohio" },
    { code: "OK", name: "Oklahoma" },
    { code: "OR", name: "Oregon" },
    { code: "PA", name: "Pennsylvania" },
    { code: "RI", name: "Rhode Island" },
    { code: "SC", name: "South Carolina" },
    { code: "SD", name: "South Dakota" },
    { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" },
    { code: "UT", name: "Utah" },
    { code: "VT", name: "Vermont" },
    { code: "VA", name: "Virginia" },
    { code: "WA", name: "Washington" },
    { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" },
    { code: "WY", name: "Wyoming" },
  ],
};

export default start;
