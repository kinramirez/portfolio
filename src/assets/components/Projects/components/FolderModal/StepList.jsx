import { FONT } from "../../theme";
import { C } from "../../theme";

export default function StepList({ steps, accent }) {
  return (
    <ol style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "grid", gap: 10 }}>
      {steps.map((step, idx) => (
        <li key={idx} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span
            style={{
              fontFamily: FONT.mono, fontSize: 11, color: accent, background: `${accent}18`,
              border: `1px solid ${accent}33`, borderRadius: 6, minWidth: 24, height: 24,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            {idx + 1}
          </span>
          <span style={{ fontFamily: FONT.mono, fontSize: 13, color: C.muted, lineHeight: 1.7, fontWeight: 300 }}>{step}</span>
        </li>
      ))}
    </ol>
  );
}