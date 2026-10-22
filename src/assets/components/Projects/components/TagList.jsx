import { FONT } from "../theme";

export default function TagList({ tags, accent }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
      {tags.map((tag) => (
        <span
          key={tag}
          style={{ fontFamily: FONT.mono, fontSize: 11, color: accent, background: `${accent}18`, border: `1px solid ${accent}33`, borderRadius: 6, padding: "4px 10px", letterSpacing: "0.05em" }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}