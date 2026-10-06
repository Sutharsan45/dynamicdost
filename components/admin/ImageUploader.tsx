"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { apiUrl, getToken, API_BASE } from "@/lib/api";
import { cn } from "@/lib/utils";

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUploader({ images, onChange, maxImages = 5 }: Props) {
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

      const uploaded: string[] = [];

      for (const file of toUpload) {
        try {
          const form = new FormData();
          form.append("file", file);

          const res = await fetch(`${API_BASE}/api/admin/upload`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${getToken() ?? ""}`,
            },
            body: form,
          });

          const data = await res.json();

          if (!res.ok) {
            setError(data.error ?? `Failed: ${file.name}`);
            continue;
          }

          uploaded.push(data.url);
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

  const remove = async (url: string) => {
    if (!confirm("Delete this image?")) return;
    onChange(images.filter((i) => i !== url));

    const filename = url.split("/").pop() ?? "";
    try {
      await fetch(
        `${API_BASE}/api/admin/upload?filename=${encodeURIComponent(filename)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken() ?? ""}`,
          },
        }
      );
    } catch {
      // ignore
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
    <div className="space-y-3">
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
              <span className="text-sm font-medium text-ink-700">
                Uploading…
              </span>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {images.map((url, idx) => {
            const imageSrc = apiUrl(url);
            return (
              <div
                key={url}
                className="relative group aspect-square rounded-xl overflow-hidden border border-ink-200 bg-ink-50"
              >
                <Image
                  src={imageSrc}
                  alt={`Product image ${idx + 1}`}
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
                    onClick={() => remove(url)}
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
            );
          })}
        </div>
      )}

      <p className="text-xs text-ink-500">
        First image is the primary. Images are auto-resized to 1600px and
        converted to WebP.
      </p>
    </div>
  );
}