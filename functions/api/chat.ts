interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  TURNSTILE_SECRET_KEY?: string; // optional — set to enable Cloudflare Turnstile
}

interface ChatRequest {
  name: string;
  message: string;
  page?: string;
  turnstileToken?: string;
}

const TELEGRAM_API = "https://api.telegram.org";

// In-memory rate limit: max 3 requests per IP per 60s window
const rateLimitMap = new Map<string, { count: number; reset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = await res.json<{ success: boolean }>();
  return data.success === true;
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!\\-]/g, "\\$&");
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const ip =
    context.request.headers.get("cf-connecting-ip") ??
    context.request.headers.get("x-forwarded-for") ??
    "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 },
    );
  }

  let body: ChatRequest;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: if the hidden field has a value, silently succeed (don't deliver)
  if ((body as Record<string, unknown>).website) {
    return Response.json({ ok: true });
  }

  // Turnstile verification (only when secret key is configured)
  if (context.env.TURNSTILE_SECRET_KEY) {
    if (!body.turnstileToken) {
      return Response.json({ error: "Security check required." }, { status: 400 });
    }
    const valid = await verifyTurnstile(body.turnstileToken, context.env.TURNSTILE_SECRET_KEY, ip);
    if (!valid) {
      return Response.json({ error: "Security check failed. Please try again." }, { status: 403 });
    }
  }

  const name = (body.name ?? "").trim().slice(0, 100);
  const message = (body.message ?? "").trim().slice(0, 2000);
  const page = (body.page ?? "").trim().slice(0, 100);

  if (!message) {
    return Response.json({ error: "Message is required." }, { status: 400 });
  }

  const displayName = name || "Anonymous";
  const timestamp = new Date().toUTCString().replace(" GMT", " UTC");

  const text =
    `💬 *Portfolio message*\n\n` +
    `👤 *From:* ${escapeMarkdown(displayName)}\n` +
    `💭 *Message:*\n${escapeMarkdown(message)}\n\n` +
    `📍 ${escapeMarkdown(page || "/")}  ·  ${escapeMarkdown(timestamp)}`;

  const telegramRes = await fetch(
    `${TELEGRAM_API}/bot${context.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: context.env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: "MarkdownV2",
      }),
    },
  );

  if (!telegramRes.ok) {
    const err = await telegramRes.text();
    console.error("Telegram API error:", err);
    return Response.json({ error: "Failed to send message." }, { status: 502 });
  }

  return Response.json({ ok: true });
};
