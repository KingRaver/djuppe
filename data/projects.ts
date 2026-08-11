export type ProjectVisual = {
  src?: string;
  alt: string;
  variant: "arc" | "temper" | "fold" | "seam" | "mesh" | "horizon" | "machine";
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  year: string;
  type: string;
  materials: string;
  dimensions: string;
  location: string;
  description: string;
  statement: string[];
  fabricationNotes?: string[];
  images: ProjectVisual[];
};

// Add real images as `src: "/images/projects/project-slug-01.webp"`.
// The procedural `variant` remains available as a loading/fallback treatment.
export const projects: Project[] = [
  {
    slug: "tension-study-no-04",
    number: "W–041",
    title: "Tension Study No. 04",
    year: "2026",
    type: "Freestanding sculpture",
    materials: "Cold-rolled steel, black oxide, wax",
    dimensions: "3100 × 900 × 520 mm",
    location: "Lisbon, PT",
    description: "A four-millimetre sheet persuaded into a load-bearing line.",
    statement: [
      "Tension Study began as a test of how little material could hold a monumental posture. Its two folded edges act as hidden beams; the broad face carries the marks of rollers, clamps and the final adjustment by heat.",
      "From a distance the work reads as one continuous gesture. Up close, the logic becomes legible: welded interruptions, minute changes in radius, and a base that transfers the apparent instability cleanly into the ground.",
    ],
    fabricationNotes: ["12 full-scale paper profiles", "7 controlled heat corrections", "Tolerance at final joint: 0.8 mm"],
    images: [
      { alt: "Dark steel arc rising against a furnace-lit ground", variant: "arc" },
      { alt: "Detail of a heat-marked steel edge", variant: "temper" },
      { alt: "Technical elevation of the folded sculpture", variant: "mesh" },
    ],
  },
  {
    slug: "black-arc",
    number: "W–036",
    title: "Black Arc",
    year: "2025",
    type: "Architectural installation",
    materials: "Rolled mild steel, graphite patina",
    dimensions: "8200 × 1800 × 340 mm",
    location: "Setúbal, PT",
    description: "An eight-metre compression arc balanced between two existing walls.",
    statement: [
      "Black Arc was designed for a passage that already carried the memory of industrial use. The piece avoids touching the floor. Its force travels laterally into two concealed bearing plates, leaving a dark interval overhead.",
      "The surface was ground directionally before blackening, so daylight catches the structure in long, uneven bands. Nothing is ornamental; every visible thickening corresponds to a real change in load.",
    ],
    fabricationNotes: ["Three transport sections", "Pinned site joints", "Installed deflection: 3.2 mm"],
    images: [
      { alt: "A monumental black steel arc spanning a shadowed passage", variant: "horizon" },
      { alt: "Graphite steel surface catching a narrow band of light", variant: "arc" },
      { alt: "Connection plate drawing for the suspended arc", variant: "mesh" },
    ],
  },
  {
    slug: "weight-of-air",
    number: "W–029",
    title: "Weight of Air",
    year: "2025",
    type: "Kinetic object",
    materials: "Stainless steel, phosphor bronze, bearings",
    dimensions: "1450 × 1450 × 180 mm",
    location: "Copenhagen, DK",
    description: "A slow instrument moved by pressure changes too small to notice.",
    statement: [
      "Two counterweighted planes rotate around a shared axis. They never repeat the same alignment: rising air, a nearby body or a door opening is enough to alter the balance.",
      "The mechanism is exposed but visually quiet. Bronze bushes and adjustable weights allow the work to be tuned on site until movement sits just above the threshold of perception.",
    ],
    fabricationNotes: ["Static balance within 2 g", "Hand-lapped bronze bushes", "Rotation limited mechanically to 274°"],
    images: [
      { alt: "Two pale steel planes balanced in a dark volume", variant: "fold" },
      { alt: "Bronze bearing assembly and machined fastener", variant: "machine" },
      { alt: "Circular movement diagram with balance coordinates", variant: "mesh" },
    ],
  },
  {
    slug: "folded-horizon",
    number: "W–023",
    title: "Folded Horizon",
    year: "2024",
    type: "Wall work",
    materials: "Heat-treated stainless steel",
    dimensions: "4800 × 420 × 90 mm",
    location: "Berlin, DE",
    description: "One long fold carrying the colours of its own making.",
    statement: [
      "Folded Horizon is made from six sheets joined into a line longer than the workshop. Heat from the welds was not erased. It was drawn outward and controlled, allowing amber, violet and deep blue to register the fabrication sequence.",
      "The shallow V-section changes with the room: a bright edge at midday, almost absent at night. The work is both a record of temperature and an instrument for available light.",
    ],
    images: [
      { alt: "A long heat-coloured steel fold crossing a dark wall", variant: "temper" },
      { alt: "Blue, violet and bronze oxidation on stainless steel", variant: "horizon" },
      { alt: "Close view of an almost invisible ground weld", variant: "seam" },
    ],
  },
  {
    slug: "furnace-table",
    number: "W–018",
    title: "Furnace Table",
    year: "2024",
    type: "Functional sculpture",
    materials: "Flame-cut steel, cast glass",
    dimensions: "2600 × 980 × 730 mm",
    location: "London, UK",
    description: "A table whose apparent mass is split by a seam of transmitted light.",
    statement: [
      "The base is assembled from flame-cut plates whose rough edges face inward. A narrow cast-glass channel occupies the centre, catching light and revealing the otherwise hidden cutting history.",
      "Its top appears to be a single slab, but is relieved underneath through a pattern derived from bending calculations. The object retains weight without wasting it.",
    ],
    fabricationNotes: ["Top plate: 18 mm", "Underside mass removed: 31%", "Six adjustable floor contacts"],
    images: [
      { alt: "A massive dark metal table split by warm glass light", variant: "seam" },
      { alt: "Flame-cut steel edge with amber reflection", variant: "machine" },
      { alt: "Underside stiffening pattern of the table", variant: "mesh" },
    ],
  },
  {
    slug: "counterforce",
    number: "W–012",
    title: "Counterforce",
    year: "2023",
    type: "Outdoor sculpture",
    materials: "Weathering steel, stainless cable",
    dimensions: "5200 × 4100 × 1900 mm",
    location: "Porto, PT",
    description: "Two leaning frames made stable by the force pulling them together.",
    statement: [
      "Counterforce is structurally incomplete without tension. Two weathering-steel frames lean away from one another while a single stainless cable draws them into equilibrium.",
      "Rain continues the finishing process. Rust migrates down the broad planes but stops sharply at the polished tension hardware, making maintenance and ageing part of the work's visible logic.",
    ],
    images: [
      { alt: "Two rusted steel frames held in tension outdoors", variant: "arc" },
      { alt: "Weathering steel surface after rain", variant: "temper" },
      { alt: "Polished cable termination under tension", variant: "machine" },
    ],
  },
  {
    slug: "the-quiet-machine",
    number: "W–007",
    title: "The Quiet Machine",
    year: "2023",
    type: "Mechanical sculpture",
    materials: "Blued steel, aluminium, reduction drive",
    dimensions: "1100 × 760 × 1600 mm",
    location: "Lisbon, PT",
    description: "A machine that performs one precise movement with no useful outcome.",
    statement: [
      "A reduction drive turns a folded aluminium arm once every forty-three minutes. Its endpoint presses lightly against a sprung steel surface, releases it, and begins again.",
      "The movement is deliberately over-engineered. Backlash, vibration and sound were treated as sculptural materials until the remaining action felt inevitable rather than automated.",
    ],
    fabricationNotes: ["Cycle: 43 min 12 sec", "Sound pressure at 1 m: < 24 dBA", "Service access through rear datum plate"],
    images: [
      { alt: "A blued steel mechanism in a pool of cool light", variant: "machine" },
      { alt: "Folded aluminium arm and sprung contact surface", variant: "fold" },
      { alt: "Drive sequence and timing drawing", variant: "mesh" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
