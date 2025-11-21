/**
 * Security Utility Functions
 * 
 * Provides common security functions for input sanitization and validation
 * to prevent XSS and other injection attacks.
 */

/**
 * Sanitizes user input by stripping dangerous characters and HTML tags.
 * @param {string} input - The raw input string.
 * @returns {string} - The sanitized string.
 */
export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';

    // Remove HTML tags
    let sanitized = input.replace(/<[^>]*>?/gm, '');

    // Escape special characters to prevent XSS
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };

    sanitized = sanitized.replace(/[&<>"'/]/ig, (match) => (map[match]));

    return sanitized;
};

/**
 * Validates an email address using a strict regex.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export const validateEmail = (email) => {
    // RFC 5322 compliant regex
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

/**
 * Simple rate limiter (debounce/throttle) for form submissions.
 * @param {Function} func - The function to limit.
 * @param {number} limit - Time in ms.
 * @returns {Function} - The limited function.
 */
export const rateLimit = (func, limit) => {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};
