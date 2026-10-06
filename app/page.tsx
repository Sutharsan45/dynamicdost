import Link from "next/link";
import {
  ArrowRight,
  Award,
  ShieldCheck,
  Globe2,
  Zap,
  Factory,
  Truck,
  Package,
  FileText,
  Layers,
  Settings2,
  Scissors,
} from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { LegacyCounter } from "@/components/home/LegacyCounter";
import { ZipperMarquee } from "@/components/home/ZipperMarquee";
import { CategoryBannerCarousel } from "@/components/home/CategoryBannerCarousel";
import { AutoScrollShowcase } from "@/components/home/AutoScrollShowcase";
import { applicationsData } from "@/lib/applications-data";
import { apiFetch } from "@/lib/api";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let featured: any[] = [];
  try {
    const res = await apiFetch<{ items: any[] }>("/api/products/featured");
    featured = res.items ?? [];
  } catch (err) {
    console.error("Failed to fetch featured products:", err);
    featured = [];
  }

  /* Fallback: if no featured, show latest 3 */
  if (featured.length === 0) {
    try {
      const res = await apiFetch<{ items: any[] }>(
        "/api/products?pageSize=3"
      );
      featured = res.items ?? [];
    } catch {
      featured = [];
    }
  }

  return (
    <>
      {/* =========================================
          1. HERO CAROUSEL
          Slide 1 = hero image (no text)
          Slides 2–5 = category banners (with text overlay)
      ========================================= */}
      <section className="relative w-full bg-white">
        <div className="container-tight pt-4 sm:pt-6 lg:pt-8">
          <CategoryBannerCarousel />
        </div>
      </section>

      {/* =========================================
          2. LEGACY STRIP — live counters
      ========================================= */}
      <section className="border-y border-ink-100 bg-ink-950 text-white relative overflow-hidden mt-12 sm:mt-16">
        <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden />
        <div className="container-tight py-12 sm:py-16 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                end: 40,
                suffix: "+",
                label: "Years in business",
                sub: "Since 1985",
              },
              {
                end: 1200,
                suffix: "+",
                label: "SKUs in catalog",
                sub: "Ready to ship",
              },
              {
                end: 42,
                suffix: "",
                label: "Countries served",
                sub: "6 continents",
              },
              {
                end: 99.4,
                suffix: "%",
                decimals: 1,
                label: "QC pass rate",
                sub: "Batch-tested",
              },
            ].map((stat, i) => (
              <div key={stat.label} className="relative">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tighter text-white">
                  <LegacyCounter
                    end={stat.end}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                  />
                </div>
                <div className="mt-3 text-sm font-medium text-white">
                  {stat.label}
                </div>
                <div className="text-xs text-ink-400 mt-0.5">{stat.sub}</div>
                {i < 3 && (
                  <div className="hidden lg:block absolute -right-6 top-0 bottom-0 w-px bg-ink-800" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          3. COMPONENT SHOWCASE
      ========================================= */}
      <section className="section">
        <div className="container-tight">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow">Anatomy of a zipper</p>
            <h2 className="h2 mt-2 text-balance">
              Three components. Infinite configurations.
            </h2>
            <p className="lead mt-4 text-pretty">
              Every zipper is built from tape, slider, and teeth — and each one
              can be specified to your exact requirement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <ComponentCard
              href="/products/tape"
              icon={Layers}
              title="Tape"
              subtitle="Fabrics & carriers"
              description="Polyester, cotton, TPU, rPET, and aramid tapes in 24+ colors."
              stats={[
                { k: "24+", v: "Colors" },
                { k: "6", v: "Materials" },
              ]}
              accent="brand"
            />
            <ComponentCard
              href="/products/slider"
              icon={Settings2}
              title="Slider"
              subtitle="Bodies & pulls"
              description="Auto-lock, semi-lock, pin-lock, water-seal bodies in zinc, brass, steel."
              stats={[
                { k: "5", v: "Lock types" },
                { k: "1M+", v: "Cycles" },
              ]}
              accent="emerald"
            />
            <ComponentCard
              href="/products/teeth"
              icon={Scissors}
              title="Teeth"
              subtitle="Coil, metal, injected"
              description="Gauges from 3mm to 10mm. Tested for tensile and fatigue."
              stats={[
                { k: "3–10", v: "mm gauge" },
                { k: "980N", v: "Max tensile" },
              ]}
              accent="amber"
            />
          </div>
        </div>
      </section>

      {/* =========================================
          4. AUTO-SCROLL SHOWCASE
      ========================================= */}
      <AutoScrollShowcase />

      {/* =========================================
          5. FEATURED PRODUCTS
      ========================================= */}
      <section className="section bg-ink-50 border-y border-ink-100">
        <div className="container-tight">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow">Featured</p>
              <h2 className="h2 mt-2 text-balance">
                Zippers engineered for demanding applications
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-800 shrink-0"
            >
              View all products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {featured.length === 0 ? (
            <div className="rounded-xl border border-dashed border-ink-300 py-16 text-center">
              <p className="text-ink-600 font-medium">
                No products yet.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {featured.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================================
          6. APPLICATIONS GRID
      ========================================= */}
      <section className="section">
        <div className="container-tight">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow">Applications</p>
            <h2 className="h2 mt-2 text-balance">
              Built for the industries we serve
            </h2>
            <p className="lead mt-4 text-pretty">
              Seven industries. Seven different engineering targets. We design
              to spec, every time.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {applicationsData.map((app) => (
              <Link
                key={app.slug}
                href={`/applications/${app.slug}`}
                className="group relative aspect-square rounded-2xl border border-ink-200 bg-white p-5 overflow-hidden hover:border-ink-300 hover:shadow-xl hover:shadow-ink-900/5 transition-all duration-300"
              >
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    app.accentColor === "brand" &&
                      "bg-gradient-to-br from-brand-50 to-white",
                    app.accentColor === "emerald" &&
                      "bg-gradient-to-br from-emerald-50 to-white",
                    app.accentColor === "violet" &&
                      "bg-gradient-to-br from-violet-50 to-white",
                    app.accentColor === "rose" &&
                      "bg-gradient-to-br from-rose-50 to-white",
                    app.accentColor === "amber" &&
                      "bg-gradient-to-br from-amber-50 to-white",
                    app.accentColor === "cyan" &&
                      "bg-gradient-to-br from-cyan-50 to-white",
                    app.accentColor === "lime" &&
                      "bg-gradient-to-br from-lime-50 to-white"
                  )}
                  aria-hidden
                />

                <div className="relative flex flex-col h-full">
                  <div className="text-3xl sm:text-4xl mb-3">{app.icon}</div>
                  <h3 className="font-semibold text-ink-900 text-sm sm:text-base">
                    {app.name}
                  </h3>
                  <p className="text-xs text-ink-500 mt-1 line-clamp-2">
                    {app.tagline}
                  </p>
                  <div className="mt-auto pt-3 flex items-center gap-1 text-[11px] font-semibold text-brand-700">
                    Explore
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          7. WHY DYNAMIC DOST
      ========================================= */}
      <section className="section bg-ink-50 border-y border-ink-100">
        <div className="container-tight">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow">Why {BRAND.name}</p>
            <h2 className="h2 mt-2 text-balance">
              Four decades of trust, distilled
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Award,
                title: "Certified quality",
                desc: "ISO 9001, IATF 16949, OEKO-TEX 100, and Bluesign certified manufacturing.",
              },
              {
                icon: Zap,
                title: "Tested durability",
                desc: "Every batch validated to 1M+ cycles, 10,000mm hydrostatic, and 500h salt-spray.",
              },
              {
                icon: Globe2,
                title: "Global supply chain",
                desc: "40+ countries served via Tuticorin, Chennai, and Coimbatore logistics hubs.",
              },
              {
                icon: Factory,
                title: "40+ production lines",
                desc: "In-house tape weaving, coil forming, slider casting, and automated QC.",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-ink-200 bg-white p-6"
              >
                <div className="h-11 w-11 rounded-xl bg-brand-50 grid place-items-center mb-4">
                  <pillar.icon className="h-5 w-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-ink-900">{pillar.title}</h3>
                <p className="text-sm text-ink-600 mt-2 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          8. CERTIFICATION MARQUEE
      ========================================= */}
      <ZipperMarquee />

      {/* =========================================
          9. PROCESS TIMELINE
      ========================================= */}
      <section className="section">
        <div className="container-tight">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow">How we work</p>
            <h2 className="h2 mt-2 text-balance">
              From inquiry to delivery in four steps
            </h2>
          </div>

          <div className="relative">
            <div
              className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-300 to-transparent"
              aria-hidden
            />

            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  step: "01",
                  icon: FileText,
                  title: "Inquiry & quote",
                  desc: "Send your spec. Get a detailed quote in 24 hours.",
                },
                {
                  step: "02",
                  icon: Package,
                  title: "Sample approval",
                  desc: "Up to 5 free samples delivered in 5–7 days.",
                },
                {
                  step: "03",
                  icon: Factory,
                  title: "Production",
                  desc: "Batch manufacturing with QC checkpoints at every stage.",
                },
                {
                  step: "04",
                  icon: Truck,
                  title: "Delivery",
                  desc: "Shipped via your preferred carrier. POD auto-emailed.",
                },
              ].map((item) => (
                <li key={item.step} className="relative">
                  <div className="rounded-2xl border border-ink-200 bg-white p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-11 w-11 rounded-xl bg-ink-900 grid place-items-center relative z-10">
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-3xl font-bold tracking-tighter text-ink-200">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="font-semibold text-ink-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-ink-600 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* =========================================
          10. TESTIMONIAL
      ========================================= */}
      <section className="section bg-ink-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden />
        <div className="container-tight relative max-w-4xl text-center">
          <div className="inline-flex h-14 w-14 rounded-2xl bg-brand-500/20 border border-brand-500/30 items-center justify-center mb-8">
            <ShieldCheck className="h-7 w-7 text-brand-400" />
          </div>
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-snug text-balance">
            &ldquo;We&apos;ve been sourcing zippers from {BRAND.name} for over a
            decade. Their consistency on tensile strength and color matching is
            unmatched — and their team responds like partners, not
            suppliers.&rdquo;
          </blockquote>
          <div className="mt-8 text-sm text-ink-400">
            <div className="font-medium text-white">Sourcing Director</div>
            <div>Global Apparel Brand · EU</div>
          </div>
        </div>
      </section>

      {/* =========================================
          11. FINAL CTA
      ========================================= */}
      <section className="section">
        <div className="container-tight">
          <div className="relative rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-ink-900 overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-10" aria-hidden />
            <div
              className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"
              aria-hidden
            />

            <div className="relative px-6 sm:px-10 lg:px-20 py-14 sm:py-20 text-center max-w-4xl mx-auto">
              <h2 className="h2 text-white text-balance">
                Ready to spec your next production run?
              </h2>
              <p className="mt-4 text-brand-100 text-pretty max-w-2xl mx-auto">
                Send us your technical requirements. Our engineering team
                responds within 4 business hours with samples, pricing, and
                lead times.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="btn btn-lg bg-white text-ink-900 hover:bg-ink-100"
                >
                  Contact us <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/products"
                  className="btn btn-lg border border-white/30 text-white hover:bg-white/10"
                >
                  Browse products
                </Link>
              </div>

              <div className="mt-10 pt-8 border-t border-white/15 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-brand-100">
                <span>✓ ISO 9001 certified</span>
                <span>✓ IATF 16949 automotive</span>
                <span>✓ OEKO-TEX 100 safe</span>
                <span>✓ 40+ years manufacturing</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================
   Component Card
   ========================================= */
function ComponentCard({
  href,
  icon: Icon,
  title,
  subtitle,
  description,
  stats,
  accent,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  stats: { k: string; v: string }[];
  accent: "brand" | "emerald" | "amber";
}) {
  const accentMap = {
    brand: {
      bg: "bg-brand-50",
      text: "text-brand-600",
      ring: "group-hover:ring-brand-200",
      stat: "text-brand-700",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      ring: "group-hover:ring-emerald-200",
      stat: "text-emerald-700",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      ring: "group-hover:ring-amber-200",
      stat: "text-amber-700",
    },
  }[accent];

  return (
    <Link
      href={href}
      className={cn(
        "group relative rounded-2xl border border-ink-200 bg-white p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ink-900/10 ring-1 ring-transparent",
        accentMap.ring
      )}
    >
      <div
        className={cn(
          "h-14 w-14 rounded-2xl grid place-items-center mb-5",
          accentMap.bg
        )}
      >
        <Icon className={cn("h-6 w-6", accentMap.text)} />
      </div>

      <h3 className="text-xl font-semibold text-ink-900">{title}</h3>
      <p className="text-xs uppercase tracking-wider text-ink-500 mt-1 font-medium">
        {subtitle}
      </p>
      <p className="text-sm text-ink-600 mt-4 leading-relaxed">
        {description}
      </p>

      <dl className="mt-6 pt-6 border-t border-ink-100 grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.v}>
            <dt className="text-xs text-ink-500">{stat.v}</dt>
            <dd className={cn("mt-1 text-lg font-semibold", accentMap.stat)}>
              {stat.k}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 group-hover:gap-2.5 transition-all">
        Browse {title.toLowerCase()} variants
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}