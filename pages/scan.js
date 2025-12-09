import { useState } from "react";
import { useRouter } from "next/router";

export default function ScanPage() {
  const router = useRouter();
  const [videoFile, setVideoFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const onFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setVideoFile(file);
    setError("");
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    setError("");

    if (!videoFile) {
      setError("Please select a video first.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      setStatus("uploading");
      const response = await fetch("/api/scan-room", {
        method: "POST",
        body: formData,
      });
      setStatus("processing");

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Upload failed");
      }

      if (data?.roomModelUrl) {
        const encoded = encodeURIComponent(data.roomModelUrl);
        router.push(`/viewer?roomModel=${encoded}`);
        return;
      }

      setStatus("idle");
      setError("No room model returned. Please try again.");
    } catch (err) {
      console.error("Scan upload failed", err);
      setStatus("idle");
      setError(err.message || "Something went wrong");
    }
  };

  const statusText = (() => {
    if (status === "uploading") return "Uploading…";
    if (status === "processing") return "Processing…";
    return "";
  })();

  const isBusy = status === "uploading" || status === "processing";

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={{ margin: "0 0 8px" }}>Scan Room (beta)</h1>
        <p style={{ margin: "0 0 16px", color: "#4b5563", lineHeight: 1.5 }}>
          Record a slow walk-around video of your room (15–30 seconds), then
          upload it below.
        </p>

        <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="file"
            accept="video/*"
            capture="environment"
            onChange={onFileChange}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle} disabled={isBusy}>
            {isBusy ? statusText || "Working…" : "Upload & Process"}
          </button>

          {statusText && !error && (
            <p style={{ margin: 0, color: "#111827" }}>{statusText}</p>
          )}
          {error && (
            <p style={{ margin: 0, color: "#b91c1c" }}>{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #f1f5f9, #e0f2fe)",
  padding: "24px 16px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "440px",
  background: "#fff",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
  border: "1px solid #e5e7eb",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  background: "#f9fafb",
  fontSize: "14px",
};

const buttonStyle = {
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  fontSize: "15px",
};
