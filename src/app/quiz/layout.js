export const metadata = {
    title: "Ücretsiz Sağlık Testi",
    description: "FLAVR kişisel sağlık testini çöz ve sana özel vitamin paketini keşfet. 2 dakikada bilimsel analiz.",
    alternates: { canonical: "https://flavr.com.tr/quiz" },
    openGraph: {
        title: "FLAVR Ücretsiz Sağlık Testi",
        description: "2 dakikada kişiye özel vitamin önerisi al.",
        url: "https://flavr.com.tr/quiz",
    },
};

export default function QuizLayout({ children }) {
    return children;
}
