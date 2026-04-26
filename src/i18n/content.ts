export type Language = "en" | "de";

const en = {
  nav: {
    about: "About",
    projects: "Projects",
    milestones: "Milestones",
    contact: "Contact",
    getInTouch: "Get in Touch",
    reading: "Reading",
  },
  reading: {
    breadcrumb: "/ reading",
    sectionLabel: "Reading List",
    heading: "Papers & Articles",
    description:
      "Distributed systems, data engineering, ML infrastructure — things I've read and found worth keeping.",
    searchPlaceholder: "Search titles, authors, notes…",
    sortLabel: "Sort:",
    sortNewest: "Newest",
    sortOldest: "Oldest",
    sortAz: "A–Z",
    topics: "Topics",
    all: "All",
    entriesAll: (n: number) => `${n} entries`,
    entriesFiltered: (n: number, total: number) => `${n} of ${total}`,
    clear: "clear",
    noResults: "No results.",
    clearFilters: "Clear filters",
  },
  hero: {
    badge: "HAMBURG, DE — AVAILABLE FOR ARCHITECTURE WORK",
    subtitle:
      "From raw event streams to actionable insight — building the infrastructure in between. 14 years across distributed systems, real-time analytics, and cloud data platforms.",
    viewCareer: "View Career",
    getInTouch: "Get in Touch",
    years: "Years",
    experience: "Experience",
  },
  about: {
    sectionLabel: "/ 01 — About",
    headlineLine1: "I build for the 3 am incident",
    headlineLine2: "that never happens.",
    p1: "Data engineering is not about the technology — it's about the promise of reliability. When a pipeline breaks at scale, entire businesses lose visibility. My job is to make sure that never happens.",
    p2: "Over 14 years I've moved from writing Java for core banking systems to architecting real-time streaming platforms that ingest billions of ad events a day. The through-line has always been the same: make data trustworthy, fast, and cheap to operate.",
    p3: "I care about clean abstractions, observable systems, and not reinventing what already works. I mentor junior engineers and believe that a well-documented pipeline is as important as a fast one.",
    traits: [
      { label: "Current Role", value: "Senior Data Engineer, Verve Group" },
      { label: "Based in", value: "Hamburg, Germany" },
      { label: "Open to", value: "Consulting · Staff IC · Architecture Roles" },
    ],
    downloadCV: "Download CV",
  },
  projects: {
    sectionLabel: "/ 02 — Featured Work",
    headline: "Systems built to last.",
    subtitle: "A selection of high-impact data infrastructure projects.",
    items: [
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
    ],
  },
  milestones: {
    sectionLabel: "/ 03 — Career Milestones",
    headline: "14 years through the evolution of data.",
    subtitle:
      "From enterprise software to real-time lakehouses — a journey shaped by every paradigm shift in the data ecosystem.",
    items: [
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
    ],
  },
  contact: {
    sectionLabel: "/ 04 — Contact",
    headline: "Architecting a data platform? Let's talk.",
    subtitle:
      "Open to consulting engagements, senior IC roles, and architecture reviews. Reply within one business day.",
    channels: { email: "Email", linkedin: "LinkedIn", github: "GitHub" },
    footer: {
      tagline: "Data Engineering Architecture",
      locationLabel: "Location:",
      locationValue: "Hamburg, Germany",
    },
  },
  chat: {
    buttonLabel: "Send a message",
    heading: "Send a message",
    subheading: "Goes straight to my Telegram",
    namePlaceholder: "Your name (optional)",
    messagePlaceholder: "What's on your mind?",
    send: "Send message",
    sending: "Sending…",
    sent: "Message sent!",
    sentSub: "I'll get back to you soon.",
    sendAnother: "Send another",
    waitSeconds: (s: number) => `Wait ${s}s`,
    cooldownMsg: (s: number) => `Please wait ${s}s before sending again.`,
    errorGeneric: "Something went wrong. Try again.",
    errorNetwork: "Network error. Please try again.",
    errorSecurity: "Please complete the security check.",
  },
};

