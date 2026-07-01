import { motion } from "motion/react";
import { SectionLabel } from "./SectionLabel";

const rows = [
  { year: "June 2026- July 2026", org: "QuantGlobal", role: "AI Engineering Intern", place: "Remote" },
  { year: "2026- Present", org: "GirlScript Summer of Code '26", role: "Open Source Contributor", place: "Remote" },
  { year: "2025- Present", org: "CECAS, MIT Bengaluru", role: "Jr. Placement Committee", place: "MIT Bengaluru" },
  { year: "2025", org: "IEEE CIS Student Chapter", role: "Treasurer", place: "Student Chapter" },
  { year: "2025", org: "QuantUs", role: "Technical Team\u00a0", place: "Student Club" },
];

export function Log() {
  return (
    <section className="border-t hairline">
      <SectionLabel />

      <div className="px-6 md:px-16 pt-24 pb-12">
        <h2 className="display text-[9vw] md:text-[5vw]">Experience & Student Clubs</h2>
      </div>

      <div className="px-6 md:px-16 pb-32">
        <div className="hidden md:grid grid-cols-12 gap-4 py-4 border-b hairline label">
          <div className="col-span-2">Year</div>
          <div className="col-span-5">Organization</div>
          <div className="col-span-3">Role / Result</div>
          <div className="col-span-2 text-right">Location</div>
        </div>

        {rows.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 py-8 border-b hairline md:grid md:grid-cols-12 md:gap-4 md:items-baseline"
          >
            <div className="md:col-span-2 font-mono text-xs md:text-sm text-orange">{r.year}</div>
            <div className="md:col-span-5 display text-3xl md:text-5xl break-words leading-[0.95]">{r.org}</div>
            <div className="md:col-span-3 font-mono text-sm">{r.role}</div>
            <div className="md:col-span-2 font-mono text-xs md:text-sm md:text-right opacity-60">{r.place}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
