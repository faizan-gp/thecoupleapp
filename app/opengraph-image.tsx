import { ImageResponse } from "next/og";

/**
 * Site-wide default OG image (per-app pages override it with their own).
 * Branded artwork replaces this at the design pass (M4).
 */
export const alt = "TheCoupleApp — A library of apps for couples";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "#171717",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 700 }}>TheCoupleApp</div>
        <div style={{ fontSize: 36, marginTop: 24, color: "#d4d4d4" }}>
          A library of apps for couples
        </div>
      </div>
    ),
    size
  );
}
