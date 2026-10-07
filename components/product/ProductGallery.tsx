"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  images: string[];
  name: string;
  featured?: boolean;
  componentType?: string;
  gaugeMm?: number;
  type?: string;
}

export function ProductGallery({
  images,
  name,
  featured,
  componentType,
  gaugeMm,
  type,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const total = images.length;
  const hasImages = total > 0;

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  /* Keyboard nav */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  /* Lock body scroll when lightbox is open */
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [lightboxOpen]);

  /* -------- No images: show placeholder -------- */
  if (!hasImages) {
    return (
      <div className="relative aspect-square rounded-2xl border border-ink-200 bg-gradient-to-br from-ink-50 via-white to-ink-50 overflow-hidden">
        <div className="absolute inset-0 grid place-items-center p-8">
          <div className="text-center select-none">
            <div className="text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tighter text-ink-200">
              {gaugeMm ?? "—"}
              {gaugeMm && (
                <span className="text-3xl sm:text-4xl align-top text-ink-300">
                  mm
                </span>
              )}
            </div>
            <div className="mt-4 text-xs uppercase tracking-[0.2em] text-ink-500 font-medium">
              {type ?? "zipper"}
            </div>
          </div>
        </div>

        {featured && (
          <span className="absolute top-4 left-4 z-10 inline-flex items-center rounded-full bg-ink-900 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5">
            Featured
          </span>
        )}

        {componentType && (
          <span className="absolute top-4 right-4 z-10 inline-flex items-center rounded-full bg-white border border-ink-200 text-ink-700 text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5">
            {componentType}
          </span>
        )}
      </div>
    );
  }

  return (
    <>
      {/* ============ MAIN IMAGE ============ */}
      <div className="group relative aspect-square rounded-2xl border border-ink-200 bg-gradient-to-br from-ink-50 via-white to-ink-50 overflow-hidden">
        <Image
          src={images[activeIndex]}
          alt={`${name} — image ${activeIndex + 1}`}
          fill
          priority={activeIndex === 0}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />

        {/* Click to open lightbox */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute inset-0 z-10 cursor-zoom-in"
          aria-label="View full size"
        >
          <span className="sr-only">Open full size</span>
        </button>

        {/* Zoom hint (appears on hover) */}
        <div className="pointer-events-none absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/85 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1">
            <ZoomIn className="h-3 w-3" />
            Click to zoom
          </span>
        </div>

        {/* Featured badge */}
        {featured && (
          <span className="pointer-events-none absolute top-4 left-4 z-20 inline-flex items-center rounded-full bg-ink-900 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5">
            Featured
          </span>
        )}

        {/* Component type badge */}
        {componentType && (
          <span className="pointer-events-none absolute top-4 right-4 z-20 inline-flex items-center rounded-full bg-white border border-ink-200 text-ink-700 text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5">
            {componentType}
          </span>
        )}

        {/* Image counter */}
        {total > 1 && (
          <span className="pointer-events-none absolute bottom-4 right-4 z-20 inline-flex items-center rounded-full bg-ink-900/85 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 tabular-nums">
            {activeIndex + 1} / {total}
          </span>
        )}

        {/* Prev / Next arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm border border-ink-200 grid place-items-center text-ink-700 hover:bg-white hover:shadow-lg transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm border border-ink-200 grid place-items-center text-ink-700 hover:bg-white hover:shadow-lg transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* ============ THUMBNAILS — ALL IMAGES ============ */}
      {total > 1 && (
        <div
          className={cn(
            "mt-3 grid gap-2",
            total <= 5
              ? "grid-cols-5"
              : total <= 8
              ? "grid-cols-4 sm:grid-cols-5"
              : "grid-cols-5"
          )}
        >
          {images.map((img, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={`${img}-${i}`}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={active}
                className={cn(
                  "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
                  active
                    ? "border-brand-500 ring-2 ring-brand-500/20"
                    : "border-ink-200 hover:border-ink-400 opacity-70 hover:opacity-100"
                )}
              >
                <Image
                  src={img}
                  alt={`${name} thumbnail ${i + 1}`}
                  fill
                  sizes="15vw"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* ============ LIGHTBOX ============ */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-ink-950/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Counter */}
          <span className="absolute top-6 left-6 text-white/80 text-sm font-medium tabular-nums z-10">
            {activeIndex + 1} / {total}
          </span>

          {/* Prev */}
          {total > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center transition-colors z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-full max-w-5xl aspect-square"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={`${name} — full size view ${activeIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Next */}
          {total > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center transition-colors z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Thumbnail strip at bottom */}
          {total > 1 && (
            <div
              className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2 rounded-xl bg-white/5 backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, i) => {
                const active = i === activeIndex;
                return (
                  <button
                    key={`lb-${img}-${i}`}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Show image ${i + 1}`}
                    className={cn(
                      "relative h-12 w-12 sm:h-14 sm:w-14 rounded-md overflow-hidden border-2 transition-all shrink-0",
                      active
                        ? "border-white ring-2 ring-white/40"
                        : "border-white/20 opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}