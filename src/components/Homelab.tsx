import { Shield, HardDrive, Zap } from "lucide-react";
import { FadeIn } from "./FadeIn";

const lines: { prompt?: string; out?: string; cls?: string }[] = [
  { prompt: "$ uname -a", out: "Darwin macmini.local arm64 — Apple M2" },
  { prompt: "$ docker ps --format '{{.Names}}'" },
  { out: "  n8n-orchestrator       up 47d", cls: "text-emerald" },
  { out: "  postgres-warehouse     up 47d", cls: "text-emerald" },
  { out: "  etl-runner             up 12h", cls: "text-emerald" },
  { out: "  cloudflared-tunnel     up 47d", cls: "text-emerald" },
  { prompt: "$ cloudflared tunnel info homelab" },
  { out: "  STATUS: healthy   ZERO_TRUST: enforced", cls: "text-silver" },
  { prompt: "$ ./pipeline run --flow daily_ingest" },
  { out: "  ✓ extract  → 14.2M rows", cls: "text-silver-dim" },
  { out: "  ✓ transform → dbt models: 87/87", cls: "text-silver-dim" },
  { out: "  ✓ load     → snowflake.analytics", cls: "text-silver-dim" },
  { out: "  done in 3m 42s", cls: "text-emerald" },
  { prompt: "$ _" },
];

export function Homelab() {
  return (
    <section id="homelab" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-emerald">
              / 02 — The Homelab
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-silver md:text-5xl">
              A production-grade lab on a Mac Mini.
            </h2>
            <p className="mt-6 max-w-xl text-silver-dim">
              A self-hosted data platform running 24/7 — orchestration with{" "}
              <span className="text-silver">n8n</span>, local{" "}
              <span className="text-silver">ETL pipelines</span>, and a Postgres warehouse.
              Exposed safely through{" "}
              <span className="text-emerald">Cloudflare Zero Trust Tunnels</span> — no open
              ports, no compromise.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { icon: Shield, label: "Zero Trust", value: "Cloudflare" },
                { icon: HardDrive, label: "Storage", value: "2 TB NVMe" },
                { icon: Zap, label: "Uptime", value: "99.97%" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="rounded-lg border border-border bg-surface/60 p-4 backdrop-blur"
                  >
                    <Icon className="h-4 w-4 text-emerald" />
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-silver-dim">
                      {s.label}
                    </p>
                    <p className="mt-1 font-mono text-sm text-silver">{s.value}</p>
                  </div>
                );
              })}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
              {/* Title bar */}
              <div className="flex items-center justify-between border-b border-border bg-background/70 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald/90" />
                </div>
                <p className="font-mono text-xs text-silver-dim">
                  sunil@macmini — ~/lab — zsh
                </p>
                <span className="w-10" />
              </div>
              {/* Body */}
              <div className="bg-[oklch(0.13_0.018_256)] p-5 font-mono text-[13px] leading-relaxed">
                {lines.map((l, i) => (
                  <div key={i} className={l.cls ?? "text-silver"}>
                    {l.prompt && <span className="text-emerald">{l.prompt}</span>}
                    {l.out}
                    {i === lines.length - 1 && (
                      <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-emerald align-middle" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
