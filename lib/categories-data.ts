export type CategorySlug =
  | "tape"
  | "slider"
  | "teeth"
  | "webbing"
  | "labels"
  | "threads";

export type CategoryGroup = "zipper" | "accessories";

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  color: "brand" | "emerald" | "amber" | "violet" | "rose" | "cyan";
  icon: string;
  image: string;
  group: CategoryGroup;
  stats: { label: string; value: string }[];
}

export const categories: Category[] = [
  /* ============================
     ZIPPER GROUP
     ============================ */
  {
    slug: "tape",
    name: "Tape",
    shortName: "Tape",
    tagline: "Fabrics & tapes that carry the teeth",
    description:
      "Polyester, cotton, TPU, recycled rPET, and aramid tapes in 24+ colors. Colorfast, abrasion-resistant, and matched to your brand palette.",
    color: "brand",
    icon: "🎨",
    image: "/categories/tape.svg",
    group: "zipper",
    stats: [
      { label: "Colors", value: "24+" },
      { label: "Widths", value: "12–35 mm" },
      { label: "Materials", value: "6 types" },
    ],
  },
  {
    slug: "slider",
    name: "Slider",
    shortName: "Slider",
    tagline: "Sliders engineered for the pull",
    description:
      "Auto-lock, semi-lock, pin-lock, non-lock, and water-seal slider bodies in zinc, brass, and steel finishes.",
    color: "emerald",
    icon: "⚙️",
    image: "/categories/slider.svg",
    group: "zipper",
    stats: [
      { label: "Types", value: "5 lock styles" },
      { label: "Materials", value: "Zinc · Brass · Steel" },
      { label: "Cycle life", value: "1M+" },
    ],
  },
  {
    slug: "teeth",
    name: "Teeth",
    shortName: "Teeth",
    tagline: "Coil, metal, and injected profiles",
    description:
      "Nylon coil, brass metal, injected plastic, and specialty teeth from 3mm to 10mm gauge. Tested for tensile strength and fatigue.",
    color: "amber",
    icon: "🔗",
    image: "/categories/teeth.svg",
    group: "zipper",
    stats: [
      { label: "Gauges", value: "3–10 mm" },
      { label: "Profiles", value: "Coil · Metal · Injected" },
      { label: "Tensile", value: "280–980 N" },
    ],
  },

  /* ============================
     ACCESSORIES — STANDALONE
     ============================ */
  {
    slug: "webbing",
    name: "Webbing Tapes",
    shortName: "Webbing",
    tagline: "Heavy-duty webbing for straps and trims",
    description:
      "Woven and knitted webbing tapes in polyester, nylon, and recycled materials. Engineered for bag straps, harnesses, belts, and reinforcement trims.",
    color: "violet",
    icon: "🧵",
    image: "/categories/webbing.svg",
    group: "accessories",
    stats: [
      { label: "Widths", value: "10–60 mm" },
      { label: "Materials", value: "Poly · Nylon · rPET" },
      { label: "Tensile", value: "Up to 2,500 N" },
    ],
  },
  {
    slug: "labels",
    name: "Labels",
    shortName: "Labels",
    tagline: "Woven and printed brand labels",
    description:
      "Woven, printed, and heat-transfer labels for apparel, bags, and footwear. Custom logos, care labels, and size tags — from 500-piece runs.",
    color: "rose",
    icon: "🏷️",
    image: "/categories/labels.svg",
    group: "accessories",
    stats: [
      { label: "Types", value: "Woven · Printed · HTL" },
      { label: "Min order", value: "500 pcs" },
      { label: "Lead time", value: "10–14 days" },
    ],
  },
  {
    slug: "threads",
    name: "Threads",
    shortName: "Threads",
    tagline: "Bonded and spun sewing threads",
    description:
      "Polyester, nylon, and cotton sewing threads in bonded and spun variants. Color-matched to tapes and fabrics for invisible stitching.",
    color: "cyan",
    icon: "🪡",
    image: "/categories/threads.svg",
    group: "accessories",
    stats: [
      { label: "Types", value: "Bonded · Spun · Core" },
      { label: "Deniers", value: "40–1,000" },
      { label: "Colors", value: "300+" },
    ],
  },
];

/* ============================
   HELPERS
   ============================ */
export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoriesByGroup(group: CategoryGroup): Category[] {
  return categories.filter((c) => c.group === group);
}

export const zipperCategories = getCategoriesByGroup("zipper");
export const accessoryCategories = getCategoriesByGroup("accessories");