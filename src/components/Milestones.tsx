import { FadeIn } from "./FadeIn";

const milestones = [
  {
    year: "2011",
    title: "Foundations in ETL",
    body: "Began as an ETL developer — Informatica, SSIS, batch-window discipline.",
  },
  {
    year: "2014",
    title: "Big Data Era",
    body: "Migrated to the Hadoop ecosystem — MapReduce, Hive, and the rise of YARN.",
  },
  {
    year: "2017",
    title: "Spark & Streaming",
    body: "Replaced batch-first thinking with Spark and Kafka-driven near-real-time pipelines.",
  },
  {
    year: "2019",
    title: "Cloud Warehousing",
    body: "Architected Snowflake & BigQuery platforms — separation of storage and compute.",
  },
  {
    year: "2021",
    title: "Modern Data Stack",
    body: "Adopted dbt, Airflow, and DataOps — treating analytics as software.",
  },
  {
    year: "2025",
    title: "Lakehouse & Beyond",
    body: "Designing open-table architectures (Iceberg, Delta) for unified BI + ML workloads.",
  },
];

export function Milestones() {
  return (
    <section id="milestones" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-emerald">
            / 03 — Career Milestones
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-silver md:text-5xl">
            14 years through the evolution of data.
          </h2>
          <p className="mt-4 max-w-2xl text-silver-dim">
            From overnight ETL windows to real-time lakehouses — a journey shaped by
            every paradigm shift in the data ecosystem.
          </p>
        </FadeIn>

        <div className="relative mt-16">
          <div className="absolute bottom-0 left-[7px] top-2 w-px bg-gradient-to-b from-emerald via-border to-transparent md:left-[calc(50%-0.5px)]" />

          <div className="space-y-12">
            {milestones.map((m, i) => (
              <FadeIn key={m.year} delay={i * 0.05}>
                <div
                  className={`relative grid grid-cols-[auto_1fr] items-start gap-6 md:grid-cols-2 md:gap-12 ${
                    i % 2 === 0 ? "md:[&>div:first-child]:order-1" : ""
                  }`}
                >
                  <div className="absolute left-0 top-1.5 h-4 w-4 -translate-x-[calc(50%-7px)] rounded-full border-2 border-background bg-emerald shadow-[0_0_0_4px_color-mix(in_oklab,var(--emerald)_20%,transparent)] md:left-1/2 md:-translate-x-1/2" />

                  <div className="hidden md:block" />
                  <div className="pl-8 md:pl-12">
                    <p className="font-mono text-sm tracking-widest text-emerald">{m.year}</p>
                    <h3 className="mt-1 text-xl font-semibold text-silver">{m.title}</h3>
                    <p className="mt-2 text-sm text-silver-dim">{m.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
