import { ImageResponse } from "next/og";
import { Mark } from "./mark";

type IconOptions = { maskable?: boolean; rounded?: boolean };

/** Rasterises the shared mark at an arbitrary square size. The mark is pure geometry, so no fonts are loaded here. */
export function renderIcon(size: number, { maskable = false, rounded = false }: IconOptions = {}) {
  return new ImageResponse(<Mark size={size} maskable={maskable} rounded={rounded} />, {
    width: size,
    height: size,
  });
}
