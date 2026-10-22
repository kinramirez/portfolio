import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const SKILL_GROUPS = [
  {
    label: "Core",
    skills: [
      { name: "HTML5 / CSS3",      level: 85 },
      { name: "JavaScript (ES6+)", level: 75 },
      { name: "React",             level: 70 },
      { name: "TypeScript",        level: 55 },
    ],
  },
  {
    label: "Styling & UI",
    skills: [
      { name: "Tailwind CSS",       level: 72 },
      { name: "SASS / CSS Modules", level: 65 },
      { name: "Framer Motion",      level: 60 },
      { name: "Figma → Code",       level: 68 },
    ],
  },
  {
    label: "Tooling",
    skills: [
      { name: "Git / GitHub",      level: 70 },
      { name: "Vite / Webpack",    level: 55 },
      { name: "REST APIs",         level: 65 },
      { name: "Responsive Design", level: 80 },
    ],
  },
];

function SkillBar({ name, level, inView }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="font-['DM_Mono'] text-sm text-primary">{name}</span>
        <span className="font-['DM_Mono'] text-xs text-accent">{level}%</span>
      </div>
      <div className="h-1 bg-bg rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #e8ff47 0%, #b8ff00 100%)" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="bg-bg py-32 px-8">
      <div ref={ref} className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="font-['DM_Mono'] text-accent text-xs tracking-[0.15em] uppercase mb-3"
          >
            My Stack
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-['Syne'] font-extrabold text-primary m-0 tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Skills & Technologies
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {SKILL_GROUPS.map(({ label, skills }, gi) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: gi * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="bg-card border border-white/[0.07] rounded-2xl p-8"
            >
              <div className="flex items-center gap-2.5 mb-7">
                <div className="w-8 h-8 rounded-lg bg-[#e8ff4730] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                </div>
                <span className="font-['Syne'] font-bold text-primary text-base">{label}</span>
              </div>
              {skills.map((s) => (
                <SkillBar key={s.name} {...s} inView={inView} />
              ))}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}