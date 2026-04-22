import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Milestones } from "@/components/Milestones";
import { Contact, Footer } from "@/components/Contact";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Sunil Pandith — Senior Data Engineer, Hamburg" },
      {
        name: "description",
        content:
          "Sunil Pandith — 14+ years engineering scalable data architectures. Distributed systems, cloud warehousing, orchestration. Based in Hamburg, Germany.",
      },
      { property: "og:title", content: "Sunil Pandith — Senior Data Engineer" },
      {
        property: "og:description",
        content: "Engineering scalable data architectures in Hamburg. 14+ years of experience.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Milestones />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
