import { ImageResponse } from "next/og";
import { brandFonts } from "./_brand/fonts";
import { brand, display, grain, mono, scanlines } from "./_brand/tokens";

export const alt = "DJUPPE — Metal, Given Intent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FILL = { position: "absolute", top: 0, right: 0, bottom: 0, left: 0 } as const;

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: brand.ink,
          fontFamily: mono,
        }}
      >
        {/* The forge itself: a heat bloom off the right edge, hottest where the ring sits. */}
        <div
          style={{
            ...FILL,
            background: `radial-gradient(circle at 79% 58%, rgba(215,91,42,0.62) 0%, rgba(168,66,30,0.26) 22%, rgba(27,31,34,0.10) 46%, rgba(7,9,10,0) 66%)`,
          }}
        />
        {/* Quench blue on the cold side, so the frame reads as tempered rather than merely orange. */}
        <div
          style={{
            ...FILL,
            background: `radial-gradient(circle at 6% 4%, rgba(71,106,135,0.30) 0%, rgba(7,9,10,0) 48%)`,
          }}
        />
        {/* Drawing-board grid — the engineering half of "engineering × alchemy". */}
        <div
          style={{
            ...FILL,
            background: `repeating-linear-gradient(90deg, rgba(217,221,220,0.055) 0px, rgba(217,221,220,0.055) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 60px), repeating-linear-gradient(180deg, rgba(217,221,220,0.055) 0px, rgba(217,221,220,0.055) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 60px)`,
          }}
        />
        <div style={{ ...FILL, background: scanlines, opacity: 0.5 }} />

        <div
          style={{
            ...FILL,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 60px",
          }}
        >
          {/* Top rail */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 17,
              letterSpacing: 6,
              color: brand.steel,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: 10, height: 10, background: brand.ember, marginRight: 16 }} />
              <span>DJUPPE / FABRICATION STUDIO</span>
            </div>
            <span>ATHENS / GR</span>
          </div>

          {/* Headline + forge ring */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontFamily: display,
                  fontWeight: 800,
                  fontSize: 150,
                  // Big Shoulders has a tall cap height and a long comma tail; below ~1.0
                  // the comma of "METAL," collides with the I of the line beneath it.
                  lineHeight: 1.02,
                  letterSpacing: -5,
                  color: brand.white,
                }}
              >
                <span>METAL,</span>
                <span>GIVEN INTENT.</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginTop: 34 }}>
                <div
                  style={{
                    width: 96,
                    height: 3,
                    background: `linear-gradient(90deg, ${brand.ember} 0%, rgba(215,91,42,0) 100%)`,
                    marginRight: 22,
                  }}
                />
                <span style={{ fontSize: 21, letterSpacing: 1, color: brand.silver }}>
                  Engineered by force. Finished by instinct.
                </span>
              </div>
            </div>

            {/* Billet at welding heat — the one purely alchemical element. */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 188,
                height: 188,
                borderRadius: 94,
                border: `2px solid rgba(155,160,162,0.62)`,
                marginBottom: 26,
                marginLeft: 40,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 116,
                  height: 116,
                  borderRadius: 58,
                  background: `radial-gradient(circle at 42% 36%, #ffd9a8 0%, ${brand.ember} 42%, #8f3617 100%)`,
                  boxShadow: `0 0 90px 22px rgba(215,91,42,0.55)`,
                }}
              />
            </div>
          </div>

          {/* Bottom rail */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 16,
              letterSpacing: 5,
              color: brand.steel,
            }}
          >
            <span>ENGINEERING × ALCHEMY</span>
            <span style={{ color: brand.silver }}>DJUPPE.ART</span>
          </div>
        </div>

        <img src={grain(0.06, 0.22)} width={1200} height={630} style={{ ...FILL }} alt="" />
      </div>
    ),
    { ...size, fonts: await brandFonts() },
  );
}
