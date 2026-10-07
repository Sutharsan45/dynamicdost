"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Loader2,
  ImageIcon,
  LogOut,
} from "lucide-react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { apiFetch, clearToken, apiUrl } from "@/lib/api";
import { cn } from "@/lib/utils";

type ComponentType =
  | "tape"
  | "slider"
  | "teeth"
  | "webbing"
  | "labels"
  | "threads";

type FilterValue = "all" | ComponentType;

interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  shortName: string;
  type: string;
  componentType: ComponentType;
  applications: string[];
  material: string;
  finish: string;
  certifications: string[];
  description: string;
  highlights: string[];
  images: string[];
  featured?: boolean;
  specSheetUrl?: string;
  specs: {
    gaugeMm: number;
    tapeWidthMm: number;
    tensileStrengthN: number;
    minOrderQty: number;
    leadTimeDays: number;
    operatingTempC: [number, number];
    colorCodes: string[];
    sliderCompatibility: string[];
    lengthOptionsMm: number[];
  };
}

interface FormState {
  name: string;
  componentType: ComponentType;
  description: string;
  images: string[];
  material: string;
  finish: string;
  certifications: string;
  applications: string;
  highlights: string;
  specSheetUrl: string;
  featured: boolean;
  specs: {
    gaugeMm: number;
    tapeWidthMm: number;
    tensileStrengthN: number;
    minOrderQty: number;
    leadTimeDays: number;
    operatingTempMin: number;
    operatingTempMax: number;
  };
}

const CATEGORY_OPTIONS: { value: ComponentType; label: string }[] = [
  { value: "tape", label: "Tape" },
  { value: "slider", label: "Slider" },
  { value: "teeth", label: "Teeth" },
  { value: "webbing", label: "Webbing Tapes" },
  { value: "labels", label: "Labels" },
  { value: "threads", label: "Threads" },
];

const CATEGORY_STYLES: Record<
  ComponentType,
  { badge: string; dot: string; tabActive: string }
> = {
  tape: {
    badge: "bg-brand-50 text-brand-700",
    dot: "bg-brand-500",
    tabActive: "bg-brand-600 text-white border-brand-600",
  },
  slider: {
    badge: "bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
    tabActive: "bg-emerald-600 text-white border-emerald-600",
  },
  teeth: {
    badge: "bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
    tabActive: "bg-amber-600 text-white border-amber-600",
  },
  webbing: {
    badge: "bg-violet-50 text-violet-700",
    dot: "bg-violet-500",
    tabActive: "bg-violet-600 text-white border-violet-600",
  },
  labels: {
    badge: "bg-rose-50 text-rose-700",
    dot: "bg-rose-500",
    tabActive: "bg-rose-600 text-white border-rose-600",
  },
  threads: {
    badge: "bg-cyan-50 text-cyan-700",
    dot: "bg-cyan-500",
    tabActive: "bg-cyan-600 text-white border-cyan-600",
  },
};

const SKU_PREFIX: Record<ComponentType, string> = {
  tape: "TP",
  slider: "SL",
  teeth: "TT",
  webbing: "WB",
  labels: "LB",
  threads: "TH",
};

