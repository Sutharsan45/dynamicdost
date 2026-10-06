import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
} from "lucide-react";
import { applicationsData, getApplication } from "@/lib/applications-data";
// import { getAllProducts, type StoredProduct } from "@/lib/product-store";
import { ProductCard } from "@/components/product/ProductCard";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/* ================================
   STATIC GENERATION
   ================================ */
export async function generateStaticParams() {
  return applicationsData.map((a) => ({ slug: a.slug }));
}

/* ================================
   SEO
   ================================ */
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const app = getApplication(slug);
  if (!app) return {};

  return {
    title: `${app.name} Zippers — ${app.tagline}`,
    description: app.description,
    openGraph: {
      title: `${app.name} Zippers | ${BRAND.name}`,
      description: app.description,
      url: `/applications/${app.slug}`,
    },
    alternates: { canonical: `/applications/${app.slug}` },
  };
}

/* ================================
   ACCENT MAP
   ================================ */
const ACCENT = {
  brand: {
    number: "text-brand-500",
    dot: "bg-brand-500",
    chip: "bg-brand-50 text-brand-700 border-brand-100",
    imageBg: "from-brand-100 via-brand-50 to-white",
    ring: "ring-brand-500/20",
  },
  emerald: {
    number: "text-emerald-500",
    dot: "bg-emerald-500",
    chip: "bg-emerald-50 text-emerald-700 border-emerald-100",
    imageBg: "from-emerald-100 via-emerald-50 to-white",
    ring: "ring-emerald-500/20",
  },
  violet: {
    number: "text-violet-500",
    dot: "bg-violet-500",
    chip: "bg-violet-50 text-violet-700 border-violet-100",
    imageBg: "from-violet-100 via-violet-50 to-white",
    ring: "ring-violet-500/20",
  },
  rose: {
    number: "text-rose-500",
    dot: "bg-rose-500",
    chip: "bg-rose-50 text-rose-700 border-rose-100",
    imageBg: "from-rose-100 via-rose-50 to-white",
    ring: "ring-rose-500/20",
  },
  amber: {
    number: "text-amber-500",
    dot: "bg-amber-500",
    chip: "bg-amber-50 text-amber-700 border-amber-100",
    imageBg: "from-amber-100 via-amber-50 to-white",
    ring: "ring-amber-500/20",
  },
  cyan: {
    number: "text-cyan-500",
    dot: "bg-cyan-500",
    chip: "bg-cyan-50 text-cyan-700 border-cyan-100",
    imageBg: "from-cyan-100 via-cyan-50 to-white",
    ring: "ring-cyan-500/20",
  },
  lime: {
    number: "text-lime-600",
    dot: "bg-lime-500",
    chip: "bg-lime-50 text-lime-700 border-lime-100",
    imageBg: "from-lime-100 via-lime-50 to-white",
    ring: "ring-lime-500/20",
  },
} as const;

/* ================================
   PAGE
   ================================ */
