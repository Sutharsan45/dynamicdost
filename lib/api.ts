/* =========================================
   BACKEND CONFIG
   ========================================= */
const BACKEND_BASE = (
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://siva123.pythonanywhere.com"
).replace(/\/+$/, ""); // Remove trailing slash if present

/* =========================================
   AUTH TOKEN HELPERS
   ========================================= */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

export function setToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("admin_token", token);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("admin_token");
}

/* =========================================
   FETCH WRAPPER
   Handles JSON, FormData, and auth headers.
   ========================================= */
export async function apiFetch<T = any>(
  path: string,
  options?: RequestInit
): Promise<T> {
  // Ensure the path starts with a slash
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  // Build the full URL (never prepend if it's already absolute)
  const url = cleanPath.startsWith("http")
    ? cleanPath
    : `${BACKEND_BASE}${cleanPath}`;

  // Check if the body is FormData (for image uploads)
  const isFormData =
    typeof FormData !== "undefined" && options?.body instanceof FormData;

  // Build headers
  const headers = new Headers(options?.headers);
  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Attach Bearer token if it exists
  const token = getToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(url, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || cleanPath}`);
  }

  // Handle empty responses (e.g., successful DELETE requests)
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return {} as T;
  }

  return res.json();
}

/* =========================================
   IMAGE URL NORMALIZER
   ========================================= */
export function apiUrl(path: string | undefined | null): string {
  if (!path) return "";

  // Already an absolute URL
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Local public asset (from /public/products/uploads/)
  if (path.startsWith("/products/uploads/")) {
    return path;
  }

  // Ensure leading slash
  const normalized = path.startsWith("/") ? path : `/${path}`;

  // Prefix with the backend base URL
  return `${BACKEND_BASE}${normalized}`;
}