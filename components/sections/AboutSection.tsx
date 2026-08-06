import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function AboutSection() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="about-grid container-wide">
        <Reveal className="portrait">
          <div className="portrait-label mono">
            <span>Portrait placeholder / replace</span><span>Workshop / Athens</span>
          </div>
        </Reveal>
        <div className="about-copy">
          <p className="section-kicker">04 / Djuppe</p>
          <h2 id="about-title" className="display">The hand knows what the drawing cannot.</h2>
          {site.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </section>
  );
}
