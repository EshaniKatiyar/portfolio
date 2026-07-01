import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { SectionLabel } from "./SectionLabel";

type Project = {
  num: string;
  title: string;
  stack: string;
  year: string;
  blurb: string;
  role: string;
  status: string;
  links: { label: string; href: string }[];
  overview: string;
  highlights: string[];
  details: { label: string; value: string }[];
};

const projects: Project[] = [
  {
    num: "01",
    title: "NagarIQ- Civic Intelligence System",
    stack: "Next.js 14 · React · TypeScript · Google Gemini · Docker . Firebase",
    year: "2026",
    blurb: "Vision-AI civic platform auto-categorizing citizen reports into SLA-tracked, tamper-proof accountability records.",
    role: "Project for Vibe2Ship Hackathon hosted by Google For Developers x CodingNinja",
    status: "In production",
    links: [
      { label: "github →", href: "https://github.com/EshaniKatiyar/NagarIQ" },
      { label: "DEMO LINK →", href: "https://nagariq-135934398714.asia-south1.run.app/" },
    ],
    overview:
      "Turns a single photo of a civic issue into a legally actionable, deadline-tracked case. A fixed multi-agent pipeline handles vision analysis, categorization, and severity-scoring across four priority tiers in a single pass. An automated accountability engine clusters reports into filing-ready RTI applications and enforces SLA deadlines. Every breach is logged to a tamper-proof, hash-chained ledger that can't be silently edited.",
    highlights: [
      "Built an accountability engine spanning 13 modules that auto-generates legally-formatted RTI applications from clustered citizen reports, not just a ticketing system.",
      "Designed a tamper-proof breach ledger using SHA-256 hash-chaining, so SLA violations can't be silently edited or deleted after the fact.",
      "Engineered predictive neighborhood health scoring (30/60/90-day decay forecasting) across 9+ zones using live Firestore data sync.",
    ],
    details: [
      { label: "40+ test reports", value: "40+ test reports" },
      { label: "SEVERITY LEVELS", value: "4" },
      { label: "NEIGHBOURHOOD", value: "9+ areas tracked" },
    ],
  },
  {
    num: "02",
    title: "EraSureAPI",
    stack: "Python · FastAPI · PyTorch · Celery · Redis · LEACE",
    year: "2026",
    blurb: "Concept-erasure engine for surgical, retraining-free LLM unlearning.",
    role: "Solo build",
    status: "Public demo",
    links: [
      { label: "github →", href: "https://github.com/EshaniKatiyar/ErasureAPI" },
    ],
    overview:
      "Retraining a model to forget something is slow - ErasureAPI skips that entirely. It surgically deletes a targeted concept from an LLM's internal layers using closed-form orthogonal projections, via the LEACE algorithm in PyTorch. A Redis/Celery async queue processes concurrent unlearning jobs without blocking the API. A dynamic in-memory model registry enables zero-downtime hot-swapping of edited models. A CI/CD gate guarantees the model retains 95%+ of its general capability post-erasure.",
    highlights: [
      "Implemented LEACE from the published algorithm directly in PyTorch- real ML research turned into working code, not a wrapper around an existing library.",
      "Built zero-downtime model hot-swapping via a custom in-memory registry, a problem most ML side-projects never touch.",
      "Enforced a >95% capability-retention gate in CI/CD, treating \"unlearning\" as a measurable, testable operation rather than a one-off script.",
    ],
    details: [
      { label: "CAPABILITY RETAINED", value: "95%+ post erasure" },
      { label: "MODEL", value: "0s time on model swap" },
      { label: "dataset", value: "12+ concepts erased" },
    ],
  },
  {
    num: "03",
    title: "ARIA",
    stack: "LangGraph · FastAPI · Qdrant · DeBERTa (NLI) · Redis · Cerebras",
    year: "2026",
    blurb: "Adaptive multi-agent RAG pipeline with DAG-based orchestration and self-correcting NLI verification.",
    role: "Self Project",
    status: "Deployed",
    links: [
      { label: "github →", href: "https://tacoshack-aria.hf.space/" },
      { label: "github →", href: "https://github.com/EshaniKatiyar/ARIA" },
    ],
    overview:
      "Most RAG chatbots run the same fixed pipeline for every query - ARIA doesn't. It profiles a user's expertise and intent in real time, then reconfigures its own retrieval and fact-checking pipeline around them. A LangGraph DAG orchestrates parallel retrieval across a vector database, knowledge graph, and live web search. Every claim is verified by a DeBERTa NLI model, auto-triggering rewrites below a per-user confidence threshold.",
    highlights: [
      "Built a system that reconfigures its own architecture per-query based on a live user \"fingerprint\" - not a static prompt template.",
      "Designed a self-correcting verification layer where an NLI model scores individual claims and forces rewrites below a dynamic confidence threshold.",
      "Orchestrated three parallel retrieval sources through a single LangGraph DAG, instead of a simple linear RAG chain.",
    ],
    details: [
      { label: "SOURCES", value: "3 parallel retrieval sources" },
      { label: "CONFIDENCE", value: "0.65-0.80" },
      { label: "QUERIES", value: "200+ coverage" },
    ],
  },
  {
    num: "04",
    title: "QuantumLens",
    stack: "Python . PyTorch . PennyLane . OpenCV . NumPy",
    year: "2025",
    blurb: "Hybrid quantum-classical vision model solving the Barren Plateau problem for stable gradient convergence.",
    role: "Self Project",
    status: "Github",
    links: [{ label: "DEMO →", href: "#" }],
    overview:
      "Fuses a 16-qubit variational quantum circuit with a classical PyTorch model for real-time webcam classification. Solves the \"Barren Plateau\" problem - a well-known quantum ML training failure - using a local cost function over individual Pauli-Z observables. An OpenCV pipeline handles real-time preprocessing. UMAP and Plotly validate that quantum embeddings are class-separable before training begins.",
    highlights: [
      "Solved the Barren Plateau problem directly, rather than avoiding it with a toy-sized circuit.",
      "Validated class separability via UMAP before full training, catching failure modes early.",
      "Built a genuinely hybrid pipeline - quantum and classical trained together, not layered as a gimmick.",
    ],
    details: [
      { label: "QUBITS", value: "16 qubits used" },
      { label: "CLASS", value: "95%+ class\u00a0 (UMAP-validated)" },
      { label: "IMAGE", value: "30fps real time" },
    ],
  },
  {
    num: "05",
    title: "CampusFind",
    stack: "Python . Flask . MySQL . Leaflet.js . JavaScript",
    year: "2025",
    blurb: "Full-stack lost & found platform with spatial mapping and real-time campus analytics.",
    role: "Group Project",
    status: "Deployed",
    links: [{ label: "github →", href: "https://github.com/EshaniKatiyar/CampusFind" }],
    overview:
      "Treats lost-and-found as a spatial and lifecycle problem, not just a listings page. Every item is pinned to a Leaflet.js map, color-coded as it moves from \"reported\" to \"resolved.\" A Flask REST API backed by a 4-table relational MySQL schema powers an auto-refreshing analytics dashboard. The dashboard gives real-time visibility into category breakdowns and campus hotspot activity.",
    highlights: [
      "Modeled item lifecycle spatially — a color-coded map showing status progression, not a static pin-drop.",
      "Designed a relational schema powering live dashboard analytics, not a flat single-table CRUD app.",
      "Built real-time frontend-backend sync so hotspot and status data update without a page refresh.",
    ],
    details: [
      { label: "TABLES", value: "4+" },
      { label: "ITEMS", value: "150+ items tracked" },
      { label: "benchmarks", value: "<2s latency" },
    ],
  },
];

