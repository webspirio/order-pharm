---
name: prompt-saas
description: "Build a SaaS landing page that converts self-serve signups through problem framing, product proof, objection handling, pricing clarity, and a single dominant CTA. Use when the user is building a landing page for a software subscription product, mentions free trials, signup, pricing tiers, integrations or dashboards, or needs problem framing, product proof and objection handling aimed at self-serve conversion."
---

# SaaS Landing Page

Build the landing page for a software-as-a-service product sold self-serve or
sales-assisted.

This prompt defines **what the page must accomplish and say**. It deliberately does
not prescribe a visual style. Pair it with a skill file (for example
`skill-apple-minimal`) to fix the look. Used alone, default to a restrained,
neutral, typography-led design.

## 1. Before you write anything

Establish these five facts. If the brief does not supply them, ask for them, or state your
assumption explicitly at the top of your output and design against it.

| Fact | Why it changes the page |
|---|---|
| **Who signs up** (role, seniority, company size) | An IC-led bottom-up product needs a fast path to a free trial; a VP-led top-down product needs a demo request and a security story. |
| **What they do today instead** | The page must beat the status quo: a spreadsheet, a competitor, or a manual process. It must not exist in a vacuum. |
| **Time-to-value** | Under 5 minutes → lead with a free trial. Weeks → lead with a demo. |
| **Pricing model** (seat / usage / flat / tiered) | Determines whether pricing can be on the page at all and how it must be framed. |
| **The single riskiest objection** | Security, migration cost, lock-in, "we could build this", team adoption. It gets its own section. |

## 2. Primary objective

**One conversion goal.** Everything on the page serves it.

- Self-serve, low ACV → **Start free** (email or SSO, no credit card).
- Self-serve, high ACV → **Start free**, with **Book a demo** as a persistent
  secondary.
- Sales-led → **Book a demo**, with **See the product** as the secondary.

Secondary goals (docs, pricing, changelog) are allowed but must be visually
subordinate everywhere except the nav.

## 3. User journey

The page has to carry a visitor through five states in order. Every section maps to
exactly one:

1. **"Is this for me?"** → hero headline + one-line qualifier.
2. **"What is it, actually?"** → the product, shown, above the fold or immediately
   below it.
3. **"Would it work for my situation?"** → capability sections, use cases, integrations.
4. **"Can I trust it?"** → customers, numbers, security, uptime, support.
5. **"What does it cost and what happens if I click?"** → pricing + a CTA that
   states the next step literally.

If a section does not advance one of these five, cut it.

## 4. Required page structure

In order. Sections marked *optional* may be dropped if there is nothing genuine to
put in them. **Never fill them with invented content**.

| # | Section | Must answer | Notes |
|---|---|---|---|
| 1 | Nav | Where do I start? | Product, Pricing, Docs, Customers, Log in, **one** primary CTA. |
| 2 | Hero | What is this and who is it for? | Headline, one-sentence subhead, primary CTA, secondary link, product visual. |
| 3 | Product proof | What does it actually look like? | A real screenshot, a short loop, or an interactive demo. Not an illustration. |
| 4 | Social proof strip *(optional)* | Do serious people use it? | Logos only if they are recognisable **and** real. Otherwise omit. |
| 5 | Problem framing | Do they understand my pain? | 2–4 sentences or 3 concrete symptoms. Written in the customer's words. |
| 6 | Core capabilities | Would it work for me? | 3–5 capabilities, one section or row each, each with a visual. |
| 7 | Use cases / personas *(optional)* | Is there a version of this for me? | Only if the product genuinely serves distinct segments. |
| 8 | Integrations *(optional)* | Does it fit my stack? | A real list, linked. Not a decorative logo mosaic. |
| 9 | Objection handling | What is the catch? | Migration, security, lock-in, "we could build it". Address the riskiest one head-on. |
| 10 | Quantified proof | Does it work? | Customer numbers, benchmark, before/after. One credible number beats five vague ones. |
| 11 | Testimonial | Who says so? | 1–2 named quotes with role and company. Never anonymous. |
| 12 | Pricing | What does it cost? | Full table, or a clear "starts at" with a link. Never hide it entirely. |
| 13 | FAQ | Everything left | 5–8 real questions, including the awkward ones. |
| 14 | Closing CTA | What now? | Restate the offer and the friction ("Free for 14 days. No card."). |
| 15 | Footer | Everything else | Product, resources, company, legal, status, security. |

## 5. Content guidance

### Hero headline
- **State the outcome, not the category.** "Ship your changelog in one command" beats
  "The modern changelog platform for developer-first teams."
- 4–10 words. If it needs a comma and a subordinate clause, it is a subhead.
- **Never** open with "The all-in-one…", "AI-powered…", "Supercharge…",
  "Built for modern teams", or "The future of…".
