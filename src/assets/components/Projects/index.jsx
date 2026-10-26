import { useRef, useState } from "react";
import { useInView, AnimatePresence } from "framer-motion";
import { C } from "./theme";
import { FOLDERS } from "./data/folders";
import { PROJECTS } from "./data/projects";
import SectionHeader from "./components/SectionHeader";
import ProjectCard from "./components/ProjectCard";
import FolderCard from "./components/FolderCard";
import FolderModal from "./components/FolderModal";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openFolder, setOpenFolder] = useState(null);

  return (
    <section id="projects">
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader inView={inView} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {FOLDERS.map((folder, i) => (
            <FolderCard key={folder.title} folder={folder} i={i} inView={inView} onOpen={setOpenFolder} />
          ))}
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} i={i + FOLDERS.length} inView={inView} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openFolder && <FolderModal folder={openFolder} onClose={() => setOpenFolder(null)} />}
      </AnimatePresence>
    </section>
  );
}