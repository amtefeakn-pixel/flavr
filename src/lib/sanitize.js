/**
 * Input sanitization utilities for API routes.
 * Strips HTML tags, trims whitespace, and validates common patterns.
 */

/**
 * Strip all HTML tags from a string
 */
export function stripHtml(str) {
    if (typeof str !== "string") return "";
    return str.replace(/<[^>]*>/g, "").trim();
}

/**
 * Sanitize a plain text input — strip HTML, normalize whitespace, limit length
 */
export function sanitizeText(str, maxLength = 500) {
    if (typeof str !== "string") return "";
    return stripHtml(str)
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, maxLength);
}

/**
 * Sanitize an email address — lowercase, trim, validate format
 * Returns null if invalid
 */
export function sanitizeEmail(email) {
    if (typeof email !== "string") return null;
    const cleaned = email.toLowerCase().trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(cleaned) ? cleaned : null;
}

/**
 * Sanitize a name — strip HTML, allow only letters/spaces/hyphens, limit length
 */
export function sanitizeName(name) {
    if (typeof name !== "string") return "";
    return stripHtml(name)
        .replace(/[^\p{L}\p{M}\s\-'.]/gu, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 100);
}

/**
 * Sanitize a password — only check type and length, don't modify content
 * Returns { valid: boolean, message?: string }
 */
export function validatePassword(password) {
    if (typeof password !== "string") {
        return { valid: false, message: "Şifre gerekli" };
    }
    if (password.length < 6) {
        return { valid: false, message: "Şifre en az 6 karakter olmalıdır" };
    }
    if (password.length > 128) {
        return { valid: false, message: "Şifre çok uzun" };
    }
    return { valid: true };
}

/**
 * Sanitize a JSON object's string values recursively
 */
export function sanitizeObject(obj, maxDepth = 5) {
    if (maxDepth <= 0) return obj;
    if (typeof obj === "string") return sanitizeText(obj);
    if (Array.isArray(obj)) return obj.map(item => sanitizeObject(item, maxDepth - 1));
    if (obj && typeof obj === "object") {
        const cleaned = {};
        for (const [key, value] of Object.entries(obj)) {
            cleaned[sanitizeText(key, 100)] = sanitizeObject(value, maxDepth - 1);
        }
        return cleaned;
    }
    return obj;
}
