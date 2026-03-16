import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const C = {
  bg: "#0a0a0f",
  surface: "#12121a",
  card: "#1a1a26",
  border: "#ffffff12",
  accent: "#e8ff47",
  accentDim: "#e8ff4730",
  text: "#f0f0f8",
  muted: "#8888aa",
};

const PROJECTS = [
  { title: "Personal Portfolio", desc: "Designed and built this portfolio from scratch using React and Framer Motion — fully responsive with fluid scroll animations.", tags: ["React", "Framer Motion", "CSS"], emoji: "🧑‍💻", accent: "#e8ff47" },
  { title: "Campus Event Platform", desc: "Web app for discovering and registering for events, featuring a clean dashboard UI and real-time updates.", tags: ["React", "Tailwind", "Firebase"], emoji: "📅", accent: "#47d9ff" },
  { title: "Weather Dashboard", desc: "Real-time weather app consuming OpenWeather API with animated condition icons and a 5-day forecast view.", tags: ["JavaScript", "REST API", "CSS3"], emoji: "🌤️", accent: "#ff7c47" },
  { title: "Habit Tracker App", desc: "Productivity app with streak tracking, local persistence, and smooth micro-animations that make habits satisfying.", tags: ["React", "LocalStorage", "CSS Modules"], emoji: "✅", accent: "#a347ff" },
  { title: "Restaurant Landing Page", desc: "Fully responsive multi-section landing page built pixel-perfectly from a Figma design spec.", tags: ["HTML", "CSS Grid", "Vanilla JS"], emoji: "🍽️", accent: "#47ff9c" },
  { title: "Movie Discovery App", desc: "Search and browse movies via TMDB API with a responsive card grid, filters, and favourite bookmarking.", tags: ["React", "TMDB API", "Zustand"], emoji: "🎬", accent: "#ff4791" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } }),
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function ProjectCard({ project, i, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ background: C.card, border: `1px solid ${hovered ? project.accent + "55" : C.border}`, borderRadius: 16, padding: "32px", cursor: "pointer", transition: "border-color 0.3s", position: "relative", overflow: "hidden" }}
    >
      <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
        style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at top right, ${project.accent}0d, transparent 60%)`, pointerEvents: "none" }} />

      <div style={{ fontSize: 36, marginBottom: 20 }}>{project.emoji}</div>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, margin: "0 0 12px", letterSpacing: "-0.02em" }}>{project.title}</h3>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: C.muted, lineHeight: 1.7, margin: "0 0 24px", fontWeight: 300 }}>{project.desc}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
        {project.tags.map((tag) => (
          <span key={tag} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: project.accent, background: `${project.accent}18`, border: `1px solid ${project.accent}33`, borderRadius: 6, padding: "4px 10px", letterSpacing: "0.05em" }}>{tag}</span>
        ))}
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <motion.span whileHover={{ color: project.accent }} style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: C.muted, cursor: "pointer", transition: "color 0.2s" }}>
          Live →
        </motion.span>
        <motion.span whileHover={{ color: project.accent }} style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: C.muted, cursor: "pointer", transition: "color 0.2s" }}>
          GitHub →
        </motion.span>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" style={{ background: C.surface, padding: "120px 2rem" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"} style={{ textAlign: "center", marginBottom: 72 }}>
          <motion.p variants={fadeUp} style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: C.accent, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Portfolio</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: C.text, margin: "0 0 16px", letterSpacing: "-0.03em" }}>
            Featured Projects
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, color: C.muted, maxWidth: 500, margin: "0 auto", lineHeight: 1.7, fontWeight: 300 }}>
            A selection of things I've designed and built — personal projects, experiments, and real-world work.
          </motion.p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} i={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}