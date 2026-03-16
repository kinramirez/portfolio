import { useEffect } from "react";
import Header from "./assets/components/Header";
import About from "./assets/components/About";
import Projects from "./assets/components/Projects";
import Skills from "./assets/components/Skills";
import Hero from "./assets/components/Hero";
import Contact from "./assets/components/Contact";
import Footer from "./assets/components/Footer";

// ── Tokens ──────────────────────────────────────────────────────────────────
const C = {
  bg: "#0a0a0f",
  surface: "#12121a",
  card: "#1a1a26",
  border: "#ffffff12",
  accent: "#e8ff47",
  accentDim: "#e8ff4730",
  text: "#f0f0f8",
  muted: "#8888aa",
};

const injectFonts = () => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@300;400;500&display=swap";
  document.head.appendChild(link);
};

// ── Utility animations ───────────────────────────────────────────────────────

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

// ── APP ──────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  useEffect(() => {
    injectFonts();
    document.body.style.margin = "0";
    document.body.style.background = C.bg;
  }, []);

  return (
    <div style={{ background: C.bg, color: C.text, overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; }
        ::selection { background: ${C.accent}; color: ${C.bg}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.accent}; border-radius: 3px; }
        @media (max-width: 900px) {
          .grid-2col { grid-template-columns: 1fr !important; }
          .grid-3col { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .grid-3col { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}