- The subhead does the qualifying work: who it is for, and the mechanism.
  *"Analytics for product teams who need answers in SQL, not tickets."*

### Capability sections
Each one answers "what can I do, and what changes as a result".
- Headline = the outcome. Body = the mechanism, 1–2 sentences.
- **Every capability needs a visual.** A capability with no visual is a claim.
- Order by what the *buyer* cares about, not by what was hardest to build.

### Writing rules
- Second person ("you"), present tense, active voice.
- Concrete nouns: "Postgres", "SOC 2 Type II", "12ms p99", not "enterprise-grade
  infrastructure".
- Number every claim you can. An unnumbered claim reads as marketing; a numbered one
  reads as engineering.
- No superlatives you cannot source. No "seamless", "robust", "powerful",
  "cutting-edge", "revolutionary", "game-changing".
- Read every headline aloud. If it could appear on a competitor's page unchanged, it
  is not specific enough.

## 6. CTA strategy

- **One primary action, repeated verbatim.** Same label in nav, hero, mid-page, and
  close. Changing the wording ("Get started" / "Try free" / "Sign up") fragments
  intent and measurement.
- The label states what happens: **"Start free trial"**, **"Book a 20-min demo"**,
  not "Get started" or "Learn more".
- **State the friction next to the button**, in caption size: "Free for 14 days · No
  credit card · Cancel anytime". This measurably lifts click-through more than
  restyling the button.
- Primary CTA appears at minimum: nav, hero, after the capabilities, after pricing,
  in the closing section. Roughly every 1.5–2 viewports.
- Secondary actions are text links, never a second filled button of equal weight.
- **Never** open a modal for email capture on scroll, exit intent, or a timer.

## 7. Trust ladder

Use the strongest rung you honestly have. Each rung is a liability if faked or thin:

1. **Named customers with logos:** only if recognisable and you have permission.
   Four unknown logos are worse than none.
2. **Quantified outcomes:** "cut incident response from 45 to 9 minutes at Acme".
3. **Named testimonials:** full name, role, company, photo. Anonymous quotes are
   read as fabricated.
4. **Public numbers:** customers, requests/day, uptime, open-source stars.
5. **Compliance and security:** SOC 2, GDPR, HIPAA, pen-test report, sub-processor
   list, status page. Link them; badges alone are noise.
6. **Public proof of life:** changelog, docs, community, roadmap.

Do **not** invent, imply, or approximate any of these. If the product has none of
them yet, lead with the product itself and a transparent "early access" framing.

## 8. Pricing presentation

- **Show pricing.** "Contact us" as the only option loses self-serve buyers silently.
  If pricing is genuinely bespoke, publish a floor: "Enterprise plans start at
  $2,000/mo".
- Three tiers maximum, plus Enterprise. Recommend one visually, but only with a
  restrained marker, not a coloured gradient card.
- **Each tier states the limit that actually bites** (seats, events, projects,
  retention), not just the feature checkmarks.
- Annual/monthly toggle only if there is a real discount; state the discount.
- Directly under the table, answer in caption text: what happens at the end of the
  trial, whether a card is required, and how cancellation works.
- **Never** use a fake "was $99, now $49" strike-through.

## 9. Navigation requirements

- 4–6 top-level items. Product, Pricing, Docs/Customers, plus at most two more.
- **Log in** and the primary CTA are visually distinct and always in the same place.
- Docs, status, and changelog links must go to real destinations. A nav link to a
  404 is the fastest way to lose a technical buyer.
- Sticky on desktop and mobile. On mobile, the primary CTA stays visible in the bar.
  Do not bury it inside the hamburger sheet.
- No mega-menu unless the product genuinely has 3+ distinct product lines.

## 10. Responsive priorities

- **Mobile is the qualifying visit, desktop is the evaluating visit.** On mobile the
  hero, product visual, one capability, pricing, and CTA must all be reachable within
  ~4 scrolls.
- Pricing tables become stacked cards on mobile, recommended tier first.
- Product screenshots must remain legible: crop to the relevant region on mobile
  rather than scaling the whole UI down to illegibility.
- Any interactive demo degrades to a static image or short video below `md`.
- Forms: `type="email"`, `inputMode`, `autoComplete="email"`, and a 44px+ tap target.

## 11. Accessibility

- One `<h1>`. Sections use `<section aria-labelledby>`.
- Product screenshots need alt text describing *what the product does* in that view,
  not "screenshot of dashboard".
- Pricing tables use real `<table>` semantics with `<th scope>`.
- The FAQ is a keyboard-operable disclosure pattern, not a div with `onClick`.
- Colour is never the only signal for the recommended pricing tier or plan
  differences.
- Contrast AA (4.5:1) in both themes, including muted caption text under CTAs.

## 12. Industry-specific considerations