const CATEGORY_DEFAULTS: Record<ComponentType, Partial<FormState>> = {
  tape: {
    material: "Polyester tape",
    finish: "Standard",
    certifications: "ISO 9001",
    applications: "apparel, luggage",
    highlights: "",
    specs: {
      gaugeMm: 5,
      tapeWidthMm: 26,
      tensileStrengthN: 420,
      minOrderQty: 5000,
      leadTimeDays: 14,
      operatingTempMin: -30,
      operatingTempMax: 80,
    },
  },
  slider: {
    material: "Zinc alloy",
    finish: "Matte black",
    certifications: "ISO 9001, REACH",
    applications: "apparel, outdoor, luggage",
    highlights: "",
    specs: {
      gaugeMm: 5,
      tapeWidthMm: 26,
      tensileStrengthN: 400,
      minOrderQty: 10000,
      leadTimeDays: 15,
      operatingTempMin: -30,
      operatingTempMax: 90,
    },
  },
  teeth: {
    material: "Nylon coil",
    finish: "Matte black",
    certifications: "OEKO-TEX 100, REACH, ISO 9001",
    applications: "apparel, outdoor, luggage",
    highlights: "",
    specs: {
      gaugeMm: 5,
      tapeWidthMm: 26,
      tensileStrengthN: 420,
      minOrderQty: 5000,
      leadTimeDays: 18,
      operatingTempMin: -30,
      operatingTempMax: 80,
    },
  },
  webbing: {
    material: "Polyester webbing",
    finish: "Standard",
    certifications: "ISO 9001, REACH",
    applications: "outdoor, luggage, footwear",
    highlights: "",
    specs: {
      gaugeMm: 0,
      tapeWidthMm: 25,
      tensileStrengthN: 1200,
      minOrderQty: 3000,
      leadTimeDays: 12,
      operatingTempMin: -20,
      operatingTempMax: 80,
    },
  },
  labels: {
    material: "Woven polyester",
    finish: "Matte",
    certifications: "OEKO-TEX 100",
    applications: "apparel",
    highlights: "",
    specs: {
      gaugeMm: 0,
      tapeWidthMm: 0,
      tensileStrengthN: 0,
      minOrderQty: 500,
      leadTimeDays: 10,
      operatingTempMin: -10,
      operatingTempMax: 60,
    },
  },
  threads: {
    material: "Bonded polyester",
    finish: "Standard",
    certifications: "ISO 9001, OEKO-TEX 100",
    applications: "apparel, footwear",
    highlights: "",
    specs: {
      gaugeMm: 0,
      tapeWidthMm: 0,
      tensileStrengthN: 0,
      minOrderQty: 1000,
      leadTimeDays: 12,
      operatingTempMin: -10,
      operatingTempMax: 100,
    },
  },
};

const EMPTY_FORM: FormState = {
  name: "",
  componentType: "tape",
  description: "",
  images: [],
  material: "",
  finish: "",
  certifications: "",
  applications: "",
  highlights: "",
  specSheetUrl: "",
  featured: false,
  specs: {
    gaugeMm: 0,
    tapeWidthMm: 0,
    tensileStrengthN: 0,
    minOrderQty: 5000,
    leadTimeDays: 14,
    operatingTempMin: -30,
    operatingTempMax: 80,
  },
};

