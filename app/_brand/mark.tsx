import { brand, grain } from "./tokens";

const FILL = { position: "absolute", top: 0, right: 0, bottom: 0, left: 0 } as const;

type MarkOptions = {
  size: number;
  /** Maskable icons get cropped toward a circle by Android, so the mark shrinks into the safe zone. */
  maskable?: boolean;
  rounded?: boolean;
};

/**
 * The DJUPPE mark: a forged D — square spine, rounded bowl — over a heat bloom,
 * cut by an ember seam at the base.
 *
 * The D is drawn from primitives rather than set in Big Shoulders on purpose. The
 * display face is condensed, so at a 16px favicon its counter closes and the glyph
 * collapses into a white slab. Geometry keeps the counter open at every size and
 * drops the font dependency from the icon path entirely.
 */
export function Mark({ size, maskable = false, rounded = false }: MarkOptions) {
  // Android's maskable spec guarantees only the middle 80% survives the crop.
  const inset = maskable ? size * 0.18 : 0;
  const box = size - inset * 2;

  const glyphH = box * 0.6;
  const glyphW = glyphH * 0.84;
  const stroke = Math.max(1, glyphH * 0.21);
  const spine = Math.max(1, stroke * 1.12);
  const seam = Math.max(1, box * 0.07);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: brand.ink,
        borderRadius: rounded ? size * 0.22 : 0,
        overflow: "hidden",
      }}
    >
      {/* Heat bloom rising from the lower right, the way a piece glows off the anvil. */}
      <div
        style={{
          ...FILL,
          background: `radial-gradient(circle at 78% 86%, ${brand.ember} 0%, rgba(184,118,58,0.30) 32%, rgba(7,9,10,0) 66%)`,
        }}
      />
      {/* A cool temper edge opposite it, so the field is not a single flat wash. */}
      <div
        style={{
          ...FILL,
          background: `radial-gradient(circle at 14% 8%, rgba(71,106,135,0.40) 0%, rgba(7,9,10,0) 54%)`,
        }}
      />

      {/* The D, sitting slightly high so the seam below reads as a separate element. */}
      <div
        style={{
          display: "flex",
          width: glyphW,
          height: glyphH,
          marginBottom: box * 0.1,
        }}
      >
        <div style={{ width: spine, height: glyphH, background: brand.white }} />
        <div
          style={{
            width: glyphW - spine,
            height: glyphH,
            borderTop: `${stroke}px solid ${brand.white}`,
            borderRight: `${stroke}px solid ${brand.white}`,
            borderBottom: `${stroke}px solid ${brand.white}`,
            borderTopRightRadius: glyphH / 2,
            borderBottomRightRadius: glyphH / 2,
          }}
        />
      </div>

      {/* The seam: a hot cut across the base, the one detail that survives 16px. */}
      <div
        style={{
          position: "absolute",
          left: inset + box * 0.2,
          right: inset + box * 0.2,
          bottom: inset + box * 0.14,
          height: seam,
          background: `linear-gradient(90deg, ${brand.amber} 0%, ${brand.ember} 60%, rgba(215,91,42,0.15) 100%)`,
        }}
      />

      {/* Below ~96px the noise field only muddies the glyph edge. */}
      {size >= 96 ? (
        // eslint-disable-next-line @next/next/no-img-element -- Satori rasterises raw SVG data URIs; next/image has no meaning here.
        <img src={grain(0.2)} width={size} height={size} style={{ ...FILL }} alt="" />
      ) : null}
    </div>
  );
}
