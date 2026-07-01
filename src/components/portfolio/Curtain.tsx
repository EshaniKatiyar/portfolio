import { motion } from "motion/react";

export function Curtain() {
  return (
    <>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1], delay: 0.2 }}
        className="fixed inset-0 z-[120] bg-background pointer-events-none flex items-end justify-between px-6 md:px-16 pb-10"
      >
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/70"
        >
          eshani.katiyar
        </motion.span>
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/70"
        >
          loaded · 100%
        </motion.span>
      </motion.div>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "100%" }}
        transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1], delay: 0.35 }}
        className="fixed inset-0 z-[119] bg-[color:var(--color-orange)] pointer-events-none"
      />
    </>
  );
}
