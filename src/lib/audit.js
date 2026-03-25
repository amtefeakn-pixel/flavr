/**
 * Audit trail logging for admin actions.
 * Logs to console in structured JSON format.
 * In production, this can be extended to write to a DB table or external service.
 */

/**
 * Log an admin action
 * @param {Object} params
 * @param {string} params.action - e.g. "user.delete", "product.update", "role.change"
 * @param {string} params.adminEmail - Email of the admin performing the action
 * @param {string} params.targetId - ID of the affected resource
 * @param {Object} [params.details] - Additional non-sensitive context
 */
export function logAdminAction({ action, adminEmail, targetId, details = {} }) {
    const entry = {
        timestamp: new Date().toISOString(),
        level: "AUDIT",
        action,
        admin: adminEmail,
        target: targetId,
        details: sanitizeDetails(details),
    };

    // Structured log — parseable by Vercel Logs, Datadog, etc.
    console.log(JSON.stringify(entry));

    return entry;
}

/**
 * Log a security event (failed login, rate limit hit, unauthorized access)
 */
export function logSecurityEvent({ event, ip, email, details = {} }) {
    const entry = {
        timestamp: new Date().toISOString(),
        level: "SECURITY",
        event,
        ip: ip || "unknown",
        email: email ? maskEmail(email) : undefined,
        details: sanitizeDetails(details),
    };

    console.warn(JSON.stringify(entry));

    return entry;
}

/**
 * Remove sensitive fields from details before logging
 */
function sanitizeDetails(details) {
    const sensitive = ["password", "token", "secret", "key", "authorization", "cookie"];
    const cleaned = { ...details };
    for (const key of Object.keys(cleaned)) {
        if (sensitive.some(s => key.toLowerCase().includes(s))) {
            cleaned[key] = "[REDACTED]";
        }
    }
    return cleaned;
}

/**
 * Mask email for logs: "user@example.com" → "u***@example.com"
 */
function maskEmail(email) {
    const [local, domain] = email.split("@");
    if (!domain) return "***";
    return `${local[0]}***@${domain}`;
}
