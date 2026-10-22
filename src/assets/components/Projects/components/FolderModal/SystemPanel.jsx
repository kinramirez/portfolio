import { motion } from "framer-motion";
import { C, FONT } from "../../theme";
import StepList from "./StepList";

// Content for one system: role, summary, "How to use" steps, and the Open button
export default function SystemPanel({ system, accent }) {
  return (
    <motion.div
      key={system.name}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
    >
      <p style={{ fontFamily: FONT.mono, fontSize: 11, color: accent, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 8px" }}>
        {system.role}
      </p>
      <p style={{ fontFamily: FONT.mono, fontSize: 13, color: C.text, lineHeight: 1.7, margin: "0 0 20px", fontWeight: 300 }}>
        {system.summary}
      </p>

      <p style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 14, color: C.text, margin: "0 0 12px" }}>How to use</p>
      <StepList steps={system.steps} accent={accent} />

      <motion.a
        href={system.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{ display: "inline-block", fontFamily: FONT.mono, fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", color: "#0a0a0f", background: accent, borderRadius: 8, padding: "10px 20px", textDecoration: "none" }}
      >
        Open {system.name} app →
      </motion.a>
    </motion.div>
  );
}