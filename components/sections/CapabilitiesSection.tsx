import { capabilities } from "@/data/capabilities";

export function CapabilitiesSection() {
  return (
    <section className="capabilities-section" aria-labelledby="capabilities-title">
      <div className="container-wide">
        <div className="capabilities-head">
          <div>
            <p className="section-kicker">05 / Fields of practice</p>
            <h2 id="capabilities-title" className="display">Workshop range.</h2>
          </div>
          <p>From first load path to final surface. The scale changes; the requirement for structural honesty does not.</p>
        </div>
        <div className="capability-list">
          {capabilities.map((capability) => (
            <article className="capability-item" key={capability.index}>
              <span className="mono">{capability.index}</span>
              <h3>{capability.name}</h3>
              <p className="mono">{capability.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
