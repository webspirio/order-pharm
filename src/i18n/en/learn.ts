/**
 * The education hub.
 *
 * Article metadata and the index chrome were final before the article bodies
 * were written and have not been touched. The five metadata fields are a
 * contract: `LearnPreview.astro` (homepage) and the /learn/ index both read
 * them, and `src/i18n/en/meta.ts` keys its per-article <title> off `slug`.
 * Renaming a slug means renaming it in meta.ts too.
 *
 * Why these three: the category's highest-intent, highest-converting formats
 * are the X-vs-Y comparison, the "cost without insurance" guide, and the
 * mechanism explainer for a longevity molecule. One of each.
 *
 * ---------------------------------------------------------------------------
 * HOW AN ARTICLE BODY IS WRITTEN
 *
 * `body` is a list of blocks (`LearnBlock` below) that `ArticlePage.astro`
 * renders generically, so long-form copy can be edited without touching a
 * component. Three conventions inside the strings, all resolved by that
 * component, all of them there so that no figure is ever typed into copy:
 *
 * - `{token}`   a figure or a shared sentence, substituted from
 *               `src/config/pricing.ts` or from `common.ts`. Figures render
 *               in the mono `.figure` face automatically; `{gating}` and
 *               `{gatingLong}` pull the shared price-gating sentences verbatim
 *               rather than paraphrasing them.
 * - `~68 weeks~` a figure that belongs to the published evidence rather than
 *               to this business — a trial duration, a percentage, a trial
 *               name. It cannot come from pricing.ts, but it is still a
 *               figure, so the tildes set it in mono like every other number
 *               on this site.
 * - `‡ § ¶ † *` the footnote symbols defined in `common.ts`. Written inline
 *               and rendered as <sup>; every one resolves in the compliance
 *               band at the foot of the page.
 *
 * `dataTable` blocks own a caption and column headers here and take their
 * ROWS from `pricing.ts` (or, for the receipt, from `home.ts`), which is why
 * an article cannot quote a price the checkout does not charge.
 * ---------------------------------------------------------------------------
 */

/**
 * The block vocabulary. A discriminated union rather than a markup string:
 * every variant is rendered by one component, so an article cannot smuggle in
 * a heading level, a colour or a table style that the rest of the site does
 * not have.
 */
export type LearnBlock =
  /** A section heading. The table of contents and its anchors are built from these. */
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  /** A table whose cells are copy. */
  | { type: "table"; caption: string; head: string[]; rows: string[][] }
  /** A table whose rows come from config. `source` picks the dataset. */
  | { type: "dataTable"; caption: string; head: string[]; source: "ladders" | "metabolicPrices" | "receipt" }
  /** Set apart from the prose: a safety point, or the price-gating sentence. */
  | { type: "callout"; text: string }
  /** The one contextual link out of the article and into the site. */
  | { type: "cta"; text: string; label: string; to: string };

