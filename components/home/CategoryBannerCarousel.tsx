"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Slide {
  href: string;
  category: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  accentColor: "brand" | "rose" | "violet" | "cyan";
  hideText?: boolean;
}

const SLIDES: Slide[] = [
  {
    href: "/products",
    category: "",
    title: "",
    subtitle: "",
    cta: "",
    image: "/hero.webp",
    accentColor: "brand",
    hideText: true,
  },
  {
    href: "/products",
    category: "Zipper Range",
    title: "Premium zipper tapes for every need",
    subtitle:
      "Nine zipper styles — spiral, nylon coil, reverse slider, double pull, molded plastic, metal, and more.",
    cta: "Explore zippers",
    image: "/banners/zipper-variants.webp",
    accentColor: "brand",
  },
  {
    href: "/products/labels",
    category: "Labels",
    title: "Advanced labelling solutions",
    subtitle:
      "Woven, printed, and heat-transfer labels for apparel, bags, and footwear — from 500-piece runs.",
    cta: "Explore labels",
    image: "/banners/labels.webp",
    accentColor: "rose",
  },
  {
    href: "/products/webbing",
    category: "Webbing Tapes",
    title: "Stronger materials. Wider possibilities.",
    subtitle:
      "Heavy-duty woven and knitted webbing in polyester, nylon, and recycled rPET. Up to 2,500 N tensile.",
    cta: "Explore webbing",
    image: "/banners/webbing.webp",
    accentColor: "violet",
  },
  {
    href: "/products/threads",
    category: "Threads",
    title: "Engineered high-performance threads",
    subtitle:
      "Kevlar, bonded polyester, industrial nylon, and heavy-duty cotton threads. Color-matched to 300+ shades.",
    cta: "Explore threads",
    image: "/banners/threads.webp",
    accentColor: "cyan",
  },
];

const ACCENT = {
  brand: { dot: "bg-brand-500" },
  rose: { dot: "bg-rose-500" },
  violet: { dot: "bg-violet-500" },
  cyan: { dot: "bg-cyan-500" },
} as const;

export function CategoryBannerCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused]);

  const slide = SLIDES[index];
  const accent = ACCENT[slide.accentColor];
  const showText = !slide.hideText;

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-ink-200 bg-ink-950 shadow-2xl shadow-ink-900/10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/*
        Container aspect ratio is now 16:9 on ALL screens.
        This matches your banner image aspect so object-cover
        fills edge-to-edge without gaps or cropping.
      */}
      <div className="relative aspect-[16/9] w-full">
        {SLIDES.map((s, i) => (
          <div
            key={s.href + i}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
            aria-hidden={i !== index}
          >
            <Image
              src={s.image}
              alt={`${s.title || "Dynamic Dost"} — ${s.category || "Hero"}`}
              fill
              priority={i === 0}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center"
            />
            {!s.hideText && (
              <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/50 to-transparent" />
            )}
          </div>
        ))}

        {/* Text overlay */}
        <div
          className={cn(
            "absolute inset-0 z-20 flex flex-col justify-end sm:justify-center p-4 sm:p-10 lg:p-14 transition-opacity duration-500",
            showText ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          {showText && (
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-white">
                <span
                  className={cn(
                    "h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full",
                    accent.dot
                  )}
                />
                {slide.category}
              </div>

              <h2 className="mt-2 sm:mt-4 text-base sm:text-3xl lg:text-5xl font-semibold text-white tracking-tight leading-tight text-balance">
                {slide.title}
              </h2>

              <p className="hidden sm:block mt-3 text-sm lg:text-base text-white/80 leading-relaxed max-w-lg text-pretty">
                {slide.subtitle}
              </p>

              <div className="mt-3 sm:mt-6 flex flex-row sm:flex-row gap-2 sm:gap-3">
                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-1 sm:gap-2 rounded-lg bg-white text-ink-900 font-medium text-xs sm:text-base px-3 py-2 sm:px-6 sm:py-3 hover:bg-ink-100 transition-colors"
                >
                  {slide.cta}
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-white/30 text-white font-medium text-xs sm:text-base px-3 py-2 sm:px-6 sm:py-3 hover:bg-white/10 transition-colors"
                >
                  Contact sales
                </Link>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={prev}
          className="hidden sm:grid absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white place-items-center hover:bg-white/25 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="hidden sm:grid absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white place-items-center hover:bg-white/25 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.href + i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1 sm:h-1.5 rounded-full transition-all",
                i === index
                  ? "w-6 sm:w-8 bg-white"
                  : "w-1 sm:w-1.5 bg-white/50 hover:bg-white/80"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}