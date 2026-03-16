import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { val: "10+",  label: "Projects Shipped" },
    { val: "5+",   label: "Tech Stack" },
    { val: "100%", label: "Passion for UI" },
    { val: "∞",    label: "Curiosity" },
  ];

  return (
    <section id="about" className="bg-surface py-32 px-8">
      <div
        ref={ref}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center"
      >
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div
            className="aspect-[4/5] rounded-2xl border border-white/[0.07] overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #1a1a26 0%, #0a0a0f 100%)" }}
          >
            {/* Placeholder avatar */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-24 h-24 rounded-full bg-[#e8ff4730] border-2 border-accent flex items-center justify-center">
                <span className="text-4xl">👤</span>
              </div>
              <span className="font-['DM_Mono'] text-xs text-muted">your-photo.jpg</span>
            </div>
            {/* Decorative corners */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-accent rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-accent rounded-bl-2xl" />
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.p
            variants={fadeUp}
            className="font-['DM_Mono'] text-accent text-xs tracking-[0.15em] uppercase mb-4"
          >
            About Me
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-['Syne'] font-extrabold text-primary mb-6 leading-tight tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Crafting fast, responsive, and beautiful web interfaces
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-['DM_Mono'] font-light text-muted text-sm leading-relaxed mb-5"
          >
            I'm a front-end developer focused on building fast, responsive, and visually polished web interfaces. I specialize in React and modern CSS, and take pride in translating designs into clean, maintainable code that works beautifully across devices.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="font-['DM_Mono'] font-light text-muted text-sm leading-relaxed mb-10"
          >
            I care deeply about the details — spacing, motion, accessibility, and performance. Outside of work, I'm always exploring new tools, building side projects, and sharpening my craft.
          </motion.p>

          <motion.button
            variants={fadeUp}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-transparent border border-accent text-accent px-8 py-3 rounded-lg cursor-pointer font-['Syne'] font-bold text-sm tracking-wide transition-all duration-200 hover:bg-accent hover:text-bg"
            onClick={() => window.open("https://drive.google.com/file/d/19SMn_ezcyB8fSlE2Ro733wLU9z2nRGXM/view?usp=sharing")}
          >
            View Resume
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}