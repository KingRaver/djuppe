import Image from "next/image";
import type { ProjectVisual } from "@/data/projects";

type ProjectMediaProps = {
  visual: ProjectVisual;
  className?: string;
  priority?: boolean;
  label?: string;
  /** Match the slot this media actually occupies, or real images are over-fetched. */
  sizes?: string;
};

export function ProjectMedia({
  visual,
  className = "",
  priority = false,
  label,
  sizes = "(max-width: 900px) 100vw, 75vw",
}: ProjectMediaProps) {
  // The procedural study is a stand-in for a photograph, not a layer over one.
  // `is-photographic` suppresses it so the variant only ever shows when there
  // is nothing else to show.
  const isPhotographic = Boolean(visual.src);

  return (
    <div
      className={`project-media media-${visual.variant}${isPhotographic ? " is-photographic" : ""} ${className}`}
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
        <span className="media-datum" style={{ top: `${visual.datum * 100}%` }} aria-hidden="true">
          <span className="media-datum-label">{visual.datumLabel ?? "DATUM"}</span>
        </span>
      )}
      <span className="media-mark" aria-hidden="true">
        {label ?? `MAT / ${visual.variant.toUpperCase()}`}
      </span>
    </div>
  );
}
