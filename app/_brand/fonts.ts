import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Satori cannot read woff2, which is all @fontsource-variable ships for Big Shoulders.
// These are static TrueType instances committed under assets/fonts.
const FONT_DIR = join(process.cwd(), "assets", "fonts");

let cache: Promise<[Buffer, Buffer]> | undefined;

function load() {
  cache ??= Promise.all([
    readFile(join(FONT_DIR, "BigShouldersDisplay-ExtraBold.ttf")),
    readFile(join(FONT_DIR, "IBMPlexMono-Medium.ttf")),
  ]);
  return cache;
}

/** Font set for `ImageResponse`, in the weights the brand card actually uses. */
export async function brandFonts() {
  const [display, mono] = await load();
  return [
    { name: "Big Shoulders Display", data: display, weight: 800 as const, style: "normal" as const },
    { name: "IBM Plex Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ];
}
