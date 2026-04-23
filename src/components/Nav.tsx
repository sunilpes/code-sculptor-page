import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Terminal } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/content";

export function Nav() {
  const [open, setOpen] = useState(false);
  const { lang, t } = useLanguage();

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#milestones", label: t.nav.milestones },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          to="/$lang"
          params={{ lang }}
          className="group relative flex items-center gap-2 font-mono text-sm tracking-tight"
        >
          <span
            className="pointer-events-none absolute bottom-[-20px] left-1/2 h-20 w-32 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "radial-gradient(ellipse at bottom, oklch(0.696 0.17 162.48 / 0.25) 0%, transparent 70%)" }}
          />
          <span className="grid h-8 w-8 place-items-center rounded-md bg-emerald/10 text-emerald">
            <Terminal className="h-4 w-4" />
          </span>
          <span className="text-silver">sunil <span className="text-emerald">pandith</span></span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-mono text-xs uppercase tracking-widest text-silver-dim transition-colors hover:text-emerald"
            >
              <span
                className="pointer-events-none absolute bottom-[-20px] left-1/2 h-20 w-24 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "radial-gradient(ellipse at bottom, oklch(0.696 0.17 162.48 / 0.25) 0%, transparent 70%)" }}
              />
              {l.label}
            </a>
          ))}
          <Link
            to="/$lang/reading"
            params={{ lang }}
            className="group relative font-mono text-xs uppercase tracking-widest text-silver-dim transition-colors hover:text-emerald"
          >
            <span
              className="pointer-events-none absolute bottom-[-20px] left-1/2 h-20 w-24 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "radial-gradient(ellipse at bottom, oklch(0.696 0.17 162.48 / 0.25) 0%, transparent 70%)" }}
            />
            {t.nav.reading}
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LangToggle currentLang={lang} />
          <a
            href="#contact"
            className="rounded-md border border-emerald/40 bg-emerald/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-emerald transition-all hover:bg-emerald/20 hover:glow-emerald"
          >
            {t.nav.getInTouch}
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-md border border-border text-silver md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/50 py-3 font-mono text-sm uppercase tracking-widest text-silver-dim hover:text-emerald"
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/$lang/reading"
              params={{ lang }}
              onClick={() => setOpen(false)}
              className="border-b border-border/50 py-3 font-mono text-sm uppercase tracking-widest text-silver-dim hover:text-emerald"
            >
              {t.nav.reading}
            </Link>
            <div className="mt-4 flex items-center justify-between gap-3">
              <LangToggle currentLang={lang} onNavigate={() => setOpen(false)} />
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-md border border-emerald/40 bg-emerald/10 px-4 py-3 text-center font-mono text-xs uppercase tracking-widest text-emerald"
              >
                {t.nav.getInTouch}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function LangToggle({
  currentLang,
  onNavigate,
}: {
  currentLang: Language;
  onNavigate?: () => void;
}) {
  const btn = (code: Language, label: string) => (
    <Link
      key={code}
      to="/$lang"
      params={{ lang: code }}
      resetScroll={false}
      onClick={onNavigate}
      aria-pressed={currentLang === code}
      className={`px-2 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors ${
        currentLang === code ? "text-emerald" : "text-silver-dim hover:text-silver"
      }`}
    >
      {label}
    </Link>
  );
  return (
    <div className="flex items-center rounded-md border border-border bg-surface/60 px-1 backdrop-blur">
      {btn("en", "EN")}
      <span className="text-border">|</span>
      {btn("de", "DE")}
    </div>
  );
}
