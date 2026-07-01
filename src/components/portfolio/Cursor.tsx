import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import koi from "@/assets/koi-cursor.png";

export function Cursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 120, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 18, mass: 0.6 });

  const angle = useMotionValue(0);
  const sAngle = useSpring(angle, { stiffness: 80, damping: 20 });
  const rotate = useTransform(sAngle, (a) => `${a}deg`);
  const scaleY = useTransform(sAngle, (a) => {
    const n = ((a % 360) + 360) % 360;
    return n > 90 && n < 270 ? -1 : 1;
  });

  const [hover, setHover] = useState(false);
  const lastRef = useRef({ x: -200, y: -200 });
  const lastRippleRef = useRef({ x: -9999, y: -9999, t: 0 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; big?: boolean }[]>([]);
  const idRef = useRef(0);

  const spawnRipple = (x: number, y: number, big = false) => {
    const id = ++idRef.current;
    setRipples((r) => [...r, { id, x, y, big }]);
    window.setTimeout(() => {
      setRipples((r) => r.filter((p) => p.id !== id));
    }, big ? 1400 : 1100);
  };

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const dx = e.clientX - lastRef.current.x;
      const dy = e.clientY - lastRef.current.y;
      if (Math.hypot(dx, dy) > 2) {
        angle.set((Math.atan2(dy, dx) * 180) / Math.PI);
        lastRef.current = { x: e.clientX, y: e.clientY };
      }
      // spawn trailing ripples as koi swims
      const now = performance.now();
      const ddx = e.clientX - lastRippleRef.current.x;
      const ddy = e.clientY - lastRippleRef.current.y;
      if (Math.hypot(ddx, ddy) > 45 && now - lastRippleRef.current.t > 90) {
        lastRippleRef.current = { x: e.clientX, y: e.clientY, t: now };
        spawnRipple(e.clientX, e.clientY);
      }
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[data-cursor]"));
    };
    const down = (e: MouseEvent) => spawnRipple(e.clientX, e.clientY, true);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
    };
  }, [x, y, angle]);

  return (
    <>
      {/* pond ripples — page-space */}
      <div className="pointer-events-none fixed inset-0 z-[9998] hidden md:block overflow-hidden">
        <AnimatePresence>
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              initial={{ opacity: 0.7, scale: 0.15 }}
              animate={{ opacity: 0, scale: r.big ? 8 : 5.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: r.big ? 1.8 : 1.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ left: r.x, top: r.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-orange/65"
            >
              <span
                style={{ width: r.big ? 80 : 52, height: r.big ? 80 : 52, display: "block" }}
              />
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      >
        {/* hover halo */}
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 absolute rounded-full border-2 border-orange"
          initial={false}
          animate={
            hover
              ? { width: 110, height: 110, opacity: 0.85 }
              : { width: 0, height: 0, opacity: 0 }
          }
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
        />
        {/* concentric pond rings — always pulsing under the koi */}
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="-translate-x-1/2 -translate-y-1/2 absolute rounded-full border border-orange/45"
            initial={{ width: 10, height: 10, opacity: 0 }}
            animate={{ width: 120, height: 120, opacity: [0, 0.6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: i * 1.0 }}
          />
        ))}
        <motion.div style={{ rotate }} className="-translate-x-1/2 -translate-y-1/2">
          <motion.div
            style={{ scaleY }}
            animate={
              hover
                ? { width: 84, height: 84, rotate: [0, -10, 10, -7, 7, 0] }
                : { width: 56, height: 56, rotate: 0 }
            }
            transition={
              hover
                ? {
                    width: { type: "spring", stiffness: 200, damping: 18 },
                    height: { type: "spring", stiffness: 200, damping: 18 },
                    rotate: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
                  }
                : { type: "spring", stiffness: 200, damping: 20 }
            }
            className="drop-shadow-[0_4px_14px_rgba(0,0,0,0.45)]"
          >
            <img
              src={koi}
              alt=""
              width={512}
              height={512}
              className="w-full h-full object-contain select-none"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
