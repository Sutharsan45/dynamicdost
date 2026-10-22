'use client';

import Link from 'next/link';
import { ArrowLeft, Download, Printer } from 'lucide-react';

interface Props {
  categoryName: string;
  productCount: number;
}

export function AllCatalogActions({ categoryName, productCount }: Props) {
  const handleDownload = () => {
    window.print(); // ← triggers "Save as PDF" in the print dialog
  };

  return (
    <div className="no-print sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-ink-200">
      <div className="max-w-[21cm] mx-auto px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
        <Link
          href={`/products/${categoryName.toLowerCase()}`}
          className="inline-flex items-center gap-1.5 text-sm text-ink-600 hover:text-ink-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {categoryName}
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-500 hidden sm:inline">
            {productCount} {productCount === 1 ? 'product' : 'products'}
          </span>

          <button
            onClick={handleDownload}
            className="btn btn-primary btn-md"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