const learn = {
  eyebrow: "Learn",
  title: "Straight answers, before you need them",
  lead: "What these medications do, what they cost when nobody is subsidising them, and where the evidence stops. Written plainly and reviewed by a licensed clinician.",
  /** Sits under the index heading and at the head of every article. */
  disclaimer:
    "Information, not medical advice. Nothing here is a substitute for a conversation with a clinician who knows your history, and nothing here should be read as a recommendation that you take anything.",
  reviewedBy: "Clinically reviewed",
  readTime: "min read",
  updated: "Updated",
  categories: {
    comparison: "Comparison",
    cost: "Cost",
    mechanism: "Mechanism",
  },

  /** Editorial standards, on the index. The one claim a content hub can make
      that its competitors cannot copy without changing how they work. */
  standards: {
    eyebrow: "Editorial",
    title: "How these are written",
    items: [
      "Every figure is imported from the same file the pricing page reads, so an article cannot quote a price the checkout does not charge.",
      "Where the evidence is thin, the article says so in the sentence rather than in a footnote at the bottom.",
      "A licensed clinician reviews each piece before it goes up, and the month it was last checked is at the top of it.",
      "No affiliate links, no sponsored placements, and nothing published only because a phrase gets searched.",
    ],
  },

  /** Chrome for the article template itself. */
  article: {
    home: "Home",
    disclaimerLabel: "Read this first",
    toc: "On this page",
    reviewNote:
      "Reviewed before publication by a clinician licensed in the United States, and re-checked whenever the underlying evidence or a price changes.",
    nextTitle: "Keep reading",
    nextLead: "The other two, if this one raised a question it did not answer.",
    backToIndex: "All articles",
  },

  articles: [
    {
      slug: "semaglutide-vs-tirzepatide",
      category: "Comparison",
      title: "Semaglutide vs tirzepatide: how the two actually differ",
      dek: "One acts on a single receptor, the other on two. What that changes about appetite, side effects, the dose schedule, and the price.",
      readMinutes: 9,
      updated: "August 2026",
      publishedIso: "2026-02-11",
      updatedIso: "2026-08-14",
      body: [
        { type: "h2", text: "What each molecule binds to" },
        {
          type: "p",
          text: "Semaglutide is a GLP-1 receptor agonist. It is a re-engineered version of glucagon-like peptide-1, a hormone your gut releases when you eat, altered so that it survives in the bloodstream for about a week instead of a couple of minutes. Tirzepatide binds two receptors: the same GLP-1 receptor, and the receptor for glucose-dependent insulinotropic polypeptide, or GIP, a second gut hormone. That is the entire difference at the molecular level, and almost everything else follows from it.",
        },
        {
          type: "p",
          text: "GLP-1 receptor agonism does four things worth knowing about. It increases insulin release, but only when blood glucose is already raised, which is why it does not cause hypoglycaemia on its own. It suppresses glucagon. It slows gastric emptying, so a meal leaves the stomach more slowly and fullness lasts longer. And it acts on receptors in the hypothalamus and the hindbrain, which is the part that changes how much you want to eat rather than how much you can physically manage.",
        },
        {
          type: "p",
          text: "The GIP arm is less settled. GIP receptor agonism appears to improve insulin sensitivity in fat tissue, and it may reach the same appetite circuits from a second direction. There is also preclinical work suggesting GIP signalling in the hindbrain dampens nausea. Whether that produces a meaningfully different drug in people is unresolved, and the head-to-head side-effect rates below do not support the story that two receptors means an easier ride.",
        },
        {
          type: "table",
          caption: "Where the two differ, and where they do not",
          head: ["What differs", "Semaglutide", "Tirzepatide"],
          rows: [
            ["Receptor targets", "GLP-1 receptor only", "GLP-1 and GIP receptors"],
            [
              "Appetite",
              "Acts on hypothalamic and hindbrain circuits: less wanting, earlier fullness",
              "The same, plus a GIP-mediated signal whose separate contribution in people has not been quantified",
            ],
            [
              "Gastric emptying",
              "Slowed, most sharply in the first weeks after each increase, then partly adapts",
              "Slowed comparably at the doses that have been studied",
            ],
            [
              "Insulin and glucagon",
              "Glucose-dependent insulin release; glucagon suppressed",
              "The same, plus an effect on fat-tissue insulin sensitivity",
            ],
            ["Route", "Subcutaneous injection, once weekly", "Subcutaneous injection, once weekly"],
            [
              "Branded products holding FDA approval",
              "Wegovy® for weight management, Ozempic® for type 2 diabetes‖",
              "Zepbound® for weight management, Mounjaro® for type 2 diabetes‖",
            ],
          ],
        },

        { type: "h2", text: "What the headline trials showed" },
        {
          type: "p",
          text: "Two trials are the source of nearly every percentage you will see quoted. In ~STEP 1~, adults with obesity and without diabetes took {semaTop} of semaglutide weekly for ~68 weeks~ and lost about ~14.9%~ of body weight on average, against ~2.4%~ on placebo. In ~SURMOUNT-1~, ~72 weeks~ of tirzepatide produced about ~15.0%~ at the lowest maintenance dose and about ~20.9%~ at {tirzTop}, against ~3.1%~ on placebo.",
        },
        {
          type: "p",
          text: "Read the two side by side and tirzepatide looks decisively stronger. Read them properly and the comparison is weaker than it appears: different trials, different years, different sites, different entry criteria, durations that do not match, and an intensive diet-and-activity protocol running in every arm of both studies that almost nobody paying cash for a vial actually receives.",
        },
        {
          type: "p",
          text: "There is now one randomised trial that put the two against each other at weight-management doses. Over ~72 weeks~ it found about ~20.2%~ mean weight reduction on tirzepatide against ~13.7%~ on semaglutide. It was open-label, meaning everyone involved knew which drug they were taking, and it compared the manufacturers' branded products titrated to the maximum tolerated dose in a trial population. The earlier head-to-head, ~SURPASS-2~, ran in type 2 diabetes at semaglutide {semaMid}, so it answers a narrower question than it is usually made to answer.",
        },
        {
          type: "p",
          text: "What has not been run is the comparison the advertising implies: compounded preparations of these molecules, against each other, in people paying cash, over years rather than months, with the adherence real life produces. Anyone quoting a percentage for a compounded preparation is quoting a trial of a different product‡.",
        },
        {
          type: "table",
          caption: "The trials the percentages come from",
          head: ["Trial", "What it compared", "Duration", "Mean weight change"],
          rows: [
            [
              "~STEP 1~",
              "Semaglutide {semaTop} weekly vs placebo, adults with obesity, no diabetes",
              "~68 weeks~",
              "~−14.9%~ vs ~−2.4%~",
            ],
            [
              "~SURMOUNT-1~",
              "Tirzepatide at three maintenance doses vs placebo, adults with obesity",
              "~72 weeks~",
              "~−15.0%~ to ~−20.9%~ vs ~−3.1%~",
            ],
            [
              "~SURMOUNT-5~",
              "Tirzepatide vs semaglutide, both to maximum tolerated dose, open-label",
              "~72 weeks~",
              "~−20.2%~ vs ~−13.7%~",
            ],
            [
              "~SURPASS-2~",
              "Tirzepatide vs semaglutide {semaMid}, adults with type 2 diabetes",
              "~40 weeks~",
              "Favoured tirzepatide on weight and on HbA1c",
            ],
          ],
        },

        { type: "h2", text: "Side effects, and where they actually differ" },
        {
          type: "p",
          text: "Both molecules are dominated by gastrointestinal effects: nausea, vomiting, diarrhoea, constipation, reflux, and the sulphurous burping nobody warns you about. Most of it clusters in the days after a dose increase and then settles, and a minority of people cannot tolerate it at any dose. In the trials, somewhere around ~4%~ to ~7%~ of participants stopped because of side effects — a low number, and one produced in a population being telephoned every fortnight by a research nurse.",
        },
        {
          type: "p",
          text: "The serious risks are shared, because they attach to GLP-1 receptor agonism rather than to one molecule§. The labelling for the branded products of both carries a boxed warning about thyroid C-cell tumours seen in rodents, and neither molecule is used where you or a close relative has had medullary thyroid carcinoma or multiple endocrine neoplasia syndrome type 2. Both raise the risk of gallstones, particularly during rapid weight loss. Both have reported cases of pancreatitis. Both can cause dehydration severe enough to injure a kidney, almost always through vomiting that went untreated. And both slow gastric emptying enough to matter before a procedure under anaesthesia, which the anaesthetist needs to know about in advance rather than on the day.",
        },
        {
          type: "p",
          text: "Two differences are real. Semaglutide has been in wide use for longer, so its rarer signals have had more time to surface — worsening of existing diabetic retinopathy in people with poor glycaemic control, for one. Tirzepatide's long tail is less mapped, which is not the same as being clean. And the belief that the GIP arm makes tirzepatide the gentler drug is not supported by the head-to-head data, where gastrointestinal events ran at similar rates. Choose on effect and on cost, not on an expectation of comfort.",
        },
        {
          type: "callout",
          text: "Symptoms that mean stop and speak to someone the same day, rather than wait for the next dose: severe abdominal pain that goes through to your back, vomiting you cannot keep on top of, no urine passed for a day, or yellowing of the skin or eyes§.",
        },

        { type: "h2", text: "The two dose schedules" },
        {
          type: "p",
          text: "Both molecules are titrated: you start below the effective dose and step up, because the gastrointestinal effects track the rate of increase more closely than the dose itself. The schedules below are the labelled escalation schedules for each molecule. A clinician may hold you at a step for months, step you back down, or stop.",
        },
        {
          type: "dataTable",
          caption: "The labelled escalation schedules, side by side",
          head: ["Semaglutide", "Dose", "Tirzepatide", "Dose"],
          source: "ladders",
        },
        {
          type: "p",
          text: "Two things in that table are easy to misread. The milligram figures do not compare across the columns — {tirzTop} of tirzepatide is not \"more drug\" than {semaTop} of semaglutide, any more than a larger engine is more powerful than a smaller one from a different manufacturer. And the tirzepatide ladder is longer by two steps, so it takes several more weeks to reach the top of the schedule, which matters if you are paying month by month and want to know when the price stops moving.",
        },

        { type: "h2", text: "What the difference costs" },
        {
          type: "p",
          text: "Compounded semaglutide‡ on this site starts at {semaFrom} and compounded tirzepatide‡ at {tirzFrom}, both on a three-month supply bought at once. A single month is {semaOne} and {tirzOne}. At the lowest tier the gap is {monthlyGap} a month — real money over a year, and nowhere near the gap between either of them and a branded product. {gating}",
        },
        {
          type: "dataTable",
          caption: "Cash prices: the compounded preparations and the branded alternatives",
          head: ["Preparation", "One month", "Three months", "Monthly equivalent"],
          source: "metabolicPrices",
        },
        {
          type: "p",
          text: "Wegovy® and Zepbound®‖ hold FDA approval for weight management, and their prices in the table are what the partner pharmacies invoice, passed through unchanged. On top of the medication there is a fixed administration fee of {admin} per order† and the {visit} clinician review fee, which is refunded in full if no prescription is issued. Nothing else follows the total.",
        },

        { type: "h2", text: "Who each one tends to suit" },
        {
          type: "p",
          text: "Patterns rather than rules, and the last one matters most.",
        },
        {
          type: "ul",
          items: [
            "Semaglutide tends to be the starting point where cost is the binding constraint, where the goal is a clinically meaningful reduction rather than the largest available one, or where somebody has tolerated it before.",
            "Tirzepatide tends to come up where a higher average reduction is the goal, where semaglutide has been carried to the top of its schedule with a disappointing response, or where a clinician is weighing markers beyond the scale.",
            "Neither is appropriate with a personal or family history of medullary thyroid carcinoma or MEN 2, in pregnancy or while trying to conceive, with a history of pancreatitis, or alongside another GLP-1 receptor agonist§.",
            "Neither settles what happens after the first year, which is decided by what changes about eating, sleeping and training while the drug is quieting the noise.",
          ],
        },
        {
          type: "p",
          text: "If you have used neither and cost is the deciding factor, starting on the cheaper molecule is not a compromise: the ~STEP 1~ result is a large effect by any standard, and moving up later is a conversation rather than a restart. And if you are a few pounds from where you want to be, the honest answer is that neither of these is for that, and an intake is not worth your eight minutes.",
        },
        {
          type: "p",
          text: "This is a clinician's decision, not a shopping decision. What you express in an intake is a preference. What is prescribed, if anything is prescribed, is the independent judgement of a clinician licensed in your state who has read your history, your medication list and your labs — and they may choose the other molecule, a branded product, or nothing at all*.",
        },
        {
          type: "cta",
          text: "The metabolic program page carries both molecules with their dose tiers, the eligibility thresholds the affiliated practice applies, and the full itemised cost of a first order.",
          label: "See the metabolic program",
          to: "/weight-loss/",
        },
      ] satisfies LearnBlock[],
    },

    {
      slug: "glp-1-cost-without-insurance",
      category: "Cost",
      title: "GLP-1 cost without insurance: the 2026 numbers",
      dek: "What brand-name and compounded GLP-1s cost when you are paying cash, which fees sit on top, and the three questions that reveal whether a quoted price is the whole price.",
      readMinutes: 7,
      updated: "August 2026",
      publishedIso: "2026-03-04",
      updatedIso: "2026-08-19",
      body: [
        { type: "h2", text: "The two prices that exist" },
        {
          type: "p",
          text: "With no insurance paying, a GLP-1 has two prices. One is the cash price of a branded product, from a manufacturer's direct channel or a retail pharmacy. The other is the price of a compounded preparation of the same molecule‡, made by a state-licensed pharmacy against a prescription written for one person. They are not the same product and should not be compared as though the only difference were the label on the vial.",
        },
        {
          type: "p",
          text: "Branded cash prices have moved a great deal, in both directions. Manufacturers now sell directly to patients, and what you are quoted depends on the dose, the month, whether you are new to the drug and which pharmacy fills it. The range in the table below is what the partner pharmacies invoice through this site. Treat any single figure you see quoted anywhere — this one included — as a price for one dose in one month, not as a price list.",
        },
        {
          type: "p",
          text: "Compounded preparations are cheaper for structural reasons rather than promotional ones: no brand, no patent premium, a pharmacy's own cost of goods, and one fewer party in the chain. What you give up is the FDA's review. Nothing compounded is reviewed or approved by the FDA for safety, effectiveness or quality, and whether a given molecule may be compounded at all turns on federal rules that have shifted more than once in recent years and on a clinician's determination for the individual patient‡.",
        },
        {
          type: "dataTable",
          caption: "What a month costs when nobody is subsidising it",
          head: ["Preparation", "One month", "Three months", "Monthly equivalent"],
          source: "metabolicPrices",
        },
        { type: "callout", text: "{gatingLong}" },

        { type: "h2", text: "What \"from $X a month\" is hiding" },
        {
          type: "p",
          text: "The category advertises one number with the word \"from\" in front of it, and \"from\" is doing an enormous amount of work. Roughly in the order they show up on a statement, here is what usually sits between the advertised figure and the amount that leaves your account.",
        },
        {
          type: "ul",
          items: [
            "The dose tier. The advertised figure is almost always the lowest starting dose. Titration is not optional, so the price you were quoted is the price of a month you will spend once.",
            "A membership or subscription fee, billed separately from the medication, sometimes on a different date, and typically not inside the headline number.",
            "The visit or review fee, charged whether or not a prescription is written. What happens to it when the answer is no is the single most revealing question you can ask.",
            "The prepayment. Many monthly figures are a quarterly or half-yearly total divided by three or six. Cancel in month two and you have paid for months you will not use.",
            "Shipping, cold-chain packaging, syringes, needles and a sharps container — individually cheap, and not always in the headline.",
            "The renewal price. Introductory pricing that steps up at month four is standard in this category, and the step is sometimes larger than the discount that preceded it.",
            "Lab work, where a clinician requires it, billed by the laboratory rather than by the platform.",
          ],
        },
        {
          type: "p",
          text: "None of that is necessarily dishonest. A bundled price genuinely can be the cheaper choice for somebody who stays on a starting dose, orders every month and never cancels. It becomes dishonest at the point where the structure is arranged so that a reader cannot work out which case they are in.",
        },

        { type: "h2", text: "Three fee structures, and what each costs you" },
        {
          type: "p",
          text: "Every provider in this category uses one of three shapes. Identifying the shape is more useful than comparing headline numbers, because the shape tells you where the charge you did not expect is going to come from. All three are legitimate, and each one is the cheapest option for somebody.",
        },
        {
          type: "table",
          caption: "The three structures, with the trade-off each one makes",
          head: ["Structure", "What you are quoted", "Where the rest of it comes from", "When it is the cheaper choice"],
          rows: [
            [
              "Bundled single price",
              "One monthly figure said to cover the clinician, the medication and shipping",
              "Dose-tier escalation, prepaid multi-month terms, renewal step-ups, and a headline set by the lowest dose in the range",
              "You stay near a starting dose, order every month, and never need to cancel",
            ],
            [
              "Membership plus medication",
              "A recurring membership fee, with medication priced separately on top",
              "The membership runs whether or not a prescription is written or a refill is ordered, and the medication price still tiers by dose",
              "You order often enough that the fees the membership waives exceed what the membership costs",
            ],
            [
              "Itemised pass-through",
              "Each line separately: the review, the medication at the pharmacy's invoiced price, shipping, an administration fee",
              "Nothing after the total — but the invoice has more lines on it and reads as more expensive at a glance than one bundled figure for the same month",
              "You want the arithmetic to be checkable, or you order irregularly and refuse to pay in the months you do not",
            ],
          ],
        },
        {
          type: "p",
          text: "This site uses the third, and the trade-off is real rather than rhetorical: four lines on a receipt read as more expensive than one number even when the total is lower, and a first-time reader has to do a small amount of arithmetic that a bundled competitor would do for them. If what you want is one figure and no thinking, a bundled provider will feel better for the first month.",
        },
        {
          type: "dataTable",
          caption: "The lines on an order here, and who receives each one",
          head: ["Line", "Amount", "Paid to"],
          source: "receipt",
        },
        {
          type: "p",
          text: "The administration fee is fixed per order and is never calculated as a share of what the medication costs†. The review fee is refunded in full if no prescription is issued. Medication is invoiced by the partner pharmacy at its own price and passed through unchanged. Membership at {membership} is optional, waives the administration fee and upgrades shipping to overnight, and is worth buying only above about {breakEvenBest} orders a year — nearer {breakEvenWorst} on standard delivery. Below that it is a fee for nothing. {gating}",
        },

        { type: "h2", text: "The three questions" },
        {
          type: "p",
          text: "You do not have to audit a company. Three questions, asked before you pay, separate a bundled price from a hidden one. Ask them in writing — by email or in a chat window — so that the answer exists somewhere you can find it again.",
        },
        {
          type: "ul",
          items: [
            "\"What is the total charge in month one and in month four, at the dose I am likely to be on by then, including every fee?\" A provider who cannot answer with two numbers is quoting you a tier rather than a price.",
            "\"Which of these charges is refundable, and what exactly happens if the clinician decides treatment is not appropriate for me?\" A good answer names the amount and the mechanism. A poor one describes a policy.",
            "\"What is billed if I cancel after one month, and what renews automatically, on what date, at what price?\" Then ask where the cancellation button is. If the answer is a phone call during business hours, price that in.",
          ],
        },
        {
          type: "p",
          text: "A fourth is worth asking whenever the preparation is compounded: which pharmacy fills it, in which state, and whether the certificate of analysis for your batch comes with the order‡. A pharmacy that publishes its release testing says yes without pausing.",
        },

        { type: "h2", text: "What none of this solves" },
        {
          type: "p",
          text: "The cheapest legitimate route for a lot of people is still insurance, and it is worth one telephone call to find out whether your plan covers a branded GLP-1 for your indication and what the prior-authorisation criteria are. A covered brand at a copay beats every cash price on this page. Manufacturer copay assistance exists for people with commercial coverage, and it is not advertised loudly.",
        },
        {
          type: "p",
          text: "And there is a harder point. Most people who stop a GLP-1 regain a substantial share of what they lost within about a year, which makes this a cost you should model over years rather than months. If the honest answer for your finances is that you cannot fund month twelve, then this is not affordable yet, and the right move is to wait rather than to start and stop. No page trying to sell you a subscription is going to tell you that, so it is written here instead.",
        },
        {
          type: "cta",
          text: "The pricing page carries every line item, the dose tiers, the shipping options and the eligibility thresholds the affiliated practice applies — before any payment is requested.",
          label: "See the full pricing",
          to: "/pricing/",
        },
      ] satisfies LearnBlock[],
    },

    {
      slug: "nad-injections-explained",
      category: "Mechanism",
      title: "NAD+ injections, explained",
      dek: "What NAD+ does inside a cell, why levels fall with age, what the human evidence supports so far, and — the part most pages skip — what it does not.",
      readMinutes: 8,
      updated: "August 2026",
      publishedIso: "2026-04-22",
      updatedIso: "2026-08-07",
      body: [
        { type: "h2", text: "What NAD+ is" },
        {
          type: "p",
          text: "Nicotinamide adenine dinucleotide is a coenzyme present in every cell you have, and its job is to carry electrons. In its oxidised form, NAD+, it accepts a pair of them and becomes NADH; NADH hands them to the electron transport chain, and the proton gradient that follows is what makes ATP. Glycolysis, the citric acid cycle and fatty-acid oxidation all stall without a supply of NAD+ to accept electrons. None of that is speculative. It is textbook biochemistry, roughly a century old.",
        },
        {
          type: "p",
          text: "What makes the molecule interesting to people studying ageing is a second role. NAD+ is not only recycled as a cofactor; it is also consumed as a substrate by three families of enzymes. The sirtuins use it to strip acetyl groups from proteins, which is how they influence everything from mitochondrial biogenesis to how tightly DNA is packed. The PARPs use it during DNA repair, and consume a great deal of it when there is a lot of damage to repair. CD38 and its relatives cleave it as part of calcium signalling. Because those enzymes destroy the molecule rather than borrow it, a cell has to keep making more — mostly through the salvage pathway, which rebuilds nicotinamide into NAD+ by way of NMN, and to a lesser extent from tryptophan or from nicotinic acid.",
        },
        {
          type: "p",
          text: "So the interesting claim is not that NAD+ matters. It plainly does. The interesting claim is that its availability becomes limiting as you age, and that topping it up changes something a person would actually notice.",
        },

        { type: "h2", text: "Why levels are thought to decline" },
        {
          type: "p",
          text: "Three mechanisms are proposed, and they are not mutually exclusive.",
        },
        {
          type: "ul",
          items: [
            "Chronic low-grade inflammation raises CD38 expression, and CD38 degrades both NAD+ and its precursor NMN. More inflammation, more consumption.",
            "Accumulating DNA damage keeps the PARP enzymes busy, and busy PARPs are among the largest consumers of NAD+ in a cell.",
            "NAMPT, the rate-limiting enzyme of the salvage pathway, is measured at lower levels in several aged tissues, which would cap how fast the pool can be rebuilt.",
          ],
        },
        {
          type: "p",
          text: "The measurements themselves are shakier than the story suggests. Tissue NAD+ is genuinely difficult to measure — the molecule degrades quickly in a sample, and values differ by tissue, by assay, and by whether the person had recently eaten. The widely repeated claim that levels halve by a particular birthday traces back to small studies in single tissues rather than to anything resembling a normal range. That NAD+ falls with age is reasonably well supported. By how much, in which tissue, and with what consequence is not.",
        },

        { type: "h2", text: "What the human evidence actually covers" },
        {
          type: "p",
          text: "This is the point at which a page selling injections usually stops being specific, so: nearly all of the controlled human evidence is for oral precursors rather than for NAD+ itself. Nicotinamide riboside and nicotinamide mononucleotide — NR and NMN — have been through dozens of randomised trials in people. Those trials are mostly small, tens of participants rather than thousands, run for weeks to a few months, and they mostly report surrogate endpoints: a blood concentration, a marker, a walking test¶.",
        },
        {
          type: "table",
          caption: "What has been measured in people, and what the trials found",
          head: ["What was measured", "How it was given", "What the trials look like", "What they found"],
          rows: [
            [
              "Blood NAD+ concentration",
              "Oral NR or NMN",
              "Several randomised, placebo-controlled trials, mostly a few dozen participants",
              "Rises reliably, and in proportion to dose. The most consistent finding in the field.",
            ],
            [
              "Insulin sensitivity and glucose handling",
              "Oral NR or NMN",
              "Small randomised trials in older adults, in obesity and in prediabetes",
              "Mostly no significant change; one trial in women with prediabetes reported improved muscle insulin sensitivity",
            ],
            [
              "Muscle mitochondrial function",
              "Oral NR",
              "Small randomised crossover trials",
              "No consistent improvement, even where NAD+ in muscle was shown to rise",
            ],
            [
              "Blood pressure and arterial stiffness",
              "Oral NR",
              "One small randomised trial in adults with elevated blood pressure",
              "A modest fall in systolic pressure, not yet replicated at any scale",
            ],
            [
              "Physical function and fatigue",
              "Oral NMN",
              "Small randomised trials, several with weak blinding",
              "Mixed. Some walking-test and self-reported fatigue signals; effect sizes small",
            ],
            [
              "Safety and tolerability",
              "Oral NR and NMN",
              "The best-covered question in the field",
              "Generally well tolerated at the doses and over the durations studied",
            ],
            [
              "Lifespan, healthspan, cognition",
              "Any route",
              "No adequate human trials",
              "Unknown. The animal work does not settle it, and is frequently quoted as though it did.",
            ],
          ],
        },
        {
          type: "p",
          text: "Subcutaneous NAD+ has almost none of that behind it. There are case reports, clinic series and a considerable amount of practitioner experience, but controlled trials of the injected form with endpoints that matter to a patient are close to absent. The case for injecting it is therefore an extrapolation — from the oral precursor trials, from pharmacology, and from what clinicians report seeing¶.",
        },
        {
          type: "p",
          text: "The pharmacology is worth stating plainly, because it cuts both ways. NAD+ is a large, charged dinucleotide and does not cross a cell membrane intact. Injected NAD+ is thought to be broken down outside the cell, by CD38, CD73 and related ectoenzymes, into nicotinamide and NMN, which are then taken up and rebuilt inside. If that is what happens, an injection is a precursor-delivery route that bypasses the gut and the liver's first pass — a real difference from a capsule, but not a different mechanism. It also means the oral precursor trials are the most relevant evidence there is, rather than being beside the point.",
        },

        { type: "h2", text: "\"Studied for\" is not a softer way of saying \"proven to\"" },
        {
          type: "p",
          text: "This site uses the phrase \"studied for\" throughout, and it is not a hedge on \"proven to\" — it is a different statement¶. \"Studied for\" means somebody ran a trial that measured the outcome. It says nothing about the result, the size of the trial, or whether anyone reproduced it. \"Proven to\" would require a consistent effect on an outcome a patient cares about, in people resembling that patient, replicated by researchers with no stake in the answer. For NAD+ and its precursors, the first is true of several outcomes. The second is not yet true of any of them.",
        },
        {
          type: "p",
          text: "A useful test when reading any page in this category, including this one: ask whether the claim names an outcome and a population, or only a molecule and a feeling. \"May support cellular energy metabolism\" is a mechanism restated as a benefit. \"Reduced self-reported fatigue in adults over sixty in a randomised trial\" is a claim you can go and check.",
        },

        { type: "h2", text: "Forms, cadence and what they cost" },
        {
          type: "table",
          caption: "The four routes, and what stands behind each",
          head: ["Route", "Typical cadence", "Human evidence", "Notes"],
          rows: [
            [
              "Subcutaneous injection, compounded NAD+‡",
              "{nadCadence}, self-administered at home",
              "Case series and practitioner reports; no adequate controlled trials of the injected form",
              "{nadFrom} on a three-month supply, {nadOne} for a single month, at the pharmacy's invoiced price",
            ],
            [
              "Intravenous infusion in a clinic",
              "A session of one to several hours, repeated as a course",
              "The same: reports rather than randomised trials",
              "Infused quickly it commonly causes chest pressure, flushing and nausea, which is why the sessions are slow. Not offered through this site.",
            ],
            [
              "Oral NR or NMN capsules",
              "Daily",
              "Nearly all of the randomised human evidence that exists",
              "Sold as a supplement rather than prescribed. Not offered through this site.",
            ],
            [
              "Intranasal, sublingual and topical preparations",
              "Varies by product",
              "No meaningful human data on absorption or on effect",
              "Claims made for these should be read as unsupported until a trial exists",
            ],
          ],
        },
        {
          type: "p",
          text: "Three practical points about the injected form that adverts leave out. It stings: NAD+ is acidic in solution and the sting scales with the amount, which is part of why cadence and volume are split across the week rather than pushed in one go. Injection sites are rotated. And the effect people describe is nothing like a stimulant — anybody promising you a switch flipping on the first evening is describing a marketing outcome, not a pharmacological one¶. {gating}",
        },
        {
          type: "callout",
          text: "Compounded NAD+ is not FDA-approved for any indication and is not a treatment for a diagnosed condition¶. Fatigue that is new, worsening, or arriving with other symptoms is a reason to have a cause looked for, not a reason to try a peptide.",
        },

        { type: "h2", text: "What is not known" },
        {
          type: "p",
          text: "The honest list, in the order that matters if you are deciding whether to spend money on this.",
        },
        {
          type: "ul",
          items: [
            "Whether raising NAD+ in blood raises it inside the tissues that matter. Blood is not brain, muscle or liver, and where trials measured tissue levels the changes were smaller and less consistent.",
            "Whether the surrogate markers that do move translate into anything a person would notice a year later. No trial has run long enough to say.",
            "What the right dose or cadence is. There is no dose-response curve for injected NAD+ in humans, so the schedules in use are conventions rather than findings.",
            "Whether more is better or worse. Sustained high-dose nicotinamide consumes methyl groups, and sirtuin and PARP activity are not uniformly benign — several cancers upregulate NAMPT, which is why precursors are studied cautiously in people with active malignancy rather than recommended to them.",
            "What the safety picture looks like beyond the months the trials ran. Well tolerated for twelve weeks is not the same as safe for a decade.",
            "Who benefits most. There is no validated way to identify a person who is NAD+-limited, which means nobody can tell you that you are one.",
          ],
        },
        {
          type: "p",
          text: "If that list makes this read like an experiment you are paying to take part in, that is the correct impression, and it is why nothing on this site claims an outcome for it¶. A clinician may consider it reasonable, at a cadence they choose, for a person whose history they know. That is not the same as established, and a page telling you otherwise would be selling rather than explaining.",
        },
        {
          type: "p",
          text: "One more thing worth saying against the sale. If you are looking for the highest-yield place to put money into your metabolic health, this is not it. Sleep, resistance training, protein intake and treating a diagnosed condition all have evidence behind them that this does not. NAD+ is a reasonable thing to try after those, with your eyes open. It is a poor substitute for any of them.",
        },
        {
          type: "cta",
          text: "The longevity program page lists each preparation with its form, its cadence and what it is studied for, alongside the price the partner pharmacy invoices.",
          label: "See the longevity program",
          to: "/longevity/",
        },
      ] satisfies LearnBlock[],
    },
  ],
};

export default learn;
