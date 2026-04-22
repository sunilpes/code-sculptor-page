import { Mail, Github, Linkedin, ArrowUpRight, MapPin } from "lucide-react";
import { FadeIn } from "./FadeIn";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@sunilpandith.me",
    href: "mailto:hello@sunilpandith.me",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/sunilpandith",
    href: "https://www.linkedin.com/in/sunilpandith",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@sunilpandith",
    href: "https://github.com/sunilpandith",
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-emerald">
            / 04 — Contact
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-silver md:text-5xl">
            Architecting a data platform? Let's talk.
          </h2>
          <p className="mt-4 max-w-2xl text-silver-dim">
            Open to consulting engagements, senior IC roles, and architecture reviews.
            Reply within one business day.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {channels.map((c, i) => {
            const Icon = c.icon;
            return (
              <FadeIn key={c.label} delay={i * 0.08}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between rounded-xl border border-border bg-surface/60 p-6 backdrop-blur transition-all hover:border-emerald/50 hover:bg-surface"
                >
                  <div className="flex items-start justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-lg bg-emerald/10 text-emerald">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-silver-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald" />
                  </div>
                  <div className="mt-10">
                    <p className="font-mono text-xs uppercase tracking-widest text-silver-dim">
                      {c.label}
                    </p>
                    <p className="mt-1 font-mono text-base text-silver">{c.value}</p>
                  </div>
                </a>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <p className="font-mono text-xs text-silver-dim">
          © {new Date().getFullYear()} Sunil Pandith — Data Engineering Architecture.
        </p>
        <div className="flex items-center gap-2 font-mono text-xs text-silver-dim">
          <MapPin className="h-3.5 w-3.5 text-emerald" />
          <span>Location:</span>
          <span className="text-silver">Hamburg, Germany</span>
          <span className="relative ml-2 flex h-2 w-2">
            <span className="pulse-dot absolute inline-flex h-full w-full rounded-full" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
          </span>
        </div>
      </div>
    </footer>
  );
}
