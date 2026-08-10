import type { ProjectVisual } from "@/data/projects";
import { brand } from "./tokens";

type Variant = ProjectVisual["variant"];

/**
 * A geometric motif per project visual variant, so two share cards never look
 * alike beyond their text. Everything is built from primitives Satori supports —
 * boxes, radii, borders, transforms and gradients. No SVG paths, no masks.
 */
export function Motif({ variant, size = 300 }: { variant: Variant; size?: number }) {
  const frame = {
    display: "flex",
    position: "relative",
    width: size,
    height: size,
    alignItems: "center",
    justifyContent: "center",
  } as const;

  const hot = `radial-gradient(circle at 42% 36%, #ffd9a8 0%, ${brand.ember} 44%, #8f3617 100%)`;

  switch (variant) {
    // A compression curve: a heavy ring cropped by its own frame.
    case "arc":
      return (
        <div style={frame}>
          <div
            style={{
              display: "flex",
              width: size,
              height: size,
              borderRadius: size / 2,
              border: `${size * 0.09}px solid ${brand.silver}`,
              borderRightColor: "rgba(217,221,220,0.12)",
              borderBottomColor: "rgba(217,221,220,0.12)",
              transform: "rotate(-38deg)",
            }}
          />
        </div>
      );

    // Temper colours: the oxide bands steel runs through as it is drawn back.
    case "temper":
      return (
        <div style={{ ...frame, flexDirection: "column", justifyContent: "center" }}>
          {["#8f3617", brand.ember, brand.amber, "#6f6a52", brand.temperBlue, "#3d4a63"].map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                width: size,
                height: size * 0.088,
                marginBottom: size * 0.032,
                background: `linear-gradient(90deg, ${c} 0%, rgba(7,9,10,0) 100%)`,
              }}
            />
          ))}
        </div>
      );

    // Two planes meeting at a brake line.
    case "fold":
      return (
        <div style={{ ...frame, alignItems: "flex-end" }}>
          <div
            style={{
              display: "flex",
              width: size * 0.46,
              height: size * 0.78,
              background: `linear-gradient(160deg, ${brand.silver} 0%, #5c6163 100%)`,
              transform: "skewY(14deg)",
            }}
          />
          <div
            style={{
              display: "flex",
              width: size * 0.46,
              height: size * 0.78,
              background: `linear-gradient(200deg, #2b3033 0%, #14181a 100%)`,
              transform: "skewY(-14deg)",
            }}
          />
        </div>
      );

    // A weld seam, still bright.
    case "seam":
      return (
        <div style={frame}>
          <div style={{ display: "flex", width: size * 0.1, height: size, background: hot, borderRadius: size * 0.05 }} />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: size * 0.36,
              width: size * 0.28,
              background: `linear-gradient(90deg, rgba(215,91,42,0.42) 0%, rgba(7,9,10,0) 100%)`,
            }}
          />
        </div>
      );

    // Expanded mesh.
    case "mesh":
      return (
        <div style={{ ...frame, flexWrap: "wrap", alignContent: "center" }}>
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                width: size * 0.132,
                height: size * 0.132,
                margin: size * 0.014,
                border: `2px solid rgba(217,221,220,${0.14 + (i % 6) * 0.11})`,
                transform: "rotate(45deg)",
              }}
            />
          ))}
        </div>
      );

    // A long horizontal against a lit ground.
    case "horizon":
      return (
        <div style={{ ...frame, flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              width: size,
              height: size * 0.055,
              background: `linear-gradient(90deg, rgba(217,221,220,0.15) 0%, ${brand.silver} 46%, rgba(217,221,220,0.15) 100%)`,
            }}
          />
          <div
            style={{
              display: "flex",
              width: size,
              height: size * 0.34,
              marginTop: size * 0.05,
              background: `linear-gradient(180deg, rgba(215,91,42,0.45) 0%, rgba(7,9,10,0) 100%)`,
            }}
          />
        </div>
      );

    // Concentric machined rings.
    case "machine":
    default:
      return (
        <div style={frame}>
          {[1, 0.72, 0.44].map((scale, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                display: "flex",
                width: size * scale,
                height: size * scale,
                borderRadius: (size * scale) / 2,
                border: `${size * 0.022}px solid rgba(217,221,220,${0.22 + i * 0.2})`,
              }}
            />
          ))}
          <div
            style={{
              display: "flex",
              width: size * 0.17,
              height: size * 0.17,
              borderRadius: size * 0.085,
              background: hot,
            }}
          />
        </div>
      );
  }
}
