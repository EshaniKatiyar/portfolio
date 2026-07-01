import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function Scramble({ text, className, trigger = 0 }: { text: string; className?: string; trigger?: number }) {
  const [out, setOut] = useState(text);
  const frame = useRef(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const from = out;
    const to = text;
    const length = Math.max(from.length, to.length);
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
    for (let i = 0; i < length; i++) {
      const f = from[i] || "";
      const t = to[i] || "";
      const start = Math.floor(Math.random() * 30);
      const end = start + Math.floor(Math.random() * 30);
      queue.push({ from: f, to: t, start, end });
    }
    frame.current = 0;
    const update = () => {
      let output = "";
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const q = queue[i];
        if (frame.current >= q.end) {
          complete++;
          output += q.to;
        } else if (frame.current >= q.start) {
          if (!q.char || Math.random() < 0.28) q.char = CHARS[Math.floor(Math.random() * CHARS.length)];
          output += q.char;
        } else {
          output += q.from;
        }
      }
      setOut(output);
      if (complete === queue.length) {
        if (raf.current) cancelAnimationFrame(raf.current);
      } else {
        frame.current++;
        raf.current = requestAnimationFrame(update);
      }
    };
    raf.current = requestAnimationFrame(update);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger]);

  return <span className={className}>{out}</span>;
}
