import { useState } from "react";
import { useRouter } from "next/router";
import UploadPage from "./upload";

const PRESET_STYLES = [
  {
    id: "japandi",
    label: "Japandi Calm",
    prompt:
      "Transform the room into a Japandi modern interior with neutral tones, natural wood, clean lines, low furniture, and a peaceful zen atmosphere.",
  },
  {
    id: "modern",
    label: "Modern Minimal",
    prompt:
      "Transform the room into a modern minimal interior with white walls, black accents, sleek furniture, hidden storage, and large statement lighting.",
  },
  {
    id: "luxury",
    label: "Luxury Hotel",
    prompt:
      "Transform the room into a luxury hotel suite with warm lighting, high-end finishes, marble accents, plush textiles, and a dramatic centerpiece.",
  },
  {
    id: "scandi",
    label: "Scandinavian Cozy",
    prompt:
      "Transform the room into a Scandinavian cozy interior with light wood, soft textiles, simple forms, lots of natural light, and plants.",
  },
];

export default function Home() {
  const router = useRouter();
  const defaultPrompt = PRESET_STYLES[0].prompt;
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [restylePrompt, setRestylePrompt] = useState(defaultPrompt);
  const [restyledImageUrl, setRestyledImageUrl] = useState(null);
  const [isRestyling, setIsRestyling] = useState(false);
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [activePresetId, setActivePresetId] = useState(PRESET_STYLES[0].id);

  async function handleRestyle(promptOverride) {
    if (!uploadedImageUrl) {
      alert("Upload a room photo first.");
      return;
    }

    setIsRestyling(true);
    setError(null);
    const promptToUse = promptOverride || restylePrompt;
    setStatusMessage("Restyling… please wait.");
    setRestyledImageUrl(null);

    try {
      const res = await fetch("/api/restyle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: uploadedImageUrl,
          prompt: promptToUse,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Unknown error");
        setStatusMessage("");
        return;
      }

      setRestyledImageUrl(data.assetUrl);
      setStatusMessage("Done! Enjoy your newly styled room.");
    } catch (err) {
      setError(err.message);
      setStatusMessage("");
    } finally {
      setIsRestyling(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px 24px 64px",
        background: "#050505",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1200 }}>
        <header style={{ marginBottom: 32 }}>
          <p style={{ color: "#8c8c8c", letterSpacing: 2, fontSize: 12 }}>
            ROOM RESTYLE
          </p>
          <h1 style={{ margin: "8px 0 12px", fontSize: 36 }}>
            Generate new looks for any room in seconds.
          </h1>
          <p style={{ color: "#bcbcbc", maxWidth: 640 }}>
            Upload a single room photo, choose a preset, and let Lou-re imagine
            the space in a new style using the Luma Photon API.
          </p>
        </header>

        <section
          style={{
            background: "rgba(255,255,255,0.03)",
            padding: 20,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.07)",
            marginBottom: 32,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Upload a room photo</h3>
          <p style={{ color: "#9d9d9d", marginBottom: 16 }}>
            Choose a single JPG or PNG image. We’ll store it securely via
            Supabase storage.
          </p>
          <UploadPage onUpload={(url) => setUploadedImageUrl(url)} />
        </section>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            marginBottom: 32,
          }}
        >
          <ImageColumn
            title="Original photo"
            imageUrl={uploadedImageUrl}
            placeholder="Upload a room photo to preview it here."
          />
          <ImageColumn
            title="AI restyled photo"
            imageUrl={restyledImageUrl}
            placeholder="Run a restyle to see the AI output."
            footer={
              restyledImageUrl ? (
                <button
                  type="button"
                  onClick={() => router.push("/viewer")}
                  style={{
                    marginTop: 16,
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: 999,
                    cursor: "pointer",
                  }}
                >
                  Open 3D Sample Room
                </button>
              ) : null
            }
          />
        </div>

        <section
          style={{
            background: "rgba(255,255,255,0.03)",
            padding: 24,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {PRESET_STYLES.map((style) => {
              const isActive = activePresetId === style.id;
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => {
                    setActivePresetId(style.id);
                    setRestylePrompt(style.prompt);
                    handleRestyle(style.prompt);
                  }}
                  style={{
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: isActive
                      ? "rgba(59,130,246,0.35)"
                      : "rgba(255,255,255,0.08)",
                    color: "#fff",
                    padding: "8px 16px",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  {style.label}
                </button>
              );
            })}
          </div>

          <label style={{ display: "block", marginTop: 20, marginBottom: 8 }}>
            Restyle prompt
          </label>
          <textarea
            value={restylePrompt}
            onChange={(e) => {
              setRestylePrompt(e.target.value);
              setActivePresetId(null);
            }}
            style={{
              width: "100%",
              minHeight: 110,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              padding: 16,
              fontSize: 15,
              fontFamily: "inherit",
            }}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <button
              onClick={handleRestyle}
              disabled={isRestyling}
              style={{
                background: isRestyling ? "#1e40af" : "#2563eb",
                color: "#fff",
                border: "none",
                padding: "12px 28px",
                borderRadius: 999,
                fontSize: 16,
                cursor: isRestyling ? "wait" : "pointer",
                transition: "background 0.2s ease",
              }}
            >
              {isRestyling ? "Restyling…" : "Generate Restyle"}
            </button>
            {statusMessage && (
              <span style={{ color: "#9fb5ff" }}>{statusMessage}</span>
            )}
            {error && (
              <span style={{ color: "#ff7b7b" }}>Error: {error}</span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function ImageColumn({ title, imageUrl, placeholder, footer }) {
  return (
    <div>
      <h3 style={{ marginBottom: 12 }}>{title}</h3>
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            style={{
              width: "100%",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
              display: "block",
            }}
          />
          {footer}
        </>
      ) : (
        <div
          style={{
            height: 320,
            borderRadius: 16,
            border: "1px dashed rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#7c7c7c",
            textAlign: "center",
            padding: 24,
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(0,0,0,0.6))",
          }}
        >
          {placeholder}
        </div>
      )}
    </div>
  );
}
