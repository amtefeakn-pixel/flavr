export const metadata = {
    title: "Vitamin & Supplement Kataloğu",
    description: "FLAVR bilimsel vitamin ve supplement kataloğu. D3, Omega-3, Magnezyum, B-Complex ve daha fazlası. Premium ingredientler, kanıtlanmış formüller.",
    alternates: { canonical: "https://flavr.com.tr/catalog" },
    openGraph: {
        title: "FLAVR Vitamin Kataloğu",
        description: "Bilimsel formüller, premium ingredientler. Tüm vitamin ve supplementler.",
        url: "https://flavr.com.tr/catalog",
    },
};

export default function CatalogLayout({ children }) {
    return children;
}
