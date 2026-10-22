import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 px-8 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-white/[0.07]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-[68px]">

        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
            <span className="font-['Syne'] font-extrabold text-base text-bg">K</span>
          </div>
          <span className="font-['Syne'] font-bold text-primary text-lg tracking-tight">
            Kin James Ramirez
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <motion.button
              key={link}
              whileHover={{ color: "#e8ff47" }}
              onClick={() => scrollTo(link)}
              className="bg-transparent border-none cursor-pointer font-['DM_Mono'] text-muted text-xs tracking-widest uppercase transition-colors duration-200"
            >
              {link}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#e8ff47" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("Contact")}
            className="bg-transparent border border-accent text-accent px-5 py-2 rounded-md cursor-pointer font-['DM_Mono'] text-xs tracking-wide transition-all duration-200"
          >
            Hire me
          </motion.button>
        </nav>

      </div>
    </motion.header>
  );
}