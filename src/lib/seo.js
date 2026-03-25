/**
 * SEO utilities — JSON-LD structured data generators
 */

const SITE_URL = "https://flavr.com.tr";
const SITE_NAME = "FLAVR";

/**
 * Organization JSON-LD
 */
export function organizationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description: "Kişiselleştirilmiş vitamin ve supplement paketleri",
        address: {
            "@type": "PostalAddress",
            addressCountry: "TR",
        },
        sameAs: [
            "https://instagram.com/flavr",
            "https://twitter.com/flavr",
        ],
    };
}

/**
 * Product JSON-LD for a single vitamin
 */
export function productJsonLd({ name, description, price, image, sku, inStock = true }) {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        description,
        image: image || `${SITE_URL}/logo.png`,
        sku: sku || name.toLowerCase().replace(/\s+/g, "-"),
        brand: {
            "@type": "Brand",
            name: SITE_NAME,
        },
        offers: {
            "@type": "Offer",
            url: SITE_URL,
            priceCurrency: "TRY",
            price: String(price),
            availability: inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            seller: {
                "@type": "Organization",
                name: SITE_NAME,
            },
        },
    };
}

/**
 * FAQ JSON-LD
 */
export function faqJsonLd(faqs) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: {
                "@type": "Answer",
                text: answer,
            },
        })),
    };
}

/**
 * BreadcrumbList JSON-LD
 */
export function breadcrumbJsonLd(items) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: item.url ? `${SITE_URL}${item.url}` : undefined,
        })),
    };
}

/**
 * WebSite JSON-LD with search
 */
export function websiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };
}

/**
 * Renders JSON-LD script tag content
 */
export function JsonLd({ data }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
