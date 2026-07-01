import { motion, useScroll, useVelocity, useTransform, useSpring } from "motion/react";

const tokens = ["QISKIT", "PYTORCH", "LLM", "BB84", "AGENTIC", "RUST", "WASM", "GRAPHQL", "KAFKA", "GPU", "TYPESCRIPT", "POSTGRES", "VECTOR DB", "CUDA"];

export function Marquee() {
  const { scrollY } = useScroll();
  const v = useVelocity(scrollY);
  const sv = useSpring(v, { damping: 80, stiffness: 250 });
  const skew = useTransform(sv, [-2500, 0, 2500], [-3, 0, 3]);

  return (
    <section className="border-y hairline py-10 overflow-hidden">
      <motion.div style={{ skewX: skew }} className="flex whitespace-nowrap animate-marquee">
        {[...tokens, ...tokens, ...tokens].map((t, i) => (
          <span key={i} className="display text-7xl md:text-9xl mx-8 opacity-90">
            {t} <span className="text-orange opacity-80">·</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
