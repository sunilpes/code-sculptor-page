import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Terminal } from "lucide-react";

const links = [
  { href: "#competencies", label: "Competencies" },
  { href: "#homelab", label: "Homelab" },
  { href: "#milestones", label: "Milestones" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 font-mono text-sm tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-emerald/10 text-emerald">
            <Terminal className="h-4 w-4" />
          </span>
          <span className="text-silver">sunil<span className="text-emerald">.</span>pandith</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-widest text-silver-dim transition-colors hover:text-emerald"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-md border border-emerald/40 bg-emerald/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-emerald transition-all hover:bg-emerald/20 hover:glow-emerald md:inline-block"
        >
          Get in Touch
        </a>

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
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-md border border-emerald/40 bg-emerald/10 px-4 py-3 text-center font-mono text-xs uppercase tracking-widest text-emerald"
            >
              Get in Touch
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
