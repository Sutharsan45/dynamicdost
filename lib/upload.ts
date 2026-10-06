import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const MAX_SIZE_MB = parseInt(process.env.MAX_UPLOAD_SIZE_MB ?? "5", 10);
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const UPLOAD_DIR = path.join(
  process.cwd(),
  process.env.UPLOAD_DIR ?? "public/products/uploads"
);

export interface UploadResult {
  url: string;
  filename: string;
  size: number;
  width: number;
  height: number;
}

export async function saveUploadedImage(file: File): Promise<UploadResult> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(
      `Invalid file type. Allowed: ${ALLOWED_TYPES.join(", ")}`
    );
  }

  if (file.size > MAX_SIZE_BYTES) {
    throw new Error(`File too large. Max ${MAX_SIZE_MB} MB.`);
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  let metadata;
  try {
    metadata = await sharp(buffer).metadata();
  } catch {
    throw new Error("File is not a valid image.");
  }

  if (!metadata.width || !metadata.height) {
    throw new Error("Could not read image dimensions.");
  }

  const hash = crypto.randomBytes(8).toString("hex");
  const timestamp = Date.now();
  const filename = `${timestamp}-${hash}.webp`;

  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const processed = await sharp(buffer)
    .resize({
      width: 1600,
      height: 1600,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 88 })
    .toBuffer();

  const filepath = path.join(UPLOAD_DIR, filename);
  await fs.writeFile(filepath, processed);

  const url = `/products/uploads/${filename}`;

  return {
    url,
    filename,
    size: processed.length,
    width: metadata.width,
    height: metadata.height,
  };
}

export async function deleteUploadedImage(url: string): Promise<boolean> {
  if (!url.startsWith("/products/uploads/")) return false;

  const filename = path.basename(url);
  const filepath = path.join(UPLOAD_DIR, filename);

  try {
    await fs.unlink(filepath);
    return true;
  } catch {
    return false;
  }
}