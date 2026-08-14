import Image from "next/image";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function AboutSection() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="about-grid container-wide">
        <Reveal className="portrait is-photographic">
          <Image
            src="/images/portrait.jpg"
            alt="Djuppe at the workshop, hat and sunglasses, giving a shaka sign"
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
          />
          <div className="portrait-label mono">
            <span>Djuppe</span><span>Workshop / Lisbon</span>
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
