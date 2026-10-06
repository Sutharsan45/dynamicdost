export type ZipperType =
  | "spiral"
  | "metal"
  | "injected"
  | "invisible"
  | "recyclable"
  | "water-resistant"
  | "fire-retardant"
  | "polyester"
  | "nylon"
  | "auto-lock";

export type Application =
  | "apparel"
  | "outdoor"
  | "automotive"
  | "medical"
  | "luggage"
  | "footwear"
  | "marine";

export type ComponentType =
  | "tape"
  | "slider"
  | "teeth"
  | "webbing"
  | "labels"
  | "threads";

export interface ZipperSpec {
  gaugeMm: number;
  tapeWidthMm: number;
  tensileStrengthN: number;
  sliderCompatibility: string[];
  colorCodes: string[];
  lengthOptionsMm: number[];
  minOrderQty: number;
  leadTimeDays: number;
  operatingTempC: [number, number];
}

export interface ZipperProduct {
  id: string;
  slug: string;
  sku: string;
  name: string;
  shortName: string;
  type: ZipperType;
  componentType?: ComponentType;
  applications: Application[];
  material: string;
  finish: string;
  certifications: string[];
  specs: ZipperSpec;
  description: string;
  highlights: string[];
  images: string[];
  specSheetUrl: string;
  featured?: boolean;
}