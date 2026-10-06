"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Filter, X, ChevronDown } from "lucide-react";
import { ZIPPER_TYPES, APPLICATIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ProductFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (next.get(key) === value) next.delete(key);
      else next.set(key, value);
      router.push(`/products?${next.toString()}`, { scroll: false });
    },
    [params, router]
  );

  const clearAll = () => router.push("/products");

  const activeType = params.get("type");
  const activeApp = params.get("application");
  const hasFilters = !!(activeType || activeApp);

  const filtersContent = (
    <div className="space-y-7">
      {/* Zipper Type */}
      <div>
        <h4 className="text-sm font-semibold text-ink-900 mb-3">
          Zipper type
        </h4>
        <div className="flex flex-wrap lg:flex-col gap-2">
          {ZIPPER_TYPES.map((t) => {
            const active = activeType === t.value;
            return (
              <button
                key={t.value}
                onClick={() => updateParam("type", t.value)}
                className={cn(
                  "text-left text-sm px-3 py-2 rounded-lg border transition-all w-full sm:w-auto",
                  active
                    ? "bg-ink-900 text-white border-ink-900"
                    : "border-ink-200 text-ink-700 hover:border-ink-400 hover:bg-ink-50"
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Application */}
      <div>
        <h4 className="text-sm font-semibold text-ink-900 mb-3">
          Application
        </h4>
        <div className="flex flex-wrap lg:flex-col gap-2">
          {APPLICATIONS.map((a) => {
            const active = activeApp === a.value;
            return (
              <button
                key={a.value}
                onClick={() => updateParam("application", a.value)}
                className={cn(
                  "text-left text-sm px-3 py-2 rounded-lg border transition-all w-full sm:w-auto",
                  active
                    ? "bg-ink-900 text-white border-ink-900"
                    : "border-ink-200 text-ink-700 hover:border-ink-400 hover:bg-ink-50"
                )}
              >
                {a.label}
              </button>
            );
          })}
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={clearAll}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-700 hover:text-brand-800"
        >
          <X className="h-3.5 w-3.5" /> Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="btn btn-secondary btn-md w-full justify-between"
        >
          <span className="inline-flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {hasFilters && (
              <span className="ml-1 inline-flex items-center rounded-full bg-ink-900 text-white text-[10px] px-1.5 py-0.5">
                {(activeType ? 1 : 0) + (activeApp ? 1 : 0)}
              </span>
            )}
          </span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute left-0 right-0 bottom-0 max-h-[85vh] bg-white rounded-t-2xl overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-ink-100 flex items-center justify-between px-5 py-4">
                <h3 className="font-semibold">Filters</h3>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-ink-100"
                  aria-label="Close filters"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-5">{filtersContent}</div>
              <div className="sticky bottom-0 bg-white border-t border-ink-100 p-5 pb-safe">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="btn btn-primary btn-lg w-full"
                >
                  Show results
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24">{filtersContent}</div>
      </aside>
    </>
  );
}