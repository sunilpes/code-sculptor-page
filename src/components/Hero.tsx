import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { ArrowRight, Terminal, MapPin } from "lucide-react";

const SUBTITLE =
  "From raw event streams to actionable insight — building the infrastructure in between. 14 years across distributed systems, real-time analytics, and cloud data platforms.";

function Typewriter({ text, startDelay }: { text: string; startDelay: number }) {
  const [displayed, setDisplayed] = useState("");
  const done = displayed.length === text.length;

  useEffect(() => {
    let i = 0;
    const tid = setTimeout(() => {
      const iid = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(iid);
      }, 18);
      return () => clearInterval(iid);
    }, startDelay);
    return () => clearTimeout(tid);
  }, [text, startDelay]);

  return (
    <>
      {displayed}
      {!done && (
        <span className="ml-0.5 inline-block h-[0.85em] w-0.5 animate-pulse bg-emerald align-middle" />
      )}
    </>
  );
}

function CountUp({ to, startDelay }: { to: number; startDelay: number }) {
  const [display, setDisplay] = useState(0);
  const motionVal = useMotionValue(0);

  useEffect(() => {
    const tid = setTimeout(() => {
      const ctrl = animate(motionVal, to, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (v) => setDisplay(Math.floor(v)),
      });
      return ctrl.stop;
    }, startDelay);
    return () => clearTimeout(tid);
  }, []);

  return <>{display}</>;
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-32 md:pt-32 md:pb-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-surface/60 px-4 py-1.5 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="pulse-dot absolute inline-flex h-full w-full rounded-full" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
          </span>
          <span className="font-mono text-xs tracking-widest text-silver-dim">
            <MapPin className="mr-1.5 inline h-3 w-3" />
            HAMBURG, DE — AVAILABLE FOR ARCHITECTURE WORK
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl font-semibold leading-[0.95] tracking-tight text-silver md:text-7xl lg:text-8xl"
        >
          Sunil <span className="text-gradient-emerald">Pandith</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: 0.8 }}
          className="mt-6 min-h-[4rem] max-w-2xl text-lg text-silver-dim md:text-2xl"
        >
          <Typewriter text={SUBTITLE} startDelay={850} />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#milestones"
            className="group inline-flex items-center gap-2 rounded-md bg-emerald px-6 py-3 font-mono text-sm font-medium text-primary-foreground transition-all hover:glow-emerald"
          >
            <Terminal className="h-4 w-4" />
            View Career
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-6 py-3 font-mono text-sm text-silver backdrop-blur transition-colors hover:border-emerald/40 hover:text-emerald"
          >
            Get in Touch
          </a>

          <div className="ml-2 flex items-center gap-3 border-l border-border pl-6">
            <span className="text-3xl font-semibold text-emerald">
              <CountUp to={14} startDelay={500} />+
            </span>
            <span className="font-mono text-xs uppercase leading-tight tracking-widest text-silver-dim">
              Years
              <br />
              Experience
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
