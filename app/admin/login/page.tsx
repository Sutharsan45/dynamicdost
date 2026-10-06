"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { apiFetch, setToken, API_BASE } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debug, setDebug] = useState<string[]>([]);

  const log = (msg: string) => {
    console.log("[login]", msg);
    setDebug((d) => [...d, msg]);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    log("submit fired");

    setLoading(true);
    setError("");

    try {
      const url = `${API_BASE}/api/admin/login`;
      log(`POST ${url}`);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      log(`status: ${res.status}`);

      const data = await res.json();
      log(`body: ${JSON.stringify(data).slice(0, 80)}...`);

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      setToken(data.token);
      log("token saved");

      log("redirecting to /admin/products...");
      window.location.href = "/admin/products";
    } catch (e: any) {
      log(`error: ${e.message}`);
      setError(e.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 rounded-xl bg-ink-900 grid place-items-center mb-4">
            <Lock className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-ink-900">
            Admin sign in
          </h1>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-ink-700">Email</span>
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input mt-1.5"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink-700">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input mt-1.5"
            />
          </label>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg w-full"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Debug panel — remove after fixing */}
        {debug.length > 0 && (
          <div className="mt-6 rounded-lg border border-ink-200 bg-ink-50 p-3 text-xs font-mono">
            {debug.map((line, i) => (
              <div key={i} className="text-ink-700">
                {line}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}