import { ImageResponse } from "next/og";

export const alt = "DJUPPE — Metal, Given Intent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 54,
        background: "radial-gradient(circle at 70% 50%, #604438 0, #171a1b 32%, #07090a 70%)",
        color: "#eef0ec",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, letterSpacing: 4 }}>
        <span>DJUPPE / OBJECT F–001</span><span>WORKSHOP / ACTIVE</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.78, fontSize: 205, fontWeight: 800, letterSpacing: -13 }}>
          <span>METAL,</span><span>GIVEN INTENT.</span>
        </div>
        <div style={{ width: 110, height: 110, border: "22px solid #9ca1a1", borderRadius: "50%", transform: "rotate(-22deg)", boxShadow: "0 0 40px #a95431" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, letterSpacing: 3, color: "#a7abaa" }}>
        <span>ENGINEERING × ALCHEMY</span><span>ATHENS / GR</span>
      </div>
    </div>,
    size,
  );
}
