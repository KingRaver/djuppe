"use client";

import { useEffect, useRef, useState } from "react";

const stages = [
  { name: "Cutting", note: "The first edge establishes every later error. Kerf, heat and grain direction are accounted for before the tool starts." },
  { name: "Folding", note: "Metal resists, then remembers. Bend allowance is calculated; springback is learned from the actual sheet." },
  { name: "Welding", note: "A joint is also a heat event. Sequence controls distortion, penetration, colour and what must remain visible." },
  { name: "Grinding", note: "Removal is irreversible. The hand follows the plane without erasing the evidence that gives it scale." },
  { name: "Heating", note: "Temperature becomes both tool and finish: correcting a radius, releasing stress, writing colour into stainless steel." },
  { name: "Joining", note: "Bolts, pins, welds and interference fits are chosen for assembly, transport, repair and the life of the object." },
  { name: "Balancing", note: "Weight is moved through a structure until effort disappears. Apparent impossibility depends on precise force paths." },
  { name: "Finishing", note: "A surface is not cosmetic. It determines touch, reflection, weathering, maintenance and how the form occupies light." },
];

export function MaterialIntelligence() {
  const [active, setActive] = useState(0);
  const stageRefs = useRef<Array<HTMLElement | null>>([]);
  // While the pointer is inside the list the reader is driving; scroll position must not fight it.
  const pointerLed = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (pointerLed.current) return;
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.index);
        if (Number.isFinite(index)) setActive(index);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0.15, 0.45, 0.75] },
    );
    stageRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="material-section" data-stage={active} aria-labelledby="material-title">
      <div className="material-backdrop" aria-hidden="true" />
      <div className="material-layout container-wide">
        <div className="material-heading">
          <p className="section-kicker">02 / Material intelligence</p>
          <h2 id="material-title" className="display">Metal remembers every decision.</h2>
          <div className="material-specimen" aria-hidden="true">
            <div className="specimen-ring" />
            <span className="specimen-axis-x" /><span className="specimen-axis-y" />
            <span className="media-mark">SPECIMEN / {String(active + 1).padStart(2, "0")}</span>
          </div>
        </div>
        <div className="material-stages" onPointerLeave={() => { pointerLed.current = false; }}>
          {stages.map((stage, index) => (
            <article
              key={stage.name}
              ref={(node) => { stageRefs.current[index] = node; }}
              data-index={index}
              className={`material-stage ${active === index ? "is-active" : ""}`}
              onPointerEnter={(event) => {
                if (event.pointerType === "touch") return;
                pointerLed.current = true;
                setActive(index);
              }}
            >
              <span className="mono material-stage-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{stage.name}</h3>
                <p>{stage.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
