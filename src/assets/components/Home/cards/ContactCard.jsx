import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import BentoCard from "../BentoCard";

const MESSAGE = "Have a project in mind? Let's talk.";

// Types the text out, holds it, erases it, then loops.
// `done` is true while the full sentence is showing (that's when the button rings).
function useTypewriter(
  text,
  { typeSpeed = 70, deleteSpeed = 35, holdTime = 2800, pauseTime = 600 } = {}
) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    let delay = deleting ? deleteSpeed : typeSpeed;
    if (!deleting && count === text.length) delay = holdTime; // finished typing: hold (and ring)
    if (deleting && count === 0) delay = pauseTime; // finished erasing: short pause

    const id = setTimeout(() => {
      if (!deleting && count === text.length) setDeleting(true);
      else if (deleting && count === 0) setDeleting(false);
      else setCount((c) => c + (deleting ? -1 : 1));
    }, delay);

    return () => clearTimeout(id);
  }, [count, deleting, text, typeSpeed, deleteSpeed, holdTime, pauseTime, reduceMotion]);

  // People who prefer reduced motion just see the full sentence, with no ringing
  if (reduceMotion) return { typed: text, done: false };
  return { typed: text.slice(0, count), done: !deleting && count === text.length };
}

function Cursor() {
  return (
    <motion.span
      aria-hidden="true"
      className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-accent align-middle"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, times: [0, 0.5, 0.5, 1], repeat: Infinity }}
    />
  );
}

// Looks like a button, but the whole card is already the button.
// While `ringing` it shakes like a phone and sends out ripple rings.
function RingingButton({ ringing, children }) {
  return (
    <span className="relative">
      {/* Ripple rings */}
      {ringing &&
        [0, 0.45].map((delay) => (
          <motion.span
            key={delay}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-xl border-2 border-accent"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 1.22], opacity: [0.7, 0] }}
            transition={{ duration: 0.9, delay, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

      {/* The button: rattles left and right, pauses, rattles again */}
      <motion.span
        animate={ringing ? { rotate: [0, -14, 14, -14, 14, -8, 8, 0] } : { rotate: 0 }}
        transition={
          ringing
            ? { duration: 0.7, repeat: Infinity, repeatDelay: 0.45, ease: "easeInOut" }
            : { duration: 0.2 }
        }
        className="relative block whitespace-nowrap rounded-xl bg-accent px-4 py-3 font-['Syne'] text-xs font-bold tracking-wide text-bg"
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function ContactCard({ onNavigate, i, className }) {
  const { typed, done } = useTypewriter(MESSAGE);

  return (
    <BentoCard
      page="Contact"
      onNavigate={onNavigate}
      icon="✉️"
      title="Contact"
      i={i}
      className={className}
      fade={false}
    >
      {/* py-2 / pr-2 leave room so the ripples aren't clipped by the card */}
      <div className="flex items-center gap-3 py-2 pr-2">
        <div className="flex-1 truncate rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 font-['DM_Mono'] text-xs text-muted">
          {/* Screen readers get the full sentence; the typing is visual only */}
          <span className="sr-only">{MESSAGE}</span>
          <span aria-hidden="true">{typed}</span>
          <Cursor />
        </div>

        <RingingButton ringing={done}>Contact</RingingButton>
      </div>
    </BentoCard>
  );
}