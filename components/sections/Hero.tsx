"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { ForgeFallback } from "@/components/three/ForgeFallback";

const ForgeScene = dynamic(() => import("@/components/three/ForgeScene"), { ssr: false });

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [canRenderWebGL, setCanRenderWebGL] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const canvas = document.createElement("canvas");
        const hasContext = Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
        const lowPowerMobile = window.innerWidth < 600 && (navigator.hardwareConcurrency ?? 8) <= 4;
        setCanRenderWebGL(hasContext && !lowPowerMobile && !reduceMotion);
      } catch {
        setCanRenderWebGL(false);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [reduceMotion]);

  function handlePointer(event: React.PointerEvent<HTMLElement>) {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -((event.clientY / window.innerHeight) * 2 - 1);
    setPointer({ x, y });
  }

  return (
    <section className="hero" aria-labelledby="hero-title" onPointerMove={handlePointer}>
      <ForgeFallback />
      {canRenderWebGL && <div className="hero-scene" aria-hidden="true"><ForgeScene pointer={pointer} /></div>}
      <div className="hero-heat-line" aria-hidden="true" />
      <div className="hero-content container-wide">
        <h1 id="hero-title" className="hero-title display">Djuppe</h1>
        <div className="hero-copy">
          <p className="section-kicker">Metal, given intent</p>
          <h2>{site.statement}</h2>
          <p>{site.intro}</p>
        </div>
        <div className="hero-bottom mono">
          <a className="hero-enter" href="#work">
            <span aria-hidden="true">↓</span><span>Descend / 01</span>
          </a>
          <div className="hero-spec">Obj. F–001<br />316L / forged section</div>
          <div className="hero-spec">1620 × 980 × 240<br />Surface / 683 K</div>
        </div>
      </div>
    </section>
  );
}
