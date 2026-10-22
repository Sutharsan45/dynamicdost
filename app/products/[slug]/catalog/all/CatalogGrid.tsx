'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  Download,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Globe,
  MapPin,
} from 'lucide-react';
import { apiUrl } from '@/lib/api';

const PER_PAGE = 9;

const COMPANY = {
  name: 'Dynamic Dost Group of Companies',
  shortName: 'Dynamic Dost',
  address:
    '18-A, Dynamic House, Asher Nagar, 3rd Street, Gandhi Nagar, Tiruppur — 641 603, Tamil Nadu, India',
  phone: '+91 98432 40123',
  email: 'sales@dynamicdost.com',
  website: 'dynamicdost.com',
  certification: 'ISO 9001 Certified',
  logoUrl: '/logo.png',
};

interface Props {
  categoryName: string;
  categorySlug: string;
  categoryDescription: string;
  stats: { label: string; value: string }[];
  products: any[];
}

export function CatalogGrid({ categoryName, categorySlug, products }: Props) {
  const [page, setPage] = useState(1);

  // Inject print styles into <head> dynamically so they override everything
  useEffect(() => {
    const styleId = 'catalog-print-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      @media print {
        /* Hide EVERYTHING on the page by default */
        body * {
          visibility: hidden !important;
        }
        
        /* Only show the print catalog */
        .catalog-print-only,
        .catalog-print-only * {
          visibility: visible !important;
        }
        
        /* Reset body background */
        body {
          background: white !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* Position the print catalog at top-left */
        .catalog-print-only {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          display: block !important;
          visibility: visible !important;
        }
        
        /* Each A4 page */
        .catalog-print-page {
          width: 210mm;
          height: 297mm;
          padding: 10mm;
          box-sizing: border-box;
          page-break-after: always;
          break-after: page;
          page-break-inside: avoid;
          break-inside: avoid;
          background: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }
        
        .catalog-print-page:last-child {
          page-break-after: auto;
          break-after: auto;
        }
        
        .product-image-main {
          height: 65mm !important;
        }
        
        @page {
          size: A4 portrait;
          margin: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  // 1. FLATTEN
  const flattenedProducts = useMemo(() => {
    const items: any[] = [];
    products.forEach((product) => {
      const images = (product.images ?? []).map((img: any) =>
        typeof img === 'string'
          ? { url: apiUrl(img), alt: product.name }
          : { url: apiUrl(img.url), alt: img.alt || product.name }
      );

      if (images.length === 0) {
        items.push({ ...product, displayImage: null, uniqueKey: `${product.id}-no-img` });
      } else {
        images.forEach((img: any, index: any) => {
          items.push({
            ...product,
            displayImage: img,
            uniqueKey: `${product.id}-${index}`,
          });
        });
      }
    });
    return items;
  }, [products]);

  const totalPages = Math.ceil(flattenedProducts.length / PER_PAGE);

  // 2. CHUNK
  const chunks = useMemo(() => {
    const out: any[][] = [];
    for (let i = 0; i < flattenedProducts.length; i += PER_PAGE) {
      out.push(flattenedProducts.slice(i, i + PER_PAGE));
    }
    return out;
  }, [flattenedProducts]);

  return (
    <>
      {/* Sticky action bar (No Print) */}
      <div className="no-print sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-ink-200">
        <div className="max-w-[21cm] mx-auto px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
          <Link
            href={`/products/${categorySlug}`}
            className="inline-flex items-center gap-1.5 text-sm text-ink-600 hover:text-ink-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {categoryName}
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs text-ink-500 hidden sm:inline">
              {flattenedProducts.length} variants · {totalPages}{' '}
              {totalPages === 1 ? 'page' : 'pages'}
            </span>
            <button
              onClick={() => window.print()}
              className="btn btn-primary btn-md"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* SCREEN PREVIEW (No Print) */}
      <div className="no-print bg-ink-100 py-6">
        <div className="max-w-[21cm] mx-auto">
          <div className="bg-white shadow-lg p-4 sm:p-6 w-full">
            <CatalogPage
              products={chunks[page - 1] ?? []}
              pageNumber={page}
              totalPages={totalPages}
              categoryName={categoryName}
              isPrint={false}
            />
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 py-5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn btn-secondary btn-sm disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" /> Prev
              </button>
              <span className="text-sm text-ink-600">
                Page {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="btn btn-secondary btn-sm disabled:opacity-40"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* PRINT ONLY (Hidden on screen, shown on print) */}
      <div className="catalog-print-only hidden">
        {chunks.map((chunk, i) => (
          <div key={i} className="catalog-print-page">
            <CatalogPage
              products={chunk}
              pageNumber={i + 1}
              totalPages={totalPages}
              categoryName={categoryName}
              isPrint={true}
            />
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================
   Catalog Page
   ========================================= */
function CatalogPage({
  products,
  pageNumber,
  totalPages,
  categoryName,
  isPrint = false,
}: {
  products: any[];
  pageNumber: number;
  totalPages: number;
  categoryName: string;
  isPrint?: boolean;
}) {
  return (
    <div className={`w-full flex flex-col justify-between ${isPrint ? 'h-full' : 'min-h-[280mm]'}`}>
      
      {/* HEADER */}
      <div className="shrink-0">
        <header className="border-b-2 border-ink-900 pb-2 mb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-2.5 min-w-0">
              {/* Logo - use unoptimized to ensure it renders in print */}
              <div className="shrink-0 w-12 h-12 rounded-md overflow-hidden bg-ink-900 grid place-items-center">
                <img
                  src={COMPANY.logoUrl}
                  alt={COMPANY.shortName}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-ink-900 leading-tight">
                  {COMPANY.name}
                </div>
                <div className="text-[9.5px] text-ink-500 leading-snug mt-0.5">
                  {COMPANY.address}
                </div>
              </div>
            </div>

            <div className="text-right shrink-0 text-[9.5px] text-ink-700 leading-snug">
              <div className="flex items-center gap-1 justify-end">
                <Phone className="h-2.5 w-2.5" />
                <span className="font-mono">{COMPANY.phone}</span>
              </div>
              <div className="flex items-center gap-1 justify-end mt-0.5">
                <Mail className="h-2.5 w-2.5" />
                <span>{COMPANY.email}</span>
              </div>
              <div className="flex items-center gap-1 justify-end mt-0.5">
                <Globe className="h-2.5 w-2.5" />
                <span>{COMPANY.website}</span>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between mt-2">
            <div>
              <h1 className="text-base font-bold text-ink-900 leading-tight">
                {categoryName}
              </h1>
            </div>
            <div className="text-[9px] text-ink-500 font-mono">
              Page {pageNumber} / {totalPages}
            </div>
          </div>
        </header>
      </div>

      {/* GRID */}
      <div className="flex-1">
        <div className="grid grid-cols-3 gap-3 print:gap-2">
          {products.map((p) => (
            <ProductTile key={p.uniqueKey} product={p} />
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="shrink-0 mt-2">
        <footer className="pt-2 border-t border-ink-200 flex items-center justify-between text-[8.5px] text-ink-500">
          <div className="flex items-center gap-1">
            <MapPin className="h-2.5 w-2.5" />
            <span>Tiruppur, Tamil Nadu, India</span>
          </div>
          <div>
            © {new Date().getFullYear()} {COMPANY.shortName} ·{' '}
            {COMPANY.certification}
          </div>
        </footer>
      </div>

    </div>
  );
}

/* =========================================
   Product tile
   ========================================= */
function ProductTile({ product }: { product: any }) {
  const image = product.displayImage;

  return (
    <div className="product-card rounded-lg border border-ink-200 bg-white overflow-hidden flex flex-col">
      <div className="relative w-full aspect-square print:aspect-auto product-image-main bg-ink-50 shrink-0 p-1.5">
        {image ? (
          // CRITICAL: Use <img> tag instead of Next.js Image for guaranteed print rendering
          <img
            src={image.url}
            alt={image.alt}
            className="absolute inset-0 w-full h-full object-contain"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-ink-300 text-lg font-bold">
            {product.specs?.gaugeMm ?? '—'}mm
          </div>
        )}
      </div>

      <div className="px-2 py-1.5 flex flex-col flex-1 justify-between border-t border-ink-100">
        <h3 className="text-[11px] font-semibold text-ink-900 leading-snug line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between text-[9.5px] text-ink-500 mt-1">
          <span className="font-mono truncate">{product.sku}</span>
          <span className="font-semibold text-ink-700">
            {product.specs?.gaugeMm ?? '—'} mm
          </span>
        </div>
      </div>
    </div>
  );
}