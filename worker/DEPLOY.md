# Chat Worker — Deployment Guide

The chat widget on the portfolio sends messages to Telegram via a Cloudflare Worker
deployed at `dev.sunilpandith.me/api/chat`. GitHub Pages hosts the frontend; Cloudflare
intercepts `/api/*` requests and routes them to the Worker.

## Architecture

```
dev.sunilpandith.me/api/chat  →  Cloudflare Worker  →  Telegram Bot
dev.sunilpandith.me/*         →  GitHub Pages
```

---

## Deploy (run once)

```bash
npx wrangler deploy
```

Deploys `worker/chat.ts` to Cloudflare as `portfolio-chat`.

---

## Set secrets

```bash
npx wrangler secret put TELEGRAM_BOT_TOKEN
# paste the bot token from @BotFather

npx wrangler secret put TELEGRAM_CHAT_ID
# paste your personal Telegram numeric ID (get it from @userinfobot)
```

Secrets are stored securely in Cloudflare — never in any file.

---

## Add the Worker Route in Cloudflare dashboard

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → select `sunilpandith.me`
2. Left sidebar → **Workers Routes**
3. Click **Add Route**
4. Route: `dev.sunilpandith.me/api/*`
5. Worker: select `portfolio-chat`
6. Save

---

## Local development

Requires two terminals:

```bash
# Terminal 1 — Vite frontend
npm run dev

# Terminal 2 — Worker (reads .dev.vars for secrets)
npm run dev:worker
```

Create `.dev.vars` in the project root (already gitignored):

```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

Then open `http://localhost:8787` to test with the Worker running.

---

## Optional: Enable Cloudflare Turnstile (CAPTCHA)

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Turnstile** → Create site
2. Add **Site Key** to Cloudflare Pages env as `VITE_TURNSTILE_SITE_KEY`
3. Add **Secret Key** as a Worker secret:
   ```bash
   npx wrangler secret put TURNSTILE_SECRET_KEY
   ```

The widget and server verification are already wired in — adding the keys activates it.

---

## Redeploy after changes

```bash
npx wrangler deploy
```
