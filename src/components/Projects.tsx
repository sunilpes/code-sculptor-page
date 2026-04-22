import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "./FadeIn";

const projects = [
  {
    company: "Verve Group",
    period: "2022 – Present",
    title: "Multi-Region Real-Time Analytics Platform",
    description:
      "Architected a streaming analytics platform processing billions of ad exchange events daily. Designed for sub-second latency delivery of KPIs to publishers and stakeholders worldwide.",
    metrics: [
      { value: "50 TB", label: "processed daily" },
      { value: "~0s", label: "query latency" },
      { value: "Multi-region", label: "fault tolerance" },
    ],
    stack: ["Apache Druid", "Apache Flink", "Apache Kafka", "GKE"],
  },
  {
    company: "Verve Group",
    period: "2022 – 2023",
    title: "500 TB AWS → GCP Cloud Migration",
    description:
      "Led end-to-end migration of the entire data infrastructure from AWS to Google Cloud Platform using Apache Spark on Kubernetes. Reduced costs and significantly improved processing throughput.",
    metrics: [
      { value: "500 TB", label: "migrated" },
      { value: "−35%", label: "storage costs" },
      { value: "+40%", label: "processing speed" },
    ],
    stack: ["Apache Spark", "GKE", "Google Dataproc", "BigQuery"],
  },
  {
    company: "NewsCorp (NTS)",
    period: "2019 – 2022",
    title: "Event-Driven Data Ingestion Platform",
    description:
      "Engineered a Kubernetes-native ingestion system across 15+ heterogeneous data sources for Dow Jones, HarperCollins, and Realtor.com. Built in-warehouse transformation workflows with BigQuery and dbt.",
    metrics: [
      { value: "99.9%", label: "data accuracy" },
      { value: "15+", label: "data sources" },
      { value: "5 TB+", label: "processed daily" },
    ],
    stack: ["Kubernetes", "Apache Beam", "BigQuery", "dbt"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-emerald">
                / 02 — Featured Work
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-silver md:text-5xl">
                Systems built to last.
              </h2>
            </div>
            <p className="hidden max-w-xs text-sm text-silver-dim md:block">
              A selection of high-impact data infrastructure projects.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-6">
          {projects.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-xl border border-border bg-surface/60 p-8 backdrop-blur transition-all hover:border-emerald/40">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                  {/* Left */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs uppercase tracking-widest text-emerald">
                        {p.company}
                      </span>
                      <span className="text-border">·</span>
                      <span className="font-mono text-xs text-silver-dim">{p.period}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-silver">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-silver-dim">{p.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-border bg-background/50 px-2 py-0.5 font-mono text-[11px] text-silver-dim"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 lg:w-72 lg:shrink-0">
                    {p.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg border border-border bg-background/40 p-4 text-center"
                      >
                        <p className="text-xl font-semibold text-emerald">{m.value}</p>
                        <p className="mt-1 font-mono text-[10px] uppercase leading-tight tracking-widest text-silver-dim">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald/5 blur-3xl transition-opacity group-hover:bg-emerald/10"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
