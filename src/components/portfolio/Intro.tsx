import { motion } from "motion/react";
import { SectionLabel } from "./SectionLabel";

export function Intro() {
  return (
    <section className="border-t hairline">
      <SectionLabel />

      <div className="px-6 md:px-16 py-24 md:py-40 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-2 font-mono text-sm text-muted-foreground space-y-1">
          <div>Focus</div>
          <div className="text-orange">Software Dev</div>
          <div className="text-orange whitespace-pre-line">Agentic AI{"\n"}Generative AI</div>
          <div className="text-orange whitespace-pre-line">Full-Stack Dev{"\n"}Computer Vision{"\n"}Quantum Computing</div>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="display text-4xl md:text-7xl md:col-span-10 leading-[0.95]"
        >
          I code because there's nothing quite like the moment something you
          built finally works. I want to keep chasing that on problems that
          actually matter.
        </motion.h2>
      </div>
    </section>
  );
}
