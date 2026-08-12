export type ProjectVisual = {
  src?: string;
  alt: string;
  variant: "arc" | "temper" | "fold" | "seam" | "mesh" | "horizon" | "machine";
  /**
   * Where the real horizon sits in this photograph, as a fraction of its
   * height. Set it and the survey datum draws there; omit it and no line is
   * drawn. It has to be per-image — two frames of the same site put the
   * waterline in different places.
   */
  datum?: number;
  datumLabel?: string;
  /** Light suits a datum crossing sky or water; dark suits one crossing ground. */
  datumTone?: "light" | "dark";
  /**
   * The source file's native pixel size. When set, the display box is capped
   * to it so a lower-resolution photograph is never upscaled to fill a slot
   * sized for higher-resolution work.
   */
  width?: number;
  height?: number;
};

// No measured data is published anywhere on this site. `note` carries the
// material character of a work in prose, and deliberately holds no dimensions,
// tolerances, gauges or load figures — those stay in the workshop.
export type Project = {
  slug: string;
  number: string;
  title: string;
  year: string;
  type: string;
  location: string;
  note: string;
  description: string;
  statement: string[];
  fabricationNotes?: string[];
  images: ProjectVisual[];
};

// Add real images as `src: "/images/projects/project-slug-01.webp"`.
// The procedural `variant` remains available as a loading/fallback treatment.
export const projects: Project[] = [
  {
    slug: "observation-tower",
    number: "W–043",
    title: "Observation Tower",
    year: "2026",
    type: "Floating structure",
    location: "Sesimbra, PT",
    note: "Glass and timber on a moored pontoon, never entirely still.",
    description: "A glazed lookout moored off the shore at Lagoa de Albufeira, reached only by water.",
    statement: [
      "There is no high ground at the lagoon. A vantage over it has to be built, and building one on the water means giving up the idea that it will hold still. The tower is moored rather than founded, and it moves whenever the lake does.",
      "The structure is timber: splayed posts standing off a pontoon deck and braced back into it, carrying a glazed shaft the rest of the way up. A flared skirt of glass throws weather clear of the platform below. Nothing above the deck is solid except the frame, so for most of the day the tower reads as a line drawing of itself against the far shore, and after dark, with someone climbing inside it, as the only lit thing on the water.",
    ],
    images: [
      // The lead runs full-bleed at 82svh and is deliberately uncapped: a native
      // size here would cap the display box to half the source and collapse it.
      // Uncapped also means the box is wider than this frame at every desktop
      // size, so `cover` crops it vertically by an amount that changes with the
      // viewport. A datum fraction is fixed and would drift out of the water as
      // the window widens — the waterline is at 0.79 here, but only the frames
      // below can draw it where it actually falls.
      {
        src: "/images/projects/observation-tower-01.jpg",
        alt: "A glazed timber tower on a floating pontoon at dusk, a single figure standing inside it, pine woods dark along the far shore",
        variant: "horizon",
      },
      {
        src: "/images/projects/observation-tower-04.jpg",
        alt: "The same tower before sunrise, mist lying on a dead-calm lake and the whole structure repeated in the reflection",
        variant: "seam",
        datum: 0.59,
        datumLabel: "LAGOA",
        width: 1590,
        height: 1058,
      },
      {
        src: "/images/projects/observation-tower-02.jpg",
        alt: "The tower at moonrise, a full moon above it and a crowd gathered along the far shore",
        variant: "fold",
        datum: 0.83,
        datumLabel: "LAGOA",
        width: 1594,
        height: 1196,
      },
      {
        src: "/images/projects/observation-tower-03.jpg",
        alt: "The tower silhouetted against a burning sunset, a swimmer's head and shoulders in the foreground water",
        variant: "temper",
        datum: 0.62,
        datumLabel: "LAGOA",
        width: 1586,
        height: 1330,
      },
    ],
  },
  {
    slug: "mirario",
    number: "W–042",
    title: "Mirário",
    year: "2026",
    type: "Performance structure",
    location: "Caparica, PT",
    note: "Timber and steel on an exposed hill, built to carry sound over water.",
    description: "A stage on the hill at Quinta Mirário, turned to face the river.",
    statement: [
      "The site gave the brief before anyone drew anything: an open slope above the Tagus, wind off the water, and Lisbon sitting on the far bank in full view. Anything built there had to hold its own against that horizon without competing with it.",
      "The canopy is a run of close-set timber over a raised deck, carried on a steel frame that also takes the weight of the rigging. It reads as shelter from below and as structure from the side. In daylight the slats drop a moving grid across the deck; after dark the frame disappears and only the load it carries is visible.",
    ],
    images: [
      {
        src: "/images/projects/mirario-01.jpg",
        alt: "A timber-canopied stage on an open grass hilltop, speakers rigged overhead, with the Tagus estuary and Lisbon on the far bank",
        variant: "horizon",
        datum: 0.95,
        datumLabel: "TAGUS",
        datumTone: "dark",
      },
      {
        src: "/images/projects/mirario-02.jpg",
        alt: "The same stage at sunset, its canopy silhouetted above a dense crowd, low sun burning across the estuary behind it",
        variant: "temper",
        datum: 0.92,
        datumLabel: "TAGUS",
        width: 720,
        height: 385,
      },
    ],
  },
  {
    slug: "tension-study-no-04",
    number: "W–041",
    title: "Tension Study No. 04",
    year: "2026",
    type: "Freestanding sculpture",
    location: "Lisbon, PT",
    note: "Cold steel, blackened and waxed, still holding its breath.",
    description: "A four-millimetre sheet persuaded into a load-bearing line.",
    statement: [
      "Tension Study began as a test of how little material could hold a monumental posture. Its two folded edges act as hidden beams; the broad face carries the marks of rollers, clamps and the final adjustment by heat.",
      "From a distance the work reads as one continuous gesture. Up close, the logic becomes legible: welded interruptions, minute changes in radius, and a base that transfers the apparent instability cleanly into the ground.",
    ],
    fabricationNotes: ["Full-scale paper profiles", "Controlled heat corrections", "Final joint closed by hand"],
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
    location: "Setúbal, PT",
    note: "Dark rolled steel, touching nothing but the two walls it spans.",
    description: "An eight-metre compression arc balanced between two existing walls.",
    statement: [
      "Black Arc was designed for a passage that already carried the memory of industrial use. The piece avoids touching the floor. Its force travels laterally into two concealed bearing plates, leaving a dark interval overhead.",
      "The surface was ground directionally before blackening, so daylight catches the structure in long, uneven bands. Nothing is ornamental; every visible thickening corresponds to a real change in load.",
    ],
    fabricationNotes: ["Built in transport sections", "Pinned site joints", "Deflection checked on installation"],
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
    location: "Copenhagen, DK",
    note: "Bronze and stainless, tuned until the movement almost disappears.",
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
    location: "Berlin, DE",
    note: "One fold, carrying every colour the heat put into it.",
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
    location: "London, UK",
    note: "Cut steel and cast glass, heavy exactly where it needs to be.",
    description: "A table whose apparent mass is split by a seam of transmitted light.",
    statement: [
      "The base is assembled from flame-cut plates whose rough edges face inward. A narrow cast-glass channel occupies the centre, catching light and revealing the otherwise hidden cutting history.",
      "Its top appears to be a single slab, but is relieved underneath through a pattern derived from bending calculations. The object retains weight without wasting it.",
    ],
    fabricationNotes: ["Relieved underside", "Mass removed to a calculated pattern", "Adjustable floor contacts"],
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
    location: "Porto, PT",
    note: "Weathering steel, unsealed, finishing itself in the rain.",
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
    location: "Lisbon, PT",
    note: "Blued steel turning slowly toward no particular purpose.",
    description: "A machine that performs one precise movement with no useful outcome.",
    statement: [
      "A reduction drive turns a folded aluminium arm once every forty-three minutes. Its endpoint presses lightly against a sprung steel surface, releases it, and begins again.",
      "The movement is deliberately over-engineered. Backlash, vibration and sound were treated as sculptural materials until the remaining action felt inevitable rather than automated.",
    ],
    fabricationNotes: ["One slow cycle", "Runs close to silent", "Service access through the rear datum plate"],
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
