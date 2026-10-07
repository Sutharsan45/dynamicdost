import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  FileText,
  Package,
  Clock,
  Ruler,
  Gauge,
} from "lucide-react";
import { SpecTable } from "@/components/product/SpecTable";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ProductGallery } from "@/components/product/ProductGallery";
import { apiFetch, apiUrl } from "@/lib/api";
import { formatNumber, titleCase } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/* ================================
   SEO METADATA
   ================================ */
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const product = await apiFetch<any>(`/api/products/${slug}`);
    return {
      title: `${product.name} — Specs, MOQ, Lead Time`,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        url: `/products/detail/${product.slug}`,
        type: "website",
        images:
          product.images?.[0] ? [{ url: apiUrl(product.images[0]) }] : [],
      },
      alternates: {
        canonical: `/products/detail/${product.slug}`,
      },
    };
  } catch {
    return {};
  }
}

/* ================================
   PAGE
   ================================ */
export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let product: any = null;
  try {
    product = await apiFetch(`/api/products/${slug}`);
  } catch {
    notFound();
  }

  /* Schema.org structured data */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.description,
    category: `${product.type} zipper`,
    material: product.material,
    image: product.images?.[0] ? apiUrl(product.images[0]) : undefined,
    brand: {
      "@type": "Brand",
      name: "Dynamic Dost",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: 0,
        description: `MOQ ${product.specs.minOrderQty} pcs`,
      },
      seller: {
        "@type": "Organization",
        name: "Dynamic Dost",
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Gauge",
        value: `${product.specs.gaugeMm} mm`,
      },
      {
        "@type": "PropertyValue",
        name: "Tensile Strength",
        value: `${product.specs.tensileStrengthN} N`,
      },
      {
        "@type": "PropertyValue",
        name: "Lead Time",
        value: `${product.specs.leadTimeDays} days`,
      },
    ],
  };

  const hasImages = product.images && product.images.length > 0;
  const primaryImage = hasImages ? apiUrl(product.images[0]) : null;
  const galleryImages: string[] = hasImages
    ? product.images.slice(0, 5).map((img: string) => apiUrl(img))
    : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-tight py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-ink-500 mb-6 flex-wrap"
        >
          <Link
            href="/products"
            className="hover:text-ink-900 transition-colors"
          >
            Products
          </Link>
          <span className="text-ink-300">/</span>
          <Link
            href={`/products/${product.componentType}`}
            className="hover:text-ink-900 transition-colors capitalize"
          >
            {product.componentType}
          </Link>
          <span className="text-ink-300">/</span>
          <span className="text-ink-900 font-medium truncate max-w-[200px]">
            {product.shortName || product.name}
          </span>
        </nav>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* -------- Image panel -------- */}
          {/* -------- Image panel -------- */}
          <div className="lg:sticky lg:top-24">
            <ProductGallery
              images={product.images ?? []}
              name={product.name}
              featured={product.featured}
              componentType={product.componentType}
              gaugeMm={product.specs.gaugeMm}
              type={product.type}
            />

            {/* Trust markers */}
            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { icon: Package, label: "Bulk ready" },
                { icon: Clock, label: "Sample in 5d" },
                { icon: FileText, label: "Full spec sheet" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="rounded-lg border border-ink-200 bg-white p-3 text-center"
                >
                  <Icon className="h-4 w-4 text-ink-400 mx-auto" />
                  <div className="mt-1.5 text-[11px] text-ink-600 font-medium leading-tight">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* -------- Info panel -------- */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="uppercase tracking-wider text-ink-500 font-medium">
                {titleCase(product.type)}
              </span>
              <span className="text-ink-300">·</span>
              <span className="font-mono text-ink-500">{product.sku}</span>
            </div>

            <h1 className="h3 mt-3 text-balance">{product.name}</h1>

            <p className="mt-5 text-ink-600 leading-relaxed text-pretty">
              {product.description}
            </p>

            {/* Highlights */}
            {product.highlights && product.highlights.length > 0 && (
              <ul className="mt-6 space-y-2.5">
                {product.highlights.map((h: string) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-sm text-ink-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-wider text-ink-500 mb-2.5 font-medium">
                  Certifications
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {product.certifications.map((c: string) => (
                    <span
                      key={c}
                      className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[11px] font-medium text-emerald-700"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick specs */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
              <QuickSpec
                icon={Gauge}
                label="Gauge"
                value={`${product.specs.gaugeMm} mm`}
              />
              <QuickSpec
                icon={Ruler}
                label="Tensile strength"
                value={`${product.specs.tensileStrengthN} N`}
              />
              <QuickSpec
                icon={Package}
                label="MOQ"
                value={`${formatNumber(product.specs.minOrderQty)} pcs`}
              />
              <QuickSpec
                icon={Clock}
                label="Lead time"
                value={`${product.specs.leadTimeDays} days`}
              />
            </div>

            {/* Applications */}
            {product.applications && product.applications.length > 0 && (
              <div className="mt-8">
                <p className="text-xs uppercase tracking-wider text-ink-500 mb-2.5 font-medium">
                  Applications
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {product.applications.map((app: string) => (
                    <Link
                      key={app}
                      href={`/applications/${app}`}
                      className="inline-flex items-center rounded-md border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 hover:border-ink-400 hover:bg-ink-50 transition-colors"
                    >
                      {titleCase(app)}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 pt-8 border-t border-ink-100">
              <p className="text-xs uppercase tracking-wider text-ink-500 mb-3 font-medium">
                Get in touch
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="btn btn-primary btn-lg flex-1"
                >
                  Contact us for pricing
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {product.specSheetUrl && (
                  <a
                    href={product.specSheetUrl}
                    download
                    className="btn btn-secondary btn-lg flex-1"
                  >
                    <Download className="h-4 w-4" />
                    Spec sheet
                  </a>
                )}
              </div>
              <p className="mt-3 text-xs text-ink-500">
                Our engineering team responds within 4 business hours.
              </p>
            </div>
          </div>
        </div>

        {/* FULL SPEC TABLE */}
        <section className="mt-16 sm:mt-20">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-ink-400" />
            <h2 className="h3">Technical specifications</h2>
          </div>
          <SpecTable product={product} />
        </section>

        {/* RELATED */}
        <RelatedProducts product={product} />
      </div>
    </>
  );
}

/* ================================
   QUICK SPEC CARD
   ================================ */
function QuickSpec({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-ink-200 bg-ink-50 p-4">
      <div className="flex items-center gap-1.5 text-ink-500">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <div className="mt-2 text-lg font-semibold text-ink-900 tracking-tight">
        {value}
      </div>
    </div>
  );
}