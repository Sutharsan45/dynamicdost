import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ZipperProduct } from "@/types/product";

export function ProductCard({ product }: { product: ZipperProduct }) {
  return (
    <Link
      href={`/products/detail/${product.slug}`}
      className="group card card-hover flex flex-col overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-ink-50 overflow-hidden">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-ink-50 to-ink-100" />
            <div className="relative z-10 h-full grid place-items-center text-center px-6">
              <div>
                <div className="text-5xl sm:text-6xl font-bold tracking-tighter text-ink-300 select-none">
                  {product.specs.gaugeMm}
                  <span className="text-2xl align-top">mm</span>
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-ink-500">
                  {product.type}
                </div>
              </div>
            </div>
          </>
        )}

        {product.featured && (
          <span className="absolute top-3 left-3 z-20 inline-flex items-center rounded-full bg-ink-900 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-ink-500 font-medium">
          <span>{product.type}</span>
          <span className="font-mono text-ink-400">{product.sku}</span>
        </div>

        <h3 className="mt-2 font-semibold text-ink-900 leading-snug group-hover:text-brand-700 transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Specs */}
        <dl className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-xs mt-4">
          <div>
            <dt className="text-ink-400">Gauge</dt>
            <dd className="font-medium text-ink-900 mt-0.5">
              {product.specs.gaugeMm} mm
            </dd>
          </div>
          <div>
            <dt className="text-ink-400">Tensile</dt>
            <dd className="font-medium text-ink-900 mt-0.5">
              {product.specs.tensileStrengthN} N
            </dd>
          </div>
        </dl>

        {/* Certifications */}
        {product.certifications?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.certifications.slice(0, 3).map((c) => (
              <span
                key={c}
                className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-100"
              >
                {c}
              </span>
            ))}
          </div>
        )}

        {/* View details link */}
        {/* <div className="mt-auto pt-5 border-t border-ink-100 mt-5">
          <div className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 group-hover:gap-2.5 transition-all">
            View specs
            <ArrowRight className="h-4 w-4" />
          </div>
        </div> */}
      </div>
    </Link>
  );
}