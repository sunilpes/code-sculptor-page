import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useLocation } from "@tanstack/react-router";

type Status = "idle" | "sending" | "sent" | "error" | "cooldown";

const COOLDOWN_SECONDS = 60;
const COOLDOWN_KEY = "chat_cooldown_until";
// Turnstile site key — set to your key from Cloudflare dashboard to enable.
// Leave empty to skip the challenge.
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? "";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string | undefined;
    };
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // never shown to users
  const [status, setStatus] = useState<Status>(() => {
    const until = parseInt(localStorage.getItem(COOLDOWN_KEY) ?? "0", 10);
    return until > Date.now() ? "cooldown" : "idle";
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [cooldownLeft, setCooldownLeft] = useState(() => {
    const until = parseInt(localStorage.getItem(COOLDOWN_KEY) ?? "0", 10);
    return Math.max(0, Math.ceil((until - Date.now()) / 1000));
  });
  const [turnstileToken, setTurnstileToken] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string>("");
  const cooldownTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const location = useLocation();

  // Focus textarea when panel opens
  useEffect(() => {
    if (open && (status === "idle" || status === "error")) {
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  }, [open, status]);

  // Load Turnstile script once if a site key is configured
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || document.getElementById("cf-turnstile-script")) return;
    const s = document.createElement("script");
    s.id = "cf-turnstile-script";
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true;
    document.head.appendChild(s);
  }, []);

  // Render Turnstile widget when panel opens
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !open || !turnstileRef.current) return;
    if (turnstileWidgetId.current) return;

    const tryRender = () => {
      if (!window.turnstile || !turnstileRef.current) return;
      turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "dark",
        callback: (token: string) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
      });
    };

    // Script may still be loading
    const interval = setInterval(() => {
      if (window.turnstile) {
        clearInterval(interval);
        tryRender();
      }
    }, 200);
    return () => clearInterval(interval);
  }, [open]);

  // Cleanup Turnstile widget on close
  useEffect(() => {
    if (!open && turnstileWidgetId.current && window.turnstile) {
      window.turnstile.remove(turnstileWidgetId.current);
      turnstileWidgetId.current = "";
      setTurnstileToken("");
    }
  }, [open]);

  const startCooldownTimer = useCallback(() => {
    cooldownTimer.current = setInterval(() => {
      setCooldownLeft((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownTimer.current!);
          localStorage.removeItem(COOLDOWN_KEY);
          setStatus("idle");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const startCooldown = useCallback(() => {
    const until = Date.now() + COOLDOWN_SECONDS * 1000;
    localStorage.setItem(COOLDOWN_KEY, String(until));
    setCooldownLeft(COOLDOWN_SECONDS);
    setStatus("cooldown");
    startCooldownTimer();
  }, [startCooldownTimer]);

  // Resume cooldown timer if one is still active after a page refresh
  useEffect(() => {
    const until = parseInt(localStorage.getItem(COOLDOWN_KEY) ?? "0", 10);
    if (until > Date.now()) {
      startCooldownTimer();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => { if (cooldownTimer.current) clearInterval(cooldownTimer.current); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || status === "sending" || status === "cooldown") return;

    // Honeypot check — silently succeed if a bot filled the hidden field
    if (honeypot) {
      setStatus("sent");
      return;
    }

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setErrorMsg("Please complete the security check.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          page: location.pathname,
          ...(TURNSTILE_SITE_KEY ? { turnstileToken } : {}),
        }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setErrorMsg(data.error ?? "Too many requests. Please wait.");
        startCooldown();
      } else if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Try again.");
        setStatus("error");
        if (turnstileWidgetId.current && window.turnstile) {
          window.turnstile.reset(turnstileWidgetId.current);
          setTurnstileToken("");
        }
      } else {
        setStatus("sent");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  function handleReset() {
    setName("");
    setMessage("");
    setStatus("idle");
    setErrorMsg("");
    if (turnstileWidgetId.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId.current);
      setTurnstileToken("");
    }
  }

  const canSubmit =
    message.trim().length > 0 &&
    status !== "sending" &&
    status !== "cooldown" &&
    (!TURNSTILE_SITE_KEY || !!turnstileToken);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Send a message"}
        className={`fixed bottom-6 right-6 z-50 grid h-13 w-13 place-items-center rounded-full shadow-lg transition-all duration-200 ${
          open
            ? "border border-border bg-surface text-silver-dim hover:text-silver"
            : "bg-emerald text-background hover:scale-105 hover:shadow-xl hover:shadow-emerald/30"
        }`}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/40">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald/15 text-emerald">
              <MessageCircle className="h-4 w-4" />
            </span>
            <div>
              <p className="font-mono text-sm font-medium text-silver">Send a message</p>
              <p className="font-mono text-[10px] text-silver-dim">Goes straight to my Telegram</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            {status === "sent" ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <CheckCircle className="h-10 w-10 text-emerald" />
                <p className="font-mono text-sm font-medium text-silver">Message sent!</p>
                <p className="font-mono text-xs text-silver-dim">I'll get back to you soon.</p>
                <button
                  onClick={handleReset}
                  className="mt-2 rounded-md border border-border px-4 py-1.5 font-mono text-xs text-silver-dim transition-colors hover:border-emerald/40 hover:text-silver"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Honeypot — hidden from real users, bots fill it in */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
                />

                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  className="h-9 w-full rounded-md border border-border bg-background px-3 font-mono text-xs text-silver placeholder:text-silver-dim/50 focus:border-emerald/40 focus:outline-none"
                />

                <textarea
                  ref={textareaRef}
                  placeholder="What's on your mind?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={2000}
                  rows={4}
                  required
                  className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 font-mono text-xs text-silver placeholder:text-silver-dim/50 focus:border-emerald/40 focus:outline-none"
                />

                {/* Turnstile widget (only rendered when VITE_TURNSTILE_SITE_KEY is set) */}
                {TURNSTILE_SITE_KEY && <div ref={turnstileRef} />}

                {(status === "error" || status === "cooldown") && (
                  <div className={`flex items-center gap-2 rounded-md border px-3 py-2 font-mono text-xs ${
                    status === "cooldown"
                      ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                      : "border-destructive/30 bg-destructive/10 text-destructive"
                  }`}>
                    {status === "cooldown"
                      ? <Clock className="h-3.5 w-3.5 shrink-0" />
                      : <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    }
                    {status === "cooldown"
                      ? `Please wait ${cooldownLeft}s before sending again.`
                      : errorMsg
                    }
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="flex h-9 items-center justify-center gap-2 rounded-md bg-emerald font-mono text-xs font-medium text-background transition-all hover:bg-emerald/90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {status === "sending" ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                      Sending…
                    </>
                  ) : status === "cooldown" ? (
                    <>
                      <Clock className="h-3.5 w-3.5" />
                      Wait {cooldownLeft}s
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      Send message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
