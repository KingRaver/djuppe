/**
 * Shared GLSL for the forge. These are template strings rather than .glsl files so the
 * chunks can be concatenated into three's own shader includes without a bundler loader.
 */

/**
 * sRGB transfer functions plus OKLab. Colour mixing happens in OKLab throughout: an sRGB
 * lerp from ember to temper blue passes through a dead grey-brown, where the same ramp in
 * OKLab keeps its chroma the whole way across. The matrices are Björn Ottosson's.
 */
export const GLSL_COLOR = /* glsl */ `
vec3 srgbToLinear(vec3 c) {
  return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(vec3(0.04045), c));
}

vec3 linearToSrgb(vec3 c) {
  c = max(c, 0.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(vec3(0.0031308), c));
}

vec3 linearToOklab(vec3 c) {
  float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;
  float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;
  float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;
  vec3 lms = pow(max(vec3(l, m, s), 0.0), vec3(1.0 / 3.0));
  return vec3(
    0.2104542553 * lms.x + 0.7936177850 * lms.y - 0.0040720468 * lms.z,
    1.9779984951 * lms.x - 2.4285922050 * lms.y + 0.4505937099 * lms.z,
    0.0259040371 * lms.x + 0.7827717662 * lms.y - 0.8086757660 * lms.z
  );
}

vec3 oklabToLinear(vec3 c) {
  float l_ = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;
  float m_ = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;
  float s_ = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;
  vec3 lms = vec3(l_ * l_ * l_, m_ * m_ * m_, s_ * s_ * s_);
  return vec3(
     4.0767416621 * lms.x - 3.3077115913 * lms.y + 0.2309699292 * lms.z,
    -1.2684380046 * lms.x + 2.6097574011 * lms.y - 0.3413193965 * lms.z,
    -0.0041960863 * lms.x - 0.7034186147 * lms.y + 1.7076147010 * lms.z
  );
}

vec3 oklabMix(vec3 a, vec3 b, float t) {
  return oklabToLinear(mix(linearToOklab(a), linearToOklab(b), t));
}
`;

/**
 * The steel tempering sequence, lifted straight from the palette in app/_brand/tokens.ts:
 * amber -> ember -> violet -> temper blue. These are the oxide colours carbon steel actually
 * takes as it is drawn back, which is why the site already speaks in them — the hero spec
 * line reads "Surface / 683 K".
 *
 * t = 0 is the hottest end of what we render (amber/ember), t = 1 the coolest (temper blue).
 */
export const GLSL_TEMPER = /* glsl */ `
vec3 temperRamp(float t) {
  vec3 amber  = srgbToLinear(vec3(0.7216, 0.4627, 0.2275)); // --amber        #b8763a
  vec3 ember  = srgbToLinear(vec3(0.8431, 0.3569, 0.1647)); // --ember        #d75b2a
  vec3 violet = srgbToLinear(vec3(0.4078, 0.3137, 0.4353)); // --temper-violet #68506f
  vec3 blue   = srgbToLinear(vec3(0.2784, 0.4157, 0.5294)); // --temper-blue  #476a87

  t = clamp(t, 0.0, 1.0);
  if (t < 0.3333) return oklabMix(amber, ember, t / 0.3333);
  if (t < 0.6666) return oklabMix(ember, violet, (t - 0.3333) / 0.3333);
  return oklabMix(violet, blue, (t - 0.6666) / 0.3334);
}
`;

/**
 * Value noise and fBm. Cheaper than simplex and indistinguishable once it is warped —
 * feeding noise back into its own coordinates is what stops the heat field reading as a
 * computed cloud and starts it reading as something that happened to the metal.
 */
export const GLSL_NOISE = /* glsl */ `
float hash31(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float vnoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash31(i + vec3(0.0, 0.0, 0.0)), hash31(i + vec3(1.0, 0.0, 0.0)), f.x),
        mix(hash31(i + vec3(0.0, 1.0, 0.0)), hash31(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
    mix(mix(hash31(i + vec3(0.0, 0.0, 1.0)), hash31(i + vec3(1.0, 0.0, 1.0)), f.x),
        mix(hash31(i + vec3(0.0, 1.0, 1.0)), hash31(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
    f.z);
}

float fbm(vec3 p) {
  float amp = 0.5;
  float sum = 0.0;
  for (int i = 0; i < 4; i++) {
    sum += amp * vnoise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return sum;
}

float warpedFbm(vec3 p) {
  vec3 q = vec3(
    fbm(p + vec3(0.0, 1.7, 9.2)),
    fbm(p + vec3(5.2, 1.3, 2.8)),
    fbm(p + vec3(3.1, 7.4, 1.1))
  );
  return fbm(p + 1.85 * q);
}
`;
