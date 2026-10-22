import { motion } from "framer-motion";
import { C, FONT } from "../theme";
import { fadeUp, stagger } from "../animations";

export default function SectionHeader({ inView }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      style={{ textAlign: "center", marginBottom: 72 }}
    >
      <motion.p variants={fadeUp} style={{ fontFamily: FONT.mono, fontSize: 12, color: C.accent, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
        Portfolio
      </motion.p>
      <motion.h2 variants={fadeUp} style={{ fontFamily: FONT.display, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: C.text, margin: "0 0 16px", letterSpacing: "-0.03em" }}>
        Featured Projects
      </motion.h2>
      <motion.p variants={fadeUp} style={{ fontFamily: FONT.mono, fontSize: 14, color: C.muted, maxWidth: 500, margin: "0 auto", lineHeight: 1.7, fontWeight: 300 }}>
        A selection of things I've designed and built — personal projects, experiments, and real-world work.
      </motion.p>
    </motion.div>
  );
}