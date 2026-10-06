import fs from "node:fs/promises";
import path from "node:path";

async function main() {
  const dataDir = path.join(process.cwd(), "data");
  await fs.mkdir(dataDir, { recursive: true });

  let products: any[] = [];
  const productDataUrls = [
    new URL("../lib/products-data.ts", import.meta.url),
    new URL("../lib/products-data.js", import.meta.url),
    new URL("../lib/products-data.mjs", import.meta.url),
    new URL("../lib/products-data/index.ts", import.meta.url),
    new URL("../lib/products-data/index.js", import.meta.url),
  ];

  let foundProductsModule = false;
  for (const productDataUrl of productDataUrls) {
    try {
      const mod = await import(productDataUrl.href);
      if (mod && Array.isArray((mod as any).products)) {
        products = (mod as any).products ?? [];
        foundProductsModule = true;
        break;
      }
    } catch {
      // Ignore missing module variants and continue to the next possible path.
    }
  }

  if (!foundProductsModule) {
    console.log("No lib/products-data.* file found — creating empty catalog.");
  }

  const enriched = products.map((p, i) => ({
    ...p,
    componentType: (p as any).componentType ?? "teeth",
    createdAt: new Date(
      Date.now() - (products.length - i) * 86400000
    ).toISOString(),
  }));

  await fs.writeFile(
    path.join(dataDir, "products.json"),
    JSON.stringify({ products: enriched }, null, 2)
  );

  console.log(`✓ Migrated ${enriched.length} products to data/products.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
