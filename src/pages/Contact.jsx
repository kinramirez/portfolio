import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const FORM_ENDPOINT = "https://api.web3forms.com/submit";

const EMAIL = "james.kin.ramirez@gmail.com";

// Opens Gmail's compose window with the recipient and subject filled in
const gmailCompose = (to, subject = "") =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}`;

const ArrowRight = () => (
  <svg className="text-bg h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

// Outlined check-circle for the success screen. The circle draws first, then the check
const CheckCircle = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
    className="mx-auto mb-5 h-16 w-16 text-accent"
    style={{ filter: "drop-shadow(0 0 8px rgba(71, 217, 255, 0.45))" }}
  >
    <motion.circle
      cx="32"
      cy="32"
      r="28"
      stroke="currentColor"
      strokeWidth="2.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
    <motion.path
      d="M20 33l8 8 16-17"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
    />
  </svg>
);

// Logos for Email and Phone are drawn inline (no logo exists for them)
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-8 w-8 text-accent",
};

const MailIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg {...iconProps}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const devicon = (name) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;

// `icon` = an inline drawing, `logo` = an image URL (or an imported file).
// `invert: true` flips a black logo to white. `copy: true` = clicking copies the value instead of opening a link.
const CONTACTS = [
  { label: "Email",    val: EMAIL,                              href: gmailCompose(EMAIL, "Portfolio inquiry"), icon: <MailIcon /> },
  { label: "LinkedIn", val: "linkedin.com/in/kin-james-ramirez", href: "https://linkedin.com/in/kin-james-ramirez", logo: devicon("linkedin") },
  { label: "GitHub",   val: "github.com/kinramirez",             href: "https://github.com/kinramirez", logo: devicon("github"), invert: true },
  { label: "Phone",    val: "63+ 9751788814",                    copy: true, icon: <PhoneIcon /> },
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

// Logo image. If it fails to load, show the first two letters instead
function Logo({ item }) {
  const [failed, setFailed] = useState(false);

  if (item.icon) return item.icon;

  if (failed) {
    return (
      <span className="font-['Syne'] text-lg font-bold text-accent">
        {item.label.slice(0, 2)}
      </span>
    );
  }

  return (
    <img
      src={item.logo}
      alt=""
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
      className="h-8 w-8 object-contain"
      style={{ filter: item.invert ? "invert(1)" : undefined }}
    />
  );
}

// One logo tile: a link, or a copy button when there is no link
function ContactTile({ item, onActive, onCopy }) {
  const isLink = Boolean(item.href);
  const Tag = isLink ? motion.a : motion.button;

  const linkProps = isLink
    ? {
        href: item.href,
        ...(item.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" }),
      }
    : { type: "button", onClick: () => onCopy(item) };

  return (
    <Tag
      {...linkProps}
      variants={fadeUp}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => onActive(item)}
      onMouseLeave={() => onActive(null)}
      onFocus={() => onActive(item)}
      onBlur={() => onActive(null)}
      aria-label={isLink ? `${item.label}: ${item.val}` : `Copy ${item.label.toLowerCase()} number: ${item.val}`}
      className="flex h-[76px] w-[76px] cursor-pointer items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-accent/50 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-accent/10 focus-visible:border-accent focus-visible:outline-none"
    >
      <Logo item={item} />
    </Tag>
  );
}

const EMPTY_FORM = { name: "", email: "", message: "" };

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState(EMPTY_FORM);
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "error"
  const [errorMsg, setErrorMsg] = useState("");
  const [active, setActive] = useState(null); // the logo being hovered
  const [copied, setCopied] = useState(null); // label of the item just copied

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    // Spam trap: real visitors never see this field, bots fill it in
    if (new FormData(e.currentTarget).get("botcheck")) {
      setSent(true);
      return;
    }

    if (!ACCESS_KEY) {
      setStatus("error");
      setErrorMsg("The form isn't set up yet. Please email me directly instead.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio message from ${form.name}`,
          from_name: "Portfolio contact form",
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSent(true);
        setStatus("idle");
        setForm(EMPTY_FORM);
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Couldn't send your message. Check your connection and try again, or email me directly.");
    }
  };

  const handleCopy = async (item) => {
    try {
      await navigator.clipboard.writeText(item.val);
      setCopied(item.label);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard blocked: the caption still shows the number */
    }
  };

  const inputCls =
    "w-full bg-card border border-white/[0.07] rounded-xl px-4 py-3.5 text-primary font-['DM_Mono'] text-sm outline-none transition-colors duration-200 focus:border-accent placeholder:text-muted";

  const sending = status === "sending";

  return (
    <section id="contact" className="relative flex items-center justify-center">
      <div
        ref={ref}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center"
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
            className="font-['DM_Mono'] font-light text-muted text-sm leading-loose mb-10"
          >
            I'm open to full-time roles, freelance projects, and collaborations.
            If you've got something interesting in mind, let's talk — I reply within 24 hours.
          </motion.p>

          {/* Logo tiles (class is contact-logos so the old .contact-list rules in App.css don't apply) */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="contact-logos flex flex-wrap gap-4"
          >
            {CONTACTS.map((item) => (
              <ContactTile key={item.label} item={item} onActive={setActive} onCopy={handleCopy} />
            ))}
          </motion.div>

          {/* Caption: shows the label and value of the hovered logo */}
          <div className="mt-5 min-h-[44px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={active ? active.label : "hint"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                {active ? (
                  <>
                    <div className="font-['DM_Mono'] text-[10px] uppercase tracking-widest text-muted">
                      {active.label}
                    </div>
                    <div className="mt-0.5 font-['DM_Mono'] text-sm text-primary">
                      {copied === active.label ? "Copied to clipboard ✓" : active.val}
                    </div>
                  </>
                ) : (
                  <div className="font-['DM_Mono'] text-xs text-muted">Hover a logo to see the details</div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="contact-form bg-surface border border-white/[0.07] rounded-3xl p-10"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                role="status"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <CheckCircle />
                <h3 className="font-['Syne'] text-accent text-2xl mb-3">Message Sent!</h3>
                <p className="font-['DM_Mono'] text-muted text-sm mb-6">
                  Thanks for reaching out. I'll get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="font-['DM_Mono'] text-xs text-accent underline-offset-4 hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="font-['Syne'] font-bold text-primary text-xl mb-7">
                  Send a Message
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    name="name"
                    placeholder="Your Name"
                    required
                    autoComplete="name"
                    className={inputCls}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    name="email"
                    placeholder="Email Address"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputCls}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <textarea
                    name="message"
                    placeholder="Your message..."
                    rows={3}
                    required
                    className={`${inputCls} resize-y`}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />

                  {/* Spam trap: hidden from people, bots tend to tick it */}
                  <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" />

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={sending ? undefined : { scale: 1.03 }}
                    whileTap={sending ? undefined : { scale: 0.97 }}
                    className="w-full bg-accent text-bg border-none py-4 rounded-xl cursor-pointer font-['Syne'] font-bold text-sm flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {sending ? (
                      "Sending…"
                    ) : (
                      <>
                        Send Message
                        <ArrowRight />
                      </>
                    )}
                  </motion.button>

                  {status === "error" && (
                    <p role="alert" className="font-['DM_Mono'] text-xs leading-relaxed text-red-400">
                      {errorMsg}
                    </p>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}