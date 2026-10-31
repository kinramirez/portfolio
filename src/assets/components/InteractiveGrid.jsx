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

  // raw pointer position (relative to the viewport)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // smoothed position: the light "floats" after the cursor instead of snapping
  const sx = useSpring(x, { stiffness: 110, damping: 22, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 110, damping: 22, mass: 0.7 });

  // With "Reduce motion" on, the light still follows the cursor (you are moving it yourself),
  // but without the floating delay or the glide back to the resting spot.
  const px = reduceMotion ? x : sx;
  const py = reduceMotion ? y : sy;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const center = () => {
      const r = el.getBoundingClientRect();
      return { cx: r.width / 2, cy: r.height * 0.45 }; // resting spot of the light
    };

    // start at the resting position
    const { cx, cy } = center();
    x.set(cx);
    y.set(cy);
    sx.jump?.(cx);
    sy.jump?.(cy);

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      // ignore when the pointer is outside the viewport
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };

    // return to the resting spot when the cursor leaves the window
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
  }, [x, y, sx, sy]);

  // soft blue-white glow that follows the cursor
  const glow = useMotionTemplate`radial-gradient(520px circle at ${px}px ${py}px, rgba(${ACCENT}, 0.13), transparent 70%)`;

  // mask that reveals the bright grid only around the cursor
  const mask = useMotionTemplate`radial-gradient(240px circle at ${px}px ${py}px, black 0%, transparent 100%)`;

  const gridLines = (alpha) =>
    `linear-gradient(to right, ${alpha} 2px, transparent 2px), linear-gradient(to bottom, ${alpha} 1px, transparent 1px)`;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* 1. base grid (always visible, very faint) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: gridLines("rgba(255,255,255,0.04)"),
          backgroundSize: `${CELL}px ${CELL}px`,
        }}
      />

      {/* 2. glow that follows the cursor */}
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