function buildFormForCategory(cat: ComponentType): FormState {
  const defaults = CATEGORY_DEFAULTS[cat];
  return {
    ...EMPTY_FORM,
    componentType: cat,
    material: defaults.material ?? "",
    finish: defaults.finish ?? "",
    certifications: defaults.certifications ?? "",
    applications: defaults.applications ?? "",
    highlights: defaults.highlights ?? "",
    specs: {
      ...EMPTY_FORM.specs,
      ...(defaults.specs ?? {}),
    },
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseList(csv: string): string[] {
  return csv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FilterValue>("all");

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiFetch<{ items: Product[] }>(
        "/api/products?pageSize=100"
      );
      setProducts(data.items ?? []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && (creating || editing)) cancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creating, editing]);

  useEffect(() => {
    document.body.style.overflow = creating || editing ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [creating, editing]);

  const filteredProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.componentType === filter);
  }, [products, filter]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    for (const p of products) {
      counts[p.componentType] = (counts[p.componentType] ?? 0) + 1;
    }
    return counts;
  }, [products]);

  const openCreate = () => {
    setForm(buildFormForCategory("tape"));
    setEditing(null);
    setCreating(true);
    setError("");
  };

  const openEdit = (product: Product) => {
    setForm({
      name: product.name,
      componentType: product.componentType,
      description: product.description,
      images: product.images ?? [],
      material: product.material ?? "",
      finish: product.finish ?? "",
      certifications: (product.certifications ?? []).join(", "),
      applications: (product.applications ?? []).join(", "),
      highlights: (product.highlights ?? []).join(", "),
      specSheetUrl: product.specSheetUrl ?? "",
      featured: product.featured ?? false,
      specs: {
        gaugeMm: product.specs?.gaugeMm ?? 0,
        tapeWidthMm: product.specs?.tapeWidthMm ?? 0,
        tensileStrengthN: product.specs?.tensileStrengthN ?? 0,
        minOrderQty: product.specs?.minOrderQty ?? 5000,
        leadTimeDays: product.specs?.leadTimeDays ?? 14,
        operatingTempMin: product.specs?.operatingTempC?.[0] ?? -30,
        operatingTempMax: product.specs?.operatingTempC?.[1] ?? 80,
      },
    });
    setEditing(product);
    setCreating(false);
    setError("");
  };

  const cancel = () => {
    setCreating(false);
    setEditing(null);
    setError("");
  };

  const changeCategory = (cat: ComponentType) => {
    setForm((prev) => {
      const defaults = buildFormForCategory(cat);
      return {
        ...prev,
        componentType: cat,
        material: prev.material || defaults.material,
        finish: prev.finish || defaults.finish,
        certifications: prev.certifications || defaults.certifications,
        applications: prev.applications || defaults.applications,
        specs: {
          gaugeMm: prev.specs.gaugeMm || defaults.specs.gaugeMm,
          tapeWidthMm: prev.specs.tapeWidthMm || defaults.specs.tapeWidthMm,
          tensileStrengthN:
            prev.specs.tensileStrengthN || defaults.specs.tensileStrengthN,
          minOrderQty: prev.specs.minOrderQty || defaults.specs.minOrderQty,
          leadTimeDays:
            prev.specs.leadTimeDays || defaults.specs.leadTimeDays,
          operatingTempMin:
            prev.specs.operatingTempMin || defaults.specs.operatingTempMin,
          operatingTempMax:
            prev.specs.operatingTempMax || defaults.specs.operatingTempMax,
        },
      };
    });
  };

  const save = async () => {
    if (!form.name.trim()) {
      setError("Product name is required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const sku = editing
        ? editing.sku
        : `${SKU_PREFIX[form.componentType]}-${Date.now()
            .toString()
            .slice(-6)}`;

      const payload = {
        slug: slugify(form.name) || `product-${Date.now()}`,
        sku,
        name: form.name,
        shortName: form.name.slice(0, 40),
        type: editing?.type ?? form.componentType,
        componentType: form.componentType,
        applications: parseList(form.applications),
        material: form.material,
        finish: form.finish,
        certifications: parseList(form.certifications),
        description:
          form.description || `${form.name} — manufactured by Dynamic Dost.`,
        highlights: parseList(form.highlights),
        images: form.images,
        featured: form.featured,
        specSheetUrl: form.specSheetUrl,
        specs: {
          gaugeMm: Number(form.specs.gaugeMm) || 0,
          tapeWidthMm: Number(form.specs.tapeWidthMm) || 0,
          tensileStrengthN: Number(form.specs.tensileStrengthN) || 0,
          sliderCompatibility: [],
          colorCodes: [],
          lengthOptionsMm: [],
          minOrderQty: Number(form.specs.minOrderQty) || 5000,
          leadTimeDays: Number(form.specs.leadTimeDays) || 14,
          operatingTempC: [
            Number(form.specs.operatingTempMin) || -30,
            Number(form.specs.operatingTempMax) || 80,
          ] as [number, number],
        },
      };

      if (editing) {
        await apiFetch(`/api/admin/products/${editing.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await apiFetch("/api/admin/products", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      await load();
      cancel();
    } catch (e: any) {
      setError(e.message ?? "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"?`)) return;
    try {
      await apiFetch(`/api/admin/products/${product.id}`, {
        method: "DELETE",
      });
      await load();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleLogout = async () => {
    await apiFetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    clearToken();
    router.push("/admin/login");
  };

  return (
    <div className="container-tight py-10 sm:py-14">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <h1 className="h2">Products admin</h1>
          <p className="text-ink-600 mt-1 text-sm">
            {products.length} product{products.length === 1 ? "" : "s"} in
            catalog
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={openCreate} className="btn btn-primary btn-md">
            <Plus className="h-4 w-4" />
            Add product
          </button>
          <button onClick={handleLogout} className="btn btn-secondary btn-md">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max pb-1">
          <FilterTab
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label="All"
            count={categoryCounts.all ?? 0}
            dotClass="bg-ink-900"
            activeClass="bg-ink-900 text-white border-ink-900"
          />
          {CATEGORY_OPTIONS.map((cat) => {
            const style = CATEGORY_STYLES[cat.value];
            return (
              <FilterTab
                key={cat.value}
                active={filter === cat.value}
                onClick={() => setFilter(cat.value)}
                label={cat.label}
                count={categoryCounts[cat.value] ?? 0}
                dotClass={style.dot}
                activeClass={style.tabActive}
              />
            );
          })}
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-ink-200 bg-white overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-ink-500">
            <Loader2 className="h-5 w-5 animate-spin mx-auto" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-10 text-center text-ink-500">
            {filter === "all"
              ? 'No products yet. Click "Add product" to create one.'
              : `No products in this category yet.`}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ink-50 border-b border-ink-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-ink-600">
                    Product
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-ink-600">
                    Category
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-ink-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {filteredProducts.map((p) => {
                  const style =
                    CATEGORY_STYLES[p.componentType] ?? CATEGORY_STYLES.tape;
                  const categoryLabel =
                    CATEGORY_OPTIONS.find((c) => c.value === p.componentType)
                      ?.label ?? p.componentType;
                  const thumb = p.images?.[0] ? apiUrl(p.images[0]) : null;
                  return (
                    <tr key={p.id} className="hover:bg-ink-50/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 rounded-md overflow-hidden bg-ink-100 shrink-0">
                            {thumb ? (
                              <Image
                                src={thumb}
                                alt=""
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="h-full w-full grid place-items-center">
                                <ImageIcon className="h-4 w-4 text-ink-400" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-ink-900 truncate">
                              {p.name}
                            </div>
                            <div className="text-xs text-ink-500 font-mono">
                              {p.sku}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            style.badge
                          )}
                        >
                          {categoryLabel}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-2 rounded-lg hover:bg-ink-100 text-ink-600"
                          aria-label={`Edit ${p.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => remove(p)}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                          aria-label={`Delete ${p.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL */}
      {(creating || editing) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
            onClick={cancel}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100 shrink-0">
              <h2 className="font-semibold text-ink-900 text-lg truncate">
                {editing ? `Edit: ${editing.name}` : "Add new product"}
              </h2>
              <button
                onClick={cancel}
                className="p-2 rounded-lg hover:bg-ink-100 shrink-0"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <Section title="Basic info">
                  <Field label="Product name" required>
                    <input
                      type="text"
                      className="input"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="e.g. Nylon Spiral Coil — 5mm"
                      autoFocus
                    />
                  </Field>

                  <Field label="Category" required>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {CATEGORY_OPTIONS.map((cat) => {
                        const active = form.componentType === cat.value;
                        const style = CATEGORY_STYLES[cat.value];
                        return (
                          <button
                            key={cat.value}
                            type="button"
                            onClick={() => changeCategory(cat.value)}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 text-sm font-medium transition-all text-left",
                              active
                                ? "border-ink-900 bg-ink-900 text-white"
                                : "border-ink-200 bg-white text-ink-700 hover:border-ink-400"
                            )}
                          >
                            <span
                              className={cn(
                                "h-2 w-2 rounded-full shrink-0",
                                active ? "bg-white" : style.dot
                              )}
                            />
                            <span className="truncate">{cat.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </Field>

                  <Field label="Description">
                    <textarea
                      className="input"
                      rows={3}
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      placeholder="Short description shown on the product card and detail page."
                    />
                  </Field>

                  <Field label="Product images">
                    <ImageUploader
                      images={form.images}
                      onChange={(images) => setForm({ ...form, images })}
                      maxImages={40}
                    />
                  </Field>
                </Section>

                <Section title="Specifications">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Field label="Gauge (mm)">
                      <input
                        type="number"
                        step="0.1"
                        className="input"
                        value={form.specs.gaugeMm}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            specs: {
                              ...form.specs,
                              gaugeMm: Number(e.target.value) || 0,
                            },
                          })
                        }
                      />
                    </Field>

                    <Field label="Tape width (mm)">
                      <input
                        type="number"
                        step="0.1"
                        className="input"
                        value={form.specs.tapeWidthMm}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            specs: {
                              ...form.specs,
                              tapeWidthMm: Number(e.target.value) || 0,
                            },
                          })
                        }
                      />
                    </Field>

                    <Field label="Tensile strength (N)">
                      <input
                        type="number"
                        className="input"
                        value={form.specs.tensileStrengthN}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            specs: {
                              ...form.specs,
                              tensileStrengthN: Number(e.target.value) || 0,
                            },
                          })
                        }
                      />
                    </Field>

                    <Field label="Min operating temp (°C)">
                      <input
                        type="number"
                        className="input"
                        value={form.specs.operatingTempMin}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            specs: {
                              ...form.specs,
                              operatingTempMin: Number(e.target.value) || 0,
                            },
                          })
                        }
                      />
                    </Field>

                    <Field label="Max operating temp (°C)">
                      <input
                        type="number"
                        className="input"
                        value={form.specs.operatingTempMax}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            specs: {
                              ...form.specs,
                              operatingTempMax: Number(e.target.value) || 0,
                            },
                          })
                        }
                      />
                    </Field>

                    <Field label="MOQ (pcs)">
                      <input
                        type="number"
                        className="input"
                        value={form.specs.minOrderQty}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            specs: {
                              ...form.specs,
                              minOrderQty: Number(e.target.value) || 0,
                            },
                          })
                        }
                      />
                    </Field>

                    <Field label="Lead time (days)">
                      <input
                        type="number"
                        className="input"
                        value={form.specs.leadTimeDays}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            specs: {
                              ...form.specs,
                              leadTimeDays: Number(e.target.value) || 0,
                            },
                          })
                        }
                      />
                    </Field>

                    <Field label="Material">
                      <input
                        type="text"
                        className="input"
                        value={form.material}
                        onChange={(e) =>
                          setForm({ ...form, material: e.target.value })
                        }
                        placeholder="e.g. Nylon coil"
                      />
                    </Field>

                    <Field label="Finish">
                      <input
                        type="text"
                        className="input"
                        value={form.finish}
                        onChange={(e) =>
                          setForm({ ...form, finish: e.target.value })
                        }
                        placeholder="e.g. Matte black"
                      />
                    </Field>
                  </div>
                </Section>

                <Section title="Classification">
                  <Field label="Certifications (comma-separated)">
                    <input
                      type="text"
                      className="input"
                      value={form.certifications}
                      onChange={(e) =>
                        setForm({ ...form, certifications: e.target.value })
                      }
                      placeholder="ISO 9001, REACH, OEKO-TEX 100"
                    />
                  </Field>

                  <Field label="Applications (comma-separated)">
                    <input
                      type="text"
                      className="input"
                      value={form.applications}
                      onChange={(e) =>
                        setForm({ ...form, applications: e.target.value })
                      }
                      placeholder="apparel, outdoor, luggage"
                    />
                  </Field>

                  <Field label="Highlights (comma-separated)">
                    <input
                      type="text"
                      className="input"
                      value={form.highlights}
                      onChange={(e) =>
                        setForm({ ...form, highlights: e.target.value })
                      }
                      placeholder="500K cycles, 24 colors"
                    />
                  </Field>

                  <Field label="Spec sheet URL">
                    <input
                      type="text"
                      className="input"
                      value={form.specSheetUrl}
                      onChange={(e) =>
                        setForm({ ...form, specSheetUrl: e.target.value })
                      }
                      placeholder="/specs/NS-5-STD.pdf"
                    />
                  </Field>

                  <Field label="Visibility">
                    <label className="inline-flex items-center gap-2 mt-1">
                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(e) =>
                          setForm({ ...form, featured: e.target.checked })
                        }
                        className="h-4 w-4 rounded border-ink-300"
                      />
                      <span className="text-sm text-ink-700">
                        Feature on homepage
                      </span>
                    </label>
                  </Field>
                </Section>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-ink-100 flex flex-col sm:flex-row sm:justify-end gap-3 shrink-0 bg-ink-50/50">
              <button
                onClick={cancel}
                className="btn btn-secondary btn-md order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving || !form.name.trim()}
                className="btn btn-primary btn-md order-1 sm:order-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Saving…
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {editing ? "Update product" : "Save product"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================
   Small building blocks
   ========================================= */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-wider text-ink-500 font-semibold mb-3 pb-2 border-b border-ink-100">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

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
    <div>
      <label className="block text-sm font-medium text-ink-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function FilterTab({
  active,
  onClick,
  label,
  count,
  dotClass,
  activeClass,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  dotClass: string;
  activeClass: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all whitespace-nowrap",
        active
          ? activeClass
          : "border-ink-200 bg-white text-ink-700 hover:border-ink-400 hover:bg-ink-50"
      )}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full shrink-0",
          active ? "bg-white/80" : dotClass
        )}
      />
      {label}
      <span
        className={cn(
          "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold tabular-nums",
          active ? "bg-white/20 text-white" : "bg-ink-100 text-ink-600"
        )}
      >
        {count}
      </span>
    </button>
  );
}