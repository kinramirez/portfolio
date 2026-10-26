import { motion } from "framer-motion";

const FADE = "linear-gradient(to bottom, black 65%, transparent)";

// A clickable card: icon + title (+ optional description), with an optional preview underneath.
// The whole card is a button that navigates to `page`.
export default function BentoCard({
  page,
  onNavigate,
  icon,
  title,
  description,
  i = 0,
  className = "",
  fade = true,
  children,
}) {
  const mask = fade ? { WebkitMaskImage: FADE, maskImage: FADE } : undefined;

  return (
    <motion.button
      type="button"
      onClick={() => onNavigate(page)}
      aria-label={`Go to ${title}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.03] p-6 text-left backdrop-blur-md transition-colors duration-300 hover:border-accent/40 hover:bg-white/[0.05] ${className}`}
    >
      {/* Hover glow */}
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(71,217,255,0.10),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Header */}
      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/15 text-xl">
            {icon}
          </span>
          <h2 className="font-['Syne'] text-xl font-bold tracking-tight text-primary">{title}</h2>
        </div>
        <span className="-translate-x-1 translate-y-1 font-['DM_Mono'] text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
          ↗
        </span>
      </div>

      {description && (
        <p className="relative mt-3 font-['DM_Mono'] text-[13px] font-light leading-relaxed text-muted">
          {description}
        </p>
      )}

      {/* Preview area */}
      {children && (
        <div className="relative mt-5 flex-1 overflow-hidden" style={mask}>
          {children}
        </div>
      )}
    </motion.button>
  );
}