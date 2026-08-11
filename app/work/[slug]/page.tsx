import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { ProjectMedia } from "@/components/ui/ProjectMedia";
import { getProject, projects } from "@/data/projects";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: `${project.description} ${project.type} by Djuppe, ${project.year}.`,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — DJUPPE`,
      description: project.description,
      url: `/work/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: project.title,
    creator: { "@type": "Person", name: "Djuppe" },
    dateCreated: project.year,
    // No artMedium: structured data is syndicated to search engines, and
    // material description is not published.
    artform: project.type,
    locationCreated: project.location,
    description: project.description,
  };

  return (
    <main id="main-content" className="project-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="project-page-hero container-wide">
        <Link className="project-back mono" href="/#work">
          <span aria-hidden="true">↖</span> Works register
        </Link>
        <h1 className="project-page-title display">{project.title}</h1>
        <div className="project-page-meta mono">
          <div>Object / Year<span>{project.number} / {project.year}</span></div>
          <div>Location<span>{project.location}</span></div>
          <div>Classification<span>{project.type}</span></div>
        </div>
        <p className="project-page-note">{project.note}</p>
      </header>

      <section className="project-lead-media" aria-label={`${project.title} overview`}>
        <ProjectMedia visual={project.images[0]} priority sizes="100vw" label={`${project.number} / GENERAL VIEW`} />
      </section>

      <section className="project-story container" aria-labelledby="project-statement">
        <h2 id="project-statement" className="project-story-intro">{project.description}</h2>
        <div className="project-story-body">
          {project.statement.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {project.fabricationNotes && (
            <ul className="fabrication-notes" aria-label="Fabrication notes">
              {project.fabricationNotes.map((note, index) => (
                <li key={note}><span>F–{String(index + 1).padStart(2, "0")}</span><span>{note}</span></li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* A work with a single photograph has no detail gallery; rendering the
          section empty would leave a grid's worth of dead space. */}
      {project.images.length > 1 && (
        <section className="project-gallery container-wide" aria-label={`${project.title} details`}>
          {project.images.slice(1).map((visual, index) => (
            <ProjectMedia
              key={`${visual.variant}-${index}`}
              visual={visual}
              sizes="(max-width: 560px) 100vw, 50vw"
              label={`DETAIL / ${String(index + 1).padStart(2, "0")}`}
            />
          ))}
        </section>
      )}

      <Link className="project-next" href={`/work/${next.slug}`}>
        <div className="project-next-inner container-wide">
          <span className="section-kicker">Next object / {next.number}</span>
          <strong>{next.title}</strong>
          <span aria-hidden="true">↗</span>
        </div>
      </Link>

      <div className="project-page-footer">
        <div className="container-wide"><SiteFooter /></div>
      </div>
    </main>
  );
}
