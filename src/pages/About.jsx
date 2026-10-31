import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  animate,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import Profile from "../assets/images/Toga.png";

const RESUME_URL =
  "https://drive.google.com/file/d/19SMn_ezcyB8fSlE2Ro733wLU9z2nRGXM/view?usp=sharing";

const ACCENT = "71, 217, 255"; // #47d9ff as rgb
const BORDER = 3; // px, thickness of the animated line

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  // Angle of the two glowing arcs. It goes 0 → 360 and then back (back and forth)
  const angle = useMotionValue(0);
  // Brightness of the arcs (1 = full). Only changes when "Reduce motion" is on
  const pulse = useMotionValue(1);

  useEffect(() => {
    if (reduceMotion) {
      // No movement: the arcs stay in their corners and slowly fade up and down
      angle.set(0);
      const controls = animate(pulse, [1, 0.35], {
        duration: 4, // seconds per fade (one direction)
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      });
      return () => controls.stop();
    }

    pulse.set(1);
    const controls = animate(angle, 360, {
      duration: 7, // seconds per lap (one direction)
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    });
    return () => controls.stop();
  }, [angle, pulse, reduceMotion]);

  // Three background layers, top to bottom:
  //   1. the photo (inside the border)
  //   2. a solid dark fill (so the arcs never show through the photo)
  //   3. the two arcs (visible only in the border area)
  const backgroundImage = useMotionTemplate`url("${Profile}"), linear-gradient(#0a0a0f, #0a0a0f), conic-gradient(from ${angle}deg, transparent 0deg, rgba(${ACCENT}, ${pulse}) 28deg, transparent 56deg, transparent 180deg, rgba(${ACCENT}, ${pulse}) 208deg, transparent 236deg, transparent 360deg)`;

  return (
    <section id="about" className="relative flex items-center justify-center">
      <div
        ref={ref}
        className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center"
      >
        {/* Image side: one element, size comes from .about-photo in App.css */}
        <motion.div
          role="img"
          aria-label="Kin James Ramirez"
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="about-photo"
          style={{
            border: `${BORDER}px solid transparent`,
            borderRadius: 16,
            backgroundImage,
            backgroundSize: "cover, 100% 100%, 100% 100%",
            backgroundPosition: "center top, 0 0, 0 0",
            backgroundRepeat: "no-repeat",
            backgroundOrigin: "padding-box, padding-box, border-box",
            backgroundClip: "padding-box, padding-box, border-box",
            boxShadow: `0 0 0 1px rgba(255,255,255,0.07), 0 0 40px -12px rgba(${ACCENT}, 0.35)`,
          }}
        />

        {/* Text side */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.p
            variants={fadeUp}
            className="font-['DM_Mono'] text-accent text-xs tracking-[0.15em] uppercase mb-4"
          >
            About Me
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-['Syne'] font-extrabold text-primary mb-6 leading-tight tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Crafting fast, responsive, and beautiful web interfaces
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-['DM_Mono'] font-light text-muted text-sm leading-relaxed mb-5"
          >
            I'm a front-end developer focused on building fast, responsive, and visually polished web interfaces. I specialize in React and modern CSS, and take pride in translating designs into clean, maintainable code that works beautifully across devices.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="font-['DM_Mono'] font-light text-muted text-sm leading-relaxed mb-10"
          >
            I care deeply about the details — spacing, motion, accessibility, and performance. Outside of work, I'm always exploring new tools, building side projects, and sharpening my craft.
          </motion.p>

          {/* transition-colors (not transition-all) so CSS doesn't fight Framer's motion */}
          <motion.button
            variants={fadeUp}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-transparent border border-accent text-accent px-8 py-3 rounded-lg cursor-pointer font-['Syne'] font-bold text-sm tracking-wide transition-colors duration-200 hover:bg-accent hover:text-bg"
            onClick={() => window.open(RESUME_URL, "_blank", "noopener,noreferrer")}
          >
            View Resume
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}