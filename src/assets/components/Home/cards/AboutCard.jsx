import BentoCard from "../BentoCard";

const FACTS = [
  "🎓 BSIT, Cum Laude",
  "💻 Front-End Dev",
  "📍 Philippines",
  "🏢 Client projects",
  "⚛️ React + TypeScript",
];

export default function AboutCard({ onNavigate, i, className }) {
  return (
    <BentoCard
      page="About"
      onNavigate={onNavigate}
      icon="👋"
      title="About me"
      i={i}
      className={className}
      fade={false}
    >
      <div className="flex flex-wrap gap-2">
        {FACTS.map((fact) => (
          <span
            key={fact}
            className="whitespace-nowrap rounded-lg border border-white/[0.08] bg-white/[0.05] px-3 py-1.5 font-['DM_Mono'] text-[11px] text-primary"
          >
            {fact}
          </span>
        ))}
      </div>
    </BentoCard>
  );
}