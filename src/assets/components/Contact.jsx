import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ArrowRight = () => (
  <svg className="text-bg h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

const CONTACTS = [
  { label: "Email",    val: "james.kin.ramirez@gmail.com",      icon: "✉️", href: "mailto:james.kin.ramirez@gmail.com" },
  { label: "LinkedIn", val: "linkedin.com/in/kin-james-ramirez", icon: "💼", href: "https://linkedin.com/in/kin-james-ramirez" },
  { label: "GitHub",   val: "github.com/kinramirez",            icon: "🐙", href: "https://github.com/kinramirez" },
  { label: "Phone Number", val: "63+ 9751788814",                    icon: "📱", href: null },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) setSent(true);
  };

  const handleContactClick = (href) => {
    if (href) {
      if (href.startsWith("mailto:")) {
        window.location.href = href;
      } else {
        window.open(href, "_blank", "noopener,noreferrer");
      }
    }
  };

  const inputCls =
    "w-full bg-card border border-white/[0.07] rounded-xl px-4 py-3.5 text-primary font-['DM_Mono'] text-sm outline-none transition-colors duration-200 focus:border-accent placeholder:text-muted";

  return (
    <section id="contact" className="bg-bg py-32 px-8">
      <div
        ref={ref}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-start"
      >
        {/* Left */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.p
            variants={fadeUp}
            className="font-['DM_Mono'] text-accent text-xs tracking-[0.15em] uppercase mb-4"
          >
            Get in touch
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-['Syne'] font-extrabold text-primary mb-6 leading-tight tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Let's build something <span className="text-accent">great</span> together
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-['DM_Mono'] font-light text-muted text-sm leading-loose mb-12"
          >
            I'm open to full-time roles, freelance projects, and collaborations.
            If you've got something interesting in mind, let's talk — I reply within 24 hours.
          </motion.p>

          {/* Contact cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex flex-col gap-4"
          >
            {CONTACTS.map(({ label, val, icon, href }) => (
              <motion.button
                key={label}
                variants={fadeUp}
                onClick={() => handleContactClick(href)}
                disabled={!href}
                className={`flex items-center gap-4 bg-card border border-white/[0.07] rounded-xl px-5 py-4 transition-all duration-200 text-left ${
                  href
                    ? "hover:border-accent hover:bg-surface cursor-pointer hover:shadow-lg hover:shadow-accent/10"
                    : "cursor-default"
                }`}
              >
                <span className="text-xl">{icon}</span>
                <div>
                  <div className="font-['DM_Mono'] text-[10px] text-muted tracking-widest uppercase">
                    {label}
                  </div>
                  <div className="font-['DM_Mono'] text-sm text-primary mt-0.5">
                    {val}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="bg-surface border border-white/[0.07] rounded-3xl p-10"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="text-6xl mb-5">🎉</div>
                <h3 className="font-['Syne'] text-accent text-2xl mb-3">Message Sent!</h3>
                <p className="font-['DM_Mono'] text-muted text-sm">
                  Thanks for reaching out. I'll get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="font-['Syne'] font-bold text-primary text-xl mb-7">
                  Send a Message
                </h3>
                <div className="flex flex-col gap-4">
                  <input
                    placeholder="Your Name"
                    className={inputCls}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    placeholder="Email Address"
                    type="email"
                    className={inputCls}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <textarea
                    placeholder="Your message..."
                    rows={6}
                    className={`${inputCls} resize-y`}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSubmit}
                    className="w-full bg-accent text-bg border-none py-4 rounded-xl cursor-pointer font-['Syne'] font-bold text-sm flex items-center justify-center gap-2"
                  >
                    Send Message
                    <ArrowRight />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}