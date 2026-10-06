"use client";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";

export function ProductSearch() {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState(params.get("search") ?? "");
  const [, startTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      const next = new URLSearchParams(params.toString());
      if (value.trim()) next.set("search", value.trim());
      else next.delete("search");
      startTransition(() => {
        router.push(`/products?${next.toString()}`, { scroll: false });
      });
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="relative">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400 pointer-events-none" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by name, SKU, or type…"
        className="input pl-10 pr-10"
      />
      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-ink-100"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5 text-ink-500" />
        </button>
      )}
    </div>
  );
}