"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  category: string;
  currentPage: number;
  totalPages: number;
  search?: string;
}

export function CategoryPagination({
  currentPage,
  totalPages,
  search = "",
}: Props) {
  const pathname = usePathname();
  const params = useSearchParams();

  const buildHref = (page: number) => {
    const next = new URLSearchParams(params.toString());
    if (page > 1) next.set("page", String(page));
    else next.delete("page");
    if (search) next.set("search", search);
    const qs = next.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  const pages = getPageNumbers(currentPage, totalPages);

  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <Link
        href={buildHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors w-full sm:w-auto justify-center",
          currentPage === 1
            ? "border-ink-100 text-ink-300 pointer-events-none"
            : "border-ink-200 text-ink-700 hover:border-ink-400 hover:bg-ink-50"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Link>

      <div className="hidden sm:flex items-center gap-1.5">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`gap-${i}`} className="px-2 text-ink-400 select-none">
              …
            </span>
          ) : (
            <Link
              key={p}
              href={buildHref(p as number)}
              aria-current={p === currentPage ? "page" : undefined}
              className={cn(
                "min-w-[36px] h-9 inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
                p === currentPage
                  ? "bg-ink-900 text-white"
                  : "text-ink-700 hover:bg-ink-100"
              )}
            >
              {p}
            </Link>
          )
        )}
      </div>

      <div className="sm:hidden text-sm text-ink-500">
        Page <span className="font-semibold text-ink-900">{currentPage}</span>{" "}
        of {totalPages}
      </div>

      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors w-full sm:w-auto justify-center",
          currentPage === totalPages
            ? "border-ink-100 text-ink-300 pointer-events-none"
            : "border-ink-200 text-ink-700 hover:border-ink-400 hover:bg-ink-50"
        )}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}

function getPageNumbers(
  current: number,
  total: number
): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [];
  pages.push(1);
  if (current > 3) pages.push("...");
  for (
    let i = Math.max(2, current - 1);
    i <= Math.min(total - 1, current + 1);
    i++
  ) {
    pages.push(i);
  }
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}