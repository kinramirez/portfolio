import { useRef, useState } from "react";
import { useInView, AnimatePresence } from "framer-motion";
import { FOLDERS } from "../assets/components/Projects/data/folders";
import { PROJECTS } from "../assets/components/Projects/data/projects";
import SectionHeader from "../assets/components/Projects/components/SectionHeader";
import FolderCard from "../assets/components/Projects/components/FolderCard";
import FolderModal from "../assets/components/Projects/components/FolderModal";

// Everything is a folder: the multi-system folders first, then the regular projects
const ITEMS = [...FOLDERS, ...PROJECTS];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openFolder, setOpenFolder] = useState(null);

  return (
    <section id="projects">
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader inView={inView} />

        {/* One row, centered vertically. The inline rows/alignContent override the 2-row rule in App.css */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gridTemplateRows: "auto",
            alignContent: "center",
            gap: 24,
          }}
        >
          {ITEMS.map((item, i) => (
            <FolderCard
              key={item.title}
              folder={item}
              i={i}
              inView={inView}
              onOpen={setOpenFolder}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openFolder && <FolderModal folder={openFolder} onClose={() => setOpenFolder(null)} />}
      </AnimatePresence>
    </section>
  );
}