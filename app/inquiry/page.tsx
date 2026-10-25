"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  MapPin,
  Clock,
  FileText,
  Send,
  Check,
  X,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { apiFetch, apiUrl } from "@/lib/api";
import { categories, getCategory } from "@/lib/categories-data";
import { cn } from "@/lib/utils";

/* =========================================
   TYPES
   ========================================= */
interface SelectedProduct {
  id: string;
  name: string;
  sku: string;
  categorySlug: string;
  imageUrl?: string;
}

interface InquiryForm {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  quantity: string;
  message: string;
}

const EMPTY_FORM: InquiryForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  quantity: "",
  message: "",
};

/* =========================================
   PAGE
   ========================================= */
export default function InquiryPage() {
  const [form, setForm] = useState<InquiryForm>(EMPTY_FORM);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<
    Record<string, any[]>
  >({});
  const [loadingCategories, setLoadingCategories] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /* -------- Toggle a category (add/remove) -------- */
  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) => {
      const isActive = prev.includes(slug);

      // Deselect: also clear its products
      if (isActive) {
        setSelectedProducts((sp) =>
          sp.filter((p) => p.categorySlug !== slug)
        );
        return prev.filter((s) => s !== slug);
      }

      // Select
      return [...prev, slug];
    });
  };

  /* -------- Fetch products for each newly selected category -------- */
  useEffect(() => {
    const toFetch = selectedCategories.filter(
      (slug) => !productsByCategory[slug] && !loadingCategories.includes(slug)
    );

    if (toFetch.length === 0) return;

    toFetch.forEach(async (slug) => {
      setLoadingCategories((prev) => [...prev, slug]);

      try {
        const data = await apiFetch<{ items: any[] }>(
          `/api/products?componentType=${encodeURIComponent(slug)}&pageSize=100`
        );
        setProductsByCategory((prev) => ({
          ...prev,
          [slug]: data.items ?? [],
        }));
      } catch (err) {
        console.error(`Failed to fetch ${slug}:`, err);
        setProductsByCategory((prev) => ({ ...prev, [slug]: [] }));
      } finally {
        setLoadingCategories((prev) => prev.filter((s) => s !== slug));
      }
    });
  }, [selectedCategories, productsByCategory, loadingCategories]);

  /* -------- Toggle a product -------- */
  const toggleProduct = (categorySlug: string, product: any) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }

      const raw = product.images?.[0];
      const imgUrl = typeof raw === "string" ? raw : raw?.url ?? undefined;

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          sku: product.sku,
          categorySlug,
          imageUrl: imgUrl,
        },
      ];
    });
  };

  const isSelected = (id: string) =>
    selectedProducts.some((p) => p.id === id);

  const countForCategory = (slug: string) =>
    selectedProducts.filter((p) => p.categorySlug === slug).length;

  /* -------- Submit -------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await apiFetch("/api/inquiries", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          categories: selectedCategories,
          selectedProducts: selectedProducts.map((p) => ({
            id: p.id,
            name: p.name,
            sku: p.sku,
            categorySlug: p.categorySlug,
          })),
        }),
      });

      setSuccess(true);
      setForm(EMPTY_FORM);
      setSelectedCategories([]);
      setSelectedProducts([]);
      setProductsByCategory({});
    } catch (err: any) {
      setError(
        err.message?.includes("404")
          ? "The inquiry endpoint is not available yet. Please email us directly."
          : err.message ?? "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ============================
     SUCCESS
     ============================ */
  if (success) {
    return (
      <div className="container-tight py-20 text-center max-w-lg mx-auto">
        <div className="mx-auto h-16 w-16 rounded-full bg-emerald-50 border border-emerald-100 grid place-items-center mb-6">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <h1 className="h2">Inquiry received</h1>
        <p className="lead mt-4 text-pretty">
          Thank you for reaching out. Our team will review your request and
          respond within 4 business hours.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/products" className="btn btn-primary btn-lg">
            Browse products <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/" className="btn btn-secondary btn-lg">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  /* ============================
     MAIN PAGE
     ============================ */
  return (
    <>
      {/* HERO */}
      <section className="relative border-b border-ink-100 bg-ink-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink-50/40 via-ink-50/80 to-ink-50"
          aria-hidden
        />
        <div className="container-tight relative py-14 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Responds within 4 business hours
            </div>
            <h1 className="h1 mt-5 text-balance">
              Send an inquiry to{" "}
              <span className="text-brand-600">{BRAND.name}</span>
            </h1>
            {/* <p className="lead mt-5 text-pretty">
              Select the categories and specific products you&apos;re
              interested in. Our sales engineer will reply with pricing,
              samples, and lead times.
            </p> */}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="section-sm">
        <div className="container-tight">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* Contact info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Your name" required>
                    <input
                      type="text"
                      className="input"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Full name"
                      required
                    />
                  </Field>
                  <Field label="Company">
                    <input
                      type="text"
                      className="input"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      placeholder="Company name"
                    />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Email" required>
                    <input
                      type="email"
                      className="input"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="you@company.com"
                      required
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      type="tel"
                      className="input"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="+91 98xxx xxxxx"
                    />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Country">
                    <input
                      type="text"
                      className="input"
                      value={form.country}
                      onChange={(e) =>
                        setForm({ ...form, country: e.target.value })
                      }
                      placeholder="India"
                    />
                  </Field>
                  <Field label="Estimated quantity">
                    <input
                      type="text"
                      className="input"
                      value={form.quantity}
                      onChange={(e) =>
                        setForm({ ...form, quantity: e.target.value })
                      }
                      placeholder="e.g. 10,000 pcs per month"
                    />
                  </Field>
                </div>

                {/* ============ CATEGORY MULTI-SELECT ============ */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-ink-700">
                      Product categories{" "}
                      <span className="text-red-500">*</span>
                    </span>
                    {selectedCategories.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategories([]);
                          setSelectedProducts([]);
                        }}
                        className="text-xs text-brand-600 hover:underline"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-ink-500 mb-3">
                    Select one or more categories. Products will appear below
                    each.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => {
                      const active = selectedCategories.includes(cat.slug);
                      return (
                        <button
                          key={cat.slug}
                          type="button"
                          onClick={() => toggleCategory(cat.slug)}
                          className={cn(
                            "inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border-2 text-sm font-medium transition-all",
                            active
                              ? "border-ink-900 bg-ink-900 text-white"
                              : "border-ink-200 bg-white text-ink-700 hover:border-ink-400"
                          )}
                        >
                          <span className="text-base">{cat.icon}</span>
                          {cat.name}
                          {active && (
                            <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-white/20 text-[10px] font-bold">
                              {countForCategory(cat.slug)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ============ PRODUCTS PER CATEGORY ============ */}
                {selectedCategories.length > 0 && (
                  <div className="space-y-4">
                    {selectedCategories.map((slug) => {
                      const cat = getCategory(slug);
                      if (!cat) return null;

                      const isLoading = loadingCategories.includes(slug);
                      const products = productsByCategory[slug] ?? [];
                      const selectedCount = countForCategory(slug);

                      return (
                        <div
                          key={slug}
                          className="rounded-xl border border-ink-200 bg-white p-4"
                        >
                          {/* Category header */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{cat.icon}</span>
                              <div>
                                <p className="text-sm font-semibold text-ink-900">
                                  {cat.name}
                                </p>
                                <p className="text-xs text-ink-500">
                                  {selectedCount} of {products.length} selected
                                </p>
                              </div>
                            </div>
                            {selectedCount > 0 && (
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedProducts((prev) =>
                                    prev.filter(
                                      (p) => p.categorySlug !== slug
                                    )
                                  )
                                }
                                className="text-xs text-ink-500 hover:text-ink-900"
                              >
                                Clear
                              </button>
                            )}
                          </div>

                          {/* Loading */}
                          {isLoading && (
                            <div className="flex items-center justify-center py-6 text-ink-500">
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              <span className="text-sm">
                                Loading products…
                              </span>
                            </div>
                          )}

                          {/* Empty */}
                          {!isLoading && products.length === 0 && (
                            <p className="text-sm text-ink-500 text-center py-6">
                              No products in this category yet.
                            </p>
                          )}

                          {/* Grid */}
                          {!isLoading && products.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
                              {products.map((product) => {
                                const selected = isSelected(product.id);
                                const raw = product.images?.[0];
                                const imgUrl =
                                  typeof raw === "string"
                                    ? raw
                                    : raw?.url ?? null;
                                const alt =
                                  typeof raw === "string"
                                    ? product.name
                                    : raw?.alt || product.name;

                                return (
                                  <button
                                    key={product.id}
                                    type="button"
                                    onClick={() =>
                                      toggleProduct(slug, product)
                                    }
                                    className={cn(
                                      "group relative flex flex-col rounded-lg border-2 overflow-hidden text-left transition-all",
                                      selected
                                        ? "border-brand-500 bg-brand-50 ring-2 ring-brand-500/20"
                                        : "border-ink-200 bg-white hover:border-ink-400"
                                    )}
                                  >
                                    <div className="relative aspect-square w-full bg-ink-50">
                                      {imgUrl ? (
                                        <Image
                                          src={apiUrl(imgUrl)}
                                          alt={alt}
                                          fill
                                          sizes="(max-width: 640px) 50vw, 200px"
                                          className="object-cover"
                                        />
                                      ) : (
                                        <div className="absolute inset-0 grid place-items-center text-ink-300 text-2xl font-bold">
                                          {product.specs?.gaugeMm ?? "—"}mm
                                        </div>
                                      )}

                                      {/* Checkbox */}
                                      <div
                                        className={cn(
                                          "absolute top-2 right-2 h-6 w-6 rounded-md border-2 grid place-items-center transition-all",
                                          selected
                                            ? "bg-brand-600 border-brand-600"
                                            : "bg-white/90 border-ink-300 group-hover:border-brand-500"
                                        )}
                                      >
                                        {selected && (
                                          <Check className="h-3.5 w-3.5 text-white" />
                                        )}
                                      </div>
                                    </div>

                                    <div className="p-2.5">
                                      <p className="text-xs font-semibold text-ink-900 line-clamp-2 leading-tight">
                                        {product.name}
                                      </p>
                                      <p className="text-[10px] text-ink-500 font-mono mt-1">
                                        {product.sku}
                                      </p>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ============ SELECTED SUMMARY ============ */}
                {selectedProducts.length > 0 && (
                  <div className="rounded-xl border border-brand-200 bg-brand-50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-brand-900">
                        Selected products ({selectedProducts.length})
                      </p>
                      <button
                        type="button"
                        onClick={() => setSelectedProducts([])}
                        className="text-xs text-brand-700 hover:underline"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProducts.map((p) => (
                        <span
                          key={p.id}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white border border-brand-200 px-2.5 py-1 text-xs font-medium text-ink-900"
                        >
                          <span className="font-mono text-[10px] text-ink-500">
                            {p.sku}
                          </span>
                          <span className="max-w-[150px] truncate">
                            {p.name}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedProducts((prev) =>
                                prev.filter((x) => x.id !== p.id)
                              )
                            }
                            className="text-ink-400 hover:text-red-600"
                            aria-label="Remove"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Field label="Your message" required>
                  <textarea
                    className="input"
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us about your requirements, target dates, and any specifications."
                    required
                  />
                </Field>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary btn-lg flex-1"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Send inquiry
                      </>
                    )}
                  </button>
                  <Link
                    href="/contact"
                    className="btn btn-secondary btn-lg sm:w-auto"
                  >
                    Prefer email?
                  </Link>
                </div>
              </form>
            </div>

            {/* SIDEBAR */}
            <aside className="lg:col-span-2">
              <div className="space-y-4">
                <div className="rounded-xl border border-ink-200 bg-white p-6">
                  <h3 className="font-semibold text-ink-900 mb-4">
                    Or reach us directly
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2.5 text-ink-600">
                      <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                      <a
                        href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                        className="hover:text-ink-900"
                      >
                        {BRAND.phone}
                      </a>
                    </li>
                    <li className="flex items-start gap-2.5 text-ink-600">
                      <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                      <a
                        href={`mailto:${BRAND.email}`}
                        className="hover:text-ink-900 break-all"
                      >
                        {BRAND.email}
                      </a>
                    </li>
                    <li className="flex items-start gap-2.5 text-ink-600">
                      <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>{BRAND.hours.weekdays}</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-ink-600">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>
                        {BRAND.headOffice.line1}
                        <br />
                        {BRAND.headOffice.city},{" "}
                        {BRAND.headOffice.state}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-brand-200 bg-brand-50 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-brand-600" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                      Response time
                    </span>
                  </div>
                  <p className="text-sm text-brand-900">
                    Our sales team reviews inquiries every 4 hours during
                    business days.
                  </p>
                </div>

                <div className="rounded-xl border border-ink-200 bg-white p-6">
                  <h3 className="font-semibold text-ink-900 mb-4">
                    What happens next?
                  </h3>
                  <ol className="space-y-3 text-sm text-ink-600">
                    {[
                      "We review your requirements",
                      "Sales engineer sends a quote",
                      "Samples dispatched in 5–7 days",
                      "Confirm PO → production begins",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-0.5 h-5 w-5 rounded-full bg-ink-900 text-white text-[10px] font-bold grid place-items-center shrink-0">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <Link
                  href="/products"
                  className="group flex items-center gap-3 rounded-xl border border-ink-200 bg-white p-5 hover:border-ink-300 hover:shadow-md transition-all"
                >
                  <div className="h-10 w-10 rounded-lg bg-ink-50 grid place-items-center">
                    <FileText className="h-5 w-5 text-ink-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink-900">
                      Browse our full catalog
                    </p>
                    <p className="text-xs text-ink-500 mt-0.5">
                      All products, specs, and certifications
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-ink-400 group-hover:text-brand-600 transition-colors" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================
   FIELD HELPER
   ========================================= */
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}