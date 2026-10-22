import { useState } from "react";
import { C, FONT, FOLDER_BODY, RADIUS } from "../../theme";

// One folder index tab. Rounded top corners, and the active tab opens into the folder body.
export default function FolderTab({ label, isActive, accent, onClick }) {
  const [hovered, setHovered] = useState(false);

  const fill = isActive ? FOLDER_BODY : hovered ? "#1f1f2e" : "#161621";
  const edge = isActive ? accent + "66" : "#ffffff1c";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="tab"
      aria-selected={isActive}
      style={{
        position: "relative",
        flexShrink: 0,
        cursor: "pointer",
        background: fill,
        border: `1px solid ${edge}`,
        borderBottom: "none",
        borderRadius: `${RADIUS.tab}px ${RADIUS.tab}px 0 0`,
        padding: isActive ? "13px 26px 12px" : "10px 24px 9px",
        marginBottom: isActive ? -1 : 0, // active tab covers the body's top border
        zIndex: isActive ? 3 : 1,
        transition: "padding 0.2s, background 0.2s, border-color 0.2s",
      }}
    >
      {isActive && (
        <span
          style={{
            position: "absolute", top: -1, left: RADIUS.tab, right: RADIUS.tab,
            height: 2, background: accent, borderRadius: 2,
          }}
        />
      )}
      <span
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          fontFamily: FONT.mono, fontSize: 12, letterSpacing: "0.05em", whiteSpace: "nowrap",
          color: isActive ? accent : hovered ? C.text : C.muted,
          transition: "color 0.2s",
        }}
      >
        <span style={{ fontSize: 13 }}>{isActive ? "📂" : "📁"}</span>
        {label}
      </span>
    </button>
  );
}