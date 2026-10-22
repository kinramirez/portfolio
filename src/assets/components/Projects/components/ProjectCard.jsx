import { useState } from "react";
import { motion } from "framer-motion";
import { C, FONT } from "../theme";
import { EASE } from "../animations";
import TagList from "./TagList";

function LinkLabel({ children, accent }) {
  return (
    <motion.span
      whileHover={{ color: accent }}
      style={{ fontFamily: FONT.mono, fontSize: 12, color: C.muted, cursor: "pointer", transition: "color 0.2s" }}
    >
      {children}
    </motion.span>
  );
}

export default function ProjectCard({ project, i, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ background: C.card, border: `1px solid ${hovered ? project.accent + "55" : C.border}`, borderRadius: 16, padding: "32px", cursor: "pointer", transition: "border-color 0.3s", position: "relative", overflow: "hidden" }}
    >
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at top right, ${project.accent}0d, transparent 60%)`, pointerEvents: "none" }}
      />

      <div style={{ fontSize: 36, marginBottom: 20 }}>{project.emoji}</div>
      <h3 style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 20, color: C.text, margin: "0 0 12px", letterSpacing: "-0.02em" }}>{project.title}</h3>
      <p style={{ fontFamily: FONT.mono, fontSize: 13, color: C.muted, lineHeight: 1.7, margin: "0 0 24px", fontWeight: 300 }}>{project.desc}</p>

      <TagList tags={project.tags} accent={project.accent} />

      <div style={{ display: "flex", gap: 16 }}>
        <LinkLabel accent={project.accent}>Live →</LinkLabel>
        <LinkLabel accent={project.accent}>GitHub →</LinkLabel>
      </div>
    </motion.div>
  );
}