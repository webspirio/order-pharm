import type { Dictionary } from "./index";

/**
 * SCAFFOLD STATE: structural placeholder, mirrors `de.ts` key-for-key.
 *
 * Once real German copy lands page-by-page, this file gets a machine-
 * translated draft per section, each block marked
 * `// MACHINE-TRANSLATED — REVIEW BEFORE LAUNCH` (legal terminology flagged
 * with extra care) — see the pre-launch checklist. Until then it's just
 * placeholder text, not yet a translation of anything real.
 */
const en: Dictionary = {
  meta: {
    // MACHINE-TRANSLATED — REVIEW BEFORE LAUNCH
    home: {
      title: "Attorney Olga Gatlin — Your Rights. Clearly Understood. Competently Represented.",
      description:
        "Attorney and certified tax law specialist in Munich. Advising on tax law, residence and migration law, labor law, and civil law — in German, Ukrainian, Russian, and English.",
    },
    imprint: {
      title: "Imprint — Attorney Olga Gatlin",
      description: "[PLACEHOLDER] Legal disclosure and practice details.",
    },
    privacy: {
      title: "Privacy Policy — Attorney Olga Gatlin",
      description: "[PLACEHOLDER] How this website handles personal data.",
    },
    notFound: {
      title: "Page not found — Attorney Olga Gatlin",
      description: "[PLACEHOLDER] The page you are looking for does not exist.",
    },
    // MACHINE-TRANSLATED — REVIEW BEFORE LAUNCH
    ueberMich: {
      title: "About Me — Attorney Olga Gatlin",
      description:
        "Attorney and certified tax law specialist since 2013. Background, qualifications, and areas of focus.",
    },
    dienste: {
      title: "Services — Attorney Olga Gatlin",
      description:
        "Tax law, residence and migration law, labor law, and civil law — my areas of practice in detail.",
    },
    // MACHINE-TRANSLATED — REVIEW BEFORE LAUNCH
    kontakt: {
      title: "Contact — Attorney Olga Gatlin",
      description:
        "Contact Attorney Olga Gatlin in Munich — via the form or by phone at +49 176 7938 8816.",
    },
  },

  nav: {
    services: "Services",
    gallery: "Work",
    why: "Why me",
    about: "About",
    contact: "Contact",
    cta: "Book a consultation",
    toggleTheme: "Toggle theme",
  },

  palette: {
    label: "Color palette",
    options: {
      original: "Original",
      blue: "Blue",
      emerald: "Emerald",
    },
  },

  // MACHINE-TRANSLATED — REVIEW BEFORE LAUNCH. hero.title is the client's own
  // English wording, supplied directly — not machine-translated.
  hero: {
    kicker: "Attorney and Certified Tax Law Specialist in Munich",
    logoTitle: "Attorney",
    title: "Your rights. Clearly understood.\nCompetently represented.",
    subtitle:
      "As an attorney and certified tax law specialist, I advise and represent private individuals, the self-employed, and businesses in tax matters as well as in selected labor law, civil law, and residence law matters.",
    ctaPrimary: "Book a consultation",
    ctaSecondary: "Call",
    badge: { value: "13+", label: "Years of Experience in Munich" },
  },

  // MACHINE-TRANSLATED — REVIEW BEFORE LAUNCH
  services: {
    title: "Practice areas",
    subtitle: "My areas of practice at a glance.",
    items: [
      {
        title: "Tax Law",
        desc: "Advice and representation in tax matters for private individuals and businesses.",
      },
      {
        title: "Residence and Migration Law",
        desc: "From employment to family reunification — the right residence-law path for your situation.",
      },
      {
        title: "Labor Law",
        desc: "Advice on dismissals, employment contracts, and workplace disputes.",
      },
      {
        title: "Civil Law",
        desc: "Enforcement and defense of claims, and representation in civil law matters.",
      },
    ],
  },

  gallery: {
    title: "[PLACEHOLDER] Gallery",
    subtitle: "[PLACEHOLDER] Not currently used on any page.",
    all: "All",
    categories: {
      office: "Office",
      certificates: "Certificates",
      other: "Other",
    },
  },

  // MACHINE-TRANSLATED — REVIEW BEFORE LAUNCH
  why: {
    title: "My Strengths",
    items: [
      {
        title: "Years of Experience",
        desc: "Through my many years of professional experience and regular collaboration with a tax firm, I combine legal expertise with a solid understanding of economic and accounting matters.",
      },
      {
        title: "Cross-Border Experience",
        desc: "I have particular experience in cross-border matters, especially in the German-Ukrainian context.",
      },
      {
        title: "Personal Support",
        desc: "My aim is to explain complex legal matters clearly and to support my clients personally, directly, and with a focus on solutions.",
      },
      {
        title: "13+ Years of Experience",
        desc: "For more than 13 years, I have reliably guided clients in Munich through legal and tax matters of every kind.",
      },
      {
        title: "Advice in 4 Languages",
        desc: "I advise in German, Ukrainian, Russian, and English — clearly, without detours through a foreign language.",
      },
    ],
  },

  // MACHINE-TRANSLATED — REVIEW BEFORE LAUNCH. Legal terminology (§ 24/§
  // 18a/§ 21 AufenthG) flagged for extra care — German immigration-law
  // paragraph references have no direct translation.
  ukraineFocus: {
    title: "Legal support for Ukrainians in Munich",
    lead: "As a certified tax law specialist in Munich advising in Ukrainian, Russian, and English, I know the legal challenges facing the Ukrainian community firsthand.",
    items: [
      {
        title: "Residence in Germany",
        desc: "§ 24 AufenthG (temporary protection) applies until 04.03.2027. I help you choose the right strategy for permanent residence: a settlement permit, § 18a/18b for skilled workers, or § 21 for the self-employed.",
      },
      {
        title: "Business & Taxes",
        desc: "Business registration, tax returns, tax class, company registration — I support entrepreneurs from the first step to a stable business in Germany.",
      },
      {
        title: "Family Reunification",
        desc: "Family reunification, spousal reunification, work permits for family members — I know every detail of the process from years of practice.",
      },
    ],
  },

  // MACHINE-TRANSLATED — REVIEW BEFORE LAUNCH. Legal terminology (state exams,
  // bar admission, specialist-lawyer titles) flagged for extra care — German
  // legal-education terms rarely have a single canonical English equivalent.
  ueberMich: {
    eyebrow: "About Me",
    title: "Attorney and Certified Tax Law Specialist in Munich",
    intro:
      "I advise and represent private individuals, the self-employed, and businesses, particularly in tax law as well as in selected civil law, labor law, and residence law matters.",
    body: "A particular focus of my work is on cross-border matters, especially in the German-Ukrainian context.\n\nAs an attorney and certified tax law specialist, I have had many years of experience in legal and tax advice since 2013.\n\nPersonal advice on tax matters and selected related legal questions.",
    focus: {
      title: "Areas of Focus",
      items: ["Tax Law", "Labor Law", "Residence and Migration Law", "Enforcement and Defense of Claims"],
    },
    qualifications: {
      title: "Career",
      items: [
        "1996–2002: Law studies at Taras Shevchenko National University of Kyiv, degree: Diploma in Law",
        "2005–2011: Law studies at Ludwig Maximilian University of Munich, degree: First State Examination in Law",
        "2011–2013: Legal clerkship (Referendariat) in Germany, degree: Second State Examination in Law",
        "2014: Admission to the bar",
      ],
    },
    additionalQualifications: {
      title: "Additional Qualifications",
      items: [
        "Since 2013: regular continuing education in my areas of practice",
        "Specialist course in tax law",
        "Tax advisor course",
        "Training in mediation and alternative dispute resolution",
        "Since 2018: Certified specialist in tax law",
      ],
    },
    languages: {
      title: "Languages of Consultation",
      text: "German, Ukrainian, Russian, and English",
    },
    membership: {
      title: "Membership",
      text: "Member of the Munich Bar Association (Rechtsanwaltskammer München)",
    },
    achievements: {
      title: "Achievements",
      items: ["13+ years of experience in Munich", "Board member, solidUArity e.V. — volunteer aid for Ukraine"],
    },
  },

  // MACHINE-TRANSLATED — REVIEW BEFORE LAUNCH. Legal terminology flagged for
  // extra care throughout.
  dienste: {
    eyebrow: "My Expertise",
    title: "My Areas of Practice",
    subtitle:
      "For many of my clients, questions of tax, corporate, labor, and residence law are interconnected. Entrepreneurs, the self-employed, and people with an international background in particular benefit from advice that considers not just the individual legal issue but the entire personal and economic situation. That is why I also support my clients in selected related areas of law and develop coordinated, practical solutions.",
    items: [
      {
        id: "steuerrecht",
        title: "Tax Law",
        intro:
          "Tax law advice for private individuals and businesses. My firm's bookkeeping team also supports you with ongoing financial and payroll accounting as well as organizational and accounting matters in dealings with the tax office and other authorities.",
        bullets: [
          "Advice and representation in tax matters",
          "Support during tax audits and proceedings before the tax authorities",
          "Preparation of annual financial statements and ongoing tax support",
          "Representation in objection and appeal proceedings",
          "Representation in tax criminal and administrative fine proceedings",
        ],
      },
      {
        id: "migrationsrecht",
        title: "Residence and Migration Law",
        intro:
          "From application to residence permit. I help you find the residence-law path suited to your personal and professional situation.",
        bullets: [
          "Residence for the purpose of employment",
          "Residence for study and training",
          "Residence for self-employment",
          "Family reunification",
          "Change of residence purpose",
          "Extension and securing of existing residence permits",
        ],
      },
      {
        id: "arbeitsrecht",
        title: "Labor Law",
        intro: "Advice on workplace disputes.",
        bullets: [
          "Review and drafting of employment contracts",
          "Advice on dismissals and termination agreements",
          "Enforcement of outstanding salary, vacation compensation, and severance claims",
          "Support with warnings and other workplace disputes",
          "Advice to employers on legally sound structuring of employment relationships",
        ],
      },
      {
        id: "zivilrecht",
        title: "Civil Law",
        intro: "Legal support in selected civil law matters.",
        bullets: [
          "Enforcement of outstanding claims",
          "Defense against unjustified claims",
          "Out-of-court and court representation in selected civil law matters",
          "Legal advice and support in real estate matters",
        ],
      },
    ],
  },

  // MACHINE-TRANSLATED — REVIEW BEFORE LAUNCH. Legal terminology (residence
  // permit sections, e.g. § 24/§ 18a/§ 21 AufenthG) flagged for extra care —
  // German immigration-law paragraph references have no direct translation.
  // MACHINE-TRANSLATED — REVIEW BEFORE LAUNCH
  process: {
    title: "How the First Consultation Works",
    items: [
      {
        title: "Get in Touch",
        desc: "Call me or briefly write via the inquiry form — I'll get back to you promptly.",
      },
      {
        title: "Meeting",
        desc: "In a personal conversation — in person, by phone, or by video call — we discuss your matter in detail.",
      },
      {
        title: "Outcome",
        desc: "You'll get a clear assessment and the next steps for your matter.",
      },
    ],
  },

  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "What does the first consultation cost?",
        a: "The first, short introductory call (approx. 15 minutes) is free of charge and non-binding. I'm happy to discuss the cost of a detailed consultation transparently during our first conversation.",
      },
      {
        q: "What languages do you offer consultations in?",
        a: "I advise in German, Ukrainian, Russian, and English.",
      },
      {
        q: "How does the initial consultation work?",
        a: "After your inquiry, we arrange a short, free introductory call. If needed, a detailed consultation follows — in person in Munich, by phone, or by video call.",
      },
      {
        q: "Do you also offer online consultations?",
        a: "Yes. Consultations are possible both in person in Munich and by phone or video call.",
      },
      {
        q: "What happens when a residence permit under § 24 AufenthG expires?",
        a: "I review in good time with you what follow-up options exist — such as a settlement permit or a change to a different residence title — and support you through the process.",
      },
      {
        q: "Can I switch from § 24 to a different residence title?",
        a: "In many cases, yes — for example via § 18a/18b AufenthG for skilled workers or § 21 AufenthG for the self-employed. I clarify individually whether this applies to you.",
      },
      {
        q: "What is the difference between an attorney and a certified specialist attorney?",
        a: "A specialist-attorney title is earned in addition to bar admission and requires special theoretical knowledge and practical experience in a specific area of law — in my case, tax law.",
      },
      {
        q: "How quickly can I get an appointment?",
        a: "As a rule, I get back to you within a few business days. Simply use the contact form or call me directly.",
      },
    ],
  },

  // MACHINE-TRANSLATED — REVIEW BEFORE LAUNCH
  // MACHINE-TRANSLATED — REVIEW BEFORE LAUNCH
  phoneCta: {
    kicker: "First call — free of charge",
    title: "15 minutes, no obligation",
    lead: "I'll listen to your situation and tell you how I can help — in German, Ukrainian, Russian, or English.",
    cta: "Call now",
  },

  // MACHINE-TRANSLATED — REVIEW BEFORE LAUNCH
  contact: {
    title: "Contact",
    subtitle: "Briefly describe your matter using the inquiry form — I will get back to you promptly.",
    phone: "Call",
    email: "Email",
    address: "Address",
    messenger: "Message",
    hours: "[PLACEHOLDER] Office hours, if any.",
    // MACHINE-TRANSLATED — REVIEW BEFORE LAUNCH
    trust: {
      label: "Volunteer work",
      org: "solidUArity e.V.",
      role: "Board member · Volunteer aid for Ukraine",
    },
    formCard: {
      eyebrow: "Inquiry form",
      title: "A structured path to the right advice",
      body: "Select your area of law in the form and briefly describe your matter — I will get back to you personally, promptly.",
      cta: "Go to the inquiry form",
    },
  },

  kontakt: {
    eyebrow: "Contact",
    title: "Let's Discuss Your Matter",
    subtitle:
      "For a no-obligation initial consultation, reach me by phone, email, or the inquiry form below — I will get back to you personally, promptly.",
    mapCta: "Open in Google Maps",
    formTitle: "Send a message",
    form: {
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "your@email.com" },
      phone: { label: "Phone (optional)", placeholder: "+49 …" },
      topic: {
        label: "Regarding (optional)",
        options: {
          steuerrecht: "Tax Law",
          migrationsrecht: "Migration Law",
          arbeitsrecht: "Labor Law",
          zivilrecht: "Civil Law",
          sonstiges: "Other",
        },
      },
      message: { label: "Message", placeholder: "Briefly describe your matter …" },
      consent: {
        prefix: "I have read the",
        linkLabel: "Privacy Policy",
        suffix: "and agree to the processing of my data.",
      },
      submit: "Send message",
      submitting: "Sending …",
    },
    success: {
      title: "Thank you!",
      body: "Your message has been sent. I will get back to you as soon as possible.",
    },
    errors: {
      required: "Required field.",
      invalidEmail: "Please enter a valid email address.",
      consentRequired: "Please agree to the Privacy Policy.",
      turnstileFailed: "Security check failed. Please try again.",
      turnstileNotReady:
        "Sending this form requires an active security check — please accept cookies, or contact us directly by phone or email.",
      generic: "Something went wrong. Please try again later or contact us by phone.",
    },
  },

  cookieConsent: {
    message:
      "This website uses a technical cookie from Cloudflare Turnstile to protect the contact form from spam.",
    accept: "Accept",
    decline: "Decline",
  },

  // MACHINE-TRANSLATED — REVIEW BEFORE LAUNCH (tagline only)
  footer: {
    tagline: "Attorney for tax law, migration law, labor law, and civil law in Munich.",
    navTitle: "Navigation",
    home: "Home",
    contactTitle: "Contact",
    imprint: "Imprint",
    privacy: "Privacy",
    rights: "All rights reserved.",
  },

  // MACHINE-TRANSLATED — REVIEW BEFORE LAUNCH. Standard sections translated
  // from the client's own English reference draft (not machine-translated);
  // the Cloudflare-specific paragraphs (contact form, cookies, map) are
  // Claude's translation of the German original and should be checked too.
  legal: {
    imprint: {
      title: "Legal Notice",
      intro:
        "This page is a placeholder template following the German § 5 TMG requirements (the German site is the legally authoritative version). All fields marked \"TODO(owner)\" must be replaced with the actual firm details before the site goes live.",
      sections: [
        {
          heading: "Information according to § 5 TMG",
          body: "Olga Gatlin\nAttorney at Law\nLudwigstraße 8\n80539 Munich",
        },
        {
          heading: "Contact",
          body: "Phone: +49 176 7938 8816\nEmail: olga@gatlin.de",
        },
        {
          heading: "Professional title and regulations",
          body: "Professional title: Attorney at Law, certified specialist attorney for tax law (awarded in Germany)\nResponsible chamber: Munich Bar Association (Rechtsanwaltskammer München), TODO(owner): chamber address\nThe following professional regulations apply in particular: German Federal Lawyers' Act (BRAO), Professional Code of Conduct for Lawyers (BORA), Attorneys' Remuneration Act (RVG), Specialist Lawyer Regulations (FAO) — available at www.brak.de.",
        },
        {
          heading: "VAT identification number",
          body: "VAT identification number according to § 27a of the German VAT Act: TODO(owner)",
        },
        {
          heading: "Professional liability insurance",
          body: "Name and registered office of the insurer: TODO(owner)\nGeographical scope: TODO(owner), typically Germany/EU",
        },
        {
          heading: "Responsible for content according to § 55 (2) RStV",
          body: "Olga Gatlin\nAddress as above",
        },
        {
          heading: "EU dispute resolution",
          body: "The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr/. My email address can be found above in this legal notice.",
        },
        {
          heading: "Consumer dispute resolution",
          body: "I am not willing and not obliged to participate in dispute resolution proceedings before a consumer arbitration board.",
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      intro:
        "This page is a placeholder template following the standard GDPR structure; the German version of this page is legally authoritative. All fields marked \"TODO(owner)\" must be completed, and this text should be replaced with an individually reviewed privacy policy before the site goes live.",
      sections: [
        {
          heading: "1. Controller",
          body: "The controller within the meaning of the General Data Protection Regulation (GDPR) is:\nOlga Gatlin\nAttorney at Law\nLudwigstraße 8, 80539 Munich\nPhone: +49 176 7938 8816\nEmail: olga@gatlin.de",
        },
        {
          heading: "2. General information on data processing",
          body: "We only process personal data of our users to the extent necessary to provide a functioning website along with our content and services.",
        },
        {
          heading: "3. Provision of the website and creation of server log files",
          body: "When you visit this website, the hosting provider (Cloudflare Pages) automatically collects information in so-called server log files that your browser transmits automatically (e.g. IP address, date and time of the request, browser type, operating system used, referrer URL). This data is not merged with other data sources.\nTODO(owner): add the retention period of Cloudflare's log files.",
        },
        {
          heading: "4. Contact form",
          body: "If you send us enquiries via the contact form, the information you provide (name, email address, phone number if given, message) is processed in order to handle your enquiry. Processing is based on Art. 6(1)(b) GDPR (pre-contractual enquiry) or Art. 6(1)(f) GDPR (legitimate interest in responding to enquiries).\nTechnically, the form is sent through a dedicated Cloudflare Worker (not a third-party form service): (1) form data is processed by the Worker and forwarded to the firm's email address via Cloudflare Email; (2) Cloudflare Turnstile checks before sending whether the request comes from a human (loads a script, may set a technical cookie — see section 6). TODO(owner): add the legal basis and retention period for this processing yourself or with legal review.",
        },
        {
          heading: "5. Client relationships",
          body: "Within the scope of a client relationship, we process personal data to the extent necessary to provide legal services, to comply with professional obligations, and to assert, exercise or defend legal claims (Art. 6(1)(b), (c) and (f) GDPR). Attorneys are subject to a statutory duty of confidentiality (§ 43a BRAO, § 2 BORA).",
        },
        {
          heading: "6. Cookies",
          body: "This website currently sets one technical cookie from Cloudflare Turnstile, which protects the contact page from spam and is only loaded after you accept the cookie-consent banner. No analytics, marketing, or tracking cookies are used. TODO(owner): add the legal basis/retention period of the Turnstile cookie yourself or with legal review.",
        },
        {
          heading: "7. Map display (Google Maps)",
          body: "The contact page embeds a directions map from Google Maps. Loading the contact page connects to Google's servers, transmitting your IP address and possibly setting a cookie per Google's own privacy policy. TODO(owner): add the legal basis yourself or with legal review.",
        },
        {
          heading: "8. External fonts",
          body: "This website's font (Gilda Display) is served locally and is not loaded from external servers when the page is visited — no data is transmitted to a font provider.",
        },
        {
          heading: "9. Retention period",
          body: "Personal data is deleted as soon as the purpose of storage no longer applies, unless statutory retention periods (including professional and tax-law retention periods) require otherwise, or you have effectively objected to the processing.",
        },
        {
          heading: "10. Your rights as a data subject",
          body: "- Right of access (Art. 15 GDPR)\n- Right to rectification (Art. 16 GDPR)\n- Right to erasure (Art. 17 GDPR)\n- Right to restriction of processing (Art. 18 GDPR)\n- Right to data portability (Art. 20 GDPR)\n- Right to object to processing (Art. 21 GDPR)\n- Right to lodge a complaint with a supervisory authority (Art. 77 GDPR)",
        },
        {
          heading: "11. Competent supervisory authority",
          body: "Bavarian State Office for Data Protection Supervision (BayLDA). TODO(owner): add the full address.",
        },
        {
          heading: "12. SSL/TLS encryption",
          body: "For security reasons and to protect the transmission of confidential content, this site uses SSL/TLS encryption. Cloudflare Pages serves this website over HTTPS by default.",
        },
      ],
    },
  },

  notFound: {
    title: "Page not found",
    body: "[PLACEHOLDER] The page you are looking for may have been moved or no longer exists.",
    backHome: "Back to homepage",
  },

  a11y: {
    skip: "Skip to content",
    primaryNav: "Primary",
    langNav: "Language",
    close: "Close",
    openMenu: "Open menu",
  },
};

export default en;