export default async function ApplicationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const app = getApplication(slug);
  if (!app) notFound();

  const accent = ACCENT[app.accentColor];

  /* Get all products, filter by application */
  // const allProducts = await getAllProducts();
  // const recommended = allProducts
  //   .filter((p) => p.applications.includes(app.slug as any))
  //   .slice(0, 4);
  let recommended: any[] = [];
  try {
    const res = await apiFetch<{ items: any[] }>("/api/products?pageSize=100");
    recommended = (res.items ?? [])
      .filter((p: any) => p.applications?.includes(app.slug))
      .slice(0, 4);
  } catch {
    recommended = [];
  }

  /* Sibling applications */
  const siblings = applicationsData.filter((a) => a.slug !== app.slug);

  return (
    <>
      {/* HERO */}
      <section className="border-b border-ink-100 bg-ink-50">
        <div className="container-tight py-10 sm:py-14 lg:py-16">
          <Link
            href="/applications"
            className="inline-flex items-center gap-1.5 text-sm text-ink-600 hover:text-ink-900 transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All applications
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "text-4xl sm:text-5xl font-bold tracking-tighter",
                    accent.number
                  )}
                >
                  {app.number}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
                    accent.chip
                  )}
                >
                  {app.name}
                </span>
              </div>

              <h1 className="h1 mt-5 text-balance">{app.tagline}</h1>

              <p className="lead mt-5 text-pretty">{app.longDescription}</p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn btn-primary btn-lg">
                  Contact us <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#recommended" className="btn btn-secondary btn-lg">
                  See recommended zippers
                </a>
              </div>
            </div>

            {/* Image / icon panel */}
            <div
              className={cn(
                "relative aspect-[4/3] rounded-2xl overflow-hidden border border-ink-200 bg-gradient-to-br ring-1",
                accent.imageBg,
                accent.ring
              )}
            >
              <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
              <div className="relative h-full w-full grid place-items-center p-10">
                <div className="text-center">
                  <div className="text-8xl sm:text-9xl mb-4 select-none">
                    {app.icon}
                  </div>
                  <div className="text-sm uppercase tracking-[0.2em] text-ink-500 font-semibold">
                    {app.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section className="section-sm">
        <div className="container-tight">
          <div className="max-w-2xl mb-8">
            <p className="eyebrow">Engineering requirements</p>
            <h2 className="h3 mt-2 text-balance">
              What we design to for {app.name.toLowerCase()}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {app.requirements.map((req) => (
              <div
                key={req.label}
                className="rounded-xl border border-ink-200 bg-white p-5"
              >
                <dt className="text-xs uppercase tracking-wider text-ink-500 font-medium">
                  {req.label}
                </dt>
                <dd className="mt-2 text-lg font-semibold text-ink-900 tracking-tight">
                  {req.value}
                </dd>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-ink-500 font-medium">
              Certified to
            </span>
            {app.certifications.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700"
              >
                <Check className="h-3 w-3" />
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* RECOMMENDED PRODUCTS */}
      <section
        id="recommended"
        className="section-sm bg-ink-50 border-y border-ink-100 scroll-mt-20"
      >
        <div className="container-tight">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="eyebrow">
                Recommended for {app.name.toLowerCase()}
              </p>
              <h2 className="h3 mt-2">Zippers built for this industry</h2>
            </div>
            <Link
              href={`/products?application=${app.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-800"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {recommended.length === 0 ? (
            <div className="rounded-xl border border-dashed border-ink-300 py-16 text-center">
              <p className="text-ink-600">
                No products tagged for this application yet.
              </p>
              <Link
                href="/products"
                className="mt-4 inline-flex items-center gap-1 text-brand-600 text-sm font-medium hover:underline"
              >
                Browse full catalog <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {recommended.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SIBLINGS */}
      <section className="section-sm">
        <div className="container-tight">
          <div className="mb-6">
            <p className="eyebrow">Other industries</p>
            <h2 className="h3 mt-2">Explore more applications</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {siblings.slice(0, 6).map((sib) => {
              const sibAccent = ACCENT[sib.accentColor];
              return (
                <Link
                  key={sib.slug}
                  href={`/applications/${sib.slug}`}
                  className="group flex items-start gap-4 rounded-xl border border-ink-200 bg-white p-5 hover:border-ink-300 hover:shadow-md transition-all"
                >
                  <div className="h-12 w-12 rounded-lg bg-ink-50 grid place-items-center text-2xl shrink-0">
                    {sib.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full shrink-0",
                          sibAccent.dot
                        )}
                      />
                      <span className="font-semibold text-ink-900">
                        {sib.name}
                      </span>
                    </div>
                    <p className="text-sm text-ink-600 mt-1 line-clamp-2">
                      {sib.tagline}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-ink-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" aria-hidden />
        <div className="container-tight relative text-center max-w-3xl">
          <h2 className="h2 text-white text-balance">
            Need a {app.name.toLowerCase()} zipper we don&apos;t stock?
          </h2>
          <p className="mt-4 text-ink-300 text-pretty">
            Send us your technical drawing, tensile target, and volume.{" "}
            {BRAND.name} engineers custom assemblies in 10–15 business days.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="btn btn-lg bg-white text-ink-900 hover:bg-ink-100"
            >
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="btn btn-lg border border-ink-700 text-white hover:bg-ink-800"
            >
              <Download className="h-4 w-4" />
              Download capabilities PDF
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}