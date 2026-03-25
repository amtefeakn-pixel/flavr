/**
 * Dynamic sitemap generator for Next.js App Router
 * Generates sitemap.xml automatically at /sitemap.xml
 */

const BASE_URL = "https://flavr.com.tr";

export default function sitemap() {
    const now = new Date().toISOString();

    const staticPages = [
        { url: `${BASE_URL}`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
        { url: `${BASE_URL}/catalog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/shop`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/quiz`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
        { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
        { url: `${BASE_URL}/shipping-returns`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ];

    return staticPages;
}