export function Vault() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section className="border-t hairline">
      <SectionLabel />

      <div className="px-6 md:px-16 pt-24 pb-10">
        <h2 className="display text-[9vw] md:text-[5vw]">My Projects</h2>
        <p className="font-mono text-sm md:text-base max-w-xl mt-10 text-muted-foreground">
          All the things that I've built, broken, and rebuilt until they worked.
        </p>
      </div>

      <ul className="border-t hairline">
        {projects.map((p, i) => (
          <VaultRow key={p.num} project={p} last={i === projects.length - 1} onOpen={() => setActive(p)} />
        ))}
      </ul>

      <ProjectDialog project={active} onClose={() => setActive(null)} />
    </section>
  );
}

function VaultRow({ project, last, onOpen }: { project: Project; last: boolean; onOpen: () => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  return (
    <li ref={ref} className={`group relative border-b hairline ${last ? "border-b-0" : ""}`}>
      <button
        type="button"
        onClick={onOpen}
        className="block w-full text-left transition-colors duration-500 hover:bg-foreground hover:text-background cursor-pointer"
      >
        <div className="grid grid-cols-12 gap-4 px-6 md:px-16 py-10 md:py-16 items-baseline">
          <motion.div style={{ x }} className="col-span-2 font-mono text-sm md:text-base opacity-60 text-orange">
            ({project.num})
          </motion.div>
          <h3 className="col-span-10 md:col-span-7 display text-5xl md:text-8xl">{project.title}</h3>
          <div className="col-span-12 md:col-span-3 md:text-right font-mono text-xs md:text-sm space-y-2 mt-4 md:mt-0">
            <div className="opacity-60">{project.year}</div>
            <div>{project.stack}</div>
            <div className="max-w-xs md:ml-auto opacity-70">{project.blurb}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-2 text-orange">
              open case ↗
            </div>
          </div>
        </div>
      </button>
    </li>
  );
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const open = !!project;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const el = scrollRef.current;
    if (!el) return;

    const lenis = new Lenis({
      wrapper: el,
      content: el.firstElementChild as HTMLElement,
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.2,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [open, project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="vault-dialog"
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-foreground/60" onClick={onClose} />
          <motion.div
            ref={scrollRef}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            className="absolute right-0 top-0 h-full w-full md:w-[68vw] lg:w-[60vw] bg-background text-foreground overflow-y-auto border-l hairline"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-12 py-5 bg-background border-b hairline">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-60">
                ({project.num}) — {project.year}
              </span>
              <button
                onClick={onClose}
                className="font-mono text-[11px] uppercase tracking-[0.22em] hover:opacity-60 transition-opacity cursor-pointer"
              >
                close ✕
              </button>
            </div>

            <div className="px-6 md:px-12 pt-12 pb-24">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60 mb-6 text-orange">
                // 1ST_PROJECT
              </div>
              <h3 className="display text-5xl md:text-7xl leading-[0.95]">{project.title}</h3>
              <p className="font-mono text-sm md:text-base mt-6 max-w-2xl opacity-80">{project.blurb}</p>

              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs border-t border-b hairline py-6">
                <Meta label="CATEGORY" value={project.role} />
                <Meta label="status" value={project.status} />
                <Meta label="year" value={project.year} />
                <Meta label="stack" value={project.stack} />
              </div>

              <div className="mt-16 grid md:grid-cols-12 gap-8">
                <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.22em] opacity-60 text-orange">
                  overview
                </div>
                <p className="md:col-span-9 font-mono text-sm md:text-base leading-relaxed">
                  {project.overview}
                </p>
              </div>

              <div className="mt-16 grid md:grid-cols-12 gap-8">
                <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.22em] opacity-60 text-orange">
                  highlights
                </div>
                <ul className="md:col-span-9 space-y-4">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="font-mono text-sm md:text-base flex gap-4">
                      <span className="opacity-40 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-16 grid md:grid-cols-12 gap-8">
                <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.22em] opacity-60 text-orange">
                  metrics
                </div>
                <div className="md:col-span-9 grid sm:grid-cols-3 gap-px bg-foreground/10">
                  {project.details.map((d) => (
                    <div key={d.label} className="bg-background p-5">
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">
                        {d.label === d.value ? "METRIC" : d.label}
                      </div>
                      <div className="display text-2xl md:text-3xl mt-3">{d.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-16 grid md:grid-cols-12 gap-8">
                <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.22em] opacity-60 text-orange">
                  links
                </div>
                <div className="md:col-span-9 flex flex-wrap gap-x-8 gap-y-3">
                  {project.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      className="font-mono text-sm uppercase tracking-[0.18em] border-b hairline pb-1 hover:opacity-60 transition-opacity"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="opacity-60 uppercase tracking-[0.22em] text-[10px] text-orange">{label}</div>
      <div className="mt-2">{value}</div>
    </div>
  );
}
