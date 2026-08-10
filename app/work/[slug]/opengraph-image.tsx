import { ImageResponse } from "next/og";
import { brandFonts } from "@/app/_brand/fonts";
import { Motif } from "@/app/_brand/motif";
import { brand, display, grain, mono, scanlines } from "@/app/_brand/tokens";
import { getProject, projects } from "@/data/projects";

// Deliberately a static `alt` rather than a per-project one via generateImageMetadata.
// That API moves the route to /opengraph-image/[__metadata_id__] and drops all seven
// cards out of the prerender manifest, so each would rasterise on demand the first
// time a scraper asked — the exact cold-render latency that loses a preview.
// twitter:title and twitter:description are already per-project, so the trade is cheap.
export const alt = "DJUPPE project card — title, materials, dimensions and year over a forge-lit ground";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mirrors the page's own params so all seven cards are rasterised at build time.
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

const FILL = { position: "absolute", top: 0, right: 0, bottom: 0, left: 0 } as const;

/** Big Shoulders is condensed, but a long title still has to clear the motif. */
function titleSize(title: string) {
  if (title.length > 22) return 88;
  if (title.length > 15) return 104;
  return 124;
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", maxWidth: 300 }}>
      <span style={{ fontSize: 13, letterSpacing: 3, color: "#6f7476", marginBottom: 8 }}>{label}</span>
      <span style={{ fontSize: 17, color: brand.silver }}>{value}</span>
    </div>
  );
}

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  // The route is generated from generateStaticParams, so this is a safety net only.
  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: brand.ink,
            color: brand.white,
            fontSize: 96,
            fontFamily: display,
          }}
        >
          DJUPPE
        </div>
      ),
      { ...size, fonts: await brandFonts() },
    );
  }

  const variant = project.images[0]?.variant ?? "machine";

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
        <div
          style={{
            ...FILL,
            background: `radial-gradient(circle at 80% 52%, rgba(215,91,42,0.42) 0%, rgba(168,66,30,0.16) 26%, rgba(7,9,10,0) 62%)`,
          }}
        />
        <div
          style={{
            ...FILL,
            background: `radial-gradient(circle at 4% 6%, rgba(71,106,135,0.26) 0%, rgba(7,9,10,0) 50%)`,
          }}
        />
        <div
          style={{
            ...FILL,
            background: `repeating-linear-gradient(90deg, rgba(217,221,220,0.05) 0px, rgba(217,221,220,0.05) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 60px), repeating-linear-gradient(180deg, rgba(217,221,220,0.05) 0px, rgba(217,221,220,0.05) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 60px)`,
          }}
        />
        <div style={{ ...FILL, background: scanlines, opacity: 0.45 }} />

        {/* The motif bleeds off the right edge so the card reads as a crop of something larger. */}
        <div style={{ position: "absolute", top: 128, right: -76, display: "flex", opacity: 0.9 }}>
          <Motif variant={variant} size={370} />
        </div>

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
              fontSize: 16,
              letterSpacing: 5,
              color: brand.steel,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: 9, height: 9, background: brand.ember, marginRight: 15 }} />
              <span>DJUPPE / {project.number}</span>
            </div>
            <span>{project.type.toUpperCase()}</span>
          </div>

          {/* Title block, held clear of the motif. */}
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 830 }}>
            <div
              style={{
                display: "flex",
                fontFamily: display,
                fontWeight: 800,
                fontSize: titleSize(project.title),
                lineHeight: 1.02,
                letterSpacing: -3,
                color: brand.white,
              }}
            >
              {project.title}
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 26 }}>
              <div
                style={{
                  width: 72,
                  height: 3,
                  background: `linear-gradient(90deg, ${brand.ember} 0%, rgba(215,91,42,0) 100%)`,
                  marginRight: 20,
                }}
              />
              <span style={{ fontSize: 20, color: brand.silver, lineHeight: 1.35 }}>{project.description}</span>
            </div>
          </div>

          {/* Museum label */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", height: 1, background: "rgba(217,221,220,0.16)", marginBottom: 26 }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{ display: "flex", gap: 56 }}>
                <Spec label="MATERIALS" value={project.materials} />
                <Spec label="DIMENSIONS" value={project.dimensions} />
                <Spec label="YEAR" value={project.year} />
              </div>
              <span style={{ fontSize: 15, letterSpacing: 4, color: brand.silver }}>DJUPPE.ART</span>
            </div>
          </div>
        </div>

        <img src={grain(0.06, 0.22)} width={1200} height={630} style={{ ...FILL }} alt="" />
      </div>
    ),
    { ...size, fonts: await brandFonts() },
  );
}
