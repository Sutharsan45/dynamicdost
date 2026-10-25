"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  category: "slider" | "teeth" | "webbing";
  className?: string;
}

export function AnimatedCategoryVisual({ category, className }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "relative w-full h-full flex items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* SLIDER ANIMATION: A zipper slider moving up and down */}
      {category === "slider" && (
        <div className="relative w-full max-w-sm aspect-square">
          {/* Tracks */}
          <div className="absolute inset-x-0 top-0 bottom-0 flex justify-center gap-3 px-8">
            <div className="w-1/3 bg-ink-100 rounded-full" />
            <div className="w-1/3 bg-ink-100 rounded-full" />
          </div>
          {/* Zipper Slider */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-24 flex flex-col items-center justify-center">
            <div className="w-16 h-20 bg-ink-800 rounded-lg shadow-lg flex flex-col items-center justify-end pb-2 relative z-10 animate-slider-bounce">
              <div className="w-6 h-10 bg-ink-900 rounded-sm absolute -bottom-10" />
            </div>
            <div className="w-1 h-40 bg-ink-300 absolute top-20 -z-0" />
          </div>
        </div>
      )}

      {/* TEETH ANIMATION: Teeth interlocking and unzipping */}
      {category === "teeth" && (
        <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
          <div className="flex items-center justify-center gap-2">
            {/* Left Teeth */}
            <div className="flex flex-col gap-2 animate-teeth-march">
              {[...Array(6)].map((_, i) => (
                <div
                  key={`left-${i}`}
                  className="w-12 h-6 bg-amber-500 rounded-md border border-amber-600 shadow-sm"
                />
              ))}
            </div>
            {/* Right Teeth */}
            <div className="flex flex-col gap-2 animate-teeth-march-reverse">
              {[...Array(6)].map((_, i) => (
                <div
                  key={`right-${i}`}
                  className="w-12 h-6 bg-amber-500 rounded-md border border-amber-600 shadow-sm"
                />
              ))}
            </div>
          </div>
          {/* Pull Tab / Slider */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-16 bg-ink-800 rounded-lg shadow-xl flex flex-col items-center justify-center z-10">
            <div className="w-4 h-10 bg-ink-900 rounded-sm" />
          </div>
        </div>
      )}

      {/* WEBBING ANIMATION: A strap flexing */}
      {category === "webbing" && (
        <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
          <div className="w-full h-24 bg-violet-600 rounded-lg flex items-center justify-center overflow-hidden relative shadow-inner animate-webbing-flex">
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#fff_10px,#fff_20px)]" />
            <span className="text-white font-bold tracking-widest text-lg opacity-80 z-10">
              WEBBING TAPE
            </span>
          </div>
        </div>
      )}
    </div>
  );
}