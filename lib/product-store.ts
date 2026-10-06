import fs from "node:fs/promises";
import path from "node:path";
import type { ZipperProduct, ComponentType } from "@/types/product";

export type { ComponentType };

export interface StoredProduct extends ZipperProduct {
  componentType: ComponentType;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "products.json");

async function ensureFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify({ products: [] }, null, 2));
  }
}

async function readAll(): Promise<StoredProduct[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.products) ? parsed.products : [];
  } catch {
    return [];
  }
}

async function writeAll(products: StoredProduct[]) {
  await ensureFile();
  await fs.writeFile(
    DATA_FILE,
    JSON.stringify({ products }, null, 2),
    "utf-8"
  );
}

export interface ListOptions {
  category?: ComponentType;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface ListResult {
  items: StoredProduct[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function listProducts(
  opts: ListOptions = {}
): Promise<ListResult> {
  const { category, search, page = 1, pageSize = 9 } = opts;
  let items = await readAll();

  if (category) {
    items = items.filter((p) => p.componentType === category);
  }

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    );
  }

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);

  return {
    items: pageItems,
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

export async function getAllProducts(): Promise<StoredProduct[]> {
  return readAll();
}

export async function getProductBySlug(
  slug: string
): Promise<StoredProduct | undefined> {
  const items = await readAll();
  return items.find((p) => p.slug === slug);
}

export async function getProductsByCategory(
  category: ComponentType
): Promise<StoredProduct[]> {
  const items = await readAll();
  return items.filter((p) => p.componentType === category);
}

export async function createProduct(
  product: Omit<StoredProduct, "id" | "createdAt">
): Promise<StoredProduct> {
  const items = await readAll();
  const id = `zp-${Date.now()}`;
  const newProduct: StoredProduct = {
    ...product,
    id,
    createdAt: new Date().toISOString(),
  };
  items.push(newProduct);
  await writeAll(items);
  return newProduct;
}

export async function updateProduct(
  id: string,
  updates: Partial<StoredProduct>
): Promise<StoredProduct | undefined> {
  const items = await readAll();
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  items[idx] = { ...items[idx], ...updates, id: items[idx].id };
  await writeAll(items);
  return items[idx];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const items = await readAll();
  const next = items.filter((p) => p.id !== id);
  if (next.length === items.length) return false;
  await writeAll(next);
  return true;
}