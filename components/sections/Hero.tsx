"use client";

import dynamic from "next/dynamic";
import { useMotionValue, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/data/site";
import { ForgeFallback } from "@/components/three/ForgeFallback";

const ForgeScene = dynamic(() => import("@/components/three/ForgeScene"), { ssr: false });

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const viewport = useRef({ width: 1, height: 1 });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const pointer = useMemo(() => ({ x: pointerX, y: pointerY }), [pointerX, pointerY]);
  const [canRenderWebGL, setCanRenderWebGL] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [inView, setInView] = useState(true);

  // Cached so pointermove never reads layout.
  useEffect(() => {
    function measure() {
      viewport.current = { width: window.innerWidth, height: window.innerHeight };
    }
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

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

  // The forge costs frames the rest of the page needs once it is scrolled past.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handlePointer = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (event.pointerType === "touch") return;
      const { width, height } = viewport.current;
      pointerX.set((event.clientX / width) * 2 - 1);
      pointerY.set(-((event.clientY / height) * 2 - 1));
    },
    [pointerX, pointerY],
  );

  return (
    <section ref={sectionRef} className="hero" aria-labelledby="hero-title" onPointerMove={handlePointer}>
      <ForgeFallback dimmed={sceneReady} />
      {canRenderWebGL && (
        <div className="hero-scene" aria-hidden="true">
          <ForgeScene pointer={pointer} active={inView} onReady={() => setSceneReady(true)} />
        </div>
      )}
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
