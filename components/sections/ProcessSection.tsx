"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";

const steps = ["Constraint", "Drawing", "Force", "Fabrication", "Failure", "Revision", "Form"];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 70%", "end 40%"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!reduceMotion) setActive(Math.min(6, Math.floor(value * 7)));
  });

  return (
    <section id="process" ref={sectionRef} className="process-section" aria-labelledby="process-title">
      <div className="container-wide">
        <div className="process-header">
          <div>
            <p className="section-kicker">03 / Process</p>
            <h2 id="process-title" className="display">Form is the last decision.</h2>
          </div>
          <p>
            The workshop does not move cleanly from idea to object. It measures, pushes, discovers the weak assumption, and returns with better information.
          </p>
        </div>

        <div className="process-drawing" aria-hidden="true">
          <svg viewBox="0 0 1200 500" preserveAspectRatio="none">
            <path className="process-line" d="M0 390H1200M150 0V500M1040 0V500" opacity=".35" />
            <circle className="process-line" cx="600" cy="250" r="178" opacity=".25" />
            <motion.path
              className="process-line"
              d="M60 382 C170 370 155 124 312 116 S485 420 628 361 S745 76 904 132 S1015 390 1160 306"
              initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.path
              className="process-hot"
              d="M60 382 C170 370 155 124 312 116 S485 420 628 361 S745 76 904 132 S1015 390 1160 306"
              pathLength="0.16"
              initial={{ pathOffset: 0 }}
              animate={{ pathOffset: active / 7 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            <text x="72" y="445" className="mono" fill="#454a49">DATUM / 0.000</text>
            <text x="1020" y="55" className="mono" fill="#454a49">REV / 07</text>
          </svg>
        </div>

        <div className="process-steps" aria-label="Fabrication process">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step}
              className={`process-step ${index <= active ? "is-active" : ""}`}
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              aria-pressed={active === index}
            >
              <span className="mono">0{index + 1}</span>
              <strong>{step}</strong>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
