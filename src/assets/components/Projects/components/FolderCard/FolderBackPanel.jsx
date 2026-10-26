// The back of the folder: the tab on the top left and the body behind the papers
export default function FolderBackPanel({ frontTop, edge }) {
  const tabClip = "polygon(0 0, calc(100% - 14px) 0, 100% 100%, 0 100%)";

  return (
    <>
      {/* Tab outline */}
      <div
        style={{
          position: "absolute", top: frontTop - 40, left: 0, width: "38%", height: 26,
          background: edge, borderRadius: "12px 0 0 0", clipPath: tabClip,
          transition: "background 0.3s",
        }}
      />
      {/* Tab fill */}
      <div
        style={{
          position: "absolute", top: frontTop - 39, left: 1, width: "calc(38% - 1px)", height: 26,
          background: "#242436", borderRadius: "11px 0 0 0", clipPath: tabClip,
        }}
      />
      {/* Body */}
      <div
        style={{
          position: "absolute", top: frontTop - 18, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(180deg, #3D3D5C  , #495C6E)",
          border: `1px solid ${edge}`, borderRadius: "0 14px 14px 14px",
          transition: "border-color 0.3s",
        }}
      />
    </>
  );
}