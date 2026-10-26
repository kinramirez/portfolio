export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-8 px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span className="font-['DM_Mono'] text-xs text-muted">
          © {new Date().getFullYear()} Kin James Ramirez. All rights reserved.
        </span>
        <span className="font-['DM_Mono'] text-xs text-muted">
          Built with React + Tailwind
        </span>
      </div>
    </footer>
  );
}