import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const CELL = 60; // grid cell size in px, matches your original grid
const ACCENT = "71, 217, 255"; // #47d9ff as rgb

export default function InteractiveGrid() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  // raw pointer position (relative to the hero)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // smoothed position: the light "floats" after the cursor instead of snapping
  const sx = useSpring(x, { stiffness: 110, damping: 22, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 110, damping: 22, mass: 0.7 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const center = () => {
      const r = el.getBoundingClientRect();
      return { cx: r.width / 2, cy: r.height * 0.45 }; // roughly behind the headline
    };

    // start at the resting position (behind "Hi, I'm Kin")
    const { cx, cy } = center();
    x.set(cx);
    y.set(cy);
    sx.jump?.(cx);
    sy.jump?.(cy);

    if (reduceMotion) return; // keep the light still for reduced-motion users

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      // ignore when the pointer is outside the hero
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };

    // ease back to the resting spot when the cursor leaves the window
    const onLeave = () => {
      const c = center();
      x.set(c.cx);
      y.set(c.cy);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onLeave);
    };
  }, [x, y, sx, sy, reduceMotion]);

  // soft blue-white glow that follows the cursor
  const glow = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(${ACCENT}, 0.13), transparent 70%)`;

  // mask that reveals the bright grid only around the cursor
  const mask = useMotionTemplate`radial-gradient(240px circle at ${sx}px ${sy}px, black 0%, transparent 100%)`;

  const gridLines = (alpha) =>
    `linear-gradient(to right, ${alpha} 2px, transparent 2px), linear-gradient(to bottom, ${alpha} 1px, transparent 1px)`;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* 1. base grid (always visible, very faint) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: gridLines("rgba(255,255,255,0.04)"),
          backgroundSize: `${CELL}px ${CELL}px`,
        }}
      />

      {/* 2. glow behind the headline */}
      <motion.div className="absolute inset-0" style={{ background: glow }} />

      {/* 3. lit grid: same grid, accent-colored, only visible under the cursor */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: gridLines(`rgba(${ACCENT}, 0.28)`),
          backgroundSize: `${CELL}px ${CELL}px`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    </div>
  );
}

/* ---------------------------------------------------------------
   HOW TO USE (in your Hero section)

   import InteractiveGrid from "./InteractiveGrid";

   <section id="home" className="relative min-h-screen overflow-hidden">
     <InteractiveGrid />

     <div className="relative z-10 ...your existing hero content...">
       ...
     </div>
   </section>

   Remove your old static grid + glow background from the hero,
   since this component replaces both.
---------------------------------------------------------------- */