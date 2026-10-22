import { useState } from "react";
import { motion } from "framer-motion";
import { C, FONT } from "../../theme";
import { EASE } from "../../animations";
import TagList from "../TagList";
import FolderBackPanel from "./FolderBackPanel";
import FolderPapers from "./FolderPapers";
import { FRONT_CLIP, PAPER_STEP, PAPER_TOP } from "./constants";

export default function FolderCard({ folder, i, inView, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const edge = hovered ? folder.accent + "66" : "#ffffff1c";

  const count = folder.systems.length;
  // Where the front panel starts: leaves room for every paper's label strip
  const frontTop = PAPER_TOP + count * PAPER_STEP;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onOpen(folder)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(folder)}
      style={{ position: "relative", paddingTop: frontTop, cursor: "pointer", display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box" }}
    >
      <FolderBackPanel frontTop={frontTop} edge={edge} />
      <FolderPapers systems={folder.systems} hovered={hovered} />

      {/* Front panel (border layer + content layer) */}
      <div
        style={{
          position: "relative", flex: 1, display: "flex",
          background: edge, clipPath: FRONT_CLIP, borderRadius: "0 0 16px 16px",
          padding: 1, transition: "background 0.3s",
        }}
      >
        <div
          style={{
            position: "relative", flex: 1, overflow: "hidden",
            background: C.card, clipPath: FRONT_CLIP, borderRadius: "0 0 15px 15px",
            padding: "46px 32px 32px",
          }}
        >
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at top right, ${folder.accent}0d, transparent 60%)`, pointerEvents: "none" }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div style={{ fontSize: 36 }}>{folder.emoji}</div>
            <span style={{ fontFamily: FONT.mono, fontSize: 11, color: folder.accent, background: `${folder.accent}18`, border: `1px solid ${folder.accent}33`, borderRadius: 999, padding: "4px 12px", letterSpacing: "0.05em" }}>
              {count} {count === 1 ? "system" : "systems"}
            </span>
          </div>

          <h3 style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 20, color: C.text, margin: "0 0 12px", letterSpacing: "-0.02em" }}>{folder.title}</h3>
          <p style={{ fontFamily: FONT.mono, fontSize: 13, color: C.muted, lineHeight: 1.7, margin: "0 0 24px", fontWeight: 300 }}>{folder.desc}</p>

          <TagList tags={folder.tags} accent={folder.accent} />

        </div>
      </div>
    </motion.div>
  );
}