- **Developer tools:** put a code sample or the install command in the hero.
  Developers evaluate syntax before prose. Link docs from the nav. Never gate docs.
- **Data / analytics:** show real query output or a real chart. Fabricated numbers
  in a screenshot are noticed instantly.
- **Security / compliance:** the trust section moves up, directly after the hero
  product proof.
- **Regulated verticals (health, fintech, legal):** compliance framing belongs
  above the fold; add the required disclaimers in the footer.
- **Bottom-up PLG:** free tier limits must be legible in the hero region.
- **Sales-led enterprise:** replace pricing with a "what a rollout looks like"
  timeline and a demo form of ≤ 5 fields.
- **AI-native products:** the differentiator is the output quality, not the word
  "AI". Show a real generated result next to its input, and name the model, latency,
  and where data is processed. State the data-retention and training-opt-out policy in
  the trust section, because that is the first objection a serious buyer raises.
- **Vertical SaaS (a specific industry):** lead with the workflow it replaces in that
  trade's own vocabulary, not generic "productivity" copy. One screenshot of the tool
  doing that trade's actual job beats three abstract benefit sections.
- **Collaboration / multiplayer tools:** the value only appears with a team, so the
  hero must show more than one cursor or user. Make the free-for-small-teams boundary
  explicit, and answer "how do I get my teammates on it" as a named onboarding step.

## 13. Common mistakes to avoid

1. Describing the software instead of the outcome.
2. No product visual above the fold, or an abstract illustration in place of one.
3. A hero headline that would work unchanged for any competitor.
4. Five different CTA labels across the page.
5. "AI-powered", "all-in-one", "supercharge", "seamless" in the first 20 words.
6. A logo cloud of unrecognisable or unverified companies.
7. Anonymous testimonials attributed only to a role and company, such as "VP of Engineering, Fortune 500 company".
8. Invented metrics, fake review counts, fabricated customer numbers.
9. Hiding pricing entirely behind "Contact sales".
10. A feature comparison table with 40 rows and checkmarks nobody reads.
11. Sections that repeat the same claim in three different arrangements.
12. A "How it works" 1-2-3 section that describes signing up rather than the product.
13. Exit-intent popups, scroll-triggered modals, chat widgets that auto-open.
14. A newsletter signup competing with the primary CTA.
15. Dead nav links to docs, status, or changelog pages that do not exist.
16. A demo form asking for company size, budget, and timeline before the visitor has
    seen the product.
17. Stock photography of people in offices.
18. Testimonials in an auto-advancing carousel that cannot be paused.
19. Claiming compliance the product does not hold.
20. No answer anywhere to "what happens when the trial ends".
21. Mobile pricing tables that require horizontal scrolling.
22. A closing CTA that just repeats the hero with no new information.

## 14. Completion checklist

Verify before reporting done. Fix and re-verify anything that fails.

**Message**
- [ ] The hero headline names a specific outcome, not a category.
- [ ] A reader who sees only the hero knows who the product is for.
- [ ] No headline on the page would work unchanged on a competitor's site.
- [ ] Every claim is either numbered, sourced, or removed.
- [ ] No banned filler word appears anywhere ("seamless", "all-in-one", "supercharge",
      "robust", "powerful", "revolutionize", "game-changing", "cutting-edge").

**Structure**
- [ ] All five journey states (§3) are served, in order.
- [ ] The product is visible, as a real screenshot, video, or demo, within the
      first viewport and a half.
- [ ] Every capability section has a visual.
- [ ] The riskiest objection (§1) is addressed explicitly somewhere on the page.
- [ ] No section exists that does not advance a journey state.

**Conversion**
- [ ] Exactly one primary CTA label, used verbatim everywhere.
- [ ] The CTA states what happens next, not "Get started".
- [ ] Friction-reducing microcopy sits next to every primary CTA.
- [ ] The primary CTA is reachable within one scroll from any point on the page.
- [ ] No modal, popup, or auto-opening widget interrupts the page.

**Trust**
- [ ] Nothing on the page is invented: no fake logos, numbers, quotes, or badges.
- [ ] Every testimonial has a full name, role, and company.
- [ ] Compliance and status claims link to real evidence.

**Pricing**
- [ ] A price or a credible floor is visible on the page.
- [ ] Each tier states the limit that actually constrains the buyer.
- [ ] Trial end, card requirement, and cancellation are answered in plain text.

**Craft**
- [ ] Verified at 375, 768, 1024, 1440.
- [ ] Screenshots legible on mobile; pricing stacks without horizontal scroll.
- [ ] One `<h1>`, labelled sections, real table semantics, keyboard-operable FAQ.
- [ ] AA contrast in both themes.
- [ ] All nav and footer links resolve.
- [ ] If a skill file is in use, run that skill's self-verification loop as well.
