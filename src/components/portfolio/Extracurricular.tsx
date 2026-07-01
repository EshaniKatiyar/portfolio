import { motion } from "motion/react";
import { SectionLabel } from "./SectionLabel";

const activities = [
  {
    index: "01",
    title: "Public Speaking",
    detail: "Tech talks, hackathon pitches, and debating.",
  },
  {
    index: "02",
    title: "Creative Writing",
    detail: "I write short blogs on the side. Different medium, same instinct: figuring out how the pieces fit together.",
  },
  {
    index: "03",
    title: "Astronomy",
    detail: "I like knowing what's actually going on above my head. Mostly reading, occasionally stargazing badly from a city balcony.",
  },
  {
    index: "04",
    title: "Listening to Songs",
    detail: "Always something playing while I work from pop to classical, everything.",
  },
];

export function Extracurricular() {
  return (
    <section id="extracurricular" className="border-t hairline">
      <SectionLabel />

      <div className="px-6 md:px-16 pt-24 pb-12">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="display text-[14vw] md:text-[10vw] leading-[0.85]"
        >
          Beyond Code
        </motion.h2>
      </div>

      <div className="px-6 md:px-16 pb-32 md:pb-40">
        {activities.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-12 gap-4 py-8 md:py-10 border-b hairline items-baseline group"
          >
            <div className="col-span-2 md:col-span-1 font-serif italic text-xl md:text-3xl text-foreground/30 group-hover:text-orange transition-colors duration-500">
              {item.index}
            </div>
            <div className="col-span-10 md:col-span-4 display text-2xl md:text-4xl">
              {item.title}
            </div>
            <div className="col-span-12 md:col-span-7 font-mono text-xs md:text-sm text-foreground/60 group-hover:text-foreground/90 transition-colors duration-500 md:text-right">
              {item.detail}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
