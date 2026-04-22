import { FadeIn } from "./FadeIn";

const milestones = [
  {
    year: "2012",
    title: "Software Development at Wipro",
    body: "Started career building web applications with Groovy/Grails, AngularJS, and Oracle DB. Developed performance testing discipline with Apache JMeter.",
  },
  {
    year: "2015",
    title: "Core Banking at Oracle OFSS",
    body: "Built and enhanced core banking modules — consumer lending and accounting — in Java and Oracle. First deep exposure to high-stakes data integrity and migration tooling.",
  },
  {
    year: "2016",
    title: "Stream Processing & National Scale",
    body: "Joined NIIT's StackRoute Labs to build DIKSHA, India's national education platform. Engineered a stream processing pipeline with Apache Samza handling millions of telemetry events per day. Received Excellence Award for scalable delivery.",
  },
  {
    year: "2019",
    title: "Cloud Data Engineering at NewsCorp",
    body: "Architected event-driven ingestion with Kubernetes, Docker, and Apache Beam across 15+ sources at 99.9% accuracy. Built in-warehouse transformation workflows with BigQuery and dbt.",
  },
  {
    year: "2022",
    title: "Real-Time Analytics at Verve Group",
    body: "Designed a multi-region streaming analytics platform (Apache Druid + Flink + Kafka) processing 50 TB/day. Led the 500 TB AWS → GCP migration on GKE — 35% storage cost reduction, 40% faster processing.",
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
            From enterprise software to real-time lakehouses — a journey shaped by every
            paradigm shift in the data ecosystem.
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
