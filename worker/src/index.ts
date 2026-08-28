/**
 * Sidecar Worker for the /kontakt/ contact form (see the site's
 * ContactForm.tsx island, which POSTs here as JSON).
 *
 * Flow: validate payload -> verify Turnstile token -> send email via the
 * Workers Email API -> reply with a `reason` bucket the frontend maps to one
 * of three user-facing messages (turnstile / not-ready / generic). Cloudflare
 * error *codes* are never sent to the browser — only logged here, server-side,
 * so rate-limit spam and "I forgot to configure something" stay distinguishable
 * to whoever reads `wrangler tail` without ever being exposed to a visitor.
 */

interface Env {
  EMAIL: { send: (message: EmailMessage) => Promise<{ messageId: string }> };
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
  ALLOWED_ORIGIN: string;
  TURNSTILE_SECRET_KEY: string;
}

interface EmailMessage {
  to: string;
  from: string;
  subject: string;
  text: string;
  replyTo?: string;
}

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  topic?: string;
  message: string;
  turnstileToken: string;
}

type Reason = "validation" | "turnstile" | "generic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function corsHeaders(origin: string): HeadersInit {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(body: unknown, status: number, origin: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
}

function fail(reason: Reason, status: number, origin: string): Response {
  return json({ ok: false, reason }, status, origin);
}

async function verifyTurnstile(
  token: string,
  secret: string,
  remoteIp: string | null,
): Promise<boolean> {
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (remoteIp) form.append("remoteip", remoteIp);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });
  const data = (await res.json()) as { success: boolean; "error-codes"?: string[] };
  if (!data.success) {
    console.error("turnstile verification failed", data["error-codes"]?.join(","));
  }
  return data.success === true;
}

function isValidPayload(value: unknown): value is ContactPayload {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.name === "string" &&
    v.name.trim().length > 0 &&
    typeof v.email === "string" &&
    EMAIL_RE.test(v.email) &&
    typeof v.message === "string" &&
    v.message.trim().length > 0 &&
    typeof v.turnstileToken === "string" &&
    v.turnstileToken.length > 0 &&
    (v.phone === undefined || typeof v.phone === "string") &&
    (v.topic === undefined || v.topic === null || typeof v.topic === "string")
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = env.ALLOWED_ORIGIN;

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") {
      return fail("validation", 405, origin);
    }

    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return fail("validation", 400, origin);
    }

    if (!isValidPayload(payload)) {
      return fail("validation", 400, origin);
    }

    const remoteIp = request.headers.get("CF-Connecting-IP");
    const verified = await verifyTurnstile(payload.turnstileToken, env.TURNSTILE_SECRET_KEY, remoteIp);
    if (!verified) {
      // TEMP DEBUG — remove after diagnosing: never logs/exposes the secret
      // itself, only whether it's bound at all and its length.
      return json(
        {
          ok: false,
          reason: "turnstile",
          debugSecretBound: env.TURNSTILE_SECRET_KEY !== undefined,
          debugSecretLen: env.TURNSTILE_SECRET_KEY?.length ?? -1,
        },
        400,
        origin,
      );
    }

    const subjectTopic = payload.topic ? `${payload.topic} — ` : "";
    const bodyLines = [
      `Name: ${payload.name}`,
      `E-Mail: ${payload.email}`,
      payload.phone ? `Telefon: ${payload.phone}` : null,
      payload.topic ? `Anliegen: ${payload.topic}` : null,
      "",
      payload.message,
    ].filter((line): line is string => line !== null);

    try {
      await env.EMAIL.send({
        to: env.CONTACT_TO_EMAIL,
        from: env.CONTACT_FROM_EMAIL,
        subject: `Kontaktformular: ${subjectTopic}${payload.name}`,
        text: bodyLines.join("\n"),
        // Critical: lets the recipient just hit "Reply" in her inbox and
        // reach the actual visitor, not the technical sending address that
        // E_SENDER_NOT_VERIFIED rules force CONTACT_FROM_EMAIL to be.
        replyTo: payload.email,
      });
      return json({ ok: true }, 200, origin);
    } catch (error) {
      // error.code is one of Cloudflare's documented Email API codes, e.g.
      // E_SENDER_NOT_VERIFIED, E_RATE_LIMIT_EXCEEDED, E_DAILY_LIMIT_EXCEEDED,
      // E_RECIPIENT_SUPPRESSED. Logged with its exact code for debugging;
      // the visitor only ever sees the generic "reason" bucket.
      const err = error as { code?: string; message?: string };
      console.error("email send failed", err.code ?? "UNKNOWN", err.message ?? String(error));
      return fail("generic", 502, origin);
    }
  },
};
