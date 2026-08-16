"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
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
 * Bloom, heat haze and tone mapping in one pass. Hand-rolled rather than pulled from
 * @react-three/postprocessing because the hero canvas has to stay alpha-transparent — the
 * CSS gradient and the reticle in .hero::after sit behind it — and an off-the-shelf composer
 * wants to own the clear colour.
 */
const fragmentShader = /* glsl */ `
precision highp float;
varying vec2 vUv;

uniform sampler2D uScene;
uniform vec2 uTexel;
uniform float uTime;

${GLSL_COLOR}

// Narkowicz's ACES fit. Applied here rather than by the renderer because the scene is drawn
// into a linear render target, where three disables tone mapping.
vec3 aces(vec3 x) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

void main() {
  vec4 probe = texture2D(uScene, vUv);

  // Heat haze. Displacement scales with how warm the neighbourhood already is, so the cold
  // length of the bar stays razor sharp and only the ember regions shimmer.
  float warmth = clamp(probe.r - probe.b, 0.0, 1.0);
  vec2 shimmer = vec2(
    sin(vUv.y * 190.0 + uTime * 1.7),
    cos(vUv.x * 150.0 - uTime * 1.3)
  ) * uTexel * 2.4 * warmth;

  vec4 texel = texture2D(uScene, vUv + shimmer);

  // Bright-pass glow on a golden-angle spiral. Cheaper than a separable blur and adequate:
  // this only has to bloom a handful of hot pixels, not resolve a smooth gradient.
  vec3 glow = vec3(0.0);
  float total = 0.0;
  for (int i = 0; i < 16; i++) {
    float fi = float(i);
    float angle = fi * 2.39996323;
    float radius = 2.0 + fi * 2.6;
    vec2 offset = vec2(cos(angle), sin(angle)) * radius * uTexel;
    // Not named "sample": that is a reserved word from GLSL ES 3.00 onwards.
    vec4 tap = texture2D(uScene, vUv + offset);
    float weight = 1.0 / (1.0 + fi * 0.35);
    glow += max(tap.rgb - 0.55, 0.0) * tap.a * weight;
    total += weight;
  }
  glow /= total;

  vec3 colour = aces((texel.rgb + glow * 1.9) * 1.05);

  // The halo has to carry its own coverage or it is clipped to the ribbon's silhouette and
  // never reaches the dark gradient it is supposed to bleed onto.
  float halo = clamp(dot(glow, vec3(0.2126, 0.7152, 0.0722)) * 2.2, 0.0, 1.0);
  float alpha = clamp(texel.a + halo, 0.0, 1.0);

  gl_FragColor = vec4(linearToSrgb(colour), alpha);
}
`;

type Resources = {
  target: THREE.WebGLRenderTarget;
  material: THREE.ShaderMaterial;
  geometry: THREE.PlaneGeometry;
  quadScene: THREE.Scene;
  quadCamera: THREE.OrthographicCamera;
};

/**
 * Takes over rendering (useFrame priority 1 stops R3F drawing the scene itself): scene into
 * a render target, then a fullscreen quad to the canvas.
 *
 * Everything lives in a ref rather than useMemo because the uniforms are written every frame
 * and the compiler's immutability rule refuses mutation of a memoised value.
 */
export function ForgeAtmosphere() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const dpr = useThree((state) => state.viewport.dpr);

  const resources = useRef<Resources | null>(null);

  useEffect(() => {
    const target = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uScene: { value: target.texture },
        uTexel: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
      },
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const quadScene = new THREE.Scene();
    quadScene.add(new THREE.Mesh(geometry, material));
    const quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    resources.current = { target, material, geometry, quadScene, quadCamera };

    return () => {
      resources.current = null;
      target.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, []);

  useEffect(() => {
    const current = resources.current;
    if (!current) return;
    const width = Math.max(1, Math.floor(size.width * dpr));
    const height = Math.max(1, Math.floor(size.height * dpr));
    current.target.setSize(width, height);
    current.material.uniforms.uTexel.value.set(1 / width, 1 / height);
  }, [size, dpr]);

  useFrame((_, delta) => {
    const current = resources.current;
    if (!current) return;

    current.material.uniforms.uTime.value += delta;

    gl.setRenderTarget(current.target);
    gl.clear();
    gl.render(scene, camera);

    gl.setRenderTarget(null);
    gl.clear();
    gl.render(current.quadScene, current.quadCamera);
  }, 1);

  return null;
}
