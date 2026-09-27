// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Hair Vault by Miss Independent G";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.18) 0%, transparent 55%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Crown icon (simple SVG) */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d4af37"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginBottom: 32 }}
        >
          <path d="M3 7l4 4 5-6 5 6 4-4v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
        </svg>

        {/* "By Miss Independent G" */}
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#ec4899",
            marginBottom: 24,
          }}
        >
          By Miss Independent G
        </div>

        {/* THE HAIR VAULT — three-tone lockup */}
        <div
          style={{
            display: "flex",
            gap: 24,
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ color: "#d4af37" }}>THE</span>
          <span style={{ color: "#ec4899" }}>HAIR</span>
          <span style={{ color: "#d4af37" }}>VAULT</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            fontStyle: "italic",
            color: "#d4d4d4",
            marginTop: 40,
          }}
        >
          Premium Hair. Timeless Beauty. Unapologetic You.
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
            fontSize: 20,
            letterSpacing: "0.2em",
            color: "#888",
          }}
        >
          thehairvault.vercel.app
        </div>
      </div>
    ),
    size
  );
}