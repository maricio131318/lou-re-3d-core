import "../styles/globals.css";
import Link from "next/link";

const HEADER_HEIGHT = 56;

export default function App({ Component, pageProps }) {
  return (
    <div
      style={{
        minHeight: "100%",
        background: "#000",
        color: "#fff",
      }}
    >
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: HEADER_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          background: "#000",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          zIndex: 20,
        }}
      >
        <div style={{ fontWeight: 600, letterSpacing: 1, fontSize: 18 }}>
          Lou-re
        </div>
        <nav style={{ display: "flex", gap: 16, fontSize: 14 }}>
          <Link href="/" style={navLinkStyle}>
            AI 2D Restyle
          </Link>
          <Link href="/viewer" style={navLinkStyle}>
            3D Room Demo
          </Link>
        </nav>
      </header>

      <main
        style={{
          paddingTop: HEADER_HEIGHT,
          minHeight: `calc(100% - ${HEADER_HEIGHT}px)`,
        }}
      >
        <Component {...pageProps} />
      </main>
    </div>
  );
}

const navLinkStyle = {
  textDecoration: "none",
  color: "white",
  padding: "6px 10px",
  borderRadius: 6,
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.04)",
};
