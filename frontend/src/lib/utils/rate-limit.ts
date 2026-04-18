import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Sliding window rate limiter instances.
 * Adjust the limits based on the sensitivity of each endpoint.
 */
export const rateLimiters = {
  /** General API — 60 requests per minute per IP */
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, "1 m"),
    analytics: true,
    prefix: "ratelimit:api",
  }),

  /** Auth-related routes — stricter: 10 per minute */
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    analytics: true,
    prefix: "ratelimit:auth",
  }),

  /** Webhook routes — 100 per minute (high volume expected) */
  webhook: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "1 m"),
    analytics: true,
    prefix: "ratelimit:webhook",
  }),
} as const;

type LimiterKey = keyof typeof rateLimiters;

/**
 * Apply rate limiting in an API Route.
 *
 * @example
 * ```ts
 * const result = await rateLimit(req, "api");
 * if (result) return result; // 429 response already built
 * ```
 */
export async function rateLimit(
  req: NextRequest,
  limiter: LimiterKey = "api"
): Promise<NextResponse | null> {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous";

  const { success, limit, remaining, reset } =
    await rateLimiters[limiter].limit(ip);

  if (!success) {
    return NextResponse.json(
      {
        error: "Too many requests. Please slow down.",
        retryAfter: Math.ceil((reset - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": String(limit),
          "X-RateLimit-Remaining": String(remaining),
          "X-RateLimit-Reset": String(reset),
          "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)),
        },
      }
    );
  }

  return null; // allowed
}
