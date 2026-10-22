'use client';

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch, apiUrl } from "@/lib/api";
import { formatNumber, titleCase } from "@/lib/utils";
import { Download, ArrowLeft } from "lucide-react";
import { createRoot } from "react-dom/client";

const COMPANY = {
  name: 'Dynamic Dost Group of Companies',
  shortName: 'Dynamic Dost',
  address: '18-A, Dynamic House, Asher Nagar, 3rd Street, Gandhi Nagar, Tiruppur — 641 603, Tamil Nadu, India',
  phone: '+91 98432 40123',
  email: 'sales@dynamicdost.com',
  website: 'dynamicdost.com',
  certification: 'ISO 9001 Certified',
  logoUrl: '/logo.png',
};

export default function CatalogPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await apiFetch<any>(`/api/products/${slug}`);
        setProduct(data);
      } catch {
        notFound();
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  const handlePrint = () => {
    if (!product) return;

    // Create a hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    // Write Tailwind + print styles into the iframe
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Catalog - ${product.name}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page { size: A4 portrait; margin: 0; }
            body { background: white !important; margin: 0; padding: 0; }
            
            .catalog-print-page {
              width: 210mm;
              height: 297mm;
              padding: 10mm;
              box-sizing: border-box;
              page-break-after: avoid;
              break-after: avoid;
              page-break-inside: avoid;
              break-inside: avoid;
              background: white;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              overflow: hidden;
            }

            .print-image-main { height: 110mm !important; }
            .print-image-sub { height: 25mm !important; }
          </style>
        </head>
        <body>
          <div id="print-root"></div>
        </body>
      </html>
    `);
    doc.close();

    // Render React into iframe
    const root = createRoot(doc.getElementById('print-root')!);
    
    // Normalize images for the print component
    const images = (product.images ?? []).map((img: any) => {
      if (typeof img === "string") return { url: apiUrl(img), alt: product.name };
      return { url: apiUrl(img.url), alt: img.alt || product.name };
    });
    const primaryImage = images[0];
    const subImages = images.slice(1);

    root.render(
      <div className="catalog-print-page">
        <CatalogLayout 
            product={product} 
            primaryImage={primaryImage} 
            subImages={subImages} 
            isPrint={true} 
        />
      </div>
    );

    // 3. PRE-LOAD all images before printing
    const imageUrls = images.map((img: any) => img.url);
    if (COMPANY.logoUrl) imageUrls.push(COMPANY.logoUrl);

    const preloadImages = imageUrls.map((url: string) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = resolve; // don't block if an image fails
      });
    });

    // 4. Wait for React to render, Tailwind CDN to load, AND images to download
    setTimeout(() => {
      Promise.all(preloadImages).then(() => {
        // Add a small extra delay for the iframe to paint
        setTimeout(() => {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
          
          // Cleanup iframe after printing
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 1000);
        }, 500); 
      });
    }, 1500); // 1.5s to let Tailwind CDN and React render
  };

  if (loading) return <div className="p-10 text-center">Loading catalog...</div>;
  if (!product) return notFound();

  const images = (product.images ?? []).map((img: any) => {
    if (typeof img === "string") return { url: apiUrl(img), alt: product.name };
    return { url: apiUrl(img.url), alt: img.alt || product.name };
  });

  const primaryImage = images[0];
  const subImages = images.slice(1);

  return (
    <>
      <div className="no-print">
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-ink-200">
          <div className="max-w-[21cm] mx-auto px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
            <Link
              href={`/products`}
              className="inline-flex items-center gap-1.5 text-sm text-ink-600 hover:text-ink-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>

            <button
              onClick={handlePrint}
              className="btn btn-primary btn-md"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="min-h-screen bg-ink-100 py-8">
          <div className="max-w-[21cm] mx-auto bg-white shadow-lg p-6 sm:p-10">
            <CatalogLayout 
                product={product} 
                primaryImage={primaryImage} 
                subImages={subImages} 
                isPrint={false} 
            />
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================
   Shared Layout Component
   ========================================= */
function CatalogLayout({ product, primaryImage, subImages, isPrint }: any) {
  return (
    <div className={`w-full flex flex-col justify-between ${isPrint ? 'h-full' : 'min-h-[270mm]'}`}>
      
      {/* HEADER */}
      <div className="shrink-0">
        <header className="border-b-2 border-ink-900 pb-2 mb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="shrink-0 w-12 h-12 rounded-md overflow-hidden bg-ink-900 grid place-items-center">
                <img
                  src={COMPANY.logoUrl}
                  alt={COMPANY.shortName}
                  className="object-contain w-full h-full"
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
                <span className="font-mono">{COMPANY.phone}</span>
              </div>
              <div className="flex items-center gap-1 justify-end mt-0.5">
                <span>{COMPANY.email}</span>
              </div>
              <div className="flex items-center gap-1 justify-end mt-0.5">
                <span>{COMPANY.website}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-end justify-between mt-3">
            <div>
              <h1 className="text-xl font-bold text-ink-900 leading-tight">
                {product.name}
              </h1>
              <div className="text-xs text-ink-500 font-mono mt-1">
                SKU: {product.sku}
              </div>
            </div>
            <div className="text-sm font-bold text-ink-700 bg-ink-100 px-3 py-1 rounded">
              {product.specs?.gaugeMm || "—"} mm
            </div>
          </div>
        </header>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col gap-6">
        
        {/* IMAGES ROW */}
        <div className="flex flex-col gap-3">
          <div className="relative w-full aspect-square print:aspect-auto print-image-main bg-ink-50 rounded-lg border border-ink-200 overflow-hidden shrink-0">
            {primaryImage ? (
              <img
                src={primaryImage.url}
                alt={primaryImage.alt}
                className="absolute inset-0 w-full h-full object-contain p-2"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-ink-300 text-4xl font-bold">
                {product.specs?.gaugeMm}mm
              </div>
            )}
          </div>

          {subImages.length > 0 && (
            <div className="grid grid-cols-4 gap-2 shrink-0">
              {subImages.map((img: any, i: number) => (
                <div key={i} className="relative w-full aspect-square print:aspect-auto print-image-sub bg-ink-50 rounded border border-ink-200 overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-contain p-1"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SPECS GRID */}
        <div>
          <h2 className="text-xs uppercase tracking-wider text-ink-500 font-semibold mb-2">
            At a glance
          </h2>
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <SpecRow label="Gauge" value={`${product.specs?.gaugeMm ?? '—'} mm`} />
            <SpecRow label="Tensile strength" value={`${product.specs?.tensileStrengthN ?? '—'} N`} />
            <SpecRow label="Tape width" value={`${product.specs?.tapeWidthMm ?? '—'} mm`} />
            <SpecRow label="MOQ" value={`${formatNumber(product.specs?.minOrderQty ?? 0)} pcs`} />
            <SpecRow label="Lead time" value={`${product.specs?.leadTimeDays ?? '—'} days`} />
            <SpecRow label="Temp range" value={`${product.specs?.operatingTempC?.[0] ?? '—'}°C to ${product.specs?.operatingTempC?.[1] ?? '—'}°C`} />
          </dl>
        </div>

        {/* DESCRIPTION & FEATURES */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xs uppercase tracking-wider text-ink-500 font-semibold mb-2">
              Description
            </h2>
            <p className="text-sm text-ink-700 leading-relaxed">
              {product.description}
            </p>
            
            {product.highlights?.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {product.highlights.map((h: string) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-ink-700">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
             <h2 className="text-xs uppercase tracking-wider text-ink-500 font-semibold mb-2">
                Material & finish
              </h2>
              <dl className="grid gap-2">
                <SpecRow label="Material" value={product.material || "—"} />
                <SpecRow label="Finish" value={product.finish || "—"} />
                <SpecRow label="Component type" value={titleCase(product.componentType || "—")} />
              </dl>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <div className="shrink-0 mt-4">
        <footer className="pt-2 border-t border-ink-200 flex items-center justify-between text-[8.5px] text-ink-500">
          <div>
            © {new Date().getFullYear()} {COMPANY.shortName} · {COMPANY.certification}
          </div>
        </footer>
      </div>

    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-ink-200 bg-white p-2.5">
      <dt className="text-[10px] uppercase tracking-wider text-ink-500 font-medium">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-semibold text-ink-900">{value}</dd>
    </div>
  );
}