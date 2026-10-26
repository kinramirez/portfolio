import { useState } from "react";

// Small version of the folder from the Projects page
const MINI_CLIP =
  "polygon(0 8px, 1px 6px, 4px 5px, 7px 5px, 38% 5px, 44% 0, calc(100% - 8px) 0, calc(100% - 3px) 1px, 100% 5px, 100% 100%, 0 100%)";
const TAB_CLIP = "polygon(0 0, calc(100% - 8px) 0, 100% 100%, 0 100%)";

const PAPER_SHADES = ["#b9b9cc", "#d4d4e2", "#f0f0f8"]; // back → front
const PAPER_TOP = 4; // top offset of the back-most paper (px)
const PAPER_STEP = 4; // visible strip per paper (px)
const MAX_PAPERS = 3;

export default function MiniFolder({ item }) {
  const [hovered, setHovered] = useState(false);

  // One paper per system (1 for a regular project)
  const count = Math.min(item.systems?.length ?? 1, MAX_PAPERS);
  const frontTop = 16 + count * PAPER_STEP;
  const bodyTop = frontTop - 8;
  const tabTop = bodyTop - 11;

  const edge = hovered ? `${item.accent}99` : "#ffffff1c";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex min-w-0 flex-col"
      style={{ paddingTop: frontTop }}
    >
      {/* Back panel: tab */}
      <div
        style={{
          position: "absolute", left: 0, top: tabTop, width: "42%", height: 12,
          background: edge, clipPath: TAB_CLIP, borderRadius: "6px 0 0 0",
          transition: "background 0.3s",
        }}
      />
      <div
        style={{
          position: "absolute", left: 1, top: tabTop + 1, width: "calc(42% - 1px)", height: 12,
          background: "#242436", clipPath: TAB_CLIP, borderRadius: "5px 0 0 0",
        }}
      />

      {/* Back panel: body */}
      <div
        style={{
          position: "absolute", left: 0, right: 0, bottom: 0, top: bodyTop,
          background: "linear-gradient(180deg, #262638, #1e1e2c)",
          border: `1px solid ${edge}`, borderRadius: "0 10px 10px 10px",
          transition: "border-color 0.3s",
        }}
      />

      {/* Papers: one per system, back → front */}
      {Array.from({ length: count }, (_, k) => (
        <div
          key={k}
          style={{
            position: "absolute",
            top: PAPER_TOP + k * PAPER_STEP,
            left: 8 + k * 3,
            right: 8 + k * 3,
            height: 28,
            background: PAPER_SHADES[PAPER_SHADES.length - count + k],
            borderRadius: 3,
            boxShadow: "0 -1px 6px rgba(0,0,0,0.3)",
            transform: `translateY(${hovered ? -(2 + (count - k)) : 0}px) rotate(${k % 2 === 0 ? -0.8 : 0.8}deg)`,
            transition: "transform 0.3s",
          }}
        />
      ))}

      {/* Front panel (border layer + content layer) */}
      <div
        className="relative flex min-w-0 flex-1"
        style={{
          background: edge, clipPath: MINI_CLIP, borderRadius: "0 0 12px 12px",
          padding: 1, transition: "background 0.3s",
        }}
      >
        <div
          className="flex min-w-0 flex-1 flex-col justify-between gap-2 bg-[#1a1a26] p-3 pt-4"
          style={{ clipPath: MINI_CLIP, borderRadius: "0 0 11px 11px" }}
        >
          <span className="text-xl leading-none">{item.emoji}</span>
          <div className="min-w-0">
            <p className="truncate font-['DM_Mono'] text-xs text-primary">{item.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}