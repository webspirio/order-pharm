import { useEffect, useRef, useState } from "react";
import { Loader2, Mail, Phone } from "lucide-react";
import {
  COOKIE_CONSENT_EVENT,
  getCookieConsent,
  type CookieConsentChoice,
} from "@/lib/cookieConsent";

type TopicKey = "steuerrecht" | "migrationsrecht" | "arbeitsrecht" | "zivilrecht" | "sonstiges";
const TOPIC_KEYS: TopicKey[] = [
  "steuerrecht",
  "migrationsrecht",
  "arbeitsrecht",
  "zivilrecht",
  "sonstiges",
];

interface Labels {
  name: { label: string; placeholder: string };
  email: { label: string; placeholder: string };
  phone: { label: string; placeholder: string };
  topic: { label: string; options: Record<TopicKey, string> };
  message: { label: string; placeholder: string };
  consent: { prefix: string; linkLabel: string; suffix: string };
  submit: string;
  submitting: string;
}

interface Errors {
  required: string;
  invalidEmail: string;
  consentRequired: string;
  turnstileFailed: string;
  turnstileNotReady: string;
  generic: string;
}

interface Props {
  workerUrl: string;
  turnstileSiteKey: string;
  labels: Labels;
  privacyHref: string;
  success: { title: string; body: string };
  errors: Errors;
  phoneHref?: string;
  phoneDisplay?: string;
  mailHref: string;
  email: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          appearance?: "always" | "execute" | "interaction-only";
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

const TURNSTILE_SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitState = "idle" | "submitting" | "success" | "error";
type ErrorReason = "turnstile" | "not-ready" | "generic";

export default function ContactForm({
  workerUrl,
  turnstileSiteKey,
  labels,
  privacyHref,
  success,
  errors,
  phoneHref,
  phoneDisplay,
  mailHref,
  email,
}: Props) {
  const [name, setName] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState<TopicKey | null>(null);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [consentChoice, setConsentChoice] = useState<CookieConsentChoice | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorReason, setErrorReason] = useState<ErrorReason | null>(null);

  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    setConsentChoice(getCookieConsent());
    const onChange = (e: Event) =>
      setConsentChoice((e as CustomEvent<CookieConsentChoice>).detail);
    window.addEventListener(COOKIE_CONSENT_EVENT, onChange);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onChange);
  }, []);

  // Load Turnstile only once cookies are accepted, per the consent banner —
  // never render it while consent is declined or not yet decided.
  useEffect(() => {
    if (consentChoice !== "accepted" || !turnstileSiteKey || !widgetRef.current) return;
    if (widgetId.current) return; // already rendered for this mount

    function renderWidget() {
      if (!window.turnstile || !widgetRef.current) return;
      widgetId.current = window.turnstile.render(widgetRef.current, {
        sitekey: turnstileSiteKey,
        appearance: "interaction-only",
        callback: (token) => setTurnstileToken(token),
        "error-callback": () => setTurnstileToken(null),
        "expired-callback": () => setTurnstileToken(null),
      });
    }

    if (window.turnstile) {
      renderWidget();
      return;
    }
    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", renderWidget);
    document.head.appendChild(script);
  }, [consentChoice, turnstileSiteKey]);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = errors.required;
    if (!emailValue.trim()) next.email = errors.required;
    else if (!EMAIL_RE.test(emailValue)) next.email = errors.invalidEmail;
    if (!message.trim()) next.message = errors.required;
    if (!consent) next.consent = errors.consentRequired;
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    if (!turnstileToken) {
      setSubmitState("error");
      setErrorReason("not-ready");
      return;
    }

    setSubmitState("submitting");
    setErrorReason(null);

    try {
      const res = await fetch(workerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: emailValue,
          phone,
          topic,
          message,
          turnstileToken,
        }),
      });

      if (res.ok) {
        setSubmitState("success");
        return;
      }

      const body = (await res.json().catch(() => null)) as { reason?: string } | null;
      setSubmitState("error");
      if (body?.reason === "turnstile") {
        setErrorReason("turnstile");
        setTurnstileToken(null);
        if (widgetId.current) window.turnstile?.reset(widgetId.current);
      } else {
        setErrorReason("generic");
      }
    } catch {
      setSubmitState("error");
      setErrorReason("generic");
    }
  }

  if (submitState === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <h3 className="text-xl">{success.title}</h3>
        <p className="mt-2 text-muted-foreground">{success.body}</p>
      </div>
    );
  }

  const errorMessage =
    errorReason === "turnstile"
      ? errors.turnstileFailed
      : errorReason === "not-ready"
        ? errors.turnstileNotReady
        : errorReason === "generic"
          ? errors.generic
          : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <label htmlFor="cf-name" className="mb-1.5 block text-sm font-semibold">
          {labels.name.label}
        </label>
        <input
          id="cf-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={labels.name.placeholder}
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 outline-none focus:border-brand-500"
        />
        {fieldErrors.name && <p className="mt-1 text-sm text-destructive">{fieldErrors.name}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-semibold">
            {labels.email.label}
          </label>
          <input
            id="cf-email"
            type="email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder={labels.email.placeholder}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 outline-none focus:border-brand-500"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-destructive">{fieldErrors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="cf-phone" className="mb-1.5 block text-sm font-semibold">
            {labels.phone.label}
          </label>
          <input
            id="cf-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={labels.phone.placeholder}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 outline-none focus:border-brand-500"
          />
        </div>
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-semibold">{labels.topic.label}</span>
        {/* Individually-bordered pills (matching GalleryGrid.tsx's filter
            chips) rather than one hairline-divided box: a single divided
            box only draws its dividers/rounded corners correctly for one
            unbroken row — once flex-wrap moves a pill onto a second line
            on mobile/tablet, divide-x still adds a border to every non-first
            child regardless of row, leaving a stray line at the start of
            the wrapped row and unrounded seams between rows. Independent
            pills with their own border + gap-2 spacing wrap cleanly at any
            width. */}
        <div className="flex flex-wrap gap-2">
          {TOPIC_KEYS.map((key) => {
            const active = topic === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => setTopic(active ? null : key)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "border-brand-500/40 bg-brand-500/20 font-semibold text-brand-700 dark:border-brand-400/30 dark:text-brand-400"
                    : "border-border text-foreground/70 hover:bg-accent/50"
                }`}
              >
                {labels.topic.options[key]}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-semibold">
          {labels.message.label}
        </label>
        <textarea
          id="cf-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={labels.message.placeholder}
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 outline-none focus:border-brand-500"
        />
        {fieldErrors.message && (
          <p className="mt-1 text-sm text-destructive">{fieldErrors.message}</p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-brand-500"
          />
          <span>
            {labels.consent.prefix}{" "}
            <a href={privacyHref} className="underline hover:text-foreground">
              {labels.consent.linkLabel}
            </a>{" "}
            {labels.consent.suffix}
          </span>
        </label>
        {fieldErrors.consent && (
          <p className="mt-1 text-sm text-destructive">{fieldErrors.consent}</p>
        )}
      </div>

      {/* Turnstile mounts here in interaction-only mode — invisible unless
          Cloudflare decides a real challenge is needed. Empty when consent
          hasn't been accepted yet. */}
      <div ref={widgetRef} />

      {errorMessage && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
          <p>{errorMessage}</p>
          <div className="mt-2 flex flex-wrap gap-4">
            {phoneHref && (
              <a href={phoneHref} className="inline-flex items-center gap-1.5 font-semibold underline">
                <Phone className="size-4" />
                {phoneDisplay}
              </a>
            )}
            <a href={mailHref} className="inline-flex items-center gap-1.5 font-semibold underline">
              <Mail className="size-4" />
              {email}
            </a>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={submitState === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground disabled:opacity-60"
      >
        {submitState === "submitting" && <Loader2 className="size-4 animate-spin" />}
        {submitState === "submitting" ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}
