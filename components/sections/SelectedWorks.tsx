import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectMedia } from "@/components/ui/ProjectMedia";
import { Reveal } from "@/components/ui/Reveal";

export function SelectedWorks() {
  // Every slot below the feature carries copy written for the work it holds —
  // a hardcoded object number, a sentence continuing that work's description —
  // so each name has to keep landing on the same project as the register grows.
  // The holes are works the curated grid deliberately omits, not gaps to fill
  // in order: they still show in the full register below. Adding a work to the
  // top of `projects` shifts every name here by one, so re-check the holes.
  const [feature, quintaMiraRio, , blackArc, air, horizon, table, , machine] = projects;

  return (
    <section id="work" className="works" aria-labelledby="works-title">
      <div className="container-wide">
        <div className="works-header">
          <div>
            <p className="section-kicker">01 / Selected works</p>
            <h2 id="works-title" className="display">Built to resist certainty.</h2>
          </div>
          <p>
            Structures, instruments, furniture, and singular objects. Each begins as a practical question and ends when the material carries its own authority.
          </p>
        </div>

        <Reveal className="project-feature">
          <Link className="project-link" href={`/work/${feature.slug}`} aria-label={`View ${feature.title}`}>
            <ProjectMedia visual={feature.images[0]} priority sizes="100vw" label={`${feature.number} / ${feature.year}`} />
            <div className="project-feature-info">
              <p className="mono">{feature.type}<br />{feature.location}</p>
              <h3 className="project-title">{feature.title}</h3>
              <p>{feature.description}<br /><br /><span className="project-note">{feature.note}</span></p>
            </div>
          </Link>
        </Reveal>

        <Reveal className="study-row">
          <Link className="project-link" href={`/work/${air.slug}`} aria-label={`View ${air.title}`}>
            <ProjectMedia visual={air.images[1]} sizes="(max-width: 560px) 64vw, (max-width: 900px) 40vw, 30vw" label={`${air.number} / ${air.year}`} />
          </Link>
          <div className="study-copy">
            <p className="section-kicker">Narrow study / movement</p>
            <Link href={`/work/${air.slug}`}><h3 className="project-title">{air.title}</h3></Link>
            <p>{air.description} The mechanics remain exposed, but nothing moves without a reason.</p>
            <p className="mono">{air.number} · {air.year}<br />{air.location}</p>
            <p className="project-note">{air.note}</p>
          </div>
        </Reveal>

        <div className="project-pair">
          {[blackArc, horizon].map((project, index) => (
            <Reveal className="pair-item" key={project.slug} delay={index * 0.1}>
              <Link className="project-link" href={`/work/${project.slug}`} aria-label={`View ${project.title}`}>
                <ProjectMedia visual={project.images[0]} sizes="(max-width: 560px) 100vw, 55vw" label={`${project.number} / ${project.year}`} />
                <h3 className="project-title">{project.title}</h3>
                <div className="pair-meta mono"><span>{project.type}</span><span>{project.location}</span></div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="horizontal-work">
          <Link className="project-link horizontal-frame" href={`/work/${table.slug}`} aria-label={`View ${table.title}`}>
            <div className="horizontal-copy">
              <div>
                <p className="section-kicker">Functional mass / W–018</p>
                <h3 className="project-title">{table.title}</h3>
              </div>
              <div>
                <p>{table.description}</p>
                <p className="project-note">{table.note}</p>
              </div>
            </div>
            <ProjectMedia visual={table.images[0]} sizes="(max-width: 900px) 100vw, 68vw" label="SECTION / A—A" />
          </Link>
        </Reveal>

        {/* This slot crops horizontally, never vertically: the media box is
            taller than it is wide at every breakpoint, so a landscape frame
            fills the height and loses its margins instead. That is why the
            lead photograph's `datum` fraction still lands on the real
            waterline here — it would not survive a vertical crop. */}
        <Reveal className="measured-work">
          <Link className="project-link" href={`/work/${quintaMiraRio.slug}`} aria-label={`View ${quintaMiraRio.title}`}>
            <ProjectMedia visual={quintaMiraRio.images[0]} sizes="(max-width: 900px) 100vw, 67vw" label={`${quintaMiraRio.number} / ${quintaMiraRio.year}`} />
          </Link>
          <div className="measured-copy">
            <p className="section-kicker">Exposed site / sound</p>
            <Link href={`/work/${quintaMiraRio.slug}`}><h3 className="project-title">{quintaMiraRio.title}</h3></Link>
            <p>{quintaMiraRio.description}</p>
            <div className="dimension-list mono">
              <div><span>Object</span><span>{quintaMiraRio.number}</span></div>
              <div><span>Year</span><span>{quintaMiraRio.year}</span></div>
              <div><span>Location</span><span>{quintaMiraRio.location}</span></div>
              <div><span>Status</span><span>In use</span></div>
            </div>
          </div>
        </Reveal>

        <Reveal className="study-row">
          <Link className="project-link" href={`/work/${machine.slug}`} aria-label={`View ${machine.title}`}>
            <ProjectMedia visual={machine.images[0]} sizes="(max-width: 560px) 64vw, (max-width: 900px) 40vw, 30vw" label={`${machine.number} / ${machine.year}`} />
          </Link>
          <div className="study-copy">
            <p className="section-kicker">Mechanical object / slow cycle</p>
            <Link href={`/work/${machine.slug}`}><h3 className="project-title">{machine.title}</h3></Link>
            <p>{machine.description} Backlash, vibration and sound were reduced until the remaining action felt inevitable.</p>
            <p className="mono">{machine.number} · {machine.year}<br />{machine.location}</p>
            <p className="project-note">{machine.note}</p>
          </div>
        </Reveal>

        <div className="works-index">
          <p className="section-kicker">Full works register / {projects.length} objects</p>
          <div className="works-index-list">
            {projects.map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`}>
                <span className="mono">{project.number}</span>
                <strong>{project.title}</strong>
                <span className="mono">{project.year} / ↗</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
