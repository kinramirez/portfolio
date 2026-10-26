import BentoCard from "../BentoCard";
import MiniFolder from "../MiniFolder";
import { FOLDERS } from "../../Projects/data/folders";
import { PROJECTS } from "../../Projects/data/projects";

// Folders first, then regular projects
const PREVIEW = [...FOLDERS, ...PROJECTS].slice(0, 4);

export default function ProjectsCard({ onNavigate, i, className }) {
  return (
    <BentoCard
      page="Projects"
      onNavigate={onNavigate}
      icon="📁"
      title="Projects"
      i={i}
      className={className}
      fade={false}
    >
      <div className="grid h-full min-h-[260px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)] grid-rows-2 gap-x-3 gap-y-2">
        {PREVIEW.map((item) => (
          <MiniFolder key={item.title} item={item} />
        ))}
      </div>
    </BentoCard>
  );
}