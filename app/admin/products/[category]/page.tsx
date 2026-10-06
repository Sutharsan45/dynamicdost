import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getCategory, categories } from "@/lib/categories-data";
import { listProducts, type ComponentType } from "@/lib/product-store";
import { ProductCard } from "@/components/product/ProductCard";
import { CategoryPagination } from "@/components/product/CategoryPagination";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}

/* ================================
   STATIC GENERATION
   ================================ */
export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

/* ================================
   SEO METADATA
   ================================ */
export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};

  return {
    title: `${cat.name} — ${cat.tagline}`,
    description: cat.description,
    alternates: { canonical: `/products/${cat.slug}` },
    openGraph: {
      title: `${cat.name} | Dynamic Dost`,
      description: cat.description,
      url: `/products/${cat.slug}`,
    },
  };
}

/* ================================
   COLOR MAP — all 6 categories
   ================================ */
const COLOR_MAP = {
  brand: {
    dot: "bg-brand-500",
    chipBg: "bg-brand-50",
    chipText: "text-brand-700",
    chipBorder: "border-brand-100",
    iconBg: "bg-brand-50",
    iconText: "text-brand-600",
  },
  emerald: {
    dot: "bg-emerald-500",
    chipBg: "bg-emerald-50",
    chipText: "text-emerald-700",
    chipBorder: "border-emerald-100",
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-600",
  },
  amber: {
    dot: "bg-amber-500",
    chipBg: "bg-amber-50",
    chipText: "text-amber-700",
    chipBorder: "border-amber-100",
    iconBg: "bg-amber-50",
    iconText: "text-amber-600",
  },
  violet: {
    dot: "bg-violet-500",
    chipBg: "bg-violet-50",
    chipText: "text-violet-700",
    chipBorder: "border-violet-100",
    iconBg: "bg-violet-50",
    iconText: "text-violet-600",
  },
  rose: {
    dot: "bg-rose-500",
    chipBg: "bg-rose-50",
    chipText: "text-rose-700",
    chipBorder: "border-rose-100",
    iconBg: "bg-rose-50",
    iconText: "text-rose-600",
  },
  cyan: {
    dot: "bg-cyan-500",
    chipBg: "bg-cyan-50",
    chipText: "text-cyan-700",
    chipBorder: "border-cyan-100",
    iconBg: "bg-cyan-50",
    iconText: "text-cyan-600",
  },
} as const;

type ColorKey = keyof typeof COLOR_MAP;

/* ================================
   PAGE
   ================================ */
export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category } = await params;
  const { page: pageParam, search = "" } = await searchParams;
  const cat = getCategory(category);

  if (!cat) notFound();

  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const PAGE_SIZE = 9;

  const result = await listProducts({
    category: cat.slug as ComponentType,
    search,
    page,
    pageSize: PAGE_SIZE,
  });

  const color = COLOR_MAP[(cat.color as ColorKey) ?? "brand"] ?? COLOR_MAP.brand;

  return (
    <>
      {/* =========================================
          HERO
      ========================================= */}
      <section className="border-b border-ink-100 bg-ink-50">
        <div className="container-tight py-10 sm:py-14 lg:py-16">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-ink-500 mb-6 flex-wrap"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 hover:text-ink-900 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All products
            </Link>
            <span className="text-ink-300">/</span>
            <span className="text-ink-900 font-medium">{cat.name}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Left: title + description + CTAs */}
            <div className="lg:col-span-2">
              <div
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium",
                  color.chipBg,
                  color.chipText,
                  color.chipBorder
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", color.dot)} />
                {cat.name}
              </div>

              <h1 className="h2 mt-4 text-balance">{cat.tagline}</h1>
              <p className="lead mt-4 text-pretty max-w-2xl">
                {cat.description}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn btn-primary btn-lg">
                  Contact us <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/products" className="btn btn-secondary btn-lg">
                  Browse all products
                </Link>
              </div>
            </div>

            {/* Right: category icon + stats */}
            <div className="rounded-xl border border-ink-200 bg-white p-6 space-y-5">
              <div
                className={cn(
                  "h-14 w-14 rounded-xl grid place-items-center text-2xl",
                  color.iconBg
                )}
              >
                <span aria-hidden>{cat.icon}</span>
              </div>

              <dl className="space-y-4">
                {cat.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-xs text-ink-500 uppercase tracking-wider font-medium">
                      {stat.label}
                    </dt>
                    <dd className="mt-1.5 text-xl font-semibold text-ink-900 tracking-tight">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          PRODUCTS GRID
      ========================================= */}
      <section className="section-sm">
        <div className="container-tight">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <p className="eyebrow">Available variants</p>
              <h2 className="h3 mt-2">
                {result.total} {result.total === 1 ? "product" : "products"}
                {search && (
                  <span className="text-ink-500 font-normal ml-2">
                    for &ldquo;{search}&rdquo;
                  </span>
                )}
              </h2>
              {result.total > 0 && (
                <p className="text-xs text-ink-500 mt-1">
                  Page {result.page} of {result.totalPages}
                </p>
              )}
            </div>
            <Link
              href="/contact"
              className="btn btn-primary btn-md hidden sm:inline-flex"
            >
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {result.items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-ink-300 py-20 text-center">
              <div
                className={cn(
                  "mx-auto h-14 w-14 rounded-full grid place-items-center mb-4",
                  color.iconBg
                )}
              >
                <span className="text-2xl">{cat.icon}</span>
              </div>
              <p className="text-ink-600 font-medium">
                No products in this category yet.
              </p>
              <p className="text-sm text-ink-500 mt-1 max-w-md mx-auto">
                New variants are added regularly. Contact us for custom
                requirements or to request a sample.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-1 text-brand-600 text-sm font-medium hover:underline"
              >
                Contact sales <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                {result.items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <CategoryPagination
                category={cat.slug}
                currentPage={result.page}
                totalPages={result.totalPages}
                search={search}
              />
            </>
          )}

          {/* Mobile CTA */}
          <div className="mt-8 sm:hidden">
            <Link href="/contact" className="btn btn-primary btn-lg w-full">
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
          SIBLING CATEGORIES — filtered by same group
      ========================================= */}
      <section className="section-sm bg-ink-50 border-t border-ink-100">
        <div className="container-tight">
          <h3 className="text-sm font-semibold text-ink-900 mb-5">
            {cat.group === "zipper"
              ? "Explore other zipper components"
              : "Explore other accessories"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {categories
              .filter((c) => c.slug !== cat.slug && c.group === cat.group)
              .map((other) => {
                const otherColor =
                  COLOR_MAP[(other.color as ColorKey) ?? "brand"] ??
                  COLOR_MAP.brand;

                return (
                  <Link
                    key={other.slug}
                    href={`/products/${other.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-ink-200 bg-white p-5 sm:p-6 hover:border-ink-300 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        className={cn(
                          "h-12 w-12 rounded-lg grid place-items-center text-2xl shrink-0",
                          otherColor.iconBg
                        )}
                      >
                        <span aria-hidden>{other.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full shrink-0",
                              otherColor.dot
                            )}
                          />
                          <span className="font-semibold text-ink-900 truncate">
                            {other.name}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-ink-500 mt-1 line-clamp-2">
                          {other.tagline}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-ink-400 group-hover:text-brand-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}