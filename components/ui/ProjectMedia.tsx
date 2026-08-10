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
  return (
    <div className={`project-media media-${visual.variant} ${className}`}>
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
      <span className="media-mark" aria-hidden="true">
        {label ?? `MAT / ${visual.variant.toUpperCase()}`}
      </span>
    </div>
  );
}
