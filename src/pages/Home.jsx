import ProfileCard from "../assets/components/Home/cards/ProfileCard";
import ProjectsCard from "../assets/components/Home/cards/ProjectsCard";
import SkillsCard from "../assets/components/Home/cards/SkillsCard";
import AboutCard from "../assets/components/Home/cards/AboutCard";
import ContactCard from "../assets/components/Home/cards/ContactCard";

// Desktop layout (3 columns, 3 rows):
//  ┌─────────┬─────────────┬───────────────┐
//  │         │             │    About      │
//  │ Profile │  Projects   ├───────────────┤
//  │ (tall)  │  (folders)  │    Contact    │
//  │         ├─────────────┴───────────────┤
//  │         │   Skills (front / back)     │
//  └─────────┴─────────────────────────────┘
export default function Home({ onNavigate }) {
  return (
    <section className="home-page relative flex items-center justify-center px-6 py-28">
      <div className="mx-auto w-full max-w-7xl rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm md:p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_1.5fr] md:grid-rows-[repeat(3,minmax(190px,auto))]">
          <ProfileCard
            onNavigate={onNavigate}
            className="md:col-start-1 md:row-start-1 md:row-span-3"
          />
          <ProjectsCard
            onNavigate={onNavigate}
            i={1}
            className="md:col-start-2 md:row-start-1 md:row-span-2"
          />
          <AboutCard
            onNavigate={onNavigate}
            i={2}
            className="md:col-start-3 md:row-start-1"
          />
          <ContactCard
            onNavigate={onNavigate}
            i={3}
            className="md:col-start-3 md:row-start-2"
          />
          <SkillsCard
            onNavigate={onNavigate}
            i={4}
            className="md:col-start-2 md:col-span-2 md:row-start-3"
          />
        </div>
      </div>
    </section>
  );
}