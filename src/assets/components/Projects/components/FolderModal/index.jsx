import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { C, FONT, FOLDER_BODY, RADIUS } from "../../theme";
import { EASE } from "../../animations";
import useModalBehavior from "../../hooks/useModalBehavior";
import FolderTab from "./FolderTab";
import SystemPanel from "./SystemPanel";

export default function FolderModal({ folder, onClose }) {
  const [active, setActive] = useState(0);
  const system = folder.systems[active];

  useModalBehavior(onClose);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "#000000b3", backdropFilter: "blur(6px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.35, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        style={{ background: C.card, border: `1px solid ${folder.accent}33`, borderRadius: RADIUS.modal, width: "100%", maxWidth: 720, maxHeight: "90vh", overflowY: "auto", padding: "36px", position: "relative" }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ position: "absolute", top: 16, right: 16, background: "transparent", border: `1px solid ${C.border}`, color: C.muted, borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontFamily: FONT.mono, fontSize: 14 }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ fontSize: 32, marginBottom: 12 }}>{folder.emoji}</div>
        <h3 style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 26, color: C.text, margin: "0 0 8px", letterSpacing: "-0.03em" }}>{folder.title}</h3>
        <p style={{ fontFamily: FONT.mono, fontSize: 13, color: C.muted, lineHeight: 1.7, margin: "0 0 8px", fontWeight: 300 }}>{folder.desc}</p>
        <p style={{ fontFamily: FONT.mono, fontSize: 12, color: folder.accent, margin: "0 0 28px", letterSpacing: "0.03em" }}>{folder.flow}</p>

        {/* Folder index tabs (above the body so the active tab can overlap it) */}
        <div role="tablist" style={{ display: "flex", alignItems: "flex-end", flexWrap: "wrap", gap: 4, position: "relative", zIndex: 3 }}>
          {folder.systems.map((s, idx) => (
            <FolderTab
              key={s.name}
              label={s.name}
              isActive={idx === active}
              accent={folder.accent}
              onClick={() => setActive(idx)}
            />
          ))}
        </div>

        {/* Folder body that the active tab opens into */}
        <div
          role="tabpanel"
          style={{
            position: "relative", zIndex: 2,
            background: FOLDER_BODY,
            border: `1px solid ${folder.accent}66`,
            borderRadius: active === 0 ? `0 ${RADIUS.folderBody}px ${RADIUS.folderBody}px ${RADIUS.folderBody}px` : RADIUS.folderBody,
            padding: "28px",
            transition: "border-radius 0.2s",
          }}
        >
          <AnimatePresence mode="wait">
            <SystemPanel key={system.name} system={system} accent={folder.accent} />
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}