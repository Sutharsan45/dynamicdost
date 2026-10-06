import { Suspense } from "react";
import { filterProducts } from "@/lib/products-data";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductSearch } from "@/components/product/ProductSearch";

interface PageProps {
  searchParams: { type?: string; application?: string; search?: string };
}

export const metadata = {
  title: "Product catalog — All zipper types",
  description:
    "Browse the full catalog of spiral, metal, injected, invisible, recyclable, water-resistant, and fire-retardant zippers with full technical specifications.",
};

export default function ProductsPage({ searchParams }: PageProps) {
  const filtered = filterProducts(searchParams);

  return (
    <div className="container-tight py-10 sm:py-14 lg:py-16">
      {/* Header */}
      <div className="mb-8 sm:mb-10">
        <p className="eyebrow">Product catalog</p>
        <h1 className="h2 mt-2 text-balance">
          Zippers engineered to spec
        </h1>
        <p className="lead mt-3 max-w-2xl text-pretty">
          {filtered.length} product{filtered.length === 1 ? "" : "s"} across
          spiral, metal, invisible, and specialty types. Add items to your RFQ
          for pricing and lead times.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
        {/* Sidebar filters — collapsible on mobile */}
        <Suspense fallback={<div className="w-full lg:w-64 skeleton h-96" />}>
          <ProductFilters />
        </Suspense>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          <div className="mb-5">
            <Suspense fallback={<div className="skeleton h-11 w-full" />}>
              <ProductSearch />
            </Suspense>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-ink-300 py-20 text-center">
              <p className="text-ink-600 font-medium">
                No products match your filters.
              </p>
              <p className="text-sm text-ink-500 mt-1">
                Try removing a filter or searching different keywords.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}