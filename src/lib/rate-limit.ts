// A rate limiter with two backends:
//  - Upstash Redis, used automatically when UPSTASH_REDIS_REST_URL and
//    UPSTASH_REDIS_REST_TOKEN are set (works correctly across multiple
//    server instances — the correct choice for Vercel).
//  - An in-memory fallback, used when those env vars are absent (local
//    development, or a single-instance deployment). This fallback does NOT
//    enforce a true global limit across multiple serverless instances.

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const upstashConfigured = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

// Upstash rate limiters are created per (limit, window) pair and reused
// across requests, so we cache them by a string key derived from the config.
const upstashLimiters = new Map<string, Ratelimit>();

function getUpstashLimiter(opts: { limit: number; windowMs: number }): Ratelimit {
  const cacheKey = `${opts.limit}:${opts.windowMs}`;
  const existing = upstashLimiters.get(cacheKey);
  if (existing) return existing;

  const limiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(opts.limit, `${opts.windowMs} ms`),
    analytics: false,
  });
  upstashLimiters.set(cacheKey, limiter);
  return limiter;
}

type Bucket = { count: number; resetAt: number };
const inMemoryBuckets = new Map<string, Bucket>();

function inMemoryRateLimit(key: string, opts: { limit: number; windowMs: number }): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const existing = inMemoryBuckets.get(key);

  if (!existing || existing.resetAt < now) {
    inMemoryBuckets.set(key, { count: 1, resetAt: now + opts.windowMs });
    return { allowed: true, remaining: opts.limit - 1 };
  }

  if (existing.count >= opts.limit) {
    return { allowed: false, remaining: 0 };
  }

  existing.count += 1;
  return { allowed: true, remaining: opts.limit - existing.count };
}

// Periodically clear stale in-memory buckets so this doesn't grow unbounded
// on a long-running process. Irrelevant when Upstash is configured.
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of inMemoryBuckets) {
      if (bucket.resetAt < now) inMemoryBuckets.delete(key);
    }
  }, 5 * 60 * 1000).unref?.();
}

export async function rateLimit(key: string, opts: { limit: number; windowMs: number }): Promise<{ allowed: boolean; remaining: number }> {
  if (upstashConfigured) {
    const limiter = getUpstashLimiter(opts);
    const result = await limiter.limit(key);
    return { allowed: result.success, remaining: result.remaining };
  }
  return inMemoryRateLimit(key, opts);
}

export const rateLimiterBackend: "upstash" | "in-memory" = upstashConfigured ? "upstash" : "in-memory";
