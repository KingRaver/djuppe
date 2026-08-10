import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectMedia } from "@/components/ui/ProjectMedia";
import { Reveal } from "@/components/ui/Reveal";

export function SelectedWorks() {
  const [tension, blackArc, air, horizon, table, counterforce, machine] = projects;

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
          <Link className="project-link" href={`/work/${tension.slug}`} aria-label={`View ${tension.title}`}>
            <ProjectMedia visual={tension.images[0]} sizes="100vw" label={`${tension.number} / ${tension.year}`} />
            <div className="project-feature-info">
              <p className="mono">{tension.type}<br />{tension.materials}</p>
              <h3 className="project-title">{tension.title}</h3>
              <p>{tension.description}<br /><br /><span className="mono">{tension.dimensions}</span></p>
            </div>
          </Link>
        </Reveal>

        <Reveal className="study-row">
          <Link className="project-link" href={`/work/${air.slug}`} aria-label={`View ${air.title}`}>
            <ProjectMedia visual={air.images[1]} sizes="(max-width: 560px) 64vw, (max-width: 900px) 40vw, 30vw" label="BAL / 002g" />
          </Link>
          <div className="study-copy">
            <p className="section-kicker">Narrow study / movement</p>
            <Link href={`/work/${air.slug}`}><h3 className="project-title">{air.title}</h3></Link>
            <p>{air.description} The mechanics remain exposed, but nothing moves without a reason.</p>
            <p className="mono">{air.number} · {air.year}<br />{air.materials}<br />{air.dimensions}</p>
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
                <p className="mono">18 mm plate<br />Mass removed / 31%<br />{table.dimensions}</p>
              </div>
            </div>
            <ProjectMedia visual={table.images[0]} sizes="(max-width: 900px) 100vw, 68vw" label="SECTION / A—A" />
          </Link>
        </Reveal>

        <Reveal className="measured-work">
          <Link className="project-link" href={`/work/${counterforce.slug}`} aria-label={`View ${counterforce.title}`}>
            <ProjectMedia visual={counterforce.images[0]} sizes="(max-width: 900px) 100vw, 67vw" label="LOAD / 38.4 kN" />
          </Link>
          <div className="measured-copy">
            <p className="section-kicker">Equilibrium / exterior</p>
            <Link href={`/work/${counterforce.slug}`}><h3 className="project-title">{counterforce.title}</h3></Link>
            <p>{counterforce.description}</p>
            <div className="dimension-list mono">
              <div><span>Span</span><span>5200 mm</span></div>
              <div><span>Rise</span><span>4100 mm</span></div>
              <div><span>Weathering</span><span>Unsealed</span></div>
              <div><span>Status</span><span>In equilibrium</span></div>
            </div>
          </div>
        </Reveal>

        <Reveal className="study-row">
          <Link className="project-link" href={`/work/${machine.slug}`} aria-label={`View ${machine.title}`}>
            <ProjectMedia visual={machine.images[0]} sizes="(max-width: 560px) 64vw, (max-width: 900px) 40vw, 30vw" label="CYCLE / 43:12" />
          </Link>
          <div className="study-copy">
            <p className="section-kicker">Mechanical object / slow cycle</p>
            <Link href={`/work/${machine.slug}`}><h3 className="project-title">{machine.title}</h3></Link>
            <p>{machine.description} Backlash, vibration and sound were reduced until the remaining action felt inevitable.</p>
            <p className="mono">{machine.number} · {machine.year}<br />Sound pressure / &lt;24 dBA</p>
          </div>
        </Reveal>

        <div className="works-index">
          <p className="section-kicker">Full works register / 7 objects</p>
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
