import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SKILLS, TOOLS } from "../assets/data/skills";
import { fadeUp, stagger, EASE } from "../assets/components/Projects/animations";
import { FOLDER_BODY, RADIUS } from "../assets/components/Projects/theme";
import FolderTab from "../assets/components/Projects/components/FolderModal/FolderTab";

// Pick the layout: "wall" | "belts" | "folder"
const VARIANT = "wall";

const ACCENT = "#47d9ff";
const EDGE_FADE = "linear-gradient(to right, transparent, black 6%, black 94%, transparent)";

/* ---------- shared pieces ---------- */

// Logo image. If it fails to load, show the first two letters instead
function Logo({ item }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="font-['Syne'] text-lg font-bold text-accent">
        {item.name.slice(0, 2)}
      </span>
    );
  }

  return (
    <img
      src={item.logo}
      alt={item.name}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
      className="h-9 w-9 object-contain"
      style={{ filter: item.invert ? "invert(1)" : undefined }}
    />
  );
}

// One logo tile. The name shows on hover (tooltip), or as a native title when tooltip is off
function Tile({ item, tooltip = true }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      title={tooltip ? undefined : item.name}
      className="group relative z-0 flex h-[76px] w-[76px] items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-colors duration-300 hover:z-20 hover:border-accent/50 hover:bg-white/[0.06]"
    >
      <Logo item={item} />
      {tooltip && (
        <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#1a1a26] px-2 py-1 font-['DM_Mono'] text-[10px] text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {item.name}
        </span>
      )}
    </motion.div>
  );
}

// Fade-and-rise entrance, staggered by index
function Reveal({ inView, i, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + i * 0.05, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- variant 1: wall ---------- */

function Group({ icon, title, items, inView, offset = 0 }) {
  return (
    <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur-sm">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="font-['Syne'] text-base font-bold text-primary">{title}</span>
        </div>
        <span className="font-['DM_Mono'] text-xs text-muted">{items.length}</span>
      </div>

      {/* pb-8 leaves room for the hover tooltip under the last row */}
      <div className="flex flex-wrap gap-4 pb-8">
        {items.map((item, i) => (
          <Reveal key={item.name} inView={inView} i={offset + i}>
            <Tile item={item} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function Wall({ inView }) {
  return (
    <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
      <Group icon="⚡" title="Skills" items={SKILLS} inView={inView} />
      <Group icon="🛠️" title="Tools" items={TOOLS} inView={inView} offset={SKILLS.length} />
    </div>
  );
}

/* ---------- variant 2: belts ---------- */

// Endless belt. The track repeats 4x and slides by half, so it loops with no gap
function BeltRow({ label, items, reverse = false, duration = 34 }) {
  const track = [...items, ...items, ...items, ...items];

  return (
    <div>
      <p className="mb-2 font-['DM_Mono'] text-[11px] uppercase tracking-[0.15em] text-muted">
        {label}
      </p>
      <div
        className="overflow-hidden py-3"
        style={{ WebkitMaskImage: EDGE_FADE, maskImage: EDGE_FADE }}
      >
        <motion.div
          animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
          transition={{ duration, ease: "linear", repeat: Infinity }}
          className="flex w-max"
        >
          {track.map((item, idx) => (
            <div key={`${item.name}-${idx}`} className="pr-4">
              <Tile item={item} tooltip={false} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Belts({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      className="flex flex-col gap-6"
    >
      <BeltRow label="Skills" items={SKILLS} duration={36} />
      <BeltRow label="Tools" items={TOOLS} reverse duration={32} />
    </motion.div>
  );
}

/* ---------- variant 3: folder ---------- */

const TABS = [
  { label: "Skills", items: SKILLS },
  { label: "Tools", items: TOOLS },
];

function FolderView({ inView }) {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      className="mx-auto w-full max-w-4xl"
    >
      {/* Folder index tabs */}
      <div role="tablist" className="relative z-[3] flex flex-wrap items-end gap-1">
        {TABS.map((t, idx) => (
          <FolderTab
            key={t.label}
            label={t.label}
            isActive={idx === active}
            accent={ACCENT}
            onClick={() => setActive(idx)}
          />
        ))}
      </div>

      {/* Folder body that the active tab opens into */}
      <div
        role="tabpanel"
        className="relative z-[2] min-h-[240px] border p-8"
        style={{
          background: FOLDER_BODY,
          borderColor: `${ACCENT}66`,
          borderRadius:
            active === 0
              ? `0 ${RADIUS.folderBody}px ${RADIUS.folderBody}px ${RADIUS.folderBody}px`
              : RADIUS.folderBody,
          transition: "border-radius 0.2s",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap gap-4 pb-8"
          >
            {tab.items.map((item) => (
              <Tile key={item.name} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ---------- page ---------- */

const VARIANTS = { wall: Wall, belts: Belts, folder: FolderView };

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const View = VARIANTS[VARIANT] ?? Wall;

  return (
    // id is "skills-page" (not "skills") so the old #skills card rules in App.css don't apply
    <section id="skills-page" className="relative flex items-center justify-center">
      <div ref={ref} className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mb-12 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 font-['DM_Mono'] text-xs uppercase tracking-[0.15em] text-accent"
          >
            My Stack
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="m-0 font-['Syne'] font-extrabold tracking-[-0.03em] text-primary"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Skills & Tools
          </motion.h2>
        </motion.div>

        <View inView={inView} />
      </div>
    </section>
  );
}