import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionLabel } from "./SectionLabel";

const GITHUB_USERNAME = "EshaniKatiyar";

type ContribDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const levels = [
  { bg: "color-mix(in oklch, var(--color-foreground) 5%, transparent)" },
  { bg: "color-mix(in oklch, var(--color-orange) 25%, transparent)" },
  { bg: "color-mix(in oklch, var(--color-orange) 50%, transparent)" },
  { bg: "color-mix(in oklch, var(--color-orange) 75%, transparent)" },
  { bg: "var(--color-orange)" },
];

function buildWeeks(days: ContribDay[]): ContribDay[][] {
  if (!days.length) return [];
  // Pad start so the first column begins on Sunday (getDay() === 0)
  const first = new Date(days[0].date);
  const pad = first.getDay();
  const padded: (ContribDay | null)[] = [
    ...Array(pad).fill(null),
    ...days,
  ];
  const weeks: ContribDay[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(
      padded.slice(i, i + 7).map(
        (d) =>
          d ?? { date: "", count: 0, level: 0 as const }
      )
    );
  }
  return weeks;
}

function computeStreaks(days: ContribDay[]) {
  let longest = 0;
  let current = 0;
  let running = 0;
  for (const d of days) {
    if (d.count > 0) {
      running++;
      if (running > longest) longest = running;
    } else {
      running = 0;
    }
  }
  // current streak counts back from the last day
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current++;
    else break;
  }
  return { longest, current };
}

export function GitHubChart() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const [days, setDays] = useState<ContribDay[]>([]);
  const [repos, setRepos] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [contribRes, userRes] = await Promise.all([
          fetch(
            `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
          ),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        ]);
        if (!contribRes.ok) throw new Error("contrib");
        const contrib = await contribRes.json();
        const user = userRes.ok ? await userRes.json() : null;
        if (cancelled) return;
        // Last 371 days max for clean grid
        const last = (contrib.contributions as ContribDay[]).slice(-371);
        setDays(last);
        if (user) setRepos(user.public_repos ?? null);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const weeks = useMemo(() => buildWeeks(days), [days]);
  const total = useMemo(
    () => days.reduce((sum, d) => sum + d.count, 0),
    [days]
  );
  const { longest, current } = useMemo(() => computeStreaks(days), [days]);

  return (
    <section className="border-t hairline" ref={sectionRef}>
      <SectionLabel />

      <div className="px-6 md:px-16 pt-24 pb-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="display text-[11vw] md:text-[7vw] leading-[0.85]"
        >
          GitHub
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-sm md:text-base max-w-xl mt-10 text-muted-foreground"
        >
          Every square is a day spent towards building something.
        </motion.p>
      </div>

      {/* Stats row */}
      <div className="px-6 md:px-16 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10 border hairline">
          <StatBox
            label="Total (1y)"
            value={loading ? "…" : String(total)}
            delay={0}
          />
          <StatBox
            label="Longest Streak"
            value={loading ? "…" : `${longest}d`}
            delay={0.08}
          />
          <StatBox
            label="Current Streak"
            value={loading ? "…" : `${current}d`}
            delay={0.16}
          />
          <StatBox
            label="Public Repos"
            value={loading ? "…" : repos !== null ? String(repos) : "—"}
            delay={0.24}
          />
        </div>
        {error && (
          <p className="font-mono text-xs text-muted-foreground mt-4">
            // could not reach github — showing what we have
          </p>
        )}
      </div>

      {/* Heatmap */}
      <div className="px-6 md:px-16 pb-10 w-full">
        <div className="w-full">
          <div className="flex gap-[3px]">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] mr-2">
              {["Sun", "", "Tue", "", "Thu", "", "Sat"].map((d, i) => (
                <div
                  key={i}
                  className="flex items-center justify-end font-mono text-[9px] uppercase tracking-[0.1em] opacity-40 flex-1"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex gap-[3px] flex-1">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px] flex-1">
                  {week.map((day, di) => (
                    <DayCell
                      key={di}
                      level={day.level}
                      date={day.date}
                      count={day.count}
                      weekIndex={wi}
                      dayIndex={di}
                      scrollProgress={scrollYProgress}
                    />
                  ))}
                </div>
              ))}
              {!weeks.length && !loading && (
                <div className="font-mono text-xs opacity-50 px-4">
                  no contribution data
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 md:px-16 pb-32 flex items-center gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] opacity-50">
          Less
        </span>
        <div className="flex gap-[3px]">
          {levels.map((l, i) => (
            <div
              key={i}
              className="w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-[2px]"
              style={{ backgroundColor: l.bg }}
            />
          ))}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] opacity-50">
          More
        </span>
      </div>

      {/* Link to profile */}
      <div className="px-6 md:px-16 pb-24">
        <motion.a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-[0.18em] border-b hairline pb-1 hover:opacity-60 transition-opacity group"
        >
          <span>View Profile</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </motion.a>
      </div>
    </section>
  );
}

function StatBox({
  label,
  value,
  delay,
}: {
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-background p-6 md:p-8"
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60 text-orange">
        {label}
      </div>
      <div className="display text-3xl md:text-4xl mt-3">{value}</div>
    </motion.div>
  );
}

function DayCell({
  level,
  date,
  count,
  weekIndex,
  dayIndex,
  scrollProgress,
}: {
  level: 0 | 1 | 2 | 3 | 4;
  date: string;
  count: number;
  weekIndex: number;
  dayIndex: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(
    scrollProgress,
    [0.2, 0.6],
    [0, level === 0 ? 1 : 0.3 + level * 0.2]
  );

  return (
    <motion.div
      className="w-full aspect-square rounded-[2px]"
      style={{
        backgroundColor: levels[level].bg,
        opacity,
      }}
      title={date ? `${count} contributions on ${date}` : ""}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: weekIndex * 0.008 + dayIndex * 0.003,
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  );
}
