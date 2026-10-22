"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FileText, Eye } from "lucide-react";

interface Props {
  productSlug: string;
  productName: string;
  imageUrl?: string;
  variant?: "primary" | "secondary";
}

export function CatalogButton({
  productSlug,
  productName,
  imageUrl,
  variant = "primary",
}: Props) {
  const router = useRouter();

  const handleOpen = () => {
    router.push(`/products/${productSlug}/catalog`);
  };

  const isPrimary = variant === "primary";

  return (
    <button
      onClick={handleOpen}
      className={`relative w-full overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg text-left ${
        isPrimary
          ? "border-brand-200 bg-gradient-to-br from-brand-50 to-white"
          : "border-ink-200 bg-white"
      }`}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Thumbnail */}
        <div className="relative h-16 w-16 shrink-0 rounded-lg overflow-hidden bg-white border border-ink-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${productName} catalog`}
              fill
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full grid place-items-center bg-ink-50">
              <FileText className="h-6 w-6 text-ink-400" />
            </div>
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
              isPrimary ? "text-brand-600" : "text-ink-500"
            }`}
          >
            E-Catalog
          </p>
          <h3 className="font-semibold text-ink-900 truncate">
            {productName}
          </h3>
          <p className="text-xs text-ink-500 mt-0.5">
            Specs · Size chart · Certifications
          </p>
        </div>

        {/* Action */}
        <div
          className={`flex items-center justify-center h-10 px-4 rounded-lg text-sm font-medium shrink-0 ${
            isPrimary
              ? "bg-brand-600 text-white"
              : "bg-ink-900 text-white"
          }`}
        >
          <Eye className="h-4 w-4 mr-2" />
          View
        </div>
      </div>

      <div
        className={`h-1 w-full ${
          isPrimary ? "bg-brand-500" : "bg-ink-900"
        }`}
      />
    </button>
  );
}