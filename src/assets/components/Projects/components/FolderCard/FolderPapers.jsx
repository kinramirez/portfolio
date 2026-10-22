import { motion } from "framer-motion";
import { FONT } from "../../theme";
import { PAPER_STEP, PAPER_TOP, PAPER_SHADES } from "./constants";

const shadeFor = (k, count) =>
  PAPER_SHADES[Math.min(PAPER_SHADES.length - 1, k + Math.max(0, PAPER_SHADES.length - count))];

// One paper per system, stacked back → front
export default function FolderPapers({ systems, hovered }) {
  const count = systems.length;

  return systems.map((system, k) => {
    const tilt = (k % 2 === 0 ? -1 : 1) * (0.5 + (k % 3) * 0.3);

    return (
      <motion.div
        key={system.name}
        animate={{
          y: hovered ? -(8 + (count - k) * 3) : 0,
          rotate: hovered ? tilt * 2 : tilt,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 18, delay: hovered ? k * 0.03 : 0 }}
        style={{
          position: "absolute",
          top: PAPER_TOP + k * PAPER_STEP,
          left: 18 + k * 4,
          right: 18 + k * 4,
          height: 110,
          background: shadeFor(k, count),
          borderRadius: 6,
          boxShadow: "0 -2px 10px #00000040",
          transformOrigin: "bottom center",
        }}
      >
        <div
          style={{
            height: PAPER_STEP, display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 12px", fontFamily: FONT.mono, fontSize: 11, color: "#0a0a0f", letterSpacing: "0.04em",
          }}
        >
          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>📄 {system.name}</span>
          <span style={{ opacity: 0.55, fontSize: 10 }}>{k + 1}/{count}</span>
        </div>
      </motion.div>
    );
  });
}