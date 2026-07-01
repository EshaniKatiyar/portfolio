import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseVx: number;
  baseVy: number;
}

function isLowEndDevice(): boolean {
  const cores = navigator.hardwareConcurrency || 4;
  const mem = (navigator as any).deviceMemory;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  if (mem !== undefined && mem < 4) return true;
  if (cores <= 2) return true;
  if (isMobile && cores <= 4) return true;
  return false;
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lowEnd = isLowEndDevice();
    const dpr = lowEnd ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const COUNT = lowEnd ? 35 : 90;
    const CONNECT_DIST = lowEnd ? 100 : 140;
    const MOUSE_RADIUS = lowEnd ? 120 : 180;
    const particles: Particle[] = [];

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        const vx = (Math.random() - 0.5) * 0.4;
        const vy = (Math.random() - 0.5) * 0.4;
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx,
          vy,
          radius: Math.random() * 1.2 + 0.6,
          baseVx: vx,
          baseVy: vy,
        });
      }
    }

    resize();
    initParticles();

    let moveRaf = 0;
    const onMove = (e: MouseEvent) => {
      if (moveRaf) return;
      moveRaf = requestAnimationFrame(() => {
        const rect = canvas!.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        moveRaf = 0;
      });
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    const onResize = () => {
      resize();
      initParticles();
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      visibleRef.current = !document.hidden;
      if (visibleRef.current && !rafRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    function draw() {
      if (!visibleRef.current) {
        rafRef.current = 0;
        return;
      }

      ctx!.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update + draw connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion
        const dxm = p.x - mx;
        const dym = p.y - my;
        const distMouse = Math.hypot(dxm, dym);
        if (distMouse < MOUSE_RADIUS && distMouse > 0.1) {
          const force = (MOUSE_RADIUS - distMouse) / MOUSE_RADIUS;
          p.vx += (dxm / distMouse) * force * 0.15;
          p.vy += (dym / distMouse) * force * 0.15;
        }

        // Damping back to base velocity
        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.22;
            ctx!.beginPath();
            ctx!.strokeStyle = `oklch(0.62 0.17 55 / ${alpha})`;
            ctx!.lineWidth = lowEnd ? 0.5 : 0.6;
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = "oklch(0.62 0.17 55 / 0.6)";
        ctx!.fill();

        if (!lowEnd) {
          // Glow — skipped on low-end devices
          const glow = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 6);
          glow.addColorStop(0, "oklch(0.62 0.17 55 / 0.12)");
          glow.addColorStop(1, "oklch(0.62 0.17 55 / 0)");
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.radius * 6, 0, Math.PI * 2);
          ctx!.fillStyle = glow;
          ctx!.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(moveRaf);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 0.85 }}
    />
  );
}
