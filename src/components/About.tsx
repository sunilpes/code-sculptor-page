import { FadeIn } from "./FadeIn";

const traits = [
  { label: "Current Role", value: "Senior Data Engineer, Verve Group" },
  { label: "Based in", value: "Hamburg, Germany" },
  { label: "Open to", value: "Consulting · Senior IC · Architecture Reviews" },
  { label: "Languages", value: "English · German · Hindi · Kannada" },
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-emerald">
            / 01 — About
          </p>
        </FadeIn>

        <div className="mt-4 grid gap-16 lg:grid-cols-[1fr_420px] lg:items-start">
          <FadeIn>
            <h2 className="text-3xl font-semibold tracking-tight text-silver md:text-5xl">
              I build for the 3 am incident
              <br />
              <span className="text-gradient-emerald">that never happens.</span>
            </h2>
            <div className="mt-8 space-y-5 text-silver-dim md:text-lg">
              <p>
                Data engineering is not about the technology — it's about the promise of
                reliability. When a pipeline breaks at scale, entire businesses lose visibility.
                My job is to make sure that never happens.
              </p>
              <p>
                Over 14 years I've moved from writing Java for core banking systems to
                architecting real-time streaming platforms that ingest billions of ad events a day.
                The through-line has always been the same: make data trustworthy, fast, and cheap
                to operate.
              </p>
              <p>
                I care about clean abstractions, observable systems, and not reinventing what
                already works. I mentor junior engineers and believe that a well-documented
                pipeline is as important as a fast one.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-xl border border-border bg-surface/60 p-6 backdrop-blur">
              <div className="divide-y divide-border">
                {traits.map((t) => (
                  <div key={t.label} className="flex flex-col gap-0.5 py-4 first:pt-0 last:pb-0">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-silver-dim">
                      {t.label}
                    </p>
                    <p className="text-sm text-silver">{t.value}</p>
                  </div>
                ))}
              </div>
              <a
                href="https://raw.githubusercontent.com/sunilpes/code-sculptor-page/main/public/sunil-pandith-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-md border border-emerald/40 bg-emerald/10 px-4 py-3 font-mono text-xs uppercase tracking-widest text-emerald transition-all hover:bg-emerald/20 hover:glow-emerald"
              >
                Download CV
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
