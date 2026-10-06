export interface ApplicationData {
  slug: string;
  number: string;              // "01", "02" — display order badge
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  requirements: { label: string; value: string }[];
  recommendedTypes: string[];
  certifications: string[];
  accentColor: "brand" | "emerald" | "amber" | "violet" | "rose" | "cyan" | "lime";
  image: string;               // path to image in /public
  icon: string;                // emoji fallback
}

export const applicationsData: ApplicationData[] = [
  {
    slug: "apparel",
    number: "01",
    name: "Apparel",
    tagline: "Fashion-grade zippers for every seam",
    description:
      "From lightweight invisible zippers for dresses to rugged spirals for denim, our apparel line delivers consistent color matching, smooth operation, and OEKO-TEX 100 safety.",
    longDescription:
      "Apparel is where precision meets design. Every zipper must disappear into the garment or become a design feature — there is no middle ground. We engineer tapes to colorfast standards of ΔE < 1.0 across 24+ shades, coil profiles as fine as 3mm for couture, and sliders smooth enough for a single-handed pull on a tailored jacket.",
    requirements: [
      { label: "Cycle life", value: "100K–300K" },
      { label: "Gauge range", value: "3–6 mm" },
      { label: "Color matching", value: "ΔE < 1.0" },
      { label: "MOQ", value: "5,000 pcs" },
      { label: "Lead time", value: "14–18 days" },
    ],
    recommendedTypes: ["spiral", "invisible", "recyclable"],
    certifications: ["OEKO-TEX 100", "REACH", "GRS 4.0"],
    accentColor: "brand",
    image: "/applications/apparel.webp",
    icon: "👗",
  },
  {
    slug: "outdoor",
    number: "02",
    name: "Outdoor",
    tagline: "Engineered for harsh environments",
    description:
      "Water-resistant, high-tenacity zippers for hardshell jackets, alpine backpacks, and expedition tents. Tested to 10,000mm hydrostatic head and 500K+ cycles.",
    longDescription:
      "The outdoors does not negotiate. Rain, snow, wind, UV, and salt — outdoor gear must survive all of it for years. Our outdoor series uses PU-coated coils, weldable TPU tapes, and corrosion-resistant sliders that keep working after 500,000 cycles. Every batch is hydrostatic tested in-house before shipment.",
    requirements: [
      { label: "Hydrostatic head", value: "10,000 mm" },
      { label: "Temperature range", value: "-30°C to +90°C" },
      { label: "Cycle life", value: "500K+" },
      { label: "UV stability", value: "500 hours" },
      { label: "MOQ", value: "3,000 pcs" },
    ],
    recommendedTypes: ["water-resistant", "spiral", "recyclable"],
    certifications: ["Bluesign", "OEKO-TEX 100", "REACH"],
    accentColor: "emerald",
    image: "/applications/outdoor.webp",
    icon: "🏔️",
  },
  {
    slug: "automotive",
    number: "03",
    name: "Automotive",
    tagline: "IATF 16949 certified supply chain",
    description:
      "Heavy-duty metal and injected zippers for automotive seating, interior trim, and cargo covers. Salt-spray tested and PPAP-ready for tier-1 suppliers.",
    longDescription:
      "Automotive is the toughest qualification in zippers. Tier-1 suppliers need IATF 16949 documentation, PPAP submission, batch traceability, and long-term capacity commitments. We supply seating, headliner, tonneau covers, and interior trim zippers to OEM and aftermarket programs across 12 countries.",
    requirements: [
      { label: "Salt spray", value: "500 hours" },
      { label: "Temperature range", value: "-40°C to +120°C" },
      { label: "Cycle life", value: "1M+" },
      { label: "Traceability", value: "Batch-level" },
      { label: "MOQ", value: "2,000 pcs" },
    ],
    recommendedTypes: ["metal", "injected", "fire-retardant"],
    certifications: ["IATF 16949", "ISO 9001", "RoHS"],
    accentColor: "violet",
    image: "/applications/automotive.webp",
    icon: "🚗",
  },
  {
    slug: "medical",
    number: "04",
    name: "Medical",
    tagline: "Protective wear you can trust",
    description:
      "Fire-retardant and anti-microbial zippers for PPE, surgical gowns, and protective wear. NFPA 1971 and EN 469 certified for critical applications.",
    longDescription:
      "When a zipper fails in medical protective wear, lives are at risk. Our medical line combines fire-retardant aramid tapes, anti-microbial coated coils, and steel sliders that withstand autoclave cycles. Every batch is documented for MDR and FDA traceability.",
    requirements: [
      { label: "FR rating", value: "NFPA 1971" },
      { label: "Temperature range", value: "-40°C to +260°C" },
      { label: "Biocompatibility", value: "ISO 10993" },
      { label: "Autoclave cycles", value: "500+" },
      { label: "MOQ", value: "2,000 pcs" },
    ],
    recommendedTypes: ["fire-retardant", "spiral"],
    certifications: ["NFPA 1971", "EN 469", "OEKO-TEX 100"],
    accentColor: "rose",
    image: "/applications/medical.webp",
    icon: "🩺",
  },
  {
    slug: "luggage",
    number: "05",
    name: "Luggage",
    tagline: "Built for millions of trips",
    description:
      "High-tensile spiral and metal zippers for hard-shell cases, soft luggage, and travel gear. Slider-lock tested to airline abuse standards.",
    longDescription:
      "Luggage zippers get thrown, dropped, sat on, and stretched beyond their design limits. Airlines return 25 out of every 1,000 checked bags damaged — most failures are zipper-related. Our luggage line uses 800N+ tensile coils, TSA-approved locking sliders, and reinforced tape edges rated for 500,000+ pull cycles.",
    requirements: [
      { label: "Cycle life", value: "500K+" },
      { label: "Tensile strength", value: "800 N+" },
      { label: "Slider lock", value: "TSA approved" },
      { label: "Tape edge", value: "Reinforced" },
      { label: "MOQ", value: "5,000 pcs" },
    ],
    recommendedTypes: ["spiral", "metal", "recyclable"],
    certifications: ["REACH", "RoHS", "ISO 9001"],
    accentColor: "amber",
    image: "/applications/luggage.webp",
    icon: "🧳",
  },
  {
    slug: "footwear",
    number: "06",
    name: "Footwear",
    tagline: "Precision zippers for every boot",
    description:
      "Abrasion-resistant zippers engineered for tactical boots, hiking footwear, and sneaker uppers with moisture and salt tolerance.",
    longDescription:
      "Footwear zippers take constant abuse — flexing millions of times, exposed to mud, water, and salt. Our footwear series uses abrasion-resistant tapes tested to 50,000 rubs, coil profiles designed to flex without fatigue, and moisture-sealed constructions for tactical and hiking applications.",
    requirements: [
      { label: "Abrasion", value: "50,000 rubs" },
      { label: "Flex life", value: "1M+" },
      { label: "Water resistance", value: "IPX-4" },
      { label: "Salt tolerance", value: "Yes" },
      { label: "MOQ", value: "5,000 pcs" },
    ],
    recommendedTypes: ["spiral", "water-resistant", "metal"],
    certifications: ["REACH", "OEKO-TEX 100"],
    accentColor: "cyan",
    image: "/applications/footwear.webp",
    icon: "🥾",
  },
  {
    slug: "marine",
    number: "07",
    name: "Marine",
    tagline: "Salt-tested for offshore conditions",
    description:
      "Corrosion-resistant brass and treated nylon zippers for boat covers, dry bags, and marine enclosures with UV stability.",
    longDescription:
      "Marine environments destroy ordinary zippers in a single season. Salt corrodes zinc sliders, UV degrades nylon coil, and constant moisture breeds mold. Our marine series uses solid brass hardware, UV-stabilized rPET tapes rated for 500 hours of exposure, and water-sealed coils that keep gear dry even in tropical humidity.",
    requirements: [
      { label: "Salt spray", value: "1,000 hours" },
      { label: "UV stability", value: "500 hours" },
      { label: "Water seal", value: "IPX-6" },
      { label: "Anti-mold", value: "Treated" },
      { label: "MOQ", value: "2,000 pcs" },
    ],
    recommendedTypes: ["metal", "water-resistant", "injected"],
    certifications: ["REACH", "RoHS", "ISO 9001"],
    accentColor: "lime",
    image: "/applications/marine.webp",
    icon: "⚓",
  },
];

export function getApplication(slug: string): ApplicationData | undefined {
  return applicationsData.find((a) => a.slug === slug);
}