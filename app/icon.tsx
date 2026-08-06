import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#080a0b", color: "#e7e9e5", fontSize: 42, fontWeight: 800, border: "2px solid #777c7d" }}>
      D
    </div>,
    size,
  );
}
