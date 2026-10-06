import { createElement } from "react";
import { ProductCard } from "./ProductCard";
import { apiFetch } from "@/lib/api";

export async function RelatedProducts({ product }: { product: any }) {
  let related: any[] = [];

  try {
    const res = await apiFetch<{ items: any[] }>(
      `/api/products?componentType=${product.componentType}&pageSize=5`
    );
    related = (res.items ?? []).filter((p: any) => p.id !== product.id).slice(0, 4);
  } catch {
    related = [];
  }

  if (related.length === 0) return null;

  return createElement(
    "section",
    { className: "mt-16 sm:mt-20" },
    createElement(
      "div",
      { className: "mb-8" },
      createElement("p", { className: "eyebrow" }, `More ${product.componentType} variants`),
      createElement("h2", { className: "h3 mt-2" }, "You may also need")
    ),
    createElement(
      "div",
      { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6" },
      ...related.map((p) =>
        createElement(ProductCard, { key: p.id, product: p })
      )
    )
  );
}