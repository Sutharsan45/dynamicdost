const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/* =========================================
   AUTH TOKEN (localStorage)
   ========================================= */
const TOKEN_KEY = "dd_admin_token";

export function setToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}

/* =========================================
   FETCH WRAPPER
   ========================================= */
export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {
    ...((options.headers as Record<string, string>) || {}),
  };

  /* Only set JSON content-type when body isn't FormData */
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (res.status === 401) {
    clearToken();
    if (
      typeof window !== "undefined" &&
      !window.location.pathname.includes("/admin/login")
    ) {
      window.location.href = "/admin/login";
    }
    throw new Error("Unauthorized");
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }

  return data as T;
}

/* Build full URL for images / direct links */
export function apiUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
}

export const API_BASE = API_URL;