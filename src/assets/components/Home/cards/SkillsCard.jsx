import { motion } from "framer-motion";
import BentoCard from "../BentoCard";

const BELTS = [
  {
    label: "FRONT-END",
    tone: "front",
    duration: 30,
    reverse: false,
    items: [
      "React",
      "TypeScript",
      "JavaScript",
      "Vite",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "Axios",
      "Framer Motion",
      "HTML & CSS",
    ],
  },
  {
    label: "BACK-END",
    tone: "back",
    duration: 26,
    reverse: true,
    items: ["Node.js", "REST APIs", "Supabase", "PostgreSQL", "Postman"],
  },
];

// Full class strings so Tailwind keeps them
const TONES = {
  front: "border-accent/25 bg-accent/10 text-accent",
  back: "border-[#a347ff]/30 bg-[#a347ff]/10 text-[#c9a0ff]",
};

const EDGE_FADE = "linear-gradient(to right, transparent, black 8%, black 92%, transparent)";

// Endless belt. The track repeats 4x and slides by half, so it loops with no gap.
function Belt({ items, tone, reverse, duration }) {
  const track = [...items, ...items, ...items, ...items];

  return (
    <div
      className="flex-1 overflow-hidden"
      style={{ WebkitMaskImage: EDGE_FADE, maskImage: EDGE_FADE }}
    >
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
        className="flex w-max"
      >
        {track.map((label, idx) => (
          <span key={`${label}-${idx}`} className="pr-2">
            <span
              className={`whitespace-nowrap rounded-full border px-3 py-1 font-['DM_Mono'] text-[11px] ${TONES[tone]}`}
            >
              {label}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function SkillsCard({ onNavigate, i, className }) {
  return (
    <BentoCard
      page="Skills"
      onNavigate={onNavigate}
      icon="⚡"
      title="Skills"
      i={i}
      className={className}
      fade={false}
    >
      <div className="flex flex-col gap-3">
        {BELTS.map((belt) => (
          <div key={belt.label} className="flex items-center gap-3">
            <span className="w-[76px] shrink-0 font-['DM_Mono'] text-[10px] tracking-widest text-muted">
              {belt.label}
            </span>
            <Belt items={belt.items} tone={belt.tone} reverse={belt.reverse} duration={belt.duration} />
          </div>
        ))}
      </div>
    </BentoCard>
  );
}