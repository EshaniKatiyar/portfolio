import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

type Project = {
  number: string;
  title: string;
  year: string;
  stack: string;
  description: string;
};

export function VaultRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // subtle parallax — the number drifts slightly slower than the title
  const numberY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const titleY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className="group relative border-t hairline"
    >
      <a
        href="#"
        className="grid grid-cols-12 gap-4 md:gap-8 py-12 md:py-20 px-6 md:px-16 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-void group"
      >
        {/* Number */}
        <motion.div
          style={{ y: numberY }}
          className="col-span-2 md:col-span-2 font-serif italic text-3xl md:text-6xl leading-none text-foreground/40 group-hover:text-orange transition-colors duration-500"
        >
          {project.number}
        </motion.div>

        {/* Title + description */}
        <motion.div
          style={{ y: titleY }}
          className="col-span-10 md:col-span-7 flex flex-col justify-center"
        >
          <h3 className="font-serif font-medium tracking-[-0.02em] leading-[1] text-[clamp(2rem,6vw,5.5rem)]">
            {project.title}
          </h3>
          <p className="mt-4 md:mt-6 font-mono text-[11px] md:text-xs uppercase tracking-[0.16em] max-w-xl text-foreground/70 group-hover:text-matrix transition-colors duration-500">
            <span className="text-foreground/40 group-hover:text-orange transition-colors duration-500">&gt;</span>{" "}
            {project.description}
          </p>
        </motion.div>

        {/* Meta */}
        <div className="col-span-12 md:col-span-3 md:text-right flex flex-col md:items-end justify-center gap-2 mt-4 md:mt-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/50 group-hover:text-cyan transition-colors duration-500">
            {project.year}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/70 group-hover:text-matrix transition-colors duration-500">
            {project.stack}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-0 group-hover:opacity-100 group-hover:text-orange transition-all duration-500 mt-1">
            view_case →
          </span>
        </div>
      </a>
    </motion.div>
  );
}
