"use client";

import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLSL_COLOR } from "./forgeShaders";

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

/**
 * An equirectangular studio painted procedurally: horizontal softbox strips over a dark mill
 * floor, with a warm pool low down for the forge. Nothing here is representational — a metal
 * at metalness 0.94 has no diffuse response at all, so its entire appearance is the specular
 * reflection of whatever surrounds it. Before this existed the ribbon had four punctual
 * lights to reflect and read as flat grey.
 *
 * Strips run horizontally on purpose: that is what produces the long vertical smears down a
 * turning metal surface, and it is the same scanline motif the brand already uses.
 */
const fragmentShader = /* glsl */ `
precision highp float;
varying vec2 vUv;

${GLSL_COLOR}

float strip(float y, float centre, float width) {
  return smoothstep(width, 0.0, abs(y - centre));
}

void main() {
  float lat = vUv.y;
  float lon = vUv.x;

  // Longitudinal gating, so reflections sweep as the ribbon turns rather than sitting still.
  float sweep = 0.5 + 0.5 * sin(lon * 6.2831853 * 2.0);
  float sweepAlt = 0.5 + 0.5 * sin(lon * 6.2831853 * 3.0 + 2.1);

  vec3 col = vec3(0.004, 0.005, 0.006);
  col += vec3(0.016, 0.019, 0.022) * smoothstep(0.35, 1.0, lat);

  // Key: warm white, high and narrow.
  col += srgbToLinear(vec3(1.000, 0.969, 0.910)) * 7.5 * strip(lat, 0.82, 0.055) * (0.35 + 0.65 * sweep);
  // Fill: cool and broad.
  col += srgbToLinear(vec3(0.906, 0.929, 0.941)) * 2.2 * strip(lat, 0.58, 0.100) * (0.45 + 0.55 * sweepAlt);
  // Rim: temper blue, opposite the key.
  col += srgbToLinear(vec3(0.278, 0.416, 0.529)) * 2.6 * strip(lat, 0.34, 0.050) * (0.30 + 0.70 * (1.0 - sweep));
  // Forge pool: ember, below the horizon.
  col += srgbToLinear(vec3(0.843, 0.357, 0.165)) * 1.6 * strip(lat, 0.10, 0.090);

  // Fine horizontal structure. Perfectly smooth strips reflect as perfectly smooth bands,
  // which is the tell for a synthetic environment.
  col *= 0.92 + 0.08 * sin(lat * 420.0);

  gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * Renders the environment once into a render target and prefilters it with PMREM, returning
 * the texture for the caller to attach declaratively. One-time cost — nothing runs per frame.
 */
export function useForgeEnvironment() {
  const gl = useThree((state) => state.gl);
  const [environment, setEnvironment] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const source = new THREE.WebGLRenderTarget(1024, 512, { type: THREE.HalfFloatType });
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const quadScene = new THREE.Scene();
    quadScene.add(new THREE.Mesh(geometry, material));
    const quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const previousTarget = gl.getRenderTarget();
    gl.setRenderTarget(source);
    gl.render(quadScene, quadCamera);
    gl.setRenderTarget(previousTarget);

    source.texture.mapping = THREE.EquirectangularReflectionMapping;

    const pmrem = new THREE.PMREMGenerator(gl);
    const prefiltered = pmrem.fromEquirectangular(source.texture);

    // Deliberate: this is the one-shot handoff of a GPU resource into React, not a render
    // loop. It fires once per canvas and the cascading-render the rule guards against is a
    // single extra commit at mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnvironment(prefiltered.texture);

    pmrem.dispose();
    material.dispose();
    geometry.dispose();

    return () => {
      prefiltered.dispose();
      source.dispose();
    };
  }, [gl]);

  return environment;
}
