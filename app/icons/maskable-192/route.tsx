import { renderIcon } from "@/app/_brand/renderIcon";

export const dynamic = "force-static";

export function GET() {
  return renderIcon(192, { maskable: true });
}
