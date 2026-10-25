import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { categories } from "@/lib/categories-data";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Products — Zippers & Accessories",
  description: "Browse our catalog of zipper components, webbing, labels, and threads.",
};

export const dynamic = "force-dynamic";

/* =========================================
   PAGE
   ========================================= */
export default function ProductsPage() {
  const zipperCategories = categories.filter(
    (c) => c.group === "zipper" && c.slug !== "tape"
  );
  const accessoryCategories = categories.filter(
    (c) => c.group === "accessories" && c.slug !== "tape"
  );

  return (
    <div className="container-tight py-10 sm:py-16">
      <div className="max-w-2xl mb-12">
        <h1 className="h2 text-balance">Our Products</h1>
      </div>

      {/* ZIPPER GROUP */}
      <section className="mb-16">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 mb-3">
            <Layers className="h-3.5 w-3.5" />
            Zipper Components
          </div>
          <h2 className="text-xl font-semibold text-ink-900">
            Build your zipper
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {zipperCategories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      {/* ACCESSORIES GROUP */}
      <section>
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Accessories
          </div>
          <h2 className="text-xl font-semibold text-ink-900">
            Complete your production line
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {accessoryCategories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* =========================================
   CATEGORY CARD
   ========================================= */
function CategoryCard({
  category,
}: {
  category: (typeof categories)[number];
}) {
  const colorMap = {
    brand: { bg: "bg-brand-50" },
    emerald: { bg: "bg-emerald-50" },
    amber: { bg: "bg-amber-50" },
    violet: { bg: "bg-violet-50" },
    rose: { bg: "bg-rose-50" },
    cyan: { bg: "bg-cyan-50" },
  }[category.color as "brand" | "emerald" | "amber" | "violet" | "rose" | "cyan"];

  // Map to your /public/banners/ images
  const bannerImageMap: Record<string, string> = {
    slider: "/banners/slider.webp",
    teeth: "/banners/teeth.webp",
    webbing: "/banners/webbing.webp",
    labels: "/banners/labels.webp",
    threads: "/banners/threads.webp",
  };

  const bgImage = bannerImageMap[category.slug];

  return (
    <Link
      href={`/products/${category.slug}`}
      className="group relative flex flex-col rounded-2xl border border-ink-200 overflow-hidden hover:border-ink-300 hover:shadow-xl hover:shadow-ink-900/5 transition-all duration-200 min-h-[280px]"
    >
      {/* ============ BACKGROUND LAYER ============ */}
      {bgImage ? (
        <Image
          src={bgImage}
          alt={`${category.name} background`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className={cn("absolute inset-0", colorMap.bg)} />
      )}

      {/* ============ DARK OVERLAY (stronger + blur) ============ */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/70 to-ink-950/30" />

      {/* ============ CONTENT ============ */}
      <div className="relative z-10 p-6 flex flex-col h-full justify-between min-h-[280px]">
        {/* Top: icon + name */}
        <div>
          <div className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 grid place-items-center text-2xl mb-4">
            <span aria-hidden>{category.icon}</span>
          </div>
          <h3 className="text-lg font-semibold text-white drop-shadow-md">
            {category.name}
          </h3>
          <p className="mt-2 text-sm text-white/90 leading-relaxed drop-shadow-sm">
            {category.tagline}
          </p>
        </div>

        {/* Bottom: stat + link */}
        <div className="mt-6 pt-5 border-t border-white/20 flex items-center justify-between">
          <span className="text-xs font-medium text-white/80">
            {category.stats[0]?.value} {category.stats[0]?.label}
          </span>
          <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:gap-2.5 transition-all">
            View Products
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}