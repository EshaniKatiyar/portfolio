import { motion } from "motion/react";
import { SectionLabel } from "./SectionLabel";

const services = [
  { n: "01", title: "Agentic AI & Multi-Agent Systems", body: "Multi-agent orchestration, RAG pipelines, and self-correcting LLM systems - built with LangGraph, vector databases, and NLI-based verification." },
  { n: "02", title: "Full-Stack Development", body: "End-to-end products across Next.js, React, TypeScript, and Python backends (Flask/FastAPI) - from database design to deployed UI." },
  { n: "03", title: "Computer Vision", body: "Real-time image and video analysis - from webcam classification to vision-based severity scoring - built with OpenCV, PyTorch, and multimodal AI APIs." },
  { n: "04", title: "Systems &\u00a0 Infrastructure", body: "Async task queues, model-serving infrastructure, and production backend architecture - built for concurrency and reliability." },
];

export function Capabilities() {
  return (
    <section className="border-t hairline">
      <SectionLabel />

      <div className="px-6 md:px-16 pt-24 pb-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <h2 className="display text-[9vw] md:text-[5vw] md:col-span-8">Focus Areas</h2>
        <div className="font-mono text-sm md:col-span-4 md:text-right space-y-1 text-muted-foreground">
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-t hairline">
        {services.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.5, delay: (i % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={`p-8 md:p-16 border-b hairline ${i % 2 === 0 ? "md:border-r" : ""}`}
          >
            <div className="font-mono text-sm opacity-60 mb-8 text-orange">{s.n}</div>
            <h3 className="display text-4xl md:text-6xl mb-6">{s.title}</h3>
            <p className="font-mono text-sm leading-relaxed text-muted-foreground max-w-md">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
