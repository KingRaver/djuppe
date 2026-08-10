// Mirrors the custom properties in app/globals.css. Satori resolves no CSS variables,
// so the generated imagery has to restate the palette as literals.
export const brand = {
  ink: "#07090a",
  carbon: "#101315",
  graphite: "#1b1f22",
  steel: "#9ba0a2",
  silver: "#d9dddc",
  white: "#f2f3ef",
  ember: "#d75b2a",
  amber: "#b8763a",
  temperBlue: "#476a87",
} as const;

export const display = "Big Shoulders Display";
export const mono = "IBM Plex Mono";

/** Horizontal scanlines — the CRT/mill-finish texture that keeps flat gradients from looking synthetic. */
export const scanlines = "repeating-linear-gradient(180deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.30) 3px, rgba(0,0,0,0.30) 4px)";

/**
 * Film grain as an inline SVG turbulence field. resvg (the rasteriser behind
 * ImageResponse) renders feTurbulence, so this needs no binary asset.
 *
 * `baseFrequency` is deliberately coarse and the opacity low. Noise is
 * incompressible, and PNG is the only format ImageResponse emits — fine-grained
 * turbulence pushed the 1200x630 card past 1.2MB, over the ~600KB ceiling above
 * which WhatsApp drops the thumbnail entirely.
 */
export function grain(opacity = 0.12, frequency = 0.42) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="${frequency}" numOctaves="1" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="240" height="240" filter="url(#n)" opacity="${opacity}"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
