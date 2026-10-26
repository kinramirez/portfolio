import { useState } from "react";
import { motion } from "framer-motion";
import { C, FONT } from "../../theme";
import { EASE } from "../../animations";
import TagList from "../TagList";
import FolderBackPanel from "./FolderBackPanel";
import FolderPapers from "./FolderPapers";
import { FRONT_CLIP, HEADER_HEIGHT } from "./constants";

// A regular project (one without `systems`) is a single system, so it gets one paper.
// To rename it, add `files: ["Something else"]` to that project in data/projects.js.
const DEFAULT_FILES = ["Overview"];

export default function FolderCard({ folder, i, inView, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const edge = hovered ? folder.accent + "66" : "#ffffff1c";

  // A folder with systems opens a modal. A regular project is just a folder to look at.
  const hasSystems = Array.isArray(folder.systems) && folder.systems.length > 0;
  const papers = hasSystems
    ? folder.systems
    : (folder.files ?? DEFAULT_FILES).map((name) => ({ name }));

  const count = papers.length;
  // Same for every folder, so they all line up
  const frontTop = HEADER_HEIGHT;

  const open = () => onOpen(folder);

  return (
    <motion.div
      className="folder-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={hasSystems ? open : undefined}
      role={hasSystems ? "button" : undefined}
      tabIndex={hasSystems ? 0 : undefined}
      onKeyDown={
        hasSystems ? (e) => (e.key === "Enter" || e.key === " ") && open() : undefined
      }
      style={{
        position: "relative",
        paddingTop: frontTop,
        cursor: hasSystems ? "pointer" : "default",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <FolderBackPanel frontTop={frontTop} edge={edge} />
      <FolderPapers systems={papers} hovered={hovered} />

      {/* Front panel (border layer + content layer) */}
      <div
        style={{
          position: "relative", flex: 1, display: "flex",
          background: edge, clipPath: FRONT_CLIP, borderRadius: "0 0 16px 16px",
          padding: 1, transition: "background 0.3s",
        }}
      >
        <div
          className="folder-card-content"
          style={{
            position: "relative", flex: 1, overflow: "hidden",
            background: C.card, clipPath: FRONT_CLIP, borderRadius: "0 0 15px 15px",
            padding: "46px 32px 32px",
          }}
        >
          {/* Hover glow */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute", inset: 0,
              background: `radial-gradient(circle at top right, ${folder.accent}0d, transparent 60%)`,
              pointerEvents: "none",
            }}
          />

          {/* Top row: fixed height, so the title sits at the same place whether or not there is a badge */}
          <div
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              height: 36, marginBottom: 20,
            }}
          >
            <div style={{ fontSize: 36, lineHeight: 1 }}>{folder.emoji}</div>
            {hasSystems && (
              <span
                style={{
                  fontFamily: FONT.mono, fontSize: 11, color: folder.accent,
                  background: `${folder.accent}18`, border: `1px solid ${folder.accent}33`,
                  borderRadius: 999, padding: "4px 12px", letterSpacing: "0.05em",
                }}
              >
                {count} {count === 1 ? "system" : "systems"}
              </span>
            )}
          </div>

          <h3 style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 20, color: C.text, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
            {folder.title}
          </h3>
          <p style={{ fontFamily: FONT.mono, fontSize: 13, color: C.muted, lineHeight: 1.7, margin: "0 0 24px", fontWeight: 300 }}>
            {folder.desc}
          </p>

          <TagList tags={folder.tags} accent={folder.accent} />
        </div>
      </div>
    </motion.div>
  );
}