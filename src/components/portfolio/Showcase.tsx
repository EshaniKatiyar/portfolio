import { motion } from "motion/react";
import { SectionLabel } from "./SectionLabel";

const wins = [
  {
    year: "2026",
    event: "FUNDFLOW",
    title: "Flinders University AI Competition 2026",
    badge: "TOP 4 ACROSS INDIA",
    track: "Agentic AI",
    desc: "Ranked 4th nationally in a competitive AI challenge with FundFlow, a fintech-focused AI solution.",
    color: "var(--color-orange)",
  },
  {
    year: "2025",
    event: "QUANTUM COHERENT TRANSPORT",
    title: "IISC Qiskit Fall Fest",
    badge: "3RD PLACE",
    track: "QUANTUM COMPUTING",
    desc: "Designed and benchmarked CTQW and DTQW quantum walk algorithms on 8-node graphs, proving CTQW's superior noise robustness through rigorous Qiskit Aer analysis.",
    color: "var(--color-orange)",
  },
];

export function Showcase() {
  return (
    <section className="border-t hairline overflow-hidden">
      <SectionLabel />

      <div className="px-6 md:px-16 pt-24 pb-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="display text-[14vw] md:text-[10vw] leading-[0.85]"
        >
          Achievements & Awards
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-sm md:text-base max-w-xl mt-10 text-muted-foreground"
        >
          A few results worth mentioning.
        </motion.p>
      </div>

      <div className="px-6 md:px-16 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {wins.map((w, i) => (
            <WinCard key={w.title} win={w} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WinCard({
  win,
  index,
}: {
  win: (typeof wins)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 1.4,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative border hairline bg-secondary/30 overflow-hidden"
    >
      {/* Top bar with metadata */}
      <div className="flex items-center justify-between px-5 py-4 border-b hairline">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-orange">
          {win.event}
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-60">
          {win.year}
        </div>
      </div>

      {/* Main content */}
      <div className="p-5 md:p-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="display text-3xl md:text-4xl leading-[0.9]">
            {win.title}
          </h3>
          <div
            className="shrink-0 inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 border hairline"
            style={{ borderColor: win.color }}
          >
            <span
              className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.15em] font-medium"
              style={{ color: win.color }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className="inline-block font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 border"
            style={{ borderColor: win.color, color: win.color }}
          >
            {win.badge}
          </span>
          <span className="inline-block font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 border hairline opacity-70">
            {win.track}
          </span>
        </div>

        <p className="font-mono text-sm leading-relaxed opacity-70 max-w-md">
          {win.desc}
        </p>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-orange/0 group-hover:bg-orange/[0.03] transition-colors duration-700 pointer-events-none" />

      {/* Corner accent */}
      <div
        className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${win.color}20 50%)`,
        }}
      />
    </motion.div>
  );
}
