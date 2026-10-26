import { motion } from "framer-motion";
import { C } from "../../theme";
import {
  FRONT_CLIP,
  OPEN_SKEW,
  OPEN_SCALE,
  OPEN_SPRING,
  COUNTER_SCALE,
  COUNTER_SKEW,
} from "./constants";

// The front flap of the folder. On hover it leans and narrows like an open folder,
// while the content inside is counter-transformed so the text stays undistorted.
export default function FrontPanel({ hovered, edge, accent, children }) {
  return (
    <motion.div
      animate={{ skewX: hovered ? OPEN_SKEW : 0, scaleX: hovered ? OPEN_SCALE : 1 }}
      transition={OPEN_SPRING}
      style={{
        position: "relative",
        flex: 1,
        display: "flex",
        transformOrigin: "bottom left",
        background: edge,
        clipPath: FRONT_CLIP,
        borderRadius: "0 0 16px 16px",
        padding: 1,
        transition: "background 0.3s",
      }}
    >
      <div
        style={{
          position: "relative",
          flex: 1,
          overflow: "hidden",
          background: C.card,
          clipPath: FRONT_CLIP,
          borderRadius: "0 0 15px 15px",
        }}
      >
        {/* Glow */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at top right, ${accent}0d, transparent 60%)`,
            pointerEvents: "none",
          }}
        />

        {/* Content (counter-transformed) */}
        <motion.div
          animate={{
            skewX: hovered ? COUNTER_SKEW : 0,
            scaleX: hovered ? COUNTER_SCALE : 1,
          }}
          transition={OPEN_SPRING}
          style={{ position: "relative", padding: "46px 32px 32px", transformOrigin: "bottom left" }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}