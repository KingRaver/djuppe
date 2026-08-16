import * as THREE from "three";
import { GLSL_COLOR, GLSL_NOISE, GLSL_TEMPER } from "./forgeShaders";

/**
 * Heat, injected into three's own physical material rather than replacing it. A bespoke
 * ShaderMaterial would mean re-implementing PBR, the environment reflection and the shadow
 * chain; splicing into the stock shader keeps all of that and adds the one thing it lacks.
 *
 * The field is evaluated in object space, not UV space: ExtrudeGeometry's UV generator maps
 * side walls from world coordinates rather than arc length, so its `uv.x` is not the
 * "distance along the bar" it looks like. Object-space 3D noise sidesteps that entirely and
 * pools heat in regions of the loop, which is closer to how a section actually cools.
 */
export function applyTemperShader(material: THREE.MeshPhysicalMaterial, time: THREE.IUniform<number>) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = time;

    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vTemperPosition;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\n  vTemperPosition = position;");

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
varying vec3 vTemperPosition;
uniform float uTime;
${GLSL_COLOR}
${GLSL_TEMPER}
${GLSL_NOISE}`,
      )
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
  {
    vec3 heatPoint = vTemperPosition * 0.42;
    heatPoint.y += uTime * 0.035;
    float field = warpedFbm(heatPoint + vec3(0.0, 0.0, uTime * 0.05));

    // Biased hard so most of the loop stays cold steel. Heat everywhere is a glowing toy;
    // heat in three places is a piece that just came off the fire.
    float heat = smoothstep(0.46, 0.86, field);
    float ramp = smoothstep(0.40, 0.95, field);

    totalEmissiveRadiance += temperRamp(1.0 - ramp) * heat * 1.35;

    // Hotter steel scales smoother. Also stops the specular reading uniform across the bar.
    roughnessFactor = clamp(roughnessFactor - heat * 0.12, 0.04, 1.0);
  }`,
      );
  };

  // Without this, three caches one program for every material sharing these defines and the
  // injected source silently fails to recompile.
  material.customProgramCacheKey = () => "forge-temper";
  material.needsUpdate = true;
}
