interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  TURNSTILE_SECRET_KEY?: string;
}

interface ChatRequest {
  name?: string;
  message?: string;
  page?: string;
  website?: string; // honeypot
  turnstileToken?: string;
}

const TELEGRAM_API = "https://api.telegram.org";
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

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") {
      return json({ error: "Method not allowed." }, 405);
    }

    const ip =
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for") ??
      "unknown";

    if (isRateLimited(ip)) {
      return json({ error: "Too many requests. Please wait a moment." }, 429);
    }

    let body: ChatRequest;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid request." }, 400);
    }

    // Honeypot — silently succeed so bots think they got through
    if (body.website) {
      return json({ ok: true });
    }

    // Turnstile (optional — only active when secret key is set)
    if (env.TURNSTILE_SECRET_KEY) {
      if (!body.turnstileToken) {
        return json({ error: "Security check required." }, 400);
      }
      const valid = await verifyTurnstile(body.turnstileToken, env.TURNSTILE_SECRET_KEY, ip);
      if (!valid) {
        return json({ error: "Security check failed. Please try again." }, 403);
      }
    }

    const name = (body.name ?? "").trim().slice(0, 100);
    const message = (body.message ?? "").trim().slice(0, 2000);
    const page = (body.page ?? "").trim().slice(0, 100);

    if (!message) {
      return json({ error: "Message is required." }, 400);
    }

    const displayName = name || "Anonymous";
    const timestamp = new Date().toUTCString().replace(" GMT", " UTC");

    const text =
      `💬 *Portfolio message*\n\n` +
      `👤 *From:* ${escapeMarkdown(displayName)}\n` +
      `💭 *Message:*\n${escapeMarkdown(message)}\n\n` +
      `📍 ${escapeMarkdown(page || "/")}  ·  ${escapeMarkdown(timestamp)}`;

    const telegramRes = await fetch(
      `${TELEGRAM_API}/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text,
          parse_mode: "MarkdownV2",
        }),
      },
    );

    if (!telegramRes.ok) {
      console.error("Telegram error:", await telegramRes.text());
      return json({ error: "Failed to send message." }, 502);
    }

    return json({ ok: true });
  },
} satisfies ExportedHandler<Env>;
