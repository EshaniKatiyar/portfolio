import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";

export function PortraitTilt({
  children,
  y,
  scale,
}: {
  children: ReactNode;
  y?: MotionValue<number>;
  scale?: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });

  const rotateX = useTransform(sy, [0, 1], [6, -6]);
  const rotateY = useTransform(sx, [0, 1], [-6, 6]);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ y, scale, rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className="relative aspect-[3/4] lg:aspect-[4/5] w-full max-w-sm sm:max-w-md mx-auto lg:mx-0 border hairline overflow-hidden bg-foreground/[0.04]"
    >
      {children}
      {/* Sheen overlay that follows mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            [sx, sy],
            ([x, y]) =>
              `radial-gradient(300px circle at ${(x as number) * 100}% ${(y as number) * 100}%, color-mix(in oklch, var(--color-foreground) 8%, transparent), transparent 60%)`
          ),
        }}
      />
    </motion.div>
  );
}
