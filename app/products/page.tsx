import Link from "next/link";
import { ArrowRight, Sparkles, Layers } from "lucide-react";
import {
  zipperCategories,
  accessoryCategories,
} from "@/lib/categories-data";
import { ProductCard } from "@/components/product/ProductCard";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Products — Zippers, Webbing, Labels & Threads",
  description:
    "Browse our full catalog: zipper tape, slider, and teeth; plus webbing tapes, woven labels, and sewing threads. Engineered, tested, and certified for global supply chains.",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  let products: any[] = [];
  try {
    const res = await apiFetch<{ items: any[] }>(
      "/api/products?pageSize=100"
    );
    products = res.items ?? [];
  } catch (err) {
    console.error("Failed to fetch products:", err);
    products = [];
  }

  return (
    <>
      {/* =========================================
          HERO
      ========================================= */}
      <section className="relative border-b border-ink-100 bg-ink-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink-50/40 via-ink-50/80 to-ink-50"
          aria-hidden
        />

        <div className="container-tight relative py-14 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow">Our products</p>
            <h1 className="h1 mt-3 text-balance">
              Zippers, webbing, labels & threads
            </h1>
            <p className="lead mt-5 text-pretty">
              Everything that goes into a finished garment — engineered,
              certified, and shipped from our Tiruppur facility.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="#zipper" className="btn btn-primary btn-lg">
                Explore zippers <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#accessories" className="btn btn-secondary btn-lg">
                Browse accessories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          ZIPPER GROUP
      ========================================= */}
      <section id="zipper" className="section-sm scroll-mt-20">
        <div className="container-tight">
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 mb-4">
              <Layers className="h-3.5 w-3.5" />
              Zipper Group
            </div>
            <h2 className="h2 text-balance">
              Zipper components, piece by piece
            </h2>
            <p className="lead mt-3 text-pretty">
              Specify tape, slider, and teeth independently — or as complete
              assemblies ready to sew.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {zipperCategories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          ACCESSORIES GROUP
      ========================================= */}
      <section
        id="accessories"
        className="section-sm bg-ink-50 border-y border-ink-100 scroll-mt-20"
      >
        <div className="container-tight">
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Accessories
            </div>
            <h2 className="h2 text-balance">
              Webbing, labels & threads
            </h2>
            <p className="lead mt-3 text-pretty">
              Complete your production line with matched trim: heavy-duty
              webbing, brand labels, and color-matched sewing thread.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {accessoryCategories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          ALL PRODUCTS
      ========================================= */}
      <section id="all-products" className="section-sm scroll-mt-20">
        <div className="container-tight">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow">Full catalog</p>
              <h2 className="h2 mt-2 text-balance">
                All products ({products.length})
              </h2>
              <p className="lead mt-2 text-pretty">
                Every SKU we currently manufacture. Click any product to view
                full specifications.
              </p>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="rounded-xl border border-dashed border-ink-300 py-20 text-center">
              <p className="text-ink-600 font-medium">
                No products in catalog yet.
              </p>
              <p className="text-sm text-ink-500 mt-1">
                Log in to the admin panel to add products.
              </p>
              <Link
                href="/admin/products"
                className="mt-5 inline-flex items-center gap-1 text-brand-600 text-sm font-medium hover:underline"
              >
                Go to admin <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* =========================================
   Category Card
   ========================================= */
function CategoryCard({
  category,
}: {
  category: (typeof zipperCategories)[number];
}) {
  const colorMap = {
    brand: { bg: "bg-brand-50", icon: "text-brand-600" },
    emerald: { bg: "bg-emerald-50", icon: "text-emerald-600" },
    amber: { bg: "bg-amber-50", icon: "text-amber-600" },
    violet: { bg: "bg-violet-50", icon: "text-violet-600" },
    rose: { bg: "bg-rose-50", icon: "text-rose-600" },
    cyan: { bg: "bg-cyan-50", icon: "text-cyan-600" },
  }[category.color as
    | "brand"
    | "emerald"
    | "amber"
    | "violet"
    | "rose"
    | "cyan"];

  return (
    <Link
      href={`/products/${category.slug}`}
      className="group relative flex flex-col rounded-xl border border-ink-200 bg-white p-6 sm:p-7 transition-all duration-200 hover:border-ink-300 hover:shadow-xl hover:shadow-ink-900/5 hover:-translate-y-0.5"
    >
      <div
        className={cn(
          "h-14 w-14 rounded-xl grid place-items-center text-2xl",
          colorMap.bg
        )}
      >
        <span aria-hidden>{category.icon}</span>
      </div>

      <h3 className="mt-5 text-xl font-semibold text-ink-900 group-hover:text-brand-700 transition-colors">
        {category.name}
      </h3>

      <p className="mt-2 text-sm text-ink-600 leading-relaxed">
        {category.tagline}
      </p>

      <dl className="mt-5 pt-5 border-t border-ink-100 space-y-2.5">
        {category.stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between text-xs"
          >
            <dt className="text-ink-500">{stat.label}</dt>
            <dd className="font-semibold text-ink-900">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 group-hover:gap-2.5 transition-all">
        View {category.shortName.toLowerCase()} products
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}