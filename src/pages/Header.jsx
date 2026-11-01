import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = ["Home", "About", "Skills", "Projects"];

export default function Header({ activePage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigateTo = (page) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="site-header fixed top-0 left-0 right-0 z-50 px-8 bg-bg/90 backdrop-blur-xl border-b border-white/[0.07]"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-[68px]">
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigateTo("Home")}
          onKeyDown={(event) => event.key === "Enter" && navigateTo("Home")}
          role="button"
          tabIndex={0}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <span className="font-['Syne'] font-bold text-primary text-lg tracking-tight">
            Kin James Ramirez
          </span>
        </motion.div>

        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activePage === link;

            return (
              <button
                key={link}
                type="button"
                onClick={() => navigateTo(link)}
                aria-current={isActive ? "page" : undefined}
                className={`nav-link bg-transparent border-none cursor-pointer font-['DM_Mono'] text-xs tracking-widest uppercase transition-colors duration-150 ${
                  isActive ? "is-active text-accent" : "text-muted hover:text-accent"
                }`}
              >
                {link}
              </button>
            );
          })}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigateTo("Contact")}
            aria-current={activePage === "Contact" ? "page" : undefined}
            className={`hire-link border border-accent px-5 py-2 rounded-md cursor-pointer font-['DM_Mono'] text-xs tracking-wide transition-colors duration-200 ${
              activePage === "Contact" ? "bg-accent text-bg" : "bg-transparent text-accent"
            }`}
          >
            Hire me
          </motion.button>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </motion.header>
  );
}