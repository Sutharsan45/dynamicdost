"use client";

import { useRouter } from "next/navigation";
import { Download, Printer, ArrowLeft } from "lucide-react";

export function CatalogActions({ productName }: { productName: string }) {
  const router = useRouter();

  const handleDownload = () => {
    // Browser's print dialog — user can "Save as PDF"
    window.print();
  };

  return (
    <div className="no-print sticky top-0 z-40 bg-white border-b border-ink-200 shadow-sm">
      <div className="max-w-[21cm] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-700 hover:text-ink-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <p className="text-xs text-ink-500 truncate hidden sm:block">
          Catalog: {productName}
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
          >
            <Printer className="h-4 w-4" />
            <span className="hidden sm:inline">Print</span>
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 rounded-lg bg-ink-900 px-3 py-2 text-sm font-medium text-white hover:bg-ink-800"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}