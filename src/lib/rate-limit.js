/**
 * In-memory rate limiter for API routes.
 * Uses a sliding-window approach per IP address.
 */

const rateLimitMap = new Map();

// Clean up expired entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap) {
        if (now - entry.windowStart > entry.windowMs * 2) {
            rateLimitMap.delete(key);
        }
    }
}, 5 * 60 * 1000);

/**
 * @param {Request} req
 * @param {Object} options
 * @param {number} options.limit - Max requests per window (default: 10)
 * @param {number} options.windowMs - Window in ms (default: 60000 = 1 min)
 * @returns {{ success: boolean, remaining: number, resetIn: number }}
 */
export function rateLimit(req, { limit = 10, windowMs = 60000 } = {}) {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "anonymous";
    const key = `${ip}:${req.url}`;
    const now = Date.now();

    let entry = rateLimitMap.get(key);

    if (!entry || now - entry.windowStart > windowMs) {
        entry = { count: 0, windowStart: now, windowMs };
        rateLimitMap.set(key, entry);
    }

    entry.count++;

    const remaining = Math.max(0, limit - entry.count);
    const resetIn = Math.max(0, windowMs - (now - entry.windowStart));

    return {
        success: entry.count <= limit,
        remaining,
        resetIn,
    };
}

/**
 * Returns a 429 Response if rate limit is exceeded.
 * Use at the top of API route handlers.
 */
export function checkRateLimit(req, options) {
    const result = rateLimit(req, options);
    if (!result.success) {
        return new Response(
            JSON.stringify({
                message: "Çok fazla istek. Lütfen biraz bekleyin.",
                retryAfter: Math.ceil(result.resetIn / 1000),
            }),
            {
                status: 429,
                headers: {
                    "Content-Type": "application/json",
                    "Retry-After": String(Math.ceil(result.resetIn / 1000)),
                    "X-RateLimit-Remaining": String(result.remaining),
                },
            }
        );
    }
    return null;
}
