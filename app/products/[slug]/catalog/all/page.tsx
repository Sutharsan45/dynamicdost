import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { getCategory } from '@/lib/categories-data';
import { CatalogGrid } from './CatalogGrid';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const cat = getCategory(slug);
  return {
    title: cat ? `${cat.name} — Full Catalog` : 'Catalog',
    description: cat?.description ?? '',
  };
}

export default async function AllCatalogPage({ params }: PageProps) {
  const { slug } = await params;
  const cat = getCategory(slug);

  if (!cat) notFound();

  let products: any[] = [];
  try {
    const qs = new URLSearchParams({
      componentType: cat.slug,
      page: '1',
      pageSize: '500',
    });
    const res = await apiFetch<{ items: any[] }>(
      `/api/products?${qs.toString()}`
    );
    products = res.items ?? [];
  } catch (err) {
    console.error('[AllCatalog] fetch failed:', err);
  }

  if (products.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-10 text-center">
        <h1 className="text-2xl font-semibold mb-2">
          No {cat.name} products yet
        </h1>
        <p className="text-ink-600 mb-6">
          Add products from the admin panel to generate a catalog.
        </p>
        <Link
          href={`/products/${cat.slug}`}
          className="inline-flex items-center gap-1 text-brand-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to {cat.name}
        </Link>
      </div>
    );
  }

  return (
    <CatalogGrid
      categoryName={cat.name}
      categorySlug={cat.slug}
      categoryDescription={cat.description}
      stats={cat.stats ?? []}
      products={products}
    />
  );
}