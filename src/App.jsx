import { useEffect, useState } from "react";
import Header from "./pages/Header";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import InteractiveGrid from "./assets/components/InteractiveGrid";


const C = {
  bg: "#0a0a0f",
  accent: "#47d9ff",
  text: "#f0f0f8",
};

const injectFonts = () => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@300;400;500&display=swap";
  document.head.appendChild(link);
};

const PAGE_COMPONENTS = {
  Home,
  About,
  Skills,
  Projects,
  Contact,
};

// Reads the page from the URL: "/#about" → "About". Anything unknown (or no hash) → "Home"
const pageFromHash = () => {
  const name = window.location.hash.replace(/^#\/?/, "").toLowerCase();
  return Object.keys(PAGE_COMPONENTS).find((p) => p.toLowerCase() === name) ?? "Home";
};

export default function Portfolio() {
  // Start from whatever the URL says, so a refresh stays on the same page
  const [activePage, setActivePage] = useState(pageFromHash);
  const Page = PAGE_COMPONENTS[activePage];

  useEffect(() => {
    injectFonts();
    document.body.style.margin = "0";
    document.body.style.background = C.bg;
  }, []);

  // Back / Forward buttons and manual edits of the address bar
  useEffect(() => {
    const syncFromUrl = () => {
      setActivePage(pageFromHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", syncFromUrl);
    window.addEventListener("hashchange", syncFromUrl);
    return () => {
      window.removeEventListener("popstate", syncFromUrl);
      window.removeEventListener("hashchange", syncFromUrl);
    };
  }, []);

  const navigateTo = (page) => {
    if (!PAGE_COMPONENTS[page]) return;
    setActivePage(page);
    // Home keeps a clean URL ("/"), the others get "/#about", "/#skills", ...
    const hash = page === "Home" ? "" : `#${page.toLowerCase()}`;
    window.history.pushState(null, "", `${window.location.pathname}${window.location.search}${hash}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className={`app-shell page-${activePage.toLowerCase()}`} style={{ color: C.text }}>
      <style>{`
        * { box-sizing: border-box; }
        ::selection { background: ${C.accent}; color: ${C.bg}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.accent}; border-radius: 3px; }
      `}</style>

      {/* Shared background: one grid for the whole site */}
      <InteractiveGrid />

      <Header activePage={activePage} onNavigate={navigateTo} />
      <main className="page-shell relative z-10" key={activePage}>
        <Page onNavigate={navigateTo} />
        <Footer />
      </main>
    </div>
  );
}