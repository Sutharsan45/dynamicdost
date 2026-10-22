"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { apiFetch, apiUrl } from "@/lib/api";
import { cn } from "@/lib/utils";

export interface ImageItem {
  url: string;
  alt: string;
}

interface Props {
  images: ImageItem[];
  onChange: (images: ImageItem[]) => void;
  maxImages?: number;
  productName?: string;
}

export function ImageUploader({
  images,
  onChange,
  maxImages = 40,
  productName = "",
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      setError("");
      const fileArray = Array.from(files);

      const remaining = maxImages - images.length;
      if (remaining <= 0) {
        setError(`Maximum ${maxImages} images allowed.`);
        return;
      }

      const toUpload = fileArray.slice(0, remaining);
      setUploading(true);

      const uploaded: ImageItem[] = [];

      for (const file of toUpload) {
        try {
          const form = new FormData();
          form.append("file", file);

          const data = await apiFetch<{ url: string }>("/api/admin/upload", {
            method: "POST",
            body: form,
            headers: {},
          });

          uploaded.push({ url: data.url, alt: "" });
        } catch {
          setError(`Failed to upload ${file.name}`);
        }
      }

      if (uploaded.length > 0) {
        onChange([...images, ...uploaded]);
      }

      setUploading(false);
    },
    [images, maxImages, onChange]
  );

  const onFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      uploadFiles(e.target.files);
      e.target.value = "";
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) {
      uploadFiles(e.dataTransfer.files);
    }
  };

  const remove = async (indexToRemove: number, url: string) => {
    if (!confirm("Delete this image?")) return;
    onChange(images.filter((_, i) => i !== indexToRemove));
    try {
      await apiFetch(`/api/admin/upload?url=${encodeURIComponent(url)}`, {
        method: "DELETE",
      });
    } catch {}
  };

  const updateAlt = (index: number, newAlt: string) => {
    const next = [...images];
    next[index] = { ...next[index], alt: newAlt };
    onChange(next);
  };

  const handleFocus = (index: number) => {
    if (!images[index].alt && productName) {
      updateAlt(index, productName);
    }
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    const next = [...images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {images.length < maxImages && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={cn(
            "relative rounded-xl border-2 border-dashed transition-colors p-6 text-center cursor-pointer",
            dragOver
              ? "border-brand-500 bg-brand-50"
              : "border-ink-300 hover:border-ink-400 hover:bg-ink-50"
          )}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            className="hidden"
            onChange={onFilePick}
            disabled={uploading}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
              <span className="text-sm font-medium text-ink-700">Uploading…</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-4">
              <div className="h-10 w-10 rounded-lg bg-ink-100 grid place-items-center">
                <Upload className="h-5 w-5 text-ink-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink-900">
                  Click to upload or drag & drop
                </p>
                <p className="text-xs text-ink-500 mt-0.5">
                  JPG, PNG, WebP, or AVIF · Max 5 MB · Up to {maxImages} images
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((item, idx) => (
            <div
              key={item.url}
              className="relative flex flex-col gap-2 rounded-xl border border-ink-200 bg-white p-2"
            >
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-ink-50 group">
                <Image
                  src={apiUrl(item.url)}
                  alt={item.alt || "Preview"}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="object-cover"
                />

                {idx === 0 && (
                  <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-ink-900 text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5">
                    Primary
                  </span>
                )}

                <div className="absolute inset-0 bg-ink-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                  {idx > 0 && (
                    <button
                      type="button"
                      onClick={() => move(idx, idx - 1)}
                      className="p-1.5 rounded-md bg-white/90 text-ink-900 hover:bg-white"
                      title="Move left"
                    >
                      ←
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(idx, item.url)}
                    className="p-1.5 rounded-md bg-red-500 text-white hover:bg-red-600"
                    title="Remove"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  {idx < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => move(idx, idx + 1)}
                      className="p-1.5 rounded-md bg-white/90 text-ink-900 hover:bg-white"
                      title="Move right"
                    >
                      →
                    </button>
                  )}
                </div>
              </div>

              {/* 🔽 THIS IS THE INPUT BOX THAT SHOULD APPEAR 🔽 */}
              <div>
                <label className="block text-[11px] font-medium text-ink-600 mb-1">
                  Image Name / Alt Text
                </label>
                <input
                  type="text"
                  value={item.alt}
                  onChange={(e) => updateAlt(idx, e.target.value)}
                  onFocus={() => handleFocus(idx)}
                  placeholder={
                    productName
                      ? `e.g. ${productName} — Black`
                      : "e.g. Black variant"
                  }
                  className="w-full rounded-md border border-ink-200 px-2.5 py-1.5 text-xs text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/20"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-ink-500">
        First image is the primary. Images are auto-resized to 1600px and converted to WebP.
      </p>
    </div>
  );
}