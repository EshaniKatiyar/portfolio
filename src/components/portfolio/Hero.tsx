import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Scramble } from "./Scramble";
import { ParticleField } from "./ParticleField";

import { PortraitTilt } from "./PortraitTilt";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Slow ambient rotation for the glow orb
  const glowRot = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Particle constellation network */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticleField />
      </div>

      {/* Large ambient glow orb behind portrait area */}
      <motion.div
        style={{ rotate: glowRot }}
        className="absolute -right-[20vw] top-[10vh] w-[60vw] h-[60vw] rounded-full pointer-events-none z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="w-full h-full rounded-full animate-pulse-slow"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, color-mix(in oklch, var(--color-orange) 18%, transparent) 0%, color-mix(in oklch, var(--color-orange) 6%, transparent) 45%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Giant typographic wallpaper ticker */}
      

      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-start px-6 lg:px-16 pt-32 pb-16 relative z-10">
        {/* Name — full width, one line, massive */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ opacity: fade }}
          className="order-1 lg:col-span-12 display text-[11vw] sm:text-[12vw] lg:text-[11vw] xl:text-[10vw] leading-[0.9] tracking-tighter whitespace-nowrap"
        >
          Eshani Katiyar
        </motion.h1>

        {/* Portrait — left column below headline */}
        <motion.div
          initial={{ opacity: 0, y: 14, clipPath: "inset(100% 0 0 0)" }}
          animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.6, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 w-full lg:col-span-5 xl:col-span-4"
        >
          <PortraitTilt y={imgY} scale={imgScale}>
            <div
              className="relative w-full h-full select-none"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            >
              <img
                src="/portrait.jpg"
                alt="Eshani Katiyar"
                draggable={false}
                className="w-full h-full object-cover pointer-events-none select-none [-webkit-user-drag:none] [-webkit-touch-callout:none]"
                loading="eager"
              />
              {/* Transparent overlay blocks long-press / right-click save on the image itself */}
              <div className="absolute inset-0" aria-hidden="true" />
            </div>
          </PortraitTilt>
        </motion.div>

        {/* Overview — right column below headline */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
          style={{ opacity: fade }}
          className="order-3 lg:col-span-7 xl:col-span-8 flex flex-col gap-3 self-center"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-70 text-orange">
            <Scramble text="// about" />
          </div>
          <p className="font-mono text-sm lg:text-base leading-relaxed">
            A Pre Final year Information Technology student at Manipal Institute of Technology, Bengaluru.{" "}
            Working at the edge of{" "}
            <span className="relative inline-block cursor-pointer group">
              <span className="relative z-10 underline underline-offset-4 decoration-orange/60 transition-colors duration-300 group-hover:text-orange">Software Development</span>
              <span className="absolute inset-0 bg-orange/0 group-hover:bg-orange/10 transition-colors duration-300 -mx-1 px-1 rounded-sm" />
            </span>
            ,{" "}
            <span className="relative inline-block cursor-pointer group">
              <span className="relative z-10 underline underline-offset-4 decoration-orange/60 transition-colors duration-300 group-hover:text-orange">Agentic AI</span>
              <span className="absolute inset-0 bg-orange/0 group-hover:bg-orange/10 transition-colors duration-300 -mx-1 px-1 rounded-sm" />
            </span>
            ,{" "}
            <span className="relative inline-block cursor-pointer group">
              <span className="relative z-10 underline underline-offset-4 decoration-orange/60 transition-colors duration-300 group-hover:text-orange">Full-Stack Development</span>
              <span className="absolute inset-0 bg-orange/0 group-hover:bg-orange/10 transition-colors duration-300 -mx-1 px-1 rounded-sm" />
            </span>
            {" "}and{" "}
            <span className="relative inline-block cursor-pointer group">
              <span className="relative z-10 underline underline-offset-4 decoration-orange/60 transition-colors duration-300 group-hover:text-orange">Quantum Computing</span>
              <span className="absolute inset-0 bg-orange/0 group-hover:bg-orange/10 transition-colors duration-300 -mx-1 px-1 rounded-sm" />
            </span>
            {" "}with particular interest in multi-agent orchestration, and Computer Vision.{" "}
            Currently interning as an AI Engineering intern at QuantGlobal.
          </p>
        </motion.div>
      </div>

      <div className="border-t hairline" />
    </section>
  );
}
