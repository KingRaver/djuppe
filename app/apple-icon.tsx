import { renderIcon } from "./_brand/renderIcon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS applies its own squircle mask and rejects transparency, so this stays square and opaque.
export default function AppleIcon() {
  return renderIcon(180);
}
