interface Attempt {
  count: number;
  resetAt: number;
}

const store = new Map<string, Attempt>();

const MAX_ATTEMPTS = parseInt(
  process.env.LOGIN_RATE_LIMIT_MAX ?? "5",
  10
);
const WINDOW_MS = parseInt(
  process.env.LOGIN_RATE_LIMIT_WINDOW_MS ?? "900000",
  10
);

export function checkRateLimit(key: string): {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
} {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1, retryAfterMs: 0 };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: entry.resetAt - now,
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: MAX_ATTEMPTS - entry.count,
    retryAfterMs: 0,
  };
}

export function resetRateLimit(key: string) {
  store.delete(key);
}

if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (entry.resetAt < now) store.delete(key);
    }
  }, 60_000);
}