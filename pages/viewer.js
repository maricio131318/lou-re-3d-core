import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const ModelViewer = dynamic(() => import("../components/ModelViewer"), {
  ssr: false,
});

export default function ViewerPage() {
  const router = useRouter();
  const [viewerKey, setViewerKey] = useState(0);

  const modelFile = useMemo(() => {
    const roomModel =
      typeof router.query?.roomModel === "string"
        ? router.query.roomModel
        : null;
    return roomModel || "/models/the_morning_room/the_morning_room.glb";
  }, [router.query?.roomModel]);

  return (
    <div style={outerStyle}>
      <div style={overlayStyle}>
        <h2 style={{ margin: "0 0 8px", fontSize: 18 }}>3D Room Demo</h2>
        <p style={instructionStyle}>Drag to orbit</p>
        <p style={instructionStyle}>Scroll to zoom</p>
        <p style={instructionStyle}>Right-click + drag to pan</p>
        <button
          type="button"
          onClick={() => setViewerKey((key) => key + 1)}
          style={resetButtonStyle}
        >
          Reset camera
        </button>
      </div>

      <div style={{ width: "100%", height: "100%" }}>
        <ModelViewer
          key={viewerKey}
          // When roomModel query is present, load that GLB; otherwise use demo room.
          file={modelFile}
        />
      </div>
    </div>
  );
}

const outerStyle = {
  width: "100vw",
  height: "calc(100vh - 56px)",
  background: "#000",
  position: "relative",
  overflow: "hidden",
};

const overlayStyle = {
  position: "absolute",
  top: 16,
  left: 16,
  padding: "16px 18px",
  background: "rgba(0,0,0,0.65)",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#fff",
  zIndex: 2,
  width: 220,
};

const instructionStyle = {
  margin: "2px 0",
  fontSize: 13,
  color: "rgba(255,255,255,0.75)",
};

const resetButtonStyle = {
  marginTop: 12,
  width: "100%",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(59,130,246,0.25)",
  color: "#fff",
  padding: "8px 0",
  cursor: "pointer",
};
