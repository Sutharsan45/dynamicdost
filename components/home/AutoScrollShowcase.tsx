"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShowcaseItem {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  color: "brand" | "violet" | "rose" | "cyan";
  highlights: string[];
  href: string;
}

const ITEMS: ShowcaseItem[] = [
  {
    slug: "zipper-variants",
    name: "Zipper Range",
    tagline: "Premium zipper tapes for every need",
    description:
      "Nine zipper styles — spiral, nylon coil, reverse slider, double pull, molded plastic, metal, and more.",
    image: "/banners/zipper-variants.webp",
    color: "brand",
    highlights: ["9 variants", "Fashion · Industrial"],
    href: "/products",
  },
  {
    slug: "webbing",
    name: "Webbing Tapes",
    tagline: "Stronger materials. Wider possibilities.",
    description:
      "Heavy-duty woven and knitted webbing tapes. Up to 2,500 N tensile.",
    image: "/banners/webbing.webp",
    color: "violet",
    highlights: ["10–60 mm widths", "Poly · Nylon · rPET"],
    href: "/products/webbing",
  },
  {
    slug: "labels",
    name: "Labels",
    tagline: "Advanced labelling solutions",
    description:
      "Woven, printed, and heat-transfer labels for every brand touchpoint.",
    image: "/banners/labels.webp",
    color: "rose",
    highlights: ["500 pc MOQ", "Custom logos"],
    href: "/products/labels",
  },
  {
    slug: "threads",
    name: "Threads",
    tagline: "Engineered high-performance threads",
    description:
      "Kevlar, bonded polyester, industrial nylon, and heavy-duty cotton.",
    image: "/banners/threads.webp",
    color: "cyan",
    highlights: ["300+ colors", "Bonded & spun"],
    href: "/products/threads",
  },
];

const COLOR_MAP = {
  brand: {
    chip: "bg-brand-50 text-brand-700 border-brand-100",
    dot: "bg-brand-500",
    glow: "from-brand-500/20",
  },
  violet: {
    chip: "bg-violet-50 text-violet-700 border-violet-100",
    dot: "bg-violet-500",
    glow: "from-violet-500/20",
  },
  rose: {
    chip: "bg-rose-50 text-rose-700 border-rose-100",
    dot: "bg-rose-500",
    glow: "from-rose-500/20",
  },
  cyan: {
    chip: "bg-cyan-50 text-cyan-700 border-cyan-100",
    dot: "bg-cyan-500",
    glow: "from-cyan-500/20",
  },
} as const;

export function AutoScrollShowcase() {
  return (
    <section className="section bg-white overflow-hidden">
      <div className="container-tight">
        <div className="max-w-2xl mb-10">
          <p className="eyebrow">Our range</p>
          <h2 className="h2 mt-2 text-balance">
            Zippers, webbing, labels & threads
          </h2>
          <p className="lead mt-4 text-pretty">
            Everything that goes into a finished garment — engineered to the
            same standard, matched colors, single-source supply.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex gap-5 sm:gap-6 animate-auto-scroll hover:[animation-play-state:paused] pb-4">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <ShowcaseCard key={`${item.slug}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  const c = COLOR_MAP[item.color];

  return (
    <Link
      href={item.href}
      className={cn(
        "group relative shrink-0 w-[320px] sm:w-[400px] lg:w-[460px] rounded-2xl overflow-hidden border border-ink-200 bg-white shadow-lg hover:shadow-2xl hover:shadow-ink-900/10 transition-all duration-300 hover:-translate-y-1"
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 460px"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t to-transparent",
            c.glow
          )}
        />
        <span
          className={cn(
            "absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold bg-white/95 backdrop-blur-sm",
            c.chip
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", c.dot)} />
          {item.name}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-ink-900 group-hover:text-brand-700 transition-colors">
          {item.tagline}
        </h3>
        <p className="mt-2 text-sm text-ink-600 leading-relaxed line-clamp-2">
          {item.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.highlights.map((h) => (
            <span
              key={h}
              className="inline-flex items-center rounded-full bg-ink-50 border border-ink-100 px-2.5 py-0.5 text-[11px] font-medium text-ink-700"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-brand-700 group-hover:gap-2.5 transition-all">
          Explore {item.name.toLowerCase()}
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}