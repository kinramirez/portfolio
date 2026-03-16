import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg">

      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff12 1px, transparent 1px), linear-gradient(90deg, #ffffff12 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow */}
      <div
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #e8ff4730 0%, transparent 70%)" }}
      />

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="text-center z-10 px-8 max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-[#e8ff4730] border border-accent/25 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse" />
          <span className="font-['DM_Mono'] text-accent text-xs tracking-widest">
            AVAILABLE FOR WORK
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-['Syne'] font-extrabold text-primary mb-6 leading-none tracking-[-0.04em]"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          Hi, I'm <span className="text-accent">Kin</span>
        </motion.h1>

        {/* Static role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-['Syne'] text-muted font-normal mb-6"
          style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)" }}
        >
          Front-End Developer
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-muted text-base leading-relaxed max-w-lg mx-auto mb-12 font-['DM_Mono'] font-light"
        >
          Front-End Developer building fast, responsive, and visually polished interfaces with clean code and an eye for detail.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-accent text-bg px-9 py-3.5 rounded-lg cursor-pointer font-['Syne'] font-bold text-sm tracking-wide border-none"
          >
            View Work
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-transparent text-muted border border-white/[0.07] px-9 py-3.5 rounded-lg cursor-pointer font-['Syne'] font-bold text-sm tracking-wide hover:border-primary hover:text-primary transition-all duration-200"
          >
            Contact Me
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll hint — outside floating div so it stays fixed at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-['DM_Mono'] text-muted text-[11px] tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown className="text-muted w-5 h-5" />
        </motion.div>
      </motion.div>

    </section>
  );
}