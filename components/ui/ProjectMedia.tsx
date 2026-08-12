import Image from "next/image";
import type { ProjectVisual } from "@/data/projects";

type ProjectMediaProps = {
  visual: ProjectVisual;
  className?: string;
  priority?: boolean;
  label?: string;
  /** Match the slot this media actually occupies, or real images are over-fetched. */
  sizes?: string;
  /** Suppress the notation badge — too cramped a slot for it to read cleanly. */
  hideMark?: boolean;
};

export function ProjectMedia({
  visual,
  className = "",
  priority = false,
  label,
  sizes = "(max-width: 900px) 100vw, 75vw",
  hideMark = false,
}: ProjectMediaProps) {
  // The procedural study is a stand-in for a photograph, not a layer over one.
  // `is-photographic` suppresses it so the variant only ever shows when there
  // is nothing else to show.
  const isPhotographic = Boolean(visual.src);
  // Cap the box well under the source's native size, not at it — a CSS pixel
  // isn't a device pixel on any retina screen, so capping at native width
  // still upscales (and still pixelates) on the 2x/3x displays most visitors
  // have. Halving it keeps the image sharp at typical device pixel ratios.
  // The cap has to yield to the slot as well. A grid item carrying an
  // `aspect-ratio` does not stretch to its column — it takes its width from its
  // own height — so capping height alone lets the box compute a width wider
  // than the column and push the whole page sideways.
  const sizeCap =
    visual.width && visual.height
      ? {
          maxWidth: `min(100%, ${Math.round(visual.width / 2)}px)`,
          maxHeight: `${Math.round(visual.height / 2)}px`,
          aspectRatio: `${visual.width} / ${visual.height}`,
        }
      : undefined;

  return (
    <div
      className={`project-media media-${visual.variant}${isPhotographic ? " is-photographic" : ""} ${className}`}
      style={sizeCap}
    >
      {visual.src ? (
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          priority={priority}
          sizes={sizes}
        />
      ) : (
        <span className="sr-only">{visual.alt}</span>
      )}
      {isPhotographic && visual.datum !== undefined && (
        <span
          className={`media-datum${visual.datumTone === "dark" ? " is-dark" : ""}`}
          style={{ top: `${visual.datum * 100}%` }}
          aria-hidden="true"
        >
          <span className="media-datum-label">{visual.datumLabel ?? "DATUM"}</span>
        </span>
      )}
      {!hideMark && (
        <span className="media-mark" aria-hidden="true">
          {label ?? `MAT / ${visual.variant.toUpperCase()}`}
        </span>
      )}
    </div>
  );
}