const de: typeof en = {
  nav: {
    about: "Über mich",
    projects: "Projekte",
    milestones: "Meilensteine",
    contact: "Kontakt",
    getInTouch: "Kontakt aufnehmen",
    reading: "Lektüre",
  },
  reading: {
    breadcrumb: "/ Lektüre",
    sectionLabel: "Leseliste",
    heading: "Artikel & Fachbeiträge",
    description:
      "Verteilte Systeme, Data Engineering, ML-Infrastruktur — Texte, die ich gelesen und für lesenswert befunden habe.",
    searchPlaceholder: "Titel, Autoren, Notizen durchsuchen…",
    sortLabel: "Sortierung:",
    sortNewest: "Neueste",
    sortOldest: "Älteste",
    sortAz: "A–Z",
    topics: "Themen",
    all: "Alle",
    entriesAll: (n: number) => `${n} Einträge`,
    entriesFiltered: (n: number, total: number) => `${n} von ${total}`,
    clear: "Zurücksetzen",
    noResults: "Keine Ergebnisse.",
    clearFilters: "Filter zurücksetzen",
  },
  hero: {
    badge: "HAMBURG, DE — VERFÜGBAR FÜR ARCHITEKTUR-PROJEKTE",
    subtitle:
      "Von rohen Event-Streams zu verwertbaren Erkenntnissen — ich baue die Infrastruktur dazwischen. 14 Jahre Erfahrung in verteilten Systemen, Echtzeit-Analytics und Cloud-Datenplattformen.",
    viewCareer: "Werdegang ansehen",
    getInTouch: "Kontakt aufnehmen",
    years: "Jahre",
    experience: "Erfahrung",
  },
  about: {
    sectionLabel: "/ 01 — Über mich",
    headlineLine1: "Ich baue für den nächtlichen Störfall,",
    headlineLine2: "der nie eintritt.",
    p1: "Beim Data Engineering geht es nicht um die Technologie — es geht um das Versprechen von Zuverlässigkeit. Wenn eine Pipeline im großen Maßstab ausfällt, verlieren ganze Unternehmen den Überblick. Meine Aufgabe ist es, dafür zu sorgen, dass das nie passiert.",
    p2: "In über 14 Jahren habe ich mich vom Java-Entwickler für Kernbanksysteme zum Architekten von Echtzeit-Streaming-Plattformen entwickelt, die täglich Milliarden von Ad-Events verarbeiten. Der rote Faden ist dabei immer derselbe geblieben: Daten vertrauenswürdig, schnell und kostengünstig zu betreiben.",
    p3: "Mir geht es um saubere Abstraktionen, beobachtbare Systeme und darum, das Rad nicht neu zu erfinden. Ich coache Junior-Engineers und bin überzeugt, dass eine gut dokumentierte Pipeline genauso wichtig ist wie eine schnelle.",
    traits: [
      { label: "Aktuelle Rolle", value: "Senior Data Engineer, Verve Group" },
      { label: "Standort", value: "Hamburg, Deutschland" },
      { label: "Offen für", value: "Beratung · Staff IC · Architektur-Rollen" },
    ],
    downloadCV: "Lebenslauf herunterladen",
  },
  projects: {
    sectionLabel: "/ 02 — Ausgewählte Projekte",
    headline: "Systeme, die Bestand haben.",
    subtitle: "Eine Auswahl wirkungsvoller Dateninfrastruktur-Projekte.",
    items: [
      {
        company: "Verve Group",
        period: "2022 – Heute",
        title: "Multi-Region Echtzeit-Analytics-Plattform",
        description:
          "Architektur einer Streaming-Analytics-Plattform, die täglich Milliarden von Ad-Exchange-Events verarbeitet. Konzipiert für Sub-Sekunden-Latenz bei der Bereitstellung von KPIs an Publisher und Stakeholder weltweit.",
        metrics: [
          { value: "50 TB", label: "täglich verarbeitet" },
          { value: "~0s", label: "Abfrage-Latenz" },
          { value: "Multi-Region", label: "Ausfallsicherheit" },
        ],
        stack: ["Apache Druid", "Apache Flink", "Apache Kafka", "GKE"],
      },
      {
        company: "Verve Group",
        period: "2022 – 2023",
        title: "500 TB AWS → GCP Cloud-Migration",
        description:
          "End-to-End-Migration der gesamten Dateninfrastruktur von AWS zu Google Cloud Platform mit Apache Spark auf Kubernetes. Kosten gesenkt und Verarbeitungsdurchsatz deutlich verbessert.",
        metrics: [
          { value: "500 TB", label: "migriert" },
          { value: "−35%", label: "Speicherkosten" },
          { value: "+40%", label: "Durchsatz" },
        ],
        stack: ["Apache Spark", "GKE", "Google Dataproc", "BigQuery"],
      },
      {
        company: "NewsCorp (NTS)",
        period: "2019 – 2022",
        title: "Event-getriebene Daten-Ingestion-Plattform",
        description:
          "Konzeption eines Kubernetes-nativen Ingestion-Systems für 15+ heterogene Datenquellen für Dow Jones, HarperCollins und Realtor.com. Aufbau von In-Warehouse-Transformations-Workflows mit BigQuery und dbt.",
        metrics: [
          { value: "99.9%", label: "Datengenauigkeit" },
          { value: "15+", label: "Datenquellen" },
          { value: "5 TB+", label: "täglich verarbeitet" },
        ],
        stack: ["Kubernetes", "Apache Beam", "BigQuery", "dbt"],
      },
    ],
  },
  milestones: {
    sectionLabel: "/ 03 — Meilensteine",
    headline: "14 Jahre durch die Evolution der Daten.",
    subtitle:
      "Von Enterprise-Software bis zu Echtzeit-Lakehouses — eine Reise durch jeden Paradigmenwechsel im Datenökosystem.",
    items: [
      {
        year: "2012",
        title: "Software-Entwicklung bei Wipro",
        body: "Start der Karriere mit Web-Anwendungen in Groovy/Grails, AngularJS und Oracle DB. Aufbau von Performance-Testing-Expertise mit Apache JMeter.",
      },
      {
        year: "2015",
        title: "Kernbank-Systeme bei Oracle OFSS",
        body: "Aufbau und Erweiterung von Kernbank-Modulen — Consumer Lending und Accounting — in Java und Oracle. Erste intensive Erfahrung mit Datenintegrität und Migrations-Tooling in kritischen Systemen.",
      },
      {
        year: "2016",
        title: "Stream-Processing auf nationaler Ebene",
        body: "Einstieg bei StackRoute Labs (NIIT) für den Aufbau von DIKSHA, Indiens nationaler Bildungsplattform. Entwicklung einer Stream-Processing-Pipeline mit Apache Samza, die täglich Millionen von Telemetrie-Events verarbeitet. Auszeichnung mit dem Excellence Award für skalierbare Umsetzung.",
      },
      {
        year: "2019",
        title: "Cloud Data Engineering bei NewsCorp",
        body: "Architektur einer event-getriebenen Ingestion mit Kubernetes, Docker und Apache Beam über 15+ Quellen mit 99,9% Genauigkeit. Aufbau von In-Warehouse-Transformations-Workflows mit BigQuery und dbt.",
      },
      {
        year: "2022",
        title: "Echtzeit-Analytics bei Verve Group",
        body: "Entwicklung einer Multi-Region Streaming-Analytics-Plattform (Apache Druid + Flink + Kafka) mit 50 TB/Tag. Leitung der 500 TB AWS → GCP Migration auf GKE — 35% Speicherkosten-Reduzierung, 40% schnellere Verarbeitung.",
      },
    ],
  },
  contact: {
    sectionLabel: "/ 04 — Kontakt",
    headline: "Sie planen eine Datenplattform? Lassen Sie uns sprechen.",
    subtitle:
      "Offen für Beratungsaufträge, Senior-IC-Rollen und Architektur-Reviews. Antwort innerhalb eines Werktages.",
    channels: { email: "E-Mail", linkedin: "LinkedIn", github: "GitHub" },
    footer: {
      tagline: "Data Engineering Architektur",
      locationLabel: "Standort:",
      locationValue: "Hamburg, Deutschland",
    },
  },
  chat: {
    buttonLabel: "Nachricht senden",
    heading: "Nachricht senden",
    subheading: "Landet direkt in meinem Telegram",
    namePlaceholder: "Ihr Name (optional)",
    messagePlaceholder: "Was liegt Ihnen auf dem Herzen?",
    send: "Nachricht absenden",
    sending: "Wird gesendet…",
    sent: "Nachricht gesendet!",
    sentSub: "Ich melde mich bald bei Ihnen.",
    sendAnother: "Weitere Nachricht senden",
    waitSeconds: (s: number) => `Warten ${s}s`,
    cooldownMsg: (s: number) => `Bitte warten Sie ${s}s, bevor Sie erneut senden.`,
    errorGeneric: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    errorNetwork: "Netzwerkfehler. Bitte versuchen Sie es erneut.",
    errorSecurity: "Bitte schließen Sie die Sicherheitsprüfung ab.",
  },
};

export const content = { en, de };
export type Content = typeof en;
