export { BRAND as SITE } from "./brand";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/applications", label: "Applications" },
  { href: "/delivery", label: "Delivery" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

export const ZIPPER_TYPES = [
  { value: "spiral", label: "Spiral" },
  { value: "metal", label: "Metal" },
  { value: "injected", label: "Injected" },
  { value: "invisible", label: "Invisible" },
  { value: "recyclable", label: "Recyclable" },
  { value: "water-resistant", label: "Water-Resistant" },
  { value: "fire-retardant", label: "Fire-Retardant" },
] as const;

export const APPLICATIONS = [
  { value: "apparel", label: "Apparel", description: "Fashion, casualwear, couture" },
  { value: "outdoor", label: "Outdoor", description: "Jackets, backpacks, tents" },
  { value: "automotive", label: "Automotive", description: "Seating, interior trim" },
  { value: "medical", label: "Medical", description: "Protective wear, PPE" },
  { value: "luggage", label: "Luggage", description: "Bags, cases, travel gear" },
  { value: "footwear", label: "Footwear", description: "Boots, sneakers, uppers" },
  { value: "marine", label: "Marine", description: "Enclosures, covers, dry bags" },
] as const;

/* =========================================
   DELIVERY
   ========================================= */
export interface DeliveryZone {
  region: string;
  countries: string[];
  transitDays: string;
  method: string;
  notes: string;
}

export const DISPATCH_ORIGIN = {
  city: "Tiruppur",
  state: "Tamil Nadu",
  hub: "18, Dynamic House, Asher Nagar, Gandhi Nagar Post",
  ports: ["Tuticorin Port", "Chennai Port", "Kattupalli Port", "Cochin Port"],
  airport: "Coimbatore International Airport (CJB)",
};

export const DOMESTIC_ZONES: DeliveryZone[] = [
  {
    region: "South India",
    countries: ["Tamil Nadu", "Karnataka", "Kerala", "Andhra Pradesh", "Telangana"],
    transitDays: "1–2 days",
    method: "Road freight (FTL / LTL)",
    notes: "Same-day dispatch before 3 PM · Home turf",
  },
  {
    region: "West India",
    countries: ["Maharashtra", "Gujarat", "Goa", "Madhya Pradesh", "Rajasthan"],
    transitDays: "2–3 days",
    method: "Road freight / Rail",
    notes: "Direct NH-544 corridor via Coimbatore",
  },
  {
    region: "Central India",
    countries: ["Chhattisgarh", "Madhya Pradesh", "Odisha"],
    transitDays: "2–4 days",
    method: "Road freight / Rail",
    notes: "Consolidated dispatch",
  },
  {
    region: "North India",
    countries: ["Delhi NCR", "Punjab", "Haryana", "Uttar Pradesh", "Uttarakhand"],
    transitDays: "3–5 days",
    method: "Road freight / Rail",
    notes: "Temperature-controlled options available",
  },
  {
    region: "East India",
    countries: ["West Bengal", "Bihar", "Jharkhand"],
    transitDays: "3–5 days",
    method: "Road freight / Rail",
    notes: "Priority dispatch for Tier-1 clients",
  },
  {
    region: "North-East",
    countries: ["Assam", "Meghalaya", "Tripura", "Manipur", "Nagaland"],
    transitDays: "5–7 days",
    method: "Road + Rail multimodal",
    notes: "Customs documentation handled in-house",
  },
];

export const INTERNATIONAL_ZONES: DeliveryZone[] = [
  {
    region: "Asia Pacific",
    countries: ["Bangladesh", "Vietnam", "Sri Lanka", "Indonesia", "Thailand", "Malaysia"],
    transitDays: "5–9 days",
    method: "Sea freight / Air freight",
    notes: "FOB / CIF / DDP terms available",
  },
  {
    region: "Middle East",
    countries: ["UAE", "Saudi Arabia", "Qatar", "Oman", "Kuwait", "Turkey"],
    transitDays: "7–12 days",
    method: "Sea freight (Jebel Ali / Dammam)",
    notes: "Halal-certified documentation",
  },
  {
    region: "Europe",
    countries: ["Germany", "United Kingdom", "Italy", "France", "Spain", "Poland", "Netherlands"],
    transitDays: "18–26 days",
    method: "Sea freight (Rotterdam / Hamburg)",
    notes: "REACH & CE compliance docs included",
  },
  {
    region: "North America",
    countries: ["United States", "Canada", "Mexico"],
    transitDays: "20–28 days",
    method: "Sea freight (LA / NY / Vancouver)",
    notes: "FDA / CPSIA documentation on request",
  },
  {
    region: "South America",
    countries: ["Brazil", "Argentina", "Chile", "Colombia", "Peru"],
    transitDays: "25–35 days",
    method: "Sea freight via transshipment",
    notes: "Incoterms FOB Tuticorin / Chennai",
  },
  {
    region: "Africa",
    countries: ["Egypt", "Kenya", "South Africa", "Morocco", "Nigeria"],
    transitDays: "18–28 days",
    method: "Sea freight / Air for samples",
    notes: "Pre-shipment inspection available",
  },
  {
    region: "Oceania",
    countries: ["Australia", "New Zealand"],
    transitDays: "22–30 days",
    method: "Sea freight (Sydney / Auckland)",
    notes: "Biosecurity compliance documentation",
  },
];