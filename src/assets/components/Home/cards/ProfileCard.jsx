import { motion } from "framer-motion";

// Static intro card (not a nav button). It has its own two action buttons.
export default function ProfileCard({ onNavigate, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col items-center overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-b from-accent/10 to-white/[0.02] p-6 text-center ${className}`}
    >
      {/* Availability badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-[#47d9ff30] px-3.5 py-1.5">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
        <span className="font-['DM_Mono'] text-[10px] tracking-widest text-accent">AVAILABLE FOR WORK</span>
      </div>

      {/* Avatar placeholder: replace with <img src={...} className="h-full w-full object-cover" /> */}
      <div className="mb-6 flex h-36 w-36 items-center justify-center overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/30 to-white/5 font-['Syne'] text-5xl font-extrabold text-primary">
        K
      </div>

      <p className="font-['DM_Mono'] text-[11px] tracking-[0.2em] text-muted">HI, I'M</p>
      <h1 className="mt-1 font-['Syne'] text-5xl font-extrabold leading-none tracking-[-0.04em] text-primary">
        <span className="text-accent">Kin</span>
      </h1>

      <div className="my-4 h-px w-3/4 bg-accent/40" />

      <p className="font-['Syne'] text-base text-primary">Front-End Developer</p>
      <p className="mt-3 max-w-[240px] font-['DM_Mono'] text-xs font-light leading-relaxed text-muted">
        Building fast, responsive, and visually polished interfaces with clean code and an eye for detail.
      </p>

      <div className="mt-auto flex w-full flex-col gap-2.5 pt-6">
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onNavigate("Projects")}
          className="cursor-pointer rounded-lg border-none bg-accent px-6 py-3 font-['Syne'] text-sm font-bold tracking-wide text-bg"
        >
          View Work
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onNavigate("Contact")}
          className="cursor-pointer rounded-lg border border-white/[0.12] bg-transparent px-6 py-3 font-['Syne'] text-sm font-bold tracking-wide text-muted transition-all duration-200 hover:border-primary hover:text-primary"
        >
          Contact Me
        </motion.button>
      </div>
    </motion.div>
  );
}